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
import { trackEvent } from "../utils/analytics";

const article = articles["openai-api-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vilken OpenAI-modell är billigast för en enkel chatbot?",
    answer:
      "GPT-4o mini är den billigaste mainstream-modellen från OpenAI: 1,58 SEK per miljon input-tokens och 6,30 SEK per miljon output-tokens ($0,15/$0,60). För en chatbot med 1 000 frågor per dag kostar det under 50 SEK per månad. Om kraven är ännu lägre kan text-embedding-3-small (0,21 SEK/Mtok) kombineras med en enklare sökarkitektur.",
  },
  {
    question: "Vad är skillnaden mellan GPT-4o och GPT-4.1?",
    answer:
      "GPT-4.1 är OpenAI:s senaste och mest kapabla mainstream-modell (maj 2026) och presterar bättre än GPT-4o på kodning och instruktionsföljning. GPT-4.1 kostar $2/$8 per Mtok (21/84 SEK) mot GPT-4o:s $2,50/$10 (26,25/105 SEK) — så GPT-4.1 är faktiskt lite billigare och bättre. GPT-4o är ändå relevant om din kod redan är skriven mot den modellen eller om du behöver realtids-ljud.",
  },
  {
    question: "Hur fungerar o3 och o4-mini och när ska jag använda dem?",
    answer:
      "o3 och o4-mini är OpenAI:s reasoning-modeller — de tänker länge innan de svarar och är markant bättre på matematik, logik, vetenskap och komplex kodning. o3 kostar 105/315 SEK per Mtok. o4-mini är billigare reasoning-alternativet ($1,10/$4,40 per Mtok → 11,55/46,20 SEK). Välj reasoning-modeller när uppgiften kräver multi-steg-logik och rätt svar är viktigare än svarstid.",
  },
  {
    question: "Är OpenAI billigare eller dyrare än Anthropic (Claude) och Google (Gemini)?",
    answer:
      "OpenAI är billigare än Anthropic på budget-nivå (GPT-4o mini 1,58 SEK vs Claude Haiku 10,50 SEK input/Mtok). Googles Gemini 2.5 Flash (3,15 SEK input) ligger mellan dem. DeepSeek V3 är billigast totalt sett (2,94 SEK/Mtok). OpenAI:s GPT-4.1 är billigare per token än Claude Sonnet och Gemini 2.5 Pro. Anthropic kompenserar med prompt caching som kan sänka effektivt input-pris med 90 %.",
  },
  {
    question: "Hur räknar jag ut min faktiska månadskostnad för OpenAI API?",
    answer:
      "Formel: (input-tokens ÷ 1 000 000) × input-pris-SEK + (output-tokens ÷ 1 000 000) × output-pris-SEK. Exempel med GPT-4o och 500 000 input-tokens + 1 000 000 output-tokens: (0,5 × 26,25) + (1 × 105) = 13,13 + 105 = 118,13 SEK. Räkna 1 token ≈ 0,75 ord på svenska. En artikel på 800 ord ≈ 1 067 tokens output.",
  },
];

export function OpenAiApiPris() {
  return (
    <>
      <SEO
        title="OpenAI API pris Sverige 2026 — GPT-4o, GPT-4o mini, o3 i SEK"
        description="Komplett pristabell för alla OpenAI-modeller i SEK. GPT-4o, GPT-4o mini, GPT-4.1, o3, o4-mini, embeddings — hur du beräknar din månadskostnad."
        canonical="/openai-api-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "OpenAI API pris", url: "https://aikostnad.se/openai-api-pris" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            OpenAI API priser i svenska kronor
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilka är OpenAI:s API-priser i SEK?"
            answer={
              <>
                <strong>GPT-4o mini</strong> är billigast: <strong>1,58 kr input / 6,30 kr output</strong> per Mtok.
                GPT-4.1 kostar 21/84 SEK och är det bästa pris-prestanda-valet för avancerade uppgifter.{" "}
                <strong>GPT-5</strong> är dyrast (157,50/630 SEK). Embeddings är extremt billiga: 0,21–1,37 SEK/Mtok.
                o3 är rätt val för komplex matematisk och logisk resonering.
              </>
            }
            bullets={[
              "GPT-4o mini: 1,58 SEK input / 6,30 SEK output per Mtok",
              "GPT-4.1: 21 SEK input / 84 SEK output — bäst pris-prestanda",
              "GPT-4o: 26,25 SEK input / 105 SEK output",
              "GPT-5: 157,50 SEK input / 630 SEK output — flaggskeppet",
              "o3: 105 SEK input / 315 SEK output — reasoning",
              "text-embedding-3-small: 0,21 SEK/Mtok — extremt billigt",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            OpenAI erbjuder en bred portfölj av modeller med dramatiskt olika
            prislappar. Rätt val kan skilja 100 gånger i kostnad för samma uppgift.
            Den här guiden ger komplett pristabell för alla OpenAI-modeller i svenska
            kronor samt förklarar hur du räknar ut din faktiska månadskostnad.
            Uppdaterat maj 2026.
          </p>

          {/* Main pricing table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Komplett pristabell — alla OpenAI-modeller i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              Alla priser per miljon tokens (Mtok). Växelkurs: 10,50 SEK per USD.
              Priser verifierade maj 2026.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-4">Textmodeller (chat/completion)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input USD</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input SEK</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output USD</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output SEK</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Kontextfönster</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-amber-50">
                    <td className="px-3 py-2 font-medium">GPT-5</td>
                    <td className="px-3 py-2 text-right">$15,00</td>
                    <td className="px-3 py-2 text-right font-bold">157,50 kr</td>
                    <td className="px-3 py-2 text-right">$60,00</td>
                    <td className="px-3 py-2 text-right font-bold">630,00 kr</td>
                    <td className="px-3 py-2 text-gray-600">128K</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-right">$2,00</td>
                    <td className="px-3 py-2 text-right font-bold">21,00 kr</td>
                    <td className="px-3 py-2 text-right">$8,00</td>
                    <td className="px-3 py-2 text-right font-bold">84,00 kr</td>
                    <td className="px-3 py-2 text-gray-600">1M</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2 text-right">$2,50</td>
                    <td className="px-3 py-2 text-right font-bold">26,25 kr</td>
                    <td className="px-3 py-2 text-right">$10,00</td>
                    <td className="px-3 py-2 text-right font-bold">105,00 kr</td>
                    <td className="px-3 py-2 text-gray-600">128K</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right">$0,15</td>
                    <td className="px-3 py-2 text-right font-bold">1,58 kr</td>
                    <td className="px-3 py-2 text-right">$0,60</td>
                    <td className="px-3 py-2 text-right font-bold">6,30 kr</td>
                    <td className="px-3 py-2 text-gray-600">128K</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">o3</td>
                    <td className="px-3 py-2 text-right">$10,00</td>
                    <td className="px-3 py-2 text-right font-bold">105,00 kr</td>
                    <td className="px-3 py-2 text-right">$30,00</td>
                    <td className="px-3 py-2 text-right font-bold">315,00 kr</td>
                    <td className="px-3 py-2 text-gray-600">200K</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">o4-mini</td>
                    <td className="px-3 py-2 text-right">$1,10</td>
                    <td className="px-3 py-2 text-right font-bold">11,55 kr</td>
                    <td className="px-3 py-2 text-right">$4,40</td>
                    <td className="px-3 py-2 text-right font-bold">46,20 kr</td>
                    <td className="px-3 py-2 text-gray-600">128K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Embedding-modeller</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Embedding-modeller omvandlar text till numeriska vektorer för semantisk
              sökning, RAG-system och liknande. De har bara input-pris — ingen output.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">USD/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">SEK/Mtok</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Dimensioner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">text-embedding-3-large</td>
                    <td className="px-3 py-2 text-right">$0,13</td>
                    <td className="px-3 py-2 text-right font-bold">1,37 kr</td>
                    <td className="px-3 py-2 text-gray-600">3 072</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">text-embedding-3-small</td>
                    <td className="px-3 py-2 text-right">$0,02</td>
                    <td className="px-3 py-2 text-right font-bold">0,21 kr</td>
                    <td className="px-3 py-2 text-gray-600">1 536</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Embedding-priser är extremt låga. Att indexera 1 miljon ord med
              text-embedding-3-small kostar ca 0,28 SEK. Källa:{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                openai.com/api/pricing
              </a>. Maj 2026.
            </p>
          </section>

          {/* How tokens work */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur fungerar token-prissättning?</h2>
            <p className="text-gray-700 leading-relaxed">
              En token är ungefär 0,75 ord på engelska och lite mer på svenska (eftersom
              svenska ord med ä, ö, å ibland tokeniseras i flera delar). En tumregel
              för svenska texter är <strong>1 token ≈ 0,65 ord</strong> — 1 000 ord
              ≈ 1 540 tokens.
            </p>
            <p className="text-gray-700 leading-relaxed">
              OpenAI debiterar separat för:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Input-tokens:</strong> Allt du skickar in — system-prompt,
                konversationshistorik och användarens fråga. Input är alltid billigare
                än output.
              </li>
              <li>
                <strong>Output-tokens:</strong> Modellens svar. Output kostar 4× mer
                än input för GPT-4.1, 5× mer för GPT-4o mini. Det är output som driver
                de flesta kostnader i praktiken.
              </li>
              <li>
                <strong>Cached input (automatisk):</strong> OpenAI cachar automatiskt
                långa kontexter som återanvänds. Cachad input kostar 50 % av normalt
                input-pris för GPT-4o och GPT-4.1. Det sker utan att du behöver göra
                något i koden.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Räkneexempel — 800-ords artikel</h3>
            <p className="text-gray-700 leading-relaxed">
              Du vill generera 100 blogginlägg på 800 ord vardera med en 150-ords
              briefing som input.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
              <p><strong>Input:</strong> 150 ord × 1,54 = ca 231 tokens × 100 = 23 100 tokens = 0,023 Mtok</p>
              <p><strong>Output:</strong> 800 ord × 1,54 = ca 1 232 tokens × 100 = 123 200 tokens = 0,123 Mtok</p>
              <p className="mt-2 font-semibold">Kostnad per modell:</p>
              <ul className="list-none space-y-1 pl-2">
                <li>GPT-4.1: 0,023 × 21 + 0,123 × 84 = 0,48 + 10,33 = <strong>10,81 SEK</strong></li>
                <li>GPT-4o: 0,023 × 26,25 + 0,123 × 105 = 0,60 + 12,92 = <strong>13,52 SEK</strong></li>
                <li>GPT-4o mini: 0,023 × 1,58 + 0,123 × 6,30 = 0,04 + 0,78 = <strong>0,82 SEK</strong></li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Att generera 100 artiklar kostar under 14 SEK med GPT-4o och under 1 SEK
              med GPT-4o mini. Den verkliga kostnaden i produktion är oftast 5–10×
              högre på grund av iterationer, längre system-promptar och
              konversationshistorik.
            </p>
          </section>

          {/* Comparison with competitors */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">OpenAI vs Anthropic vs Google — prisjämförelse</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI är inte längre ensam på marknaden. Här jämförs de mest populära
              modellerna i samma prisnivå:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Leverantör</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input SEK/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output SEK/Mtok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-5</td>
                    <td className="px-3 py-2 text-gray-600">OpenAI</td>
                    <td className="px-3 py-2 text-right">157,50 kr</td>
                    <td className="px-3 py-2 text-right">630,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Opus 4.7</td>
                    <td className="px-3 py-2 text-gray-600">Anthropic</td>
                    <td className="px-3 py-2 text-right">52,50 kr</td>
                    <td className="px-3 py-2 text-right">262,50 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-gray-600">OpenAI</td>
                    <td className="px-3 py-2 text-right">21,00 kr</td>
                    <td className="px-3 py-2 text-right">84,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2 text-gray-600">Anthropic</td>
                    <td className="px-3 py-2 text-right">31,50 kr</td>
                    <td className="px-3 py-2 text-right">157,50 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2 text-gray-600">OpenAI</td>
                    <td className="px-3 py-2 text-right">26,25 kr</td>
                    <td className="px-3 py-2 text-right">105,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini 2.5 Flash</td>
                    <td className="px-3 py-2 text-gray-600">Google</td>
                    <td className="px-3 py-2 text-right">3,15 kr</td>
                    <td className="px-3 py-2 text-right">26,25 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2 text-gray-600">OpenAI</td>
                    <td className="px-3 py-2 text-right font-bold">1,58 kr</td>
                    <td className="px-3 py-2 text-right font-bold">6,30 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Haiku 4.5</td>
                    <td className="px-3 py-2 text-gray-600">Anthropic</td>
                    <td className="px-3 py-2 text-right">10,50 kr</td>
                    <td className="px-3 py-2 text-right">52,50 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">DeepSeek V3</td>
                    <td className="px-3 py-2 text-gray-600">DeepSeek</td>
                    <td className="px-3 py-2 text-right">2,94 kr</td>
                    <td className="px-3 py-2 text-right">4,41 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              OpenAI:s GPT-4o mini är billigare per token än Anthropic:s Claude Haiku.
              Googles Gemini 2.5 Flash positionerar sig mitt emellan. DeepSeek V3 är
              billigaste alternativet totalt sett — men kinesisk datalagring ger
              GDPR-komplikationer för svenska företag.
            </p>
          </section>

          {/* Decision guide */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vilken OpenAI-modell ska du välja?</h2>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-green-900">GPT-4o mini — välj för</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Kundtjänst-chatbots med standardiserade frågor</li>
                <li>Klassificering, taggning och strukturering av data</li>
                <li>Enkel textformatering och redigering</li>
                <li>Hög volym där kostnaden är kritisk</li>
                <li>Prototyper och experiment innan produktionslansering</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">GPT-4.1 — välj för</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Dokumentanalys och sammanfattning (upp till 1M tokens kontext)</li>
                <li>Kodgenerering och debuggning</li>
                <li>Komplexa instruktioner med många villkor</li>
                <li>Innehållsproduktion som kräver hög kvalitet</li>
                <li>De flesta production use cases — bästa pris-prestanda</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-gray-900">o3 / o4-mini — välj för</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Avancerad matematik och vetenskapliga beräkningar</li>
                <li>Logisk resonering med många steg</li>
                <li>Komplexa planerings- och beslutsuppgifter</li>
                <li>Situations där noggrannhet väger tyngre än svarstid</li>
                <li>o4-mini för reasoning på budget — halva priset av o3</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-amber-900">GPT-5 — välj för</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Juridisk och medicinsk analys med låg feltolerans</li>
                <li>Autonoma AI-agenter med komplex beslutslogik</li>
                <li>Uppgifter där GPT-4.1 bevisligen misslyckas</li>
                <li>Hög precision vid lågvolym (kostnaden är hanterbar)</li>
              </ul>
            </div>
          </section>

          {/* Prompt caching */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Automatisk prompt caching — spara upp till 50 %</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI aktiverar automatiskt prompt caching för GPT-4o, GPT-4.1 och
              o-modellerna. Om samma lång kontext (system-prompt + historik) skickas
              igen inom ett visst tidsfönster debiteras den cachade delen till{" "}
              <strong>50 % av normalt input-pris</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Du behöver inte ändra något i din kod för att dra nytta av detta.
              OpenAI gör det automatiskt. Du ser kostnaden per förfrågan uppdelad på
              "cached tokens" och "uncached tokens" i API-svaret.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Jämförs med Anthropics Claude som erbjuder{" "}
              <strong>90 % rabatt</strong> på cachad input (men kräver explicit
              implementering av prompt caching i koden). Anthropics caching är mer
              kraftfull för chatbots med långa system-promptar, OpenAI:s är enklare
              att komma igång med. Läs vår guide om{" "}
              <Link to="/prompt-caching" className="text-indigo-700 hover:underline">
                prompt caching
              </Link>{" "}
              för en detaljerad jämförelse.
            </p>
          </section>

          {/* Monthly cost calculation */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Typiska månadskostnader per company-typ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Typ av användning</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Rekommenderad modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Typisk kostnad/mån</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2">Frilansare / solopreneur</td>
                    <td className="px-3 py-2 text-gray-600">ChatGPT Plus (abonnemang)</td>
                    <td className="px-3 py-2 text-right font-medium">209 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Liten chatbot (500 frågor/dag)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right font-medium">15–40 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Innehållsproduktion (100 artiklar)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-4.1</td>
                    <td className="px-3 py-2 text-right font-medium">50–200 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Dokumentanalys (200 dok)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-4.1</td>
                    <td className="px-3 py-2 text-right font-medium">200–400 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">SaaS-assistent (1 000 MAU)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right font-medium">40–200 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Stor chatbot (10 000 frågor/dag)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-4o mini / GPT-4.1</td>
                    <td className="px-3 py-2 text-right font-medium">300–3 000 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Entreprise-agenter (hög komplexitet)</td>
                    <td className="px-3 py-2 text-gray-600">GPT-5 / o3</td>
                    <td className="px-3 py-2 text-right font-medium">5 000–50 000 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellerna ger riktmärken — din faktiska kostnad beror på din volym,
              prompt-längd och hur stor del av input-tokens som cachas.{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i din exakta volym och se månadskostnaden i SEK för
              alla modeller i realtid.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-indigo-700 hover:underline">
                  Vad kostar ChatGPT API?
                </Link>{" "}
                — djupguide för GPT-4o och GPT-4o mini
              </li>
              <li>
                <Link to="/chatgpt-vs-claude" className="text-indigo-700 hover:underline">
                  OpenAI vs Anthropic
                </Link>{" "}
                — komplett jämförelse av pris och prestanda
              </li>
              <li>
                <Link to="/gpt-5-pris" className="text-indigo-700 hover:underline">
                  GPT-5 pris
                </Link>{" "}
                — när är flaggskeppet värt priset?
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-indigo-700 hover:underline">
                  Billigaste AI 2026
                </Link>{" "}
                — jämför GPT-4o mini mot andra budget-modeller
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI erbjuder ett brett spektrum av modeller med dramatiskt olika
              prislappar — från 0,21 SEK/Mtok för embeddings till 630 SEK/Mtok output
              för GPT-5. För de allra flesta produktions-use cases är GPT-4.1 det
              smartaste valet: markant billigare än GPT-5, bättre än GPT-4o och med
              1 miljon tokens kontextfönster som öppnar för nya use cases.
            </p>
            <p className="text-gray-700 leading-relaxed">
              GPT-4o mini är oslagbar på budget-tier — 16 gånger billigare än GPT-4o
              för standardiserade uppgifter. OpenAI:s automatiska prompt caching
              sänker effektivt input-pris med upp till 50 % utan att du behöver
              ändra en rad kod.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser uppdateras regelbundet av OpenAI. Verifiera mot{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                openai.com/api/pricing
              </a>{" "}
              inför budgetbeslut. Senast verifierade 2026-05-25.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["openai-api-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om OpenAI API-priser" />

        <Sources items={officialPricingSources} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att komma igång?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nu vet du vad OpenAI API kostar. Nästa steg är att skapa ditt konto och börja bygga.
          </p>
          <a
            href="https://platform.openai.com/signup"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'openai', source: 'openai-api-pris' })}
          >
            Skapa ditt OpenAI-konto gratis →
          </a>
          <p className="text-xs text-gray-400 mt-2">Samarbetslänk — vi kan ta emot provision vid köp.</p>
        </div>
      </main>
    </>
  );
}
