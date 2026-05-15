export const config = { runtime: "edge" };

export default async function handler(_request: Request): Promise<Response> {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=SEK",
      { signal: AbortSignal.timeout(5000) }
    );

    if (!res.ok) throw new Error("API error");

    const data = await res.json() as { rates: { SEK: number }; date: string };
    const rate = data.rates?.SEK;

    if (!rate || typeof rate !== "number") throw new Error("Invalid rate");

    return new Response(JSON.stringify({ rate, date: data.date }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ rate: 10.5, date: null }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=3600",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
