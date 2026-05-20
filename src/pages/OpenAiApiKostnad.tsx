import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { PriceOfferSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { openAISources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad är billigast — GPT-4o eller GPT-4o mini?",
    answer:
      "GPT-4o mini är dramatiskt billigare: 0,15 USD per miljon input-tokens och 0,60 USD per output, mot GPT-4o:s 2,50 USD/10 USD. Det är ungefär 17 gånger billigare. För klassificering, enkla skrivuppgifter och routing räcker mini oftast — vår rekommendation är att default:a till mini och bara använda full GPT-4o när uppgiften kräver det.",
  },
  {
    question: "Vad kostar OpenAI:s reasoning-modeller (o3, o3-mini)?",
    answer:
      "o3 är OpenAI:s flaggskepp för komplext resonemang och kostar 15 USD/Mtok input och 60 USD/Mtok output — den klart dyraste modellen i sortimentet. o3-mini ligger på 1,10/4,40 USD, betydligt mer rimligt. Reasoning-modellerna 'tänker' innan de svarar och använder fler interna tokens, så faktiska kostnaden blir ofta 2–4 gånger högre än vad token-priserna antyder.",
  },
  {
    question: "Hur mycket kostar DALL-E 3 och Whisper?",
    answer:
      "DALL-E 3 kostar 0,04 USD per standardbild (1024×1024) och 0,08 USD per HD-bild. En kund som gör 1 000 bilder/månad betalar alltså cirka 40–80 USD eller 420–840 kr. Whisper (tal-till-text) kostar 0,006 USD per minut audio — en timmes transkribering kostar 0,36 USD eller cirka 4 kr. Det är extremt prisvärt för svenska media- och callcenter-kunder.",
  },
  {
    question: "Vad är embeddings och vad kostar de?",
    answer:
      "Embeddings är numeriska representationer av text som används för semantisk sökning, RAG-system och rekommendationer. text-embedding-3-small kostar 0,02 USD/Mtok (extremt billigt — ca 0,21 kr per miljon tokens) och text-embedding-3-large 0,13 USD/Mtok. Att embedda hela svenska Wikipedia (~3 miljarder tokens) skulle kosta cirka 60 USD med small-modellen.",
  },
  {
    question: "Hur fungerar OpenAI:s Batch API med 50 % rabatt?",
    answer:
      "Batch API är OpenAI:s asynkrona variant — du skickar in en stor batch av requests, betalar 50 % av priset, och får svaren tillbaka inom 24 timmar. Perfekt för icke-tidskritiska uppgifter: dokumentanalys, klassificering av stora datamängder, embedding-pipelines, sammanfattning av många dokument. För en kund som batch-bearbetar 100 miljoner tokens kan det betyda 1 250 kr i besparing per körning.",
  },
  {
    question: "Finns det volymrabatter på OpenAI API?",
    answer:
      "Officiellt — nej, OpenAI har transparenta priser för alla. Men prompt caching ger upp till 50 % rabatt på återanvänd input (gäller automatiskt för långa system-promptar), Batch API ger 50 % rabatt på icke-tidskritiska jobb, och Enterprise-kunder kan förhandla custom commitments med ratesäkring och SLA via OpenAI Sales. För de flesta små och medelstora kunder är det dock prislistan som gäller.",
  },
];

export function OpenAiApiKostnad() {
  return (
    <>
      <SEO
        title="OpenAI API-kostnad 2026 — komplett prisguide i SEK"
        description="Alla OpenAI API-priser 2026 i svenska kronor. GPT-4o, GPT-4o mini, o3, DALL-E 3, Whisper, embeddings och Batch API — räkneexempel för svenska kunder."
        canonical="/openai-api-kostnad"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "OpenAI API-kostnad", url: "https://aikostnad.se/openai-api-kostnad" },
      ]} />
      <ArticleSchema article={articles["openai-api-kostnad"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="OpenAI API — modellpriser och tjänster"
        description="Komplett OpenAI API-prislista 2026 i SEK. GPT-4o, GPT-4o mini, o3, o3-mini, GPT-4.1, DALL-E 3, Whisper, embeddings och Batch API."
        brand="OpenAI"
        url="https://aikostnad.se/openai-api-kostnad"
        offers={[
          { name: "text-embedding-3-small (per Mtok)", priceSek: 0.21, description: "Embeddings — semantisk sökning" },
          { name: "Whisper (per minut audio)", priceSek: 0.063, description: "Tal-till-text på svenska" },
          { name: "GPT-4o mini input (per Mtok)", priceSek: 1.58, description: "Billigaste chatt-modellen, 17× billigare än GPT-4o" },
          { name: "GPT-4o mini output (per Mtok)", priceSek: 6.30, description: "Output-tokens" },
          { name: "text-embedding-3-large (per Mtok)", priceSek: 1.37, description: "Embeddings — högre kvalitet" },
          { name: "DALL-E 3 standard (per bild)", priceSek: 0.42, description: "1024×1024 bildgenerering" },
          { name: "DALL-E 3 HD (per bild)", priceSek: 0.84, description: "1024×1024 HD" },
          { name: "o3-mini input (per Mtok)", priceSek: 11.55, description: "Billig reasoning-modell" },
          { name: "GPT-4o input (per Mtok)", priceSek: 26.25, description: "Standardflaggskepp" },
          { name: "o3 input (per Mtok)", priceSek: 157.50, description: "Tyngsta reasoning-modellen" },
          { name: "GPT-4o output (per Mtok)", priceSek: 105, description: "Output på flaggskeppsmodellen" },
          { name: "o3 output (per Mtok)", priceSek: 630, description: "Dyraste output i OpenAI:s sortiment" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            OpenAI API-kostnad 2026 — komplett prisguide
          </h1>

          <LastUpdated date={articles["openai-api-kostnad"].modifiedDate} />

          <TLDR
            question="Vad kostar OpenAI API?"
            answer={
              <>
                OpenAI API-priser sträcker sig från <strong>0,15 USD/Mtok</strong> (GPT-4o mini) till{" "}
                <strong>60 USD/Mtok</strong> (o3 reasoning output). Andra modaliteter: DALL-E 3 från{" "}
                <strong>0,04 USD per bild</strong>, Whisper <strong>0,006 USD per minut</strong>,{" "}
                embeddings från <strong>0,02 USD/Mtok</strong>. Batch API ger 50 % rabatt på allt.
              </>
            }
            bullets={[
              "GPT-4o mini: 0,15 / 0,60 USD per Mtok (in/ut)",
              "GPT-4o: 2,50 / 10 USD per Mtok",
              "GPT-4.1: 2 / 8 USD per Mtok",
              "o3-mini: 1,10 / 4,40 USD per Mtok",
              "o3: 15 / 60 USD per Mtok (reasoning)",
              "DALL-E 3: 0,04–0,08 USD per bild",
              "Whisper: 0,006 USD per minut audio",
              "Embeddings small: 0,02 USD per Mtok",
              "Batch API: 50 % rabatt på allt ovan",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              OpenAI:s API-prislista 2026 har blivit både bredare och mer differentierad. Vi har nu
              fler än tio aktiva modeller — från ultralåga 0,15 USD/Mtok för GPT-4o mini till 60 USD/Mtok
              för o3 reasoning. Den här guiden går igenom <strong>alla</strong> aktiva modeller och
              tjänster, med konkreta räkneexempel i SEK för svenska kunder.
            </p>
            <p>
              Vill du bara räkna ut din egen kostnad direkt? Använd{" "}
              <Link to="/" className="text-indigo-600 hover:underline">kalkylatorn på startsidan</Link> —
              den har alla OpenAI-modeller inbyggda och räknar om till SEK med live-valutakurs.
            </p>
            <p>
              För en bredare jämförelse mellan OpenAI och konkurrenter, se vår guide om{" "}
              <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">ChatGPT vs Claude</Link>{" "}
              eller den kompletta{" "}
              <Link to="/vad-kostar-ai" className="text-indigo-600 hover:underline">AI-prisguiden</Link>.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">GPT-4o och GPT-4o mini — chatt-modellerna</h2>
          <p>
            GPT-4o (omni) är OpenAI:s flaggskeppsmodell för chatt, multimodalitet (bild + text) och
            allmänna uppgifter. GPT-4o mini är den dramatiskt billigare lillebroren — samma arkitektur,
            mindre modell.
          </p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Modell</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Input / Mtok</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Output / Mtok</th>
                  <th className="text-left p-3 font-semibold text-gray-900">SEK (in/ut)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">GPT-4o</td>
                  <td className="p-3">2,50 USD</td>
                  <td className="p-3">10 USD</td>
                  <td className="p-3 text-gray-600">~26 / ~105 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">GPT-4o mini</td>
                  <td className="p-3">0,15 USD</td>
                  <td className="p-3">0,60 USD</td>
                  <td className="p-3 text-gray-600">~1,58 / ~6,30 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">GPT-4.1</td>
                  <td className="p-3">2 USD</td>
                  <td className="p-3">8 USD</td>
                  <td className="p-3 text-gray-600">~21 / ~84 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">GPT-4.1 mini</td>
                  <td className="p-3">0,40 USD</td>
                  <td className="p-3">1,60 USD</td>
                  <td className="p-3 text-gray-600">~4,20 / ~16,80 kr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Vår rekommendation: <strong>börja alltid med mini</strong>. För klassificering, FAQ-svar och
            enklare skrivande räcker GPT-4o mini eller GPT-4.1 mini gott. Eskalera till full GPT-4o /
            GPT-4.1 bara när du faktiskt mäter att kvaliteten inte räcker.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">o3 och o3-mini — reasoning-modellerna</h2>
          <p>
            OpenAI:s o-serie är specialiserad på flerstegsresonemang. Modellen "tänker" internt innan
            den ger sitt svar, vilket gör den dyrare per token men dramatiskt bättre på matematik,
            kodning och komplex analys.
          </p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Modell</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Input / Mtok</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Output / Mtok</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">o3</td>
                  <td className="p-3">15 USD</td>
                  <td className="p-3">60 USD</td>
                  <td className="p-3 text-gray-600">Forskning, komplex kodning, agenter</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">o3-mini</td>
                  <td className="p-3">1,10 USD</td>
                  <td className="p-3">4,40 USD</td>
                  <td className="p-3 text-gray-600">Vardaglig reasoning, kod, matte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Viktigt:</strong> reasoning-modeller använder fler interna tokens än man tror — den
            "osynliga" tänkningen läggs på output. Räkna med att faktiska kostnaden blir 2–4× högre
            än vad token-priserna antyder för komplexa frågor.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">DALL-E 3 — bildgenerering</h2>
          <p>
            DALL-E 3 är OpenAI:s bildmodell. Två kvalitetsnivåer:
          </p>
          <ul>
            <li><strong>Standard 1024×1024:</strong> 0,04 USD per bild (~0,42 kr)</li>
            <li><strong>HD 1024×1024:</strong> 0,08 USD per bild (~0,84 kr)</li>
            <li><strong>Standard 1024×1792 eller 1792×1024 (porträtt/landskap):</strong> 0,08 USD</li>
            <li><strong>HD 1792×1024 eller 1024×1792:</strong> 0,12 USD (~1,26 kr)</li>
          </ul>
          <p>
            Räkneexempel: en kund som genererar 1 000 standardbilder/månad betalar 40 USD eller cirka
            420 kr. Det är extremt prisvärt jämfört med stock-bilder, men för konstprojekt med högre
            kvalitetskrav kan Midjourney eller Flux vara bättre.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Whisper — tal-till-text</h2>
          <p>
            Whisper är OpenAI:s transkriberings-modell, mycket bra på svenska. Pris: <strong>0,006 USD
            per minut audio</strong> (~0,063 kr/minut).
          </p>
          <p>
            Räkneexempel: en svensk podcast-producent som transkriberar 40 timmar audio per månad
            betalar 14,4 USD eller cirka 150 kr. För callcenter som transkriberar 500 timmar/månad blir
            det 180 USD (~1 900 kr). Extremt prisvärt jämfört med manuella transkriberingstjänster
            (som ofta kostar 30+ kr per minut).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Embeddings — vektorer för sökning och RAG</h2>
          <p>
            Embeddings omvandlar text till numeriska vektorer som används för semantisk sökning och
            RAG-system. OpenAI har tre embedding-modeller:
          </p>
          <ul>
            <li><strong>text-embedding-3-small:</strong> 0,02 USD/Mtok (~0,21 kr/Mtok) — bästa pris/prestanda</li>
            <li><strong>text-embedding-3-large:</strong> 0,13 USD/Mtok (~1,37 kr/Mtok) — högre kvalitet</li>
            <li><strong>text-embedding-ada-002 (legacy):</strong> 0,10 USD/Mtok — använd inte längre</li>
          </ul>
          <p>
            Räkneexempel: embedda hela svenska Wikipedia (cirka 3 miljarder tokens) med small-modellen
            kostar 60 USD eller cirka 630 kr. Embedda all er produktdokumentation (säg 10 miljoner
            tokens) kostar 0,20 USD — i princip gratis.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Batch API — 50 % rabatt på allt</h2>
          <p>
            Behöver du inte svar inom millisekunder? <strong>Batch API ger 50 % rabatt</strong> mot
            normal pris. Du laddar upp en JSONL-fil med dina requests, OpenAI bearbetar dem inom
            24 timmar och du betalar halva priset.
          </p>
          <p>
            Bra use cases för Batch:
          </p>
          <ul>
            <li>Klassificering av historisk data (säg 1 miljon kundkommentarer)</li>
            <li>Sammanfattning av PDF-arkiv eller dokumentbibliotek</li>
            <li>Översättning av produktkataloger</li>
            <li>Embedding-pipelines för RAG-system</li>
            <li>Backfilling av AI-genererade fält i databaser</li>
          </ul>
          <p>
            Räkneexempel: en kund som batch-bearbetar 100 miljoner tokens via GPT-4o-mini betalar
            normalt 15 USD (~158 kr). Med Batch blir det 7,50 USD (~79 kr).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Prompt caching — automatisk rabatt på återanvänd input</h2>
          <p>
            OpenAI har sedan oktober 2024 automatisk prompt caching som ger upp till <strong>50 % rabatt</strong>{" "}
            på återanvänd input (tokens som redan setts inom ~5 minuter). Kräver ingen kodändring —
            aktiveras automatiskt för prompts över 1 024 tokens. Mer i vår{" "}
            <Link to="/prompt-caching" className="text-indigo-600 hover:underline">djupguide om prompt caching</Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Realistisk månadskostnad — tre svenska scenarier</h2>

          <div className="not-prose space-y-4 my-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-900 mb-2">Liten chatbot (5 000 frågor/mån)</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>GPT-4o mini: <strong>~15 kr/månad</strong></li>
                <li>GPT-4o: <strong>~260 kr/månad</strong></li>
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-indigo-900 mb-2">Medel RAG-system (50 000 queries/mån)</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>GPT-4o mini + embeddings: <strong>~150 kr/månad</strong></li>
                <li>GPT-4o + embeddings: <strong>~2 600 kr/månad</strong></li>
                <li>Med Batch (om asynkront): <strong>halverat</strong></li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-purple-900 mb-2">Stort B2C (500 000 frågor/mån)</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>GPT-4o mini: <strong>~1 500 kr/månad</strong></li>
                <li>GPT-4o: <strong>~26 000 kr/månad</strong></li>
                <li>Med prompt caching: <strong>~17 000 kr/månad</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedArticles links={relatedArticles["openai-api-kostnad"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om OpenAI API-priser" />

        <Sources items={openAISources} />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Räkna ut din exakta API-kostnad i SEK:{" "}
            <Link to="/" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              Använd kalkylatorn på startsidan
            </Link>{" "}
            eller{" "}
            <Link to="/vad-kostar-chatgpt" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              läs ChatGPT-prisguiden
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
