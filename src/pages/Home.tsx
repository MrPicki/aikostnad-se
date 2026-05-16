import { useCallback, useState } from "react";
import { SEO } from "../components/SEO";
import { Calculator, type CalcInitialValues } from "../components/Calculator";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { UseCaseScenarios } from "../components/UseCaseScenarios";
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
    "Räkna ut vad AI kostar per fråga, dag, månad och år. Täcker ChatGPT, Claude, Gemini och fler.",
  url: "https://aikostnad.se",
  offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
};

export function Home() {
  const [calcValues, setCalcValues] = useState<CalcInitialValues | undefined>();

  const handleScenario = useCallback((values: CalcInitialValues) => {
    setCalcValues({ ...values });
    setTimeout(() => {
      document.getElementById("kalkylator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  return (
    <>
      <SEO
        title="Vad kostar AI? Kalkylator för ChatGPT, Claude och Gemini"
        description="Räkna ut vad ChatGPT, Claude och Gemini kostar per månad i svenska kronor. Jämför abonnemang och API-priser. Gratis kalkylator."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Fasta abonnemang — konsumentens fråga */}
        <section id="abonnemang" className="mb-16">
          <SubscriptionTable />
        </section>

        {/* 3. Mänskliga scenarion */}
        <section id="scenarion" className="mb-16">
          <UseCaseScenarios onSelect={handleScenario} />
        </section>

        {/* 4. Divider: nu börjar det tekniska */}
        <div className="mb-12 border-t border-gray-200 pt-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            För dig som bygger med AI
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Räkna exakt — API-kostnadskalkylator
          </h2>
          <p className="text-sm text-gray-500">
            Välj modell, ange volym och se månadskostnad ned till öret. Optimalt för
            utvecklare och tekniska beslutsfattare.
          </p>
        </div>

        {/* 5. API-kalkylator */}
        <section id="kalkylator" className="mb-16">
          <Calculator initialValues={calcValues} />
        </section>

        {/* 6. Modell-jämförelse */}
        <section id="jamforelse" className="mb-16">
          <ModelComparisonTable />
        </section>

        {/* 7. Hur det räknas */}
        <section className="mb-16 bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Hur kalkylatorn räknar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Korrekt för svenska</p>
              <p className="text-gray-500 leading-relaxed">
                Svenska texter kräver 1,3 tokens/ord (engelska 0,75) p.g.a.
                å/ä/ö och långa sammansatta ord.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Live-valutakurs</p>
              <p className="text-gray-500 leading-relaxed">
                SEK/USD hämtas dagligen via Frankfurter API. Faller det bort
                används fallback-kursen 10,50 kr.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Verifierade priser</p>
              <p className="text-gray-500 leading-relaxed">
                Priser kontrolleras månadsvis mot leverantörernas prissidor och
                datumstämplas per modell.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Fler guider */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fler prisguider</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/vad-kostar-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Vad kostar AI?</p>
              <p className="text-sm text-gray-500">
                Komplett guide för privatpersoner och företag — abonnemang,
                API och gratis alternativ.
              </p>
            </Link>
            <Link to="/billigaste-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Billigaste AI 2026</p>
              <p className="text-sm text-gray-500">
                Vilket AI-verktyg ger mest för pengarna? Jämförelse per
                användningsfall.
              </p>
            </Link>
            <Link to="/vad-kostar-chatgpt" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Vad kostar ChatGPT?</p>
              <p className="text-sm text-gray-500">
                Detaljguide och kalkylator för GPT-4o API-kostnader.
              </p>
            </Link>
            <Link to="/claude-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Claude pris</p>
              <p className="text-sm text-gray-500">
                Vad kostar Claude Sonnet och Haiku? Kalkylera och jämför.
              </p>
            </Link>
            <Link to="/gpt-4-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">GPT-4.1 pris</p>
              <p className="text-sm text-gray-500">
                Räkna på GPT-4.1 och jämför med GPT-4o och Claude.
              </p>
            </Link>
            <Link to="/token-kalkylator" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Tokenräknare</p>
              <p className="text-sm text-gray-500">
                Klistra in valfri text och se exakt hur många tokens den
                innehåller — och vad det kostar.
              </p>
            </Link>
          </div>
        </section>

        {/* 9. FAQ */}
        <section id="faq" className="mb-10">
          <FAQ />
        </section>
      </main>
    </>
  );
}
