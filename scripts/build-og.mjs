// One-off script: regenerate public/og-image.png from inline SVG.
// Run with: node scripts/build-og.mjs
// Requires: npm i -D @resvg/resvg-js (not added to package.json — run-time-only)
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4338ca"/>
      <stop offset="55%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1.4" fill="white" fill-opacity="0.18"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="720" y="0" width="480" height="480" fill="url(#dots)"/>

  <!-- Logo badge -->
  <rect x="200" y="170" width="96" height="96" rx="22" fill="white"/>
  <text x="248" y="237" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="800"
        fill="#4338ca" text-anchor="middle" dominant-baseline="middle">AI</text>

  <!-- Brand name -->
  <text x="320" y="240" font-family="Inter, system-ui, sans-serif" font-size="88" font-weight="800"
        fill="white" letter-spacing="-1.5">Aikostnad<tspan fill="#c7d2fe">.se</tspan></text>

  <!-- Tagline -->
  <text x="${W / 2}" y="380" font-family="Inter, system-ui, sans-serif" font-size="44" font-weight="700"
        fill="white" text-anchor="middle">Räkna ut vad AI kostar per fråga,</text>
  <text x="${W / 2}" y="438" font-family="Inter, system-ui, sans-serif" font-size="44" font-weight="700"
        fill="white" text-anchor="middle">månad och år</text>

  <!-- Subtitle -->
  <text x="${W / 2}" y="520" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="500"
        fill="white" fill-opacity="0.85" text-anchor="middle">Gratis kalkylator för GPT, Claude, Gemini, DeepSeek &amp; fler</text>
</svg>`;

const resvg = new Resvg(svg, {
  background: "#4338ca",
  fitTo: { mode: "width", value: W },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: "DejaVu Sans",
  },
});

const png = resvg.render().asPng();
writeFileSync("public/og-image.png", png);
console.log(`Wrote public/og-image.png (${png.length} bytes, ${W}x${H})`);
