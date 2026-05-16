import { SEO } from "../components/SEO";
import { Calculator } from "../components/Calculator";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { FAQ } from "../components/FAQ";
import { HeroSection } from "../components/HeroSection";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aikostnad.se",
  url: "https://aikostnad.se",
  description:
    "Räkna ut vad AI kostar per månad. Jämför ChatGPT, Claude och Gemini i svenska kronor.",
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Kostnadskalkylator",
  applicationCategory: "FinanceApplication",
  description:
    "Räkna ut vad AI kostar per fråga, dag, månad och år för valfri modell. Täcker ChatGPT, Claude, Gemini och fler.",
  url: "https://aikostnad.se",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "SEK",
  },
};

export function Home() {
  return (
    <>
      <SEO
        title="Vad kostar AI? Kalkylator för ChatGPT, Claude och Gemini"
        description="Räkna ut vad ChatGPT, Claude och Gemini kostar per månad i svenska kronor. Jämför API-priser och fasta abonnemang. Gratis kalkylator."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <HeroSection />

        {/* API-kalkylator */}
        <section id="kalkylator" className="mb-16">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              API-kostnadskalkylator
            </h2>
            <p className="text-sm text-gray-500">
              För dig som bygger applikationer och integrerar AI via API. Välj
              modell och ange din förväntade volym.
            </p>
          </div>
          <Calculator />
        </section>

        {/* Fasta abonnemang */}
        <section id="abonnemang" className="mb-16">
          <SubscriptionTable />
        </section>

        {/* Modell-jämförelse */}
        <section id="jamforelse" className="mb-16">
          <ModelComparisonTable />
        </section>

        {/* Metodnoter */}
        <section className="mb-16 bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Hur kalkylatorn räknar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Korrekt tokenräkning</p>
              <p className="text-gray-500 leading-relaxed">
                Svenska texter räknas med 1,3 tokens/ord (inte 0,75 som gäller
                engelska) på grund av å/ä/ö och långa sammansatta ord.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Live-valutakurs</p>
              <p className="text-gray-500 leading-relaxed">
                SEK/USD hämtas dagligen via Frankfurter API. Faller hämtningen
                bort används fallback-kursen 10,50 kr.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Verifierade priser</p>
              <p className="text-gray-500 leading-relaxed">
                Modellpriser kontrolleras månadsvis mot leverantörernas prissidor
                och datumstämplas.
              </p>
            </div>
          </div>
        </section>

        {/* Fler verktyg */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fler verktyg</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/token-kalkylator"
              className="card hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">
                Tokenräknare
              </p>
              <p className="text-sm text-gray-500">
                Klistra in valfri text och se exakt hur många tokens den
                innehåller — och vad det kostar.
              </p>
            </Link>
            <Link
              to="/vad-kostar-chatgpt"
              className="card hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">
                Vad kostar ChatGPT?
              </p>
              <p className="text-sm text-gray-500">
                Detaljerad guide och kalkylator specifikt för GPT-4o
                API-kostnader.
              </p>
            </Link>
            <Link
              to="/claude-pris"
              className="card hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">
                Claude pris
              </p>
              <p className="text-sm text-gray-500">
                Vad kostar Claude Sonnet och Haiku? Kalkylera och jämför med
                ChatGPT.
              </p>
            </Link>
            <Link
              to="/gpt-4-pris"
              className="card hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">
                GPT-4.1 pris
              </p>
              <p className="text-sm text-gray-500">
                Detaljerad kalkylator och FAQ för GPT-4.1 API-priser.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-10">
          <FAQ />
        </section>
      </main>
    </>
  );
}
