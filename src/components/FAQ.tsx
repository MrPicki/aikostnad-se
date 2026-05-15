import { useState } from "react";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Vad kostar ChatGPT API per månad?",
    answer:
      "Kostnaden beror på hur många tokens du skickar och tar emot. GPT-4o kostar $2.50/Mtok (input) och $10/Mtok (output). Med 100 frågor per dag á 100 input-ord och 200 output-ord kostar det ungefär 5–15 kr per dag, eller 100–300 kr per månad. Använd vår kalkylator för ett exakt estimat.",
  },
  {
    question: "Vad är ett token?",
    answer:
      "Ett token är en textbit som en AI-modell bearbetar — ungefär 0,75 ord på engelska. För svenska texter (med å, ä, ö och långa sammansatta ord) är det däremot ca 1,3 tokens per ord. Det betyder att svenska texter kostar mer att processa än engelska, vilket vår kalkylator tar hänsyn till.",
  },
  {
    question: "Vilken AI-modell är billigast?",
    answer:
      "Gemini 2.0 Flash och Mistral Small är bland de billigaste kommersiella API:erna. GPT-4o mini och Claude Haiku är också kostnadseffektiva. För maximalt budgetsnål körning kan open source-modeller som Llama 3.3 via Groq vara ännu billigare. Se vår jämförelsetabell för aktuella priser.",
  },
  {
    question: "Skiljer sig kostnaden för svenska och engelska AI-svar?",
    answer:
      "Ja. Svenska texter tokeniseras till fler tokens per ord jämfört med engelska — ungefär 1,3 vs 0,75. Det gör att en prompt på 100 svenska ord kostar ca 73% mer att bearbeta än 100 engelska ord, allt annat lika.",
  },
  {
    question: "Hur konverterar ni priset till kronor?",
    answer:
      "Vi hämtar en live-valutakurs (USD/SEK) dagligen via Frankfurter API. Om hämtningen misslyckas används en fallback-kurs på 10,50 kr. Kursen visas alltid synligt i kalkylatorn så du vet vilket underlag som används.",
  },
  {
    question: "Hur ofta uppdateras AI-priserna på sidan?",
    answer:
      "Vi siktar på att verifiera priserna månadsvis — AI-priser ändras relativt ofta. Datumet för senaste verifiering visas i kalkylatorn och i sidfoten. Om du hittar ett felaktigt pris, kontakta oss gärna.",
  },
  {
    question: "Kan jag använda kalkylatorn för att beräkna kostnaden för min SaaS-produkt?",
    answer:
      "Absolut. Fyll i antal användare, genomsnittligt antal frågor per dag, och beräknad input/output-längd. Kalkylatorn ger dig månadskostnaden för hela din användarbas, vilket är perfekt för att sätta rätt pris på din produkt.",
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
