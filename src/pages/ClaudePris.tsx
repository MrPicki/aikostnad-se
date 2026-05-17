import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { relatedArticles } from "../data/relatedArticles";

const INITIAL_VALUES = { modelId: "claude-sonnet-4-6" } as const;

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Claude Sonnet 4.6 per token?",
    answer:
      "Claude Sonnet 4.6 kostar $3,00 per miljon input-tokens och $15,00 per miljon output-tokens (maj 2026). Det är något dyrare än GPT-4o på input men likvärdigt i prestanda för de flesta användningsfall. Kalkylatorn ovan räknar om kostnaden till svenska kronor med live-valutakurs.",
  },
  {
    question: "Vad är skillnaden mellan Claude Opus, Sonnet och Haiku?",
    answer:
      "Anthropic erbjuder tre prestandanivåer: Opus 4.7 är flaggskeppet för komplexa resonemang ($5/$25 per Mtok), Sonnet 4.6 är mellannivån med bra balans mellan förmåga och pris ($3/$15), och Haiku 4.5 är den snabba och billigaste varianten ($1/$5). Välj Sonnet för de flesta produktionsscenarier och Haiku när volym och latens är viktigare än maximal precision.",
  },
  {
    question: "Är Claude billigare eller dyrare än ChatGPT?",
    answer:
      "Det beror på vilka modeller du jämför. Claude Sonnet 4.6 ($3/$15 per Mtok) är dyrare på input än GPT-4o ($2,50/$10) men billigare än GPT-4.1 ($2/$8). Claude Haiku 4.5 ($1/$5) är däremot billigare än GPT-4o mini ($0,15/$0,60 — nej, mini är faktiskt billigast totalt). Använd jämförelsetabellen på startsidan för full översikt.",
  },
  {
    question: "Stöder Claude prompt caching?",
    answer:
      "Ja. Anthropic erbjuder prompt caching för långa system-promptar som återanvänds ofta — cached input kostar bara 10 % av normalt pris. Om din applikation har en fast, lång systemkontext kan det minska input-kostnaden med upp till 90 % för de delar som cachas.",
  },
  {
    question: "Varför väljer företag Claude framför GPT?",
    answer:
      "Claude upplevs av många som mer försiktig med känsliga ämnen, bättre på att följa komplexa instruktioner och starka på kod och analys. Anthropic betonar AI-säkerhet (Constitutional AI), vilket är ett argument för regulerat-känsliga branscher. Valet beror på ditt specifika användningsfall — vi rekommenderar att testa båda på ditt faktiska data.",
  },
];

export function ClaudePris() {
  return (
    <>
      <SEO
        title="Claude Pris — vad kostar Claude Sonnet API per månad?"
        description="Se vad Claude Sonnet 4.6 kostar per token och per månad. Jämför med ChatGPT och beräkna din AI-budget med live-kurs i SEK."
        canonical="/claude-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Claude pris", url: "https://aikostnad.se/claude-pris" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Claude pris — räkna ut vad Claude API kostar
          </h1>

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Anthropics Claude-modeller prissätts per token precis som OpenAI:s GPT.{" "}
              <strong>Claude Sonnet 4.6</strong> — den populäraste modellen för
              produktionsapplikationer — kostar <strong>$3,00 per miljon input-tokens</strong>{" "}
              och <strong>$15,00 per miljon output-tokens</strong> (maj 2026).
            </p>
            <p>
              Anthropic delar upp sitt sortiment i tre nivåer: <strong>Opus</strong> för de
              tyngsta resonemangsproblemen, <strong>Sonnet</strong> som balansen mellan
              förmåga och kostnad, och <strong>Haiku</strong> för snabba, höga volymer.
              Sonnet är standardvalet för de flesta produktionsscenarion. Letar du efter
              det allra billigaste alternativet finns Haiku med i vår{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">jämförelse av billigaste AI-modellerna</Link>.
            </p>
            <p>
              För <strong>svenska texter</strong> gäller samma tokeniseringsöverhead som för
              alla stora modeller: ca 1,3 tokens per ord jämfört med 0,75 på engelska.
              Svenska promptar kostar alltså ca <strong>73 % mer per ord</strong> än
              engelska. Kalkylatorn nedan räknar in detta automatiskt.
            </p>
            <p>
              En annan Anthropic-fördel värd att känna till är <strong>prompt caching</strong>:
              om din applikation har en lång, återanvänd systemkontext (t.ex. instruktioner
              eller dokumentation) kan du cache:a den och betala bara 10 % av normalt
              input-pris på den delen. Det kan halvera kostnaden i chatbot-scenarier — läs
              mer om hur du{" "}
              <Link to="/vad-kostar-ai" className="text-indigo-600 hover:underline">påverkar din totala AI-kostnad</Link>.
            </p>
            <p>
              Kalkylatorn nedan är förinställd på Claude Sonnet 4.6. Byt till Haiku eller
              Opus för att jämföra inom Claude-familjen.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

        <section className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Claude-prisexempel för vanliga scenarier</h2>
          <p>
            Tre scenarier som visar verkliga månadskostnader för Claude på svenska. Räknat
            med 100 ord input + 200 ord output per fråga och 22 arbetsdagar.
          </p>
          <div className="space-y-4 not-prose">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-900 mb-2">Personlig användning — 50 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Claude Pro-abonnemang: <strong>210 kr/mån</strong></li>
                <li>Claude Haiku 4.5 API: <strong>~17 kr/mån</strong></li>
                <li>Claude Sonnet 4.6 API: <strong>~50 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Pro-abonnemanget inkluderar Projects (delade kontexter) och högre
                prioritetslimits — lönsamt om du använder Claude dagligen.
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-indigo-900 mb-2">Småföretag — 500 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Claude Haiku 4.5: <strong>~165 kr/mån</strong></li>
                <li>Claude Sonnet 4.6: <strong>~496 kr/mån</strong></li>
                <li>Sonnet + prompt caching: <strong>~280 kr/mån</strong></li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-purple-900 mb-2">Mellanstort B2C — 5 000 frågor/dag</h3>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>Claude Haiku: <strong>~1 650 kr/mån</strong></li>
                <li>Claude Sonnet: <strong>~4 960 kr/mån</strong></li>
                <li>Sonnet + caching: <strong>~2 800 kr/mån</strong> (besparing 43 %)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När räcker Haiku — och när är Sonnet värt det?</h2>
          <p>
            Den vanligaste frågan bland Claude-användare. Här är vår heuristik från
            verkliga produktionsapplikationer:
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Välj Haiku 4.5 för:</h3>
          <ul>
            <li>Klassificering ("är denna kommentar positiv eller negativ?")</li>
            <li>FAQ-svar baserat på en kort kunskapsbas</li>
            <li>Snabba enkla skrivuppgifter (titlar, sammanfattningar)</li>
            <li>Routing-beslut — vilken modell ska få frågan?</li>
            <li>Höga volymer där kostnaden måste minimeras</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Välj Sonnet 4.6 för:</h3>
          <ul>
            <li>Komplexa kundkommentarer med flera frågor i en</li>
            <li>Längre dokumentanalyser (kontrakt, rapporter, PDF:er)</li>
            <li>Skrivande där tonen är viktig (kundkommunikation, marknadsföring)</li>
            <li>Resonemang över flera steg innan svar</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Välj Opus 4.7 för:</h3>
          <ul>
            <li>Avancerad kodning och agentic workflows</li>
            <li>Strategisk analys där fel är dyrt</li>
            <li>Forskningsuppgifter med stora datamängder</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Prompt caching — Anthropics hemliga prisvapen</h2>
          <p>
            Claude erbjuder prompt caching med ca <strong>90 % rabatt på återanvänd input</strong>.
            För en chatbot med 2 000 ord lång system-prompt och hög volym kan caching
            halvera totalkostnaden. Den vanligaste rekommendationen vi ger till
            Claude-användare som inte redan har caching aktiverat: aktivera det idag.
          </p>
          <p>
            Se vår <Link to="/prompt-caching" className="text-indigo-600 hover:underline">djupguide om prompt caching</Link>{" "}
            för konkreta räkneexempel, implementation-tips och jämförelse med OpenAI:s
            automatiska caching.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["claude-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om Claude-priser" />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Vill du jämföra med ChatGPT?{" "}
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
