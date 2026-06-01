# Fullständig granskningsrapport — aikostnad.se

**Datum:** 2026-06-01
**Omfattning:** Hela kodbasen (React 19 + Vite 8 SPA, Vercel edge-funktioner, Supabase, Resend, Anthropic)
**Metod:** Fyra parallella djupgranskningar (design, SEO, säkerhet, funktion) + manuell verifiering av nyckelfiler.
**Betygsskala:** 1–10, strikt bedömt. Mål: minst genomsnitt **8/10** i varje kategori.

---

## Sammanfattning (TL;DR)

| # | Kategori | Betyg idag | Mål | Största hindret |
|---|----------|:---------:|:---:|-----------------|
| 1 | Design / layout | **6 / 10** | 8 | Tillgänglighet (a11y) + dubblerad/överlång startsida + inget design-token-lager |
| 2 | SEO | **6 / 10** | 8 | ~18 värdefulla sidor prerenderas inte → crawlers ser tomt skal |
| 3 | Säkerhet | **4 / 10** | 8 | Fail-open auth på cron, oautentiserad betald LLM-endpoint, stored XSS, ingen rate limit på mejl |
| 4 | Användning / funktioner | **5 / 10** | 8 | Lead-fångsten är trasig på 3 ställen (visar "lyckat" men sparar inget) |

**Genomsnitt idag: 5,25 / 10.** Innehållskvalitet och kärnmatte är starkt — men den tekniska leveransen (crawlbarhet, säkerhet, lead-flöde) drar ner helheten kraftigt. Det positiva: nästan alla problem är mekaniska och åtgärdbara utan att skriva om produkten.

---

## 1. Design / Layout — Betyg: 6 / 10

### Motivering
Det visuella hantverket är över snittet: ren indigo-på-vitt-estetik, genomtänkt kort-system, snygga mikrotillstånd (laddning, streaming, fallback), `prefers-reduced-motion`-stöd, riktiga mobil-omvandlingar (tabell → kort) och starka förtroendesignaler som passar ett finansverktyg. Det håller golvet uppe. Men sidan klarar inte sträng granskning på fyra punkter: **tillgänglighet**, **informationsarkitektur**, **avsaknad av design-tokens** och **inget mörkt läge**.

### Kritiskt
- **Ingen fokus-/scrollhantering vid sidbyte.** Det finns ingen `ScrollToTop` och ingen fokusflytt till `<h1>`/`<main>` vid navigering. Tangentbords- och skärmläsaranvändare får ingen signal att sidan bytts, och scrollpositionen följer med. Baskrav för en SPA som saknas.
- **Ingen "hoppa till innehåll"-länk.** Tangentbordsanvändare måste tabba igenom headern på varje sida.

### Högt
- **Tomt design-token-lager.** `tailwind.config.js` utökar bara `fontFamily`. Ingen egen färgpalett, spacing-, typografi-, radie- eller skuggskala. Varumärkesfärgen är en magisk sträng (`indigo-700`) på 30+ ställen → ombrandning = sök-och-ersätt i hela repot. Knapp-receptet (`bg-indigo-700 hover:bg-indigo-800 rounded-…`) är handkodat i minst 7 komponenter med driftande padding/radie.
- **Inga synliga fokus-stilar** på majoriteten av interaktiva element (knappar, chips, FAQ-triggers, sorteringsrubriker, path-kort, nav-länkar). Tangentbordsnavigering är i praktiken osynlig.
- **Överlång, repetitiv startsida — `SimpleEstimator` renderas två gånger** (fristående + inuti `CalculatorSection`). Användaren ser samma "Vad vill du använda AI till?"-ruta två gånger i samma scroll.
- **Tooltips via `title` + emoji `ⓘ`** — fungerar inte på touch och kan inte nås med tangentbord. Den pedagogiska kärnan (vad input/output/Mtok betyder) är dold för mobil- och tangentbordsanvändare.
- **FAQ-dragspel klipper långa svar** (`max-h-96`). Flera svar överstiger 24rem på mobil och kapas tyst utan scroll.

### Medel
- Sorteringsrubriker i `ModelComparisonTable` är `<th onClick>` utan `<button>` → ej tangentbordsstyrbara.
- Inget `aria-current="page"` på aktiv nav.
- Sektionsavstånd hårdkodat `mb-24` (ej responsivt) → ändlös känsla på mobil.
- `StickyEmailBar` är `hidden md:flex` → den vassaste konverteringsytan saknas på mobilen (där merparten av svensk konsumenttrafik finns).
- `PathSelector` ("Välj väg") ligger *efter* estimatorn — "välj din väg" fungerar bara som första beslut.
- Tom Suspense-fallback (`<div className="min-h-[60vh]" />`) → blank flash på långsam uppkoppling.
- `text-gray-400` på vit bakgrund (~2,8:1) underskrider AA-kontrast (4,5:1) för många bildtexter, hintar och footer-länkar.

### Lågt / polish
- Inget mörkt läge alls (noll `dark:`-klasser). För en utvecklarpublik 2026 läser det daterat.
- Emoji-tät UI (💰⚖️✨📱💻📘) undergräver den seriösa finanstonen.
- "Jämför med ett annat scenario →" öppnar bara samma URL i ny flik — överlovar.
- Inkonsekvent radie-språk (`rounded-md/lg/xl/2xl`) utan regel.

### Väg till 8/10
1. **Fixa a11y-grunderna** (störst hävstång): `ScrollToTop` + fokusflytt vid sidbyte, skip-länk, global `focus-visible`-ring på alla knappar/länkar.
2. **Gör icke-knappar till riktiga knappar** (sorteringsrubriker, tooltips → fokuserbar disclosure).
3. **Laga det klippta FAQ-dragspelet** (grid-rows `1fr/0fr` eller mätt höjd).
4. **Avdubbla och strama åt startsidan** — ta bort den dubbla estimatorn, flytta `PathSelector` högst upp, responsiva avstånd (`mb-16 md:mb-24`).
5. **Bygg ett design-token-lager** i `tailwind.config.js` (`colors.brand.*`, `boxShadow.card`, radie-/typskala) + en `<Button>`/`<Card>`/`<Badge>`-uppsättning.
6. Höj muted-kontrast (`gray-400 → gray-500/600`), lägg till `aria-current`, mobilmeny + mobilvariant av sticky-baren.
7. Lägg till mörkt läge (`darkMode: 'class'`).

---

## 2. SEO — Betyg: 6 / 10

### Motivering
On-page är genuint 8–9/10: 40+ nyckelordsriktade sidor med 800–2000 ords riktig svensk text, mycket stark strukturerad data (`Organization`, `WebSite`+`SearchAction`, `SoftwareApplication`, `HowTo`, `Speakable`, `Product`/`AggregateOffer` i SEK, `Article`, `Breadcrumb`), genomtänkt intern länkning via `relatedArticles.ts`, korrekt `lang="sv"`/`inLanguage: sv-SE` och en riktig off-page-plan (`distribution/`, `seo/backlink-paket.md`). **Men den tekniska leveransen till crawlers undergräver allt detta** — och eftersom målet är att ranka #1 på "AI kostnader" m.fl. är det avgörande.

### Kritiskt
- **~18 sitemap-sidor prerenderas INTE.** `ROUTES` i `scripts/seo-metadata.mjs` listar 24 vägar; `sitemap.xml` har 42 och `App.tsx` har 45. Följande sidor (flera höga köp-nyckelord) får **ingen statisk HTML** och ärver startsidans titel/beskrivning för en JS-lös crawl: `ai-api-kostnad`, `ai-for-advokatbyra`, `ai-for-ehandel`, `ai-for-redovisning`, `ai-for-sjukvard`, `ai-for-skola`, `ai-for-smaforetag`, `ai-kostnad-per-manad`, `anthropic-claude-api-pris`, `deepseek-pris`, `embed-info`, `gpt-5-pris`, `jamfor-ai-modeller`, `nyheter`, `o3-pris`, `openai-api-pris`, `prisandringar`, `vad-kostar-ai-per-ar`. *(Verifierat manuellt.)* De ser ut som dubletter av startsidan för Bing, sociala botar och Googlebots första våg.
- **Prerendern injicerar bara meta-taggar, inte sidans innehåll.** *(Verifierat: `scripts/prerender-seo.mjs` byter ut `<title>`/meta men `<body>` förblir tomt React-skal.)* För de 24 prerenderade sidorna är meta korrekt men brödtexten beror fortfarande på JS — för de övriga 18 finns varken meta eller innehåll.
- **Ingen SPA-fallback i `vercel.json`.** `cleanUrls: true` är satt men ingen `rewrites`-regel mappar okända vägar till `/index.html`. Prerenderade vägar fungerar (filen finns), men `/nyheter/:date` (dynamisk, aldrig prerenderad) saknar fil → hård laddning/refresh ger **404**.
- **Nyhetssidorna (`/nyheter/:date`) är osynliga för Google.** Innehåll hämtas klient-sida via `fetch('/api/article')` i `useEffect` → noll innehåll i initial HTML, ingen `ArticleSchema`, inga nyhets-URL:er i sitemap.

### Högt
- **Dubbelprefixad canonical på nyhetssidor.** `SEO.tsx` bygger `siteUrl + path`, men nyhetssidan skickar en absolut URL → `https://aikostnad.sehttps://aikostnad.se/nyheter/...`.
- **Titel-/beskrivningsdrift** mellan prerendrad HTML och hydrerad React (två sanningskällor: `seo-metadata.mjs` vs 40 sidkomponenter). T.ex. `/claude-pris` har olika titlar i HTML och runtime → instabila SERP-titlar.
- **Sitemap-färskhet statisk/felaktig.** Alla URL:er har identisk `lastmod 2026-05-26` trots att `articles.ts` har riktiga, varierande `modifiedDate`.
- **Saknar `og:locale=sv_SE` och self-referential `hreflang="sv-SE"`.**

### Medel
- `/embed` (iframe-mål) saknar `noindex` → risk för tunn/dubblettindexering.
- `robots.txt` minimal: `Crawl-delay` (ignoreras av Google), ingen hållning mot AI-botar (GPTBot/ClaudeBot/PerplexityBot) — missad citeringshävstång för en AI-kostnadssajt.
- Start-`<h1>` ("Räkna ut exakt vad din AI-idé kostar — i kronor") saknar huvudnyckelordet "vad kostar AI / AI-kostnad".
- Alla typsnitt laddas externt från Google Fonts (LCP/CWV); AdSense + GTM i `<head>` (INP/LCP).

### Väg till 8/10
1. **Synka prerendern mot alla vägar** — gör `ROUTES` till enda källa och generera `sitemap.xml` + `App.tsx` därifrån; lägg in ett build-test som failar vid divergens. *(Störst rankingvinst.)*
2. **Lägg till SPA-fallback** i `vercel.json` (`/(.*) → /index.html` som sista rewrite; statiska filer vinner ändå).
3. **Gör `/nyheter/:date` indexerbar:** dynamisk sitemap + statisk/SSR-HTML + `NewsArticle`-schema.
4. **Laga den dubbelprefixade canonical** (skicka bara path).
5. **En enda sanningskälla för titel/beskrivning** så HTML och React alltid matchar.
6. **Generera sitemap från riktiga `modifiedDate`.**
7. Lägg huvudnyckelordet i start-`<h1>`; lägg till `og:locale` + `hreflang`.
8. CWV: self-hosta typsnitt, skjut upp AdSense/GTM; `noindex` på `/embed`; städa `robots.txt`.

---

## 3. Säkerhet — Betyg: 4 / 10

### Motivering
Hemlighetshanteringen och utdata-valideringen är över snittet (API-nycklar är korrekt server-only, aldrig `VITE_`-exponerade; LLM-utdata klampas och valideras hårt). **Men** appen har **fail-open-autentisering** på cron-endpoints med sidoeffekter, minst en **helt oautentiserad betald LLM-endpoint**, en **ostrypt tredjepartsmejl-utskickare** och **stored-XSS-sänkor** matade av otillförlitlig RSS via en LLM — utan CSP och utan DOMPurify. Kostnads- och mejlmissbruk på en sajt som betalar per LLM-/mejlanrop är den dominerande risken.

### Kritiskt
- **`api/daily-digest.ts` är oautentiserad, ostrypt och anropar betald Anthropic-API.** Ingen `CRON_SECRET`, ingen origin-/metodkontroll, ingen rate limit. Varje GET hämtar 4 RSS-flöden och avfyrar ett Claude-anrop (`max_tokens: 1500`) + sätter `Access-Control-Allow-Origin: *`. En angripare kan loopa och bränna din Anthropic-budget (kostnadsförstärknings-DoS).
- **`CRON_SECRET` är villkorad → fail-open.** `morning-digest.ts` och `twitter-bot.ts` wrappar kontrollen i `if (cronSecret) { … }`. Saknas/tom env-var hoppas kontrollen **över helt** och endpointen blir publik (skickar riktigt mejl via Resend, postar på X, skriver till Supabase). `.env.example` levererar `CRON_SECRET=` tom.

### Högt
- **`send-guide.ts` saknar rate limit/origin-skydd → mejlbombning + lead-spam + Resend-kostnad.** Vem som helst kan POSTa `{email, providerId}` och få (1) en rad i Supabase via service-role-nyckeln och (2) ett mejl skickat till en **angriparvald** adress.
- **Stored XSS via `dangerouslySetInnerHTML`** som renderar LLM-genererad HTML (`NyheterArtikel.tsx:123`, `Nyheter.tsx:148`). Kedja: RSS-titel → Claude-prompt → JSON `content` → Supabase → rå render. `marked` strippar inte rå HTML. Ett förgiftat flöde kan injicera `<img onerror=…>`.
- **In-memory rate limiting (Map) är trivialt kringgånget** på Vercels många edge-isolat (`chat.ts`, `estimate-cost.ts`, `analyze-prompt.ts`). Ingen riktig kostnadsspärr för betalda Claude-anrop.
- **Service-role-nyckel som de facto datalager** + `VITE_`-prefixad URL-fallback server-side (smell). `article.ts` är publik GET som bär RLS-kringgående nyckel.

### Medel
- **Ingen Content-Security-Policy** i `vercel.json` (övriga headers — HSTS, X-Frame-Options DENY, nosniff — finns och är bra). CSP är nyckelförsvaret mot XSS-sänkorna ovan.
- Prompt-injection i LLM-endpoints (begränsad pga klampning, men reell).
- Wildcard-CORS på `daily-digest`/`ai-news`/`exchange-rate`.

### Det som är bra (behåll)
- API-nycklar korrekt server-only via `process.env`, aldrig i klientbundlen; `.gitignore` exkluderar `.env*`.
- Stark utdata-validering: modell-ID:n allowlistade, numeriska värden klampade, JSON-parse i try/catch.
- Mejladress valideras och HTML-escapas i `send-guide.ts`.
- Solid bas av säkerhets-headers (HSTS preload, frame-deny, nosniff).

### Väg till 8/10
1. **Gör cron-auth fail-closed** i `morning-digest.ts` och `twitter-bot.ts`: vägra köra om `CRON_SECRET` saknas/inte matchar. *(Störst hävstång, minst ändring.)*
2. **Stäng `daily-digest.ts`:** CRON_SECRET + metodkontroll, eller servera cachat innehåll utan live-LLM i den publika vägen; ta bort `ACAO: *`.
3. **Strypa `send-guide.ts`:** hållbar rate limit per IP och per mottagare; överväg Turnstile/double opt-in.
4. **Sanera all LLM/RSS-HTML** med DOMPurify (klient + server i `buildArticleHtml`); stäng av rå HTML i `marked`.
5. **Lägg till CSP** med `frame-ancestors 'none'`, `object-src 'none'`, scopade `script-src`/`connect-src`.
6. **Ersätt in-memory-limiters** med delad store (Vercel KV/Upstash) nycklad på plattformens klient-IP.
7. Flytta `article.ts` till anon-nyckel + RLS; logga endast status vid uppströmsfel; lägg `npm audit` i CI.

---

## 4. Användning / Funktioner — Betyg: 5 / 10

### Motivering
Kärnkalkylatorn och dess matte, URL-delning och AI-estimatorn fungerar genuint och är över snittet. **Men den primära monetiserings-/lead-vägen är trasig på tre ställen** (visar "lyckat" men sparar inget), en hel funktion + endpoint är död kod, chatt-rådgivaren citerar fel priser och kan krascha, prisdatan är inaktuell relativt de vägar som utlovar den, och AI-endpoints saknar hållbara kostnadsspärrar.

### Kritiskt
- **Tre lead-formulär anropar `/api/send-guide` med saknat/ogiltigt `providerId` → varje submit misslyckas tyst.** `GUIDES` har bara `openai/anthropic/google/mistral/deepseek`; saknas/okänt → HTTP 400 "Okänd leverantör" *innan* leadet sparas. Brytarna: `Calculator.tsx:281` (ingen providerId), `StickyEmailBar.tsx:43` (ingen), `Home.tsx:236` (`providerId="general"` — ogiltig). Catch sväljer felet men sätter `localStorage.email_subscribed="1"` → användaren ser "lyckat" medan **inget lead sparas och inget mejl skickas**. Hela nyhetsbrevs-/prisbevaknings-värdet är ur funktion från startsidan, sticky-baren och efter-kalkyl-fångsten.
- **Kalkylatorns "Spara"-success är falskt positiv** (samma rotorsak): knappen kan aldrig nå grönt "✓ Sparat!" utan återgår tyst.

### Högt
- **Prisdrift mellan `chat.ts` och resten.** Chattens systemprompt anger inaktuella/felaktiga priser ("Claude Haiku 4.5: $0.80/$4.00" mot appens $1.00/$5.00; "Opus 4.6" mot appens 4.7; "Gemini 2.0/1.5" mot appens 2.5) + hårdkodad "1 USD ≈ 10,50 SEK". Chatten motsäger kalkylatorn på samma sajt.
- **Modell-ID-mismatch kan krascha chatten.** `chat.ts:179` använder `"claude-haiku-4-5-20251001"`, övriga `"claude-haiku-4-5"`. Är det daterade ID:t ogiltigt → 500 på varje chattanrop.
- **`ChatSection` + `analyze-prompt` är död kod** — ingen sida importerar `ChatSection`, inget anropar `/api/analyze-prompt`. Antingen koppla in eller ta bort (minskar bundle + en oövervakad Anthropic-spend-endpoint).
- **Prisfärskhet/täckning.** `pricesLastVerified = 2026-05-15` (2+ veckor gammalt, filen säger "verifiera månadsvis"). Vägar utlovar modeller katalogen saknar: `/o3-pris`, `/gpt-5-pris` (inga sådana modeller i `modelPricing.ts`), `/ai-bild-pris` (ingen bild-prissättning).

### Medel
- **FX-hooken dubbel-hämtar.** `useExchangeRate` körs per komponent (Calculator, TokenCounter, ModelComparisonTable, SubscriptionTable, SimpleEstimator) utan delad cache → ~5 fetchar per startsidesrender. Ingen retry.
- **Exchange-rate fallback maskerar fel** — returnerar `{rate: 10.5}` med HTTP 200 vid fel → UI visar "Kurs hämtad" som om live.
- **"Jämför med ett annat scenario"** gör bara `window.open(location.href)` — ingen riktig jämförelse.
- **In-memory rate limit + klient-cookie** = ingen reell kostnadsspärr (se Säkerhet).
- **Död kod:** `submitLead` i `src/lib/supabase.ts` importeras inte; `siteConfig.leadCaptureEnabled` läses aldrig.

### Det som fungerar bra
- **`calculateCost.ts`-matten är korrekt** *(verifierat manuellt: tokens = ord × språkfaktor, kostnad = tokens/1e6 × pris; dag/månad/år/per-anrop konsekventa; SEK = × kurs).*
- **URL-delning fungerar** (läser/skriver `model/input/output/req/users/days` som query-params, kopiera-länk).
- Bra edge-case-hantering i `estimate-cost.ts` (klampning, allowlist, markdown-strip, JSON-fallback).
- Svensk tokenfaktor (1,3) är en genuin differentiator.

### Väg till 8/10
1. **Laga C1/C2 (högst ROI):** gör `providerId` valfri i `send-guide.ts` (spara prisbevaknings-lead utan guide-mejl, eller skicka generiskt välkomstmejl); ta bort de falska success-tillstånden. Verifiera att ett lead faktiskt landar i Supabase end-to-end.
2. **Laga H1/H2:** driv chattens systemprompt från `modelPricing.ts` (en sanningskälla) + injicera live-FX; standardisera Anthropic-modell-ID över `chat/estimate-cost/analyze-prompt`.
3. **Lös död kod:** montera `ChatSection` på en sida eller ta bort den + `analyze-prompt.ts`.
4. **Uppdatera priser**, höj `pricesLastVerified`, lägg till utlovade modeller (o3, GPT-5, bild) eller ta bort de påståendena.
5. **En delad FX-provider/cache**; visa fallback-tillståndet ärligt.
6. **Hårdgör kostnadsspärr** (KV-backad daglig Anthropic-budget, inte per-instans Map).
7. Ta bort död kod och den falska jämförelseknappen — eller implementera riktig jämförelse.

---

## Prioriterad åtgärdsplan (tvärs alla kategorier)

Ordnad efter hävstång/insats. De första sex lyfter genomsnittet mest.

### Vecka 1 — Stoppa blödningen (kritiskt)
1. **Lead-flödet** (Funktion C1/C2): gör `providerId` valfri + ta bort falsk success. *Återställer hela lead-genereringen.*
2. **Fail-closed cron-auth** (Säkerhet C2) + **stäng `daily-digest`** (C1). *Stoppar budget-/mejlmissbruk.*
3. **Synka prerendern mot alla 45 vägar + SPA-fallback** (SEO C1/C2). *Gör 18 köp-sidor synliga för Google.*

### Vecka 2 — Stäng allvarliga hål
4. **Sanera LLM/RSS-HTML (DOMPurify) + CSP** (Säkerhet H2/M1).
5. **Strypa `send-guide` + delad rate limit** (Säkerhet H1/H4).
6. **A11y-grund:** ScrollToTop, skip-länk, global focus-visible (Design Kritiskt/Högt).

### Vecka 3 — Höj kvalitet till 8
7. **En sanningskälla för titel/beskrivning + canonical-fix + sitemap från `modifiedDate`** (SEO H1/H2/H3).
8. **Avdubbla startsidan + design-tokens + `<Button>`-komponent** (Design Högt).
9. **Driv chatt-prompt från `modelPricing.ts` + standardisera modell-ID + uppdatera priser** (Funktion H1/H2/H4).
10. **Nyhetssidor indexerbara** (SEO C3), **mörkt läge + kontrast** (Design), **KV-kostnadstak** (Säkerhet/Funktion).

### Förväntat utfall efter planen
| Kategori | Idag | Efter v.1–2 | Efter v.3 |
|----------|:----:|:-----------:|:---------:|
| Design | 6 | 7 | **8** |
| SEO | 6 | 7,5 | **8,5** |
| Säkerhet | 4 | 7 | **8** |
| Funktioner | 5 | 7 | **8** |
| **Snitt** | **5,25** | **7,1** | **8,1** |

---

*Rapporten är framtagen genom statisk kodgranskning. Punkter markerade "verifierat manuellt" är dubbelkollade direkt i koden; övriga bör verifieras i en deploy-miljö (särskilt 404-beteende för icke-prerenderade vägar och faktiskt lead-flöde till Supabase).*
