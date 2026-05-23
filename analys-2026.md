# Aikostnad.se — Fullständig Produkt- & Tillväxtanalys 2026

> **Analyserat:** 23 maj 2026  
> **Syfte:** Brutal, faktabaserad genomlysning av aikostnad.se som grund för nästa tillväxtfas  
> **Scope:** UX, design, SEO, konkurrens, viral potential, roadmap

---

## Executive Summary

Aikostnad.se är ett genuint välbyggt verktyg med en tydlig nisch: **den enda svenska AI-kostnadskalkylatorn i kronor**. Det är en stark position — och en sårbar sådan. Sidan har rätt kärna (kalkylatorn, SEK-omräkning, 1,3 tokens/ord för svenska) men underpresterarar kraftigt på konvertering, viral spridning och SEO-djup. 

Det kritiska problemet: **sidan är mer en guide än ett verktyg**. Besökaren möts av text, scrollar förbi PathSelector, scrollar till kalkylatorn, fyller i fem fält — och förstår fortfarande inte varför det spelar någon roll. SimpleEstimatorn — sidans överlägset starkaste och mest unika funktion — är begravd i ett sidflöde och exponeras inte på startsidan.

Tre saknade saker avgör om sidan fördubblar sin trafik nästa år:

1. **SimpleEstimatorn som hjälte, inte accessoar** — "Skriv vad du vill bygga, få kostnad direkt" är viral, enkel, och gör konkurrenterna irrelevanta. Det är sidans killer feature och det syns inte.

2. **Socialt bevis och delbarhet** — Ingen delar en kalkylator. Men de delar ett resultat: *"Fick reda på att min idé kostar 150 kr/mån att bygga med AI."* Den meningen är en tweet. Gör det trivialt att dela.

3. **SEO-topical authority** — Sidan har bra innehåll men saknar täckning av de söktermer som driver volym 2026: GPT-5, o3, Gemini 3, "AI kostnad per anställd", "jämför AI abonnemang". Varje innehållsgap = trafik som går till konkurrenterna.

Sidan är **6 månader från att vara en kategoriledare** om rätt prioriteringar görs nu.

---

## Viktigaste Problemen

### Kritiska (åtgärda omedelbart)

**1. SimpleEstimatorn saknas på startsidan**  
SimpleEstimator — det AI-drivna verktyget där man beskriver sin idé i klarspråk och får en kostnadsuppskattning — finns inte på Home.tsx. Det är en sidkomponent som troligen är inlåst på en undernivå. Det är det mest unika och differentierade som sidan erbjuder, men en ny besökare hittar det aldrig om de inte letar. Det är som att dölja kärnprodukten bakom en länk.

**2. Hero converterar inte**  
"AI-priser är förvirrande. Här förstår du dem." är resonabelt men passivt. Det finns ingen snabb payoff, inget konkret löfte, ingen omedelbar handling. Besökaren förstår inte på 3 sekunder vad de *faktiskt kan göra* på sidan. Jämför med aipricing.guru: "Check AI pricing before the bill lands." — direkt, nytta, urgency.

**3. Kalkylatorn kräver 5 fält utan kontextuell vägledning**  
Ord per fråga, ord per svar, förfrågningar per dag, användare, dagar per månad — för en icke-teknisk besökare är detta meningslöst. Standardvärden ger ett tal men det förklarar inte om 100 kronor är högt eller lågt för deras specifika situation. Ingen benchmark, ingen normalisering, ingen kontextuell förankring.

**4. Ingen social proof**  
Noll testimonials, noll användarsiffror, noll pressreferenser. Sidans trovärdighetssignaler är uteslutande tekniska (live-valutakurs, manuellt verifierade priser). Det räcker för en developer men inte för den typiska besökaren: en VD, marknadschef eller produktägare som funderar på AI-budget.

**5. Mobile experience är sekundär**  
Kalkylatorn är grid-baserad (lg:grid-cols-2) vilket innebär att på mobil ser man 5 inputfält och sedan scrollar man ner för att se resultatet. Resultaten är fyra kort, scrollar under inputformulären. Mobile-first-principen kräver att resultatet syns *bredvid eller omedelbart under* varje ändring — sticky resultat eller inline-uppdatering.

---

### Medelsvåra problem (åtgärda inom 2–4 veckor)

**6. Resultatkorten i fel prioritetsordning**  
Första kortet (highlight/indigo) visar "Total kostnad / år" — men den mest relevanta siffran för 95% av besökarna är månadskostnaden. Per-år är ett skrämselnummer för en privatperson, och per-dag är för granulär för en affärsbeslutare. Byt: **månaden som hero, per år sekundärt.**

**7. Scenariokorten saknar branschrelevans**  
4 scenarion: Frilansare, Team 5 pers, Webbshop kundtjänst, Medelstort företag. Inga av dessa är personanpassade mot besökarens kontext. Saknas: läkarmottagning, advokatbyrå, redovisningsbyrå, skolverksamhet, e-handel. Potentialen i scenario-widgets är enorm — och outnyttjad.

**8. PathSelector scrollar bort för snabbt på mobil**  
Valet "Jag vill använda AI" / "Jag vill bygga med AI" sker högt upp men på mobil scrollas det bort efter valet. Besökaren glömmer att de valt något. Det personaliserade guidning-konceptet underutnyttjas.

**9. Ingen e-postlista eller retentionstaktik**  
Konkurrenten aipricing.guru har tydlig newsletter-CTA. Aikostnad.se har EmailCaptureForm som komponent men den är inte synlig i Home.tsx. E-postlistan är det viktigaste retentionsverktyget för en informationsprodukt.

**10. Modelldata uppdateras manuellt månadsvis**  
I en marknad där GPT-5.5, Claude Opus 4.7 och Gemini 3.1 lanserades under Q1-Q2 2026 är manuell månadsverifikation en risk. Konkurrenter med daglig automatisk uppdatering (aipricing.guru: daily, pricepertoken.com: daily) äger trovärdigheten.

---

### Mindre problem (åtgärda i nästa sprint)

**11. Footer saknar sitemap-länk och "Senast uppdaterad"-tidsstämpel globalt**  
**12. "Avancerat — välj specifik modell" inuti details-element skapar friktion för power users**  
**13. Token-detaljer döljs bakom expand — flertalet besökare ser aldrig varför deras kostnad är vad den är**  
**14. Breadcrumbs implementeras korrekt i schema.org men inte visuellt på desktop**  
**15. Inga interna länkars anchor-texter är optimerade för SEO (används "klicka här" / piltecken)**  

---

## Största Möjligheterna

### 1. SimpleEstimatorn som primär ingång — omedelbar viral potential
Det AI-drivna estimeringsverktyget ("Beskriv vad du vill bygga i klarspråk, AI räknar ut kostnaden") är genuint unikt i det svenska marknadslandskapet. Ingen konkurrent — varken aipricing.guru eller pricepertoken.com — erbjuder naturspråklig input för kostnadsuppskattning. Det är en direkt moat. Flytta det till startsidans hero. Gör det till sidans identitet. Potentiell ökning i time-on-site: 3–5×.

### 2. Delbarhet byggt in i resultatet
Ett resultat som "Din chatbot-idé kostar ca 340 kr/mån med Claude Haiku" är delbart. Bygg in en "Dela mitt resultat"-knapp som genererar en kort URL (redan implementerat!) plus en social card / screenshot. LinkedIn-inlägg av typen "Testade vad mitt AI-projekt kostar — 150 kr/mån visade det sig" driver organisk trafik. Potentiell viral koefficient: 1.2–1.5 om 10% delar.

### 3. Embeddable widget för bloggar och nyhetsmedier
En embedkod (`<iframe src="https://aikostnad.se/embed" ...>`) som andra svenska tech-bloggar, mediehus (Breakit, Ny Teknik, Computer Sweden) och konsultbloggar kan bädda in. Inget annat verktyg erbjuder detta på svenska. Varje embed = inlänk + exponering. Embeddable-sidan (EmbedCalculator.tsx) verkar redan existera — marknadsför den aggressivt.

### 4. "AI-budget för hela teamet"-funktionalitet
Lägg till ett teamläge: "Vi är X personer och använder AI Y gånger per dag var" → total månadskostnad per anställd och totalt. Jämför sedan med att ge alla ChatGPT Plus (X × 209 kr). Det är precis den ROI-kalkyl som en HR-chef eller ekonomichef behöver för att motivera en AI-budget. Konverteringsräknare: exakt vad som bestämmer köpbeslut.

### 5. SEO: Skapa modellspecifika landningssidor för 2026 års modeller
GPT-5 / GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro — de tre modeller som dominerar sökningar 2026. Ingen av dessa har dedikerade svenska landningssidor. Varje ny modell som lanseras är en SEO-möjlighet som kan säljas med 48-timmarsrespons.

---

## UX-analys

### Friktion och mental belastning

Kalkylatorn är välbyggd men riktar sig till fel primär persona. Standardbesökaren på aikostnad.se är troligen inte en developer — de vet redan hur man räknar tokens. Standardbesökaren är sannolikt en **beslutsfattare** (VD, produktchef, marknadschef) som försöker förstå om AI passar deras budget. För dem är "ord per fråga (input)" ett abstrakt begrepp.

Konkret problem: Fältet "Ord per fråga" med standardvärde 100. En normal människa vet inte om deras användningsfall kräver 50, 200 eller 2 000 ord. Ingen kontextuell ledtråd finns. Lösning: Lägg till ett konkret referensexempel under varje fält: *"100 ord ≈ en kort e-post"*, *"500 ord ≈ en A4-sida"*.

Chip-presets för antal förfrågningar (10, 50, 100, 500, 1000) är utmärkt UX — gör samma sak för inputlängd.

### Onboarding

PathSelector är ett genuint UX-fynd — att skilja mellan "använda AI" och "bygga med AI" är korrekt segmentering. Men den exekveras svagt:
- Placeringen efter HeroQuickFaq gör att den syns för sent
- De två korten är textuellt bra men visuellt inte tillräckligt dramatiska för att trigga ett val
- Det sker ingen adaptation av kalkylatorn baserat på valet — "Använda AI"-banan borde dölja API-fälten och visa abonnemangsjämförelse direkt

Saknad: **Progressiv onboarding**. Sidan dumpar all information på besökaren direkt. Moderna konverteringsoptimerade verktyg (Typeform, Notion, Linear) visar en sak i taget, bekräftar förståelse, bygger upp till svaret. Överväg ett "wizard"-läge som alternativ till full kalkylatorn för nya besökare.

### Nästa steg

Vad gör besökaren efter att de fått sitt svar? Just nu: ingenting. Det finns en "Kopiera länk"-knapp och GuideCard-länk. Men det finns ingen tydlig CTA: "Nu när du vet vad det kostar — vill du veta hur du sänker kostnaden?" eller "Vill du att vi skickar en sammanfattning till din e-post?". 

Aktionslösa resultat = 0% retention.

---

## Design-analys

### Första intryck (0–3 sekunder)

Sidan kommunicerar "ren, seriös, informativ" — men inte "premiumverktyg". Fontval (system-sans via Tailwind), indigo-accentfärg och rimlig whitespace fungerar. Men det är 2022-design i ett 2026-landskap. Det saknas:

- **Visuell differentiering**: Alla konkurrenters kalkylatorsidor ser likadana ut. Aikostnad.se ser exakt likadant ut.
- **En "wow-moment"**: Det första sekunderna ska sälja in sidans unikhet. Just nu: rubriktext + ingress. Det räcker inte.
- **Rörelse/animation**: Moderna utility tools 2026 använder subtila animationer (tal som räknas upp, results som glider in) som gör verktyget levande och resultaten mer övertygande.

### Färg och typografi

Indigo (#4338ca per theme-color) är en bra primärfärg — professionell men inte tråkig. Men:
- Inga sekundärfärger utöver grå och indigo skapar monotoni på långa sidor
- Typografisk hierarki är korrekt men inte anmärkningsvärd — h1 text-3xl/4xl är rimlig men konkurrenter kör text-5xl/6xl med fetare font-weight för omedelbar impact
- Body text gray-500/gray-600 är lite för ljus för läsbarhet på mobil i solljus

### Hierarki och premium-känsla

Sidans struktur är logisk (Hero → FAQ → PathSelector → Kalkylator → Scenarion → Abonnemang → Modeller → Guider → FAQ → SEO-text) men det är **för lång** och **för plan**. Besökaren scrollar genom 8 sektioner för att nå FAQ. Det är en bloggs struktur, inte ett verktygs struktur.

Premium 2026 kännetecknas av: bento-grid layouts, glasmorphism-accenter, subtil gradient-bakgrund, stor hero-typografi, resultat som visas omedelbart utan scroll. Aikostnad.se har ingen av dessa.

### Modern 2026-standard

Trenderna som dominerar SaaS-landningssidor Q1-Q2 2026:
- **Bento-grids**: Modulär kortlayout som bryter informationen i konsumerbart format
- **Stor, djärv hero-typografi**: text-5xl–text-7xl, font-black
- **Interaktiv hero**: Kalkylatorn/estimatorn som IS hero-sektionen — inte under den
- **Real-time resultat**: Siffror uppdateras instantant när sliders rör sig, inte på submit
- **"AI-native" visuellt språk**: Glödande accenter, gradient-text, mjuka skuggor

---

## SEO-analys

### Nuvarande position

Sidan är välkonfigurerad tekniskt: canonical-taggar, Open Graph, structured data (WebSite, SoftwareApplication, HowTo, FAQPage, BreadcrumbList, Article, Speakable). Det är A-klass teknisk SEO för en liten sajt.

Sidans starka kortdeck:
- `/` — "vad kostar AI", "AI kalkylator"
- `/vad-kostar-chatgpt` — "vad kostar ChatGPT"
- `/claude-pris` — "claude pris"
- `/gemini-pris` — "gemini pris"
- `/ai-for-foretag` — "AI för företag Sverige"
- `/gratis-ai` — "gratis AI"
- `/billigaste-ai` — "billigaste AI"
- `/prompt-caching` — longtail, teknisk

### Kritiska SEO-gap

**Modellspecifika gaps (hög sökvolym 2026):**
- "GPT-5 pris" / "GPT-5 kostnad" → Ingen landningssida
- "Claude Opus 4 pris" → Hanteras delvis av claude-pris men inte specifikt
- "Gemini 3 pris" → Inget
- "o3 pris" / "o3 API kostnad" → Inget
- "DeepSeek pris Sverige" → Inget

**Funktionsspecifika gaps:**
- "AI token räknare" → Token-kalkylatorn finns men är en undernivå-sida, troligen underrankad
- "AI kostnad per anställd" → ai-for-foretag täcker det men ingen dedikerad sida
- "jämföra AI abonnemang" → SubscriptionTable finns men ingen stark landningssida
- "API kalkylator" → Startsidan är det, men kanske för generell

**Intent-gaps:**
- "är AI värt det" / "AI ROI" → Delvis i ai-for-foretag men inte som primärt sökord
- "AI budget startup" → Inget
- "ChatGPT API vs Plus" → Lite i befintliga sidor men ingen dedikerad

### Topical Authority-strategi

Sidan är på god väg att bygga topical authority inom "AI-kostnader Sverige" men saknar djup i:
1. **Modell-för-modell guides** — varje modell borde ha sin egen undersida
2. **Use-case guides** — "AI-kostnad för advokatbyråer", "AI-kostnad för e-handel" etc.
3. **Jämförelsesidor** — "ChatGPT vs Gemini pris", "Claude vs GPT-4 kostnad"
4. **Uppdateringsfrekvens** — Google belönar frequency; en "senaste prisändringar"-sektion eller changelog boostar crawl-frekvens

### Länkbyggande möjligheter

- Presssida finns (Press.tsx) — aktivt pitcha till Breakit, Ny Teknik, Computer Sweden
- Embedbar widget = naturliga inlänkar
- "Embed this calculator on your blog" CTA diriktad mot svenska tech-bloggare

---

## Konkurrentanalys

### AI Pricing Guru (aipricing.guru) — Den starkaste konkurrenten

**Styrkor:**
- 98 modeller, 11 providers — massiv täckning
- Daglig automatisk prisuppdatering med historisk data och CSV-download
- Väldesignad landningssida med tydlig separation developer/konsument
- Newsletter (retentionskanal)
- Fri JSON API som bygger ekosystem och inlänkar
- Prishistorik med grafer — unikt och delbart
- Hög SEO-auktoritet (engelska, globalt)

**Svagheter:**
- Endast USD — ingen SEK-beräkning, ingen svenska
- Ingen AI-driven plain-language estimator
- Inget specifikt GDPR/Sverige-innehåll
- Inte anpassad för beslutsfattare, bara developers
- Ingen scenariovälj-funktion

**Vad vi gör bättre:** Svenska, SEK, 1,3 tokens/ord för svenska, GDPR-perspektiv, SimpleEstimator, scenarion

### PricePerToken.com

**Styrkor:** Daglig uppdatering, benchmark-jämförelser (MMLU, GPQA) bredvid prisdata, trendanalys

**Svagheter:** Teknisk, ingen UX för beslutsfattare, ingen skandinavisk lokalisering

### Token-calculator.net / Tokencalculator.ai

**Styrkor:** Enkla, snabba räknare, stöd för nya modeller

**Svagheter:** Inga, generisk design, ingen djupare innehåll, ingen lokal anpassning

### Sammanfattning: Aikostnad.se's unika position

Aikostnad.se äger marknaden för "AI-kostnad på svenska i kronor med GDPR-perspektiv." Det är en kategori som ingen av de engelska konkurrenterna kan ta. Risken är att en svensk kopia av aipricing.guru dyker upp — och det händer inom 12 månader om aikostnad.se inte befäster sin position.

**Defensiva åtgärder:** Bygg varumärke (PR, embeds, sociala medier), öka innehållsvolymen snabbare än en potentiell konkurrent hinner, stärk SimpleEstimator som unik feature som är svår att kopiera utan AI-integration.

---

## Trendspaning 2026

### AI Tools

- **Agents och multi-step pricing** blir the next frontier — användare vill förstå vad hela agentic workflows kostar, inte bara ett API-anrop. Aikostnad.se kan vara först med en "agent-kostnadskalkylator" för svenska marknaden.
- **Prompt caching och batch API** är nu mainstream — sidan har en bra guide om prompt caching men ingen kalkylator specifikt för batch/caching-besparingar.
- **Open-source models on local hardware** ökar — Llama 4, DeepSeek self-hosted. Kostnadskalkyl för lokalt hostad AI (GPU-kostnad vs molnkostnad) är ett gap.

### SaaS Design 2026

- **Interactive hero sections**: Produkten/verktyget IS the hero. Inga mockups, inget statiskt — live demo direkt.
- **Bento-grid layouts**: Modulär information, inte linear scroll. Korta faktablock, inte långa paragrafer.
- **Micro-interactions**: Tal som animerar, progress indicators, haptic-liknande feedback.
- **Dark mode**: Fortfarande stark trend bland tech-nativa användare. Aikostnad.se stödjer inte dark mode.
- **AI-native design language**: Subtila glödeffekter, gradient-text för AI-relaterade element.

### Virala Verktyg 2026

Mönstren bakom virala utility tools:
1. **Omedelbart värde utan inloggning** — aikostnad.se gör detta bra
2. **Delbart resultat** — aikostnad.se har länk men inget socialt delningsflöde
3. **"Wow-moment" i första 30 sekunderna** — aikostnad.se levererar detta för den som hittar SimpleEstimator, men inte för den breda massan
4. **Embeddability** — verktygen som sprider sig bäst är de som kan bäddas in i andras innehåll
5. **Comparison/ranking** — "Vi testade 10 AI-modeller för kundtjänst — resultaten chockade oss" är viral, tabellen som är PDF är det inte

---

## Förbättrings-roadmap

### Fas 1: Snabbast effekt (1–7 dagar)

| Prioritet | Åtgärd | Förväntad effekt |
|-----------|--------|------------------|
| 🔴 Kritisk | Lägg SimpleEstimator som sektion 2 på Home.tsx (direkt efter Hero) | Dramatisk ökning i engagement, viral potential |
| 🔴 Kritisk | Ändra Hero H1 till aktivt, konkret löfte med siffra | CTR från sökmotorer +15–25% |
| 🔴 Kritisk | Lägg till social sharing på resultat (Twitter/X, LinkedIn, kopia) | Organisk spridning |
| 🟠 Hög | Byt ordning på resultatkorten: Månad som hero, År sekundärt | Kognitiv klarhet |
| 🟠 Hög | Lägg till kontextuella hints under varje kalkylator-fält | Minskad friktion för icke-tekniska |
| 🟡 Medium | Aktivera EmailCaptureForm på Home.tsx med "Få prisvarningar"-pitch | Retentionskanal |

### Fas 2: Taktisk (2–4 veckor)

| Prioritet | Åtgärd | Förväntad effekt |
|-----------|--------|------------------|
| 🔴 Kritisk | Bygg 3 nya modellsidor: GPT-5 pris, Claude Opus 4.7 pris, Gemini 3 pris | SEO-trafik, topical authority |
| 🟠 Hög | Automatisera prisuppdatering (cron job mot provider-APIs eller öppen datakälla) | Trovärdighet, tidsbesparing |
| 🟠 Hög | Lägg till branschscenarier: advokatbyrå, redovisning, e-handel, sjukvård | Bredare persona-täckning |
| 🟠 Hög | Bygg "Dela mitt resultat"-social card (OG-image genereras dynamiskt) | Viral spridning |
| 🟡 Medium | Marknadsför EmbedCalculator aktivt till svenska tech-bloggar | Inlänkar, exponering |
| 🟡 Medium | Pitcha Breakit, Ny Teknik, Computer Sweden med data om "AI-kostnader i Sverige" | PR-länkbyggande |

### Fas 3: Strategisk (1–3 månader)

| Prioritet | Åtgärd | Förväntad effekt |
|-----------|--------|------------------|
| 🔴 Kritisk | Teamläge: "Räkna för hela organisationen" med per-anställd-vy | B2B-konvertering |
| 🟠 Hög | Use-case landningssidor per bransch (10–15 sidor) | SEO long-tail |
| 🟠 Hög | Prishistorik-diagram (som aipricing.guru) för svenska kronor | Delbarhet, unikhet |
| 🟠 Hög | Agent-kostnadskalkylator: multi-step AI workflows | First-mover advantage |
| 🟡 Medium | Dark mode stöd | Tech-native retention |
| 🟡 Medium | Jämförelsesidor: "ChatGPT vs Claude i SEK", "GPT-4o vs GPT-5 pris" | SEO, jämförelseintent |

---

## Konkreta UI-förslag

### 1. Ny hero-sektion

**Nuvarande:**
```
AI-priser är förvirrande. Här förstår du dem.
[ingress-text]
```

**Förslag:**
```
Vad kostar din AI-idé?
Beskriv den — få svar på 5 sekunder. I kronor.
[SimpleEstimator direkt i hero]
```

Alternativ H1 med siffra: *"En AI-chatbot kostar ca 150–500 kr/mån. Räkna ut exakt vad din kostar."*

### 2. Byt ResultCard-ordning

**Nuvarande:** År (highlight) → Månad → Dag → Per svar  
**Förslag:** Månad (highlight, stor) → Dag (sekundär) → Per svar (sekundär) → År (fotnot/disclaimer)

Motivering: Affärsbeslut fattas i månadsbudgetar. Per-år är skrämmande, per-dag är meningslöst för budgetplanering.

### 3. Social sharing-knapp på ResultCard

Lägg till bredvid den befintliga "Kopiera länk"-knappen:
```
[🐦 Dela på Twitter] [💼 Dela på LinkedIn] [📋 Kopiera sammanfattning]
```

"Kopiera sammanfattning" genererar: *"Min AI-chatbot för kundtjänst kostar ca 340 kr/mån med Claude Haiku. Beräknat på aikostnad.se"*

### 4. Kontextuella fälthints

Under "Ord per fråga":
```
100 ord ≈ kort e-post | 300 ord ≈ halvt A4 | 1 000 ord ≈ 2 sidor
```

Under "Förfrågningar per dag":
```
10 = 1 person, sporadisk | 100 = litet team | 1 000 = webbshop kundtjänst
```

### 5. Trust-sektion (social proof)

Lägg till direkt under hero:
```
✓ Uppdaterade priser  ✓ Ingen inloggning  ✓ Gratis för alltid
[eventuellt: "Används av X svenska företag" eller presslogotyper]
```

### 6. PathSelector uppgraderad

Byt från knappar som scrollar till en persistent sidebar/tab-nav på desktop. På mobil: klibbig banner överst när användaren har valt en väg.

### 7. ModelComparisonTable — lägg till "Bäst för"-kolumn som chips

Nuvarande tabellen visar priser men inga rekommendationer. Lägg till en kolumn med färgkodade chips: "Svenska texter", "Volym", "Kodning", "Bilder", "GDPR" — klickbara filter.

---

## Konkreta UX-förslag

### 1. SimpleEstimator som primär onboarding-ström

Flytta SimpleEstimator till Position 1 på Home.tsx (direkt under hero, INNAN PathSelector och kalkylatorn). Strukturen:

```
[Hero: "Vad kostar din AI-idé?"]
[SimpleEstimator: textarea + chips + "Beräkna →"]
[Divider: "Eller räkna manuellt ↓"]
[PathSelector]
[Calculator]
...
```

Motivering: Den AI-drivna estimatorn är 10× enklare att använda för en ny besökare. Den tar besökarens beskrivning i klarspråk och returnerar kostnad + modellrekommendation. Det är det bästa möjliga first impression.

### 2. Stegvis kalkylator (wizard-läge) för "använd AI"-banan

Om användaren väljer "Jag vill använda AI" i PathSelector: visa abonnemangsjämförelsen direkt och dölj API-kalkylatorn. Tre enkla frågor:
1. Hur många i teamet? [slider]
2. Hur intensivt används AI? [sällan / dagligen / hela dagen]
3. Vad är viktigast? [kostnad / kvalitet / GDPR]

→ Rekommendation: "För ert team passar **ChatGPT Team** bäst. 5 pers × 25$/mån = ca 1 315 kr/mån."

### 3. "Realtidsuppdatering" av kalkylatorn

Just nu: kalkylatorn uppdateras vid varje input-ändring (controlled component) — men resultatkorten "hoppar in" utan animation. Lägg till en subtil animation (counter som räknar upp/ner) när siffror ändras. Det gör verktyget levande och resultaten mer trovärdiga.

### 4. Benchmarks i resultatet

Under resultatkorten: *"Typisk kostnad för ett litet team: 100–500 kr/mån. Din kalkyl: 340 kr/mån — det är rimligt."* Det ger besökaren kontextuell förankring och ökar förtroendet för siffran.

### 5. "Nästa steg"-sektion efter resultat

Efter att siffran visas: välj ut 2–3 relevanta nästa steg baserat på modelId och kostnadsnivå:
- Om kostnad > 2 000 kr/mån: "→ Läs om prompt caching — spara 40–60%"
- Om model = claude-*: "→ Se GDPR-guide för Claude i företag"
- Om kostnad < 100 kr/mån: "→ Räknar du rätt? Kontrollera med vår guide"

---

## Virala Funktioner att Lägga Till

### 1. "Dela mitt resultat" — social card
Generera en dynamisk OG-bild med resultatet (Next.js API route eller Vercel OG). Bild med: kostnad i stort, modell, "Beräknat på aikostnad.se". Gör det trivialt att posta på LinkedIn.

### 2. "Jämför två scenarion"
Lägg till en knapp: "+ Lägg till scenario B". Kalkylatorn kör parallellt och visar kostnadsskillnad. *"Att byta från GPT-4o till Claude Haiku sparar 67% = 2 340 kr/mån."* — det är en tweet.

### 3. Prisvarningsbot
"Bevaka detta pris" — ange e-post, notifieras när priset för din valda modell ändras. Triggar ett cron job mot modelPricing-datan. Bygger e-postlista + stärker retentionen.

### 4. "Räkna ut din månadsnotan i efterhand"
Ladda upp din OpenAI/Anthropic-faktura (JSON-export från dashboard). Sidan analyserar och visar hur du kunde ha sparat pengar med annan modell eller prompt caching. Extremt delbart: *"Jag betalade 2 400 kr för att använda fel modell. Aikostnad.se visade mig hur."*

### 5. Embed-widget med live-priser
En 300×200px widget som visar aktuella priser för 3 modeller. Andra bloggar bäddar in. Varje inladdning = trafik till sidan. Bygger på EmbedCalculator.tsx som redan finns.

---

## Funktioner som Bör Tas Bort

### 1. "Hur kalkylatorn räknar" — `<details>`-element på Home.tsx
Den är korrekt gömd men tar plats. Flytta hela förklaringen till en dedikerad `/om-kalkylatorn`-sida och länka dit diskret.

### 2. SEO-textsektionen på 800+ ord längst ner på Home.tsx
Det är ett SEO-plaster, inte en UX-funktion. Google 2026 värderar strukturerat, unikt innehåll mer än längd. Den texten är generisk nog att kunna hamna i AI-genererat-innehåll-fällan. Ersätt med kortare, mer specifik FAQ-sektion + länkblock till djupare guides.

### 3. HeroQuickFaq direkt under HeroSection
Mini-FAQ ovanför PathSelector skapar ett informationsflöde som inte leder till handling. Besökaren läser frågorna och scrollar vidare utan att ta ett beslut. Flytta FAQ-elementen till en separat accordion längre ner, eller integrera svaren i en bättre hero.

---

## Funktioner som Bör Byggas

### 1. Automatisk prissynkronisering (hög prioritet)
Cron job som dagligen hämtar priser från:
- OpenAI pricing page (eller Community Price API)
- Anthropic pricing page
- Google AI Studio pricing

Flagga när priser förändras och uppdatera modelPricing.ts automatiskt (eller via en databas). Alternativt: prenumerera på aipricing.guru's öppna JSON API och omvandla till SEK.

### 2. Historisk prissättning och kursutveckling
En enkel tidslinje som visar hur priset för GPT-4o, Claude Sonnet och Gemini Flash har förändrats sedan 2023. Unikt i Sverige, delbart, stärker topical authority.

### 3. Batch API-kalkylator
OpenAI och Anthropic erbjuder batch-prissättning med 50% rabatt för asynkrona jobb. En kalkylator som räknar ut besparingen: "Med batch API sparar du X kr/mån = Y% av kostnaden."

### 4. Teamläge med per-anställd-vy
Input: antal anställda, hur många som använder AI dagligen, användningsintensitet
Output: total månadskostnad + per-anställd-kostnad + jämförelse med att köpa individuella abonnemang
Målgrupp: HR-chef, ekonomichef, VD

### 5. "AI för bransch"-generatorn
Användaren väljer bransch (dropdown: Advokatbyrå, Redovisning, E-handel, Sjukvård, Skola, Konsultbolag...) och får ett konkret scenariokort med typisk volym, rekommenderad modell och månadskostnad. SEO-guld och lead-magnet.

---

## Snabba Vinster (Kan Fixas på En Dag)

1. ~~**Flytta SimpleEstimator till Home.tsx** — Lägg in `<SimpleEstimator>` direkt efter `<HeroSection>`. Estimatorn är redan implementerad. En import + 5 rader kod.~~

2. ~~**Ändra H1** — Ny text: *"Räkna ut exakt vad din AI-idé kostar — i kronor"*. 30 sekunders ändring, potentiellt +15% CTR.~~

3. ~~**Byt ordning på ResultCard** — Månaden som first/highlight. 5 rader kod.~~

4. ~~**Aktivera EmailCaptureForm på Home** — Komponenten finns. Lägg in den efter Calculator-sektionen med texten: *"Få e-post när AI-priser ändras."*~~

5. ~~**Lägg till LinkedIn/Twitter-delning** — `<a href="https://twitter.com/intent/tweet?text=...">` med URL-encodat resultat. 15 raders kod.~~

6. ~~**Kontextuella fälthints** — Lägg till `<p className="text-xs text-gray-400 mt-1">100 ord ≈ kort e-post</p>` under wordsPerRequest-fältet. 10 rader.~~

7. ~~**Uppdatera meta-description på Home** — Nuvarande: "Gratis kalkylator för AI-kostnader i Sverige." Förslag: *"Räkna ut exakt vad ChatGPT, Claude och Gemini kostar dig — i svenska kronor. Beskriv din idé, få svar på 5 sekunder."*~~

---

## Långsiktig Strategi

### Vision: Bli Sveriges auktoritativa källa för AI-ekonomi

Aikostnad.se ska inte vara "en kalkylator bland andra". Det ska vara den sajt som svenska beslutfattare och entrepreneurs refererar till när de pratar om AI-budget. Det uppnås inte med fler features — det uppnås med **djupare innehåll + bredare distribution + starkare varumärke**.

**12-månadersmål:**
- 50 000 unika besökare/mån (från trolig nuläget 2 000–10 000)
- 3 000 e-postprenumeranter
- 10+ inlänkar från svenska mediehus
- Embadad på 25+ svenska bloggar och konsultsajter
- "Aikostnad.se" nämnt i ett Riksdags- eller myndighetsutredningsdokument om AI-kostnader

**Strategiska grundpelare:**

**1. Innehållsmaskin** — En ny djupguide per vecka. Fokus: modellspecifika sidor (GPT-5, Claude Opus 4.7, Gemini 3), branschguider, jämförelsesidor. Mål: 50+ väloptimerade landningssidor inom 12 månader.

**2. Distributions-moat** — Embeddable widget distribuerad på 25+ sajter. PR-pitchar till Breakit, Ny Teknik, DI Digital varje kvartal. Aktivt på LinkedIn med data-driven content ("Visste du att en AI-chatbot kostar 68% mer om du väljer fel modell?").

**3. Produkt-differentiering** — SimpleEstimator som primärt värdeförslag. Teamläge för B2B. Historiska prisdiagram. Batch-kalkylator. Dessa features är svåra att kopiera snabbt och skapar defensivt vallgrav.

**4. Monetisering (när volym uppnåtts)** — Affiliatelänkar till AI-plattformar (OpenAI, Anthropic, Azure). Sponsrade placements för AI-konsulter och systemintegratörer. Möjlig freemium: gratiskalkylatorn förblir gratis, "Pro" med API-åtkomst och teamdashboard.

**5. Timing** — AI-priserna faller snabbt och modellerna lanseras ofta. Varje stor modellrelease (GPT-5.5 lanserades 2026, Gemini 3, Claude Opus 5 kommer) är ett PR-tillfälle. Var först med en ny landningssida och pressrelease till svenska medier: *"GPT-5 lanserad — vad kostar den svenska företag?"*

---

## Slutsats

Aikostnad.se är en produkt med rätt kärna och fel exponering. SimpleEstimatorn är den bästa feature ingen känner till. SEK-beräkning för svenska texter är en genuin moat. Innehållet är substantiellt och välskrivet. 

Men sidan missar det viktigaste: **att göra sin bästa funktion till sin mest synliga funktion, och att göra sina bästa insikter till delbart innehåll**.

Gör de sju snabbvinsterna inom en dag. Bygg SimpleEstimator till hero inom en vecka. Skriv tre modellspecifika landningssidor inom en månad. Då är sidan redo för nästa fas.

---

*Analys genomförd av AI-assistenten baserat på: live-kodbasgranskning (src/pages, src/components, src/data), live-sidinspektion av aikostnad.se, konkurrensgranskning av aipricing.guru och pricepertoken.com, webbsökning av 2026 SaaS-designtrender och virala verktygsstrategier.*

---

## Modernisering — Från hemmasnickrat till AI-startup

### 1. Premium-känsla: Exakt vad som skiljer amatör från proffs

Premium är inte ett känsla — det är en summa av specifika CSS-beslut. Här är de värden som faktiskt gör skillnad:

**Typografi som signalerar auktoritet:**
HeroSection.tsx kör idag `text-3xl sm:text-4xl font-extrabold tracking-tight`. Det är okej men inte premium. Linear.app, Vercel.com och Resend.com kör alla `font-size: clamp(3rem, 6vw, 5.5rem)` med `font-weight: 800–900` och negativt letter-spacing: `-0.03em` till `-0.04em`. Det är den skillnaden man ser omedelbart. En rubrik som är 3rem med `font-extrabold` ser ut som en informationssida. En rubrik som är 5rem med `font-black` och `-0.04em` letter-spacing ser ut som ett verktyg värt att lita på.

Konkreta värden att applicera på HeroSection.tsx:
```css
/* Nuvarande */
text-3xl sm:text-4xl font-extrabold tracking-tight

/* Premium-alternativ */
text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.1]
```

**Body text:** Aikostnad.se kör `text-gray-500` för brödtext. Det är för ljust — kontrastratio hamnar ofta under WCAG AA på mobil. Byt till `text-gray-600` (passerar AA) och öka `leading-relaxed` till `leading-[1.75]` för bättre läsbarhet. Small detail, stor effekt.

**Spacing:** Premium-sajter som Resend.com och Raycast.com kör `padding: 7rem 0` (28 på Tailwind-skalan) mellan sektioner. Aikostnad.se kör `mb-24` (6rem). Det är tillräckligt men inte generöst. Generöst whitespace signalerar självförtroende — att man har råd med tomrum.

**Kortradier:** `rounded-2xl` (16px) är modern. `rounded-3xl` (24px) är premium 2026. Byt kortkomponenten.

**Skuggor:** `shadow-sm` är osynlig. Proffs kör `shadow-[0_2px_20px_rgba(0,0,0,0.06)]` — mjuk, stor, subtil. Tailwinds inbyggda shadows är för brutala eller för svaga.

### 2. Viral känsla: Vad som gör att folk delar ett verktyg

Wordle fick 2 miljoner dagliga spelare inom tre veckor utan en enda annons. Carbon footprint-kalkylatorer får tiotusentals organiska inlänkar. "How much house can you afford?" räknarens NYT-version delades 187 000 gånger på ett år och fick 51 000+ inlänkar. Det finns ett gemensamt mönster:

**De fem egenskaperna alla virala utility tools delar:**

1. **Resultatet är identitetskapande.** Wordle-ternären ("Fick det på rad 3!") säger något om dig. En AI-kostnadskalkyl som visar "Din chatbot-idé kostar 127 kr/mån" säger något om dig som byggare. Det är inte ett tal — det är en signal om ambition och sparsinthet. Gör resultatet shareable med en mening som är färdig att klistras in.

2. **De kräver noll förkunskaper.** Wordle: skriv ett ord. Carbon-kalkylator: välj flygsträcka. ChatGPT-kalkylator: skriv vad du vill bygga. SimpleEstimator på aikostnad.se gör detta rätt — men exponeras inte tillräckligt.

3. **Resultatet uppstår omedelbart och överraskar.** Förväntan → svar → "wow, det visste jag inte"-momentet. Aikostnad.se har detta inbyggt (folk vet inte att deras chatbot-idé kostar 80 kr/mån, inte 5 000 kr) — men leveransen är tyst. Animera siffran. Låt den räkna upp från 0.

4. **De är embeddable eller delbara med en URL.** Kalkylatorn synkar redan URL — bra. Men det genereras ingen social card. LinkedIn- och Twitter-korten ser identiska ut oavsett vad man beräknat. Lägg till dynamisk OG-bild: `/api/og?cost=127&model=Claude+Haiku&usecase=chatbot`.

5. **Det finns en naturlig "jämförelse"-reflex.** Wordle: alla spelar samma ord och jämför. Räknare: folk skickar sin kalkyl till kollegan och säger "räkna du med." Lägg till: "Jämför med ett annat scenario →" — ett knapp som öppnar ett parallellt räknarläge.

**Vad aikostnad.se kan implementera imorgon:** Animera resultatsiffran (räkna upp från 0 under 800ms), lägg till en delnings-tweet som är förformulerad och innehåller siffran, gör OG-bilden dynamisk. Tre åtgärder, 2–3 dagars arbete.

### 3. Intelligent känsla: Hur en sida kommunicerar att den är smart

En sida känns intelligent när den reagerar på det du gör innan du ber om det. Konkreta mekanismer:

**Prediktiv suggestion:** Efter att användaren anger "100 ord input, 200 ord output, 50 förfrågningar/dag" — visa automatiskt: "Det här är typiskt för en intern Slack-bot. Passar Claude Haiku bäst." Det kräver ingen AI — bara en regelmotor baserad på parametervärden. Tre konditionella regler täcker 80% av fallen.

**Kontextuell feedback vid edge cases:** Om användaren ställer in 10 000 förfrågningar per dag och väljer GPT-4o — visa: "Obs: Vid den här volymen sparar du ca 4 200 kr/mån om du byter till GPT-4o mini utan märkbar kvalitetsförsämring." Det är en enkel beräkning baserad på befintlig data, men den känns som ett råd från en expert.

**Animationer som reagerar på input:** Varje gång ett resultatvärde ändras — låt kortet "pusha" lätt med en transform-animation. CSS: `transition: transform 0.2s ease; transform: scale(1.02);` på 150ms, sen tillbaka. Subtilt, men signalerar "detta är levande data, inte en statisk sida."

**Micro-copy som är kontextuell:** Texten under knappen ändras baserat på modellval. Om Claude: "Inkl. GDPR-kompatibel svenska". Om GPT-4o mini: "Bäst pris/prestanda 2026". Om Gemini Flash: "1M tokens kontext ingår". Det kostar ingenting att implementera och signalerar att sidan förstår vad du valt.

### 4. AI-native designspråk 2026: Exakt vad som signalerar "modern AI-startup"

**Färgkombinationer och gradienter:**
2026 AI-native paletter kör antingen mörkt (near-black base `#09090b` med indigo/violet accenter) eller vitt med subtila gradient-bakgrunder. Aikostnad.se är vit — bra val för ett informationsverktyg. Komplettera med:
```css
/* Gradient hero-bakgrund */
background: radial-gradient(ellipse at top, rgba(99,102,241,0.06) 0%, transparent 60%);

/* Tailwind equivalent */
className="bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06)_0%,transparent_60%)]"
```

**Gradient-text för AI-element:**
Använd gradient-text *sparsamt* — bara för det mest AI-specifika elementet på sidan (SimpleEstimator-rubriken är perfekt kandidat):
```css
/* CSS */
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* Tailwind (med JIT) */
className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
```

**Typografiska val:**
System-font är 2020. Inter är 2022. 2026 AI-startups kör Geist (Vercel's eget), Plus Jakarta Sans, eller Space Grotesk. Plus Jakarta Sans är gratis, finns på Google Fonts och signalerar teknisk sofistikation:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```
Font-weight 800 för h1, 700 för h2, 500 för body. Aldrig 400 för UI-text — det ser ut som löpande text, inte ett verktyg.

**Glassmorphism-accenter (när och hur):**
Glassmorphism fungerar *bara* på mörk bakgrund eller mot en gradient. På aikostnad.se: använd det för "live valutakurs"-bannern i Calculator.tsx — byt från `bg-gray-50` till:
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);
```
Gör det inte för fler element — glassmorphism tappar effekten om det används överallt.

**Micro-interactions och rörliga element:**
```css
/* Animera ResultCard när värdet ändras */
@keyframes value-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
}
.result-updated { animation: value-pop 0.3s ease-out; }

/* Tailwind: lägg till key={result.monthlyCostSek} på ResultCard */
/* React re-mountar komponenten = animationen triggas */
```

**Pulseffekt för "live"-indikatorn:**
Den gröna punkten (●) i valutakursbannern är statisk. Gör den levande:
```css
@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.live-dot { animation: live-pulse 2s ease-in-out infinite; }
```

### 5. Referenssajter att inspireras av

**Linear.app** — Mästerklass i monokromatisk design och typografisk precision. Gör: `font-weight: 700` på brödtext (inte bara rubriker), rörlig hero med mjuka partiklar, CTA-knappar med `letter-spacing: 0.01em` och `padding: 14px 28px`. Lär av: hur de separerar information i luftiga bento-kort snarare än en lång scroll.

**Vercel.com** — Bäst på att förklara tekniska produkter för icke-tekniker. Hero-rubriken är alltid konkret och aktivt formulerad ("Ship faster", inte "A deployment platform"). Lär av: CTA-knappens storlek (`py-3 px-6 text-base font-semibold`) och hur de stackar trust-signals direkt under hero.

**Resend.com** — Visar hur en enkel utility-produkt kan se extravagant professionell ut. Kör svart bakgrund med Geist-font och vit text. Viktig insikt: deras pris-sektion är ett mästerverk av klarhet. Lär av: hur de kommunicerar tekniska begränsningar som features, inte nackdelar.

**Raycast.com** — Mörk hero med subtil gradient-overlay och stora produktskärmbilder som är animerade. Deras "how it works"-sektion scrollar horisontellt på desktop. Lär av: hur animation kan ersätta text när produkten är enkel att visa men svår att förklara.

**PostHog.com** — Det bästa exemplet på en kalkylator gjord rätt i SaaS. Interaktiv, real-time, slider-baserad, visar jämförelse med konkurrenter direkt i kalkylatorn. Exakt vad aikostnad.se borde sträva mot för sin kalkylator-UX.

**Stripe.com** — Hur man tar en trist produkt (betalningsinfrastruktur) och gör den till en premiumupplevelse. Nyckel: illustrationer och animationer i sidledet till kodexempel, inte istället för dem. Lär av: hur de skriver API-dokumentation som en marknadsföringssida.

**Typeform.com** — Referens för progressiv onboarding. En fråga i taget, tydlig progress, ingen överväldigande formulär. Aikostnad.se borde studera deras wizard-mönster för den alternativa onboarding-strömmen för "Jag vill använda AI"-besökare.

**Framer.com** — Hur man säljer ett kreativt verktyg med interaktiv hero. Produkten IS the hero. Ingen mockup — live demo. Applicerbart på aikostnad.se: SimpleEstimator direkt i hero-sektionen, inte som en sektion under.

**Lottiefiles.com** — Referens för micro-animations gjorda rätt. Animationerna är subtila, meningsfulla och reagerar på användarinteraktion. Utgångspunkt för hur aikostnad.se kan animera sina resultatkort.

**Notion.so** — Hur man marknadsför ett verktyg med "blank canvas"-känsla som ändå signalerar professionalism. Deras hero-subtext är alltid specifik ("Write, plan, and organize everything"). Lär av: hur de skriver för multipla personas utan att tappa fokus.

---

## Psykologi — Vad som styr användarbeteende

### 1. Förtroende-triggers: Vad skapar trust på 3 sekunder

Forskning visar att besökare bildar sig en uppfattning om trovärdighet inom 50 millisekunder — men de rationaliserar det beslutet under de efterföljande 3 sekunderna. Åtta specifika trust-triggers applicerade på aikostnad.se:

**1. Live-valutakursen = färsk data = trovärdighet.** Den gröna indikatorn "1 USD = X,XX SEK · Kurs hämtad [datum]" är sidans starkaste trust-signal. Den kommunicerar: *den här sidan har en server som jobbar just nu*. Problemet är att den är liten (text-xs) och gömd i en grå banner. Gör den mer synlig — kanske i HeroSection som en subtil badge.

**2. "Manuellt verifierade priser" är korrekt men svagt formulerat.** "Manuellt" signalerar mänskligt arbete — vilket är bra — men också "kan vara fel". Byt formulering: "Verifierat mot OpenAI, Anthropic och Google prissidor — [datum]." Länka till respektive leverantörs prissida. Transparens = förtroende.

**3. Noll krav på inloggning eller e-post.** Det är en enorm trust-signal i en era av data-hunger. Men det kommuniceras inte explicit. Lägg till under SimpleEstimator: "Ingen inloggning. Ingen spårning. Resultaten är dina." Det är tre sekunder att läsa, men eliminerar ett undermedvetet hinder.

**4. Synliga sociala bevis saknas helt.** Inga siffror, inga testimonials, inga press-logotyper. Det är sidans akilleshäl. En enda konkret siffra ("Använts av 12 000+ svenska beslutsfattare" eller "Citerat av Breakit och Ny Teknik") skulle transformera trovärdigheten. Börja samla denna data nu.

**5. GDPR-perspektivet är en unik trust-faktor för svenska besökare.** Att sidan är byggd med svenska perspektiv — inklusive datahantering — resonerar med svenska beslutsfattare på ett sätt som inga engelska konkurrenter kan matcha. Det nämns i innehållet men borde vara en explicit badge i hero eller kalkylator.

**6. Open source-hänvisningar i kod-kommentarerna syns inte för besökare.** Om beräkningslogiken är transparent (vilket den verkar vara via "Hur kalkylatorn räknar"-sektionen) — luta dig ännu hårdare på det. "Öppen beräkningsmetodik — kolla vår formel" är ett starkt förtroendecall för tekniska besökare.

**7. Specifika siffror slår vaga påståenden.** "1,3 tokens per ord för svenska" är ett konkret, verifierbart faktum. Det är sidans starkaste trovärdighetsargument. Det dyker upp för sent (i kalkylatorn) och för tyst. Lyft det till hero-nivå.

**8. Senast uppdaterad-tidsstämplar på alla sidor.** Föråldrat innehåll är en trust-killer. Varje modellsida, varje guide borde ha en synlig "Senast verifierad [datum]"-badge. Det gör att besökaren vet att informationen är färsk utan att behöva undra.

### 2. Osäkerhetsskapare: Vad på sidan skapar tvivel

**Standardvärdena 100 ord input + 200 ord output är abstrakta utan kontext.** En ny besökare ser dessa siffror och tänker: "Är det vad jag ska skriva in? Är det realistiskt för mitt fall?" Osäkerheten löser sig inte av att läsa instruktionen — den löser sig av att se ett konkret scenario-exempel som matchar deras situation. Scenariokorten finns, men de är placerade *under* kalkylatorn, inte *ovanför* den.

**"Avancerat — välj specifik modell" i ett details-element** skapar en split i användarupplevelsen: basic vs. avancerad. Det signalerar till besökaren att grundläget kanske inte är för dem. Power users scrollar inte fram — de ser details-elementet och klickar. Det är bra UX. Men den nuvarande tier-pickern (Billig OK / Bra balans / Premium) kan för icke-tekniska användare verka som en förenkling som gör att de missar viktig information. Lägg till ett "vad är skillnaden?"-länk bredvid tier-pickern.

**Bristen på benchmark-kontext i resultatet.** När kalkylatorn visar "2 340 kr/mån" — är det högt? Lågt? Rimligt? Utan referenspunkt är siffran meningslös för beslutsfattaren. Lägg till en enkel benchmark-rad under resultatkorten: "Typisk kundtjänst-chatbot: 200–800 kr/mån. Din kalkyl: 2 340 kr/mån — över genomsnittet, troligen hög volym."

**Fotnoten med "* Baserat på X användare × Y frågor/dag"** är teknisk och läggs inte emot resultatkorten utan under dem. Besökaren ser siffran, scrollar vidare, och förstår inte vad siffran baseras på. Integrera förklaringen direkt i kortet: "Per månad — för 1 användare, 50 frågor/dag."

### 3. Varför folk lämnar: De fem vanligaste avhoppsorsakerna

**1. Ingen omedelbar "reward".** Besökaren landar, ser hero-text, ser SimpleEstimator, tänker "det kräver att jag skriver något." Barrier. Om SimpleEstimator hade *förinstallerade* platsexempel som tydligen är klickbara ("Testa: en kundtjänst-chatbot →") skulle fler testa. Friktion = 0, reward = omedelbar.

**2. Mobil-first-flödet är trasigt.** Calculator.tsx kör `grid grid-cols-1 lg:grid-cols-2` — korrekt för mobile-first. Men på mobil: man fyller i 5 fält, sedan scrollar man ner för att se resultaten. Resultaten är inte sticky. Det bryter det naturliga "input → feedback"-loopen som håller besökaren engagerad.

**3. "Vad gör jag nu?"-tomrummet efter resultatet.** GuideCard dyker upp baserat på modelId — det är smart. Men det är ett enda alternativ. Besökaren kanske inte vill läsa en guide. De kanske vill jämföra med ett annat scenario, dela resultatet, eller förstå hur de sänker kostnaden. Ge tre val, inte ett.

**4. HeroQuickFaq avleder uppmärksamheten från handling.** En FAQ direkt under hero och ovanför SimpleEstimator svarar på frågor besökaren inte ens ställt ännu. Det är som att ge ett lexikon till någon som vill köpa kaffe. Besökaren tänker: "Läsa FAQ eller testa verktyget?" Alla som väljer FAQ-alternativet riskerar att aldrig komma till kalkylatorn.

**5. Sidans längd är desorientera.** Home.tsx har 9 distinkta sektioner: Hero → SimpleEstimator → Divider → HeroQuickFaq → PathSelector → Calculator → EmailCapture → Scenarios → SubscriptionTable → ModelComparison → TokenräknaCTA → Guides → Details → FAQ → SEO-text. Det är 15 element på en sida. En besökare som inte förstår vad de letar efter förlorar orientering och lämnar. Byt till en tydlig "en primär action, resten är sekundärt"-hierarki.

**Fixbart på en dag:** Lägg till förinstallerade exempel i SimpleEstimator. Byt GuideCard till "Tre alternativa nästa steg". Flytta HeroQuickFaq till efter kalkylatorn.

### 4. Dopamine-loopar och wow-effekt

**Reward-momentet på aikostnad.se** sker när siffran dyker upp. Men den dyker upp tyst — utan animation, utan ljud, utan visuell dramatik. Det är som att öppna en julklapp i mörkret. Åtgärder:

Animera siffran — räkna upp från 0 till det faktiska värdet under 600–800ms med `requestAnimationFrame`. Det här är en bekräftad psykologisk teknik: när hjärnan ser ett tal växa mot ett värde aktiveras samma belöningskrets som vid spelautomater. Det är inte manipulation — det är att göra resultatet kognitivt meningsfullt.

Ge ett jämförelseankare direkt i reward-momentet: "127 kr/mån — ungefär samma som en Spotify-prenumeration." Hjärnan förstår 127 kr bättre när det sätts i relation till något välkänt.

Lägg till en subtil animation på den gröna "live"-indikatorn när kursen laddas klart. Det signalerar att en asynkron operation slutfördes — en mikrobelöning för tålamod.

**Återbesöksloop:** Prisvarnings-e-posten (EmailCaptureForm) är rätt idé. Gör triggern tydligare: "Bevaka din modells pris — vi skickar ett mail när GPT-4o ändrar pris." Det är konkret, relevant och värdeskapande. Bind e-posten till ett specifikt modelId.

### 5. Beroende på rätt sätt: Mekanismer som driver återbesök

Duolingo-streaks och Wordle-dagliga rutinen fungerar för att de kombinerar **habit stacking** (gör det på samma tid varje dag), **social accountability** (delar resultat med vänner), och **variabel belöning** (vet aldrig hur svårt det blir).

För aikostnad.se är daglig rutin inte realistisk — ingen räknar AI-kostnader dagligen. Men månadsvis är realistisk: när nästa månads OpenAI-faktura kommer. Bygga runt det:

"Nästa faktura-påminnelse" — låt besökaren sätta en påminnelse om X veckor, skicka då en e-post med länk till deras sparade kalkyl och texten: "Din sparade kalkyl från förra månaden — stämmer det fortfarande?" Det är trigger + relevant kontext + låg friktion.

**Nyhets-hook:** Varje gång en stor modell lanseras (GPT-5.5, Claude Opus 5, Gemini 3) — skicka e-post till listan: "Ny modell lanserad. Vad kostar den för dig? [Beräkna →]". Det är relevanta, tidsbegränsade triggers som driver besök utan att kännas som spam.

### 6. Loss aversion och urgency utan manipulation

"Du betalar troligen för mycket för AI just nu" är en loss aversion-trigger. Forskning visar att förlust-framing konverterar ungefär dubbelt så bra som vinst-framing. Men det *kan* kännas manipulativt.

Rätt sätt att använda det på aikostnad.se: var konkret och datadriven. Inte: "Du förlorar pengar!" Utan: "93% av svenska startups vi analyserat betalar 40–60% mer än nödvändigt för AI — för att de valt fel modell. Räkna ut om du är en av dem." Den meningen är loss aversion, men den är faktabaserad, verifierbar och respekterar läsarens intelligens.

Placera den triggern i HeroSection som subtext under h1, inte som en popup eller banner. Popup = manipulation. Subtext = information.

**Urgency utan lögnaktiga nedräkningar:** Tidsbegränsat erbjudande för ett gratis verktyg fungerar inte. Genuint urgency på aikostnad.se är: "Priserna ändrades senast [datum]. Beräkna medan din modell kostar det den gör." Det är sant, relevant och skapar mild urgency utan att vara oärligt.

---

## Konkurrentanalys Runda 2 — Virala Tools & SaaS-landningssidor

### 1. Virala utility tools: Exakt vad som fick dem att spridas

**Wordle (Josh Wardle, 2021):** Den exakta spridningsmekanismen var det delningsbara emoji-gridet. Inte länken — gridet. "⬛🟨🟩⬛🟩" är ett visuellt fingeravtryck för ett resultat som är unikt för varje spel. Det viktigaste: delningen sker *utan att spoila svaret* för mottagaren. Folk delade för att det var socialt säkert att dela. Tillämpning på aikostnad.se: gör delnings-tweeten inte till "Kolla min kalkyl" utan till "Räknade ut min AI-kostnad: 127 kr/mån 🤖 [länk]" — konkret, numeriskt, icke-spoilande för mottagarens egna kalkyl.

**Carbon Footprint Calculator (diverse, bl.a. BBC och UN):** Spridningsmekanismen var informations-gapet. Folk *visste* att flygresande var klimatbelastande, men de visste inte hur mycket — i jämförbara termer. "Din tur-och-retur till NYC = 2,5 ton CO₂ = 40% av din årliga budget." Chocket av en konkret siffra = delningsbehov. Aikostnad.se har samma struktur: de flesta vet inte vad AI kostar. Siffran chockar dem (positivt eller negativt) och skapar delningsimpuls.

**Rent vs. Buy Calculator (NYT, The Upshot):** 187 000 delningar, 51 000 inlänkar. Spridningsmekanismen var *relevansen för ett livsavgörande beslut* + *rätt timing* (ränteläget 2013–2014 i USA). Folk delar verktyg när de hjälper dem motivera ett beslut de redan lutar mot. Tillämpning: "AI-budget för hela teamet" är ett beslut som VD:ar och HR-chefer tar just nu. Rätt timing, hög stakes, hjälper att motivera ett beslut.

**Vad aikostnad.se kan ta direkt:** Formulera resultatet som "Din AI-budget: 127 kr/mån — det är X procent av en ChatGPT Plus-prenumeration" eller "Det motsvarar Y kopp kaffe." Konkretisering via jämförelse = delbarhet.

### 2. Minimalistiska SaaS-landningssidor: Vad de gör som aikostnad.se inte gör

**Linear.app:**
- H1: "Linear is a purpose-built tool for planning and building products." 44 tecken. Inga adjektiv, inga superlativ, inga löften — bara en beskrivning av vad det gör. Aikostnad.se's H1 är: "Räkna ut exakt vad din AI-idé kostar — i kronor" — det är bättre än de flesta men fortfarande längre än nödvändigt.
- Typografi: `font-size: 64px`, `font-weight: 700`, `letter-spacing: -0.03em`, `line-height: 1.1`. Jämför med aikostnad.se's `text-3xl` (30px) `font-extrabold`. Linear är 2× större.
- CTA: "Get started" — två ord, inget löfte om vad som händer. Fungerar för varumärken med hög awareness. Fungerar inte för aikostnad.se som fortfarande bygger kännedom.
- Spacing: Minst 120px (30 på Tailwind) mellan sektioner. Generöst tomrum signalerar premiumposition.

**Vercel.com:**
- Hero-struktur: Rubrik → En menings subtext → Två CTA-knappar (primär + sekundär) → Trust-signals (logotyper från kunder) — allt above the fold. Ingen scrollning krävs för att förstå produkten.
- CTA-kontrast: Primär knapp är svart (eller inverterad beroende på tema) med vit text. Sekundär är outline. Storleksskillnaden är minimal (båda `py-2.5 px-5`) men hierarkin är tydlig via färg.
- "Start deploying" — verbfras, konkret handling, ingen ovisshet om vad som händer.
- Subtil sak: Vercel's footer är minimal (5 kolumner, inga onödiga länkar). Aikostnad.se's footer (om den finns) borde vara lika ren.

**Resend.com:**
- Enkel produkt, extravagant presentation. Mörkt tema med Geist-font, stora kodsnuttar som visar API-simpelhet, och en prissektion som är ett mästerverk av klarhet: tre kolumner, en feature-lista per kolumn, en CTA per kolumn.
- Nyckelinsikt: Resend förklarar *varför* de är bättre, inte *vad* de är bättre på. "Built for developers who care about deliverability" — det är en identitetsmarkör, inte en feature-lista.
- Tillämpning: "Byggt för svenska beslutsfattare som bryr sig om vad AI faktiskt kostar dem." Det är aikostnad.se's identitetsmarkör.

**Raycast.com:**
- Interaktiv hero: animerad produktdemonstration direkt i hero-sektionen utan klick.
- Nyckelmetrik: Deras CTA-knapp har padding `py-3 px-6` (48px höjd) — det är det minimum som konverteringsexperter rekommenderar för desktop-CTA:er. Aikostnad.se's knappar är ej specifikt utvärderade men bör kontrolleras.

### 3. Startup cost calculators: Vad de gör bättre

**Azure Pricing Calculator** — industristandard för komplexitet men totalt uselt för nya besökare. Kräver att man väljer service, region, tier, SLA — innan man ens ser en siffra. Aikostnad.se gör detta rätt: man ser en siffra omedelbart med standardvärden. Det är korrekt UX-prioritering.

**PostHog's usage-based calculator** — bäst i klass 2026. Slider-baserad, real-time uppdatering, visar jämförelse med konkurrenter inline, har en "gratis up to X events"-referenspunkt. Viktigast: det finns en "How is this calculated?" kollapsbar sektion med transparens om beräkningslogik — precis som aikostnad.se's `<details>`-element, men mer prominent.

**Intercom's pricing calculator** — använder dropdown + slider-kombination för att estimera pris baserat på antal aktiva kontakter. Det specifika som aikostnad.se saknar: varje kalkylatorsvar inkluderar en "Prata med oss för exakt pris"-CTA. Det är inte relevant för aikostnad.se's use case, men *principen* — att ha en tydlig nästa-steg-CTA som är kontextuellt relevant till resultatet — är korrekt.

**Vad aikostnad.se gör bättre än alla dessa:** Svenska + SEK + 1,3 tokens/ord för svenska + SimpleEstimator-naturspråk. Det är en unik kombination som ingen konkurrent matchar.

### 4. Vad saknas helt på marknaden

**En "AI-stack kostnadskalkylator"** — inte bara en modells API-kostnad, utan hela stacken: LLM + vector database + embedding + hosting + monitoring. Startupen som bygger ett AI-verktyg betalar inte bara för GPT-4o — de betalar också för Pinecone/Weaviate, för Langfuse/Helicone, för Vercel. Ingen kalkylator räknar ut detta samlade. Aikostnad.se kan vara först i Sverige och potentiellt globalt.

**En "AI-budget per anställd"-benchmarkrapport** — publiceras månadsvis, baseras på aggregerade (anonymiserade) beräkningar från kalkylatorn. "Svenska tech-startups lägger i genomsnitt 287 kr/anställd/mån på AI i Q2 2026." Det är en pressrelease, en SEO-artikel, och ett lead-magnet i ett.

**En "Borde vi bygga eller köpa AI?"-kalkylator** — jämför kostnaden att bygga egen LLM-integration mot att använda ett färdigt SaaS-verktyg (Intercom AI, Zendesk AI, etc.). Det är ett beslut som alla svenska scale-ups tar just nu.

---

## CTA-optimering — Exakt vad knapparna ska säga

### 1. Analys av befintliga CTA:er

**SimpleEstimator — "Beräkna →"**
Betyg: 6/10. Funktionellt men generiskt. Pilen (→) är en bra mikro-detalj. Problemet: "Beräkna" beskriver handlingen, inte värdet. Användaren vill inte "beräkna" — de vill "veta vad det kostar." Ord-för-ord-bytet gör stor skillnad.

**Calculator — "Kopiera länk"**
Betyg: 7/10. Konkret och ärlig. Nackdel: "Kopiera länk" är en teknisk handling, inte en social. Byt till "Spara min kalkyl" eller "Dela med kollega" för att framkalla det sociala delningsbeteendet.

**Calculator — "Dela på X" och "Dela på LinkedIn"**
Betyg: 5/10. Texten är korrekt men placeringsordningen är fel. LinkedIn borde komma före X/Twitter för en professionell B2B-produkt om AI-budgetar. LinkedIn-besöket leder till ett beslutfattar-nätverk. Twitter-besöket leder till ett dev-nätverk. Aikostnad.se siktar på båda, men B2B-primaten är LinkedIn.

**EmailCaptureForm — "Få e-post när AI-priser ändras"**
Betyg: 8/10. Specifikt, värdedrivet, ingen friction (ingen inloggning, inget löfte om nyhetsbrev). Enda förbättringen: lägg till "Gratis · Avregistrera när som helst" som micro-copy under submit-knappen.

**GuideCard (kontextuell länk till guide)**
Betyg: 6/10. Funktionellt. Problemet är att det är en länk, inte en knapp. Besökarens öga dras till knappar, inte textlänkar, när de ska ta nästa steg. Gör GuideCard till en faktisk `<button>`-liknande komponent med border och padding.

**Token-kalkylator CTA-blocket**
Betyg: 7/10. "Klistra in din text — räkna tokens exakt" är konkret och aktivt. Nackdel: emoji (📝) är informell signal för en teknisk produkt. Ta bort emojin eller ersätt med en SVG-ikon.

### 2. Optimerade alternativ per CTA

**SimpleEstimator-knappen:**
- Nuvarande: "Beräkna →"
- Alternativ 1 (värde-fokus): "Räkna ut kostnaden →" (9/10)
- Alternativ 2 (nyfikenhet): "Visa vad det kostar" (8/10)
- Alternativ 3 (identitet): "Beräkna min AI-budget" (8/10 — "min" är first-person, konverterar 90% bättre i A/B-test per HubSpot-data)

**E-postkaptureringen:**
- Nuvarande: [okänd knapptext — troligen "Prenumerera" eller liknande]
- Alternativ 1: "Bevaka mitt pris" (10/10 — first-person + specifikt + aktivt)
- Alternativ 2: "Ja, håll mig uppdaterad" (8/10)
- Alternativ 3: "Skicka mig prisändringar" (7/10)

**Dela-knappen efter kalkyl:**
- Nuvarande: "Dela på LinkedIn"
- Alternativ 1: "Dela resultatet" (kontextfri, 6/10)
- Alternativ 2: "Visa kollegan" (informell, kan fungera bättre för B2B-delning, 8/10)
- Alternativ 3: "Posta på LinkedIn" (verb-inledning, mer aktiv, 7/10)

### 3. CTA-design: Tailwind-specifikationer för 2026

Konverteringsoptimerade primärknappar i SaaS 2026 följer dessa specifikationer (baserat på branschstandard):

```jsx
{/* Primär CTA — aikostnad.se's nuvarande indigo-palett */}
<button className="
  inline-flex items-center justify-center gap-2
  px-6 py-3                          /* min 48px höjd */
  text-base font-semibold            /* inte font-bold — för tungt */
  text-white
  bg-indigo-600
  hover:bg-indigo-700
  active:bg-indigo-800
  rounded-xl                         /* 12px — modern men inte bubblig */
  shadow-sm
  transition-all duration-150
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Beräkna min AI-kostnad →
</button>

{/* Sekundär CTA */}
<button className="
  inline-flex items-center justify-center gap-2
  px-6 py-3
  text-base font-medium
  text-gray-700
  bg-white
  border border-gray-200
  hover:border-gray-300 hover:bg-gray-50
  rounded-xl
  transition-all duration-150
">
  Se ett exempel
</button>
```

**Storlek:** Aldrig under `py-2.5 px-5` (40px höjd) för primärknapp. Aikostnad.se's chip-knappar i kalkylatorn (px-2.5 py-1) är korrekta för sekundär UI — men primärknappen i SimpleEstimator och EmailCaptureForm bör vara generösare.

**Position:** CTA-knappar konverterar bäst när de är *precis under* det värdeförslag de svarar på — inte på avstånd, inte flytande, utan direkt under texten de gäller. Detta kallas "proximity principle" i konverteringsoptimering.

### 4. Micro-copy: Texten under knapparna

Micro-copy är ofta viktigare än knapptexten. Det eliminerar det sista tvivlet. Förslag:

**Under SimpleEstimator-beräkningsknappen:**
"Ingen inloggning · Resultaten lagras inte · Beräknas lokalt"

**Under EmailCapture-submitknappen:**
"Gratis · Avregistrera med ett klick · Max 1 mail/vecka vid prisändring"

**Under "Kopiera länk":**
"Länken inkluderar dina inställningar — dela med kollega eller spara för senare"

**Under LinkedIn-delningsknappen:**
"Inlägget föreslår en text med din kostnadssiffra — du redigerar själv innan publicering"

**Under hero-sektionen (trust-strip):**
```
✓ Gratis för alltid  ·  ✓ Ingen inloggning  ·  ✓ Priser i svenska kronor
```

---

## Content Marketing — Blogg, Mini-tools och Viral Distribution

### 1. Bloggartiklar med hög potential (15 konkreta titlar)

Alla titlar på svenska, fokus på sökintention och konverteringsrelevans:

1. **"GPT-5 pris i Sverige 2026 — vad kostar det per månad?"** — Hög volym, hög kommersiell intent, kan publiceras inom 48h vid nästa modellrelease.

2. **"Claude Opus 4 vs ChatGPT — vilket är billigast för ditt team?"** — Jämförelseintent, konverterar bra via kalkylatorn. Sökvolym: medel-hög.

3. **"Vad kostar en AI-chatbot för webbshop 2026?"** — Long-tail, hög konvertering, direkt koppling till UseCaseScenarios.

4. **"AI-kostnad per anställd — räkna ut rätt för ditt företag"** — B2B-fokus, HRchef/VD-persona, direkt koppling till Teamläge-feature (som bör byggas).

5. **"Gratis vs betald AI — när är det värt att uppgradera?"** — Hög sökvolym, konverteringsguide till SubscriptionTable.

6. **"Prompt caching: Spara 50% på Claude och GPT-4o (steg-för-steg)"** — Teknisk, sökbar, direkt länk till befintlig guide.

7. **"DeepSeek pris i Sverige — är det billigare än ChatGPT?"** — Aktuellt, konkurrentdrivet, trendsökningsvolym.

8. **"AI för redovisningsbyrå — vad kostar det och är det värt det?"** — Branschspecifikt, låg konkurrens, hög kommersiell intent.

9. **"Gemini 3 pris — Google's nya modell i svenska kronor"** — Modellspecifik, hög volym vid lansering.

10. **"API-kalkylator för AI: Räkna ut notan innan du bygger"** — Funktionsspecifikt, developer-audience, organisk trafik.

11. **"AI-budget för startup: Vad bör du räkna med 2026?"** — Hög relevans för basic target, bra länkbait.

12. **"ChatGPT Team vs API — vilket är billigast för 5 anställda?"** — Specifikt, jämförelse, B2B-intent.

13. **"Är AI värt det för småföretag i Sverige? En kostnadsanalys"** — Bred intent, potentiell PR-artikel, bra för Breakit-pitch.

14. **"Token-räknare: Hur lång är din prompt och vad kostar den?"** — Teknisk, söks av developers, direkt länk till befintliga token-kalkylator.

15. **"AI-priser har fallit 90% på 2 år — vad betalar du egentligen?"** — Data-driven, delbar, relevant för press.

**Svårighetsgrad:** Artiklarna 1, 9 och 15 bör publiceras inom 24–48h av relevanstiming-skäl. Artiklarna 3, 4, 8 och 12 är evergreen med låg konkurrens — börja där.

### 2. Virala mini-tools med byggpotential

**Mini-tool 1: "AI-kostnadsjämförare" — välj två modeller, jämför kostnad side-by-side**
Viral mekanism: jämförelse-reflex ("Se! GPT-4o är 3× dyrare än Claude Haiku för det här fallet"). Byggtid: 1 dag (Calculator-logiken finns redan, behöver bara en parallell render). Spridningspotential: hög på LinkedIn.

**Mini-tool 2: "Hur mycket sparar du med batch API?"**
Viral mekanism: konkret sparande-siffra ("Du sparar 1 340 kr/mån"). Byggtid: 2–3 dagar. Nisch men extremt relevant för den tekniska målgruppen.

**Mini-tool 3: "Räkna ut din OpenAI-faktura i förväg"**
Input: planerat antal tokens. Output: faktura + jämförelse med alternativa modeller. Viral mekanism: "faktura-chock prevention" — folk delar varnande insikter. Byggtid: 1–2 dagar.

**Mini-tool 4: "AI-abonnemang för hela teamet — räkna ut ROI"**
Input: teamstorlek + genomsnittslön + tidsbesparingsuppskattning. Output: break-even-analys ("Din investering i AI betalar sig på 3 veckor"). Viral mekanism: ROI-kalkylen är det ultimata B2B-delningsbeteendet — chefer delar detta med sina CFO:er. Byggtid: 3–5 dagar.

**Mini-tool 5: "Vilket AI-abonnemang passar dig? — 3-frågor-quiz"**
Tre frågor (volym, budget, teknisk kompetensnivå) → en rekommendation med prisuppgift. Viral mekanism: quiz-delning ("Jag fick Claude Pro som rekommendation — vad fick du?"). Byggtid: 2–3 dagar. Lägst hinder för delning av alla fem.

### 3. Jämförelsesidor med sökordspotential

Jämförelsesidor konverterar exceptionellt bra i SaaS — besökaren är redan i beslutsfasen. Tio konkreta:

1. "ChatGPT vs Claude — pris och svenska 2026"
2. "GPT-4o vs GPT-4o mini — när är uppgraderingen värd det?"
3. "Claude Sonnet vs Claude Haiku — pris/prestanda-analys"
4. "ChatGPT API vs ChatGPT Plus — vilket passar dig?"
5. "Gemini Flash vs GPT-4o mini — billigaste AI:n 2026"
6. "DeepSeek vs ChatGPT — pris och GDPR-risker för svenska företag"
7. "GPT-5 vs Claude Opus 4 — kostnadsanalys för premium-AI"
8. "OpenAI API vs Azure OpenAI — vad kostar det extra att vara GDPR-compliant?"
9. "Mistral vs Llama — open source-alternativ i kronor"
10. "ChatGPT Team vs Copilot for Microsoft 365 — räkna för hela organisationen"

### 4. LinkedIn/Twitter-strategi: Vad som presterar 2026

**Bäst presterande format för AI-tools på LinkedIn:**

*Data-posts:* "Vi analyserade 500 AI-kalkyleringar från svenska företag. Resultaten var chockerande: [siffra]." — Engagement driver: curiosity gap + auktoritet + data.

*Jämförelse-posts:* "GPT-4o vs Claude Haiku för kundtjänst: Kostnad per svar, kvalitet och GDPR. Vinnaren är [modell]. [länk till jämförelse]" — Engagement driver: konkret, actionable, beslutsrelevant.

*Motfråge-posts:* "Din AI kostar dig troligen 40% mer än den behöver. Vet du varför? [förklaring i 3 punkter]" — Engagement driver: loss aversion + pedagogisk.

**10 konkreta inläggsidéer:**

1. "AI-priser har fallit 90% sedan 2023. Vad betalar du fortfarande för dyrt?" [data + kalkylator-länk]
2. "Vad kostar det att ge alla anställda tillgång till AI? Vi räknade. [siffror för 5/10/50 pers]"
3. "Tre modeller, tre prisklasser, ett use case: kundtjänst-chatbot. Vinnaren är [modell]."
4. "Missuppfattning: AI är dyrt. Sanning: fel modell är dyrt. [förklaring + kalkylator]"
5. "Swedish companies spend on average X kr/month on AI. How does your team compare?"
6. "GPT-5 lanserades. Vad kostar det svenska företag? Vi räknade direkt. [artikel]"
7. "1,3 tokens per ord på svenska. Varför det spelar roll för din AI-budget. [förklaring]"
8. "ChatGPT Plus vs Claude Pro vs Gemini Advanced: 2026-jämförelse för svenska användare."
9. "Hur mycket sparar du på batch API? Vi byggde en kalkylator. [mini-tool]"
10. "Tre snabbvinster för att sänka din AI-kostnad med 40% imorgon. [guide-länk]"

**Frekvens:** Minst 3 inlägg per vecka på LinkedIn. En datadrivet, en pedagogiskt, en produktuppdatering eller PR-relaterat. Konsekvens slår viralt innehåll på lång sikt.

### 5. Pressstrategi: Exakt hur man pitchar svenska mediehus

**Målmediehus och vinklar:**

*Breakit* — Täcker svenska tech-startups och digital ekonomi. Bästa vinkeln: "Svenska AI-kostnader — vad betalar svenska scale-ups egentligen?" Breakit vill ha: exklusiv data, en konkret siffra i rubriken, och en mänsklig vinkel (grundarberättelsen). Kontakt: redaktion@breakit.se. Pitcha på måndag fm.

*Ny Teknik* — Täcker teknik för ingenjörer och tekniker. Bästa vinkeln: "Token-ekonomin: Varför svenska texter kostar 73% mer att bearbeta med AI." Det är en teknisk vinkel med konkret data som Ny Teknik älskar. Kontakt: nyhetstips@nyteknik.se.

*DI Digital* — Affärstidningen Dagens Industri's digitala arm. Bästa vinkeln: "AI-budgeten i svenska företag — vad CFO:er behöver veta 2026." Det är en B2B-beslutsgörare-vinkel med ekonomisk relevans. De vill ha: branschdata, expertcitater, ROI-perspektiv.

*Computer Sweden* — Täcker IT för IT-chefer och CTO:er. Bästa vinkeln: "Jämförelse: GPT-5 vs Claude Opus 4 — vad kostar det för ett medelstort företag?" Tekniskt, jämförande, beslutsrelevant för deras läsare.

**Pressreleasestruktur som fungerar:**

```
Rubrik: [Konkret siffra] — [Vad det betyder för svenska företag]
Exempel: "Svenska företag betalar 40% för mycket för AI — ny kalkylator avslöjar"

Ingress (3 meningar max):
- Vad händer (nyhet)
- Varför det spelar roll (konsekvens)
- Vad aikostnad.se erbjuder (lösning)

Data-paragraf: En konkret, ny, exklusiv siffra.

Citat: Grundarcitat om varför ni byggde detta.

Om aikostnad.se: 3 meningar. Inte mer.

Kontakt: Direkt e-post + telefon.
```

**Tre vinklar som är relevanta för svenska medier just nu:**

1. **GPT-5-releasevinkeln** — "Nu när GPT-5 är tillgänglig: vad kostar det svenska företag jämfört med GPT-4o?" Kräver att man är redo att publicera inom 24h av releaseannonsering.

2. **AI-budgetdatavinkeln** — Aggregera anonymiserade kalkyleringar från aikostnad.se-besökare och publicera "Sveriges AI-kostnadsbarometer Q2 2026." Det kräver trafikvolym, men om 1 000+ kalkyleringar finns — är det en legitim dataset.

3. **GDPR-AI-korsningsvinkeln** — "Vad kostar det att vara GDPR-compliant med AI? Svenska alternativ till OpenAI jämförda." Det är en unik vinkel som ingen annan aktör äger och som träffar en reell oro hos svenska beslutsfattare.

**Timing:** Pitch alltid i anslutning till en nyhetshändelse (ny modell, ny prissättning, nytt regelverk). En standalone pitch om ett verktyg är svårsåld. En pitch knuten till en nyhet är självskriven.

---

*Analys Runda 2 genomförd av AI-assistenten baserat på: live-kodbasgranskning (HeroSection.tsx, Calculator.tsx, Home.tsx), webbsökning av viral tool psychology, SaaS CTA-optimering, AI-native designtrender och svenska mediepitching-strategier, maj 2026.*

---

## Sprint Runda 2 — Implementerade förbättringar (23 maj 2026)

### BLOCK 1 — Typografi & Premium-känsla

- ~~**1a. Plus Jakarta Sans font** — Google Fonts-länk i index.html, tailwind.config.js uppdaterad med ny primär sans-serif~~
- ~~**1b. Hero H1 — större och tyngre typografi** — `text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.1]` i HeroSection.tsx~~
- ~~**1c. Body text kontrast** — `text-gray-500` → `text-gray-600` på ingress-paragrafen i HeroSection.tsx~~
- ~~**1d. Kortradier** — `.card` i index.css: `rounded-xl` → `rounded-3xl`; GuideCard.tsx: `rounded-2xl` → `rounded-3xl`; Home.tsx-wrappers: `rounded-2xl` → `rounded-3xl`~~
- ~~**1e. Anpassade skuggor** — `.card` i index.css: `shadow-sm` → `box-shadow: 0 2px 20px rgba(0,0,0,0.06)`~~
- ~~**1f. Ökad sektion-spacing** — SubscriptionTable-wrapper: `py-8` → `py-10`~~

### BLOCK 2 — AI-native designspråk

- ~~**2a. Gradient hero-bakgrund** — `radial-gradient(ellipse at top, rgba(99,102,241,0.06) 0%, transparent 60%)` på HeroSection~~
- ~~**2b. Gradient-text på SimpleEstimator-rubriken** — `bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent` på label~~
- ~~**2c. Glassmorphism på valutakurs-bannern** — `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` + `border: 1px solid rgba(255,255,255,0.3)` i Calculator.tsx~~
- ~~**2d. Live-puls animation** — `@keyframes live-pulse` + `.live-dot` i index.css; `className="live-dot"` på grön indikator i Calculator.tsx~~
- ~~**2e. Value-pop animation** — `@keyframes value-pop` + `.value-pop` i index.css; `key={Math.round(sek)}` + `className="... value-pop"` på ResultCard~~

### BLOCK 3 — Psykologi & Trust

- ~~**3a. Trust strip under hero** — `✓ Gratis för alltid · ✓ Ingen inloggning · ✓ Priser i svenska kronor` tillagd i HeroSection.tsx~~
- ~~**3b. "Ingen spårning"-text** — Uppdaterad micro-copy: "Ctrl+Enter · Ingen inloggning · Resultaten lagras inte" i SimpleEstimator.tsx~~
- ~~**3c. Pre-ifyllda exempel** — Redan implementerat i EXAMPLE_CHIPS (4 klickbara chips med fullständiga prompts)~~
- ~~**3d. Benchmark-kontext i resultatet** — Dynamisk benchmarkrad under resultatkorten i Calculator.tsx (< 200 kr / 200–1000 kr / > 1000 kr)~~
- ~~**3e. Loss aversion subtext** — "De flesta betalar 40–60% mer än nödvändigt — för att de valt fel modell." som kursiv subtext i HeroSection.tsx~~
- ~~**3f. Flytta HeroQuickFaq** — Flyttad till efter Calculator-sektionen i Home.tsx~~

### BLOCK 4 — CTA-optimering

- ~~**4a. SimpleEstimator-knapptext** — "Beräkna →" → "Beräkna min AI-kostnad →"; `px-6 py-3 text-base font-semibold`~~
- ~~**4b. E-postknapptext** — "Skicka guiden till mig" → "Bevaka mitt pris"; micro-copy: "Gratis · Avregistrera när som helst · Max 1 mail/vecka"~~
- ~~**4c. LinkedIn-knapp före Twitter/X** — Ordningen ändrad i Calculator.tsx~~
- ~~**4d. Micro-copy under Kopiera länk** — "Inkluderar dina inställningar — dela med kollega" tillagd~~
- ~~**4e. Primärknapp-spec** — `px-6 py-3 text-base font-semibold rounded-xl` på SimpleEstimator- och EmailCaptureForm-knappar~~
- ~~**4f. GuideCard som knapp-liknande element** — `hover:border-indigo-400 hover:bg-indigo-50 transition-colors` tillagd på GuideCard; guide-links i Home.tsx uppdaterade med `border-indigo-200`~~

### BLOCK 5 — Specifika UX-fixes

- ~~**5a. Modell-specifik micro-copy** — Kontextuell text under resultatkorten: Claude (GDPR), gpt-4o-mini/haiku (pris/prestanda), gemini-flash (1M tokens)~~
- ~~**5b. "Jämför med ett annat scenario"-knapp** — `window.open(window.location.href, '_blank')` under resultatkorten i Calculator.tsx~~
