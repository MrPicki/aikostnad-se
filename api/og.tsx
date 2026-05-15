import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function handler(): Response {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4338ca 0%, #6366f1 55%, #818cf8 100%)",
          color: "white",
          padding: "70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle dot grid overlay (top-right corner) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 480,
            height: 480,
            opacity: 0.18,
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
            display: "flex",
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              background: "white",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4338ca",
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            AI
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            <span>Aikostnad</span>
            <span style={{ color: "#c7d2fe" }}>.se</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: 980,
            lineHeight: 1.2,
            marginBottom: 28,
            display: "flex",
          }}
        >
          Räkna ut vad AI kostar per fråga, månad och år
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            textAlign: "center",
            display: "flex",
          }}
        >
          Gratis kalkylator för GPT, Claude, Gemini, DeepSeek & fler
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, max-age=86400, s-maxage=86400",
      },
    }
  );
}
