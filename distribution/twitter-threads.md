# Twitter/X-trådar — aikostnad.se
*8 färdiga trådar. 5–8 tweets per tråd. Publicera direkt.*

---

## TRÅD 1
**"AI kostar inte vad du tror — en tråd om verkligheten"**

**Tweet 1 (hook):**
AI kostar inte vad du tror.

De flesta svenska företag betalar 2–4× mer än de borde.

Inte för att de är dumma.
För att prissättningen är designad för att vara svår att förstå.

En tråd om vad det faktiskt kostar 🧵

**Tweet 2:**
Problemet börjar med tokens.

AI-modeller debiterar per token — inte per ord.

Engelska: ~1,0 token/ord
Svenska: ~1,3 token/ord

Det är 30% dyrare att köra svenska texter.
Ingen berättar det för dig.

**Tweet 3:**
Sedan är det input vs output.

Input-tokens: billiga
Output-tokens: dyra (3–4× dyrare)

Om du tror att "100k tokens kostar X kr" — räknar du fel om du inte vet din input/output-split.

**Tweet 4:**
Sedan är det modellvalet.

GPT-4o: ~3 000 kr/mån för typisk B2B-volym
GPT-4o mini: ~500 kr/mån
Claude Haiku: ~300 kr/mån

Samma usecase. 10× prisskillnad.

De flesta väljer modell baserat på hype, inte usecase.

**Tweet 5:**
Och sedan är det prompt caching.

Om du skickar samma systemprompt varje gång betalar du fullt pris varje gång.

Med caching: 90% rabatt på den cachade delen.
Implementationstid: några timmar.
Besparing: ofta 40–60% av total kostnad.

**Tweet 6:**
Lägg ihop allt:
→ Fel tokensfaktor (+30%)
→ Fel input/output-split (×2–4)
→ Fel modell (×10)
→ Ingen caching (×2)

Det är inte ovanligt att betala 5–10× mer än du behöver.

**Tweet 7:**
Vi byggde aikostnad.se för att lösa det här.

→ Alla modeller jämförda i SEK
→ 1,3-faktorn inbyggd för svenska texter
→ Caching-besparing beräknad
→ Gratis, ingen registrering

Kolla vad du faktiskt borde betala: aikostnad.se

---

## TRÅD 2
**"ChatGPT vs Claude vs Gemini — prisjämförelse i svenska kronor"**

**Tweet 1 (hook):**
Alla jämförelsetester av AI-modeller är i dollar.

Jag körde dem i kronor, med svenska texter.

Resultatet är annorlunda än du tror 🧵

**Tweet 2:**
Testscenario:
- 1 miljon svenska ord/mån
- 70% input, 30% output
- Typisk B2B-användning (dokument, mejl, analys)

Alla priser i SEK, dollarkurs 10,5.

**Tweet 3:**
Premium-modeller (månadskostnad):

GPT-4o: 1 840 kr
Claude 3.5 Sonnet: 1 650 kr
Gemini 1.5 Pro: 1 470 kr

Skillnaden är inte enorm i toppen.
Men se vad som händer när vi går ner...

**Tweet 4:**
Budgetmodeller (månadskostnad):

GPT-4o mini: 310 kr
Claude 3 Haiku: 185 kr
Gemini 1.5 Flash: 145 kr

Det är 10–13× billigare.

För många usecases ger de 85–90% av premiumkvaliteten.

**Tweet 5:**
Det verkliga prisgapet:

Dyraste premium (GPT-4o): 1 840 kr
Billigaste budget (Gemini Flash): 145 kr

Det är 12,7× prisskillnad.

Frågan är inte vilken som är "bäst".
Frågan är vilken som är tillräckligt bra för din usecase.

**Tweet 6:**
Notera: detta gäller API-priser.

Prenumerationspriser (ChatGPT Plus, Claude Pro) är annorlunda och lönar sig vid viss volym och viss typ av användning.

Vi har beräknat bryttpunkten för det också på aikostnad.se

**Tweet 7:**
Kör din egna jämförelse:

→ Välj dina modeller
→ Ange din volym
→ Se exakta SEK-priser

aikostnad.se — den enda svenska AI-priskalkylatorn.

---

## TRÅD 3
**"Hur vi byggde aikostnad.se — tekniken bakom"**

**Tweet 1 (hook):**
Vi byggde aikostnad.se på 3 veckor.

Inga externa investeringar. Inget team.
En kalkylator som nu används av hundratals svenska företag.

Hur vi tänkte tekniskt 🧵

**Tweet 2:**
Problemet vi löste:
Alla AI-priskalkylatorer är på engelska, i dollar, och missar den svenska tokens-faktorn.

Vi behövde något som:
1. Räknar i SEK
2. Applicerar 1,3 tokens/ord automatiskt
3. Håller sig uppdaterat när modellpriser ändras

**Tweet 3:**
Stack:
- React + TypeScript (snabb utveckling)
- Vite (snabb build)
- Statiska prisdata med versionshantering (enkelt att uppdatera)
- Ingen databas, ingen login — allt körs i browsern

Filosofi: så lite komplexitet som möjligt.

**Tweet 4:**
Den svåraste delen: prislogiken.

Varje modell har:
- Input-pris (per 1M tokens)
- Output-pris (per 1M tokens)
- Cache-read-pris (om det stöds)
- Cache-write-pris (om det stöds)

Plus: kontextkostnad för långa dokument.

Vi modellerade allt som en enda funktion.

**Tweet 5:**
Tokensfaktorn:

Vi samlade data från egna tester + Tiktokenizer-benchmarks på svenska texter.

Snittresultat: 1,28–1,35 tokens/ord beroende på texttyp.

Vi valde 1,3 som ett konservativt snitt.
Det är inbyggt i alla beräkningar.

**Tweet 6:**
Uppdateringsprocessen:

AI-priser ändras ofta. GPT-5, nya Claude-versioner, Gemini-uppdateringar.

Vi har ett enkelt JSON-format för prisdata + ett manuellt granskningssteg.

Inget fancy — men det håller kalkylatorn korrekt.

**Tweet 7:**
Lärdomar:

→ Enkelhet vinner. Ingen databas = inget underhåll.
→ Transparens bygger förtroende. Visa din prislogik.
→ Fokusera på ett problem. Vi löser ett: vad kostar AI i SEK?

Testa resultatet: aikostnad.se

---

## TRÅD 4
**"5 sätt att halvera din AI-kostnad direkt"**

**Tweet 1 (hook):**
5 konkreta sätt att halvera din AI-faktura.

Inget kräver mer än en dag att implementera.
Alla är bevisade i produktion.

🧵

**Tweet 2:**
1/ Använd rätt modell för rätt uppgift

GPT-4o för allt är som att ta taxi överallt — bekvämt men dyrt.

Klassificering, sammanfattning, enkla svar → GPT-4o mini eller Claude Haiku
Analys, reasoning, komplexa texter → Premium-modell

Typisk besparing: 60–70%

**Tweet 3:**
2/ Implementera prompt caching

Har du en systemprompt på 1 000+ tokens?
Skickar du den med varje request?

Du betalar fullt pris varje gång.

Med caching: 10% av normalpriset.
Implementationstid: 2–4 timmar.
Besparing: ofta 40–50% av total kostnad.

**Tweet 4:**
3/ Räkna rätt på svenska text

Alla priskalkylatorer räknar i engelska tokens.
Svenska kostar 30% mer.

Om du budgeterar fel → du underskattar kostnader → du väljer fel modell → du betalar för mycket.

Använd aikostnad.se — 1,3-faktorn är inbyggd.

**Tweet 5:**
4/ Trimma dina prompts

Varje token kostar pengar.

Onödigt långa systemprompts, repetitiva instruktioner, copy-pastad kontext — allt kostar.

Granska dina 3 mest använda prompts. Halvera dem.
Du förlorar sällan kvalitet. Du sparar direkt.

**Tweet 6:**
5/ Sätt token-limits per request

Maxar en response ut på 2 000 tokens när du egentligen behöver 200?

Sätt max_tokens-parametern.
Det förhindrar oändliga svar och sänker fakturan.

Lätt att missa. Enkel fix.

**Tweet 7:**
Summering:

→ Rätt modell per uppgift: -60–70%
→ Prompt caching: -40–50%
→ Korrekt tokensfaktor: mer precis budgetering
→ Kortare prompts: -10–20%
→ Token limits: -5–15%

Kalkylera din besparing: aikostnad.se

---

## TRÅD 5
**"Varför svenska texter kostar 30% mer att processa med AI"**

**Tweet 1 (hook):**
En tråd om något ingen berättar för dig:

Svenska texter kostar 30% mer att köra med AI.

Inte för att det är orättvist.
För att lingvistik är komplicerat.

Låt mig förklara 🧵

**Tweet 2:**
AI-modeller debiterar per token, inte per ord.

Tokens är inte ord — de är subword-enheter. Ungefär stavelser, prefix och suffix.

"Running" → 1 token
"Löpning" → 2 tokens

Det ser litet ut. Multiplicera med miljoner.

**Tweet 3:**
Varför är svenska mer tokenintensivt?

1. Sammansatta ord: "kostnadsberäkning" = ett ord = 4–5 tokens
2. Böjningsändelser: svenska har fler morfologiska varianter
3. Tokenizers är tränade på 70–80% engelska data

Inte diskriminering. Bara statistik.

**Tweet 4:**
Konkret test:

Engelska: "The AI model processes text efficiently" → 7 tokens
Svenska: "AI-modellen bearbetar text effektivt" → 9 tokens

1,28 tokens/ord vs 1,0 tokens/ord.
Snitt på stora texter: 1,3.

**Tweet 5:**
Vad innebär det i pengar?

1 miljon svenska ord/mån med GPT-4o:

Med 1,0 tokensfaktor (fel): 1 420 kr
Med 1,3 tokensfaktor (rätt): 1 840 kr

Skillnad: 420 kr/mån. 5 040 kr/år.

Det är ett medelstort bolag. Stor organisation: mångfalt mer.

**Tweet 6:**
Vad kan du göra?

→ Använd aikostnad.se — 1,3-faktorn är inbyggd
→ Testa din specifika text med Tiktokenizer för exakta siffror
→ Räkna alltid med 1,3× när du budgeterar svenska AI-projekt

**Tweet 7:**
Poängen är inte att AI är för dyrt.

Poängen är: räkna rätt från början.

En felaktig tokensfaktor → fel budget → fel modellval → du betalar för mycket.

Räkna rätt: aikostnad.se

---

## TRÅD 6
**"GPT-5 är ute — vad innebär det för dig som bygger med AI?"**

**Tweet 1 (hook):**
GPT-5 är lanserat.

Alla pratar om vad det kan göra.
Ingen pratar om vad det kostar att faktiskt använda det på svenska.

En tråd med konkreta siffror 🧵

**Tweet 2:**
GPT-5 standardpriser vid lansering:
- Input: ~10 USD / 1M tokens
- Output: ~40 USD / 1M tokens

Jämfört med GPT-4o:
- Input: 2,50 USD / 1M tokens
- Output: 10 USD / 1M tokens

GPT-5 är 4× dyrare. Räcker kapabiliteten att motivera det?

**Tweet 3:**
I SEK, med 1,3 tokens/ord för svenska texter:

1 000 svenska ord input + 500 ord output:

GPT-4o: ~0,32 kr
GPT-5: ~1,28 kr

Det är 4× priset per transaktion.
På 100 000 dagliga transactions: 28 800 kr/dag extra.

**Tweet 4:**
Frågan är matchning, inte ranking.

GPT-5 är förmodligen bättre.
Det är inte alltid värt 4×.

Bättre strategi:
→ Enkla uppgifter: GPT-4o mini / Claude Haiku
→ Medelsvåra: GPT-4o / Claude Sonnet
→ Riktigt komplexa: GPT-5 / Claude Opus

**Tweet 5:**
Den verkliga kostnaden för "all-in på GPT-5":

B2B-bolag med 50 anställda och hög AI-användning:
- Med GPT-4o hybrid: ~8 000 kr/mån
- Med GPT-5 för allt: ~32 000 kr/mån

Skillnad: 288 000 kr/år.

Det kräver en väldigt stark ROI-motivering.

**Tweet 6:**
Vi har lagt till GPT-5-priser i kalkylatorn.

Kör din jämförelse:
→ Välj GPT-5 mot dina nuvarande modeller
→ Se exakt prisskillnad i SEK
→ Räkna ut om ROI:n finns

aikostnad.se

---

## TRÅD 7
**"GDPR och AI: vad kostar compliance?"**

**Tweet 1 (hook):**
GDPR och AI är ett problem de flesta skjuter upp.

Tills Datainspektionen ringer.

En praktisk tråd om vad det kostar att göra rätt — och vad det kostar att göra fel 🧵

**Tweet 2:**
Grundregeln:

Persondata som processas av AI-modeller = databehandling.
Din AI-leverantör = personuppgiftsbiträde.
Du behöver ett DPA (Data Processing Agreement).

OpenAI, Anthropic och Google har alla DPA:er för API-kunder. Kräver ofta att du är på rätt abonnemang.

**Tweet 3:**
Vanliga GDPR-problem med AI:

→ Skickar kunddata till modeller utan DPA: brott
→ Använder DeepSeek (kinesisk server): troligen brott
→ Kör persondata med free-tier (OpenAI tränar på din data): brott
→ Sparar konversationshistorik utan lawful basis: brott

**Tweet 4:**
Vad kostar compliance?

→ OpenAI API (med DPA): standard API-pris + ingen extra kostnad
→ Azure OpenAI (EU-servrar): ~10–20% dyrare än direkt API
→ Anthropic Claude (med DPA): standard API-pris
→ Dedicated deployment (max compliance): 5–10× API-pris

**Tweet 5:**
The DeepSeek-problemet:

Billig. Kapabel. Kinesisk server.
Kinesisk lag ger myndigheterna rätt att kräva ut data.
GDPR kräver adekvat skyddsnivå vid tredjelandsöverföring.

Kina har inte adekvat skyddsnivå.

Konklusion: kör inte persondata på DeepSeek.

**Tweet 6:**
Praktisk regel:

För de flesta svenska bolag är OpenAI API + DPA eller Anthropic API + DPA tillräckligt bra compliance till normal API-pris.

EU-servrar tillkommer vid känslig data (hälsa, finans).
Dedicated deployment för offentlig sektor.

**Tweet 7:**
Kalkylera GDPR-säkra alternativ:

aikostnad.se visar priser för alla compliance-nivåer.

Välj din datakänslighet. Filtrera på GDPR-kompatibla modeller. Få SEK-pris.

aikostnad.se

---

## TRÅD 8
**"Från 0 till kalkylator på 3 veckor — vad vi lärde oss"**

**Tweet 1 (hook):**
3 veckor sedan hade vi en idé.

Idag har vi aikostnad.se — den enda svenska AI-kostnadskalkylatorn.

Vad vi lärde oss om att bygga snabbt och lansera fort 🧵

**Tweet 2:**
Vecka 1: Research och validering

Kollade om problemet var verkligt.
Frågade 15 grundare: "Vet du vad din AI kostar?"
12 av 15: "Ungefär... typ..."

Det är tillräcklig validering för att börja.

**Tweet 3:**
Problemet med existerande lösningar:

Alla är på engelska.
Alla räknar i dollar.
Ingen hanterar svenska tokensfaktorn.
Ingen är uppdaterad med de senaste modellerna.

Gap identifierat. Nästa steg: bygga.

**Tweet 4:**
Vecka 2: Bygga och iterera

Dag 1: grundlogiken — tokenkonvertering, SEK-kurs, input/output-split
Dag 3: alla modeller inlagda
Dag 5: prompt caching-beräkning tillagd
Dag 7: designiteration (gjorde om UI tre gånger)

**Tweet 5:**
Det svåraste: hålla det enkelt.

Frestelsen var att lägga till för mycket.
Budgetprognoser. Jämförelsehistorik. Sparkalkyl per bransch.

Vi tog bort allt och fokuserade på en sak: vad kostar din AI-volym i SEK, nu?

Enkelhet vinner.

**Tweet 6:**
Vecka 3: Testa och lansera

Beta till 20 användare. Fick 40 kommentarer. Fixade 12 buggar.
Mest värdefulla insikten: folk ville kunna jämföra flera modeller sida vid sida.

Vi lade till det. Lanserade.

**Tweet 7:**
3 lärdomar:

1. Validera med 10–15 samtal, inte månaders analys
2. Bygg för ett problem — lägg inte till features förrän det ursprungliga är rätt
3. Lansera när det är 80% klart — de sista 20% lär du dig av riktiga användare

Testa resultatet: aikostnad.se
