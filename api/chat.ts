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

// In-memory IP rate limiter: 20 req/IP/hour.
// Resets per edge instance — best-effort protection for a small site.
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

function parseCookies(header: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!header) return result;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) result[key] = val;
  }
  return result;
}

const USAGE_LIMIT = 4;
const USAGE_COOKIE = "ai_usage";

export default async function handler(req: Request): Promise<Response> {
  const ALLOWED_ORIGIN = resolveCorsOrigin(req);
  const reqOrigin = req.headers.get("origin");
  const isBrowserCall = reqOrigin !== null;
  const isAllowedOrigin = !isBrowserCall || ALLOWED_ORIGIN === reqOrigin;

  const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
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
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // IP-based rate limit (20 req/IP/hour)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (!checkIpRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "För många förfrågningar, försök igen senare." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  // Cookie-based usage limit (4 per 24h)
  const cookies = parseCookies(req.headers.get("cookie"));
  const usageCount = Math.max(
    0,
    parseInt(cookies[USAGE_COOKIE] ?? "0", 10) || 0
  );

  if (usageCount >= USAGE_LIMIT) {
    return new Response(JSON.stringify({ limitReached: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Parse and validate body
  let rawMessages: unknown;
  try {
    const body = (await req.json()) as { messages?: unknown };
    rawMessages = body.messages;
  } catch {
    return new Response(JSON.stringify({ error: "Ogiltigt format" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return new Response(JSON.stringify({ error: "Inga meddelanden angavs" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const validRoles = new Set(["user", "assistant"]);
  const cleanMessages = (
    rawMessages as Array<Record<string, unknown>>
  )
    .filter((m) => m && typeof m === "object" && validRoles.has(m.role as string))
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content ?? "").slice(0, 2000),
    }))
    .slice(-10);

  if (!cleanMessages.length) {
    return new Response(JSON.stringify({ error: "Inga giltiga meddelanden" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
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
        messages: cleanMessages,
      }),
    });

    if (!anthropicRes.ok) {
      console.error("Anthropic API error:", anthropicRes.status);
      return new Response(
        JSON.stringify({ error: "AI-anrop misslyckades" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
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
              // skip invalid JSON lines
            }
          }
        }
      } finally {
        await writer.close();
      }
    })();

    // Increment usage count only on successful Anthropic response
    const newCount = usageCount + 1;
    const setCookie = `${USAGE_COOKIE}=${newCount}; HttpOnly; SameSite=Strict; Max-Age=86400; Path=/`;

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
        "Set-Cookie": setCookie,
      },
    });
  } catch (err) {
    console.error("chat error:", err instanceof Error ? err.message : "unknown");
    return new Response(JSON.stringify({ error: "Serverfel" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}
