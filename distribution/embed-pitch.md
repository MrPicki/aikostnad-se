# Embed-pitch — aikostnad.se
*Färdiga mailmallar för att pitcha embed-kalkylatorn till bloggar och mediehus.*

---

## STANDARDMALL (universell version)

**Ämnesrad:** Gratis interaktiv widget: AI-kostnadskalkylator för era läsare (ingen kod krävs)

**Mailkropp:**

Hej [namn],

Jag hittade er artikel om [specifik AI-artikel på deras sajt] och tänkte att era läsare kanske uppskattar ett praktiskt verktyg som kompletterar det ni skriver om.

Vi har byggt aikostnad.se — Sveriges enda AI-kostnadskalkylator. Den räknar ut vad AI-modeller faktiskt kostar i svenska kronor, med korrekt tokensfaktor för svenska texter (30% högre än engelska, vilket de flesta inte vet om).

Ni kan embedda kalkylatorn direkt på er sajt med en enda rad HTML. Ser ut som en del av er sajt. Fungerar direkt. Kräver ingen registrering av era läsare.

Varför det ger värde till era läsare:
→ Konkret och interaktivt — de kan räkna på sin egen situation
→ Unikt för Sverige — ingen annan kalkylator räknar i SEK med svensk tokensfaktor
→ Gratis och utan annonsering

Embedkoden hittar ni nedan. Testa den gärna — tar 2 minuter att sätta upp.

Hör av er om ni har frågor eller vill ha en anpassad version.

Christoffer Nolet
Grundare, aikostnad.se
christoffer.nolet@gmail.com

---

**EMBEDKOD (kopiera och klistra in):**

```html
<!-- Aikostnad.se — AI-kostnadskalkylator -->
<iframe
  src="https://aikostnad.se/embed"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);"
  title="AI-kostnadskalkylator — aikostnad.se"
  loading="lazy">
</iframe>
<p style="font-size: 0.8em; color: #666; margin-top: 4px;">
  Drivs av <a href="https://aikostnad.se" target="_blank" rel="noopener">aikostnad.se</a>
</p>
```

---

## ANPASSAD VERSION FÖR TECH-BLOGGAR

**Ämnesrad:** Widget-förfrågan: interaktiv AI-priskalkylator för [bloggens namn]

**Mailkropp:**

Hej [namn],

Jag läste ert inlägg om [specifikt inlägg] — bra genomgång. En sak som saknas i de flesta AI-guider för svenska läsare är konkreta kronor. Alla prisuppgifter är i dollar och räknar inte på att svenska text kostar 30% mer att processa.

Vi byggde aikostnad.se för att lösa det. Kalkylatorn:
- Räknar i SEK (löpande valutauppdatering)
- Applicerar 1,3 tokens/ord för svenska texter automatiskt
- Jämför GPT-4o, GPT-5, Claude 3.5, Gemini och deras budgetalternativ

Ni kan embedda den med en enda iframe — ingen integration, ingen kod, fungerar direkt. Era läsare kan räkna på sin faktiska användning utan att lämna er sajt.

Embedkod:

```html
<iframe src="https://aikostnad.se/embed" width="100%" height="600" frameborder="0" style="border-radius:8px;" title="AI-kostnadskalkylator"></iframe>
```

Hör av er om ni testar den — gärna med feedback också.

Christoffer Nolet | aikostnad.se | christoffer.nolet@gmail.com

---

## ANPASSAD VERSION FÖR HR/MANAGEMENTBLOGGAR

**Ämnesrad:** Resurstips till era läsare: AI-kostnadskalkylator för svenska chefer

**Mailkropp:**

Hej [namn],

Era läsare — chefer och HR-proffs som fattar AI-budgetbeslut — saknar ett enkelt verktyg för att räkna på vad AI faktiskt kostar.

Vi byggde aikostnad.se: ange antal anställda, beräknad AI-användning, välj modell — och få ut en månadskostnad i kronor. Inget snack om dollar eller tokens.

Det tar 2 minuter att använda och svarar på den vanligaste frågan: "Vad borde vi budgetera för AI 2026?"

Ni kan lägga till kalkylatorn på er sajt som en inbäddad widget:

```html
<iframe src="https://aikostnad.se/embed" width="100%" height="600" frameborder="0" style="border-radius:8px;" title="AI-kostnadskalkylator — aikostnad.se"></iframe>
```

Fungerar direkt. Kräver ingenting av era läsare.

Christoffer Nolet | aikostnad.se | christoffer.nolet@gmail.com

---

## ANPASSAD VERSION FÖR PODDAR (visa-notes / resursida)

**Ämnesrad:** Resurstips till avsnittet om AI-kostnader — gratis kalkylator

**Mailkropp:**

Hej [namn],

Jag lyssnade på ert avsnitt om [specifikt avsnitt] — bra genomgång av AI-kostnadsutmaningarna.

En konkret resurs som era lyssnare kan ha nytta av: aikostnad.se — en gratis kalkylator som räknar ut AI-kostnader i svenska kronor. Ingen registrering, fungerar direkt.

Räknar med korrekt tokensfaktor för svenska texter (1,3 tokens/ord vs 1,0 för engelska) — den faktor som gör att de flesta budgetar är fel från start.

Om ni lägger ut show-notes eller resurssidor till era avsnitt: gärna med en länk eller embedkod.

Embedkod om ni vill testa det på er hemsida:

```html
<iframe src="https://aikostnad.se/embed" width="100%" height="600" frameborder="0" style="border-radius:8px;" title="AI-kostnadskalkylator"></iframe>
```

Hör av er om ni vill ha mer info eller är intresserade av en intervju om AI-prissättning.

Christoffer Nolet | aikostnad.se | christoffer.nolet@gmail.com

---

## UPPFÖLJNINGSMALL (om inget svar efter 7 dagar)

**Ämnesrad:** Re: Gratis AI-kostnadskalkylator för [deras sajtnamn]

**Mailkropp:**

Hej [namn],

Hörde av mig för en vecka sedan angående en embed-widget till er sajt.

Kortversion: aikostnad.se är en gratis AI-kostnadskalkylator för svenska texter i kronor. En enda rad HTML att embedda. Tar 2 minuter att testa.

Om ni är intresserade: testa kalkylatorn på aikostnad.se och hör av er.

Annars inga problem — fortsätt det bra arbetet!

Christoffer

---

## TEKNISK SPECIFIKATION FÖR EMBEDDEN

**Rekommenderad implementering:**

```html
<!-- Minimal embed -->
<iframe src="https://aikostnad.se/embed" width="100%" height="600" frameborder="0"></iframe>

<!-- Med styling -->
<div style="max-width:800px; margin:0 auto;">
  <iframe
    src="https://aikostnad.se/embed"
    width="100%"
    height="600"
    frameborder="0"
    style="border-radius:8px; box-shadow:0 2px 12px rgba(0,0,0,0.08);"
    title="AI-kostnadskalkylator — aikostnad.se"
    loading="lazy">
  </iframe>
</div>

<!-- Med rubrik och attribut -->
<h3>Räkna ut din AI-kostnad</h3>
<p>Kalkylatorn nedan beräknar vad AI-modeller faktiskt kostar dig i svenska kronor.</p>
<iframe src="https://aikostnad.se/embed" width="100%" height="600" frameborder="0" style="border-radius:8px;"></iframe>
<p><small>Kalkylator från <a href="https://aikostnad.se">aikostnad.se</a></small></p>
```

**Tekniska krav:**
- Ingen API-nyckel behövs
- Responsiv — fungerar på mobil och desktop
- Ingen cookie-policy-påverkan (kalkylatorn sparar ingen data)
- Laddningstid: < 500ms
- Inga externa dependencies som påverkar sidprestanda

**Vad embedden visar:**
- Modellväljare (GPT-4o, GPT-5, Claude 3.5, Gemini med flera)
- Inputfält för volym (ord/tokens/requests)
- Resultat i SEK per månad
- Jämförelsetabell för valda modeller
- Caching-besparing indikator

**Anpassningsmöjligheter:**
Kontakta christoffer.nolet@gmail.com för vit-märkt version eller specifika modellurval anpassade till er publik.
