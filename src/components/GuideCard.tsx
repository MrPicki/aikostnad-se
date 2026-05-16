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

  const displayName = modelName || guide.providerName;

  function scrollToSubscriptions() {
    const el = document.getElementById("abonnemang");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div
        className={`rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6 animate-fade-in-up ${className}`}
      >
        <div className="mb-5">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
            Nästa steg
          </p>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Vill du börja använda {displayName}?
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mt-1.5">
            Det finns två vägar — välj den som passar dig.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Path 1: Subscription / consumer */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">📱</span>
              <p className="text-sm font-semibold text-gray-900">Bara använda</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">
              ChatGPT Plus, Claude Pro m.fl. — fasta månadspriser från ca 210 kr.
              Inga API-nycklar, ingen kod.
            </p>
            <button
              onClick={scrollToSubscriptions}
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              Se abonnemang ↓
            </button>
          </div>

          {/* Path 2: Build with API */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">💻</span>
              <p className="text-sm font-semibold text-gray-900">Bygga med API</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">
              Integrera {displayName} i din app eller webbsida — vi mejlar
              en steg-för-steg-guide.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              Öppna API-guide →
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
