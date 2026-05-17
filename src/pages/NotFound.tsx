import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

export function NotFound() {
  return (
    <>
      <SEO
        title="Sidan kunde inte hittas (404)"
        description="Den sidan finns inte längre. Gå tillbaka till startsidan eller använd kalkylatorn."
        canonical="/404"
      />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Den här sidan finns inte
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          Länken kan vara gammal eller fel. Här är några vägar tillbaka:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <Link
            to="/"
            className="rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Startsidan</p>
            <p className="text-xs text-gray-500">Kalkylator + prisguider</p>
          </Link>
          <Link
            to="/vad-kostar-ai"
            className="rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Vad kostar AI?</p>
            <p className="text-xs text-gray-500">Komplett prisguide</p>
          </Link>
          <Link
            to="/billigaste-ai"
            className="rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Billigaste AI</p>
            <p className="text-xs text-gray-500">Jämför mini-modeller</p>
          </Link>
          <Link
            to="/token-kalkylator"
            className="rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Tokenräknare</p>
            <p className="text-xs text-gray-500">Räkna tokens i text</p>
          </Link>
        </div>
      </main>
    </>
  );
}
