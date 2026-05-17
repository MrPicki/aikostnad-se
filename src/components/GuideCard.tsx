import { useState } from "react";
import { getGuideForModel } from "../data/guides";
import { GuideSlideOver } from "./GuideSlideOver";

interface Props {
  modelId: string;
  modelName?: string;
  source: string;
  className?: string;
}

function scrollToSubscriptions() {
  const el = document.getElementById("abonnemang");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function GuideCard({ modelId, modelName, source, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const guide = getGuideForModel(modelId);
  const displayName = modelName || guide.providerName;

  return (
    <>
      <div
        className={`relative rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-indigo-50/60 to-white p-5 sm:p-6 shadow-sm animate-fade-in-up overflow-hidden ${className}`}
      >
        {/* Decorative accent */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"
        />

        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white border border-indigo-200 rounded-full px-2.5 py-1 mb-3 shadow-sm">
            <span className="text-xs">📘</span>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
              Gratis startguide
            </span>
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-2">
            Få din personliga {displayName}-guide
          </h3>

          {/* Value props */}
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            10 minuter från konto till första AI-svar. Plus 3 spartips som kan
            halvera månadskostnaden — direkt till din inbox.
          </p>

          {/* Mini-checklist */}
          <ul className="space-y-1.5 mb-5">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-indigo-600 mt-0.5 shrink-0">✓</span>
              <span>Steg-för-steg: konto, API-nyckel, första anropet</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-indigo-600 mt-0.5 shrink-0">✓</span>
              <span>Sätt utgiftsgräns så notan aldrig överraskar</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-indigo-600 mt-0.5 shrink-0">✓</span>
              <span>Vanliga misstag som kostar tusenlappar — undvik dem</span>
            </li>
          </ul>

          {/* Primary CTA */}
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-base font-bold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Skicka guiden till mig
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </button>

          {/* Trust signals */}
          <p className="text-xs text-gray-500 text-center mt-3">
            100% gratis · Inget kort behövs · Ett mejl, inga utskick
          </p>

          {/* Secondary path — much smaller */}
          <div className="mt-4 pt-4 border-t border-indigo-100/70 text-center">
            <button
              onClick={scrollToSubscriptions}
              className="text-xs text-gray-500 hover:text-indigo-700 inline-flex items-center gap-1 transition-colors"
            >
              Vill du bara prenumerera istället?{" "}
              <span className="font-semibold underline-offset-2 hover:underline">
                Se färdiga månadsabonnemang ↓
              </span>
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
