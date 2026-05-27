# Aikostnad.se — Lönsamhets- & Tillväxtanalys 2026
> **Analyserat:** 26 maj 2026  
> **Analytiker:** Senior Growth Hacker / Monetization Strategist / SEO-expert  
> **Scope:** Monetisering, SEO, CRO, viral, backlinks, social, email, teknisk SEO, konkurrens, affiliate  
> **Metod:** Fullständig kodbasgenomgång (src/pages, src/components), sitemap-analys (34 sidor), befintlig analys-2026.md, distribution/seo-outreach.md, konkurrentkartläggning

---

## EXECUTIVE SUMMARY

Aikostnad.se har en genuint stark position: **den enda svenska AI-kostnadskalkylatorn i SEK med GDPR-perspektiv och korrekt tokenisering för svenska texter**. Codebase är välbyggd, 34 sidor indexerade, schema markup på A-nivå, SimpleEstimator implementerad, EmailCaptureForm live.

**Problemet är brutalt enkelt: noll kronor i intäkter trots en funktionell produkt med rätt nisch.**

Tre strukturella gap håller tillbaka tillväxten:
1. **Monetisering saknas helt** — varje besökare lämnar sidan utan att ha genererat en enda krona
2. **Konverteringsflödet är trasigt** — EmailCaptureForm kräver checkbox + fyll i mail + ytterligare checkbox, vilket halverar konverteringsgraden
3. **Ingen viral loop** — Resultaten är inte delade, OG-bilder är generiska, inga sociala delningsknappar i kalkylatorn

Med rätt prioriteringar: **20 000–50 000 kr/mån i intäkter inom 60 dagar är realistiskt**. 100 000+ kr/mån inom 6 månader om content-strategin exekveras.

---

## 1. MONETISERING

**Betyg nuläge: 1/10**  
**Betyg efter 60-dagarsplan: 6/10**

### Vad finns idag?
Absolut ingenting. Noll affiliate-länkar. Noll betalväggar. Noll sponsrade placeringar. Noll premium-tier. Sajten genererar leads (Supabase + Resend) men konverterar inte leads till pengar. Varje besökare är en förlorad intäktsmöjlighet.

### Realistiska monetiseringsmodeller för aikostnad.se — rankat efter potential

**Rank 1: Affiliate-marknadsföring (potential: 20 000–80 000 kr/mån vid skala)**  
Varje gång en besökare klickar på en länk till OpenAI, Anthropic, Azure eller Google Cloud och registrerar sig — du får provision. Programmen finns, provisioner är höga (upp till $500/referral för enterprise), och aikostnad.se skickar idag potentiella kunder gratis till dessa bolag utan att ta betalt.

| Bolag | Program | Provision | Kommentar |
|-------|---------|-----------|-----------|
| OpenAI | openai.com/affiliates | $5–$25 per referral / rev-share | Kräver ansökan, godkänns normalt |
| Anthropic | Via Impact.com | Rev-share på API-konsumtion | Stark match med aikostnad.se:s publik |
| Microsoft Azure | Azure-partnerprogram | 10–15% av köp 90 dagar | Komplex men lönsam |
| Google Cloud | google.com/cloud/affiliate | $8 per gratis trial | Enkel, snabb godkänning |
| Vercel | vercel.com/affiliates | $100 per Pro-signup | Relevant för developer-segmentet |
| Cursor/GitHub Copilot | Egna program | Varierar | Sekundär prioritet |

**Varför det fungerar för aikostnad.se:** Besökaren är redan i köpfasen — de räknar ut vad ett AI-API kostar. Det är det perfekta ögonblicket att sätta en affiliate-länk: "Redo att komma igång? Skapa ditt OpenAI-konto här →". Intent matchar perfekt.

**Rank 2: Sponsrade placements / Content partnerships (potential: 10 000–30 000 kr/mån)**  
Svenska AI-konsulter, systemintegratörer (Sogeti, Knowit, Viqtor Davis) och utbildningsbolag betalar för synlighet på en sajt som når deras exakta målgrupp. Format: sponsrad sektion i "AI för företag"-guiden, "Rekommenderad partner"-badge i sidebaren, sponsrat use-case-scenario.

Prissättning: 5 000–15 000 kr/mån per sponsor. Med 2–3 sponsors = 10 000–45 000 kr/mån.

**Rank 3: Premium-tier "Aikostnad Pro" (potential: 5 000–25 000 kr/mån på sikt)**  
Gratisnivån förblir gratis (moat). Pro-nivån (99–299 kr/mån) erbjuder:
- Teamkalkylator med per-anställd-vy och exportfunktion (Excel/PDF)
- Prisvarningsnotiser via e-post (redan delvis byggt via EmailCaptureForm)
- API-åtkomst till prisdata i JSON (värdefull för developers och konsulter)
- Historiska prisdiagram

**Rank 4: Lead-generation för B2B (potential: 2 000–10 000 kr/lead)**  
Besökare som beräknar AI-kostnader för sina företag är kvalificerade leads för AI-konsulter. Bygg ett "Behöver du hjälp att optimera din AI-budget? Prata med en expert →" CTA som säljer leads till partners. 10 kvalificerade leads/mån × 1 000–2 000 kr/lead = 10 000–20 000 kr/mån.

### Konkret 60-dagarsplan med milstolpar

**Vecka 1–2: Affiliate-länkarna (0 kr investering → intäkter dag 15)**  
- Dag 1: Ansök om OpenAI Affiliate-programmet (openai.com/affiliates) och Google Cloud Affiliate
- Dag 3: Lägg till affiliate-länk på `/vad-kostar-chatgpt`, `/gpt-4-pris`, `/gpt-5-pris` — naturlig text: "Redo att testa? Skapa ditt OpenAI-konto (länk)" med UTM-tracking
- Dag 5: Ansök om Anthropic-affiliateprogrammet via Impact.com
- Dag 7: Lägg till affiliate-länk på `/claude-pris`, `/anthropic-claude-api-pris`
- Dag 10: Ansök om Microsoft Azure-partnerprogram
- Dag 14: Alla affiliate-program aktiva, UTM-tracking i GA4 konfigurerat
- **Förväntad effekt:** 5 000–15 000 kr/mån i affiliate-intäkter vid 2 000 organiska besökare/mån

**Vecka 3–4: Första sponsor-deal**  
- Dag 15: Identifiera 5 svenska AI-konsulter (Sogeti, Knowit, Viqtor Davis, Omegapoint, Netlight)
- Dag 17: Skicka personliga LinkedIn-meddelanden med konkret erbjudande: "Din logotyp + länk i vår 'AI för företag'-guide, X unika besökare/mån, 5 000 kr/mån"
- Dag 25: Första sponsor signerat (realistiskt)
- **Förväntad effekt:** 5 000–15 000 kr/mån

**Vecka 5–8: Pro-tier MVP**  
- Dag 29: Bygg enkel Pro-beta med Stripe: teamkalkylator (antal anv. × kostnad), Excel-export, prisvarningar
- Dag 40: Soft launch till e-postlistan med 50% early bird-rabatt
- Dag 50: Betaanvändare ger feedback, iterera
- Dag 60: Full launch med 299 kr/mån
- **Förväntad effekt:** 10–30 Pro-subscribers dag 60 = 3 000–9 000 kr/mån

**Total intäktsprognos dag 60: 13 000–39 000 kr/mån**

---

## 2. ORGANISK TILLVÄXT / SEO

**Betyg nuläge: 6/10**  
**Betyg efter plan: 8/10**

### Nuläge
34 sidor i sitemap. Teknisk SEO är A-klass: WebSite, SoftwareApplication, HowTo, FAQPage, BreadcrumbList, Article, Speakable schema. Canonical-taggar korrekt implementerade. Open Graph konfigurerat.

Stark keyword-täckning: "vad kostar AI", "ChatGPT pris", "Claude pris", "Gemini pris", "billigaste AI", "gratis AI", "prompt caching", "AI för företag", "token kalkylator".

### Vad saknas i keyword-universumet?

**Hög volym, ej täckt:**
- "GPT-5 API pris" / "GPT-5 kostnad" — `/gpt-5-pris` finns i sitemap men är ny (2026-05-25), ännu inte rankad
- "o3 pris" / "o3 API kostnad" — ingen sida
- "Claude Opus 4 pris" — täcks delvis av `/claude-pris` men ingen dedikerad sida
- "Gemini 3 pris" / "Gemini 2.5 Pro pris" — ingen sida
- "AI kostnad per anställd" — täcks delvis i `/ai-for-foretag` men inte som primärt söksord
- "ChatGPT Team pris" / "ChatGPT Enterprise pris" — ingen sida
- "Microsoft Copilot for Microsoft 365 pris" — `/microsoft-copilot-pris` finns men täcker troligen bara bas-Copilot
- "AI skrivassistent pris" / "Jasper pris" / "Copy.ai pris" — ingen täckning
- "Midjourney pris" / "DALL-E pris" — täcks delvis av `/ai-bild-pris`
- "Cursor pris" / "GitHub Copilot pris" — ingen sida

**Intentionsgap:**
- "är ChatGPT värt pengarna" — nej/ingen sida (hög kommercell intent)
- "AI verktyg jämförelse" — `/jamfor-ai-modeller` finns men troligen ej rankad
- "bästa AI för företag Sverige" — delvis täckt
- "AI ROI kalkylator" — potentiell viral term, ingen sida
- "agent AI kostnad" / "AI workflow kostnad" — noll täckning (trending 2026)
- "self-hosted AI kostnad" / "Llama kostnad" — noll täckning

**Branschspecifika gap (longtail, hög konvertering):**
- "AI kostnad advokatbyrå"
- "AI kostnad redovisning"  
- "AI kostnad e-handel"
- "AI kostnad sjukvård"
- "AI kostnad skola"
- "AI kostnad fastighetsmäklare"

### Plan för att fylla hålen

**Sprint 1 (vecka 1–2): Modellsidor för nya flaggskepp**  
- `/o3-pris` — "Vad kostar OpenAI o3? Kalkylator + guide" (1–2 dagars arbete)  
- `/claude-opus-4-pris` — "Claude Opus 4 pris Sverige" (1 dag)  
- `/gemini-25-pris` — "Gemini 2.5 Pro pris i SEK" (1 dag)  
- Tid: 3–5 dagar | Förväntad trafik: 500–2 000 besök/mån per sida inom 3 månader

**Sprint 2 (vecka 3–4): Branschspecifika guider (5 sidor)**  
- `/ai-for-advokatbyra`, `/ai-for-redovisning`, `/ai-for-ehandel`, `/ai-for-sjukvard`, `/ai-for-skola`  
- Format: scenario-kalkylator inbäddad + guide + use-case-tabell  
- Tid: 1 dag per sida | Förväntad trafik: 200–800 besök/mån per sida

**Sprint 3 (vecka 5–8): Developer-tools och agentic AI**  
- `/cursor-pris` — developer-persona med hög köpintention  
- `/github-copilot-pris` — hög sökvolym, lätt att skriva  
- `/ai-agent-kostnad` — first-mover advantage, trending term  
- `/chatgpt-team-pris` — B2B-intent, hög CPC-värde

**Löpande: Changelog och prisuppdateringar**  
Skapa `/prisandringar` — en logg över alla modell-prisändringar. Google älskar frekvent uppdaterade sidor. Varje priändring (OpenAI, Anthropic, Google annonserar ca 4–8 gånger per år) = ny blogpost + social post + pressutskick.

---

## 3. KONVERTERINGSOPTIMERING (CRO)

**Betyg nuläge: 3/10**  
**Betyg efter plan: 7/10**

### Nulägesanalys

**EmailCaptureForm — kritiska friktionspunkter:**

Formuläret kräver tre steg: email + obligatorisk checkbox + frivillig checkbox. Det är 3× mer friktion än branschstandard (bara email). Konverteringsgrad för detta formulär är troligen 1–3%. Branschstandard för en väloptimerad email-capture är 5–12%.

Specifikt problem: Consent-texten är 6 rader juridisk text med externa länkar. För en besökare som ska bevakas vid prisändringar är detta overdone. GDPR kräver tydligt samtycke — inte ett juridiskt kontrakt.

**SimpleEstimator → Calculator-flöde:**  
SimpleEstimator finns på Home.tsx (sektion 2) — bra. Men det finns ingen tydlig bridge från SimpleEstimator-resultatet till nästa handling. Besökaren får ett kostnadsestimat och sedan... ingenting. Ingen CTA, ingen "Vill du exakt svar? Justera i kalkylatorn →", ingen email-capture på resultatet.

**Vad saknas:**
- Exit intent popup (visas när musen rör sig mot att stänga fliken) — potentiell 2–5% konverteringsökning
- Sticky header-CTA vid scroll (visas efter 50% scroll): "Få prisvarningar direkt →"
- Social sharing direkt på kalkylatorsresultatet (inga delningsknappar finns idag)
- Ingen "Dela din kalkyl"-CTA kopplad till email-capture: "Spara och skicka din kalkyl via e-post"
- Kalkylatorsresultatet har ingen CTA — besökaren fastnar vid siffran utan nästa steg

### Konkreta CRO-åtgärder

**Åtgärd 1: Förenkla EmailCaptureForm (2 timmar, +40–80% konvertering)**  
Nuläge: email + checkbox1 (obligatorisk) + checkbox2 (frivillig) = 3 element  
Förslag: bara email + en enkel "Jag accepterar att Aikostnad.se kontaktar mig" + knapp  
Juridisk validitet: bevaras, men reducera texten till 2 meningar.  
Förväntad effekt: konverteringsgrad 2% → 4–6%

**Åtgärd 2: Email-capture på kalkylatorresultatet (1 dag, ny konverteringsyta)**  
Under ResultCards: "Spara din kalkyl och få uppdatering om prisändringen → [email-fält] [Spara]"  
Det är en naturlig handling — besökaren har gjort jobbet, vill spara resultatet.  
Förväntad effekt: 5–10% av calculator-besökare = ny kanal

**Åtgärd 3: Sticky CTA efter 50% scroll (4 timmar)**  
En diskret sticky bar: "📬 Få prisvarning när AI-priserna ändras → [e-post]"  
Visas på alla sidor efter 50% scroll, döljs om besökaren redan subscribat.  
Förväntad effekt: 1–3% av samtliga besökare

**Åtgärd 4: Exit intent popup (1 dag)**  
Triggas när musen går mot stängning. Budskap: "Innan du stänger — vill du veta när ChatGPT-priset ändras?"  
Visas max 1 gång per besökare, aldrig på mobil.  
Förväntad effekt: 2–5% av exit-besökare

**Åtgärd 5: Social sharing på kalkylatorsresultatet (4 timmar)**  
Lägg till under ResultCards: [🐦 Dela på X] [💼 LinkedIn] [📋 Kopiera text]  
Förformulerad tweet: "Räknade ut att min AI-chatbot kostar [X] kr/mån med [Modell]. Prova själv → aikostnad.se #AI #startup"  
Förväntad effekt: 3–8% av användare delar = organisk spridning

---

## 4. VIRAL / DELNINGSBARHET

**Betyg nuläge: 2/10**  
**Betyg efter plan: 6/10**

### Nulägesanalys

Kalkylatorn har en "Kopiera länk"-funktion som synkar URL-parametrar. Det är bra — men det är inte detsamma som viral. Ingen social card genereras. OG-bilden är generisk (samma för alla beräkningar). Inga Twitter/LinkedIn-knappar finns i kalkylatorflödet. Ingen "Jämför med kollega"-funktion.

Viral koefficient idag: < 0.1 (under 1 = inte viral). Varje 10 besökare genererar < 1 ny besökare via delning.

### Vad gör folk dela organiskt?

Tre triggers för viral spridning i utility tools:
1. **Identitetsskapande resultat** — "Jag räknade ut att min idé kostar X kr/mån" är en signal om kompetens och sparsamhet
2. **Överraskningsmoment** — folk delar saker som chockade dem ("Visste du att svenska texter kostar 73% mer?")
3. **Jämförelse** — "Vi räknade ut vad AI kostar för vårt team vs Googles abonnemang — skillnaden chockade oss"

### Konkreta viral-features att bygga

**Åtgärd 1: Dynamisk OG-bild för delade kalkyler (2–3 dagar, hög impact)**  
Bygg en Vercel OG API-endpoint: `/api/og?cost=340&model=claude-haiku&usecase=chatbot`  
Returnerar en bild: stor siffra "340 kr/mån", modellnamn, "Beräknat på aikostnad.se"  
När besökaren delar sin kalkyl-URL ser mottagaren en rik kort i LinkedIn/Twitter.  
Förväntad effekt: delningar ökar 3–5×, CTR på delade länkar ökar 40–80%

**Åtgärd 2: "Dela resultatet"-knappar med förformulerat innehåll (4 timmar)**  
Twitter/X: `https://twitter.com/intent/tweet?text=Min+AI-chatbot+kostar+340+kr%2Fmån+med+Claude+Haiku.+Räknat+med+aikostnad.se`  
LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Faikostnad.se%2F%3Fcost%3D340`  
Placering: direkt under ResultCards, utformad som "Dela din kalkyl:"  

**Åtgärd 3: "Jämför två scenarier"-läge (3–5 dagar, hög viral potential)**  
Knapp: "+ Lägg till scenario B" — öppnar parallell kalkylator  
Resultatet visar: "Scenario A (GPT-4o): 1 200 kr/mån vs Scenario B (Claude Haiku): 380 kr/mån — spara 68%"  
Det är en tweet: "Byter AI-modell och sparar 820 kr/mån. Källan: aikostnad.se"

**Åtgärd 4: Månadsrapport som PR-trigger (löpande)**  
Publicera en "Prisrapport Q3 2026" — aggregerad data om hur AI-priser rört sig i Sverige.  
Format: ett LinkedIn-inlägg + ett PDF/markdown på sajten  
Förväntad effekt: organiska omnämnanden i media, naturliga inlänkar

---

## 5. BACKLINK-STRATEGI

**Betyg nuläge: 2/10**  
**Betyg efter plan: 6/10**

### Nulägesanalys

Seo-outreach.md listar 30 svenska sajter med detaljerade vinklar och kontaktuppgifter — planen är solid. Problem: det är en plan, inte en handling. Inget har verifierbart exekverats. Länkprofilen är troligen nästan noll (ny sajt, lite organisk länkbuilding).

Risken: utan externa länkar rankar sidan inte för konkurrenskraftiga söktermer oavsett hur bra innehållet är.

### Vilka sajter borde länka hit?

**Tier 1 (hög DA, bred publik):** Breakit, DI Digital, Ny Teknik, Computer Sweden — en artikel om "AI-kostnader i Sverige" med datareferens till aikostnad.se = 10 000–50 000 kr i SEO-värde per länk.

**Tier 2 (nischad men relevant DA):** SUP46, Startupguiden, Founders Alliance — startup-communities med aktiva bloggare som naturligt refererar till verktyg.

**Tier 3 (embed-driven):** Svenska tech-bloggar, konsultbolags insights-bloggar — EmbedCalculator.tsx är redan implementerad. Marknadsför den aktivt: varje embed = en inlänk.

**Tier 4 (PR-guld):** Myndigheter och akademi — om aikostnad.se nämns i en Vinnova-rapport om AI-kostnader för svenska SME är det en domänauktoritetsboost på en annan nivå.

### Konkret outreach-plan

**Vecka 1 (5 timmar): Mediekontakter**  
- Breakit (tips@breakit.se): Vinkel "Ny data visar att svenska AI-appar kostar 40–60% mer att bygga än engelska — vi har räknat ut varför"  
- DI Digital (didigital@di.se): Vinkel "Hur svenska CFO:er kan spara 200 000 kr/år på AI-kostnader"  
- Ny Teknik (redaktionen@nyteknik.se): Vinkel teknisk — tokenomics för svenska texter  

Personalisera alla mail. Bifoga en konkret datasnutt: "Visste ni att svenska texter kostar 73% mer att bearbeta med AI än engelska? Vi har byggt en kalkylator för detta."

**Vecka 2 (3 timmar): Startup-communities**  
- SUP46 (hello@sup46.com): Erbjud en "AI-budgetering"-workshop + verktygsrekommendation  
- Startupguiden (info@startupguiden.se): Be om inkludering i deras verktygsguide  
- Founders Alliance: Personlig kontakt via LinkedIn + konkret erbjudande

**Vecka 3–4 (löpande): Embed-kampanj**  
Skapa en "Bädda in kalkylatorn"-landningssida på aikostnad.se med copy och embed-kod.  
Kontakta 10 svenska tech-bloggare med direkterbjudande: "Embed vår gratis AI-kalkylator på din blogg — dina läsare får ett unikt verktyg, vi kräver bara en länk back."

**Vecka 5–8: Konsultbloggar**  
Sogeti, Viqtor Davis, Omegapoint, Knowit — erbjud co-authored artiklar om AI-kostnadsoptimering.

**KPI:** 5 earned media-omnämnanden inom 60 dagar, 10+ externa inlänkar inom 90 dagar.

---

## 6. SOCIAL MEDIA NÄRVARO

**Betyg nuläge: 2/10**  
**Betyg efter plan: 5/10**

### Nulägesanalys

@aikostnad finns på X/Twitter. LinkedIn-status okänt (ingen LinkedIn-sida eller profil identifierad i codebase). Sociala kanaler genererar troligen 0–2% av trafiken. Det är underpresterande för en B2B-SaaS-nisch.

### Varför social media är viktigare än det verkar för aikostnad.se

Primärmålet med social media för aikostnad.se är INTE direkttrafik — det är **trovärdighetsbyggande + inlänkar + PR-triggering**. En journalist på Breakit ser ett LinkedIn-inlägg om "AI-priser för svenska texter" och kontaktar oss för en artikel. Det är den loop som värderas.

### Vad saknas

**X/Twitter:**
- Okänt hur ofta @aikostnad postar, men troligen sällan
- Ingen systematisk content-strategi
- Inga trådar om tekniska insikter (tokenomics, prompt caching sparar X%)

**LinkedIn:**
- Ingen bedömbar närvaro
- LinkedIn är primärplattformen för B2B-beslutfattare (CFO, HR-chef, IT-chef) — aikostnad.se:s köpstarkaste persona

### Content Calendar-strategi

**Frekvens:** X/Twitter: 3–4 gånger/vecka. LinkedIn: 2–3 gånger/vecka.

**Format som presterar för tech-utility tools:**

*Datadrivet format (högt engagemang):*  
"Vi jämförde kostnaden att driva en AI-kundtjänst med 5 olika modeller. Resultaten [siffra] chockade oss. Tråd →"  
Källa: egna kalkylatorsdata. Publiceras varje måndag.

*"Visste du att"-format:*  
"Visste du att svenska texter kostar 73% mer att AI-bearbeta än engelska? Beror på att å/ä/ö = fler tokens. Räkna ut din merkostnad: [länk]"  
Frekvens: 2 gånger/vecka.

*Prisuppdatering (nyhetsjakt):*  
Varje gång OpenAI/Anthropic/Google ändrar priser: "NYHET: [Modell] sänker priset X%. Vad det betyder för din AI-budget: [länk]"  
Timing: inom 2 timmar efter announcement.

*B2B-specifikt LinkedIn:*  
"3 frågor din CFO borde ställa innan ni godkänner AI-budgeten" → länk till /ai-for-foretag  
Format: kort text + länk. Postar tis–tors 08:00–09:00 (bäst räckvidd B2B).

**Kontostruktur:**
- Skapa LinkedIn company page för Aikostnad.se omedelbart
- Optimera @aikostnad X-bio: "Sveriges AI-kostnadskalkylator 🇸🇪 • Räkna ut vad ChatGPT & Claude kostar i SEK • Gratis → aikostnad.se"

---

## 7. EMAIL MARKETING / LEAD NURTURING

**Betyg nuläge: 3/10**  
**Betyg efter plan: 7/10**

### Nulägesanalys

**Vad finns:** EmailCaptureForm är implementerad på hemsidan med providerId, source, consentMarketing. Resend är konfigurerat. API-endpoint `/api/send-guide` finns. Supabase sparar leads.

**Vad händer efter signup:** Troligen ett välkomstmail (send-guide). Sedan: ingenting. Ingen automation-sekvens, inga follow-up-mails, ingen segmentering baserat på consentMarketing-flaggan.

**Kritisk observation:** consentMarketing är frivillig checkbox — det innebär att majority av subscribers kanske bara accepterat "guide" och INTE marketing. Det urholkar din effektiva marknadsföringslista drastiskt. Lösning: byt formulärtext — gör prisvarningar till primärt värdeförslag (inte "guide"), vilket är ett transaktionellt mail som inte kräver marknadsföringstillstånd.

### Automation-sekvens som borde byggas

**Sekvens 1: Prisvarning-onboarding (alla leads, 5-mail sekvens)**  
*Mail 1 (dag 0 — välkomstmail):*  
Ämne: "Du bevakar nu AI-priser — här är vad du missar 2026"  
Innehåll: 3 faktarutor om AI-priser + länk till `/billigaste-ai` + länk till `/prompt-caching`  
Syfte: aktivering, etablera värde

*Mail 2 (dag 3):*  
Ämne: "Visste du att din [senast beräknade modell] kostnad kan halveras?"  
Innehåll: personaliserat (baserat på providerId från signup) — om de signade upp vid Claude-sidan: "3 sätt att halvera din Claude-nota"  
Syfte: djupare engagemang, sidvisit

*Mail 3 (dag 7):*  
Ämne: "En siffra som chockade oss: svenska AI-kostnader vs engelska"  
Innehåll: det 73%-faktumet om svenska tokens, länk till `/vad-kostar-ai` och kalkylatorn  
Syfte: viral potential (forwardas), backlinks

*Mail 4 (dag 14 — soft commercial):*  
Ämne: "Vi har byggt något nytt för dig" (eller prisvarning om riktig prisändring inträffat)  
Innehåll: introduktion till Pro-tier (om lanserat) ELLER erbjudande om affiliate-tjänst  
Syfte: konvertering

*Mail 5 (dag 30 — aktiveringsmail):*  
Ämne: "Räknade du rätt? AI-priset har förändrats sedan du besökte oss"  
Innehåll: prisuppdatering för senast beräknade modell + uppmaning att räkna om  
Syfte: retrafik till sajten, reaktivering

**Sekvens 2: Prisvarning-trigger (event-baserad)**  
När priset för en modell ändras → skicka till alla leads som signade upp via den modellens sida  
Ämne: "[Modellnamn] har ändrat sitt pris — räkna om din kostnad"  
Innehåll: gammal vs ny kostnad, länk till kalkylatorn med förifylld modell  
Förväntad open rate: 40–60% (transaktionellt mail, hög relevans)

**Segmentering:**
- `source: home-price-alert` → generell prisbevakning
- `source: claude-pris` → Claude-specifik sekvens
- `source: chatgpt-*` → OpenAI-specifik sekvens
- `consentMarketing: true` → kan ta emot kommersiella mails (Pro-tier pitch, sponsors)

**KPI mål 60 dagar:** 500+ subscribers, 35%+ open rate, 5%+ click rate.

---

## 8. TEKNISK SEO & CRAWLBARHET

**Betyg nuläge: 7/10**  
**Betyg efter plan: 9/10**

### Nulägesanalys — vad som är bra

Riktigt välimplementerat för en React/Vite-applikation:
- Structured data: WebSite, SoftwareApplication, HowTo, FAQPage, BreadcrumbList, Article, Speakable — komplett
- Helmet/react-helmet-async korrekt implementerat på sidnivå
- Canonical-taggar på alla sidor (SEO-komponent)
- Open Graph och Twitter Card på alla sidor
- Sitemap.xml med 34 URLs, lastmod, changefreq, priority
- Live-valutakurs via Frankfurter API med fallback — visar att sidan är dynamisk
- Relativt snabb stack (Vite + Tailwind + React, Vercel CDN)

### Vad som kan förbättras

**Problem 1: Sitemap uppdateras manuellt (kritisk risk)**  
`lastmod` är satt till `2026-05-20` för de flesta sidor — statisk. Google ser en sida som inte uppdateras och crawlar den mer sällan. Automatisera lastmod-uppdatering: ett CI/CD-script som sätter lastmod till today() när en sida ändras.  
Tid: 2 timmar | Effekt: ökad crawl-frekvens

**Problem 2: Priser uppdateras månadsvis manuellt**  
Konkurrenter (aipricing.guru, pricepertoken.com) uppdaterar dagligen. En sida med stale data rankar sämre och förlorar trovärdighet.  
Lösning: Cron job (Vercel Cron eller GitHub Actions) som dagligen kontrollerar OpenAI/Anthropic pricing pages och flaggar avvikelser.  
Tid: 1–2 dagar | Effekt: trovärdighet + crawl-frekvens

**Problem 3: Core Web Vitals — okänt läge**  
Ingen data tillgänglig på Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), Interaction to Next Paint (INP). React SPA kan ha höga LCP-värden om kalkylatorn är tung.  
Åtgärd: Kör PageSpeed Insights (pagespeed.web.dev) för mobile och desktop. Mål: LCP < 2.5s, CLS < 0.1.  
Potentiella problem: tung JS bundle (Vite + React + Tailwind), ingen code splitting per route

**Problem 4: Ingen robots.txt verifierad**  
/embed-kalkylatorn bör vara crawlbar men noindexed. Verifiera att robots.txt tillåter Googlebot på alla monetiserade sidor.

**Problem 5: changefreq är "monthly" för prissidor**  
Prissidor (gpt-5-pris, claude-pris etc.) borde ha `changefreq: weekly` — priserna ändras ofta och Google bör veta det.  
Tid: 30 minuter | Effekt: snabbare indexering av prisuppdateringar

**Problem 6: Schema för jämförelsesidor saknas**  
`/jamfor-ai-modeller` och jämförelsesidor saknar troligen `ItemList` eller `Table` schema.  
Lägg till schema för tabellinnehåll på alla jämförelsesidor.

**Problem 7: Intern länkstruktur kan förbättras**  
Anchor-texter i guider bör vara keyword-rika ("läs vår guide om Claude pris" inte bara "klicka här"). Bekräfta att alla 34 sidor är internt länkade från minst en annan sida.

### Core Web Vitals-prioritet

Kör omedelbart: `npx lighthouse https://aikostnad.se --output json`  
Om LCP > 3s: implementera route-baserad lazy loading (Vite dynamic import) + preload för hero-komponenter  
Om CLS > 0.1: identifiera layout shifts (troligen bildladdning eller dynamisk font-loading)

---

## 9. KONKURRENSANALYS & DIFFERENTIERING

**Betyg nuläge: 7/10 (position)**  
**Defensivt vallgrav: 4/10 (sårbarhet)**

### Vad gör aikostnad.se unikt vs engelska konkurrenter?

| Feature | Aikostnad.se | aipricing.guru | pricepertoken.com |
|---------|-------------|----------------|-------------------|
| Svenska (SEK) | ✅ | ❌ | ❌ |
| 1,3 tokens/ord för svenska | ✅ | ❌ | ❌ |
| GDPR-perspektiv | ✅ | ❌ | ❌ |
| SimpleEstimator (NLP-input) | ✅ | ❌ | ❌ |
| Scenarioväljarfunktion | ✅ | ❌ | ❌ |
| Daglig prisuppdatering | ❌ | ✅ | ✅ |
| Prishistorik | ❌ | ✅ | ✅ |
| JSON API | ❌ | ✅ | ❌ |
| 90+ modeller | ❌ (12+) | ✅ | ✅ |
| Newsletter | ❌ | ✅ | ❌ |

**Kärnmoat:** Lokal nisch (svenska, SEK, GDPR) + SimpleEstimator (NLP-input). Dessa är genuint svåra att kopiera för en engelskspråkig aktör som inte förstår den svenska marknaden.

### Vad kan kopieras av konkurrenter snabbt?

**Enkelt att kopiera (< 1 vecka för en kompetent developer):**
- SEK-omräkning via öppet API (exakt samma Frankfurter API)
- Kalkylatorsdesign och struktur
- Innehållssidor (copy + adapt)

**Svårare men möjligt (1–4 veckor):**
- SimpleEstimator — kräver AI-integration + prompt engineering
- Branschscenarier
- Schema-markup på svensk nivå

**Genuint svårt att kopiera (3+ månader):**
- Topical authority och domänålder i Google
- Etablerade backlinks och pressreferenser
- E-postlistan (inte tekniskt — men listbyggande tar tid)
- Varumärkeskännedom bland svenska beslutsfattare

### Hur bygger man ett defensivt vallgrav?

**Vallgrav 1: Innehållsvolym och hastighet**  
Publicera snabbare än en potentiell konkurrent hinner komma ikapp. En ny sida per vecka = 52 sidor om ett år. En konkurrent som startar idag behöver 6–12 månader för att matcha det.

**Vallgrav 2: Varumärkesinvestering**  
PR (Breakit, DI Digital), podcast-omnämnanden, LinkedIn-content. "Aikostnad.se" som nämnt varumärke är svårare att ersätta än en anonym sajt.

**Vallgrav 3: SimpleEstimator som inbyggd funktion**  
Ingen konkurrent erbjuder NLP-input på svenska idag. Om SimpleEstimator marknadsförs som hero-funktion och förbättras löpande (fler use-cases, bättre precision) är det en moat.

**Vallgrav 4: E-postlistan**  
500+ prenumeranter som får prisvarningar = ett direkt kommunikationskanal som en ny aktör inte kan köpa.

**Vallgrav 5: Embeds**  
25 externa sajter som bäddar in kalkylatorn = 25 inlänkar + 25 brand touchpoints. Svårt för en konkurrent att ta dem.

---

## 10. AFFILIATE / PARTNERSKAP-POTENTIAL

**Betyg nuläge: 1/10**  
**Betyg efter plan: 6/10**

### Vilka AI-bolag har affiliateprogram?

| Bolag | Program | Provision | Krav | Match för aikostnad.se |
|-------|---------|-----------|------|----------------------|
| OpenAI | openai.com/affiliates (Impact.com) | 20% av köp 12 månader | Ansökan | ⭐⭐⭐⭐⭐ |
| Anthropic | anthropic.com/affiliates (Impact.com) | Rev-share | Ansökan | ⭐⭐⭐⭐⭐ |
| Google Cloud | google.com/cloud/affiliate | $8/trial, 8% av köp | Godkänt snabbt | ⭐⭐⭐⭐ |
| Microsoft Azure | Azure partnerprogram | 10–15% av köp | Partneransökan | ⭐⭐⭐ |
| Cursor | cursor.com/affiliates | $20/konvertering | Enkel | ⭐⭐⭐⭐ |
| GitHub Copilot | GitHub affiliate | $5–15/signup | Via Impact | ⭐⭐⭐ |
| Perplexity | perplexity.ai/affiliates | 20% av Pro-köp | Enkel | ⭐⭐⭐⭐ |
| Vercel | vercel.com/affiliates | $100/Pro | Enkel | ⭐⭐⭐ |
| Notion AI | notion.com/affiliates | $10/signup | Enkel | ⭐⭐ |

### Hur integreras affiliate-länkar naturligt?

**Metod 1: Kontextuell CTA i guider (högst konvertering)**  
I `/vad-kostar-chatgpt`:  
"Redo att komma igång med ChatGPT API? [Skapa ditt OpenAI-konto gratis →](affiliate-länk)"  
Naturlig, relevant, hjälpande ton — inte push-försäljning.

**Metod 2: Modellspecifika sidor — "Kom igång"-sektion**  
Varje modellsida avslutas med: "Nästa steg: [Skapa konto hos OpenAI] (affiliate) | [Läs API-dokumentationen]"  
Konverteringsintent är maximal på dessa sidor — besökaren har just räknat ut sin budget.

**Metod 3: Kalkylatorresultatet — "Börja använda [Modell] idag"**  
Under ResultCards: "Gillar du siffran? [Kom igång med Claude Haiku] (affiliate)" — visas bara om beräknad kostnad är rimlig (< 500 kr/mån).

**Metod 4: Jämförelsetabeller med affiliate-knappar**  
ModelComparisonTable och SubscriptionTable: lägg till "Testa gratis →" knappar med affiliate-tracking på varje rad.

**Viktigt:** Märk affiliate-länkar transparent (GDPR + FTC-krav + trovärdighet): "Samarbetslänk — vi kan ta emot provision vid köp."

### Estimerad intäktspotential

Baserat på:
- 2 000 månadsbesökare (konservativt nuläge)
- 3% CTR på affiliate-knappar = 60 klick/mån
- 10% konvertering till signup = 6 signups/mån
- Snitt $15/signup = $90/mån = ~950 kr/mån (dag 30)

Vid 10 000 besökare/mån (realistiskt inom 90 dagar med SEO-plan exekverad):
- 3% CTR = 300 klick/mån
- 10% konvertering = 30 signups/mån
- Snitt $15/signup = $450/mån = ~4 750 kr/mån

Vid 50 000 besökare/mån (6-månadersmål):
- 3% CTR = 1 500 klick/mån
- 10% konvertering = 150 signups/mån
- Snitt $20/signup = $3 000/mån = ~31 500 kr/mån

**Affiliate är inte den primära intäktsmodellen, men det är den snabbaste att aktivera och skalerar med trafiken.**

---

## SAMMANFATTNING: BETYGSÖVERSIKT

| Kategori | Nuläge | Efter plan | Gap |
|----------|--------|-----------|-----|
| Monetisering | 1/10 | 6/10 | Kritisk |
| Organisk SEO | 6/10 | 8/10 | Medel |
| CRO | 3/10 | 7/10 | Kritisk |
| Viral/delbarhet | 2/10 | 6/10 | Kritisk |
| Backlinks | 2/10 | 6/10 | Hög |
| Social media | 2/10 | 5/10 | Hög |
| Email marketing | 3/10 | 7/10 | Hög |
| Teknisk SEO | 7/10 | 9/10 | Låg |
| Konkurrens/diff. | 7/10 | 8/10 | Medel |
| Affiliate | 1/10 | 6/10 | Kritisk |
| **Snitt** | **3,4/10** | **6,8/10** | |

---

## MASTER ACTION PLAN

*Sorterat efter Impact × Genomförbarhet. Tid = uppskattad arbetstid.*

### 🔴 KRITISK (gör denna vecka)

**1. Ansök om affiliate-program — OpenAI, Anthropic, Google Cloud**  
*Vad:* Fyll i affiliate-ansökan på openai.com/affiliates och impact.com (Anthropic)  
*Hur:* Ansökningsformulär, 20 min per program  
*Tid:* 1 timme  
*Förväntad effekt:* 5 000–15 000 kr/mån vid nuvarande trafik, skalbar  
*Kritisk väg:* Godkänns inom 3–7 dagar, lägg sedan in länkarna

**2. Lägg till affiliate-CTA på alla modellsidor (8 sidor)**  
*Vad:* Naturlig "Redo att börja?"-sektion i slutet av varje modellsida  
*Hur:* Redigera ClaudePris.tsx, VadKostarChatGPT.tsx, GeminiPris.tsx, Gpt4Pris.tsx, Gpt5Pris.tsx, AnthropicClaudeApiPris.tsx, OpenAiApiPris.tsx, PerplexityPris.tsx  
*Tid:* 4 timmar  
*Förväntad effekt:* Omedelbar affiliate-intäkt från dag 1

**3. Förenkla EmailCaptureForm — ta bort friktionen**  
*Vad:* Minska från 3 element till email + en checkbox + knapp. Byt primär pitch till "Prisvarning" (transaktionellt, inget marknadsföringstillstånd krävs)  
*Hur:* Redigera EmailCaptureForm.tsx — ta bort consentGuide-texten, byt knapptext till "Bevaka mitt pris" (redan satt!)  
*Tid:* 2 timmar  
*Förväntad effekt:* Konverteringsgrad 2% → 5–8% = 2–3× fler leads

**4. Sociala delningsknappar på kalkylatorsresultatet**  
*Vad:* Twitter/X + LinkedIn knappar med förformulerad text direkt under ResultCards  
*Hur:* Lägg till i CalculatorSection-komponenten, `window.open(twitterUrl)`  
*Tid:* 3–4 timmar  
*Förväntad effekt:* Viral koefficient 0.1 → 0.3–0.5, organisk spridning

**5. Skapa LinkedIn-sida för Aikostnad.se**  
*Vad:* Company page på LinkedIn  
*Hur:* linkedin.com/company/setup/new  
*Tid:* 30 minuter  
*Förväntad effekt:* B2B-trovärdighet, kanal för CFO/HR-persona, backlink möjligheter

---

### 🟠 HÖG PRIORITET (vecka 2–3)

**6. Skicka tre mediepitchar — Breakit, DI Digital, Ny Teknik**  
*Vad:* Personliga e-postpitchar med datavinkeln "svenska AI-kostnader 73% dyrare än engelska"  
*Hur:* Mejl + LinkedIn till redaktörer. Bifoga ett one-pager med statistik.  
*Tid:* 3 timmar  
*Förväntad effekt:* En publicering = 1 000–5 000 besökare + domänauktoritetslänk

**7. Bygga email-automation sekvens i Resend (5-mail)**  
*Vad:* Välkomstmail + dag 3, 7, 14, 30 mails med content och soft commercial  
*Hur:* Resend sequences/workflows + personalisering baserat på providerId  
*Tid:* 1 dag  
*Förväntad effekt:* 35%+ open rate, retrafik, Pro-tier konvertering

**8. Ny sida: `/o3-pris` — OpenAI o3 kostnad i SEK**  
*Vad:* Dedikerad landningssida för o3 med kalkylator + guide  
*Hur:* Kopiera struktur från Gpt5Pris.tsx, anpassa innehåll, lägg till sitemap  
*Tid:* 4–6 timmar  
*Förväntad effekt:* 500–2 000 besök/mån inom 60 dagar

**9. Ny sida: `/gemini-25-pris` — Gemini 2.5 Pro pris**  
*Vad:* Dedikerad sida med kalkylator och jämförelse mot GPT-4o  
*Hur:* Kopiera GeminiPris.tsx, uppdatera för 2.5-specifika priser  
*Tid:* 4 timmar  
*Förväntad effekt:* 300–1 500 besök/mån

**10. Sticky email-CTA efter 50% scroll (alla sidor)**  
*Vad:* Diskret sticky bar: "📬 Bevaka AI-priser → [e-post]"  
*Hur:* Global komponent i App.tsx, useScrollPosition hook, Intersection Observer  
*Tid:* 4 timmar  
*Förväntad effekt:* +1–3% av samtliga besökare konverterar till leads

**11. Kör Lighthouse + PageSpeed Insights, åtgärda kritiska Core Web Vitals**  
*Vad:* Identifiera och fixa LCP > 3s och CLS > 0.1  
*Hur:* `npx lighthouse https://aikostnad.se --output json`, route-baserad lazy loading  
*Tid:* 4–8 timmar  
*Förväntad effekt:* Rankningssignal, bättre mobile-upplevelse

---

### 🟡 MEDEL PRIORITET (vecka 3–5)

**12. Branschsidor — 5 st: advokatbyrå, redovisning, e-handel, sjukvård, skola**  
*Vad:* Landningssidor med branschspecifika scenarier och inbyggd kalkylator  
*Hur:* Template-baserat, dela struktur från AiForForetag.tsx, branschanpassa  
*Tid:* 1 dag per sida = 5 dagar  
*Förväntad effekt:* 200–800 besök/mån per sida, longtail SEO-guld

**13. Dynamisk OG-bild för delade kalkyler (Vercel OG)**  
*Vad:* API-endpoint `/api/og` som genererar bild med kostnad + modell  
*Hur:* Vercel OG-library (vercel.com/docs/og), konfigurera i meta-taggar  
*Tid:* 1 dag  
*Förväntad effekt:* CTR på delade länkar +40–80%, viral koefficient ökar

**14. Embed-kampanj — marknadsför EmbedCalculator.tsx aktivt**  
*Vad:* Skapa `/embed`-landningssida med copy + kod + CTA till tech-bloggare  
*Hur:* Skapa EmbedLandningssida.tsx + kontakta 10 bloggare  
*Tid:* 4 timmar + 2 timmars outreach  
*Förväntad effekt:* 5–15 inlänkar inom 60 dagar

**15. "Jämför två scenarier"-funktion i kalkylatorn**  
*Vad:* "+ Lägg till Scenario B" skapar parallell kalkylator med kostnadsskillnad  
*Hur:* Utöka CalculatorSection med dual-state, visa "Du sparar X kr/mån om du byter modell"  
*Tid:* 2–3 dagar  
*Förväntad effekt:* Viralt delbart resultat, längre session-tid, SEO-signal

**16. Prishistorik-sida `/prisandringar`**  
*Vad:* Changelog med alla prisändringar sedan 2024 per modell i SEK  
*Hur:* Statisk markdown-sida initialt, sen automatiserad  
*Tid:* 4 timmar  
*Förväntad effekt:* Unik content-type i Sverige, shareable, crawl-signal

---

### 🟢 STRATEGISK (vecka 5–8)

**17. Stripe + Pro-tier MVP — teamkalkylator + export**  
*Vad:* 299 kr/mån Pro: teamkalkylator (antal anst × kostnad), Excel-export, prisvarningar  
*Hur:* Stripe Checkout + ny ProCalculator-komponent + email-triggers i Supabase  
*Tid:* 5–7 dagar  
*Förväntad effekt:* 10–30 subscribers dag 60 = 3 000–9 000 kr/mån återkommande intäkt

**18. Automatisera prisuppdatering (cron job)**  
*Vad:* Daglig kontroll av OpenAI/Anthropic pricing via scraping eller öppen API  
*Hur:* GitHub Actions + Playwright scraper + PR mot modelPricing.ts  
*Tid:* 2–3 dagar  
*Förväntad effekt:* Trovärdighet, automatisk sitemap-uppdatering, säkrar topical authority

**19. Podcast-pitch — Speja, Startuppodden, Techpodden**  
*Vad:* Picki som gäst om "AI-priser för svenska företag"  
*Hur:* Personlig LinkedIn + email. Vinkel: founder-story + unik data  
*Tid:* 2 timmar  
*Förväntad effekt:* 300–2 000 nya besökare per avsnitt, varumärkesbyggande, backlink

**20. Sponsordeal med första AI-konsult**  
*Vad:* 5 000–15 000 kr/mån för sponsrad sektion i /ai-for-foretag eller /ai-for-smaforetag  
*Hur:* LinkedIn-outreach till Sogeti, Viqtor Davis, Netlight med konkret pitch-deck  
*Tid:* 3 timmar (pitch) + förhandling  
*Förväntad effekt:* Direkt intäkt, trovärdighetsboost, möjlig co-authored artikel = backlink

---

## INTÄKTSPROGNOS — 60 DAGAR

| Intäktskälla | Dag 30 | Dag 60 | Förutsättning |
|-------------|--------|--------|---------------|
| Affiliate (OpenAI, Anthropic, Google) | 2 000–5 000 kr | 5 000–15 000 kr | Program godkänns vecka 1 |
| Sponsrat innehåll | 0 kr | 5 000–15 000 kr | Första sponsor vecka 4 |
| Pro-tier (MVP) | 0 kr | 3 000–9 000 kr | Stripe live vecka 6 |
| **Totalt** | **2 000–5 000 kr** | **13 000–39 000 kr** | |

*Konservativt scenario: 13 000 kr/mån dag 60. Optimistiskt: 39 000 kr/mån.*  
*100 000 kr/mån är realistiskt inom 4–6 månader om SEO-plan + Pro-tier exekveras.*

---

## KRITISKA RISKER

**Risk 1: Konkurrent lanserar liknande svensk sajt**  
Sannolikhet: medel (12–18 månader). Motåtgärd: bygga varumärke, backlinks och e-postlista så snabbt som möjligt — de är de svåraste sakerna att kopiera.

**Risk 2: OpenAI/Google bygger inbyggda kostnadsräknare**  
Sannolikhet: låg (deras incitament är att dölja kostnader, inte exponera dem). Motåtgärd: differentiera med SEK + GDPR + oberoende perspektiv.

**Risk 3: Affiliate-programmen godkänner inte**  
Sannolikhet: låg (sajten är legitim och nischad). Motåtgärd: ha Google Cloud och Cursor som backup — dessa godkänner snabbt.

**Risk 4: Manuell prisuppdatering skapar faktafel**  
Sannolikhet: hög (priserna ändras ofta Q2 2026). Motåtgärd: automatisera prissynk (punkt 18 ovan) inom 60 dagar.

---

*Analys baserad på: fullständig kodbasgenomgång (src/pages 34 tsx-filer, src/components EmailCaptureForm.tsx, Home.tsx), sitemap.xml (34 URLs), analys-2026.md, distribution/seo-outreach.md, konkurrentanalys av aipricing.guru och pricepertoken.com.*

*Genomförd: 26 maj 2026*
