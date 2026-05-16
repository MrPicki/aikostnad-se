import { useState } from "react";
import { track } from "@vercel/analytics";

interface QuickFaqItem {
  question: string;
  answer: string;
}

const ITEMS: QuickFaqItem[] = [
  {
    question: "Vad kostar ChatGPT Plus per månad?",
    answer:
      "$20/mån, ca 210 kr beroende på dollarkurs. Det är samma pris som Claude Pro och Gemini Advanced. Gratis version finns men med begränsningar (färre meddelanden, äldre modell).",
  },
  {
    question: "Vad är skillnaden mellan ChatGPT Plus och ChatGPT API?",
    answer:
      "Plus är ett konsumentabonnemang för att använda ChatGPT via webben — fast månadspris. API är för utvecklare som vill bygga in AI i sin egen produkt — du betalar per token (textdel). Olika konton, olika fakturering. Plus räcker för 95% av användare.",
  },
  {
    question: "Behöver jag betala för att använda AI?",
    answer:
      "Nej. ChatGPT, Claude, Gemini och Copilot har alla gratisversioner som funkar för många användare. Du behöver bara betala om du behöver senaste modellen, högre användningsgräns eller specifika funktioner (bildgenerering, längre samtal, etc.).",
  },
];

export function HeroQuickFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      aria-label="Snabba svar på vanligaste AI-frågorna"
      className="max-w-2xl mx-auto -mt-4 mb-12"
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">
        Snabba svar
      </p>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`${i > 0 ? "border-t border-gray-100" : ""}`}
            >
              <button
                onClick={() => {
                  if (!isOpen) track("hero_quick_faq_open", { index: i, question: item.question });
                  setOpenIndex(isOpen ? null : i);
                }}
                className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`quick-faq-${i}`}
              >
                <span className="text-sm font-medium text-gray-800">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 text-gray-400 text-xs transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <div
                  id={`quick-faq-${i}`}
                  className="px-4 sm:px-5 pb-4 -mt-1 text-sm text-gray-600 leading-relaxed"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
