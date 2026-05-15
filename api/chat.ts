export const config = { runtime: "edge" };

const SYSTEM = `Du är en AI-kostnadsrådgivare på svenska. Du hjälper användare förstå vad deras AI-användningsfall skulle kosta och vilken modell som passar bäst.

Tillgängliga modeller och priser (USD per miljon tokens, maj 2026):
- Claude Haiku 4.5: $0.80 input / $4.00 output — snabbast, billigast, bra för chatbotar och enkla svar
- Claude Sonnet 4.6: $3.00 input / $15.00 output — balans kostnad/förmåga, bra för de flesta use cases
- Claude Opus 4.6: $15.00 input / $75.00 output — mest kapabel, bäst för komplexa analyser
- GPT-4.1 mini: $0.40 input / $1.60 output — OpenAIs billigaste starka modell
- GPT-4.1: $2.00 input / $8.00 output — OpenAIs allround-val
- Gemini 2.0 Flash: $0.10 input / $0.40 output — Googles snabba billigaste
- Gemini 1.5 Pro: $1.25 input / $5.00 output — Googles kapabla modell

Viktiga räkneriktlinjer:
- Valutakurs: 1 USD ≈ 10.50 SEK
- Svenska text: 1 ord ≈ 1.3 tokens (svenska kräver fler tokens än engelska)
- Engelska text: 1 ord ≈ 0.75 tokens
- Räkna alltid med input + output tokens per anrop

När du svarar:
1. Estimera tokens per anrop (input + output) baserat på beskrivningen
2. Räkna ut kostnad per dag, månad och år i SEK för rimlig volym
3. Rekommendera den modell som ger bäst pris/prestanda för use caset
4. Ge konkreta siffror — helst i en kortfattad lista
5. Om volym inte angavs: anta ett rimligt defaultvärde och förklara antagandet

Håll svaret kort och konkret — max 150-200 ord.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = (await req.json()) as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages?.length) {
      return new Response(JSON.stringify({ error: "Inga meddelanden angavs" }), {
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
        max_tokens: 1024,
        system: SYSTEM,
        stream: true,
        messages: messages.slice(-10),
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error:", anthropicRes.status, errText);
      return new Response(
        JSON.stringify({ error: "AI-anrop misslyckades" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const event = JSON.parse(data) as {
                type: string;
                delta?: { type: string; text: string };
              };
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta"
              ) {
                await writer.write(encoder.encode(event.delta.text));
              }
            } catch {
              // Hoppa över ogiltiga JSON-rader
            }
          }
        }
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("chat error:", err);
    return new Response(JSON.stringify({ error: "Serverfel" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
