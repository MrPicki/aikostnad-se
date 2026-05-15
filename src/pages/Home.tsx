import { useCallback, useState } from "react";
import { SEO } from "../components/SEO";
import { Calculator } from "../components/Calculator";
import { TokenCounter } from "../components/TokenCounter";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { FAQ } from "../components/FAQ";
import { Helmet } from "react-helmet-async";
import { HeroSection, type CalcValues, type HeroDest } from "../components/HeroSection";

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
  const [calcValues, setCalcValues] = useState<CalcValues | undefined>();
  const [tokenText, setTokenText] = useState<string | undefined>();

  const handleHeroNavigate = useCallback((dest: HeroDest, values?: CalcValues, text?: string) => {
    if (dest === "calculator") {
      setCalcValues(values ? { ...values } : undefined);
      setTimeout(() => {
        document.getElementById("kalkylator")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      setTokenText(text ?? "");
      setTimeout(() => {
        document.getElementById("tokenraknare")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);

  return (
    <>
      <SEO canonical="/" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero */}
        <HeroSection onNavigate={handleHeroNavigate} />

        {/* Main calculator */}
        <section id="kalkylator">
          <h2 className="sr-only">AI-kostnadskalkylator</h2>
          <Calculator initialValues={calcValues} />
        </section>

        {/* Token counter */}
        <section id="tokenraknare">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tokenräknare — klistra in din text
          </h2>
          <TokenCounter initialText={tokenText} />
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
