export const config = { runtime: "edge" };

// Model prices kept in sync with src/data/modelPricing.ts
const MODEL_PRICES: Record<string, { input: number; output: number; name: string }> = {
  "mistral-small":     { input: 0.10, output: 0.30,  name: "Mistral Small" },
  "gpt-4o-mini":       { input: 0.15, output: 0.60,  name: "GPT-4o mini" },
  "deepseek-v3":       { input: 0.28, output: 0.42,  name: "DeepSeek V3.2" },
  "gemini-2.5-flash":  { input: 0.30, output: 2.50,  name: "Gemini 2.5 Flash" },
  "gpt-4.1-mini":      { input: 0.40, output: 1.60,  name: "GPT-4.1 mini" },
  "deepseek-r1":       { input: 0.55, output: 2.19,  name: "DeepSeek R1" },
  "llama-3.3-70b":     { input: 0.59, output: 0.79,  name: "Llama 3.3 70B" },
  "claude-haiku-4-5":  { input: 1.00, output: 5.00,  name: "Claude Haiku 4.5" },
  "gemini-2.5-pro":    { input: 1.00, output: 10.00, name: "Gemini 2.5 Pro" },
  "mistral-large":     { input: 2.00, output: 6.00,  name: "Mistral Large" },
  "gpt-4.1":           { input: 2.00, output: 8.00,  name: "GPT-4.1" },
  "claude-sonnet-4-6": { input: 3.00, output: 15.00, name: "Claude Sonnet 4.6" },
  "claude-opus-4-7":   { input: 5.00, output: 25.00, name: "Claude Opus 4.7" },
};

const VALID_MODEL_IDS = new Set(Object.keys(MODEL_PRICES));
const LANGUAGE_FACTOR = 1.3;

function computeMonthlyCostUsd(
  modelId: string,
  inputWords: number,
  outputWords: number,
  requestsPerDay: number,
  users: number,
  daysPerMonth: number
): number {
  const m = MODEL_PRICES[modelId];
  if (!m) return 0;
  const inputTok = inputWords * LANGUAGE_FACTOR;
  const outputTok = outputWords * LANGUAGE_FACTOR;
  const costPerReq = (inputTok / 1_000_000) * m.input + (outputTok / 1_000_000) * m.output;
  return costPerReq * requestsPerDay * users * daysPerMonth;
}

const SYSTEM = `Du är expert på AI-kostnadsestimering för svenska projekt och företag.

Användaren beskriver en idé eller ett användningsfall på svenska.
Din uppgift är att förstå vad de vill bygga och uppskatta rimliga parametrar.

TILLGÄNGLIGA MODELLER (använd exakt dessa id-strängar):
- "mistral-small"      $0.10/$0.30  — billigast, GDPR-vänlig, enkel
- "gpt-4o-mini"        $0.15/$0.60  — populär, bra kvalitet/pris, chatbotar
- "deepseek-v3"        $0.28/$0.42  — open-weight, billig, kinesisk leverantör
- "gemini-2.5-flash"   $0.30/$2.50  — snabb, 1M kontext, multimodal
- "gpt-4.1-mini"       $0.40/$1.60  — balanserad OpenAI, assistenter
- "deepseek-r1"        $0.55/$2.19  — open-weight resonemang, kod, logik
- "llama-3.3-70b"      $0.59/$0.79  — open source, fri licens
- "claude-haiku-4-5"   $1.00/$5.00  — snabb, bra på svenska, kundtjänst
- "gemini-2.5-pro"     $1.00/$10.00 — långa dokument, 1M kontext
- "mistral-large"      $2.00/$6.00  — europeisk AI, GDPR + komplex
- "gpt-4.1"            $2.00/$8.00  — stark kodning, teknisk analys
- "claude-sonnet-4-6"  $3.00/$15.00 — hög kvalitet svenska, avtalsanalys
- "claude-opus-4-7"    $5.00/$25.00 — flaggskepp, forskning, djup analys

MODELLVAL-LOGIK:
- Enkel chatbot/FAQ/kundtjänst → "gpt-4o-mini" eller "claude-haiku-4-5"
- Intern assistent, HR, IT-helpdesk → "gpt-4.1-mini" eller "claude-haiku-4-5"
- Kodgenerering, teknisk AI → "gpt-4.1" eller "claude-sonnet-4-6"
- Dokumentanalys (<50 sidor) → "claude-sonnet-4-6"
- Dokumentanalys (50+ sidor) → "gemini-2.5-pro"
- GDPR-känslig data → "mistral-small" eller "mistral-large"
- Komplex analys, forskning → "claude-opus-4-7"
- Kostnadskritisk / hög volym → "gpt-4o-mini" eller "gemini-2.5-flash"

ANTAGANDEN NÄR INTE EXPLICIT ANGIVET:
- Kundtjänst-chatbot: input 150, output 200, req 200/dag, users 1, dagar 22
- Intern assistent: input 200, output 300, req 80/dag, users=antal_pers, dagar 22
- Dokumentanalys: input 2000, output 600, req 15/dag, users 2, dagar 22
- Kodassistent (devteam): input 400, output 800, req 60/dag, users=antal_devs, dagar 22
- Innehållsgenerering: input 200, output 800, req 20/dag, users 2, dagar 22
- Marknadsanalys/research: input 1000, output 1500, req 10/dag, users 2, dagar 22

ALTERNATIV-LOGIK:
- cheapAlternativeId: billigaste modell som fortfarande klarar uppgiften
- balancedAlternativeId: bästa pris/kvalitet för uppgiften (ofta = modelId)
- premiumAlternativeId: bästa kvalitetsalternativ för uppgiften

Svara ENBART med giltig JSON. Ingen förklaring, inga kodblock, inget annat.

JSON-schema (alla fält obligatoriska):
{
  "scenarioTitle": "kort svensk titel, ex: AI-kundtjänst för webbshop",
  "summary": "1-2 meningar om vad use caset innebär och varför vald modell passar",
  "modelId": "rekommenderad modell-id",
  "modelReason": "en mening varför denna modell passar bäst",
  "cheapAlternativeId": "billigaste fungerbara modell-id",
  "balancedAlternativeId": "bästa pris/kvalitet modell-id",
  "premiumAlternativeId": "bästa kvalitetsalternativ modell-id",
  "assumptions": {
    "requestsPerDay": <heltal>,
    "users": <heltal>,
    "inputWords": <heltal>,
    "outputWords": <heltal>,
    "daysPerMonth": <heltal 1-31>
  },
  "confidence": "low" | "medium" | "high",
  "warning": "kort varning om uppskattningens begränsningar på svenska"
}`;

export interface EstimateCostResult {
  scenarioTitle: string;
  summary: string;
  modelId: string;
  modelName: string;
  modelReason: string;
  cheapAlternativeId: string;
  cheapAlternativeName: string;
  balancedAlternativeId: string;
  balancedAlternativeName: string;
  premiumAlternativeId: string;
  premiumAlternativeName: string;
  monthlyCostUsdCheap: number;
  monthlyCostUsdRecommended: number;
  monthlyCostUsdPremium: number;
  assumptions: {
    requestsPerDay: number;
    users: number;
    inputWords: number;
    outputWords: number;
    daysPerMonth: number;
  };
  confidence: "low" | "medium" | "high";
  warning: string;
}

const CANONICAL_ORIGIN = "https://aikostnad.se";
const ALLOWED_ORIGINS = new Set([
  "https://aikostnad.se",
  "https://www.aikostnad.se",
  "https://aikostnad.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
]);

function resolveCorsOrigin(req: Request): string {
  const origin = req.headers.get("origin");
  if (!origin) return CANONICAL_ORIGIN;
  if (ALLOWED_ORIGINS.has(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return origin;
  return CANONICAL_ORIGIN;
}

export default async function handler(req: Request): Promise<Response> {
  const ALLOWED_ORIGIN = resolveCorsOrigin(req);
  const reqOrigin = req.headers.get("origin");
  const isBrowserCall = reqOrigin !== null;
  const isAllowedOrigin = !isBrowserCall || ALLOWED_ORIGIN === reqOrigin;

  const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!isAllowedOrigin) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { prompt } = (await req.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return new Response(JSON.stringify({ error: "Ingen text angiven" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 512,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: `Estimera AI-kostnad för: "${prompt.slice(0, 800)}"`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      throw new Error(`Anthropic API: ${anthropicRes.status}`);
    }

    const data = (await anthropicRes.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const raw = data.content[0]?.type === "text" ? data.content[0].text.trim() : "";
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    const llm = JSON.parse(text) as {
      scenarioTitle: string;
      summary: string;
      modelId: string;
      modelReason: string;
      cheapAlternativeId: string;
      balancedAlternativeId: string;
      premiumAlternativeId: string;
      assumptions: {
        requestsPerDay: number;
        users: number;
        inputWords: number;
        outputWords: number;
        daysPerMonth: number;
      };
      confidence: string;
      warning: string;
    };

    const safeModelId = (id: string, fallback: string): string =>
      VALID_MODEL_IDS.has(id) ? id : fallback;

    const modelId          = safeModelId(llm.modelId, "gpt-4o-mini");
    const cheapId          = safeModelId(llm.cheapAlternativeId, "gpt-4o-mini");
    const balancedId       = safeModelId(llm.balancedAlternativeId, "gpt-4o-mini");
    const premiumId        = safeModelId(llm.premiumAlternativeId, "claude-sonnet-4-6");

    const a = {
      requestsPerDay: Math.min(Math.max(Math.round(llm.assumptions.requestsPerDay ?? 50), 1), 10_000),
      users:          Math.min(Math.max(Math.round(llm.assumptions.users ?? 1), 1), 1_000),
      inputWords:     Math.min(Math.max(Math.round(llm.assumptions.inputWords ?? 100), 1), 5_000),
      outputWords:    Math.min(Math.max(Math.round(llm.assumptions.outputWords ?? 200), 1), 5_000),
      daysPerMonth:   Math.min(Math.max(Math.round(llm.assumptions.daysPerMonth ?? 22), 1), 31),
    };

    const result: EstimateCostResult = {
      scenarioTitle:          String(llm.scenarioTitle ?? "AI-applikation"),
      summary:                String(llm.summary ?? ""),
      modelId,
      modelName:              MODEL_PRICES[modelId]?.name ?? modelId,
      modelReason:            String(llm.modelReason ?? ""),
      cheapAlternativeId:     cheapId,
      cheapAlternativeName:   MODEL_PRICES[cheapId]?.name ?? cheapId,
      balancedAlternativeId:  balancedId,
      balancedAlternativeName: MODEL_PRICES[balancedId]?.name ?? balancedId,
      premiumAlternativeId:   premiumId,
      premiumAlternativeName: MODEL_PRICES[premiumId]?.name ?? premiumId,
      monthlyCostUsdCheap:        computeMonthlyCostUsd(cheapId,    a.inputWords, a.outputWords, a.requestsPerDay, a.users, a.daysPerMonth),
      monthlyCostUsdRecommended:  computeMonthlyCostUsd(modelId,    a.inputWords, a.outputWords, a.requestsPerDay, a.users, a.daysPerMonth),
      monthlyCostUsdPremium:      computeMonthlyCostUsd(premiumId,  a.inputWords, a.outputWords, a.requestsPerDay, a.users, a.daysPerMonth),
      assumptions:            a,
      confidence:             (["low", "medium", "high"].includes(llm.confidence) ? llm.confidence : "medium") as "low" | "medium" | "high",
      warning:                String(llm.warning ?? "Grov uppskattning — justera med avancerat läge för exakt svar."),
    };

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("estimate-cost error:", msg);
    return new Response(JSON.stringify({ error: "Analys misslyckades" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}
