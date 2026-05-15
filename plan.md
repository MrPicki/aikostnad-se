# Aikostnad.se — Produktplan
**Skapad:** 2026-05-15  
**Senast uppdaterad:** 2026-05-15 (session 2)  
**Status:** MVP live ✅

---

## Del 1: Komprimerad originalplan

Aikostnad.se är en svensk AI-kostnadskalkylator riktad till privatpersoner, företagare och utvecklare. Principen: gör en sak riktigt bra. Kalkylatorn beräknar kostnad per fråga/dag/månad/år baserat på vald AI-modell, antal prompts, token-längd och antal användare. Kompletterande verktyg: tokenräknare (klistra in text → tokens + kostnad).

**Stack:** React + TypeScript + Tailwind + Vite → deploy Vercel  
**Backend:** Firebase/Supabase för email leads  
**Prissättning:** JSON/TS-fil med modellpriser  
**Monetisering:** Annonser, affiliate, nyhetsbrev, leads  
**SEO-fokus:** "AI kostnad", svenska Google, FAQ-schema  
**Sidor (MVP):** `/`, `/token-kalkylator`, `/integritet`

---

## Del 2: Analys — styrkor, svagheter, luckor

### Styrkor
- Tydlig positionering och avgränsning ("gör en sak bra")
- SEO-tänket är inbakat från start — inte en efterkonstruktion
- Monetisering är förberedd men inte påträngande
- Config-driven feature toggles (`leadCaptureEnabled`) är smart
- Kalkylator-fälten täcker de faktiska beslutsvariablerna bra

### Naiva antaganden / underskattat
- **Statisk valutakurs (10.5 SEK/USD)** — felaktig kurs underminerar förtroende direkt
- **Statiska modellpriser** — AI-priser ändras ofta (ibland månadsvis). Utan uppdateringsstrategi blir sidan fel och skadar SEO-auktoritet
- **"1 token ≈ 0.75 ord" gäller engelska** — för svenska (å, ä, ö) är relationen ~1.2–1.5 tokens/ord; fel här ger felaktiga kalkyler i ~40% av kalkylationerna
- **Firebase vs Supabase olöst** — skapar beslutsparalys vid byggstart
- **Email + blur som lead capture** — friktionen är för hög för ett gratisverktyg; riskerar både SEO-straff (blurrat innehåll) och dålig UX
- **Ingen analytics/event tracking** — utan data vet du inte vilka modeller som väljs, var användare lämnar, vad som faktiskt fungerar

### Saknas helt
- Sitemap.xml + robots.txt (kritiskt för SEO-crawling)
- Open Graph-bild (avgörande när URL delas på LinkedIn/Twitter)
- Strukturerad data för calculator-tool (Google Rich Results)
- Felhantering och inputvalidering (vad händer vid 0 användare?)
- Jämförelsetabell modell vs modell (högt SEO-värde, hög intent)
- "Senast uppdaterad"-datum på modellpriser (förtroendesignal)
- Konkurrentanalys och tydlig differentiering

---

## Del 3: Konkreta förbättringar med motiveringar

### 1. Fixa tokenräkning för svenska texter
**Problem:** Originalplanen anger `1 token ≈ 0.75 ord` — det gäller engelska. Svensk text med å/ä/ö tokeniseras av GPT-modeller till ~1.2–1.5 tokens per ord.  
**Åtgärd:** Lägg en `languageFactor` i `siteConfig.ts` (default: `1.3` för svenska). Visa en tooltip: *"Estimat baserat på svensk text."* Tillåt override.  
**Varför:** Om kalkylen är 40% för låg tappar du förtroende dag ett.

### 2. USD/SEK-kurs via API eller tydlig manual-uppdatering
**Problem:** Hårdkodad kurs på 10.5 är en tidsbomb.  
**Åtgärd:** Hämta dagligen via free-tier API (t.ex. `api.exchangerate-api.com`) i en Vercel Edge Function med 24h cache. Fallback: senast kända kurs i config. Visa `1 USD = X SEK (uppdaterad DATUM)` i kalkylatorn.  
**Varför:** SEK/USD rörde sig 15% under 2024. Fel kurs är direkt faktafel.

### 3. Prisdata med versionshantering och "senast uppdaterad"
**Problem:** AI-modellpriser ändras utan förvarning. En gammal prislista sänker trovärdigheten.  
**Åtgärd:** Lägg till `lastUpdated: "2026-05-15"` per modell i `modelPricing.ts`. Visa i UI: *"Priser senast verifierade [DATUM]"*. Skapa en kort checklista för manuell prisuppdatering — sikta på månadsvis.  
**Varför:** En sajt som visar fel priser rankar inte länge.

### 4. Skippa Firebase/Supabase för MVP — använd Resend
**Problem:** Firebase/Supabase är överkill för email lead capture i MVP.  
**Åtgärd:** Använd [Resend](https://resend.com) med en Vercel serverless function. Gratisnivå: 100 email/dag. Inga databaser att sätta upp. Senare kan du migrera till Supabase när du har >500 leads och vill segmentera.  
**Varför:** Snabbare launch, noll infrastrukturkostnad, noll konfigurationshuvudvärk.

### 5. Email capture — byt strategi från blur till värde
**Problem:** Blurra kalkyleringsresultatet skadar UX och kan ge Google-straff för "cloaking".  
**Åtgärd:** Visa alltid full kalkyl. Erbjud istället email för: (a) PDF-export av rapporten, (b) prenumeration på "Prisuppdateringar — vi notifierar när GPT/Claude ändrar priser". Det är ett genuint värdeerbjudande.  
**Varför:** Push > Pull. Användaren ger email för något de vill ha, inte för att slippa hinder.

### 6. Lägg till jämförelsetabell som separat komponent
**Problem:** "Vilken AI är billigast för mitt användningsfall?" är en av de högst-intent frågorna i segmentet — originalplanen missar det helt.  
**Åtgärd:** Bygg en statisk `ModelComparisonTable.tsx` med kolumner: Modell, Input-kostnad/Mtok, Output-kostnad/Mtok, Kontextstorlek, Bäst för. Länka från startsidan. Målet: ranka på "jämför AI-priser", "billigaste AI-modell".  
**Varför:** Comparison content driver organisk trafik och backlinks.

### 7. Skippa Llama eller kategorisera rätt
**Problem:** Llama är open source och har ingen token-kostnad per API-anrop i traditionell mening. Att lista det bredvid GPT-4o skapar förvirring.  
**Åtgärd:** Separera i UI: *"Kommersiella API:er"* vs *"Open source / self-hosted"*. För Llama: visa infrastrukturkostnad-estimat (GPU-timmar via Replicate/RunPod) istället.  
**Varför:** Precision bygger förtroende.

### 8. Bygg in analytics från dag 1
**Problem:** Originalplanen nämner inte tracking alls. Du vet inte vad som fungerar.  
**Åtgärd:** GA4 + Vercel Analytics (gratis). Lägg custom events: `calculator_submit`, `model_selected`, `email_captured`, `token_calculator_used`. Sätt upp en enkel dashboard i Looker Studio dag 1.  
**Varför:** Du kan inte optimera det du inte mäter. Affiliatepartnern vill se data.

---

## Del 4: MVP-status (2026-05-15)

### Grund ✅
- [x] Repo: Vite + React + TypeScript + Tailwind
- [x] `siteConfig.ts` med `languageFactor: 1.3`, `fallbackRate`, `leadCaptureEnabled`, `pricesLastVerified`
- [x] `modelPricing.ts` — 11 modeller med `lastUpdated` per modell, `defaultModelId = "gpt-4o-mini"`
- [x] Beräkningslogik i `src/utils/calculateCost.ts`
- [x] Vercel-projekt kopplat, auto-deploy på push till `main`

### Kärna ✅
- [x] Kalkylatorn: alla fält, validering, felmeddelanden på svenska
- [x] Resultatsektion: "Total kostnad / år" (highlight) → Per månad → Per dag → Per fråga
- [x] Tokenräknare (`/token-kalkylator`) med textarea + resultat
- [x] Responsiv layout — `overflow-x: hidden` på html/body/root, mobile-first

### SEO-grund ✅
- [x] Meta tags: title, description, canonical, og:title, og:description
- [x] FAQ-sektion med JSON-LD FAQ schema
- [x] JSON-LD WebSite + SoftwareApplication schema
- [x] `/integritet` — GDPR-korrekt integritetspolicy
- [ ] `sitemap.xml` — saknas
- [ ] `robots.txt` — saknas
- [ ] OG-bild 1200×630 — saknas

### Värdeförstärkning ✅
- [x] Modell-jämförelsetabell (sorterbar, med open source-filter)
- [x] USD/SEK live-kurs via `frankfurter.app` (Vercel Edge Function, 24h cache, fallback 10.50)
- [x] "Priser synkade {lastUpdated} · Manuellt verifierade" synlig i UI
- [x] Hero-sektion med 6 roterande rubriker + AI-analys av fri text → förifylld kalkylator
- [x] AI väljer optimal modell automatiskt (modelId returneras från analyze-prompt)
- [x] Cookie-banner (GDPR, fixed bottom, localStorage-baserad)
- [x] Rate limiting på AI-analys: max 3 anrop/webbläsare (localStorage `aikostnad_analyze_count`)
- [x] Animerad dot-bakgrund (DotBackground canvas, position fixed, indigo prickar med slumpmässig flimmer)
- [x] Hero: osynlig spacer + absolut overlay för att eliminera layout-shift vid rubrikbyte
- [x] Hero: shimmer-linje (CSS `::after`, `12s linear infinite`) separerar rubrik från idéchatt
- [x] Hero: "Vad vill du bygga med AI?" rubrik + ny placeholder, textarea `font-size: 16px` (ingen iOS-zoom)
- [x] Alla rubriker och underrubriker centrerade (Hero, Kalkylator, Tokenräknare, FAQ, Jämförelsetabell)
- [ ] Email capture UI — `submitLead()` finns i `src/lib/supabase.ts`, Supabase-tabell klar. UI saknas.
- [ ] OG-bild — saknas

### DNS & Domäner
- [x] `aikostnad.com` → 308 redirect till `aikostnad.se` (Vercel REST API)
- [ ] DNS `aikostnad.se`: A-record `76.76.21.21` hos Strato — **OEJ GJORT**
- [ ] DNS `aikostnad.com`: A-record `76.76.21.21` hos Strato — **EJ GJORT**

### Analytics & Launch prep
- [x] Vercel Analytics installerat (`@vercel/analytics/react`, `<Analytics />` i App.tsx)
- [ ] GA4 — saknas (custom events `calculator_submit`, `model_selected` etc.)
- [ ] Core Web Vitals audit (Lighthouse)
- [ ] ProductHunt + Reddit + LinkedIn launch

---

## Del 5: Teknisk checklista inför byggstart

### Beräkningslogik
- [ ] `languageFactor: 1.3` för svenska texter implementerat
- [ ] Input: `inputTokensPerRequest`, `outputTokensPerRequest`, `requestsPerDay`, `users`, `daysPerMonth`, `model`
- [ ] Output: `costPerRequest`, `dailyCost`, `monthlyCost`, `yearlyCost`, `monthlyInputTokens`, `monthlyOutputTokens`, `inputCost`, `outputCost` — i SEK och USD
- [ ] Validering: positiva heltal, rimliga max-värden, tydliga felmeddelanden på svenska

### Data
- [ ] Alla modellpriser har `inputPricePerMToken`, `outputPricePerMToken`, `lastUpdated`, `contextWindow`, `category` (commercial/open-source)
- [ ] Modeller att inkludera dag 1: GPT-4.1, GPT-4.1 mini, GPT-4o, GPT-4o mini, Claude Sonnet 4, Claude Opus 4, Claude Haiku, Gemini 2.0 Flash, Gemini 1.5 Pro, Mistral Large

### SEO
- [ ] `sitemap.xml` genereras automatiskt vid build
- [ ] `robots.txt` konfigurerad
- [ ] Canonical URL satt på varje sida
- [ ] `og:image` 1200×630 px, under 200 KB
- [ ] JSON-LD FAQ schema på startsidan
- [ ] Inga broken links (kontrollera vid deploy)

### Prestanda
- [ ] Lighthouse Performance score > 90 (mobil)
- [ ] LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] Inga onödiga npm-paket (håll bundle liten)
- [ ] Bilder optimerade (WebP, lazy load)

### GDPR/Juridik
- [ ] Integritetspolicy på `/integritet` — täcker GA4, email, cookies
- [ ] Cookie-banner om Google Analytics används
- [ ] Email-formulär: explicit samtycke, tydlig opt-out

### Infrastruktur
- [ ] Vercel-projekt skapat och kopplat till GitHub
- [ ] Environment variables: `RESEND_API_KEY`, `EXCHANGE_RATE_API_KEY`
- [ ] Preview deploys aktiva för PR
- [ ] Custom domain `aikostnad.se` konfigurerad
- [ ] `aikostnad.com` → redirect till `aikostnad.se`

---

## Övrigt: Nästa steg efter MVP

Sprint 2 (månad 2–3):
- `/vad-kostar-chatgpt` och `/ai-chatbot-kostnad` — SEO-landningssidor
- Affiliate-integration (t.ex. OpenAI API via partner)
- A/B-test email capture (PDF vs prisnotis)
- Backlink-kampanj: nå ut till svenska techbloggar, Breakit, IDG

Sprint 3 (månad 4+):
- Automatisk prisuppdatering via scraping + admin-dashboard
- API-endpoint (betald, för företag som vill integrera kalkylatorn)
- Nyhetsbrev: månatlig "AI-prisrapport Sverige"
