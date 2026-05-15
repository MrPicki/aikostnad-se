import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                AI
              </div>
              <span className="font-bold text-gray-900">Aikostnad.se</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Gratis AI-kostnadskalkylator för svenska användare, företag och
              utvecklare.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Verktyg
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  AI-kostnadskalkylator
                </Link>
              </li>
              <li>
                <Link
                  to="/token-kalkylator"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Tokenräknare
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/integritet"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Integritetspolicy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
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
