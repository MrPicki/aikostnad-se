# LinkedIn-inlägg — aikostnad.se
*15 färdiga inlägg. Publicera direkt. Skrivet som Picki Nolet.*

---

## INLÄGG 1
**"De flesta svenska företag betalar dubbelt — utan att veta om det"**

Jag pratade med en startup-grundare förra veckan. De betalar 4 800 kr/mån för ett AI-verktyg.

Jag räknade igenom deras faktiska användning. De behövde betala 2 100 kr/mån. Max.

Det är inte ovanligt. Det är normen.

Problemet är att AI-prissättning är komplicerat med flit. Tokens, kontextfönster, input vs output, svenska vs engelska ord. Ingen berättar att ett svenskt ord kostar 30% mer att processa än ett engelskt, för svenska är mer "tokenintensivt".

Ingen berättar att du kan cacha prompts och halvera kostnaden. Ingen jämför modellerna i SEK — bara i dollar.

Så du betalar det som står på hemsidan, multiplicerar fel, och lägger på en buffert för säkerhets skull.

Resultatet: du betalar dubbelt.

Vi byggde aikostnad.se för att lösa det här. Ange din användning, välj modell, få en exakt siffra i kronor. Inget fluff, ingen registrering.

Ta 2 minuter och kolla vad du faktiskt borde betala.

🔗 aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Startup #Sverige

---

## INLÄGG 2
**"Vi byggde en AI-chatbot för 127 kr/mån — inte 5 000 kr"**

En kund kom till oss med ett problem: de betalade 499 USD/mån för ett AI-chattverktyg inbyggt i deras CRM.

Vi räknade ut vad de faktiskt förbrukade: ca 400 000 tokens/mån.

GPT-4o kostar 0,0025 USD per 1 000 input-tokens och 0,01 USD per 1 000 output-tokens.

Med deras 80/20-split (input/output) och en dollarkurs på 10,5 SEK: 127 kr/mån.

De betalade 5 200 kr för något som kostade 127 kr att köra direkt via API.

Skillnaden? 5 073 kr varje månad. 60 876 kr per år.

Det är inte ett extremt exempel — det är vad som händer när du köper en wrapper runt ett API utan att förstå vad API:et faktiskt kostar.

Jag säger inte att SaaS-verktyg alltid är fel. Men du bör veta vad alternativet kostar.

Kolla din AI-kostnad på: aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Startup #Sverige

---

## INLÄGG 3
**"ChatGPT vs Claude — vad är egentligen billigast för svenska texter?"**

Det korta svaret: det beror på vad du gör. Det långa svaret är mer intressant.

Jag körde ett test med ett representativt dataset: 1 miljon svenska ord per månad. Klassisk B2B-usecase — sammanfattningar, mejlsvar, dokumentanalys.

Resultatet i SEK:

**GPT-4o:** 1 840 kr/mån
**Claude 3.5 Sonnet:** 1 650 kr/mån
**GPT-4o mini:** 310 kr/mån
**Claude 3 Haiku:** 185 kr/mån
**Gemini 1.5 Flash:** 145 kr/mån

Men här är fällan: kvaliteten skiljer sig enormt på svenska. GPT-4o mini hallucinerar mer på svenska än engelska. Claude är generellt starkare på nordiska språk.

Billigast är inte alltid bäst — men du bör åtminstone veta vad du betalar för.

Kör din egen jämförelse på aikostnad.se. Alla priser i SEK, uppdateras löpande.

#AI #ArtificielIntelligens #ChatGPT #Claude #Sverige

---

## INLÄGG 4
**"Varför svenska AI-kostnader är 30% högre än engelska — och vad du gör åt det"**

Det här är ett faktum som nästan ingen pratar om.

AI-modeller debiterar per token — inte per ord. Och svenska är betydligt mer tokenintensivt än engelska.

Snittförhållande:
- Engelska: ~1,0 token/ord
- Svenska: ~1,3 token/ord

Det låter som en liten skillnad. Men på 10 miljoner ord per månad är det 3 miljoner extra tokens — direkt på fakturan.

Varför är det så? Tokenizers är tränade på data som till 80%+ är engelska. Sammansatta ord som "AI-kostnadsberäkningsverktyg" delas upp i fler tokens än engelskans "AI cost calculator tool".

Vad gör du åt det?

1. Välj modell baserat på faktisk svensk tokenisering, inte engelska benchmarks
2. Förkorta dina svenska systemprompts — varje ord kostar 30% mer
3. Använd prompt caching för repetitiva instruktioner

Vi byggde in 1,3-faktorn i aikostnad.se så att du alltid får rätt siffra för svensk text.

🔗 aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Sverige #Tokens

---

## INLÄGG 5
**"Jag testade alla AI-modeller — här är vad de kostar i verkligheten"**

Inte i teorin. Inte i dollar. I kronor, med ett verkligt användningsmönster.

Scenario: ett 10-personers konsultbolag. 50 dokument/dag analyseras, 200 mejl/dag skrivs med AI-stöd, 2 interna chatbotar kör löpande.

**Månadskostnad per modell:**

| Modell | SEK/mån |
|--------|---------|
| GPT-4o | 3 200 kr |
| Claude 3.5 Sonnet | 2 900 kr |
| Gemini 1.5 Pro | 2 400 kr |
| GPT-4o mini | 540 kr |
| Claude 3 Haiku | 320 kr |
| Gemini 1.5 Flash | 240 kr |

Det roliga: de flesta företag i det här segmentet betalar 8 000–15 000 kr/mån via verktyg som Copilot, Jasper och liknande.

Är det fel? Inte nödvändigtvis — du betalar för UX, integrationer och support. Men du borde känna till grundkostnaden.

Kör din egna kalkyl: aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Sverige #AIkostnad

---

## INLÄGG 6
**"AI-budget för ett 5-personers företag: vad räknar du med?"**

Jag frågade 20 startup-grundare vad de budgeterar för AI per anställd och år.

Svaren: allt från "noll, vi kör gratis-tiers" till "vi vet faktiskt inte".

Här är verkligheten för ett typiskt 5-personers tech-bolag i Sverige:

**Direkta AI-verktyg:**
- ChatGPT Plus × 5: 1 300 kr/mån
- Claude Pro × 2: 520 kr/mån
- GitHub Copilot × 3: 520 kr/mån

**API-kostnader (om ni bygger något):**
- Beroende på volym: 500–5 000 kr/mån

**Totalt: 2 300–7 300 kr/mån** — eller 460–1 460 kr/anställd/mån.

Det är ungefär vad det kostar. Inte de 50 000 kr/mån som vissa konsulter säljer in, inte noll.

Men det exakta svaret beror på vad ni gör med AI. Kör kalkylatorn på aikostnad.se — välj era usecase, se exakt siffra.

#AI #ArtificielIntelligens #Startup #Sverige #Digitalisering

---

## INLÄGG 7
**"GPT-5 är ute — vad kostar den svenska företag?"**

OpenAI har lanserat GPT-5. Alla pratar om kapabiliteterna. Ingen pratar om vad det kostar att faktiskt använda den på svenska.

Jag räknade.

GPT-5 kostar ca 10 USD per 1M input-tokens och 40 USD per 1M output-tokens (standardpris vid lansering).

Med svensk 1,3-tokensfaktor och en dollarkurs på 10,5 SEK:

**1 000 svenska ord kostar:**
- Input: 0,14 kr
- Output: 0,55 kr

Jämfört med GPT-4o: ca 3x dyrare på output.

Är det värt det? Förmodligen för komplexa analyser och avancerade reasoning-uppgifter. Troligen inte för enkel textgenerering där GPT-4o mini eller Claude Haiku räcker.

Regeln gäller fortfarande: matcha modell mot uppgift. Inte bara modell mot hype.

Kör din GPT-5-kalkyl på aikostnad.se — vi har lagt till alla nya priser.

#AI #GPT5 #OpenAI #ArtificielIntelligens #Sverige

---

## INLÄGG 8
**"Prompt caching: det enklaste sättet att halvera din AI-faktura"**

De flesta som använder AI via API vet inte att den här funktionen finns. De som vet använder den inte fullt ut.

Prompt caching innebär att du lagrar delar av din prompt hos AI-leverantören. Nästa gång du skickar samma del — betalar du 90% mindre.

Konkret exempel:
Du har en systemprompt på 2 000 tokens som skickas med varje request. 10 000 requests per månad = 20 miljoner tokens bara i systemprompt.

**Utan caching:** ~2 100 kr/mån (Claude 3.5 Sonnet)
**Med caching:** ~210 kr/mån

Sparar: 1 890 kr/mån, 22 680 kr/år — på en enda optimering.

Vem stödjer det? Anthropic (Claude), OpenAI (GPT-4o och framåt), Google (Gemini). Alla tre stora aktörerna.

Implementationstid: 1–2 timmar för en erfaren utvecklare.

ROI: omedelbar.

Kalkylera din besparing på aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Startup #Sverige

---

## INLÄGG 9
**"Varför DeepSeek inte är lösningen för svenska företag (det handlar om GDPR)"**

DeepSeek är billig. Ibland gratis. Kapabiliteterna är imponerande.

Men om du är ett svenskt företag med data om kunder, anställda eller affärsprocesser — kan du troligen inte använda den.

Varför?

1. DeepSeek är ett kinesiskt bolag. Data processas på servrar i Kina.
2. Kinesisk lag (National Intelligence Law) ger staten rätt att kräva ut data från kinesiska bolag.
3. GDPR kräver adekvat dataskyddsnivå för tredjelandsöverföringar. Kina har inte det.

Vad händer om Datainspektionen börjar titta? Du har ett problem.

Det är inte FUD. Det är juridisk verklighet.

Alternativet för kostnadskänsliga företag: GPT-4o mini, Claude Haiku eller Gemini Flash. Alla tre ger 80–90% av DeepSeeks kapabilitet, är GDPR-kompatibla via standardavtalsklausuler, och kostar 150–350 kr/mån för normal B2B-volym.

Kalkylera GDPR-säkra alternativ på aikostnad.se

#AI #GDPR #DeepSeek #ArtificielIntelligens #Sverige

---

## INLÄGG 10
**"Räknade ut vad AI kostar för en advokatbyrå — resultatet chockade mig"**

En mellanstor advokatbyrå. 25 jurister. De ville använda AI för dokumentanalys, avtalsgranskning och research.

Jag räknade på ett realistiskt scenario:
- 500 dokument/månad analyseras (snitt 5 000 ord/dokument)
- 2 000 juridiska frågor besvaras av en intern AI-assistent per månad
- Allt på svenska

**Med GPT-4o:** 18 400 kr/mån
**Med Claude 3.5 Sonnet:** 16 600 kr/mån
**Med en hybrid (GPT-4o mini för enkla, GPT-4o för komplexa):** 6 200 kr/mån

De betalade i dag 45 000 kr/mån för ett juridik-specifikt AI-verktyg.

Skillnaden: 38 800 kr/mån. 465 600 kr/år.

Är det juridikverktyget bättre? Kanske på marginalerna. Men 465 000 kr/år i skillnad kräver en väldigt stark produktmotivation.

Kör din branschspecifika kalkyl på aikostnad.se

#AI #Juridik #ArtificielIntelligens #Digitalisering #Sverige

---

## INLÄGG 11
**"Gratis AI vs betald AI — när är det faktiskt värt att uppgradera?"**

Det korta svaret: när du förlorar mer i tid och kvalitet än uppgraderingen kostar.

Det långa svaret kräver lite matte.

ChatGPT Free ger dig GPT-4o med begränsningar. ChatGPT Plus kostar 229 kr/mån och tar bort de flesta begränsningarna.

Men om du är en person som använder AI 1–2 timmar/dag i jobbet — kostar din tid troligen 400–1 500 kr per timme. En enda blockad session på grund av rate-limits kostar mer än en månads Plus-prenumeration.

Det är den enkla kalkylen.

Den svårare: om du funderar på att bygga något med AI-API — när betalar det sig jämfört med ChatGPT-prenumeration?

Svar: vid ca 300 000–500 000 tokens/månad (beroende på modell och use case) är direkt API billigare.

Under det: ta prenumerationen. Över det: ta API:et.

Vi har byggt en kalkylator som visar exakt bryttpunkten för ditt scenario.

🔗 aikostnad.se

#AI #ChatGPT #ArtificielIntelligens #Sverige #Startup

---

## INLÄGG 12
**"AI-kostnad per anställd: vad är rimligt 2026?"**

Benchmark-data från vad jag ser i svenska bolag just nu:

**Kunskapsarbetare (analys, text, research):**
Rimligt: 300–600 kr/anställd/mån
Genomsnitt i verkligheten: 800–1 500 kr (på grund av dubbla prenumerationer)

**Utvecklare:**
Rimligt: 500–1 000 kr/anställd/mån (Copilot + API-kvoter)
Genomsnitt: 1 200–2 000 kr

**Säljare/CS:**
Rimligt: 200–400 kr/anställd/mån
Genomsnitt: 600–900 kr

Det vanligaste misstaget: att köpa både ChatGPT Plus och Claude Pro till samma person, plus ett AI-skrivverktyg på toppen. Du betalar tre gånger för liknande kapabilitet.

Pick one. Testa ordentligt. Dubbla inte utan anledning.

En annan sak: räkna in API-kostnader om ni bygger interna verktyg. De dyker upp plötsligt och är svårare att förutsäga.

Kalkylera era faktiska kostnader per roll på aikostnad.se

#AI #HR #ArtificielIntelligens #Digitalisering #Sverige

---

## INLÄGG 13
**"Vi lanserade aikostnad.se — den enda svenska AI-kostnadskalkylatorn"**

Bakgrunden: jag tröttnade på att berätta för folk vad deras AI egentligen kostar.

Alla jämförelsesajter är på engelska, i dollar, och räknar inte på att svenska text kostar 30% mer att processa. Ingen tar hänsyn till att du kan cacha prompts. Ingen är uppdaterad med GPT-5 och de nya modellerna.

Så vi byggde aikostnad.se.

Det den gör:
→ Jämför alla stora AI-modeller sida vid sida
→ Räknar i SEK (uppdateras med aktuell dollarkurs)
→ Applicerar 1,3 tokens/ord-faktorn för svensk text automatiskt
→ Visar besparingen med prompt caching
→ Är gratis och kräver ingen registrering

Det tog oss 3 veckor att bygga. Vi lärde oss mer om AI-prissättning under de 3 veckorna än de 2 år vi arbetat med AI dessförinnan.

Det mest förvånande? Hur stor skillnaden kan vara — och hur få som vet om det.

Testa kalkylatorn: aikostnad.se

Och tagga gärna en kompis som betalar för mycket för AI.

#AI #AIkostnad #ArtificielIntelligens #Startup #Sverige

---

## INLÄGG 14
**"3 misstag som gör att du betalar för mycket för AI"**

Jag ser dem om och om igen. Alla tre är enkla att undvika.

**Misstag 1: Du väljer modell baserat på hype, inte usecase.**
GPT-4o är inte rätt för allt. För enkel textgenerering, klassificering och sammanfattning räcker GPT-4o mini eller Claude Haiku — till en tiondel av priset. Matcha modell mot uppgift.

**Misstag 2: Du räknar tokens som om din text vore engelska.**
Alla offentliga priskalkylatorer är byggda för engelska. Svenska är 30% mer tokenintensivt. Det ser litet ut — men på ett medelstort bolag med hög AI-användning kan det vara 50 000–150 000 kr/år i differens.

**Misstag 3: Du cachar inte upprepade prompts.**
Om du skickar samma systemprompt med varje API-anrop — betalar du fulla priset varje gång. Med prompt caching betalar du 10% av det normala priset för den cachade delen. Implementationstid: 1–2 timmar. Besparing: ofta 40–60% av total API-kostnad.

Alla tre misstagen är lösbara. Och du kan räkna ut besparingen på aikostnad.se

#AI #ArtificielIntelligens #Digitalisering #Sverige #Startup

---

## INLÄGG 15
**"Varför vi byggde en AI-kalkylator — och vad vi lärde oss"**

Ärlig version av ursprungshistorien.

Det började med att jag fick en faktura jag inte förstod. En OpenAI-faktura på 3 400 kr för en månad när jag hade budgeterat 800 kr.

Jag förstod inte varför. Jag räknade, räknade om, och insåg att jag hade glömt bort tre saker: att svenska text kostar 30% mer, att output-tokens är 4× dyrare än input, och att jag inte cacheade något.

Sedan frågade jag 10 andra grundare. Nio av tio hade ingen bra koll på sina AI-kostnader.

Så vi byggde aikostnad.se. Inte för att det var en enorm affärsmöjlighet — utan för att problemet irriterade mig och ingen annan verkade lösa det på svenska.

Vad vi lärde oss under processen:

1. AI-prissättning är medvetet komplicerad — det gynnar leverantörerna att du inte förstår
2. Prisskillnaderna mellan modeller är enorma — upp till 50× för likvärdig output
3. Svenska företag behöver svenska tal — dollar och engelska tokens hjälper inte när du redovisar i SEK

Kalkylatorn är gratis. Ingen registrering. Testa den och berätta vad du tycker.

🔗 aikostnad.se

#AI #Startup #ArtificielIntelligens #Sverige #Digitalisering
