import { useEffect } from "react";
import type { Guide } from "../data/guides/types";
import { EmailCaptureForm } from "./EmailCaptureForm";

interface Props {
  guide: Guide;
  open: boolean;
  onClose: () => void;
  modelName?: string;
  source: string;
}

export function GuideSlideOver({ guide, open, onClose, modelName, source }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
      >
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wide mb-1">
                Steg-för-steg-guide — gratis
              </p>
              <h2 id="guide-modal-title" className="text-lg font-bold text-white leading-tight">
                Kom igång med {modelName || guide.providerName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-500 transition-colors shrink-0"
              aria-label="Stäng"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* What's in the guide */}
        <div className="px-6 pt-5 pb-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Guiden innehåller
          </p>
          <ul className="space-y-2 mb-5">
            {guide.whatYouLearn.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-indigo-500 mt-0.5 shrink-0">✓</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {/* Email form */}
          <div className="border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Skicka guiden till min inbox
            </p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Fyll i din e-postadress så skickar vi hela guiden direkt — inkl. kodexempel, kostnadstips och länkarna du behöver.
            </p>
            <EmailCaptureForm
              providerId={guide.providerId}
              modelName={modelName}
              source={source}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
