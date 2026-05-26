import Parser from "rss-parser";

const FEEDS = [
  { url: "https://openai.com/news/rss.xml", source: "OpenAI" },
  { url: "https://www.anthropic.com/rss.xml", source: "Anthropic" },
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    source: "TechCrunch",
  },
];

interface Article {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  source: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any): Promise<void> {
  const parser = new Parser({
    timeout: 10_000,
    headers: { "User-Agent": "aikostnad/1.0" },
  });

  const articles: Article[] = [];

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of (parsed.items ?? []).slice(0, 10)) {
        if (item.link && item.title) {
          articles.push({
            title: item.title,
            link: item.link,
            pubDate: item.isoDate ?? item.pubDate ?? "",
            summary: (item.contentSnippet ?? item.summary ?? "").slice(0, 300),
            source: feed.source,
          });
        }
      }
    } catch (e) {
      console.error(`RSS fetch failed for ${feed.url}:`, e);
    }
  }

  articles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=600"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(articles.slice(0, 15));
}
