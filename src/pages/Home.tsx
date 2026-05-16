import { useCallback, useState } from "react";
import { SEO } from "../components/SEO";
import { CalculatorSection } from "../components/CalculatorSection";
import type { CalcInitialValues } from "../components/Calculator";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { UseCaseScenarios } from "../components/UseCaseScenarios";
import { FAQ } from "../components/FAQ";
import { HeroSection } from "../components/HeroSection";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

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

        {/* 1. Hero — minimal, luftig */}
        <HeroSection />

        {/* 2. Kalkylator — sidans primära funktion */}
        <section id="kalkylator" className="mb-24">
          <CalculatorSection initialValues={calcValues} />
        </section>

        {/* 3. Scenarion — inspiration och snabbval */}
        <section id="scenarion" className="mb-24">
          <UseCaseScenarios onSelect={handleScenario} />
        </section>

        {/* 4. Fasta abonnemang — i grå yta för visuell rytm */}
        <div className="bg-gray-50 rounded-2xl px-6 py-8 mb-24">
          <section id="abonnemang">
            <SubscriptionTable />
          </section>
        </div>

        {/* 5. Modell-jämförelse */}
        <section id="jamforelse" className="mb-24">
          <ModelComparisonTable />
        </section>

        {/* 6. Fler guider */}
        <section className="mb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fler prisguider</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/vad-kostar-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Komplett prisguide för AI 2026</p>
              <p className="text-sm text-gray-500">
                Översikt för privatpersoner och företag — abonnemang,
                API-priser och gratis alternativ.
              </p>
            </Link>
            <Link to="/billigaste-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Vilken AI är billigast just nu?</p>
              <p className="text-sm text-gray-500">
                Jämför mini-modellerna från OpenAI, Anthropic och Google per
                användningsfall.
              </p>
            </Link>
            <Link to="/chatgpt-vs-claude" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">ChatGPT vs Claude — vilken passar?</p>
              <p className="text-sm text-gray-500">
                Pris, svenska språk, kodning och multimodalt — komplett
                jämförelse med konkreta månadskostnader.
              </p>
            </Link>
            <Link to="/ai-chatbot-kostnad" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Vad kostar en AI-chatbot?</p>
              <p className="text-sm text-gray-500">
                Konkreta budgetexempel för hobby, småföretag och B2C — i SEK.
                Plus fyra sätt att sänka notan.
              </p>
            </Link>
            <Link to="/prompt-caching" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Prompt caching — halvera AI-notan</p>
              <p className="text-sm text-gray-500">
                Hur du sparar 40–60 % på Claude och GPT-4o med rätt
                cache-strategi. Teknisk djupguide.
              </p>
            </Link>
            <Link to="/vad-kostar-chatgpt" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Räkna på ChatGPT API-kostnader</p>
              <p className="text-sm text-gray-500">
                Detaljguide och kalkylator för GPT-4o och GPT-4o mini.
              </p>
            </Link>
            <Link to="/claude-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Claude Sonnet och Haiku-kostnader</p>
              <p className="text-sm text-gray-500">
                Vad kostar Anthropics modeller per månad? Kalkylera och
                jämför med ChatGPT.
              </p>
            </Link>
            <Link to="/gpt-4-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Jämför GPT-4.1, GPT-4o och mini</p>
              <p className="text-sm text-gray-500">
                Räkna på alla GPT-4-varianter och se vilken som passar bäst.
              </p>
            </Link>
            <Link to="/token-kalkylator" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">Räkna tokens i valfri text</p>
              <p className="text-sm text-gray-500">
                Klistra in en text och se exakt hur många tokens den
                innehåller — och vad det kostar per modell.
              </p>
            </Link>
          </div>
        </section>

        {/* 7. Hur kalkylatorn räknar — kollapsad */}
        <details className="mb-20 group">
          <summary className="cursor-pointer text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors list-none flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Hur kalkylatorn räknar
          </summary>
          <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-6">
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
                  Priser kontrolleras månadsvis mot leverantörernas prissidor.
                  Senast verifierade {siteConfig.pricesLastVerified}.
                </p>
              </div>
            </div>
          </div>
        </details>

        {/* 8. FAQ */}
        <section id="faq" className="mb-10">
          <FAQ />
        </section>
      </main>
    </>
  );
}
