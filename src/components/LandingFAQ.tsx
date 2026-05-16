import { useState } from "react";
import { Helmet } from "react-helmet-async";

export interface FAQItem {
  question: string;
  answer: string;
}

export function LandingFAQ({ items, heading = "Vanliga frågor" }: { items: FAQItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section aria-label={heading} className="mt-12">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
      <div className="card divide-y divide-gray-200 p-0 px-6">
        {items.map((item, i) => (
          <div key={i} className="border-b border-gray-200 last:border-0">
            <button
              className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              aria-controls={`landing-faq-answer-${i}`}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className={`flex-shrink-0 text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              id={`landing-faq-answer-${i}`}
              className={`overflow-hidden transition-all ${openIndex === i ? "max-h-96 pb-5" : "max-h-0"}`}
            >
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
