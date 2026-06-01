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
  return process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
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
  // Per-feed timeout 5s — fetch all feeds in PARALLEL to stay well within function time budget
  const parser = new Parser({
    timeout: 5_000,
    headers: { "User-Agent": "aikostnad-digest/1.0" },
  });

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const results = await Promise.allSettled(
    RSS_FEEDS.map((feedUrl) => parser.parseURL(feedUrl))
  );

  const articles: Article[] = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "rejected") {
      console.error(`RSS fetch failed for ${RSS_FEEDS[i]}:`, result.reason);
      continue;
    }
    for (const item of (result.value.items ?? []).slice(0, 10)) {
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

  const prompt = `Du är chefredaktör på aikostnad.se. Skriv dagens AI-nyhetsrapport på svenska.
${dedupNote}

VIKTIGT: Följ mallen EXAKT — samma struktur varje dag, bara innehållet varierar.

━━━ FAST MALL (följ alltid) ━━━

AVSNITT 1 — "Veckans stora rörelse"
Välj den viktigaste nyheten. Förklara vad som hände, varför det spelar roll för AI-marknaden,
och hur det påverkar prissättningen eller tillgången på AI-tjänster. (3–4 meningar)

AVSNITT 2 — "Vad svenska företag bör notera"
Konkret konsekvens för ett svenskt bolag som betalar för AI API:er.
Lyft prisaspekten — billigare, dyrare, nytt alternativ? (3–4 meningar)

AVSNITT 3 — "På radarn"
En kortare notis om en annan nyhet från listan som är värd att bevaka.
Ton: neutral, faktabaserad. (2–3 meningar)

DAGENS TAKEAWAY — en enda konkret mening som en CFO eller CTO kan agera på direkt.

━━━ REGLER ━━━
- Professionell, analytisk ton — inga reklamfraser, inga utropstecken
- Varje avsnitt: exakt de rubriker som anges ovan
- Inkludera relevanta interna länkar naturligt (max 2 per avsnitt):
    GPT/OpenAI → https://aikostnad.se/vad-kostar-chatgpt
    Claude/Anthropic → https://aikostnad.se/claude-pris
    Gemini/Google → https://aikostnad.se/gemini-pris
    Prisändringar → https://aikostnad.se/prisandringar
    Jämförelser → https://aikostnad.se/jamfor-ai-modeller
    Kalkylator → https://aikostnad.se/token-kalkylator
- Rubrik: informativ, max 90 tecken, inga frågor eller clickbait
- Ämnesrad (subject): max 55 tecken, faktapåstående

Dagens nyheter:
${newsSummary}

Returnera ENBART giltig JSON (ingen text före eller efter):
{
  "subject": "Ämnesrad max 55 tecken",
  "headline": "Artikelrubrik max 90 tecken",
  "ingress": "2–3 meningar som sammanfattar det viktigaste — fångar läsaren direkt",
  "sections": [
    { "title": "Veckans stora rörelse", "content": "Avsnittets text med eventuella HTML-länkar" },
    { "title": "Vad svenska företag bör notera", "content": "Avsnittets text med eventuella HTML-länkar" },
    { "title": "På radarn", "content": "Avsnittets text med eventuell HTML-länk" }
  ],
  "takeaway": "En konkret mening — CFO/CTO kan agera på den direkt",
  "hashtags": ["#AI", "#AIpriser", "#Svenska företag"],
  "xPost": "Ingress max 220 tecken\\n\\nHela rapporten: https://aikostnad.se/nyheter/${todaySlug}\\n\\n#AI #AIpriser"
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
        model: "claude-haiku-4-5",
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
  // Strukturera fallback i samma tre avsnitt som mallen — inte bulletlista
  const top = articles.slice(0, 3);
  const main = top[0];
  const second = top[1];
  const third = top[2];

  const mainContent = main
    ? `${main.title}. ${main.summary ? main.summary.slice(0, 300) : "Läs mer på källan."} Se <a href="https://aikostnad.se/jamfor-ai-modeller">aktuella AI-modellpriser</a> för att förstå konsekvenserna.`
    : "Inga nyheter tillgängliga just nu.";

  const secondContent = second
    ? `${second.title}. ${second.summary ? second.summary.slice(0, 250) : ""} Räkna ut kostnaden för ditt bolag på <a href="https://aikostnad.se/token-kalkylator">aikostnad.se/token-kalkylator</a>.`
    : "Besök aikostnad.se för senaste uppdateringar.";

  const thirdContent = third
    ? `${third.title}. ${third.summary ? third.summary.slice(0, 200) : ""}`
    : "Följ aikostnad.se för dagliga uppdateringar.";

  return {
    subject: "Dagens AI-nyheter — aikostnad.se",
    headline: "Dagens AI-nyheter",
    ingress: "AI-rapportgeneratorn kunde inte nå AI-tjänsten idag. Här är de viktigaste nyheterna direkt från källorna.",
    sections: [
      { title: "Veckans stora rörelse", content: mainContent },
      { title: "Vad svenska företag bör notera", content: secondContent },
      { title: "På radarn", content: thirdContent },
    ],
    takeaway: "Håll koll på AI-kostnader och prisförändringar på aikostnad.se — uppdateras dagligen.",
    hashtags: ["#AI", "#AIpriser", "#Svenska företag"],
    xPost: `Dagens AI-nyheter från aikostnad.se.\n\nHela rapporten: https://aikostnad.se/nyheter/${todaySlug}\n\n#AI #AIpriser`,
  };
}

// Defense-in-depth: the digest text comes from an LLM fed third-party RSS, so
// strip anything that could become stored XSS before it is persisted/emailed.
// (The client also DOMPurifies on render — this is the second layer, edge-safe
// without a DOM.)
function stripDangerousHtml(input: string): string {
  return String(input ?? "")
    // remove whole script/style/iframe/object/embed blocks
    .replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)\b[^>]*>/gi, "")
    // strip inline event handlers: on...="..." / on...='...' / on...=value
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // neutralise javascript:/data: URIs
    .replace(/(href|src)\s*=\s*("|')?\s*(javascript|data):/gi, '$1=$2#');
}

function buildArticleHtml(digest: Digest): string {
  const sectionsHtml = digest.sections
    .map(
      (s) =>
        `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">` +
        `<h2 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 10px;line-height:1.4;">${stripDangerousHtml(s.title)}</h2>` +
        `<p style="font-size:15px;color:#334155;line-height:1.8;margin:0;">${stripDangerousHtml(s.content)}</p>`
    )
    .join("\n");

  return (
    `<h1 style="font-size:26px;font-weight:800;color:#0f172a;margin:0 0 16px;line-height:1.3;">${stripDangerousHtml(digest.headline)}</h1>\n` +
    `<p style="font-size:17px;color:#475569;font-style:italic;line-height:1.7;margin:0 0 4px;">${stripDangerousHtml(digest.ingress)}</p>\n` +
    sectionsHtml +
    `\n<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">` +
    `<p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Slutsats</p>` +
    `<p style="margin:0;font-size:15px;color:#0f172a;line-height:1.7;">${stripDangerousHtml(digest.takeaway)}</p>`
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
/* Force light mode — Apple Mail, Outlook iOS */
@media (prefers-color-scheme: dark) {
  body, .outer-wrap, .inner-wrap, .content-td, .header-td, .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
  .btn-twitter-td { background-color: #000000 !important; }
  .btn-twitter { background-color: #000000 !important; color: #ffffff !important; }
  .btn-cta-td { background-color: #4f46e5 !important; }
  .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
}
/* Gmail dark mode (Android + iOS app) */
[data-ogsc] body, [data-ogsc] .outer-wrap, [data-ogsc] .inner-wrap, [data-ogsc] .content-td, [data-ogsc] .header-td, [data-ogsc] .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
[data-ogsc] .btn-twitter-td { background-color: #000000 !important; }
[data-ogsc] .btn-twitter { background-color: #000000 !important; color: #ffffff !important; }
[data-ogsc] .btn-cta-td { background-color: #4f46e5 !important; }
[data-ogsc] .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
[data-ogsb] body, [data-ogsb] .outer-wrap, [data-ogsb] .inner-wrap, [data-ogsb] .content-td, [data-ogsb] .header-td, [data-ogsb] .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
[data-ogsb] .btn-twitter-td { background-color: #000000 !important; }
[data-ogsb] .btn-twitter { background-color: #000000 !important; color: #ffffff !important; }
[data-ogsb] .btn-cta-td { background-color: #4f46e5 !important; }
[data-ogsb] .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;color-scheme:light;supported-color-schemes:light;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table class="outer-wrap" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color:#f8fafc;padding:24px 0;">
  <tr>
    <td align="center" bgcolor="#f8fafc" style="background-color:#f8fafc;">
      <table class="inner-wrap" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px;width:100%;background-color:#ffffff;">

        <!-- Header -->
        <tr>
          <td class="header-td" bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 32px;border-bottom:1px solid #e2e8f0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#ffffff" style="background-color:#ffffff;vertical-align:middle;">
                  <a href="https://aikostnad.se" style="text-decoration:none;display:inline-block;">
                    <img src="https://aikostnad.se/email-logo.png" alt="Aikostnad.se" width="167" height="22" style="display:block;border:0;outline:none;max-width:167px;height:auto;" />
                  </a>
                </td>
                <td align="right" bgcolor="#ffffff" style="background-color:#ffffff;vertical-align:middle;"><span style="font-size:13px;color:#94a3b8;">${dateStr}</span></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="content-td" bgcolor="#ffffff" style="padding:32px;background-color:#ffffff;">
            ${articleBody}

            <!-- Hashtags -->
            <p style="margin:28px 0 20px;font-size:14px;color:#475569;line-height:1.6;">${hashtagsText}</p>

            <!-- X/Twitter button -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
              <tr>
                <td class="btn-twitter-td" bgcolor="#000000" style="background-color:#000000;border-radius:8px;padding:0;">
                  <a class="btn-twitter" href="https://twitter.com/intent/tweet?text=${xPostEncoded}" style="display:block;background-color:#000000;color:#ffffff;text-decoration:none;padding:16px 24px;border-radius:8px;font-weight:700;font-size:16px;text-align:center;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">𝕏&nbsp;&nbsp;Dela på Twitter →</a>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
              <tr>
                <td align="center" bgcolor="#ffffff" style="background-color:#ffffff;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="btn-cta-td" bgcolor="#4f46e5" style="background-color:#4f46e5;border-radius:8px;">
                        <a class="btn-cta" href="https://aikostnad.se/token-kalkylator" style="display:inline-block;background-color:#4f46e5;color:#ffffff;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;text-decoration:none;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Räkna ut din AI-kostnad →</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer-td" bgcolor="#f8fafc" style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
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
  // Fail closed: this endpoint sends real email (Resend), writes to Supabase
  // and calls a paid LLM. A missing CRON_SECRET must NOT open it to the public,
  // so we refuse to run unless the secret is configured AND matches.
  const cronSecret = process.env.CRON_SECRET;
  const auth = (req.headers["authorization"] as string) ?? "";
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
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
        from: "Dagens AI-nyheter <hej@aikostnad.se>",
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
