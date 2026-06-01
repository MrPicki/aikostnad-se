// GET /api/article?date=2026-05-26  — fetch a single article
// GET /api/article?list=true         — fetch the latest 7 articles (date, slug, title, ingress)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  // Prefer the server-only SUPABASE_URL (VITE_* vars are bundled into the
  // client, so they shouldn't be the canonical server config).
  const supabaseBase =
    process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  // This is a PUBLIC read endpoint — use the anon key (which is gated by an RLS
  // SELECT policy on `daily_articles`) rather than the RLS-bypassing service
  // role. Falls back to the service role only if no anon key is configured yet.
  // REQUIRED in Supabase: `create policy "public read" on daily_articles for
  // select using (true);` plus `alter table daily_articles enable row level security;`
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "";

  if (!supabaseBase || !supabaseKey) {
    res.status(500).json({ error: "Supabase not configured" });
    return;
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  const { date, list } = req.query as { date?: string; list?: string };

  // ---- List mode ----
  if (list === "true") {
    try {
      const r = await fetch(
        `${supabaseBase}/rest/v1/daily_articles?select=date,slug,title,ingress&order=date.desc&limit=7`,
        { headers }
      );
      if (!r.ok) throw new Error(`Supabase ${r.status}`);
      const rows = await r.json();
      res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");
      res.status(200).json(rows);
    } catch (e) {
      console.error("Supabase list failed:", e);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
    return;
  }

  // ---- Single article ----
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ error: "Missing or invalid date parameter (YYYY-MM-DD)" });
    return;
  }

  try {
    const r = await fetch(
      `${supabaseBase}/rest/v1/daily_articles?date=eq.${date}&select=*`,
      { headers }
    );
    if (!r.ok) throw new Error(`Supabase ${r.status}`);
    const rows = (await r.json()) as unknown[];
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).json(rows[0]);
  } catch (e) {
    console.error("Supabase fetch failed:", e);
    res.status(500).json({ error: "Failed to fetch article" });
  }
}
