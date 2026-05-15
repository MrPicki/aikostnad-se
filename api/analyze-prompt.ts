export const config = { runtime: "edge" };

const SYSTEM = `Du är expert på AI-API-kostnadsestimering för svenska företag.

Givet en beskrivning av ett AI-användningsfall ska du:
1. Välja den modell som passar bäst för use caset
2. Estimera realistiska parametrar baserat på beskrivningen

TILLGÄNGLIGA MODELLER (använd exakt dessa modelId-värden):
- "gemini-2.0-flash"   $0.075/$0.30 /Mtok  — billigast, snabb, stor kontext. Passar: hög volym, enkla svar, informationshämtning
- "mistral-small"      $0.10/$0.30 /Mtok   — europeisk AI, GDPR-vänlig, enkel. Passar: GDPR-krav, enkla uppgifter
- "gpt-4o-mini"        $0.15/$0.60 /Mtok   — populär, bra kvalitet/pris. Passar: chatbotar, FAQ, snabba svar
- "gpt-4.1-mini"       $0.40/$1.60 /Mtok   — balanserad, bra instruktionsföljning. Passar: assistenter, QA, formulär
- "llama-3.3-70b"      $0.59/$0.79 /Mtok   — open source. Passar: fri licens, intern hosting
- "claude-haiku-4"     $0.80/$4.00 /Mtok   — snabb, bra på svenska. Passar: kundtjänst på svenska, chatbotar
- "gemini-1.5-pro"     $1.25/$5.00 /Mtok   — 2M-tokens kontext. Passar: mycket långa dokument, hela böcker
- "mistral-large"      $2.00/$6.00 /Mtok   — europeisk, kapabel. Passar: GDPR + komplexa uppgifter
- "gpt-4.1"            $2.00/$8.00 /Mtok   — stark kodning och analys. Passar: kodgenerering, teknisk dokumentation
- "claude-sonnet-4"    $3.00/$15.00 /Mtok  — hög kvalitet, bra svenska. Passar: avtalsanalys, komplexa svar
- "claude-opus-4"      $15.00/$75.00 /Mtok — starkast. Passar: forskning, komplexa beslut, djup analys

MODELVAL — välj baserat på:
- Enkel chatbot / FAQ / kundtjänst (låg komplexitet, hög volym) → gpt-4o-mini eller claude-haiku-4
- Intern assistent, HR, IT-helpdesk → gpt-4.1-mini eller claude-haiku-4
- Kodgenerering, teknisk AI → gpt-4.1 eller claude-sonnet-4
- Dokumentanalys kortare dokument (<50 sidor) → claude-sonnet-4
- Dokumentanalys långa dokument (50+ sidor, hela kontrakt/böcker) → gemini-1.5-pro
- GDPR-känslig data, europeisk lagstiftning → mistral-small eller mistral-large
- Komplex analys, forskning, avancerade beslut → claude-opus-4
- Kostnadskritisk / hög volym → gemini-2.0-flash

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
  "gemini-2.0-flash", "mistral-small", "gpt-4o-mini", "gpt-4.1-mini",
  "llama-3.3-70b", "claude-haiku-4", "gemini-1.5-pro", "mistral-large",
  "gpt-4.1", "claude-sonnet-4", "claude-opus-4",
]);

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST" },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { prompt } = (await req.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return new Response(JSON.stringify({ error: "Ingen text angiven" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
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
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("analyze-prompt error:", msg);
    return new Response(JSON.stringify({ error: "Analys misslyckades", detail: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
