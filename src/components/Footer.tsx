import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";


export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              Aikostnad<span className="text-brand-700">.se</span>
            </span>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Gratis kalkylator för AI-kostnader. Jämför ChatGPT, Claude,
              Gemini och fler i svenska kronor.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Priser
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  ChatGPT API-pris
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Claude API-pris
                </Link>
              </li>
              <li>
                <Link to="/gemini-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Gemini API-pris
                </Link>
              </li>
              <li>
                <Link to="/openai-api-kostnad" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  OpenAI API-kostnad
                </Link>
              </li>
              <li>
                <Link to="/gpt-4-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  GPT-4.1 API-pris
                </Link>
              </li>
              <li>
                <Link to="/mistral-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Mistral AI-pris
                </Link>
              </li>
              <li>
                <Link to="/grok-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Grok pris
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Jämförelser
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chatgpt-vs-claude" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  ChatGPT vs Claude
                </Link>
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Billigaste AI-modellen
                </Link>
              </li>
              <li>
                <Link to="/chatgpt-pro-vs-plus" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  ChatGPT Pro vs Plus
                </Link>
              </li>
              <li>
                <Link to="/vad-kostar-ai" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-prisguide 2026
                </Link>
              </li>
              <li>
                <Link to="/ai-video-pris" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-video priser
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Guider
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-for-foretag" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI för företag
                </Link>
              </li>
              <li>
                <Link to="/gratis-ai" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Gratis AI-verktyg
                </Link>
              </li>
              <li>
                <Link to="/prompt-caching" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Prompt caching-guide
                </Link>
              </li>
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-chatbot kostnad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Verktyg
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#kalkylator" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-kostnadskalkylator
                </Link>
              </li>
              <li>
                <Link to="/token-kalkylator" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Tokenräknare
                </Link>
              </li>
              <li>
                <Link to="/ai-ordlista" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-ordlista
                </Link>
              </li>
              <li>
                <Link to="/nyheter" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  AI-nyheter
                </Link>
              </li>
              <li>
                <Link to="/om" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Om Aikostnad.se
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-150">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Aikostnad.se — Priser senast
            verifierade {siteConfig.pricesLastVerified}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/aikostnad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-600 transition-colors"
              aria-label="Följ @aikostnad på X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/aikostnad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#0A66C2] transition-colors"
              aria-label="Följ Aikostnad på LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <Link to="/integritet" className="text-xs text-gray-500 hover:text-gray-600">
              Integritetspolicy
            </Link>
            <a
              href="https://aikostnad.se/sitemap.xml"
              className="text-xs text-gray-500 hover:text-gray-600"
            >
              Sitemap
            </a>
            <a
              href="https://aikostnad.se/rss.xml"
              className="text-xs text-gray-500 hover:text-gray-600"
            >
              RSS
            </a>
            <p className="text-xs text-gray-500">
              Priser i USD konverterade till SEK.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
