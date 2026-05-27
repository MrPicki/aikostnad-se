// Morning digest — sends a daily AI news email at 08:00 via Vercel Cron
//
// Before first deploy, run in Supabase SQL Editor:
//   create table if not exists daily_articles (
//     id uuid default gen_random_uuid() primary key,
//     date text unique not null,
//     slug text unique not null,
//     title text not null,
//     ingress text,
//     content text not null,
//     x_post text,
//     article_urls text[],
//     created_at timestamptz default now()
//   );

import Parser from "rss-parser";

const RSS_FEEDS = [
  "https://openai.com/news/rss.xml",
  "https://www.anthropic.com/rss.xml",
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://feeds.feedburner.com/venturebeat/SZYF",
];

const SWEDISH_DAYS = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
const SWEDISH_MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

function formatSwedishDate(date: Date): string {
  return `${SWEDISH_DAYS[date.getDay()]} ${date.getDate()} ${SWEDISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

interface Article {
  title: string;
  url: string;
  summary: string;
  pubDate: string;
}

interface DigestSection {
  title: string;
  content: string;
}

interface Digest {
  subject: string;
  headline: string;
  ingress: string;
  sections: DigestSection[];
  takeaway: string;
  hashtags: string[];
  xPost?: string;
}

// ---- Supabase helpers (raw REST, same pattern as twitter-bot.ts) ----

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function getSupabaseUrl() {
  return process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
}

async function fetchYesterdayArticle(): Promise<{ title: string; article_urls: string[] } | null> {
  const base = getSupabaseUrl();
  if (!base) return null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const slug = yesterday.toISOString().split("T")[0];
  try {
    const res = await fetch(
      `${base}/rest/v1/daily_articles?date=eq.${slug}&select=title,article_urls`,
      { headers: supabaseHeaders() }
    );
    const rows = (await res.json()) as Array<{ title: string; article_urls: string[] }>;
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  } catch {
    return null;
  }
}

async function saveArticle(data: {
  date: string;
  slug: string;
  title: string;
  ingress: string;
  content: string;
  x_post: string;
  article_urls: string[];
}): Promise<void> {
  const base = getSupabaseUrl();
  if (!base) return;
  try {
    await fetch(`${base}/rest/v1/daily_articles`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(),
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("Supabase insert failed:", e);
  }
}

// ---- RSS ----

async function fetchRecentArticles(): Promise<Article[]> {
  const parser = new Parser({
    timeout: 10_000,
    headers: { "User-Agent": "aikostnad-digest/1.0" },
  });

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const articles: Article[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of (feed.items ?? []).slice(0, 10)) {
        if (!item.link || !item.title) continue;
        const pubDate = item.isoDate ?? item.pubDate ?? "";
        if (pubDate && new Date(pubDate) < cutoff) continue;
        articles.push({
          title: item.title,
          url: item.link,
          summary: (item.contentSnippet ?? item.summary ?? "").slice(0, 400),
          pubDate,
        });
      }
    } catch (e) {
      console.error(`RSS fetch failed for ${feedUrl}:`, e);
    }
  }

  return articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

// ---- Claude ----

async function generateDigest(
  articles: Article[],
  todaySlug: string,
  prevTitle?: string,
  prevUrls?: string[]
): Promise<Digest | null> {
  const newsSummary = articles
    .slice(0, 8)
    .map((a, i) => `${i + 1}. ${a.title}\n   ${a.summary.slice(0, 200)}`)
    .join("\n\n");

  const dedupNote =
    `\nGårdagens artikel handlade om: ${prevTitle ?? "ingen tidigare artikel"}.` +
    `\nDessa nyhets-URL:ar användes igår och ska INTE användas igen: ${prevUrls?.join(", ") ?? "inga"}.`;

  const prompt = `Du är chefredaktör på aikostnad.se. Skriv dagens AI-nyhetsrapport på svenska som en professionell nyhetsjournalist för en ledande tekniksajt.
${dedupNote}

Artikeln ska:
- Ha en stark, informativ rubrik
- Börja med ett slagkraftigt ingress (2-3 meningar) som fångar det viktigaste
- Ha 3-4 avsnitt med underrubriker, varje avsnitt 3-4 meningar
- Varje avsnitt kopplar nyheten till AI-kostnader och vad det innebär för svenska företag
- Avsluta med en "Dagens takeaway" — en konkret insikt
- Professionell, analytisk ton — inte reklamspråk, inte clickbait
- Längd: 400-550 ord

Inkludera dessa interna länkar naturligt i texten:
- GPT/OpenAI-nyheter → https://aikostnad.se/vad-kostar-chatgpt
- Claude/Anthropic-nyheter → https://aikostnad.se/claude-pris
- Gemini/Google-nyheter → https://aikostnad.se/gemini-pris
- Prisändringar generellt → https://aikostnad.se/prisandringar
- Jämförelser → https://aikostnad.se/jamfor-ai-modeller
- Kalkylator → https://aikostnad.se/kalkylator

Dagens nyheter:
${newsSummary}

Returnera JSON:
{
  "subject": "Rubrik för emailets ämnesrad (max 60 tecken)",
  "headline": "Artikelrubrik",
  "ingress": "Ingressen (2-3 meningar)",
  "sections": [
    { "title": "Avsnittets rubrik", "content": "Avsnittets text med HTML-länkar inbäddade" }
  ],
  "takeaway": "Dagens takeaway-text",
  "hashtags": ["#AI", "#AIpriser", "#GPT", "#MachineLearning"],
  "xPost": "Ingressen (max 250 tecken) + newline + 'Hela rapporten: https://aikostnad.se/nyheter/${todaySlug}' + newline + '#AI #AIpriser'"
}`;

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
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error(`Anthropic API error: ${res.status}`);
      return null;
    }

    const data = (await res.json()) as {
      content: Array<{ type: string; text: string }>;
    };
    const text = data.content?.[0]?.type === "text" ? data.content[0].text.trim() : null;
    if (!text) return null;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    return JSON.parse(jsonMatch[0]) as Digest;
  } catch (e) {
    console.error("Claude API failed:", e);
    return null;
  }
}

function buildFallbackDigest(articles: Article[], todaySlug: string): Digest {
  const headlines = articles
    .slice(0, 5)
    .map((a) => `<li>${a.title}</li>`)
    .join("\n");
  return {
    subject: "Dagens AI-nyheter från aikostnad.se",
    headline: "Dagens AI-nyheter",
    ingress: "Här är de senaste nyheterna inom AI och AI-kostnader.",
    sections: [
      {
        title: "Senaste nyheterna",
        content: `<ul>${headlines}</ul>`,
      },
    ],
    takeaway: "Håll koll på AI-kostnader på aikostnad.se/kalkylator",
    hashtags: ["#AI", "#AIpriser"],
    xPost: `Här är de senaste nyheterna inom AI och AI-kostnader.\n\nHela rapporten: https://aikostnad.se/nyheter/${todaySlug}\n\n#AI #AIpriser`,
  };
}

function buildArticleHtml(digest: Digest): string {
  const sectionsHtml = digest.sections
    .map(
      (s) =>
        `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">` +
        `<h2 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 10px;line-height:1.4;">${s.title}</h2>` +
        `<p style="font-size:15px;color:#334155;line-height:1.8;margin:0;">${s.content}</p>`
    )
    .join("\n");

  return (
    `<h1 style="font-size:26px;font-weight:800;color:#0f172a;margin:0 0 16px;line-height:1.3;">${digest.headline}</h1>\n` +
    `<p style="font-size:17px;color:#475569;font-style:italic;line-height:1.7;margin:0 0 4px;">${digest.ingress}</p>\n` +
    sectionsHtml +
    `\n<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">` +
    `<p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Slutsats</p>` +
    `<p style="margin:0;font-size:15px;color:#0f172a;line-height:1.7;">${digest.takeaway}</p>`
  );
}

function buildHtmlEmail(digest: Digest, dateStr: string, articleBody: string): string {
  const hashtagsText = digest.hashtags.join(" ");

  const xPostRaw = digest.xPost ?? "";
  const xPostTruncated = xPostRaw.length > 280 ? xPostRaw.slice(0, 240) + "…" : xPostRaw;
  const xPostEncoded = encodeURIComponent(xPostTruncated);

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${digest.subject}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
@media (prefers-color-scheme: dark) {
  body, table, td, div, p, span { background-color: #ffffff !important; color: #1e293b !important; }
  .email-body { background: #ffffff !important; }
  .btn-twitter { background-color: #000000 !important; color: #ffffff !important; }
  .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:#f8fafc;color-scheme:light;supported-color-schemes:light;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table class="email-body" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:24px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:#ffffff;padding:22px 32px;border-bottom:1px solid #e2e8f0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><span style="font-size:20px;font-weight:800;color:#4f46e5;letter-spacing:-0.02em;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Aikostnad</span></td>
                <td align="right"><span style="font-size:13px;color:#94a3b8;">${dateStr}</span></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="email-body" style="padding:32px;background:#ffffff;">
            ${articleBody}

            <!-- Hashtags -->
            <p style="margin:28px 0 16px;font-size:14px;color:#475569;line-height:1.6;">${hashtagsText}</p>

            <!-- X/Twitter button -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
              <tr>
                <td bgcolor="#000000" style="border-radius:8px;">
                  <a class="btn-twitter" href="https://twitter.com/intent/tweet?text=${xPostEncoded}" style="display:block;background:#000000;color:#ffffff;text-decoration:none;padding:15px 24px;border-radius:8px;font-weight:700;font-size:16px;text-align:center;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">X &nbsp;Dela på Twitter &rarr;</a>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td bgcolor="#4f46e5" style="border-radius:8px;">
                    <a class="btn-cta" href="https://aikostnad.se/kalkylator" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;text-decoration:none;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Räkna ut din AI-kostnad &rarr;</a>
                  </td>
                </tr>
              </table>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;">
              <a href="https://aikostnad.se" style="color:#94a3b8;text-decoration:none;">aikostnad.se</a>
              &nbsp;&middot;&nbsp;Du får detta mail som prenumerant
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = (req.headers["authorization"] as string) ?? "";
    if (auth !== `Bearer ${cronSecret}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  const todaySlug = new Date().toISOString().split("T")[0];
  const dateStr = formatSwedishDate(new Date());

  // 1. Fetch yesterday's article for dedup
  const prevArticle = await fetchYesterdayArticle();

  // 2. Fetch RSS
  let articles: Article[] = [];
  try {
    articles = await fetchRecentArticles();
  } catch (e) {
    console.error("RSS fetch failed:", e);
  }

  // 3. Generate digest with Claude (fallback to raw headlines on failure)
  let digest: Digest;
  let claudeOk = false;

  if (articles.length > 0) {
    const generated = await generateDigest(
      articles,
      todaySlug,
      prevArticle?.title,
      prevArticle?.article_urls
    );
    if (generated) {
      digest = generated;
      claudeOk = true;
    } else {
      digest = buildFallbackDigest(articles, todaySlug);
    }
  } else {
    digest = {
      subject: "Dagens AI-nyheter från aikostnad.se",
      headline: "Dagens AI-nyheter",
      ingress: "Inga nyheter tillgängliga idag.",
      sections: [
        {
          title: "Status",
          content:
            'Vi kunde inte hämta nyheter idag. Besök <a href="https://aikostnad.se">aikostnad.se</a> för senaste uppdateringarna.',
        },
      ],
      takeaway: "Håll koll på AI-kostnader på aikostnad.se",
      hashtags: ["#AI", "#AIpriser"],
      xPost: `Inga nyheter tillgängliga idag.\n\nHela rapporten: https://aikostnad.se/nyheter/${todaySlug}\n\n#AI #AIpriser`,
    };
  }

  // 4. Build HTML
  const htmlArticleBody = buildArticleHtml(digest);
  const htmlEmail = buildHtmlEmail(digest, dateStr, htmlArticleBody);

  // 5. Save to Supabase before sending email
  await saveArticle({
    date: todaySlug,
    slug: todaySlug,
    title: digest.headline,
    ingress: digest.ingress,
    content: htmlArticleBody,
    x_post: digest.xPost ?? "",
    article_urls: articles.map((a) => a.url),
  });

  // 6. Send via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not set");
    res.status(500).json({ success: false, emailSent: false, error: "RESEND_API_KEY not set" });
    return;
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "hej@aikostnad.se",
        to: "christoffer.nolet@gmail.com",
        subject: digest.subject,
        html: htmlEmail,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      console.error("Resend error:", resendRes.status, errText);
      res.status(500).json({ success: false, emailSent: false, error: `Resend ${resendRes.status}` });
      return;
    }

    console.log(`Morning digest sent: ${digest.subject}`);
    res.status(200).json({ success: true, emailSent: true, claudeOk, subject: digest.subject });
  } catch (e) {
    console.error("Resend network failure:", e);
    res.status(500).json({ success: false, emailSent: false, error: "Network failure sending email" });
  }
}
