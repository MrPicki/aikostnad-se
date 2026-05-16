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
  // Esc-key closes
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

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        className={`absolute right-0 top-0 h-full w-full sm:w-[600px] lg:w-[680px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Steg-för-steg guide
              </p>
              <h2 id="guide-title" className="text-lg font-bold text-gray-900 leading-tight">
                {guide.providerName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Stäng guide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-8">
            {/* Intro */}
            <section>
              <p className="text-base text-gray-700 leading-relaxed">{guide.intro}</p>
            </section>

            {/* What you'll learn */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Vad du lär dig
              </h3>
              <ul className="space-y-2">
                {guide.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prerequisites */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Vad du behöver
              </h3>
              <ul className="space-y-1.5">
                {guide.prerequisites.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Steg
              </h3>
              <ol className="space-y-5">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {step.description}
                      </p>
                      {step.code && (
                        <pre className="text-xs bg-gray-900 text-gray-100 rounded-lg px-3 py-3 overflow-x-auto leading-relaxed font-mono">
                          <code>{step.code}</code>
                        </pre>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Cost tips */}
            <section className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-green-900 mb-3">💡 Spar pengar</h3>
              <ul className="space-y-2">
                {guide.costTips.map((tip, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed">
                    <span className="text-green-600 mr-1.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Common mistakes */}
            <section className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h3 className="text-sm font-bold text-amber-900 mb-3">⚠ Undvik vanliga misstag</h3>
              <ul className="space-y-2">
                {guide.commonMistakes.map((m, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed">
                    <span className="text-amber-600 mr-1.5">→</span>
                    {m}
                  </li>
                ))}
              </ul>
            </section>

            {/* Resources */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Officiella resurser
              </h3>
              <ul className="space-y-2">
                {guide.resources.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      {r.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Email capture */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Få guiden som mail att spara
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Skicka hela guiden till din inbox så du kan komma tillbaka till den
                senare — eller dela den med en kollega.
              </p>
              <EmailCaptureForm
                providerId={guide.providerId}
                modelName={modelName}
                source={source}
              />
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
}
