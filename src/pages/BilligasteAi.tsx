import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { relatedArticles } from "../data/relatedArticles";

const INITIAL_VALUES = { modelId: "claude-haiku-4-5" } as const;

const faqs: FAQItem[] = [
  {
    question: "Vilket AI är billigast 2026?",
    answer:
      "Bland de stora API-modellerna är Claude Haiku 4.5 ($1/M input, $5/M output), GPT-4o mini ($0,15/$0,60) och Gemini 2.5 Flash ($0,30/$2,50) de billigaste alternativet för de flesta användningsfall. DeepSeek V3 är billigast av allt med $0,28/$0,42 per miljon tokens men är kinesiskt och kräver separata sekretessbedömningar. Kalkylatorn ovan är förinställd på Claude Haiku — byt modell i rullgardinen för att jämföra.",
  },
  {
    question: "Är GPT-4o mini bättre än Claude Haiku för kundtjänst?",
    answer:
      "Båda fungerar utmärkt för kundtjänst. GPT-4o mini ($0,15/$0,60) är billigare per token men Claude Haiku 4.5 ($1/$5) anses ofta ge mer nyanserade svar på svenska. Testa gärna båda på era typiska kundärenden — skillnaden i kostnad per ärende är ofta under 1 öre, men svarskvaliteten kan skilja sig märkbart.",
  },
  {
    question: "Kan jag spara pengar med Gemini Flash istället för GPT-4o?",
    answer:
      "Ja. Gemini 2.5 Flash ($0,30/$2,50 per miljon tokens) är väsentligt billigare än GPT-4o ($2,50/$10,00) — ungefär 8× billigare på input och 4× billigare på output. Gemini Flash är snabb och kapabel men har lägre resoneringsförmåga än GPT-4o. Passar utmärkt för klassificering, sammanfattning och enkla chatbot-svar.",
  },
  {
    question: "Hur sparar prompt caching pengar?",
    answer:
      "Prompt caching innebär att AI-modellen återanvänder en bearbetad systemprompt istället för att läsa den på nytt vid varje anrop. Claude och Gemini erbjuder ca 90 % rabatt på cachade tokens. Om din systemprompt är 2 000 ord lång och du gör 1 000 anrop/dag sparar du upp till 90 % av input-kostnaden — vilket kan halvera den totala räkningen.",
  },
  {
    question: "Är öppen källkod billigare än kommersiella AI-modeller?",
    answer:
      "Ja, men med dolda kostnader. Open-source-modeller som Llama 4 och Mistral är gratis att ladda ner, men du betalar för GPU-beräkning — antingen via molntjänster som Replicate ($0,30–1,00/timme) eller egna servrar. För låg volym är kommersiellt API ofta billigare. För hög, förutsägbar volym (10 M+ tokens/dag) kan self-hosting löna sig.",
  },
];

export function BilligasteAi() {
  return (
    <>
      <SEO
        title="Billigaste AI 2026 — Jämför ChatGPT mini, Claude Haiku och Gemini Flash"
        description="Vilket AI är billigast 2026? Jämför GPT-4o mini, Claude Haiku 4.5 och Gemini 2.5 Flash. Räkna ut exakt kostnad i SEK med vår gratis kalkylator."
        canonical="/billigaste-ai"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Billigaste AI 2026", url: "https://aikostnad.se/billigaste-ai" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Billigaste AI 2026 — komplett jämförelse
          </h1>

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Alla stora AI-leverantörer erbjuder billiga "mini"-modeller som kostar
              10–50× mindre än deras flaggskeppsmodeller. För de flesta produktionsscenarier
              — kundtjänst, klassificering, sammanfattning, enkel kodgenerering — är
              dessa modeller tillräckligt bra.
            </p>
            <p>
              De tre billigaste API-alternativen från etablerade leverantörer är:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>GPT-4o mini</strong> — $0,15 input / $0,60 output per miljon tokens.
                OpenAI:s lilla modell är exceptionellt billig och snabb.{" "}
                <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">Detaljerad ChatGPT-prisguide</Link>.
              </li>
              <li>
                <strong>Gemini 2.5 Flash</strong> — $0,30 input / $2,50 output per miljon tokens.
                Googles snabbmodell med bra multimodalt stöd.
              </li>
              <li>
                <strong>Claude Haiku 4.5</strong> — $1,00 input / $5,00 output per miljon tokens.
                Anthropics lilla modell är dyrare per token men ger ofta bättre svenska svar.{" "}
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">Räkna på Claude i detalj</Link>.
              </li>
            </ul>
            <p>
              Kalkylatorn nedan är förinställd på Claude Haiku 4.5. Byt modell i
              rullgardinsmenyn för att jämföra direkt mot GPT-4o mini eller Gemini Flash
              — alla priser i svenska kronor med live-valutakurs.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

        <div className="mt-10 mb-10 card bg-amber-50 border-amber-100">
          <h2 className="text-sm font-bold text-amber-900 mb-2">
            Tumregel: när ska du välja mini vs flaggskepp?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-amber-800">
            <div>
              <p className="font-semibold mb-1">Välj billig mini-modell när:</p>
              <ul className="space-y-0.5 list-disc pl-4">
                <li>Uppgiften är väldefinierad (klassificering, extraktion, FAQ-svar)</li>
                <li>Volymen är hög (100+ anrop/dag)</li>
                <li>Svarstid är viktigare än djupanalys</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Välj flaggskeppsmodell när:</p>
              <ul className="space-y-0.5 list-disc pl-4">
                <li>Uppgiften kräver komplexa resonemang eller lång kontext</li>
                <li>Fel svar är kostsamma (juridik, medicin, kontrakt)</li>
                <li>Volym är låg och kvalitet avgörande</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Faktiska månadskostnader för 1 000 frågor/dag</h2>
          <p>
            Praktisk jämförelse — 1 000 frågor per dag, 22 arbetsdagar, svenska texter
            (100 ord input + 200 ord output per fråga). Priser per maj 2026, kurs
            1 USD = 10,50 SEK.
          </p>
          <div className="overflow-x-auto not-prose my-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Pris ($/Mtok)</th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">Månadskostnad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-green-50">
                  <td className="px-3 py-2 font-medium">Mistral Small</td>
                  <td className="px-3 py-2">0,10 / 0,30</td>
                  <td className="px-3 py-2 text-right font-medium">~30 kr</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">GPT-4o mini</td>
                  <td className="px-3 py-2">0,15 / 0,60</td>
                  <td className="px-3 py-2 text-right font-medium">~40 kr</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">DeepSeek V3.2</td>
                  <td className="px-3 py-2">0,28 / 0,42</td>
                  <td className="px-3 py-2 text-right font-medium">~70 kr</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Gemini 2.5 Flash</td>
                  <td className="px-3 py-2">0,30 / 2,50</td>
                  <td className="px-3 py-2 text-right font-medium">~280 kr</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Claude Haiku 4.5</td>
                  <td className="px-3 py-2">1,00 / 5,00</td>
                  <td className="px-3 py-2 text-right font-medium">~330 kr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Vinnaren per kategori</h2>
          <ul>
            <li>
              <strong>Absolut billigast:</strong> Mistral Small. Europeisk leverantör,
              GDPR-vänlig, riktigt liten kostnad. Lite svagare på svenska än GPT-4o mini
              men oslagbart för engelska eller flerspråkiga uppgifter.
            </li>
            <li>
              <strong>Bästa kvalitet per krona:</strong> GPT-4o mini. 8× billigare än Haiku
              med jämförbar kvalitet i de flesta uppgifter. Default-val för pris-medvetna
              byggare — se vår <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">ChatGPT-prisguide</Link>.
            </li>
            <li>
              <strong>Bästa svenska:</strong> Claude Haiku — dyrare men ger märkbart bättre
              svenska svar, särskilt i längre kontexter. Detaljerad analys i vår{" "}
              <Link to="/claude-pris" className="text-indigo-600 hover:underline">Claude-prisguide</Link>.
            </li>
            <li>
              <strong>Bästa open source:</strong> DeepSeek V3.2. Konkurrenskraftig kvalitet,
              låga priser, kan även köras self-hosted för full kontroll.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När mini-modeller inte räcker</h2>
          <p>
            Mini-modeller är fantastiska för 80 % av användningsfallen. Men de
            misslyckas konsekvent på följande:
          </p>
          <ul>
            <li>
              <strong>Resonemang i flera steg.</strong> Om uppgiften kräver att modellen
              "tänker högt" genom flera logiska steg innan svaret — flaggskepp vinner
              alltid.
            </li>
            <li>
              <strong>Komplex kodning.</strong> Mini kan skriva enkla funktioner. Skriva
              en hel feature från specifikation, hantera arkitektur eller debugga ett
              större problem kräver flaggskepp.
            </li>
            <li>
              <strong>Lång kontext.</strong> Mini håller koherens sämre när inputen är
              över 30K tokens. För riktigt långa dokument är GPT-4.1 eller Claude Opus
              överlägset.
            </li>
            <li>
              <strong>Kreativt skrivande på specifik stil.</strong> Mini följer prompten
              men ger generiska svar. För copywriting eller content som ska kännas
              "mänskligt" är Claude Sonnet eller GPT-4o bättre.
            </li>
          </ul>
          <p>
            <strong>Tumregeln:</strong> börja med mini, eskalera till flaggskepp endast
            där du ser kvalitetsproblem. Det är nästan alltid billigare än att börja med
            flaggskepp och försöka spara senare. Se{" "}
            <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">vår jämförelse av ChatGPT vs Claude</Link>{" "}
            för detaljerad analys av flaggskeppen.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["billigaste-ai"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om billig AI" />
      </main>
    </>
  );
}
