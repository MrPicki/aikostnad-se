// Dynamic sitemap for the news vertical (/nyheter/:date). These URLs live in
// Supabase (written daily by the morning-digest cron) so they can't be listed
// in the static build-time sitemap. robots.txt points crawlers here as a second
// Sitemap. Served as XML and cached at the edge.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any): Promise<void> {
  const base =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  let rows: Array<{ date: string }> = [];
  if (base && key) {
    try {
      const r = await fetch(
        `${base}/rest/v1/daily_articles?select=date&order=date.desc&limit=500`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } }
      );
      if (r.ok) {
        const data = (await r.json()) as Array<{ date: string }>;
        if (Array.isArray(data)) rows = data;
      }
    } catch (e) {
      console.error("sitemap-news supabase fetch failed:", e);
    }
  }

  const urls = rows
    .filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.date))
    .map(
      (row) =>
        `  <url>\n` +
        `    <loc>https://aikostnad.se/nyheter/${row.date}</loc>\n` +
        `    <lastmod>${row.date}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>0.5</priority>\n` +
        `  </url>`
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=600"
  );
  res.status(200).send(xml);
}
