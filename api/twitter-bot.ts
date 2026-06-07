// Twitter bot — posts AI news in Swedish, drives traffic to aikostnad.se
// Runs 3×/day via Vercel Cron (see vercel.json)
//
// Before first deploy, create the Supabase table:
//   create table twitter_posts (
//     id uuid default gen_random_uuid() primary key,
//     article_url text unique not null,
//     tweet_id text,
//     tweet_text text,
//     posted_at timestamptz default now()
//   );

import { TwitterApi, ApiResponseError } from "twitter-api-v2";
import Parser from "rss-parser";

const RSS_FEEDS = [
  "https://openai.com/news/rss.xml",
  "https://www.anthropic.com/rss.xml",
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://feeds.feedburner.com/venturebeat/SZYF",
];

// X API Basic tier: 100 tweets/month. We stop at 80 for safety margin.
const MONTHLY_LIMIT = 80;
// Claude generates up to 250 chars; URL is appended separately (Twitter counts URLs as 23 chars).
const MAX_TWEET_CHARS = 250;

interface Article {
  title: string;
  url: string;
  summary: string;
  pubDate: string;
}

async function fetchRssArticles(): Promise<Article[]> {
  const parser = new Parser({
    timeout: 10_000,
    headers: { "User-Agent": "aikostnad-bot/1.0" },
  });

  const articles: Article[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of (feed.items ?? []).slice(0, 5)) {
        if (item.link && item.title) {
          articles.push({
            title: item.title,
            url: item.link,
            summary: item.contentSnippet ?? item.summary ?? "",
            pubDate: item.isoDate ?? item.pubDate ?? "",
          });
        }
      }
    } catch (e) {
      console.error(`RSS fetch failed for ${feedUrl}:`, e);
    }
  }

  return articles.sort(
    (a, b) =>
      (new Date(b.pubDate || 0).getTime() || 0) -
      (new Date(a.pubDate || 0).getTime() || 0)
  );
}

async function getMonthlyCount(
  supabaseUrl: string,
  supabaseKey: string
): Promise<number> {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/twitter_posts?posted_at=gte.${since}&select=id`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
    );
    const rows = (await res.json()) as Array<unknown>;
    return Array.isArray(rows) ? rows.length : 0;
  } catch {
    return 0;
  }
}

async function getPostedUrls(
  supabaseUrl: string,
  supabaseKey: string
): Promise<Set<string>> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/twitter_posts?select=article_url&order=posted_at.desc&limit=200`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
    );
    const rows = (await res.json()) as Array<{ article_url: string }>;
    return new Set(Array.isArray(rows) ? rows.map((r) => r.article_url) : []);
  } catch {
    return new Set();
  }
}

async function savePost(
  supabaseUrl: string,
  supabaseKey: string,
  post: { article_url: string; tweet_id: string | null; tweet_text: string }
): Promise<void> {
  try {
    await fetch(`${supabaseUrl}/rest/v1/twitter_posts`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(post),
    });
  } catch (e) {
    console.error("Supabase insert failed:", e);
  }
}

function fallbackTweet(article: Article): string {
  const title = article.title.slice(0, 130);
  return `${title} — Räkna ut hur det påverkar din AI-kostnad → aikostnad.se #AI #AIpriser`;
}

async function generateTweet(article: Article): Promise<string> {
  const prompt = `Du är en redaktör för aikostnad.se — en svensk sajt som hjälper företag räkna ut kostnader för AI-API:er.

Skriv ett tweet (max ${MAX_TWEET_CHARS} tecken exkl. länk) på svenska baserat på denna nyhet:
Titel: ${article.title}
Sammanfattning: ${article.summary.slice(0, 500)}

Regler:
- Skriv som en kunnig AI-analytiker, inte som ett företag
- Avsluta med ett naturligt tips att räkna ut sin AI-kostnad på aikostnad.se
- Inkludera 1-2 hashtags
- Inga emojis i början — sparsamt i slutet är ok
- Är prisändringar involverade: nämn hur det påverkar kostnaden
- Svara ENBART med tweet-texten, inga citattecken runt texten`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic ${res.status}`);

    const data = (await res.json()) as {
      content: Array<{ type: string; text: string }>;
    };
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text.trim() : null;

    if (!text) return fallbackTweet(article);
    if (text.length <= MAX_TWEET_CHARS) return text;
    return text.slice(0, MAX_TWEET_CHARS - 1) + "…";
  } catch (e) {
    console.error("Claude API failed, using fallback:", e);
    return fallbackTweet(article);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  // Vercel Cron sends Authorization: Bearer {CRON_SECRET}.
  // Fail closed: posting to X and calling a paid LLM must never be reachable
  // without the secret, so a missing CRON_SECRET refuses the request.
  const cronSecret = process.env.CRON_SECRET;
  const auth = (req.headers["authorization"] as string) ?? "";
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  // Guard: don't exceed X API Basic tier limit
  const monthlyCount = await getMonthlyCount(supabaseUrl, supabaseKey);
  if (monthlyCount >= MONTHLY_LIMIT) {
    console.log(`Monthly tweet limit reached: ${monthlyCount}/${MONTHLY_LIMIT}`);
    res
      .status(200)
      .json({ ok: false, reason: "monthly_limit_reached", count: monthlyCount });
    return;
  }

  const articles = await fetchRssArticles();
  if (articles.length === 0) {
    console.warn("No articles fetched from RSS feeds");
    res.status(200).json({ ok: false, reason: "no_articles" });
    return;
  }

  const postedUrls = await getPostedUrls(supabaseUrl, supabaseKey);
  const candidate = articles.find((a) => !postedUrls.has(a.url));
  if (!candidate) {
    console.log("All recent articles already posted");
    res.status(200).json({ ok: false, reason: "all_posted" });
    return;
  }

  const tweetText = await generateTweet(candidate);
  const fullTweet = `${tweetText}\n${candidate.url}`;

  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY ?? "",
    appSecret: process.env.TWITTER_API_SECRET ?? "",
    accessToken: process.env.TWITTER_ACCESS_TOKEN ?? "",
    accessSecret: process.env.TWITTER_ACCESS_SECRET ?? "",
  });

  let tweetId: string | null = null;
  try {
    const result = await twitterClient.v2.tweet(fullTweet);
    tweetId = result.data.id;
  } catch (e) {
    if (e instanceof ApiResponseError && e.rateLimitError) {
      console.warn("Twitter rate limit hit");
      res.status(200).json({ ok: false, reason: "twitter_rate_limit" });
      return;
    }
    console.error("Twitter post failed:", e);
    // Return 200 to avoid Vercel retry storm
    res.status(200).json({ ok: false, reason: "twitter_error" });
    return;
  }

  await savePost(supabaseUrl, supabaseKey, {
    article_url: candidate.url,
    tweet_id: tweetId,
    tweet_text: fullTweet,
  });

  console.log(`Posted tweet ${tweetId}: ${candidate.url}`);
  res.status(200).json({ ok: true, tweetId, articleUrl: candidate.url });
}
