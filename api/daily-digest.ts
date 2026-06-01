import Parser from "rss-parser";

const FEEDS = [
  { url: "https://openai.com/news/rss.xml", source: "OpenAI" },
  { url: "https://www.anthropic.com/rss.xml", source: "Anthropic" },
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    source: "TechCrunch",
  },
  {
    url: "https://feeds.feedburner.com/venturebeat/SZYF",
    source: "VentureBeat",
  },
];

const SYSTEM = `Du är chefredaktör på aikostnad.se — Sveriges ledande sajt för AI-kostnadskalkylering.
Skriv en professionell, lättläst daglig AI-nyhetsrapport på svenska baserat på dagens nyheter.

Format:
- Rubrik: "Dagens AI-rapport — [datum]"
- Ingress: 2-3 meningar som fångar det viktigaste (detta används som X-inlägg)
- 2-4 nyhetsavsnitt med underrubriker
- Varje avsnitt: 2-3 meningar som förklarar nyheten + en mening om vad det betyder för företag som använder AI
- Avslutning: 1-2 meningar med dagens takeaway kopplat till AI-kostnader
- Ton: kunnig analytiker, inte reklamspråk
- Längd: 350-500 ord totalt

Returnera JSON:
{
  "title": "Dagens AI-rapport — 26 maj 2026",
  "ingress": "Max 250 tecken, fångar det viktigaste, används som X-teaser",
  "article": "Hela artikeln i markdown",
  "xPost": "Färdigt X-inlägg: ingress + newline + 'Hela rapporten: https://aikostnad.se/nyheter' + newline + '#AI #AIpriser'"
}`;

interface RawArticle {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  source: string;
}

interface DigestResult {
  title: string;
  ingress: string;
  article: string;
  xPost: string;
  generatedAt: string;
  rawArticles: RawArticle[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any): Promise<void> {
  const parser = new Parser({
    timeout: 10_000,
    headers: { "User-Agent": "aikostnad/1.0" },
  });

  const allArticles: RawArticle[] = [];
  const now = Date.now();
  const oneDayAgo = now - 86_400_000;

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of (parsed.items ?? []).slice(0, 10)) {
        if (item.link && item.title) {
          allArticles.push({
            title: item.title,
            link: item.link,
            pubDate: item.isoDate ?? item.pubDate ?? "",
            summary: (item.contentSnippet ?? item.summary ?? "").slice(0, 400),
            source: feed.source,
          });
        }
      }
    } catch (e) {
      console.error(`RSS fetch failed for ${feed.url}:`, e);
    }
  }

  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  let recentArticles = allArticles.filter(
    (a) => a.pubDate && new Date(a.pubDate).getTime() > oneDayAgo
  );

  if (recentArticles.length < 3) {
    recentArticles = allArticles.slice(0, 5);
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=600"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (recentArticles.length === 0) {
    res.status(200).json({
      title: "",
      ingress: "",
      article: "",
      xPost: "",
      generatedAt: new Date().toISOString(),
      rawArticles: [],
    } satisfies DigestResult);
    return;
  }

  const todayStr = new Date().toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articlesText = recentArticles
    .map(
      (a, i) =>
        `${i + 1}. [${a.source}] ${a.title}\n   ${a.summary || "(ingen sammanfattning)"}`
    )
    .join("\n\n");

  const userMessage = `Datum: ${todayStr}\n\nNyheter:\n${articlesText}`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1500,
        system: SYSTEM,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!anthropicRes.ok) {
      throw new Error(`Anthropic API error: ${anthropicRes.status}`);
    }

    const data = (await anthropicRes.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const raw =
      data.content[0]?.type === "text" ? data.content[0].text.trim() : "";
    const text = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(text) as DigestResult;

    res.status(200).json({
      title: parsed.title ?? "",
      ingress: parsed.ingress ?? "",
      article: parsed.article ?? "",
      xPost: parsed.xPost ?? "",
      generatedAt: new Date().toISOString(),
      rawArticles: recentArticles,
    } satisfies DigestResult);
  } catch (err) {
    console.error("daily-digest AI error:", err);
    // Fallback: return raw articles without AI digest
    res.status(200).json({
      title: "",
      ingress: "",
      article: "",
      xPost: "",
      generatedAt: new Date().toISOString(),
      rawArticles: recentArticles,
    } satisfies DigestResult);
  }
}
