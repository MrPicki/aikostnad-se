// Build guard: fails the build if the per-page <SEO> props and the central
// ROUTES list (scripts/seo-metadata.mjs) drift apart, or if a page route is
// missing from ROUTES (which would make it ship to crawlers as an empty shell).
// This is what makes ROUTES a genuine single source of truth.

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./seo-metadata.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, "..", "src", "pages");

// Routes intentionally NOT prerendered with shared meta.
const EXCLUDE = new Set(["/embed", "/404"]);

function extractPages() {
  const out = [];
  for (const f of readdirSync(PAGES_DIR).filter((f) => f.endsWith(".tsx"))) {
    const src = readFileSync(path.join(PAGES_DIR, f), "utf8");
    const seo = src.match(/<SEO[\s\S]*?\/>/);
    if (!seo) continue;
    const b = seo[0];
    const title =
      b.match(/title=["'`]([\s\S]*?)["'`]\s*\n/)?.[1] ??
      b.match(/title=["'`]([\s\S]*?)["'`]/)?.[1];
    const description = b.match(/description=["'`]([\s\S]*?)["'`]/)?.[1];
    let canon = b.match(/canonical=\{?["'`]([\s\S]*?)["'`]/)?.[1];
    if (!canon || !title || !description) continue;
    canon = canon.replace(/^https:\/\/aikostnad\.se/, "") || "/";
    if (canon.includes("${")) continue; // dynamic route
    if (EXCLUDE.has(canon)) continue;
    out.push({ file: f, path: canon, title, description });
  }
  return out;
}

const pages = extractPages();
const byPath = new Map(ROUTES.map((r) => [r.path, r]));
const errors = [];

for (const p of pages) {
  const r = byPath.get(p.path);
  if (!r) {
    errors.push(`Route ${p.path} (${p.file}) has no entry in ROUTES — it would not be prerendered.`);
    continue;
  }
  if (r.title !== p.title) {
    errors.push(`Title drift on ${p.path}:\n   ROUTES: ${r.title}\n   page:   ${p.title}`);
  }
  if (r.description !== p.description) {
    errors.push(`Description drift on ${p.path} (${p.file}).`);
  }
}

const pagePaths = new Set(pages.map((p) => p.path));
for (const r of ROUTES) {
  if (!pagePaths.has(r.path)) {
    errors.push(`ROUTES has ${r.path} but no page <SEO> matches it (stale entry?).`);
  }
}

if (errors.length) {
  console.error(`\n[check-seo-sync] ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(" • " + e);
  console.error("\nFix the mismatch in the page or scripts/seo-metadata.mjs.\n");
  process.exit(1);
}

console.log(`[check-seo-sync] OK — ${pages.length} pages in sync with ROUTES.`);
