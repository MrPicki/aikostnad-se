export const config = { runtime: "edge" };

// Reuse the guide content for email rendering. We can't import from src/ in
// the edge runtime (different tsconfig + browser-only modules), so the guide
// data is duplicated below as a slim email-friendly map.

interface EmailGuide {
  providerName: string;
  signupUrl: string;
  signupSummary: string;
  apiKeyUrl: string;
  pricingUrl: string;
  docsUrl: string;
  firstAnrop: string;
  threeTopTips: string[];
}

const GUIDES: Record<string, EmailGuide> = {
  openai: {
    providerName: "OpenAI",
    signupUrl: "https://platform.openai.com/signup",
    signupSummary: "Registrera dig på platform.openai.com och skapa ett developer-konto.",
    apiKeyUrl: "https://platform.openai.com/api-keys",
    pricingUrl: "https://openai.com/api/pricing/",
    docsUrl: "https://platform.openai.com/docs",
    firstAnrop:
      "Använd OpenAI SDK med modellen \"gpt-4o-mini\" som default. Glöm inte att sätta en utgiftsgräns i Billing → Limits innan du går live.",
    threeTopTips: [
      "Börja med GPT-4o mini ($0,15/$0,60 per Mtok) — 17× billigare än GPT-4o.",
      "Sätt max_tokens på 200–300 om du inte behöver långa svar. Output kostar 4× mer än input.",
      "Använd Batch API för icke-tidskritiska anrop — 50% rabatt om du kan vänta upp till 24h.",
    ],
  },
  anthropic: {
    providerName: "Anthropic (Claude)",
    signupUrl: "https://console.anthropic.com",
    signupSummary:
      "Registrera dig på console.anthropic.com. Notera att Anthropic kräver telefonverifiering före API-åtkomst.",
    apiKeyUrl: "https://console.anthropic.com/settings/keys",
    pricingUrl: "https://www.anthropic.com/pricing",
    docsUrl: "https://docs.anthropic.com",
    firstAnrop:
      "Använd Anthropic SDK med modellen \"claude-haiku-4-5\" som default. Aktivera prompt caching för stora system-promtar — det halverar din kostnad.",
    threeTopTips: [
      "Använd prompt caching för system-promtar över 1024 tokens — 90% rabatt på den cachade delen.",
      "Starta med Claude Haiku 4.5 för 80% av användningsfallen. Eskalera till Sonnet bara där du ser kvalitetsproblem.",
      "Mät cache hit rate via usage.cache_read_input_tokens — under 50% betyder att prompt-strukturen är fel.",
    ],
  },
  google: {
    providerName: "Google AI (Gemini)",
    signupUrl: "https://aistudio.google.com",
    signupSummary:
      "Logga in på aistudio.google.com med ditt Google-konto. Du kommer direkt till en lekplats där du kan testa Gemini utan kod.",
    apiKeyUrl: "https://aistudio.google.com/apikey",
    pricingUrl: "https://ai.google.dev/pricing",
    docsUrl: "https://ai.google.dev/docs",
    firstAnrop:
      "Använd @google/generative-ai SDK med modellen \"gemini-2.5-flash\". Generös gratis-tier för utveckling — utmärkt för att börja.",
    threeTopTips: [
      "Default till Gemini 2.5 Flash — den är billig nog för de flesta volymer och tillräcklig för 80% av uppgifterna.",
      "Använd context caching för kontexter över 32K tokens som återanvänds — sänker kostnaden med 50–75%.",
      "Sätt budgetalarm i Google Cloud Console vid 50% och 90% av månadsbudgeten.",
    ],
  },
  mistral: {
    providerName: "Mistral AI",
    signupUrl: "https://console.mistral.ai",
    signupSummary:
      "Registrera dig på console.mistral.ai. Mistral är franskt och processar data inom EU — utmärkt för svenska B2B-kunder med datasäkerhetskrav.",
    apiKeyUrl: "https://console.mistral.ai/api-keys",
    pricingUrl: "https://mistral.ai/technology/#pricing",
    docsUrl: "https://docs.mistral.ai",
    firstAnrop:
      "Mistral API är OpenAI-kompatibelt — använd OpenAI SDK med base_url https://api.mistral.ai/v1 och modellen \"mistral-small-latest\".",
    threeTopTips: [
      "Mistral Small ($0,10/$0,30 per Mtok) är prisledare — använd den för all volym-tung användning.",
      "Reservera Mistral Large bara för komplexa resonemang eller djup kodning — 5-8× dyrare än Small.",
      "GDPR-fördel: Mistral processar data inom EU — viktigt för svenska B2B-avtal med datasäkerhetskrav.",
    ],
  },
  deepseek: {
    providerName: "DeepSeek",
    signupUrl: "https://platform.deepseek.com",
    signupSummary:
      "Registrera dig på platform.deepseek.com. Notera: DeepSeek är ett kinesiskt företag — läs deras privacy policy om dataresidens är kritiskt för dina kunder.",
    apiKeyUrl: "https://platform.deepseek.com/api_keys",
    pricingUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    docsUrl: "https://api-docs.deepseek.com",
    firstAnrop:
      "DeepSeek API är OpenAI-kompatibelt — använd OpenAI SDK med base_url https://api.deepseek.com och modellen \"deepseek-chat\".",
    threeTopTips: [
      "DeepSeek V3.2 ($0,28/$0,42 per Mtok) är prisvärd mainstream. R1 ($0,55/$2,19) är för resonemangsuppgifter.",
      "Off-peak-rabatt: anrop mellan 16:30–00:30 UTC är 50–75% billigare — schemalägg batch-jobb till natten.",
      "OpenAI SDK fungerar direkt — byt bara base_url, slipp extra dependency.",
    ],
  },
};

const ALLOWED_ORIGINS = new Set([
  "https://aikostnad.se",
  "https://www.aikostnad.se",
  "https://aikostnad.com",
  "https://www.aikostnad.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allowed =
    origin &&
    (ALLOWED_ORIGINS.has(origin) ||
      /^https:\/\/[a-z0-9-]+-aikostnad-se\.vercel\.app$/.test(origin));
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://aikostnad.se",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

// Shared email chrome — mirrors the daily newsletter (api/morning-digest.ts) so
// every mail we send (guides + price alerts) looks identical: Plus Jakarta Sans,
// off-white outer frame around a 600px white card, logo header with a label on
// the right, indigo CTA, centred footer, and forced light mode on dark clients.
const EMAIL_FONT =
  "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";

function emailShell(opts: {
  subject: string;
  headerLabel: string;
  bodyHtml: string;
  footerHtml: string;
}): string {
  const { subject, headerLabel, bodyHtml, footerHtml } = opts;
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
/* Force light mode — Apple Mail, Outlook iOS */
@media (prefers-color-scheme: dark) {
  body, .outer-wrap, .inner-wrap, .content-td, .header-td, .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
  .btn-cta-td { background-color: #4f46e5 !important; }
  .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
}
/* Gmail dark mode (Android + iOS app) */
[data-ogsc] body, [data-ogsc] .outer-wrap, [data-ogsc] .inner-wrap, [data-ogsc] .content-td, [data-ogsc] .header-td, [data-ogsc] .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
[data-ogsc] .btn-cta-td { background-color: #4f46e5 !important; }
[data-ogsc] .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
[data-ogsb] body, [data-ogsb] .outer-wrap, [data-ogsb] .inner-wrap, [data-ogsb] .content-td, [data-ogsb] .header-td, [data-ogsb] .footer-td { background-color: #ffffff !important; color: #1e293b !important; }
[data-ogsb] .btn-cta-td { background-color: #4f46e5 !important; }
[data-ogsb] .btn-cta { background-color: #4f46e5 !important; color: #ffffff !important; }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;color-scheme:light;supported-color-schemes:light;font-family:${EMAIL_FONT};">
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
                <td align="right" bgcolor="#ffffff" style="background-color:#ffffff;vertical-align:middle;"><span style="font-size:13px;color:#94a3b8;">${escapeHtml(headerLabel)}</span></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="content-td" bgcolor="#ffffff" style="padding:32px;background-color:#ffffff;">
            ${bodyHtml}

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
              <tr>
                <td align="center" bgcolor="#ffffff" style="background-color:#ffffff;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="btn-cta-td" bgcolor="#4f46e5" style="background-color:#4f46e5;border-radius:8px;">
                        <a class="btn-cta" href="https://aikostnad.se/token-kalkylator" style="display:inline-block;background-color:#4f46e5;color:#ffffff;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;text-decoration:none;font-family:${EMAIL_FONT};">Räkna ut din AI-kostnad →</a>
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
            ${footerHtml}
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// Body typography helpers — same scale as the newsletter article body.
function emailH1(text: string): string {
  return `<h1 style="font-size:26px;font-weight:800;color:#0f172a;margin:0 0 16px;line-height:1.3;">${text}</h1>`;
}

function emailIngress(text: string): string {
  return `<p style="font-size:17px;color:#475569;font-style:italic;line-height:1.7;margin:0 0 4px;">${text}</p>`;
}

function emailSection(title: string, bodyHtml: string): string {
  return (
    `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">` +
    `<h2 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 10px;line-height:1.4;">${title}</h2>` +
    bodyHtml
  );
}

function emailP(text: string): string {
  return `<p style="font-size:15px;color:#334155;line-height:1.8;margin:0 0 10px;">${text}</p>`;
}

function emailLink(href: string, label: string): string {
  return `<a href="${escapeAttr(href)}" style="color:#4f46e5;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a>`;
}

function emailFooter(reason: string): string {
  return (
    `<p style="margin:0 0 6px;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">${reason}</p>` +
    `<p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">` +
    `<a href="https://aikostnad.se" style="color:#94a3b8;text-decoration:none;">aikostnad.se</a>` +
    `&nbsp;&middot;&nbsp;Hantera dina uppgifter enligt vår <a href="https://aikostnad.se/integritet" style="color:#94a3b8;text-decoration:underline;">integritetspolicy</a>` +
    `&nbsp;&middot;&nbsp;Avregistrera: svara på mailet eller maila hej@aikostnad.se` +
    `</p>`
  );
}

function buildEmailHtml(guide: EmailGuide, modelName: string | undefined): string {
  const safeModel = modelName ? ` (${escapeHtml(modelName)})` : "";

  const body =
    emailH1(`${escapeHtml(guide.providerName)}${safeModel}`) +
    emailIngress(
      "Här är din steg-för-steg-guide för att komma igång — från konto till ditt första anrop, plus tre tips som sänker din kostnad direkt."
    ) +
    emailSection(
      "1. Skapa konto",
      emailP(escapeHtml(guide.signupSummary)) +
        emailP(emailLink(guide.signupUrl, guide.signupUrl))
    ) +
    emailSection(
      "2. Skapa API-nyckel",
      emailP(
        'Logga in i dashboarden, gå till "API Keys", skapa en ny nyckel. Kopiera och spara säkert — du ser nyckeln bara en gång.'
      ) + emailP(emailLink(guide.apiKeyUrl, guide.apiKeyUrl))
    ) +
    emailSection(
      "3. Ladda saldo + sätt utgiftsgräns",
      emailP(
        "Lägg in betalningsmetod och ladda saldo (de flesta leverantörer använder prepaid). <strong>Sätt alltid en månadsgräns</strong> — det är ditt säkerhetsnät mot buggar som genererar tusentals onödiga anrop."
      )
    ) +
    emailSection("4. Ditt första anrop", emailP(escapeHtml(guide.firstAnrop))) +
    emailSection(
      "5. Tre tips för att spara pengar",
      `<ul style="margin:0;padding-left:20px;">${guide.threeTopTips
        .map(
          (t) =>
            `<li style="font-size:15px;color:#334155;line-height:1.8;margin-bottom:8px;">${escapeHtml(t)}</li>`
        )
        .join("")}</ul>`
    ) +
    emailSection(
      "Officiella resurser",
      emailP(
        `${emailLink(guide.pricingUrl, "Prislista")} &middot; ${emailLink(
          guide.docsUrl,
          "API-dokumentation"
        )} &middot; ${emailLink("https://aikostnad.se/", "Räkna på din egen volym")}`
      )
    );

  return emailShell({
    subject: `Din ${guide.providerName}-guide från Aikostnad.se`,
    headerLabel: "Steg-för-steg-guide",
    bodyHtml: body,
    footerHtml: emailFooter("Du får detta mail för att du bad om en guide via aikostnad.se"),
  });
}

// Generic price-alert confirmation — used when no specific provider guide was
// requested (e.g. the homepage "bevaka mitt pris" form, the sticky bar and the
// post-calculation capture all sign up for price alerts without a providerId).
function buildPriceAlertHtml(): string {
  const body =
    emailH1("Du bevakar nu AI-priser ✓") +
    emailIngress(
      "Tack! Vi hör av oss när priserna på de stora AI-modellerna (ChatGPT, Claude, Gemini m.fl.) ändras — max en gång per vecka, ofta mer sällan."
    ) +
    emailSection(
      "Räkna medan du väntar",
      emailP(
        "Räkna ut exakt vad ditt AI-användningsfall kostar i kronor:"
      ) +
        emailP(emailLink("https://aikostnad.se/token-kalkylator", "Öppna kalkylatorn på aikostnad.se →"))
    ) +
    emailSection(
      "Snabbtips medan du väntar",
      `<ul style="margin:0;padding-left:20px;">
        <li style="font-size:15px;color:#334155;line-height:1.8;margin-bottom:8px;">Börja alltid med den billigaste modellen (GPT-4o mini, Claude Haiku, Gemini Flash) — den räcker för ~80% av användningsfallen.</li>
        <li style="font-size:15px;color:#334155;line-height:1.8;margin-bottom:8px;">Output-tokens kostar 4&times; mer än input. Sätt en rimlig <code>max_tokens</code>.</li>
        <li style="font-size:15px;color:#334155;line-height:1.8;margin-bottom:8px;">Aktivera prompt caching för stora system-promtar — upp till 90% rabatt på den cachade delen.</li>
      </ul>`
    );

  return emailShell({
    subject: "Du bevakar nu AI-priser — Aikostnad.se",
    headerLabel: "Prisbevakning",
    bodyHtml: body,
    footerHtml: emailFooter("Du får detta mail för att du anmälde dig till prisbevakning via aikostnad.se"),
  });
}

function buildPriceAlertText(): string {
  return `Aikostnad.se — Prisbevakning

Du bevakar nu AI-priser ✓

Tack! Vi hör av oss när priserna på de stora AI-modellerna (ChatGPT,
Claude, Gemini m.fl.) ändras — max en gång per vecka, ofta mer sällan.

Räkna ut exakt vad ditt AI-användningsfall kostar i kronor:
https://aikostnad.se/

SNABBTIPS MEDAN DU VÄNTAR
   1. Börja alltid med den billigaste modellen (GPT-4o mini, Claude
      Haiku, Gemini Flash) — den räcker för ~80% av användningsfallen.
   2. Output-tokens kostar 4x mer än input. Sätt en rimlig max_tokens.
   3. Aktivera prompt caching för stora system-promtar — upp till 90%
      rabatt på den cachade delen.

================================================================

Du fick det här mailet för att du anmälde dig till prisbevakning via
Aikostnad.se. Vi sparar din e-postadress enligt vår integritetspolicy:
https://aikostnad.se/integritet

Avregistrera dig — svara på det här mailet med "unsubscribe" eller
kontakta hej@aikostnad.se.
`;
}

function buildEmailText(guide: EmailGuide, modelName: string | undefined): string {
  const safeModel = modelName ? ` (${modelName})` : "";
  return `Aikostnad.se — Steg-för-steg-guide
${guide.providerName}${safeModel}

================================================================

1. SKAPA KONTO
${guide.signupSummary}
Länk: ${guide.signupUrl}

2. SKAPA API-NYCKEL
Logga in i dashboarden, gå till "API Keys", skapa en ny nyckel.
Kopiera och spara säkert — du ser nyckeln bara en gång.
Länk: ${guide.apiKeyUrl}

3. LADDA SALDO + SÄTT UTGIFTSGRÄNS
Lägg in betalningsmetod och ladda saldo (de flesta leverantörer
använder prepaid). Sätt alltid en månadsgräns — det är ditt
säkerhetsnät mot buggar som genererar tusentals onödiga anrop.

4. DITT FÖRSTA ANROP
${guide.firstAnrop}

5. TRE TIPS FÖR ATT SPARA PENGAR
${guide.threeTopTips.map((t, i) => `   ${i + 1}. ${t}`).join("\n")}

================================================================

Officiella resurser:
- Prislista: ${guide.pricingUrl}
- API-dokumentation: ${guide.docsUrl}
- Räkna på din egen volym: https://aikostnad.se/

================================================================

Du fick det här mailet för att du bad om en guide via Aikostnad.se.
Vi sparar din e-postadress enligt vår integritetspolicy:
https://aikostnad.se/integritet

Avregistrera dig — svara på det här mailet med "unsubscribe" eller
kontakta hej@aikostnad.se.
`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

interface SendGuidePayload {
  email: string;
  providerId: string;
  modelName?: string;
  source: string;
  consentMarketing?: boolean;
}

// Best-effort abuse protection. In-memory per edge instance (resets on cold
// start, not shared across instances) — not a hard guarantee, but it stops a
// single client from email-bombing arbitrary recipients or flooding Supabase.
// A durable limiter (Vercel KV) would be the next step if abuse appears.
const ipBucket = new Map<string, { count: number; resetAt: number }>();
const emailBucket = new Map<string, { count: number; resetAt: number }>();

function hitLimit(
  map: Map<string, { count: number; resetAt: number }>,
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = map.get(key);
  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  const headers = {
    ...corsHeaders(origin),
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  // Per-IP throttle: max 5 submissions/hour.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (hitLimit(ipBucket, ip, 5, 3_600_000)) {
    return new Response(
      JSON.stringify({ error: "För många förfrågningar — försök igen om en stund." }),
      { status: 429, headers }
    );
  }

  let payload: SendGuidePayload;
  try {
    payload = (await req.json()) as SendGuidePayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
  }

  const { email, providerId, modelName, source, consentMarketing } = payload;

  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Ogiltig e-postadress" }), {
      status: 400,
      headers,
    });
  }

  // Per-recipient throttle: max 2 mails/24h to the same address — prevents using
  // this endpoint to bomb a third-party inbox.
  if (hitLimit(emailBucket, email.toLowerCase(), 2, 86_400_000)) {
    return new Response(
      JSON.stringify({ error: "Den här adressen har redan fått guider nyligen." }),
      { status: 429, headers }
    );
  }

  // A specific provider guide is optional. When providerId is missing or
  // unknown the submission is a price-alert signup (homepage form, sticky bar,
  // post-calculation capture) — we still save the lead and send a generic
  // confirmation instead of rejecting the request.
  const guide = providerId ? GUIDES[providerId] : undefined;
  const leadType = guide ? "guide-request" : "price-alert";

  // 1) Save lead in Supabase (uses service role key to bypass RLS)
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseServiceKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email,
          calc_data: {
            type: leadType,
            providerId: providerId ?? null,
            modelName: modelName ?? null,
            source: source ?? "unknown",
            consentMarketing: !!consentMarketing,
          },
        }),
      });
    } catch (e) {
      console.error("Lead insert failed:", e);
      // continue — sending the mail is more important than logging the lead
    }
  }

  // 2) Send the email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM ?? "Aikostnad.se <hej@aikostnad.se>";

  if (!resendApiKey) {
    // In dev / before Resend is configured we still return success so the UX
    // flow works end-to-end. The lead is captured; the email can be sent
    // manually until Resend is wired up.
    console.warn("RESEND_API_KEY missing — email not sent");
    return new Response(JSON.stringify({ success: true, emailSent: false }), {
      status: 200,
      headers,
    });
  }

  const html = guide ? buildEmailHtml(guide, modelName) : buildPriceAlertHtml();
  const text = guide ? buildEmailText(guide, modelName) : buildPriceAlertText();
  const subject = guide
    ? `Din ${guide.providerName}-guide från Aikostnad.se`
    : "Du bevakar nu AI-priser — Aikostnad.se";

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [email],
        reply_to: "hej@aikostnad.se",
        subject,
        html,
        text,
        headers: {
          // Required by Gmail/Outlook bulk-sender guidelines (Feb 2024).
          // One-click unsubscribe via mailto.
          "List-Unsubscribe": `<mailto:hej@aikostnad.se?subject=unsubscribe-${encodeURIComponent(email)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      console.error("Resend error:", resendRes.status, errText);
      return new Response(
        JSON.stringify({ error: "Kunde inte skicka mailet just nu. Försök igen om en stund." }),
        { status: 502, headers }
      );
    }
  } catch (e) {
    console.error("Resend network failure:", e);
    return new Response(
      JSON.stringify({ error: "Nätverksfel vid mailutskick. Försök igen." }),
      { status: 502, headers }
    );
  }

  return new Response(JSON.stringify({ success: true, emailSent: true }), {
    status: 200,
    headers,
  });
}
