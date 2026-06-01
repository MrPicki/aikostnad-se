import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const article = articles["ai-kostnad-per-manad"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI i genomsnitt per månad för ett litet företag?",
    answer:
      "Det beror helt på användningen. En liten chatbot med GPT-4o mini kan kosta 20–50 kr per månad. En mer avancerad setup med Claude Sonnet för textgenerering och dokumentanalys hamnar typiskt på 300–1 000 kr/mån. De flesta småföretag med ett eller ett par use cases hamnar mellan 100 och 2 000 kr per månad via API. Abonnemang som ChatGPT Plus kostar 209 SEK/mån per användare.",
  },
  {
    question: "Är det billigare med API eller abonnemang?",
    answer:
      "API är nästan alltid billigare vid låg till medelhög användning — men kräver teknisk kompetens att sätta upp. ChatGPT Plus till 209 kr/mån inkluderar obegränsad interaktiv användning av GPT-4o, GPT-4.1 och bildgenerering. Via API betalar du per token, vilket är billigare om du skickar under ~5 miljoner tokens/mån. Vid hög volym (en chatbot med 10 000+ frågor/dag) är API-prissättning klart förmånligare.",
  },
  {
    question: "Hur räknar jag ut vad AI kostar per anställd?",
    answer:
      "Dividera din totala AI-kostnad (API-notor + abonnemang) med antalet aktiva användare. En marknadsföringsbyrå med 10 anställda som delar ett ChatGPT Team-konto betalar ca 250 kr per person och månad. Om samma byrå dessutom använder Claude Sonnet API för längre artiklar kan det tillkomma 50–200 kr/person beroende på volym. Typiskt hamnar kostnaden per aktiv AI-användare på 100–500 SEK/mån.",
  },
  {
    question: "Hur budgeterar jag AI-kostnader för ett år?",
    answer:
      "Börja med att kartlägga dina faktiska use cases och uppskatta månadsvolym per use case. Räkna sedan på API-kostnad med faktiska token-priser (använd kalkylatorn på aikostnad.se). Lägg till en tillväxtfaktor på 30–50 % — AI-användning tenderar att växa snabbt när team väl börjar använda det. Sätt ett budgettak i API-kontot och övervaka kostnaderna månadsvis. Många team underskattar year-over-year tillväxten.",
  },
  {
    question: "Varför skjuter AI-kostnaden i höjden oväntat?",
    answer:
      "De vanligaste orsakerna är: (1) Ingen volumsgräns satt i API-kontot, (2) Fel modellval — en utvecklare valde GPT-5 istället för GPT-4.1 i produktionskod, (3) En loop-bug som skickar förfrågningar obegränsat, (4) Outfallet input-tokens räknas fel — glömda system-promptar eller långa historik-kedjor. Sätt alltid ett hårt månadstak i API-inställningarna och använd logging för att se vilka endpoints som drar mest tokens.",
  },
];

export function AiKostnadPerManad() {
  return (
    <>
      <SEO
        title="AI-kostnad per månad — räkna ut vad AI kostar ditt företag"
        description="Genomsnittliga AI-kostnader per månad för chatbot, textgenerering och analys. Skillnad abonnemang vs API, hur du budgeterar och typiska kostnader per anställd. Maj 2026."
        canonical="/ai-kostnad-per-manad"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI-kostnad per månad", url: "https://aikostnad.se/ai-kostnad-per-manad" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Vad kostar AI per månad? Räkna ut din faktiska kostnad
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar AI per månad för ett företag?"
            answer={
              <>
                Allt från <strong>20 kr/mån</strong> (liten kundtjänst-chatbot med GPT-4o mini) till{" "}
                <strong>50 000+ kr/mån</strong> (hög-volym SaaS-applikation). Nyckeln är rätt
                modellval — GPT-4o mini är upp till 15 gånger billigare än GPT-4o för
                samma uppgift. Abonnemang som ChatGPT Plus kostar 209 SEK/user/mån och
                räcker för de flesta privatanvändare och frilansare.
              </>
            }
            bullets={[
              "Liten chatbot (GPT-4o mini): 20–50 kr/mån",
              "Textgenerering (Claude Sonnet): 300–800 kr/mån",
              "Dokumentanalys (GPT-4.1): 200–500 kr/mån",
              "SaaS med 1 000 MAU: 200–2 000 kr/mån beroende på modell",
              "ChatGPT Plus per användare: 209 SEK/mån",
              "API är billigare än abonnemang vid medelhög volym",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            AI-kostnader är sällan stora — men de är oförutsägbara om du inte förstår
            prissättningsmodellen. Den här guiden ger konkreta siffror för de vanligaste
            affärsscenariona och förklarar skillnaden mellan att betala per abonnemang
            kontra per token via API. Alla belopp i svenska kronor.
          </p>

          {/* Subscription vs API */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Abonnemang eller API — vad passar ditt företag?</h2>
            <p className="text-gray-700 leading-relaxed">
              Det finns två sätt att betala för AI: <strong>abonnemang</strong> (fast månadsavgift
              per användare) och <strong>API</strong> (betala per token du faktiskt använder).
              Valet beror på volym och teknisk kompetens.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Produkt</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Pris SEK/user/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Inkluderar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Plus</td>
                    <td className="px-3 py-2 text-right">209 kr</td>
                    <td className="px-3 py-2">GPT-4o, GPT-4.1, bildgenerering, webbsökning</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Pro</td>
                    <td className="px-3 py-2 text-right">2 100 kr</td>
                    <td className="px-3 py-2">GPT-5 interaktivt, o3, obegränsat</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Team</td>
                    <td className="px-3 py-2 text-right">ca 252 kr</td>
                    <td className="px-3 py-2">Plus-funktioner + team-workspace (min 2 pers)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Pro</td>
                    <td className="px-3 py-2 text-right">210 kr</td>
                    <td className="px-3 py-2">Claude Sonnet 4.6, ökad kontext, prioritet</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini Advanced</td>
                    <td className="px-3 py-2 text-right">109 kr</td>
                    <td className="px-3 py-2">Gemini 2.5 Pro, Google Workspace-integration</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tumregel: om du eller din kollega sitter med webbgränssnittet och
              skriver in frågor manuellt — välj ett abonnemang. Om du <em>bygger</em>{" "}
              något som automatiskt anropar AI (en chatbot, ett skript, en integration)
              — använd API. API är nästan alltid billigare per token vid hög automatiserad volym.
            </p>
          </section>

          {/* Use case scenarios */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Månadskostnad per use case — konkreta exempel</h2>
            <p className="text-gray-700 leading-relaxed">
              Här är fyra vanliga affärsscenarier med beräknad månadskostnad baserat på
              typiska token-volymer och aktuella API-priser (maj 2026, 10,50 SEK/USD).
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Scenario 1: Litet e-handelsföretag med kundtjänst-chatbot</h3>
            <p className="text-gray-700 leading-relaxed">
              Ett litet e-handelsföretag med ca 1 000 kundförfrågningar per dag (returstatus,
              leveransfrågor, produktfrågor). Enkla svar som inte kräver komplex
              resonering — GPT-4o mini räcker utmärkt.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-700">
              <p><strong>Volym:</strong> 1 000 frågor/dag × 22 dagar = 22 000/mån</p>
              <p><strong>Tokens:</strong> 100 input + 200 output × 22 000 = 2,2M input + 4,4M output</p>
              <p><strong>Kostnad med GPT-4o mini:</strong> 2,2 × 1,58 + 4,4 × 6,30 = 3,48 + 27,72 ≈ <strong>31 kr/mån</strong></p>
              <p><strong>Med GPT-4o:</strong> 2,2 × 26,25 + 4,4 × 105 ≈ <strong>519 kr/mån</strong></p>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              GPT-4o mini är 16 gånger billigare för samma uppgift. Vid standardiserade
              kundtjänstfrågor är kvalitetsskillnaden marginell.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Scenario 2: Marknadsföringsbyrå, innehållsproduktion</h3>
            <p className="text-gray-700 leading-relaxed">
              En marknadsföringsbyrå som genererar 100 blogginlägg per månad via AI,
              varje artikel ca 800 ord (≈1 100 tokens output) med en 200-ords briefing
              som input (≈260 tokens). Claude Sonnet 4.6 väljs för sin svenska
              språkkvalitet.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-700">
              <p><strong>Input:</strong> 260 tokens × 100 = 26 000 tokens = 0,026 Mtok</p>
              <p><strong>Output:</strong> 1 100 tokens × 100 = 110 000 tokens = 0,11 Mtok</p>
              <p><strong>Kostnad Claude Sonnet:</strong> 0,026 × 31,50 + 0,11 × 157,50 = 0,82 + 17,33 ≈ <strong>18 kr/mån</strong></p>
              <p><strong>Med granskning, iterationer (5× multiplikator):</strong> ≈ <strong>90–500 kr/mån</strong></p>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Ren generering är billig. Den verkliga kostnaden tillkommer av iterationer,
              redigering och längre system-promptar. Räkna med 5–10× den rena generationskostnaden
              i verklig drift.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Scenario 3: Advokatbyrå, dokumentanalys</h3>
            <p className="text-gray-700 leading-relaxed">
              En advokatbyrå analyserar 200 kontrakt per månad med AI för att extrahera
              nyckelklausuler och flagga risker. Varje kontrakt är ca 5 000 ord
              (≈6 500 tokens input) med ca 500-ords sammanfattning som output. GPT-4.1
              väljs för precision och lågt pris relativt GPT-5.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-700">
              <p><strong>Input:</strong> 6 500 × 200 = 1,3 Mtok</p>
              <p><strong>Output:</strong> 650 × 200 = 0,13 Mtok</p>
              <p><strong>Kostnad GPT-4.1:</strong> 1,3 × 21 + 0,13 × 84 = 27,30 + 10,92 ≈ <strong>308 kr/mån</strong></p>
              <p><strong>Med GPT-5 (om precision krävs):</strong> 1,3 × 157,50 + 0,13 × 630 ≈ <strong>2 047 kr/mån</strong></p>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Dokumentanalys är input-tung — fokus bör ligga på att minimera
              input-kostnaden. GPT-4.1 ger utmärkt precision för kontraktsanalys
              till en sjundedel av GPT-5:s pris.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Scenario 4: SaaS startup med inbyggd AI-assistent</h3>
            <p className="text-gray-700 leading-relaxed">
              En SaaS-startup har 1 000 månatliga aktiva användare (MAU) som var och en
              ställer 20 frågor per månad till en inbyggd AI-assistent. Varje fråga:
              200 tokens input, 300 tokens output.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-700">
              <p><strong>Totalt:</strong> 1 000 × 20 = 20 000 förfrågningar/mån</p>
              <p><strong>Input:</strong> 200 × 20 000 = 4 Mtok | <strong>Output:</strong> 300 × 20 000 = 6 Mtok</p>
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Kostnad/mån (SEK)</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Kostnad per MAU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right font-bold">~44 kr</td>
                    <td className="px-3 py-2 text-right">0,044 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini 2.5 Flash</td>
                    <td className="px-3 py-2 text-right font-bold">~170 kr</td>
                    <td className="px-3 py-2 text-right">0,17 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-right font-bold">~588 kr</td>
                    <td className="px-3 py-2 text-right">0,59 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2 text-right font-bold">~1 071 kr</td>
                    <td className="px-3 py-2 text-right">1,07 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-5</td>
                    <td className="px-3 py-2 text-right font-bold">~4 410 kr</td>
                    <td className="px-3 py-2 text-right">4,41 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              AI-kostnaden per användare är försumbar för de flesta SaaS-produkter —
              men skalar linjärt med MAU. Vid 10 000 MAU multipliceras siffrorna med 10.
              Modellvalet är kritiskt vid skalning.
            </p>
          </section>

          {/* Budgeting tips */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Så budgeterar du AI-kostnader rätt</h2>
            <p className="text-gray-700 leading-relaxed">
              De vanligaste misstagen med AI-budgetar är att underskatta volymtillväxt
              och att använda en för dyr modell i produktionskod. Här är ett
              strukturerat tillvägagångssätt:
            </p>

            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-brand-900">Steg-för-steg budgetplanering</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li><strong>Kartlägg use cases:</strong> Lista varje AI-användning separat med uppskattad volym (förfrågningar/mån)</li>
                <li><strong>Räkna tokens:</strong> Uppskatta genomsnittlig input och output i tokens per förfrågan</li>
                <li><strong>Välj rätt modell per use case:</strong> Använd inte GPT-5 om GPT-4o mini ger tillräcklig kvalitet</li>
                <li><strong>Lägg till tillväxtfaktor:</strong> Räkna med 30–100 % volymökning det första året</li>
                <li><strong>Sätt hårda tak i API-kontot:</strong> Undvik kostnadschockar med usage limits</li>
                <li><strong>Övervaka månadsvis:</strong> Sätt upp alerts vid 50 % och 80 % av budgettaket</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Hur mycket spenderar svenska företag på AI?</h3>
            <p className="text-gray-700 leading-relaxed">
              Baserat på marknadsdata från 2026 spenderar ett genomsnittligt svenskt
              SME med 10–50 anställda runt 2 000–10 000 SEK per månad på AI-verktyg
              totalt — inklusive abonnemang (ChatGPT Team, Copilot), API-kostnader och
              specialverktyg som Midjourney eller Perplexity Pro. Kostnad per anställd
              tenderar att landa på 200–500 SEK/mån för aktiva AI-användare.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Startups som bygger AI-drivna produkter spenderar typiskt 3–8 % av sina
              driftkostnader på AI-infrastruktur under tillväxtfasen. När produkten
              mognar och modellval optimerats sjunker andelen vanligtvis till under 2 %.
            </p>
          </section>

          {/* Reduce costs */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Fem sätt att sänka din AI-nota</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Välj rätt modell per uppgift.</strong> GPT-4o mini kostar 1,58 kr/Mtok
                input — GPT-4o kostar 26,25 kr. För enkla klassificeringar och standardsvar
                är skillnaden i kvalitet marginell men prisskillnaden är 16×.
              </li>
              <li>
                <strong>Implementera prompt caching.</strong> Om din system-prompt är 1 000+ ord
                och återanvänds i varje konversation — cacha den. Claude Anthropic erbjuder
                90 % rabatt på cachad input, OpenAI har automatisk caching på vissa modeller.
                Läs mer om{" "}
                <Link to="/prompt-caching" className="text-brand-700 hover:underline">
                  hur prompt caching fungerar
                </Link>.
              </li>
              <li>
                <strong>Begränsa output-längden.</strong> Output-tokens kostar mer än input.
                Specificera explicit i din prompt att svaret ska vara kortfattat om du inte
                behöver långa svar.
              </li>
              <li>
                <strong>Deduplicera och cacha svar.</strong> Om samma fråga ställs ofta
                (t.ex. "Vad är er returpolicy?") — cacha svaret i din applikation och
                skicka det utan API-anrop.
              </li>
              <li>
                <strong>A/B-testa modeller regelbundet.</strong> AI-marknaden rör sig snabbt.
                En modell som var 50 % dyrare förra kvartalet kan idag vara billigare eller
                bättre. Kör periodiska utvärderingar.
              </li>
            </ol>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Exemplen ovan är typiska scenarion — din faktiska kostnad beror på volym,
              prompt-längd och modellval.{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i dina egna siffror och se exakt månadskostnad i SEK
              för alla populära modeller sida vid sida.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/billigaste-ai" className="text-brand-700 hover:underline">
                  Billigaste AI 2026
                </Link>{" "}
                — jämför de billigaste modellerna för att sänka din månadsnota
              </li>
              <li>
                <Link to="/ai-api-kostnad" className="text-brand-700 hover:underline">
                  AI API-kostnad för app-builders
                </Link>{" "}
                — hur du integrerar AI i en produkt kostnadseffektivt
              </li>
              <li>
                <Link to="/vad-kostar-ai-per-ar" className="text-brand-700 hover:underline">
                  Vad kostar AI per år?
                </Link>{" "}
                — planera en realistisk AI-årsbudget
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI-kostnader per månad spänner från 20 kr (liten automatiserad chatbot
              med GPT-4o mini) till 50 000+ kr (hög-volym produktionsapplikation med
              premiummodeller). De flesta svenska SME-företag hamnar på 500–5 000 kr/mån
              när de börjar bygga med AI på allvar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Det viktigaste beslutet är modellvalet — skillnaden mellan GPT-4o mini
              och GPT-4o är 16× per token. Rätt modell för rätt uppgift är den
              effektivaste kostnadsoptimeringen du kan göra. Kör alltid ett
              kvalitetstest med billigare modeller först innan du binder upp dig vid
              premiumpriserna.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser och abonnemang kan ändras varje månad. Verifiera alltid mot
              leverantörernas officiella prislistor. Senast verifierade 2026-05-25.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-kostnad-per-manad"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-kostnad per månad" />

        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
