import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

const INITIAL_VALUES = { modelId: "gpt-4.1" } as const;

const faqs: FAQItem[] = [
  {
    question: "Vad kostar GPT-4.1 per token?",
    answer:
      "GPT-4.1 kostar $2,00 per miljon input-tokens och $8,00 per miljon output-tokens (maj 2026). Det är billigare på input än GPT-4o ($2,50/$10) men dyrare än GPT-4.1 mini ($0,40/$1,60). Kalkylatorn ovan räknar om till svenska kronor med live-valutakurs.",
  },
  {
    question: "Vad är skillnaden mellan GPT-4.1 och GPT-4o?",
    answer:
      "GPT-4.1 är OpenAI:s senaste version i GPT-4-familjen, optimerad för följsamhet och kodkvalitet. GPT-4o är multimodal (text, bild, ljud) och det primära valet för chatbot-scenarier. GPT-4.1 är något billigare och passar bättre för rena textuppgifter som kodgenerering, textanalys och strukturerade outputs. För svenska konversationer presterar de likartat.",
  },
  {
    question: "Finns en billigare version av GPT-4.1?",
    answer:
      "Ja — GPT-4.1 mini kostar $0,40 per miljon input-tokens och $1,60 per miljon output-tokens, vilket är 5× billigare än GPT-4.1 full. Det finns även GPT-4.1 nano för ännu lägre kostnad. Välj GPT-4.1 mini i kalkylatorn ovan för att se hur stor kostnadsskillnaden blir för ditt scenario.",
  },
  {
    question: "Passar GPT-4.1 för kodgenerering?",
    answer:
      "Ja, GPT-4.1 är specifikt optimerad för att följa komplexa kodningsinstruktioner och håller hög precision på multi-steg programmeringsuppgifter. Det är ett av de populäraste valen för AI-kodassistenter och automatiserade pull requests. Kontextfönstret på 1 miljon tokens innebär att du kan skicka in hela kodbaser.",
  },
  {
    question: "Hur skiljer sig GPT-4.1 från GPT-4 Turbo?",
    answer:
      "GPT-4.1 ersätter i praktiken GPT-4 Turbo. Den har bättre instruktionsföljning, lägre hallucinationsfrekvens och ett kontextfönster på upp till 1 miljon tokens. Priserna är jämförbara men GPT-4.1 anses generellt bättre — de flesta som använde GPT-4 Turbo bör migrera till GPT-4.1.",
  },
];

export function Gpt4Pris() {
  return (
    <>
      <SEO
        title="GPT-4.1 Pris — vad kostar GPT-4 API per månad?"
        description="Räkna ut vad GPT-4.1 kostar per token och per månad. Jämför med GPT-4o och Claude med live-valutakurs i SEK."
        canonical="/gpt-4-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "GPT-4.1 pris", url: "https://aikostnad.se/gpt-4-pris" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            GPT-4.1 pris — räkna ut vad GPT-4 API kostar
          </h1>

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              OpenAI:s <strong>GPT-4.1</strong> är den senaste modellen i GPT-4-familjen,
              designad för hög kodkvalitet och noggrann instruktionsföljning. Den kostar{" "}
              <strong>$2,00 per miljon input-tokens</strong> och{" "}
              <strong>$8,00 per miljon output-tokens</strong> (maj 2026) — något billigare
              än GPT-4o på båda axlarna.
            </p>
            <p>
              GPT-4.1 stöder ett <strong>kontextfönster på upp till 1 miljon tokens</strong>,
              vilket öppnar för scenarier där du behöver inkludera stora kodbaser,
              dokument eller långa konversationshistoriker i en enda förfrågan. Tänk på att
              ett fullt 1 M-token anrop kostar $2 enbart i input — kontextfönster ska
              användas med omtanke.
            </p>
            <p>
              OpenAI erbjuder tre varianter i familjen: <strong>GPT-4.1</strong> (full
              kapacitet), <strong>GPT-4.1 mini</strong> (5× billigare, för höga volymer)
              och <strong>GPT-4.1 nano</strong> (extremt låg latens och kostnad för enkla
              uppgifter). Kalkylatorn nedan låter dig byta mellan dem och se hur kostnaden
              förändras. För höga volymer där priset är primärt jämför vi alla{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">billigaste mini-modellerna</Link>{" "}
              sida vid sida.
            </p>
            <p>
              För <strong>svenska texter</strong> gäller fortfarande 73 %-regeln: svenska
              ord kostar ca 73 % mer per ord att processa än engelska på grund av
              tokeniseringen. Kalkylatorn räknar in detta automatiskt — så siffrorna
              reflekterar din faktiska svenska trafik.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

        <section className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">GPT-4.1 vs GPT-4o vs GPT-4o mini — vilken passar?</h2>
          <p>
            OpenAI har idag tre tunga modeller med tydligt olika roller. Här är när du
            behöver vilken:
          </p>

          <div className="space-y-4 not-prose">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-indigo-900 mb-2">GPT-4.1 — $2/$8 per Mtok, 1M kontext</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Långa kodbas-analyser (hela repon i en prompt)</li>
                <li>Strategisk planering över många dokument</li>
                <li>Forskningsuppgifter med stora datamängder</li>
                <li>Det bästa kodningsresultatet bland OpenAI:s modeller</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-900 mb-2">GPT-4o — $2,50/$10 per Mtok, 128K kontext</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Bredast modell — multimodalt (bild, ljud, text)</li>
                <li>Default-val för chatbots och webbappar</li>
                <li>När du behöver webbsökning eller DALL·E-integration</li>
                <li>Real-time röstkonversation</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-purple-900 mb-2">GPT-4o mini — $0,15/$0,60 per Mtok, 128K kontext</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Hög volym till låg kostnad</li>
                <li>Klassificering och extraktion</li>
                <li>Routing-modell i hybrid-arkitektur</li>
                <li>17× billigare än GPT-4o per token</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När är GPT-4.1 värt extrakostnaden?</h2>
          <p>
            GPT-4.1 har lägre input-pris än GPT-4o ($2 vs $2,50) men något lägre
            output-pris ($8 vs $10). Den stora skillnaden är kontextfönstret —{" "}
            <strong>1 miljon tokens mot 128K hos GPT-4o</strong>. Värt extrakostnaden när:
          </p>
          <ul>
            <li>
              <strong>Du behöver 200K+ tokens kontext</strong> — GPT-4.1 är ofta enda
              kommersiella alternativet för riktigt långa dokument.
            </li>
            <li>
              <strong>Kodningsuppgifter över hela kodbasen</strong> — GPT-4.1 ligger topp
              eller näst topp på SWE-bench Verified från månad till månad.
            </li>
            <li>
              <strong>Multi-dokument-analys</strong> — resonemang över flera långa filer
              samtidigt utan att splitta upp dem i mindre delar.
            </li>
          </ul>
          <p>
            För 80 % av andra användningsfall är GPT-4o eller mini bättre val. Vill du
            jämföra GPT-4.1 mot Claude Opus 4.7 (motsvarande flaggskepp hos Anthropic)?
            Se vår <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">jämförelse mellan ChatGPT och Claude</Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Hybrid-routing — sänk kostnaden 70 %</h2>
          <p>
            Den vanligaste optimeringen i produktion: skicka 80–90 % av trafiken till
            GPT-4o mini och eskalera till GPT-4.1 endast när mini-modellen flaggar att
            den är osäker (via confidence-score eller fail-detection). Implementationen
            är typiskt 50 rader kod och besparingen är 70–80 % jämfört med att köra allt
            på GPT-4.1.
          </p>
          <p>
            Konkret exempel: en chatbot med 1 000 frågor/dag som körs helt på GPT-4.1
            kostar ~700 kr/mån. Samma chatbot med hybrid-routing (90 % mini, 10 % GPT-4.1)
            kostar ~150 kr/mån — utan märkbar kvalitetsförlust.
          </p>
        </section>

        <LandingFAQ items={faqs} heading="Vanliga frågor om GPT-4.1-priser" />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Vill du jämföra med ChatGPT (GPT-4o)?{" "}
            <Link to="/vad-kostar-chatgpt" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              Se GPT-4o-kalkylatorn
            </Link>{" "}
            eller{" "}
            <Link to="/" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              hela jämförelsetabellen på startsidan
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
