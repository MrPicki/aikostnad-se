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
}

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

async function generateDigest(articles: Article[]): Promise<Digest | null> {
  const newsSummary = articles
    .slice(0, 8)
    .map((a, i) => `${i + 1}. ${a.title}\n   ${a.summary.slice(0, 200)}`)
    .join("\n\n");

  const prompt = `Du är chefredaktör på aikostnad.se. Skriv dagens AI-nyhetsrapport på svenska som en professionell nyhetsjournalist för en ledande tekniksajt.

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
    { "title": "Avsnittets rubrik", "content": "Avsnittets text med HTML-länkar inbäddade" },
    ...
  ],
  "takeaway": "Dagens takeaway-text",
  "hashtags": ["#AI", "#AIpriser", "#GPT", "#MachineLearning"]
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

function buildFallbackDigest(articles: Article[]): Digest {
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
  };
}

function buildHtmlEmail(digest: Digest, dateStr: string): string {
  const sectionsHtml = digest.sections
    .map(
      (s) => `
    <h2 style="font-size:18px;font-weight:700;color:#1e1b4b;margin:28px 0 8px;">${s.title}</h2>
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0;">${s.content}</p>`
    )
    .join("\n");

  const hashtagsHtml = digest.hashtags
    .map((tag) => {
      const encoded = encodeURIComponent(tag);
      return `<a href="https://twitter.com/search?q=${encoded}" style="display:inline-block;background:#dc2626;color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;margin:2px 4px 2px 0;">${tag}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${digest.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:24px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:#4f46e5;padding:28px 32px;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.8);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">aikostnad.se</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">Dagens AI-rapport</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">${dateStr}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">

            <h1 style="font-size:24px;font-weight:800;color:#1e1b4b;margin:0 0 16px;line-height:1.3;">${digest.headline}</h1>

            <p style="font-size:16px;color:#374151;font-style:italic;border-left:4px solid #4f46e5;padding-left:16px;margin:0 0 28px;line-height:1.7;">${digest.ingress}</p>

            ${sectionsHtml}

            <!-- Takeaway -->
            <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px 24px;margin:32px 0 24px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:0.05em;">Dagens takeaway</p>
              <p style="margin:0;font-size:15px;color:#1e293b;line-height:1.6;">${digest.takeaway}</p>
            </div>

            <!-- Hashtags -->
            <div style="margin:0 0 28px;">${hashtagsHtml}</div>

            <!-- CTA -->
            <div style="text-align:center;margin:32px 0;">
              <a href="https://aikostnad.se/kalkylator" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">Beräkna din AI-kostnad &rarr;</a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f1f5f9;padding:20px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">
              <a href="https://aikostnad.se" style="color:#4f46e5;font-weight:600;text-decoration:none;">aikostnad.se</a>
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

  const dateStr = formatSwedishDate(new Date());

  // 1. Fetch RSS
  let articles: Article[] = [];
  try {
    articles = await fetchRecentArticles();
  } catch (e) {
    console.error("RSS fetch failed:", e);
  }

  // 2. Generate digest with Claude (fallback to raw headlines on failure)
  let digest: Digest;
  let claudeOk = false;

  if (articles.length > 0) {
    const generated = await generateDigest(articles);
    if (generated) {
      digest = generated;
      claudeOk = true;
    } else {
      digest = buildFallbackDigest(articles);
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
    };
  }

  // 3. Build HTML
  const htmlEmail = buildHtmlEmail(digest, dateStr);

  // 4. Send via Resend
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
