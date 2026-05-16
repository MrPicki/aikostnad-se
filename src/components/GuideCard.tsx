import { useState } from "react";
import { getGuideForModel } from "../data/guides";
import { GuideSlideOver } from "./GuideSlideOver";

interface Props {
  modelId: string;
  modelName?: string;
  source: string;
  className?: string;
}

export function GuideCard({ modelId, modelName, source, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const guide = getGuideForModel(modelId);
  if (!guide) return null;

  return (
    <>
      <div
        className={`rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6 animate-fade-in-up ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-xl">
            📘
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
              Nästa steg
            </p>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-tight">
              Vill du veta hur du faktiskt bygger detta?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Vi visar steg-för-steg hur du sätter upp {modelName || guide.providerName},
              API-nycklar, kostnader och verktyg — anpassat efter ditt val.
            </p>

            <ul className="space-y-1.5 mb-5">
              {guide.whatYouLearn.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-indigo-500 mt-0.5 flex-shrink-0">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white border border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Öppna guide
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <GuideSlideOver
        guide={guide}
        open={open}
        onClose={() => setOpen(false)}
        modelName={modelName}
        source={source}
      />
    </>
  );
}
