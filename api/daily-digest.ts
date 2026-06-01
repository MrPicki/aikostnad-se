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

// NOTE: This is a PUBLIC, unauthenticated endpoint. It deliberately does NOT
// call any paid LLM API — doing so here would let anyone burn the Anthropic
// budget by looping the URL (cost-amplification DoS). The nicely written daily
// article is generated once per day by the authenticated cron (morning-digest)
// and stored in Supabase; the Nyheter page reads it via /api/article. This
// endpoint only serves the cheap raw-RSS fallback for the brief window before
// the cron has run (or if it failed).

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
  // Same-origin only — this endpoint is consumed by our own Nyheter page.
  res.setHeader("Access-Control-Allow-Origin", "https://aikostnad.se");

  // Cheap raw-RSS response only. The client (Nyheter.tsx) renders rawArticles
  // as a headline list when `article` is empty, so this is a complete fallback
  // without any paid LLM call.
  res.status(200).json({
    title: "",
    ingress: "",
    article: "",
    xPost: "",
    generatedAt: new Date().toISOString(),
    rawArticles: recentArticles,
  } satisfies DigestResult);
}

