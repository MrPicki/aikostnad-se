import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

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
              Sonnet är standardvalet för de flesta produktionsscenarion.
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
              input-pris på den delen. Det kan halvera kostnaden i chatbot-scenarier.
            </p>
            <p>
              Kalkylatorn nedan är förinställd på Claude Sonnet 4.6. Byt till Haiku eller
              Opus för att jämföra inom Claude-familjen.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

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
