# Aikostnad.se — Produktplan
**Skapad:** 2026-05-15  
**Status:** MVP-fas

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

## Del 4: Reviderad MVP-prioriteringslista (Dag 1–30)

### Dag 1–5 — Grund
- [ ] Repo: Vite + React + TypeScript + Tailwind, ESLint, Prettier
- [ ] `siteConfig.ts` med `languageFactor`, `usdToSekRate`, `leadCaptureEnabled`
- [ ] `modelPricing.ts` — priser med `lastUpdated` per modell (15–20 modeller)
- [ ] Beräkningslogik i `src/utils/calculateCost.ts` (med Swedish language factor)
- [ ] Vercel-projekt kopplat, preview-deploy fungerar

### Dag 6–12 — Kärna
- [ ] Kalkylatorn: alla fält, validering, felmeddelanden
- [ ] Resultatsektion: kostnad/fråga, dag, månad, år (SEK + USD)
- [ ] Tokenräknare (`/token-kalkylator`) med textarea + resultat
- [ ] Responsiv layout (mobile-first), testad på iOS Safari + Chrome Android

### Dag 13–18 — SEO-grund
- [ ] `sitemap.xml` (auto-genererad via plugin)
- [ ] `robots.txt`
- [ ] Meta tags: title, description, canonical, og:title, og:description, og:image
- [ ] FAQ-sektion med JSON-LD schema markup
- [ ] H1: *"Vad kostar AI? Räkna ut din AI-kostnad direkt"*
- [ ] `/integritet` — GDPR-korrekt integritetspolicy

### Dag 19–23 — Värdeförstärkning
- [ ] Modell-jämförelsetabell
- [ ] USD/SEK live-kurs (Edge Function + fallback)
- [ ] "Senast uppdaterade priser: [DATUM]" synlig i UI
- [ ] Email capture (Resend) — PDF-export eller prisnotis
- [ ] OG-bild (statisk, 1200×630, snygg och brandad)

### Dag 24–27 — Analytics & Launch prep
- [ ] GA4 + Vercel Analytics installerat
- [ ] Custom events definierade och testade
- [ ] Core Web Vitals audit (Lighthouse score > 90)
- [ ] Custom domain DNS-konfigurerad (aikostnad.se)

### Dag 28–30 — Launch
- [ ] ProductHunt-draft klar (tagline, gallery, länk)
- [ ] Reddit-poster formulerade: r/ChatGPT, r/artificial, r/sverigeDigitalt
- [ ] LinkedIn-inlägg (personligt + professionellt)
- [ ] Soft launch: dela med 10 personer, samla feedback
- [ ] Full launch
- [ ] Reviewera analytics dag 30 → prioritera sprint 2

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
