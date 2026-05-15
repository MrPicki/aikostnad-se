export const config = { runtime: "edge" };

const SYSTEM = `Du är en AI-kostnadsanalysator för svenska företag.
Givet en beskrivning av ett AI-användningsfall, estimera rimliga parametrar.
Svara ENBART med ett JSON-objekt — inga kommentarer, ingen förklaring.

Parametrar:
- wordsPerRequest: ord i input-prompten (1–5000)
- outputWordsPerRequest: ord i AI-svaret (1–5000)
- requestsPerDay: antal AI-anrop per dag (1–5000)
- users: antal användare (1–500)
- daysPerMonth: aktiva dagar per månad (1–31, typiskt 22 för företag)

Riktlinjer:
- Chatbot/kundtjänst: 100–200 ord input, 150–300 ord output, 50–500 req/dag, 1–10 users
- Dokumentanalys/avtal: 1000–3000 ord input, 300–800 ord output, 5–30 req/dag, 1–5 users
- Kodgenerering/dev-verktyg: 200–500 ord input, 500–1500 ord output, 20–100 req/dag, 1–20 users
- Innehållsgenerering/webb: 100–300 ord input, 400–1000 ord output, 10–50 req/dag, 1–5 users
- Internt verktyg/assistent: 150–300 ord input, 200–400 ord output, 20–100 req/dag, 5–50 users`;

export interface AnalyzeResult {
  wordsPerRequest: number;
  outputWordsPerRequest: number;
  requestsPerDay: number;
  users: number;
  daysPerMonth: number;
}

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
        model: "claude-haiku-4-5-20251001",
        max_tokens: 120,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: `Estimera kalkylatorparametrar för detta användningsfall: "${prompt.slice(0, 500)}"`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      throw new Error(`Anthropic API error: ${anthropicRes.status}`);
    }

    const data = (await anthropicRes.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const text = data.content[0]?.type === "text" ? data.content[0].text.trim() : "";
    const values = JSON.parse(text) as AnalyzeResult;

    const clamped: AnalyzeResult = {
      wordsPerRequest: Math.min(Math.max(Math.round(values.wordsPerRequest), 1), 5000),
      outputWordsPerRequest: Math.min(Math.max(Math.round(values.outputWordsPerRequest), 1), 5000),
      requestsPerDay: Math.min(Math.max(Math.round(values.requestsPerDay), 1), 5000),
      users: Math.min(Math.max(Math.round(values.users), 1), 500),
      daysPerMonth: Math.min(Math.max(Math.round(values.daysPerMonth), 1), 31),
    };

    return new Response(JSON.stringify(clamped), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("analyze-prompt error:", err);
    return new Response(JSON.stringify({ error: "Analys misslyckades" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
