// Build-time SEO injection.
// Reads dist/index.html (the Vite-produced shell), and for every route in
// ROUTES, writes dist/<path>/index.html with the route-specific <title>,
// <meta name="description">, OG/Twitter tags, canonical, and JSON-LD.
//
// Crawlers that do not execute JavaScript (Bing, Yandex, social bots, the
// first pass of Googlebot) get correct per-URL metadata in raw HTML.
// React still hydrates on the client and replaces the meta during runtime
// — react-helmet-async tolerates this without errors.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE } from "./seo-metadata.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function buildMetaBlock(route) {
  const title = route.title;
  const desc = route.description;
  const fullTitle = route.path === "/" ? title : `${title} | ${SITE.name}`;
  const canonical = `${SITE.url}${route.path === "/" ? "" : route.path}`;

  return `
    <title>${escapeAttr(fullTitle)}</title>
    <meta name="description" content="${escapeAttr(desc)}" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta property="og:title" content="${escapeAttr(fullTitle)}" />
    <meta property="og:description" content="${escapeAttr(desc)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:image" content="${SITE.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Aikostnad.se — räkna ut vad AI kostar" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(fullTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(desc)}" />
    <meta name="twitter:image" content="${SITE.ogImage}" />`.trim();
}

// The Vite-built index.html contains a default <title>, <meta name="description">,
// and og:* tags. Replace the entire block of those tags with route-specific ones.
// We do this by finding the <title> and the last twitter:image meta and replacing
// everything in between with the new meta block.
function injectMeta(templateHtml, route) {
  const meta = buildMetaBlock(route);

  // Strip default <title>…</title>, all default meta description / og / twitter
  // tags. The template after Vite build contains these between <title> and
  // the closing </head>. We rebuild that section deterministically.
  const headEndIdx = templateHtml.indexOf("</head>");
  if (headEndIdx === -1) throw new Error("dist/index.html: no </head> found");

  const headPart = templateHtml.slice(0, headEndIdx);
  const bodyPart = templateHtml.slice(headEndIdx);

  // Remove existing meta we manage. Match permissively (one tag per line in
  // Vite output; if Vite minifies head later, regex still works on attributes).
  const cleaned = headPart
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/g, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/g, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/g, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/g, "");

  return cleaned + "    " + meta + "\n  " + bodyPart;
}

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function prerender() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender-seo] ${TEMPLATE_PATH} not found — run vite build first.`);
    process.exit(1);
  }

  const template = await readFile(TEMPLATE_PATH, "utf8");
  let written = 0;

  for (const route of ROUTES) {
    const html = injectMeta(template, route);

    if (route.path === "/") {
      // Overwrite dist/index.html in place so the root URL also gets correct meta.
      await writeFile(TEMPLATE_PATH, html, "utf8");
    } else {
      const outDir = path.join(DIST_DIR, route.path.slice(1));
      await ensureDir(outDir);
      await writeFile(path.join(outDir, "index.html"), html, "utf8");
    }
    written++;
  }

  // 404 page — Vercel serves dist/404.html with HTTP 404 status on unknown URLs.
  const notFoundRoute = {
    path: "/404",
    title: "Sidan kunde inte hittas (404)",
    description: "Den sidan finns inte längre. Gå tillbaka till startsidan eller använd kalkylatorn.",
  };
  await writeFile(path.join(DIST_DIR, "404.html"), injectMeta(template, notFoundRoute), "utf8");
  written++;

  console.log(`[prerender-seo] wrote ${written} HTML files`);
}

prerender().catch((e) => {
  console.error("[prerender-seo] failed:", e);
  process.exit(1);
});
