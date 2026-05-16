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
  - **Första försöket** (`@vercel/og`) failade på Vercel — paketet är Next.js-bundlat, inkompatibelt med Vite-projekt (Vercel markerade det som "unsupported module" vid deploy)
  - **Lösning**: statisk PNG ([public/og-image.png](public/og-image.png), 179 KB) genererad via [scripts/build-og.mjs](scripts/build-og.mjs) med `@resvg/resvg-js` (devDep) från en inline-SVG
  - Indigo gradient + dot-grid + AI-badge + "Aikostnad.se" + tagline + modell-rad
  - Refererad från [SEO.tsx](src/components/SEO.tsx) och [index.html](index.html) (för JS-fria crawlers)
  - Kör om scriptet (`node scripts/build-og.mjs`) när designen ändras

- [x] **URL-state i kalkylatorn** ✅ 2026-05-15
  - Query params: `?model=&input=&output=&req=&users=&days=` (endast non-default-värden skrivs ut)
  - Synkas via `useSearchParams` med `replace: true` — fyller inte historien
  - URL-värden vinner över hero-defaults vid första render
  - Bonus: "Kopiera länk"-knapp under resultatet (skriver `window.location.href` till urklipp, visar bekräftelse 2s)

- [x] **SEO-landningssida `/vad-kostar-chatgpt`** ✅ 2026-05-16
  - `src/pages/VadKostarChatGPT.tsx` — Calculator med förvalt `modelId=gpt-4o`
  - Skräddarsydd intro 200-300 ord, egen `<title>`, `<canonical>`, FAQ (5 frågor)
  - LandingFAQ-komponent med JSON-LD schema
  - Lagd till i router (App.tsx) och sitemap.xml

- [x] **Fler SEO-landningssidor** ✅ 2026-05-16
  - `/claude-pris` — `src/pages/ClaudePris.tsx`, förvalt `modelId=claude-sonnet-4-6`
  - `/gpt-4-pris` — `src/pages/Gpt4Pris.tsx`, förvalt `modelId=gpt-4.1`
  - `/ai-chatbot-kostnad` — ej gjord än (låg prio, inga extra sidor specificerade i sprint B)

- [x] **Lägg `<lastmod>` i [public/sitemap.xml](public/sitemap.xml)** ✅ 2026-05-16
  - Hårdkodade `<lastmod>2026-05-16</lastmod>` på alla URL:er
  - **Varför:** Google rankar uppdaterad content högre.

- [x] **Utöka FAQ från 7 till 14 frågor** ✅ 2026-05-15
  - Nya: Claude vs ChatGPT-jämförelse, prompt caching, AI-assistent för företag, dokumentanalys, kontextfönster, open-source vs API, "bygga chatbot"
  - Långa beskrivande svar för bättre long-tail-SEO och AI-svar-snippets

- [x] **Cookie-banner: lös motsägelsen** ✅ 2026-05-16
  - Tog bort CookieBanner-komponenten helt (Vercel Analytics sätter inga cookies)
  - Privacy-sidan stämmer: "inga spårningscookies eller tredjepartscookies"
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

- [x] **Lazy-load routes** ✅ 2026-05-16
  - `React.lazy()` på TokenCalculatorPage, Privacy, VadKostarChatGPT, ClaudePris, Gpt4Pris i [src/App.tsx](src/App.tsx)
  - Home är eager-loaded (primär LCP-sida)
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

## 🔵 Sprint D — SEO-auktoritet & organisk trafik (2026-05-16)

**Bakgrund:** SEO-audit 2026-05-16 gav övergripande 7,2/10. Tekniskt golv är solid men E-E-A-T är 3/10 och internlänkar 5/10. Detta blockerar ranking på huvudkeywords. Punkterna nedan är ordnade efter ROI.

### Hög impact

- [ ] **Bygg `/om`-sida med Person-schema + E-E-A-T-content**
  - Sajten saknar helt auktorsignaler. Privacy säger "utan organisationsnummer" — direkt negativt
  - Behöver: vem driver sajten, varför, hur priser verifieras, ev. LinkedIn-länk för Person-schema sameAs
  - Lägg JSON-LD Person + sameAs (LinkedIn/GitHub)
  - Justera Privacy.tsx så formuleringen "utan organisationsnummer" inte underminerar trovärdighet

- [ ] **Variera anchor text i Home + Footer + lägg kontextuella länkar**
  - Idag identisk anchor "Vad kostar ChatGPT?" från både Home och Footer → noll signal till Google
  - Varianter: "Räkna på GPT-4o och Plus-abonnemang", "Claude Sonnet och Haiku-kostnader" etc.
  - Lägg kontextuella länkar i brödtext på alla 5 landningssidor (inte bara i "Vill du jämföra"-box)

- [ ] **Lägg `BreadcrumbList`-schema på alla 5 landningssidor**
  - Bara `/token-kalkylator` har breadcrumb-schema idag
  - Ger breadcrumb-rich-snippet i SERP

- [ ] **Skriv 3 långa artiklar (1500+ ord) som hub-content**
  - `/chatgpt-vs-claude` — hög intent, long-tail keyword
  - `/ai-chatbot-kostnad` — listad i forbattringar.md sedan tidigare som ogjord
  - `/prompt-caching` — låg konkurrens, hög teknisk auktoritet
  - Varje artikel ska länka till alla relevanta landningssidor med varierad anchor text + citera primärkällor (Anthropic, OpenAI prislistor)

### Medium impact

- [ ] **Dubbla content på de 5 landningssidorna till 800–1500 ord**
  - Idag 200–350 ord vardera → riskerar "thin content"-flagga
  - Lägg till: prisexempel per scenario, "När ska du välja X?", citat med källänk

- [ ] **Lägg `Product`/`OfferCatalog`-schema på SubscriptionTable**
  - Kan ge price-rich-snippets för "ChatGPT Plus pris" osv.

### Låg impact (men billigt)

- [ ] **Lyft tokenräknaren till Home main-content med CTA-card**
  - Idag bara länkad från Header + Footer
  - Ett card mellan ModelComparisonTable och guide-links: "Klistra in din text — räkna tokens exakt"

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
