import { useState } from "react";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Vad kostar ChatGPT per månad?",
    answer:
      "ChatGPT Plus kostar $20 per månad (ca 210 kr) och ger tillgång till GPT-4o, bildgenerering och webbsökning. ChatGPT API prissätts däremot per token: GPT-4o kostar $2,50 per miljon input-tokens och $10,00 per miljon output-tokens. För en webapp med 1 000 dagliga användare kan API-kostnaden landa på 2 000–5 000 kr per månad beroende på användning.",
  },
  {
    question: "Vad är skillnaden mellan ChatGPT Plus och ChatGPT API?",
    answer:
      "ChatGPT Plus är ett konsumentabonnemang ($20/mån) för att använda ChatGPT via webbgränssnittet. ChatGPT API är för utvecklare som vill integrera GPT-modeller i egna applikationer — det faktureras per token och har inget fast månadspris. De delar inte kredit och kräver separata konton.",
  },
  {
    question: "Vad är ett token?",
    answer:
      "Ett token är en textbit som en AI-modell bearbetar — ungefär 0,75 ord på engelska. För svenska texter är det ca 1,3 tokens per ord, på grund av å/ä/ö och långa sammansatta ord. Det betyder att svenska texter kostar ca 73 % mer att processa än engelska, vilket den här kalkylatorn räknar in automatiskt.",
  },
  {
    question: "Vilken AI-modell är billigast 2026?",
    answer:
      "Bland kommersiella API:er är DeepSeek V3.2 ($0,28/$0,42 per Mtok), Mistral Small ($0,10/$0,30) och GPT-4o mini ($0,15/$0,60) billigast. Gemini 2.5 Flash är billig på input men dyrare på output. För open-weight-modeller är Llama 3.3 70B via Groq snabb och prisvärd. Se jämförelsetabellen för aktuella priser sorterade per fråga.",
  },
  {
    question: "Vad kostar det att bygga en AI-chatbot?",
    answer:
      "Det beror på volym och modell. Med GPT-4o mini och 500 dagliga användare (50 frågor/dag, 100 ord input + 200 ord output per fråga) landar månadskostnaden på ungefär 100–300 kr. Med GPT-4o för samma volym ökar det till 800–2 000 kr. Fyll i dina siffror i kalkylatorn ovan för ett exakt svar.",
  },
  {
    question: "Hur kostar Claude jämfört med ChatGPT?",
    answer:
      "Claude Sonnet 4.6 kostar $3,00/$15,00 per Mtok och Claude Haiku 4.5 $1,00/$5,00. GPT-4o kostar $2,50/$10,00. I praktiken är de jämförbara för de flesta scenarion — välj baserat på uppgiftstyp. Claude anses starkare på lång textanalys; GPT-4o på multimodala uppgifter.",
  },
  {
    question: "Varför kostar output mer än input per token?",
    answer:
      "Modellen genererar output token för token, vilket kräver mer beräkning än att läsa input. Hos GPT-4o är output 4× dyrare per token än input ($10 vs $2,50). Det innebär att långa svar är dyra — håll output-längden kort om du vill sänka kostnaden.",
  },
  {
    question: "Vad är prompt caching och hur sparar det pengar?",
    answer:
      "Prompt caching innebär att AI-leverantören återanvänder en del av en tidigare prompt — typiskt en lång systemprompt eller dokumentkontext — istället för att processa hela inputen på nytt. Anthropic och OpenAI ger upp till 90 % rabatt på cachad input. För en chatbot med en 5 000-tokens systemprompt kan caching halvera månadskostnaden.",
  },
  {
    question: "Skiljer sig kostnaden för svenska och engelska AI-svar?",
    answer:
      "Ja. Svenska ord tokeniseras till ca 1,3 tokens/ord, engelska till ca 0,75. En prompt på 100 svenska ord kostar alltså ungefär lika mycket som 173 engelska ord. Vill du sänka kostnaden? Skriv system-promptar på engelska — det påverkar inte modellens förmåga att svara på svenska.",
  },
  {
    question: "Vad kostar det att analysera avtal och dokument med AI?",
    answer:
      "Ett kontrakt på ca 10 sidor (5 000 ord) ger ungefär 6 500 input-tokens. Med Claude Sonnet 4.6 ($3/$15 per Mtok) och en sammanfattning på 500 ord (~650 tokens) blir kostnaden ca $0,03 — ca 30 öre per analys. För 50 dokument per dag landar månadskostnaden på ca 33 kr. Stora dokument (50+ sidor)? Välj Gemini 2.5 Pro med 1 M tokens context.",
  },
  {
    question: "Hur många tokens får plats i en AI-modells context-fönster?",
    answer:
      "Kontextfönstret varierar kraftigt. GPT-4.1 och Gemini 2.5 Flash hanterar 1 miljon tokens (ca 750 000 svenska ord). Claude-modellerna ligger på 200 K tokens. GPT-4o och Llama 3.3 på 128 K. För korta chattar räcker 32 K mer än väl — för dokumentanalys eller långa konversationer väljer du en modell med större context.",
  },
  {
    question: "Är open-source-modeller alltid billigare?",
    answer:
      "Inte alltid. Open-weight-modeller som Llama 3.3 70B och DeepSeek V3.2 är billiga via providers som Groq och DeepSeek API. Self-hostat blir kostnaden främst GPU-hyra — typiskt 5–20 kr/timme för en H100. Det lönar sig vid hög och jämn volym; för låg eller variabel trafik vinner kommersiella API:er nästan alltid eftersom du bara betalar för faktisk användning.",
  },
  {
    question: "Hur konverterar ni priset till kronor?",
    answer:
      "Vi hämtar live-valutakursen (USD/SEK) dagligen från Frankfurter API. Om hämtningen misslyckas används en fallback-kurs på 10,50 kr. Den aktuella kursen visas alltid i kalkylatorn och i abonnemangstabellen.",
  },
  {
    question: "Hur ofta uppdateras AI-priserna?",
    answer:
      "Vi verifierar priserna månadsvis mot respektive leverantörs prissida. Datumet för senaste verifiering visas i kalkylatorn och i sidfoten. Om du hittar ett felaktigt pris, hör gärna av dig till hej@aikostnad.se.",
  },
  {
    question: "Kan jag använda kalkylatorn för att beräkna kostnad för mitt SaaS?",
    answer:
      "Ja. Fyll i antal användare, genomsnittliga frågor per dag och typisk längd på input och output. Kalkylatorn ger dig månads- och årskostnad för hela din användarbas. Kopiera länken under resultatet för att spara och dela din kalkyl.",
  },
  {
    question: "Stöder kalkylatorn Gemini, DeepSeek och Llama?",
    answer:
      "Ja. Kalkylatorn täcker Gemini 2.5 Flash och Pro (Google), DeepSeek V3.2 och R1, Llama 3.3 70B (via Groq), Mistral Large och Small, samt alla stora OpenAI- och Anthropic-modeller — 14 modeller totalt.",
  },
  {
    question: "Kan jag dela min kalkyl med en kollega?",
    answer:
      "Ja. Alla värden sparas automatiskt i URL-parametrar. Klicka på 'Kopiera länk' under resultatet för att kopiera en direktlänk — din kollega öppnar exakt samma kalkyl med dina siffror.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        <span
          className={`flex-shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section aria-label="Vanliga frågor">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Vanliga frågor om AI-kostnader
      </h2>

      <div className="card divide-y divide-gray-200 p-0 px-6">
        {faqs.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
