# Aikostnad.se — Förbättringslista
**Skapad:** 2026-05-15
**Baserad på:** Kodanalys + jämförelse mot `plan.md`
**Status:** Förslag — ingen åtgärd påbörjad

Varje punkt är en självständig task. `[ ]` = ej gjord. Sortera om fritt — prioriteringen nedan är min rekommendation.

---

## 🔴 Akut — faktarisk (denna vecka)

Planens kärntes: *"En sajt som visar fel priser rankar inte länge."* Här finns problem nu.

- [x] **Uppdatera modellpriser i [src/data/modelPricing.ts](src/data/modelPricing.ts)** ✅ 2026-05-15
  - `claude-opus-4` → `claude-opus-4-7` ($5/$25, flaggskepp)
  - `claude-sonnet-4` → `claude-sonnet-4-6` ($3/$15)
  - `claude-haiku-4` → `claude-haiku-4-5` ($1/$5, höjt från $0.80/$4.00)
  - Synkat även [api/analyze-prompt.ts](api/analyze-prompt.ts) (SYSTEM-prompt + VALID_MODEL_IDS)

- [x] **Lägg till DeepSeek i modellistan** ✅ 2026-05-15
  - DeepSeek V3.2 ($0.28/$0.42) + DeepSeek R1 ($0.55/$2.19) som open-source
  - Båda tillagda i [modelPricing.ts](src/data/modelPricing.ts) och [analyze-prompt.ts](api/analyze-prompt.ts)

- [x] **Granska Gemini-priser** ✅ 2026-05-15
  - `gemini-2.0-flash` ($0.075/$0.30) → `gemini-2.5-flash` ($0.30/$2.50, output 8× dyrare!)
  - `gemini-1.5-pro` ($1.25/$5.00, 2M ctx) → `gemini-2.5-pro` ($1.00/$10.00, 1M ctx)
  - Synkat i [analyze-prompt.ts](api/analyze-prompt.ts)

- [x] **Lås CORS i [api/analyze-prompt.ts](api/analyze-prompt.ts)** ✅ 2026-05-15
  - Allowlist: `aikostnad.se`, `www.aikostnad.se`, `aikostnad.com`, localhost (5173-5175), Vercel preview-domäner
  - Browser-anrop från okänt origin → 403
  - Server-server-anrop (utan Origin-header) tillåts — saknar bättre auth-skydd

- [x] **Tysta error-detalj i [api/analyze-prompt.ts](api/analyze-prompt.ts)** ✅ 2026-05-15
  - 500-response innehåller nu bara `{ error: "Analys misslyckades" }`
  - `console.error` loggar fortfarande internt
  - Bonus: lade till CORS-header på 400/500-responses så browser kan läsa felmeddelandet

---

## 🟠 Hög prio — SEO & förtroende (nästa 1-2 veckor)

- [x] **OG-bild 1200×630** ✅ 2026-05-15
  - Dynamisk via [api/og.tsx](api/og.tsx) (`@vercel/og`, Satori-renderad) — ingen statisk PNG
  - Indigo gradient + dot-grid + "Aikostnad.se" logotyp + tagline
  - Cachad 24h edge-side
  - Refererad i [src/components/SEO.tsx](src/components/SEO.tsx) och statisk [index.html](index.html) (för JS-fria crawlers)

- [ ] **URL-state i kalkylatorn**
  - Lägg till query params: `?model=gpt-4o&words=100&output=200&users=5&days=22`
  - Synka via `useSearchParams` från react-router
  - **Varför:** Delningsbara kalkyler → organisk trafik, backlinks, lägre bounce rate.

- [ ] **SEO-landningssida `/vad-kostar-chatgpt`**
  - Skapa `src/pages/VadKostarChatGPT.tsx` — återanvänd `Calculator` med förvalt `modelId=gpt-4o`
  - Skräddarsydd intro (200-300 ord), egen `<title>`, `<canonical>`, FAQ
  - Lägg till i `sitemap.xml` och router
  - **Varför:** Plan Sprint 2 — exakt-match keywords driver svenska Google. Hög intent.

- [ ] **Fler SEO-landningssidor (samma mönster)**
  - `/ai-chatbot-kostnad` — förvalt scenario "kundtjänst"
  - `/claude-pris` — förvalt `modelId=claude-sonnet-4-6`
  - `/gpt-4-pris` — förvalt `modelId=gpt-4.1`

- [ ] **Lägg `<lastmod>` i [public/sitemap.xml](public/sitemap.xml)**
  - Generera dynamiskt vid build (script i `package.json`) eller hårdkoda
  - **Varför:** Google rankar uppdaterad content högre.

- [ ] **Utöka FAQ från 7 till 12-15 frågor**
  - "Vad kostar Claude vs ChatGPT?"
  - "Hur räknar man tokens manuellt?"
  - "Vad är prompt caching och hur sparar man?"
  - "Skillnad input/output token-pris?"
  - "Kan jag använda kalkylatorn för Azure OpenAI?"
  - **Varför:** JSON-LD FAQ schema → Rich Results i Google. Long-tail SEO.

- [ ] **Cookie-banner: lös motsägelsen**
  - Privacy säger "vi använder inga cookies", bannern säger "vi använder cookies"
  - Två alternativ: **(a)** ta bort banneren helt (Vercel Analytics sätter inga cookies), eller **(b)** lägg till "Avvisa"-knapp (GDPR-kravet på lika lätt opt-out)
  - **Varför:** Juridisk konsistens + bättre UX.

---

## 🟡 Medel prio — UX & teknik

- [ ] **Prompt caching-toggle i kalkylatorn**
  - Checkbox: "Återanvänder du system-prompt? (Cached input ~90% rabatt)"
  - Påverkar `inputCostUsd` med 0.1× på den cachade delen
  - **Varför:** För chatbot-scenarier är current kalkyl ~30-50% överskattad. Differentiator vs konkurrenter.

- [ ] **Pausa [DotBackground.tsx](src/components/DotBackground.tsx) när dold**
  - Lyssna på `visibilitychange` → pausa rAF när `document.hidden`
  - Respektera `@media (prefers-reduced-motion: reduce)` → rendera statiska prickar
  - **Varför:** Batterisparare på mobil, accessibility-krav.

- [ ] **IP-baserad rate limit på analyze-prompt**
  - Lägg Upstash Redis eller Vercel KV
  - Limit: 5 requests/IP/dag (utöver localStorage 3/browser)
  - **Varför:** localStorage kringgås trivialt via inkognito. Skyddar Anthropic-budget.

- [ ] **TokenCounter — tydliggör input vs output**
  - Idag visas både "Kostnad input" och "Kostnad output" baserat på *samma* text → förvirrande
  - Lägg en toggle: "Räkna som [input ▼ / output ▼]" — eller visa båda men förklara tydligare
  - Eller: visa enbart token-antal + "kostar X som input ELLER Y som output"

- [ ] **Auto-scroll till resultat på mobil i [Calculator.tsx](src/components/Calculator.tsx)**
  - När första giltiga resultatet beräknas på mobil, smooth-scroll till resultatpanelen
  - Använd `IntersectionObserver` eller `window.matchMedia("(max-width: 1024px)")`

- [ ] **Lazy-load routes**
  - `React.lazy()` på `TokenCalculatorPage` och `Privacy` i [src/App.tsx](src/App.tsx)
  - **Varför:** Mindre initial bundle → bättre LCP, bättre mobile Lighthouse.

- [ ] **Self-host eller preload Google Fonts**
  - Nuvarande [index.html:10](index.html) är render-blocking
  - Antingen: ladda ner Inter och servera lokalt, eller använd `<link rel="preload" as="style">` + onload-mönster
  - **Varför:** ~200-400ms snabbare LCP.

- [ ] **Lås manualuppdaterings-rutin för priser**
  - Skapa `PRICES.md` eller `scripts/verify-prices.md` med checklista per provider (URL + vad som kollas)
  - Mål: månadsvis snabb-verifiering tar 10 min, inte 1 timme
  - **Varför:** Planen Del 3 punkt 3 — utan rutin glider priserna fel.

---

## 🟢 Strategiskt — Sprint 2+ (planens vision)

- [ ] **Email-prenumeration: "Prisuppdateringar via email"**
  - Använd Resend (planen rekommenderade detta över Supabase)
  - Värdeerbjudande: "Få mail när GPT/Claude/Gemini ändrar priser"
  - Trigger: när någon modell i `modelPricing.ts` får ny `lastUpdated`, skicka mail
  - **Varför:** Plan Del 3 punkt 5 — push-värde framför pull-formulär. Bygger lista organiskt.

- [ ] **Custom Vercel Analytics-events**
  - `calculator_submit` (med modelId), `model_selected`, `hero_analyze_used`, `comparison_sort_clicked`
  - Använd `import { track } from "@vercel/analytics"`
  - **Varför:** Plan Del 3 punkt 8 — du kan inte optimera vad du inte mäter.

- [ ] **Open source / self-hosted-separation**
  - Plan Del 3 punkt 7: separera Llama från API-modeller, visa infrastrukturkostnad-estimat (Replicate/RunPod $/GPU-timme)
  - Skapa ny komponent `SelfHostedCalculator.tsx` med Llama 3.3 70B + Llama 4 + Qwen
  - Inputs: GPU-typ, requests/sek, instans-uptid
  - **Varför:** Differentiering — ingen svensk konkurrent gör detta.

- [ ] **Spara/exportera kalkyl som PDF**
  - Knapp "Ladda ner som PDF" på resultatet
  - Kan vara värdeerbjudande för email capture
  - **Varför:** B2B-användare som vill skicka kalkyl till chef/CFO.

- [ ] **Bygg blogg / artiklar**
  - 3-5 inledande artiklar på tunga svenska keywords:
    - "Vad kostar det att bygga en AI-chatbot? [2026]"
    - "Claude vs ChatGPT vs Gemini — pris och prestanda jämfört"
    - "Så räknar du AI-kostnaden för ditt SaaS"
    - "Prompt caching — så halverar du Claude-kostnaden"
  - **Varför:** 100% verktyg, 0% content idag → ingen long-tail SEO.

- [ ] **Affiliate-integration**
  - OpenAI / Anthropic har partner-program
  - Lägg "Kom igång med [modell]" → affiliate-länk på jämförelsetabellen
  - **Varför:** Plan Del 1 monetisering — utan affiliate är intäkt 0 kr.

---

## 📋 Fortfarande kvar från plan.md (oberoende av denna analys)

- [ ] DNS `aikostnad.se` — A-record `76.76.21.21` hos Strato
- [ ] DNS `aikostnad.com` — A-record `76.76.21.21` hos Strato
- [ ] Email capture UI (om man inte hoppar direkt på Resend-spåret ovan)
- [ ] Core Web Vitals audit (Lighthouse mobil > 90)
- [ ] ProductHunt + Reddit + LinkedIn launch
- [ ] Backlink-kampanj (Breakit, IDG, svenska techbloggar)

---

## Rekommenderad sprint-ordning

**Sprint A (1 vecka)** — Fixa faktarisken så sajten är trovärdig:
1. Uppdatera modellpriser (Claude 4.5/4.6, DeepSeek, granska Gemini)
2. Lås CORS + tysta error-detaljer i analyze-prompt
3. OG-bild
4. Cookie-banner-konsistens

**Sprint B (1-2 veckor)** — Skala SEO-ytan:
5. URL-state i kalkylator
6. Första SEO-landningssidan `/vad-kostar-chatgpt`
7. Utöka FAQ till 12-15 frågor
8. Custom analytics-events

**Sprint C (2-4 veckor)** — Differentiering + monetisering:
9. Prompt caching-toggle
10. Self-hosted-kalkylator (Llama/Qwen)
11. Email-prenumeration via Resend
12. 3 första blog-artiklar
13. Affiliate-länkar
