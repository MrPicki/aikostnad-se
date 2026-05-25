import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";


export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
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
              Priser
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-xs text-gray-500 hover:text-indigo-600">
                  ChatGPT API-pris
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-xs text-gray-500 hover:text-indigo-600">
                  Claude API-pris
                </Link>
              </li>
              <li>
                <Link to="/gemini-pris" className="text-xs text-gray-500 hover:text-indigo-600">
                  Gemini API-pris
                </Link>
              </li>
              <li>
                <Link to="/openai-api-kostnad" className="text-xs text-gray-500 hover:text-indigo-600">
                  OpenAI API-kostnad
                </Link>
              </li>
              <li>
                <Link to="/gpt-4-pris" className="text-xs text-gray-500 hover:text-indigo-600">
                  GPT-4.1 API-pris
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Jämförelser
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chatgpt-vs-claude" className="text-xs text-gray-500 hover:text-indigo-600">
                  ChatGPT vs Claude
                </Link>
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-xs text-gray-500 hover:text-indigo-600">
                  Billigaste AI-modellen
                </Link>
              </li>
              <li>
                <Link to="/chatgpt-pro-vs-plus" className="text-xs text-gray-500 hover:text-indigo-600">
                  ChatGPT Pro vs Plus
                </Link>
              </li>
              <li>
                <Link to="/vad-kostar-ai" className="text-xs text-gray-500 hover:text-indigo-600">
                  AI-prisguide 2026
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Guider
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-for-foretag" className="text-xs text-gray-500 hover:text-indigo-600">
                  AI för företag
                </Link>
              </li>
              <li>
                <Link to="/gratis-ai" className="text-xs text-gray-500 hover:text-indigo-600">
                  Gratis AI-verktyg
                </Link>
              </li>
              <li>
                <Link to="/prompt-caching" className="text-xs text-gray-500 hover:text-indigo-600">
                  Prompt caching-guide
                </Link>
              </li>
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-xs text-gray-500 hover:text-indigo-600">
                  AI-chatbot kostnad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Verktyg
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#kalkylator" className="text-xs text-gray-500 hover:text-indigo-600">
                  AI-kostnadskalkylator
                </Link>
              </li>
              <li>
                <Link to="/token-kalkylator" className="text-xs text-gray-500 hover:text-indigo-600">
                  Tokenräknare
                </Link>
              </li>
              <li>
                <Link to="/ai-ordlista" className="text-xs text-gray-500 hover:text-indigo-600">
                  AI-ordlista
                </Link>
              </li>
              <li>
                <Link to="/om" className="text-xs text-gray-500 hover:text-indigo-600">
                  Om Aikostnad.se
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-xs text-gray-500 hover:text-indigo-600">
                  Kontakt
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
          <div className="flex items-center gap-4">
            <Link to="/integritet" className="text-xs text-gray-400 hover:text-gray-600">
              Integritetspolicy
            </Link>
            <a
              href="https://aikostnad.se/sitemap.xml"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Sitemap
            </a>
            <p className="text-xs text-gray-400">
              Priser i USD konverterade till SEK.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
