import type { ReactNode } from "react";

interface TLDRProps {
  question: string;
  answer: ReactNode;
  bullets?: string[];
}

export function TLDR({ question, answer, bullets }: TLDRProps) {
  return (
    <aside
      className="tldr not-prose mb-8 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/70 p-5 sm:p-6 speakable"
      aria-label="Snabbt svar"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
        Snabbt svar
      </p>
      <p className="text-base font-bold text-gray-900 mb-2">{question}</p>
      <div className="text-base leading-relaxed text-gray-800">{answer}</div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc pl-5">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
