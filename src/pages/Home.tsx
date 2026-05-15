import { SEO } from "../components/SEO";
import { Calculator } from "../components/Calculator";
import { TokenCounter } from "../components/TokenCounter";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { FAQ } from "../components/FAQ";
import { Helmet } from "react-helmet-async";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aikostnad.se",
  url: "https://aikostnad.se",
  description:
    "Gratis AI-kostnadskalkylator för svenska användare, företag och utvecklare.",
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Kostnadskalkylator",
  applicationCategory: "FinanceApplication",
  description:
    "Räkna ut vad AI kostar per fråga, dag, månad och år för valfri modell.",
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
      <SEO canonical="/" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🇸🇪</span> Gjord för svenska texter
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Vad kostar AI? Räkna ut din AI-kostnad direkt
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Jämför priser för ChatGPT, Claude, Gemini och fler. Beräkna kostnad
            per fråga, månad och år — anpassat för svenska texter med korrekt
            tokenuppskattning.
          </p>
        </section>

        {/* Main calculator */}
        <section id="kalkylator">
          <h2 className="sr-only">AI-kostnadskalkylator</h2>
          <Calculator />
        </section>

        {/* Token counter */}
        <section id="tokenraknare">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tokenräknare — klistra in din text
          </h2>
          <TokenCounter />
        </section>

        {/* Comparison table */}
        <section id="jamforelse">
          <ModelComparisonTable />
        </section>

        {/* FAQ */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Trust section */}
        <section className="bg-indigo-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Transparens och noggrannhet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm">
            <div>
              <div className="text-2xl mb-2">📐</div>
              <p className="font-semibold text-gray-800">Korrekt tokenräkning</p>
              <p className="text-gray-500 mt-1">
                1,3 tokens/ord för svenska (inte 0,75 som gäller engelska)
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">💱</div>
              <p className="font-semibold text-gray-800">Live-valutakurs</p>
              <p className="text-gray-500 mt-1">
                SEK/USD uppdateras dagligen — alltid rätt omräkning
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">📅</div>
              <p className="font-semibold text-gray-800">Verifierade priser</p>
              <p className="text-gray-500 mt-1">
                Modellpriser kontrolleras månadsvis och datumstämplas
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
