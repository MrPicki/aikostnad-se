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

const article = articles["ai-for-redovisning"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI-baserad kvittoanalys för ett redovisningsbolag?",
    answer:
      "Med GPT-4o mini och 200 kvitton per dag (4 400 per månad) uppgår API-kostnaden till under 10 SEK per månad. En redovisningsbyrå som manuellt hanterar kvittona lägger ca 5–10 minuter per kvitto på inmatning och kategorisering. AI reducerar det till sekunder och frigör bokförarens tid till mer kvalificerade uppgifter som analys och rådgivning.",
  },
  {
    question: "Är GPT-4o mini tillräckligt bra för bokföring och redovisning?",
    answer:
      "För repetitiva, väldefinierade uppgifter som kvittoklassificering, datautdrag och standardiserade rapportmallar är GPT-4o mini tillräckligt bra och betydligt billigare än Sonnet eller GPT-4o. För komplexa skatteanalyser, bedömning av gränsfall eller tolkning av oklara skattelagstiftningar rekommenderas en kraftfullare modell som Claude Sonnet 4.6. Börja med mini och uppgradera om kvaliteten inte räcker.",
  },
  {
    question: "Kan AI göra bokföring automatiskt?",
    answer:
      "AI kan automatisera delar av bokföringsprocessen — kategorisera transaktioner, extrahera data från kvitton och fakturor, matcha mot kontoplan och flagga avvikelser. Men AI ersätter inte en auktoriserad redovisningskonsult eller revisor. Det juridiska ansvaret för bokföringens riktighet ligger alltid hos den behöriga personen. AI är ett verktyg för att öka throughput och minska manuellt arbete, inte för att ta över professionellt ansvar.",
  },
  {
    question: "Vilka AI-verktyg finns specifikt för redovisning i Sverige?",
    answer:
      "Det finns specialiserade redovisningsverktyg som integrerar AI: Fortnox AI (automatisk kontering), Visma (AI-driven fakturahantering) och flera internationella alternativ. Dessa bygger ofta på OpenAI eller liknande API:er under huven. Om du vill bygga en skräddarsydd lösning för din byrå är direkt API-integration med GPT-4o mini eller Claude ett effektivt alternativ som ger full kontroll över kostnader och funktioner.",
  },
];

export function AiForRedovisning() {
  return (
    <>
      <SEO
        title="AI för redovisning och bokföring — kostnader och guide (2026)"
        description="AI-kostnader för redovisningsbyråer och bokförare: kvittoanalys, skattefrågor och rapportgenerering. GPT-4o mini för hög volym och låg kostnad. Maj 2026."
        canonical="/ai-for-redovisning"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för redovisning", url: "https://aikostnad.se/ai-for-redovisning" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            AI för redovisning och bokföring — kostnader och guide (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilket AI passar en redovisningsbyrå?"
            answer={
              <>
                <strong>GPT-4o mini</strong> är det primära valet för hög volym och repetitiva uppgifter som kvittoanalys och kontering — extremt låg kostnad, 1,58 SEK/Mtok input. För komplexa skattefrågor och rapporter med hög precision: <strong>Claude Sonnet 4.6</strong>. API-kostnad för 200 kvitton/dag är <strong>under 10 SEK/mån</strong>.
              </>
            }
            bullets={[
              "Rekommenderad modell: GPT-4o mini (hög volym, repetitivt, billigast)",
              "Kvittoanalys 200/dag: under 10 SEK i API-kostnad per månad",
              "Skattefråge-chatbot 50 frågor/dag: ~3–5 SEK/mån",
              "Rapportgenerering 20/mån: under 1 SEK/mån",
              "Uppgradera till Sonnet för komplexa skattetolkningar",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Redovisning är en av de branscher där AI ger störst omedelbar effekt. Kvittohantering,
            fakturakontering, skattefrågechatbotar och rapportgenerering är alla väldefinierade,
            repetitiva uppgifter som AI hanterar exceptionellt bra. Och till extremt låga kostnader
            — GPT-4o mini gör samma arbete som ett abonnemang till en bråkdel av priset. Den här
            guiden ger konkreta kostnader, scenario-beräkningar och en praktisk guide för hur
            en redovisningsbyrå eller ett bokföringsbolag börjar med AI.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">De tre mest lönsamma AI-tillämpningarna i redovisning</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6">1. Kvittoanalys och automatisk kontering</h3>
            <p className="text-gray-700 leading-relaxed">
              En kund fotograferar ett kvitto. AI extraherar belopp, datum, leverantör och
              moms-kod, matchar mot er kontoplan och föreslår rätt kontering. En bokförare
              granskar och godkänner. Det som tidigare tog 5–10 minuter per kvitto tar nu
              30 sekunder. Vid 200 kvitton per dag frigörs nästan 20 bokföringstimmar dagligen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              API-kostnaden för denna volym med GPT-4o mini är under 10 SEK per månad.
              En enda bokförartimme sparad per dag är mer än 5 000 gånger mer värd.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Skattefråge-chatbot för klienter</h3>
            <p className="text-gray-700 leading-relaxed">
              En välkonfigurerad AI-chatbot med din byrås skatterättsliga kunskapsbas kan svara
              på vanliga frågor — representationsregler, avdragsrätt för hemmakontor, F-skattens
              funktion och rutavdrag. Klienter får svar dygnet runt, och era redovisningskonsulter
              besvarar bara de komplexa frågorna som kräver professionell bedömning.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Med 50 klientfrågor per dag och GPT-4o mini uppgår månadsnotan till 3–5 SEK.
              Vill ni använda Claude Sonnet för mer nyanserade svar blir kostnaden ca 40–60 SEK/mån.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Automatiserad rapportgenerering</h3>
            <p className="text-gray-700 leading-relaxed">
              Månadsrapporter, kvartalsbokslut och årsredovisningskommentarer följer ofta
              ett standardformat. AI kan ta finansiell rådata och generera kommentarstexter,
              sammanfattningar och avvikelseanalyser på svenska. För 20 standardrapporter
              per månad är API-kostnaden under 1 SEK — bokstavligen försumbar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Komplexa årsredovisningar med strikta formatkrav bör alltid granskas noggrant
              av en auktoriserad revisor. AI är ett verktyg för textutkast, inte för juridiskt
              bindande revisorsintyg.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Scenario-tabell: tre konkreta use-cases</h2>
            <p className="text-gray-700 leading-relaxed">
              Beräkningar med GPT-4o mini (1,575 SEK/Mtok input, 6,30 SEK/Mtok output).
              22 arbetsdagar per månad. Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Use-case</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Volym</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API-kostnad/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Sparad tid/mån</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Kvittoanalys</td>
                    <td className="px-3 py-2">200 kvitton/dag</td>
                    <td className="px-3 py-2 text-right font-bold">&lt;10 SEK</td>
                    <td className="px-3 py-2">~20 timmar/dag</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Skattefråge-chatbot</td>
                    <td className="px-3 py-2">50 frågor/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~4 SEK</td>
                    <td className="px-3 py-2">~15 rådgivningstimmar</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Rapportgenerering</td>
                    <td className="px-3 py-2">20 rapporter/mån</td>
                    <td className="px-3 py-2 text-right font-bold">&lt;1 SEK</td>
                    <td className="px-3 py-2">~5 timmar</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Kvittoanalys: 200 input-tokens/kvitto, 100 output-tokens. Skattefrågor: 300 input,
              400 output. Rapporter: 3 000 input, 2 000 output. 22 dagar/mån.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GPT-4o mini vs Claude Sonnet — när väljer du vad?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Uppgift</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Rekommendation</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Motivering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2">Kvittoklassificering</td>
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2">Enkel extraktion, hög volym, minimal kostnad</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2">Fakturamatching</td>
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2">Strukturerad data, väldefinierad uppgift</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2">Komplex skattefråga</td>
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2">Kräver nyansering, längre resonemang</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2">Årsredovisningskommentar</td>
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2">Formell svenska, koherens viktig</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2">Standardrapport</td>
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2">Mallbaserat, volymgenerering</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR och bokföringssekretess</h2>
            <p className="text-gray-700 leading-relaxed">
              Redovisningsbyråer hanterar känslig finansiell information om klienter —
              personuppgifter, löner, ekonomiska transaktioner. Innan ni skickar klientdata
              till ett AI-API behöver ni ha ett Data Processing Agreement (DPA) med leverantören.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Praktiska GDPR-steg</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>Teckna DPA med OpenAI Enterprise eller Anthropic Enterprise</li>
                <li>Anonymisera personnummer och klientnamn i kvitton och fakturor innan AI-bearbetning om möjligt</li>
                <li>Välj EU-region för databearbetning om er leverantör erbjuder det</li>
                <li>Inkludera AI-behandling i er registerförteckning och informera klienter via integritetspolicy</li>
                <li>Kontrollera att leverantören inte tränar på er API-data (OpenAI och Anthropic gör det inte per default)</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på din redovisningsbyrå</h2>
            <p className="text-gray-700 leading-relaxed">
              Fyll i din volym i{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              och se exakt vad GPT-4o mini eller Claude Sonnet kostar för ditt specifika
              flöde — kvitton, skattefrågor och rapporter — i SEK per månad.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">
                  Djupanalys av GPT-4o mini och Claude Haiku
                </Link>
              </li>
              <li>
                <Link to="/ai-for-smaforetag" className="text-indigo-600 hover:underline">
                  AI för småföretag — ROI-kalkyl och steg för steg
                </Link>
              </li>
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-indigo-600 hover:underline">
                  Bygga en AI-chatbot — komplett budgetguide
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI för redovisning och bokföring är 2026 en av de mest lönsamma investeringarna
              en byrå kan göra. GPT-4o mini hanterar kvittoanalys och standardrapporter till
              försumbar kostnad. Claude Sonnet är rätt val för komplexa skattefrågor och formell
              svenska. Sätt upp rätt GDPR-avtal, börja med ett pilotprojekt på icke-känslig data
              och mät faktisk tidsbesparing. Kostnadsbesparingen är inte i API-avgifterna —
              den är i frigjord bokföringstid.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras. Verifiera alltid mot respektive leverantörs prislista.
              Rådgör med er DPO innan ni hanterar klientdata i AI-system. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-redovisning"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI för redovisning" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
