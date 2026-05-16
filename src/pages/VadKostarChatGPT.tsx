import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Calculator } from "../components/Calculator";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

const INITIAL_VALUES = { modelId: "gpt-4o" } as const;

const faqs: FAQItem[] = [
  {
    question: "Vad kostar ett GPT-4o API-anrop?",
    answer:
      "GPT-4o prissätts per token: $2,50 per miljon input-tokens och $10,00 per miljon output-tokens (maj 2026). Ett typiskt anrop med 100 ord input och 200 ord output kostar ungefär $0,003–0,004, vilket motsvarar ca 3–4 öre. Kostnaden skalar linjärt med antal förfrågningar.",
  },
  {
    question: "Är GPT-4o mini billigare än GPT-4o?",
    answer:
      "Ja, GPT-4o mini kostar $0,15 per miljon input-tokens och $0,60 per miljon output-tokens — ungefär 16× billigare än GPT-4o. För enkla uppgifter som klassificering, sammanfattning eller korta svar är mini ofta ett utmärkt val. Välj GPT-4o mini i kalkylatorn ovan för att jämföra.",
  },
  {
    question: "Hur mycket kostar ChatGPT API per månad för en typisk webapp?",
    answer:
      "Med 1 000 dagliga användare som ställer 5 frågor var (100 ord input, 200 ord output) på GPT-4o landar månadskostnaden på ungefär 2 000–4 000 kr. Den exakta summan beror på textlängd och om du använder svenska (som kostar ca 73 % mer per ord än engelska). Fyll i dina siffror i kalkylatorn ovan för ett exakt svar.",
  },
  {
    question: "Varför kostar svenska texter mer att bearbeta?",
    answer:
      "AI-modeller mäter kostnad i tokens, inte ord. Engelska ord är ca 0,75 tokens per ord, men svenska — med långa sammansatta ord och tecknen å, ä, ö — tokeniseras till ca 1,3 tokens per ord. Det innebär att en svensk prompt på 100 ord kostar ungefär lika mycket som en engelsk prompt på 170 ord. Kalkylatorn räknar automatiskt med denna faktor.",
  },
  {
    question: "Skiljer sig kostnaden för ChatGPT Plus och API?",
    answer:
      "Ja, de är helt separata produkter. ChatGPT Plus ($20/månad) ger dig tillgång till ChatGPT-webbgränssnittet med GPT-4o. OpenAI API faktureras per token och används när du bygger egna applikationer. De delar inte kredit eller prenumeration — du betalar för vardera separat.",
  },
];

export function VadKostarChatGPT() {
  return (
    <>
      <SEO
        title="Vad kostar ChatGPT? Räkna ut API-kostnaden för GPT-4o"
        description="Räkna ut exakt vad ChatGPT (GPT-4o) kostar per månad för din svenska applikation. Gratis kalkylator med live-valutakurs i SEK."
        canonical="/vad-kostar-chatgpt"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Vad kostar ChatGPT?", url: "https://aikostnad.se/vad-kostar-chatgpt" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Vad kostar ChatGPT? Räkna ut din API-kostnad
          </h1>

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              ChatGPT via OpenAI:s API prissätts per <strong>token</strong> — den textenhet som
              AI-modeller bearbetar. GPT-4o, OpenAI:s flaggskeppsmodell, kostar{" "}
              <strong>$2,50 per miljon input-tokens</strong> och{" "}
              <strong>$10,00 per miljon output-tokens</strong> (maj 2026). Det låter billigt —
              men kostnaderna staplas snabbt på varandra i en riktig applikation.
            </p>
            <p>
              För <strong>svenska texter</strong> tillkommer en extra faktor: svenska ord
              tokeniseras till ca 1,3 tokens vardera, jämfört med 0,75 på engelska. Det
              beror på långa sammansatta ord och tecken som å, ä och ö. Resultatet är att
              en svensk prompt kostar ungefär <strong>73 % mer</strong> per ord än en
              likadan på engelska. Kalkylatorn nedan räknar in detta automatiskt.
            </p>
            <p>
              Tre faktorer driver din månadsnota mest:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Antal förfrågningar per dag</strong> — skalas rakt upp med
                antalet aktiva användare och hur ofta de skickar meddelanden.
              </li>
              <li>
                <strong>Kontextlängd</strong> — en chatbot som inkluderar hela
                konversationshistoriken i varje anrop kan lätt tredubbla
                token-förbrukningen.
              </li>
              <li>
                <strong>Output-längd</strong> — GPT-4o:s output kostar 4× mer per token
                än input. Kortare svar sparar direkt pengar. Behöver du ännu lägre kostnad?
                Jämför med <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">de billigaste AI-modellerna</Link>{" "}
                som GPT-4o mini och Claude Haiku.
              </li>
            </ul>
            <p>
              Kalkylatorn nedan är förinställd på GPT-4o och räknar med live-valutakurs
              mot svenska kronor. Justera värdena för att matcha ditt scenario, och
              kopiera länken under resultatet för att spara kalkylen.
            </p>
          </div>
        </div>

        <Calculator initialValues={INITIAL_VALUES} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om ChatGPT-kostnad" />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Vill du jämföra med andra modeller?{" "}
            <Link to="/" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              Se hela jämförelsetabellen på startsidan
            </Link>{" "}
            eller kolla{" "}
            <Link to="/claude-pris" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              vad Claude kostar
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
