// Regenerates public/apple-touch-icon.png (180x180 PNG) and
// public/icon-512.png (PWA-sized) from an inline SVG that matches
// the indigo "AI" badge used in the OG image.
//
// Run with: node scripts/build-icons.mjs
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";

function makeSvg(size) {
  const radius = Math.round(size * 0.23);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4338ca"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" fill="url(#bg)"/>
  <text x="50%" y="55%" font-family="Inter, system-ui, sans-serif"
        font-size="${Math.round(size * 0.5)}" font-weight="800"
        fill="white" text-anchor="middle" dominant-baseline="middle">AI</text>
</svg>`;
}

function render(size, outPath) {
  const resvg = new Resvg(makeSvg(size), {
    background: "#4338ca",
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" },
  });
  const png = resvg.render().asPng();
  writeFileSync(outPath, png);
  console.log(`Wrote ${outPath} (${png.length} bytes, ${size}x${size})`);
}

render(180, "public/apple-touch-icon.png");
render(512, "public/icon-512.png");
render(192, "public/icon-192.png");
