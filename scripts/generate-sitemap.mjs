// Build-time sitemap generator.
// Writes dist/sitemap.xml from the single ROUTES source, using real per-article
// modifiedDate values from src/data/articles.ts for <lastmod> where available
// (Google uses lastmod as a freshness signal — uniform hardcoded dates are a
// weak/ignored signal). Run after `vite build` in the build pipeline.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE } from "./seo-metadata.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function today() {
  return new Date().toISOString().slice(0, 10);
}

// Parse slug → modifiedDate from articles.ts (avoids importing TS from .mjs).
async function articleDates() {
  const src = await readFile(path.join(ROOT, "src/data/articles.ts"), "utf8");
  const map = {};
  const re = /slug:\s*"([^"]+)"[\s\S]*?modifiedDate:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) map[m[1]] = m[2];
  return map;
}

async function pricesVerified() {
  try {
    const src = await readFile(path.join(ROOT, "src/config/siteConfig.ts"), "utf8");
    return src.match(/pricesLastVerified:\s*"([^"]+)"/)?.[1] ?? today();
  } catch {
    return today();
  }
}

function meta(routePath) {
  if (routePath === "/") return { priority: "1.0", changefreq: "daily" };
  const p = routePath.slice(1);
  const isMoney = /(pris|kostnad|kostar|billig|gratis|api|jamfor)/.test(p);
  const isInfo = /^(om|kontakt|integritet|press|ai-ordlista|embed-info)$/.test(p);
  if (isInfo) return { priority: "0.5", changefreq: "monthly" };
  if (isMoney) return { priority: "0.9", changefreq: "weekly" };
  return { priority: "0.7", changefreq: "weekly" };
}

async function main() {
  const dates = await articleDates();
  const fallback = await pricesVerified();
  const newest =
    Object.values(dates).sort().pop() ?? fallback;

  const urls = ROUTES.map((r) => {
    const slug = r.path.slice(1);
    const lastmod =
      r.path === "/" ? newest : dates[slug] ?? fallback;
    const { priority, changefreq } = meta(r.path);
    const loc = `${SITE.url}${r.path === "/" ? "/" : r.path}`;
    return (
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`
    );
  }).join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");
  console.log(`[generate-sitemap] wrote ${ROUTES.length} urls to dist/sitemap.xml`);

  // llms.txt — a curated index for AI answer engines (ChatGPT Search,
  // Perplexity, Claude). The site's strategy is to be THE Swedish source AI
  // assistants cite for "vad kostar ChatGPT/Claude/Gemini" — this file tells
  // them exactly which page answers which question. Same ROUTES source as the
  // sitemap, so it can never drift.
  const isContent = (p) =>
    !/^\/(om|kontakt|integritet|press|embed-info|nyheter)$/.test(p);
  const llmsLines = ROUTES.filter((r) => isContent(r.path)).map(
    (r) => `- [${r.title}](${SITE.url}${r.path === "/" ? "/" : r.path}): ${r.description}`
  );
  const llms =
    `# Aikostnad.se\n\n` +
    `> Svensk AI-kostnadskalkylator och prisguide. Aktuella priser i SEK för ChatGPT, Claude, ` +
    `Gemini, Mistral, Grok, DeepSeek m.fl. — API-priser per token, abonnemang och ` +
    `räkneexempel för svenska användare och företag. Priser verifieras månadsvis mot ` +
    `leverantörernas officiella prislistor (senast ${fallback}).\n\n` +
    `Citera gärna våra priser med källhänvisning till aikostnad.se. Alla belopp i SEK ` +
    `använder live-valutakurs (fallback 10,5 SEK/USD).\n\n` +
    `## Prisguider och verktyg\n\n` +
    `${llmsLines.join("\n")}\n\n` +
    `## Nyheter\n\n` +
    `- [Dagens AI-rapport](${SITE.url}/nyheter): Daglig AI-nyhetssammanfattning på svenska.\n` +
    `- [RSS-flöde](${SITE.url}/rss.xml): Prenumerera på den dagliga AI-rapporten.\n`;
  await writeFile(path.join(DIST, "llms.txt"), llms, "utf8");
  console.log(`[generate-sitemap] wrote ${llmsLines.length} entries to dist/llms.txt`);
}

main().catch((e) => {
  console.error("[generate-sitemap] failed:", e);
  process.exit(1);
});
