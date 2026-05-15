export const config = { runtime: "edge" };

const SYSTEM = `Du är expert på AI-API-kostnadsestimering för svenska företag.

Givet en beskrivning av ett AI-användningsfall ska du:
1. Välja den modell som passar bäst för use caset
2. Estimera realistiska parametrar baserat på beskrivningen

TILLGÄNGLIGA MODELLER (använd exakt dessa modelId-värden):
- "mistral-small"      $0.10/$0.30 /Mtok   — europeisk AI, GDPR-vänlig, enkel. Passar: GDPR-krav, enkla uppgifter
- "gpt-4o-mini"        $0.15/$0.60 /Mtok   — populär, bra kvalitet/pris. Passar: chatbotar, FAQ, snabba svar
- "deepseek-v3"        $0.28/$0.42 /Mtok   — open-weight, billig. Passar: chat, generella uppgifter, kostnadskritisk
- "gemini-2.5-flash"   $0.30/$2.50 /Mtok   — snabb, 1M kontext, multimodal. Passar: medellånga dokument, hög volym
- "gpt-4.1-mini"       $0.40/$1.60 /Mtok   — balanserad, bra instruktionsföljning. Passar: assistenter, QA, formulär
- "deepseek-r1"        $0.55/$2.19 /Mtok   — open-weight, resonemang. Passar: matte, kod, logikfrågor
- "llama-3.3-70b"      $0.59/$0.79 /Mtok   — open source. Passar: fri licens, intern hosting
- "claude-haiku-4-5"   $1.00/$5.00 /Mtok   — snabb, bra på svenska. Passar: kundtjänst på svenska, chatbotar
- "gemini-2.5-pro"     $1.00/$10.00 /Mtok  — 1M kontext, kapabel. Passar: långa dokument, komplex analys
- "mistral-large"      $2.00/$6.00 /Mtok   — europeisk, kapabel. Passar: GDPR + komplexa uppgifter
- "gpt-4.1"            $2.00/$8.00 /Mtok   — stark kodning och analys. Passar: kodgenerering, teknisk dokumentation
- "claude-sonnet-4-6"  $3.00/$15.00 /Mtok  — hög kvalitet, bra svenska. Passar: avtalsanalys, komplexa svar
- "claude-opus-4-7"    $5.00/$25.00 /Mtok  — flaggskepp. Passar: forskning, komplexa beslut, djup analys

MODELVAL — välj baserat på:
- Enkel chatbot / FAQ / kundtjänst (låg komplexitet, hög volym) → gpt-4o-mini eller claude-haiku-4-5
- Intern assistent, HR, IT-helpdesk → gpt-4.1-mini eller claude-haiku-4-5
- Kodgenerering, teknisk AI → gpt-4.1 eller claude-sonnet-4-6
- Dokumentanalys kortare dokument (<50 sidor) → claude-sonnet-4-6
- Dokumentanalys långa dokument (50+ sidor, hela kontrakt/böcker) → gemini-2.5-pro
- GDPR-känslig data, europeisk lagstiftning → mistral-small eller mistral-large
- Komplex analys, forskning, avancerade beslut → claude-opus-4-7
- Kostnadskritisk / hög volym → deepseek-v3 eller gemini-2.5-flash
- Resonemang, matte, kod-logik (open-weight-alternativ) → deepseek-r1

ESTIMERINGSREGLER:
- Nämns antal användare explicit (ex "20 anställda", "5 pers") → använd det exakta talet
- Nämns volym explicit (ex "200 frågor/dag", "100 anrop") → använd det exakta talet
- Annars → välj rimliga defaults baserat på use case-typ nedan

TYPISKA DEFAULTS:
- Kundtjänst-chatbot: input 150 ord, output 200 ord, 200 req/dag, 1 users, 22 dagar
- Intern assistent (5–20 pers): input 200 ord, output 300 ord, 80 req/dag, users=antal_anställda, 22 dagar
- Dokumentanalys: input 2000 ord, output 600 ord, 15 req/dag, 2 users, 22 dagar
- Kodgenerering (devteam): input 400 ord, output 800 ord, 60 req/dag, users=antal_devs, 22 dagar
- Innehållsgenerering: input 200 ord, output 800 ord, 20 req/dag, 2 users, 22 dagar
- Marknadsanalys / research: input 1000 ord, output 1500 ord, 10 req/dag, 2 users, 22 dagar

Svara ENBART med ett JSON-objekt, inga kommentarer, ingen förklaring, inga kodblock.
Format: {"wordsPerRequest":N,"outputWordsPerRequest":N,"requestsPerDay":N,"users":N,"daysPerMonth":N,"modelId":"..."}`;

export interface AnalyzeResult {
  wordsPerRequest: number;
  outputWordsPerRequest: number;
  requestsPerDay: number;
  users: number;
  daysPerMonth: number;
  modelId: string;
}

const VALID_MODEL_IDS = new Set([
  "mistral-small", "gpt-4o-mini", "deepseek-v3", "gemini-2.5-flash",
  "gpt-4.1-mini", "deepseek-r1", "llama-3.3-70b", "claude-haiku-4-5",
  "gemini-2.5-pro", "mistral-large", "gpt-4.1", "claude-sonnet-4-6",
  "claude-opus-4-7",
]);

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

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN, "Access-Control-Allow-Methods": "POST" },
    });
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
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
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
        max_tokens: 256,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: `Analysera och estimera kalkylatorparametrar för: "${prompt.slice(0, 600)}"`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      throw new Error(`Anthropic API error: ${anthropicRes.status} — ${errBody}`);
    }

    const data = (await anthropicRes.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const raw = data.content[0]?.type === "text" ? data.content[0].text.trim() : "";
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    const values = JSON.parse(text) as AnalyzeResult;

    const clamped: AnalyzeResult = {
      wordsPerRequest:       Math.min(Math.max(Math.round(values.wordsPerRequest), 1), 5000),
      outputWordsPerRequest: Math.min(Math.max(Math.round(values.outputWordsPerRequest), 1), 5000),
      requestsPerDay:        Math.min(Math.max(Math.round(values.requestsPerDay), 1), 5000),
      users:                 Math.min(Math.max(Math.round(values.users), 1), 500),
      daysPerMonth:          Math.min(Math.max(Math.round(values.daysPerMonth), 1), 31),
      modelId:               VALID_MODEL_IDS.has(values.modelId) ? values.modelId : "gpt-4o-mini",
    };

    return new Response(JSON.stringify(clamped), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("analyze-prompt error:", msg);
    return new Response(JSON.stringify({ error: "Analys misslyckades" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  }
}
