import { track } from "@vercel/analytics";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pickPath(path: "use" | "build") {
  track("path_selector_click", { path });
  scrollTo(path === "use" ? "abonnemang" : "kalkylator");
}

export function PathSelector() {
  return (
    <section
      aria-label="Välj väg in på sajten"
      className="mb-16"
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">
        Är du ny här? Välj väg
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {/* Path A: consumer */}
        <button
          onClick={() => pickPath("use")}
          className="text-left bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm rounded-2xl p-5 transition-all group"
        >
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5">
                Jag vill använda AI
              </p>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                Jämför månadsabonnemang
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-9">
            ChatGPT Plus, Claude Pro, Gemini Advanced — fasta priser från
            ca 210 kr/mån. Ingen kod, inga API-nycklar.
          </p>
          <p className="text-xs font-semibold text-indigo-600 mt-3 pl-9 group-hover:underline">
            Se abonnemang ↓
          </p>
        </button>

        {/* Path B: builder */}
        <button
          onClick={() => pickPath("build")}
          className="text-left bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm rounded-2xl p-5 transition-all group"
        >
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">💻</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5">
                Jag vill bygga med AI
              </p>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                Räkna på API-volym
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-9">
            Du betalar per token (textdel). Räkna på din volym för
            chatbot, dokumentanalys eller integration i egen app.
          </p>
          <p className="text-xs font-semibold text-indigo-600 mt-3 pl-9 group-hover:underline">
            Öppna kalkylatorn ↓
          </p>
        </button>
      </div>
    </section>
  );
}
