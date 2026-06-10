// RSS 2.0 feed for the daily AI news articles (/nyheter/:date).
// Served at /rss.xml via a vercel.json rewrite. Articles live in Supabase
// (written daily by the morning-digest cron). RSS gets the content into
// Feedly/NetNewsWire-style readers and news aggregators — a distribution
// channel that compounds with zero per-article effort.

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any): Promise<void> {
  const base =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  let rows: Array<{ date: string; title: string; ingress: string }> = [];
  if (base && key) {
    try {
      const r = await fetch(
        `${base}/rest/v1/daily_articles?select=date,title,ingress&order=date.desc&limit=30`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } }
      );
      if (r.ok) {
        const data = (await r.json()) as Array<{
          date: string;
          title: string;
          ingress: string;
        }>;
        if (Array.isArray(data)) rows = data;
      }
    } catch (e) {
      console.error("rss supabase fetch failed:", e);
    }
  }

  const items = rows
    .filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.date))
    .map((row) => {
      const url = `https://aikostnad.se/nyheter/${row.date}`;
      // Publication moment matches the morning cron (06:00 UTC).
      const pubDate = new Date(`${row.date}T06:00:00Z`).toUTCString();
      return (
        `    <item>\n` +
        `      <title>${escapeXml(row.title ?? `Dagens AI-rapport ${row.date}`)}</title>\n` +
        `      <link>${url}</link>\n` +
        `      <guid isPermaLink="true">${url}</guid>\n` +
        `      <pubDate>${pubDate}</pubDate>\n` +
        `      <description>${escapeXml(row.ingress ?? "")}</description>\n` +
        `    </item>`
      );
    })
    .join("\n");

  const lastBuildDate = rows[0]?.date
    ? new Date(`${rows[0].date}T06:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Aikostnad.se — Dagens AI-rapport</title>\n` +
    `    <link>https://aikostnad.se/nyheter</link>\n` +
    `    <description>Daglig AI-nyhetsrapport på svenska — det viktigaste inom AI sammanfattat av aikostnad.se.</description>\n` +
    `    <language>sv-SE</language>\n` +
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n` +
    `    <atom:link href="https://aikostnad.se/rss.xml" rel="self" type="application/rss+xml" />\n` +
    `    <image>\n` +
    `      <url>https://aikostnad.se/icon-192.png</url>\n` +
    `      <title>Aikostnad.se — Dagens AI-rapport</title>\n` +
    `      <link>https://aikostnad.se/nyheter</link>\n` +
    `    </image>\n` +
    `${items}\n` +
    `  </channel>\n` +
    `</rss>\n`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=600"
  );
  res.status(200).send(xml);
}
