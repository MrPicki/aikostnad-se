import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              Aikostnad<span className="text-indigo-600">.se</span>
            </span>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Gratis kalkylator för AI-kostnader. Jämför ChatGPT, Claude,
              Gemini och fler i svenska kronor.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Verktyg
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#kalkylator" className="text-xs text-gray-500 hover:text-indigo-600">
                  API-kalkylator
                </Link>
              </li>
              <li>
                <Link to="/#abonnemang" className="text-xs text-gray-500 hover:text-indigo-600">
                  Abonnemangspriser
                </Link>
              </li>
              <li>
                <Link to="/#jamforelse" className="text-xs text-gray-500 hover:text-indigo-600">
                  Modell-jämförelse
                </Link>
              </li>
              <li>
                <Link to="/token-kalkylator" className="text-xs text-gray-500 hover:text-indigo-600">
                  Tokenräknare
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              AI-priser
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-xs text-gray-500 hover:text-indigo-600">
                  Vad kostar ChatGPT?
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-xs text-gray-500 hover:text-indigo-600">
                  Claude pris
                </Link>
              </li>
              <li>
                <Link to="/gpt-4-pris" className="text-xs text-gray-500 hover:text-indigo-600">
                  GPT-4.1 pris
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Om sajten
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/integritet" className="text-xs text-gray-500 hover:text-indigo-600">
                  Integritetspolicy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Aikostnad.se — Priser senast
            verifierade {siteConfig.pricesLastVerified}
          </p>
          <p className="text-xs text-gray-400">
            Priser i USD konverterade till SEK. Alla värden är uppskattningar.
          </p>
        </div>
      </div>
    </footer>
  );
}
