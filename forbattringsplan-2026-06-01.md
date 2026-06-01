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
- 🔄 **Omtest funktion:** betyg ≥8

## Kategori 3 — Säkerhet (start: 4/10 → mål ≥8)

- ⬜ **S1** Fail-closed cron-auth (`morning-digest`, `twitter-bot`)
- ⬜ **S2** Stäng `daily-digest` (CRON_SECRET + metod) eller ta bort live-LLM; ta bort `ACAO: *`
- ⬜ **S3** Strypa `send-guide` (rate limit per IP + per mottagare)
- ⬜ **S4** Sanera LLM/RSS-HTML (DOMPurify klient + server); stäng av rå HTML i `marked`
- ⬜ **S5** Lägg till CSP i `vercel.json`
- ⬜ **S6** Förbättra rate limiting (delad/hållbar spärr)
- ⬜ **S7** `article.ts` anon-nyckel + RLS; sluta använda `VITE_` server-side; logga endast status
- ⬜ **Omtest säkerhet:** betyg ≥8

## Kategori 2 — SEO (start: 6/10 → mål ≥8)

- ⬜ **SEO1** Synka prerendern mot alla vägar (en `ROUTES`-källa, generera sitemap, build-guard)
- ⬜ **SEO2** SPA-fallback i `vercel.json`
- ⬜ **SEO3** `/nyheter/:date` indexerbar (dynamisk sitemap + `NewsArticle`-schema)
- ⬜ **SEO4** Laga dubbelprefixad canonical på nyhetssidor
- ⬜ **SEO5** En sanningskälla för titel/beskrivning
- ⬜ **SEO6** Generera sitemap från riktiga `modifiedDate`
- ⬜ **SEO7** Huvudnyckelord i start-`<h1>`; `og:locale` + `hreflang`
- ⬜ **SEO8** Self-hosta typsnitt/skjut upp scripts; `noindex` på `/embed`; städa `robots.txt`
- ⬜ **Omtest SEO:** betyg ≥8

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
