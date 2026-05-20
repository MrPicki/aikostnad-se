import { useCallback, useEffect, useState } from "react";
import { SEO } from "../components/SEO";
import { CalculatorSection } from "../components/CalculatorSection";
import type { CalcInitialValues } from "../components/Calculator";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { UseCaseScenarios } from "../components/UseCaseScenarios";
import { FAQ } from "../components/FAQ";
import { HeroSection } from "../components/HeroSection";
import { HeroQuickFaq } from "../components/HeroQuickFaq";
import { PathSelector, getStoredPath, type UserPath } from "../components/PathSelector";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

interface Guide {
  to: string;
  title: string;
  body: string;
  paths: UserPath[];
}

const GUIDES: Guide[] = [
  {
    to: "/vad-kostar-ai",
    title: "Komplett prisguide för AI 2026",
    body:
      "Översikt för privatpersoner och företag — abonnemang, API-priser och gratis alternativ.",
    paths: ["use", "build"],
  },
  {
    to: "/billigaste-ai",
    title: "Vilken AI är billigast just nu?",
    body:
      "Jämför mini-modellerna från OpenAI, Anthropic och Google per användningsfall.",
    paths: ["build"],
  },
  {
    to: "/chatgpt-vs-claude",
    title: "ChatGPT vs Claude — vilken passar?",
    body:
      "Pris, svenska språk, kodning och multimodalt — komplett jämförelse med konkreta månadskostnader.",
    paths: ["use", "build"],
  },
  {
    to: "/ai-chatbot-kostnad",
    title: "Vad kostar en AI-chatbot?",
    body:
      "Konkreta budgetexempel för hobby, småföretag och B2C — i SEK. Plus fyra sätt att sänka notan.",
    paths: ["build"],
  },
  {
    to: "/prompt-caching",
    title: "Prompt caching — halvera AI-notan",
    body:
      "Hur du sparar 40–60 % på Claude och GPT-4o med rätt cache-strategi. Teknisk djupguide.",
    paths: ["build"],
  },
  {
    to: "/vad-kostar-chatgpt",
    title: "Räkna på ChatGPT API-kostnader",
    body: "Detaljguide och kalkylator för GPT-4o och GPT-4o mini.",
    paths: ["use", "build"],
  },
  {
    to: "/claude-pris",
    title: "Claude Sonnet och Haiku-kostnader",
    body:
      "Vad kostar Anthropics modeller per månad? Kalkylera och jämför med ChatGPT.",
    paths: ["use", "build"],
  },
  {
    to: "/gpt-4-pris",
    title: "Jämför GPT-4.1, GPT-4o och mini",
    body: "Räkna på alla GPT-4-varianter och se vilken som passar bäst.",
    paths: ["use", "build"],
  },
  {
    to: "/token-kalkylator",
    title: "Räkna tokens i valfri text",
    body:
      "Klistra in en text och se exakt hur många tokens den innehåller — och vad det kostar per modell.",
    paths: ["build"],
  },
];

function sortGuidesByPath(path: UserPath | null): Guide[] {
  if (!path) return GUIDES;
  return [...GUIDES].sort((a, b) => {
    const aFit = a.paths.includes(path) ? 0 : 1;
    const bFit = b.paths.includes(path) ? 0 : 1;
    return aFit - bFit;
  });
}

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
  const [userPath, setUserPath] = useState<UserPath | null>(null);

  useEffect(() => {
    setUserPath(getStoredPath());
  }, []);

  const handleScenario = useCallback((values: CalcInitialValues) => {
    setCalcValues({ ...values });
    setTimeout(() => {
      document.getElementById("kalkylator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const sortedGuides = sortGuidesByPath(userPath);

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

        {/* 1b. Mini-FAQ — möter ovetande besökare direkt */}
        <HeroQuickFaq />

        {/* 1c. Två tydliga vägar — använd vs bygg */}
        <PathSelector onPathChange={setUserPath} />

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

        {/* 5b. Tokenräknare-CTA */}
        <section className="mb-24">
          <Link
            to="/token-kalkylator"
            className="block rounded-2xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition-all p-6 sm:p-8 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="text-3xl">📝</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                  Bonus-verktyg
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                  Klistra in din text — räkna tokens exakt
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vet du exakt hur lång din prompt är i tokens? Klistra in text
                  och få token-antal + kostnad per modell direkt — perfekt innan
                  du anropar API:t.
                </p>
              </div>
              <div className="text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block">
                →
              </div>
            </div>
          </Link>
        </section>

        {/* 6. Fler guider — sorterade efter användarens väg */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900">Fler prisguider</h2>
            {userPath && (
              <p className="text-xs text-gray-400">
                Sorterade efter dig som vill{" "}
                <span className="font-semibold text-indigo-600">
                  {userPath === "use" ? "använda AI" : "bygga med AI"}
                </span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedGuides.map((g) => {
              const isMatch = userPath !== null && g.paths.includes(userPath);
              return (
                <Link
                  key={g.to}
                  to={g.to}
                  className={`card hover:shadow-sm transition-all group relative ${
                    isMatch
                      ? "border-indigo-200 bg-indigo-50/30 hover:border-indigo-300"
                      : "hover:border-indigo-200"
                  }`}
                >
                  {isMatch && (
                    <span className="absolute top-3 right-3 inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded-full font-semibold uppercase tracking-wide">
                      Passar dig
                    </span>
                  )}
                  <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 pr-20">
                    {g.title}
                  </p>
                  <p className="text-sm text-gray-500">{g.body}</p>
                </Link>
              );
            })}
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
