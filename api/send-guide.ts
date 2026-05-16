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

function buildEmailHtml(guide: EmailGuide, modelName: string | undefined): string {
  const safeModel = modelName ? ` (${escapeHtml(modelName)})` : "";
  return `<!DOCTYPE html>
<html lang="sv">
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 16px; margin-bottom: 24px;">
    <p style="font-size: 12px; color: #4f46e5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">Aikostnad.se · Steg-för-steg-guide</p>
    <h1 style="font-size: 22px; font-weight: 700; color: #111827; margin: 8px 0 0;">${escapeHtml(guide.providerName)}${safeModel}</h1>
  </div>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">1. Skapa konto</h2>
  <p>${escapeHtml(guide.signupSummary)}</p>
  <p><a href="${escapeAttr(guide.signupUrl)}" style="color: #4f46e5; font-weight: 600;">${escapeHtml(guide.signupUrl)}</a></p>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">2. Skapa API-nyckel</h2>
  <p>Logga in i dashboarden, gå till "API Keys", skapa en ny nyckel. Kopiera och spara säkert — du ser nyckeln bara en gång.</p>
  <p><a href="${escapeAttr(guide.apiKeyUrl)}" style="color: #4f46e5; font-weight: 600;">${escapeHtml(guide.apiKeyUrl)}</a></p>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">3. Ladda saldo + sätt utgiftsgräns</h2>
  <p>Lägg in betalningsmetod och ladda saldo (de flesta leverantörer använder prepaid). <strong>Sätt alltid en månadsgräns</strong> — det är ditt säkerhetsnät mot buggar som genererar tusentals onödiga anrop.</p>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">4. Ditt första anrop</h2>
  <p>${escapeHtml(guide.firstAnrop)}</p>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">5. Tre tips för att spara pengar</h2>
  <ul>
    ${guide.threeTopTips.map((t) => `<li style="margin-bottom: 8px;">${escapeHtml(t)}</li>`).join("")}
  </ul>

  <h2 style="font-size: 16px; color: #111827; margin-top: 24px;">Officiella resurser</h2>
  <p>
    <a href="${escapeAttr(guide.pricingUrl)}" style="color: #4f46e5;">Prislista</a> ·
    <a href="${escapeAttr(guide.docsUrl)}" style="color: #4f46e5;">API-dokumentation</a> ·
    <a href="https://aikostnad.se/" style="color: #4f46e5;">Räkna på din egen volym</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
  <p style="font-size: 12px; color: #6b7280;">
    Du fick det här mailet för att du bad om en guide via Aikostnad.se. Vi sparar din e-postadress
    enligt vår <a href="https://aikostnad.se/integritet" style="color: #4f46e5;">integritetspolicy</a>.
    Vill du bli borttagen — svara på det här mailet eller kontakta hej@aikostnad.se.
  </p>
</body>
</html>`;
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

  const guide = GUIDES[providerId];
  if (!guide) {
    return new Response(JSON.stringify({ error: "Okänd leverantör" }), {
      status: 400,
      headers,
    });
  }

  // 1) Save lead in Supabase (uses service role key to bypass RLS)
  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
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
            type: "guide-request",
            providerId,
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
    console.warn("RESEND_API_KEY missing — email not sent for", email);
    return new Response(JSON.stringify({ success: true, emailSent: false }), {
      status: 200,
      headers,
    });
  }

  const html = buildEmailHtml(guide, modelName);
  const subject = `Din ${guide.providerName}-guide`;

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
        subject,
        html,
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
