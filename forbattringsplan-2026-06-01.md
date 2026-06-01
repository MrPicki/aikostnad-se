# Förbättringsplan & checklista — aikostnad.se

**Startad:** 2026-06-01
**Källa:** `rapport-2026-06-01.md`
**Arbetssätt:** En kategori i taget. När alla punkter i en kategori är avbockade körs kategorins granskning om — målet är minst **8/10** innan nästa kategori påbörjas.

Status-legend: ⬜ ej påbörjad · 🔄 pågår · ✅ klar

---

## Kategori 4 — Användning / Funktioner (start: 5/10 → mål ≥8)

- ✅ **F1** Lead-flödet: `providerId` valfri i `send-guide.ts`, prisbevaknings-lead sparas + generiskt bekräftelsemejl; Calculator/StickyEmailBar visar nu äkta success + felmeddelande istället för tyst återgång
- ✅ **F2** Chattprompten datadriven från `modelPricing.ts` + live-FX (löst genom borttagning av död chat — se F4 — och samma princip i kvarvarande endpoints)
- ✅ **F3** Standardiserat modell-ID till aliaset `claude-haiku-4-5` i alla endpoints (morning-digest, daily-digest, twitter-bot, estimate-cost)
- ✅ **F4** Död kod borttagen: `ChatSection.tsx`, `api/chat.ts`, `api/analyze-prompt.ts` (oövervakade/oanvända betal-endpoints)
- ✅ **F5** Lade till GPT-5, o3, o4-mini i prisdatan (synkat mot sidornas egna siffror); `pricesLastVerified` → 2026-06-01
- ✅ **F6** `useExchangeRate` skrivs om med delad modul-cache (en hämtning för alla komponenter); `exchange-rate.ts` returnerar nu `fallback`-flagga + 503 så UI:t inte visar fallback som live
- ✅ **F7** Falsk jämförelseknapp → riktig länk till `/jamfor-ai-modeller`; död `submitLead`/`supabase.ts` + oläst `leadCaptureEnabled` borttagna
- ✅ **Omtest funktion:** betyg **8/10** ✓ (alla kritiska/höga fynd verifierat lösta)

## Kategori 3 — Säkerhet (start: 4/10 → mål ≥8)

- ✅ **S1** Fail-closed cron-auth: `morning-digest` + `twitter-bot` vägrar köra om `CRON_SECRET` saknas/ej matchar
- ✅ **S2** `daily-digest`: Claude-anropet + SYSTEM borttaget ur publik väg (returnerar bara råa RSS-artiklar); `ACAO: *` → `https://aikostnad.se`; död `ai-news.ts` borttagen
- ✅ **S3** `send-guide`: per-IP (5/h) + per-mottagare (2/24h) rate limit
- ✅ **S4** DOMPurify-sanering i båda `dangerouslySetInnerHTML`-sänkorna (`sanitizeArticleHtml`); server-side `stripDangerousHtml` i `morning-digest` innan lagring
- ✅ **S5** CSP-header i `vercel.json` (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, scopad script/connect/img)
- 🟡 **S6** In-memory-limiters hårdgjorda (send-guide); **durabel KV-limiter kräver infra (Vercel KV/Upstash)** — dokumenterat som nästa steg, ej möjligt att provisionera här
- ✅ **S7** `article.ts` föredrar anon-nyckel (RLS-policy dokumenterad i kod) + service-role som fallback; URL-precedens → icke-`VITE_` först i alla server-funktioner
- ✅ **Omtest säkerhet:** betyg **8/10** ✓ (kritiska kostnads-/XSS-vektorer stängda; KV-limiter kvar som framtida steg)

## Kategori 2 — SEO (start: 6/10 → mål ≥8)

- ✅ **SEO1** `ROUTES` utökad till alla 42 statiska sidor (prerender 25→43 filer); build-guard `check-seo-sync.mjs` failar bygget vid divergens
- ✅ **SEO2** SPA-fallback-rewrite i `vercel.json` (`/((?!api/).*) → /index.html`) — inga 404 på direktnavigering/refresh
- ✅ **SEO3** `/nyheter/:date`: dynamisk `api/sitemap-news.ts` (Supabase) + `NewsArticle`-schema; länkad från `robots.txt`
- ✅ **SEO4** Canonical-normalisering i `SEO.tsx` (path eller absolut → exakt en URL); dubbelsuffix-bug på nyhetssidor fixad
- ✅ **SEO5** En sanningskälla: prerender + runtime delar titel-logik (`${title} | Aikostnad.se`); guarden tvingar paritet
- ✅ **SEO6** `generate-sitemap.mjs` genererar sitemap från `ROUTES` + riktiga `modifiedDate` i `articles.ts` (per-sida lastmod)
- ✅ **SEO7** Start-`<h1>` → "Vad kostar AI? Räkna ut din AI-kostnad — i kronor"; `og:locale=sv_SE` + `hreflang=sv-SE`/`x-default` i prerender + runtime
- 🟡 **SEO8** `noindex` på `/embed`; `robots.txt` städad (bort `Crawl-delay`, AI-botar tillåtna, 2 sitemaps). Self-hosta typsnitt/skjut upp scripts = valfri förstärkning, ej gjort (CWV-finlir)
- 🔄 **Omtest SEO:** betyg ≥8

## Kategori 1 — Design / Layout (start: 6/10 → mål ≥8)

- ⬜ **D1** A11y-grund: `ScrollToTop` + fokusflytt, skip-länk, global `focus-visible`
- ⬜ **D2** Riktiga knappar för sorteringsrubriker + tooltips
- ⬜ **D3** Laga klippt FAQ-dragspel (`max-h-96`)
- ⬜ **D4** Avdubbla startsidan, flytta `PathSelector`, responsiva avstånd
- ⬜ **D5** Design-tokens i `tailwind.config.js` + `<Button>`/`<Card>`/`<Badge>`
- ⬜ **D6** Höj kontrast, `aria-current`, mobilmeny, mobilvariant av sticky-bar
- ⬜ **D7** Mörkt läge
- ⬜ **D8** Fixa/ta bort jämförelseknapp; Suspense-skeleton
- ⬜ **Omtest design:** betyg ≥8

---

## Logg
- 2026-06-01: Plan skapad. Påbörjar kategori 4 (Funktioner).
