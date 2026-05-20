import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { PriceOfferSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { geminiSources } from "../data/sources";

const INITIAL_VALUES = { modelId: "gemini-2.5-flash" } as const;

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Gemini 2.5 Pro per token?",
    answer:
      "Gemini 2.5 Pro kostar $1,25 per miljon input-tokens och $10,00 per miljon output-tokens (maj 2026) för prompts upp till 200K tokens. Vid längre kontexter (200K+) stiger input-priset till $2,50 per miljon tokens. Det gör Gemini 2.5 Pro till ett konkurrenskraftigt alternativ för långa dokument jämfört med GPT-4.1 ($2/$8) och Claude Sonnet 4.6 ($3/$15).",
  },
  {
    question: "Hur skiljer sig Gemini 2.5 Flash från Gemini 2.5 Pro?",
    answer:
      "Gemini 2.5 Flash ($0,30/$2,50 per Mtok) är Googles snabba och prisvärda modell — lämplig för klassificering, sammanfattning och chatbots med hög volym. Gemini 2.5 Pro ($1,25/$10) har starkare resoneringsförmåga och lämpar sig för komplex analys, kodning och långa dokument upp till 1 miljon tokens. Flash är runt 4× billigare på output.",
  },
  {
    question: "Vad kostar Gemini Advanced (Google One)?",
    answer:
      "Gemini Advanced ingår i Google One AI Premium-plan som kostar ca 199 kr per månad i Sverige (maj 2026). Det ger tillgång till Gemini 2.5 Pro via chat-gränssnittet, integration med Gmail, Docs, Sheets och Drive, samt 2 TB Google-lagring. Det är en fast månadsavgift — inte per-token-prissättning som Google AI Studio API.",
  },
  {
    question: "Kan Gemini hantera svenska texter?",
    answer:
      "Ja. Gemini 2.5 Pro och Flash stöder svenska fullt ut. Liksom andra stora modeller tokeniseras svenska texter till ca 1,3 tokens per ord (vs 0,75 för engelska) på grund av å/ä/ö och sammansatta ord — vilket innebär att svenska prompts kostar ungefär 73 % mer per ord att bearbeta. Kalkylatorn räknar in detta automatiskt.",
  },
  {
    question: "Är Google Gemini GDPR-kompatibelt?",
    answer:
      "Google erbjuder ett databehandlingstillägg (DPA) för Google Workspace och Google Cloud AI-tjänster som uppfyller GDPR-krav. Via Vertex AI kan företag köra Gemini med dataprocesering inom EU. För konsument-API (Google AI Studio) gäller Googles standardvillkor — kontrollera alltid med din DPO om känsliga personuppgifter ska behandlas.",
  },
];

export function GeminiPris() {
  return (
    <>
      <SEO
        title="Gemini Pris 2026 — vad kostar Google Gemini 2.5 API per månad?"
        description="Se vad Google Gemini 2.5 Pro och Flash kostar per token och per månad. Jämför med ChatGPT och Claude. Räkna ut din AI-kostnad i SEK med live-valutakurs."
        canonical="/gemini-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Gemini pris", url: "https://aikostnad.se/gemini-pris" },
      ]} />
      <ArticleSchema article={articles["gemini-pris"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="Google Gemini — Advanced och API"
        description="Gemini pris 2026: Gemini Advanced abonnemang (Google One AI Premium) och API per token (Gemini 2.5 Pro, Flash, Flash-Lite) i svenska kronor."
        brand="Google"
        url="https://aikostnad.se/gemini-pris"
        offers={[
          { name: "Gemini Free", priceSek: 0, description: "Gratis via gemini.google.com" },
          { name: "Google One AI Premium (Gemini Advanced)", priceSek: 199, description: "Inkl. 2 TB lagring, Gemini i Gmail/Docs" },
          { name: "Gemini 2.5 Flash-Lite API (per Mtok input)", priceSek: 1, description: "0,10 USD per miljon tokens" },
          { name: "Gemini 2.5 Flash API (per Mtok input)", priceSek: 3, description: "0,30 USD per miljon tokens" },
          { name: "Gemini 2.5 Pro API (per Mtok input)", priceSek: 13, description: "1,25 USD per miljon tokens (under 200K context)" },
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
            Gemini pris — vad kostar Google Gemini API?
          </h1>

          <LastUpdated date={articles["gemini-pris"].modifiedDate} />

          <TLDR
            question="Vad kostar Google Gemini?"
            answer={
              <>
                Gemini finns i tre nivåer: <strong>gratis</strong> (gemini.google.com), <strong>Gemini Advanced 199 kr/mån</strong> (via Google One AI Premium med 2 TB lagring), och <strong>API per token</strong>. Gemini 2.5 Flash är ett av marknadens billigaste val: <strong>0,30 USD / 2,50 USD per miljon tokens</strong> — med 1 miljon tokens kontextfönster.
              </>
            }
            bullets={[
              "Gemini Free: 0 kr (gemini.google.com)",
              "Gemini Advanced: 199 kr/mån (Google One AI Premium)",
              "Gemini 2.5 Flash-Lite API: 0,10 / 0,40 USD per Mtok",
              "Gemini 2.5 Flash API: 0,30 / 2,50 USD per Mtok",
              "Gemini 2.5 Pro API: 1,25 / 10 USD per Mtok",
              "1 miljon tokens kontextfönster (störst på marknaden)",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Googles <strong>Gemini 2.5 Pro</strong> är det mest avancerade alternativet
              med ett kontextfönster på <strong>1 miljon tokens</strong> — tillräckligt
              för att analysera hela kodbaser, böcker eller långa konversationshistoriker
              i ett enda anrop. Modellen kostar{" "}
              <strong>$1,25 per miljon input-tokens</strong> och{" "}
              <strong>$10,00 per miljon output-tokens</strong> (maj 2026) för
              prompts upp till 200K tokens.
            </p>
            <p>
              För volymbaserade tillämpningar är <strong>Gemini 2.5 Flash</strong> det
              smartare valet: <strong>$0,30 input / $2,50 output</strong> per miljon tokens,
              med samma 1-miljon-tokens kontextfönster. Flash är runt 4× billigare på output
              och passar utmärkt för klassificering, sammanfattning, FAQ-chatbots och
              dokumentanalys med lägre komplexitet.
            </p>
            <p>
              Utöver API-prissättning finns <strong>Gemini Advanced</strong> som ett
              konsumentabonnemang via Google One AI Premium (ca 199 kr/mån) — ger
              tillgång till Gemini 2.5 Pro i chattgränssnitt med integration i
              Gmail, Docs och Sheets.
            </p>
            <p>
              Kalkylatorn nedan är förinställd på Gemini 2.5 Flash. Byt till Pro i
              rullgardinsmenyn för att jämföra — alla siffror i svenska kronor med
              live-valutakurs.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

        <div className="mt-10 mb-10 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <caption className="text-sm font-semibold text-gray-700 text-left mb-2 px-1">
              Gemini 2.5 — prisöversikt (maj 2026)
            </caption>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Input ($/Mtok)</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Output ($/Mtok)</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Kontextfönster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2 font-medium">Gemini 2.5 Flash</td>
                <td className="px-3 py-2">$0,30</td>
                <td className="px-3 py-2">$2,50</td>
                <td className="px-3 py-2">1 000 000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Gemini 2.5 Pro (≤200K)</td>
                <td className="px-3 py-2">$1,25</td>
                <td className="px-3 py-2">$10,00</td>
                <td className="px-3 py-2">1 000 000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Gemini 2.5 Pro (&gt;200K)</td>
                <td className="px-3 py-2">$2,50</td>
                <td className="px-3 py-2">$15,00</td>
                <td className="px-3 py-2">1 000 000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Gemini vs ChatGPT vs Claude — konkreta kostnader</h2>
          <p>
            Tre typiska scenarion med svenska texter (1,3 tokens/ord), 100 ord input +
            200 ord output per fråga, 22 arbetsdagar. Priser per maj 2026.
          </p>

          <div className="space-y-4 not-prose">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-900 mb-2">Personlig användning — 50 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Gemini 2.5 Flash: <strong>~19 kr/mån</strong></li>
                <li>ChatGPT Plus-abonnemang: <strong>209 kr/mån</strong></li>
                <li>Gemini Advanced (Google One): <strong>199 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Flash API är extremt billigt på låg volym. Abonnemang passar dig som
                vill ha integrationen med Google Workspace.
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-indigo-900 mb-2">Småföretag — 500 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Gemini 2.5 Flash: <strong>~189 kr/mån</strong></li>
                <li>Gemini 2.5 Pro: <strong>~790 kr/mån</strong></li>
                <li>GPT-4o mini (jämförelse): <strong>~20 kr/mån</strong></li>
                <li>Claude Haiku 4.5 (jämförelse): <strong>~165 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Flash är dyrare än GPT-4o mini men billigare än Claude Haiku. Välj Flash om
                du värdesätter Googles ekosystem eller behöver lång kontext.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-purple-900 mb-2">Medelstor B2C — 5 000 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Gemini 2.5 Flash: <strong>~1 890 kr/mån</strong></li>
                <li>Gemini 2.5 Pro: <strong>~7 900 kr/mån</strong></li>
                <li>GPT-4o mini (jämförelse): <strong>~200 kr/mån</strong></li>
                <li>Claude Sonnet 4.6 (jämförelse): <strong>~4 960 kr/mån</strong></li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Googles unika fördelar med Gemini</h2>

          <h3 className="text-lg font-bold text-gray-900 mt-6">1 miljon tokens kontextfönster</h3>
          <p>
            Gemini 2.5 Pro och Flash stöder båda 1 miljon tokens i kontextfönstret —
            mer än någon annan kommersiell modell i sin prisklass. Det öppnar för
            scenarion som:
          </p>
          <ul>
            <li>Analysera en hel bok (400+ sidor) i ett enda anrop</li>
            <li>Indexera och söka i en stor kodbas direkt via API</li>
            <li>Långa konversationer med full historik utan sammanfattning</li>
            <li>Multi-dokument-analys av t.ex. flera årsredovisningar simultaneously</li>
          </ul>
          <p>
            En varning: ett fullt 1M-tokens anrop kostar ca $2,50 på Gemini 2.5 Pro
            (≤200K-nivå) — kontextfönster ska användas med omtanke. RAG
            (Retrieval-Augmented Generation) är ofta billigare om du bara behöver
            relevanta delar av ett dokument.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Google Workspace-integration</h3>
          <p>
            En unik fördel med Gemini Advanced (Google One-abonnemanget) är native-integration
            med Gmail, Google Docs, Sheets, Slides och Drive. Om ditt företag redan använder
            Google Workspace är Gemini Advanced det minst friktionsfyllda sättet att lägga
            till AI-stöd — utan att bygga något.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Multimodalt stöd</h3>
          <p>
            Gemini 2.5 Pro och Flash stöder text, bilder, PDF:er, video och ljud i
            samma anrop. Vill du analysera ett bilddiagram, transkribera ett möte och
            sammanfatta resultaten i ett API-anrop — det klarar Gemini. GPT-4o är den
            enda direkta konkurrenten med liknande multimodal kapacitet.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När ska du välja Gemini?</h2>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 not-prose mb-6">
            <h3 className="text-base font-bold text-blue-900 mb-2">Välj Gemini om du…</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm leading-relaxed">
              <li>Behöver analysera extremt långa dokument (200K+ tokens)</li>
              <li>Bygger multimodala applikationer med bild, video eller ljud</li>
              <li>Använder Google Workspace och vill ha sömlös integration</li>
              <li>Vill ha Googles infrastruktur och driftsäkerhet</li>
              <li>Testar med Google AI Studio — gratistier är generöst</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose">
            <h3 className="text-base font-bold text-gray-900 mb-2">Välj ett alternativ om du…</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm leading-relaxed">
              <li>
                Behöver absolut billigast per token →{" "}
                <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">GPT-4o mini eller Mistral Small</Link>
              </li>
              <li>
                Skriver mycket på svenska →{" "}
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">Claude Haiku eller Sonnet</Link>
              </li>
              <li>
                Vill ha bäst pris på kodning →{" "}
                <Link to="/gpt-4-pris" className="text-indigo-600 hover:underline">GPT-4.1</Link>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Gemini i Google AI Studio — gratis tier</h2>
          <p>
            Google erbjuder ett generöst gratis-tier i Google AI Studio:
            Gemini 2.5 Flash är gratis upp till 1 500 förfrågningar per dag (15 förfrågningar
            per minut). Det räcker för prototyp-testning och lätta produktionsscenarier.
            Gemini 2.5 Pro är gratis upp till 25 förfrågningar per dag på gratistiern.
            Betaltjänsten skalas utan volymgräns.
          </p>
          <p>
            Jämfört med OpenAI:s API (ingen gratis tier utöver en initial kredit) och Anthropic
            (ingen gratis API-tier) är Googles gratiserbjudande det generösaste bland de
            tre stora leverantörerna. Se vår sammanfattning av{" "}
            <Link to="/gratis-ai" className="text-indigo-600 hover:underline">gratis AI-alternativ 2026</Link>{" "}
            för full jämförelse.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Sammanfattning: Gemini-priser 2026</h2>
          <p>
            Gemini 2.5 Flash är ett konkurrenskraftigt alternativ för volymbaserade
            applikationer med sitt 1M-tokens kontextfönster och låga pris. Gemini 2.5 Pro
            är bäst när du behöver extremt lång kontext eller komplex analys. Konsumenter
            som använder Google Workspace gör klokt i att prova Gemini Advanced (199 kr/mån)
            före separata ChatGPT- eller Claude-abonnemang — du betalar ändå redan för
            Google One om du har det.
          </p>
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            Priser verifierade maj 2026. AI-priser ändras löpande — kontrollera alltid mot{" "}
            <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Googles officiella prislista</a>{" "}
            innan ni fattar beslut.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["gemini-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om Gemini-priser" />

        <Sources items={geminiSources} />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/vad-kostar-chatgpt" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Vad kostar ChatGPT?
            </p>
            <p className="text-xs text-gray-500">
              GPT-4o och GPT-4o mini — räkna ut din månadskostnad i SEK.
            </p>
          </Link>
          <Link to="/claude-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Vad kostar Claude?
            </p>
            <p className="text-xs text-gray-500">
              Claude Sonnet och Haiku — Anthropics priser per token i SEK.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
