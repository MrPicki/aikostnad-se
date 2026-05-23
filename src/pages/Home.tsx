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
import { SimpleEstimator } from "../components/SimpleEstimator";
import { EmailCaptureForm } from "../components/EmailCaptureForm";
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://aikostnad.se/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Kostnadskalkylator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Räkna ut vad AI kostar per fråga, dag, månad och år. Täcker ChatGPT, Claude, Gemini och fler.",
  url: "https://aikostnad.se",
  offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
  featureList: [
    "Beräkning i svenska kronor (SEK)",
    "Live-valutakurs USD/SEK",
    "Stöd för 12+ AI-modeller",
    "Korrekt tokenberäkning för svenska texter",
    "Dela kalkyl via länk",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Räkna ut vad AI kostar per månad",
  description: "Så här beräknar du din månadskostnad för AI-API i svenska kronor med Aikostnad.se",
  step: [
    {
      "@type": "HowToStep",
      name: "Välj AI-modell",
      text: "Välj vilken AI-modell du vill använda — ChatGPT (GPT-4o), Claude Sonnet, Gemini Flash eller annan.",
    },
    {
      "@type": "HowToStep",
      name: "Ange antal förfrågningar",
      text: "Ange hur många frågor per dag din applikation eller ditt team skickar.",
    },
    {
      "@type": "HowToStep",
      name: "Ange textlängder",
      text: "Ange ungefärlig längd på input (din prompt) och output (modellens svar) i ord.",
    },
    {
      "@type": "HowToStep",
      name: "Se månadskostnaden",
      text: "Kalkylatorn räknar automatiskt ut månadskostnaden i SEK med live-valutakurs och korrekt tokenisering för svenska texter.",
    },
  ],
  tool: {
    "@type": "HowToTool",
    name: "AI Kostnadskalkylator",
    url: "https://aikostnad.se",
  },
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
        title="AI Kostnadskalkylator — Räkna ut vad ChatGPT, Claude och Gemini kostar i SEK"
        description="Räkna ut exakt vad ChatGPT, Claude och Gemini kostar dig — i svenska kronor. Beskriv din idé, få svar på 5 sekunder. Gratis AI-kalkylator."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* 1. Hero — minimal, luftig */}
        <HeroSection />

        {/* 1a. SimpleEstimator — beskriv idé, få kostnad direkt */}
        <section className="mb-10">
          <SimpleEstimator onUseInCalculator={handleScenario} />
        </section>

        {/* 1b. Divider till manuell kalkylator */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-400">Eller räkna manuellt ↓</span>
          </div>
        </div>

        {/* 1c. Mini-FAQ — möter ovetande besökare direkt */}
        <HeroQuickFaq />

        {/* 1d. Två tydliga vägar — använd vs bygg */}
        <PathSelector onPathChange={setUserPath} />

        {/* 2. Kalkylator — sidans primära funktion */}
        <section id="kalkylator" className="mb-24">
          <CalculatorSection initialValues={calcValues} />
        </section>

        {/* 2b. Email capture — prisvarningar */}
        <section className="mb-24">
          <div className="card max-w-lg mx-auto">
            <p className="text-base font-bold text-gray-900 mb-1">Få e-post när AI-priser ändras</p>
            <p className="text-sm text-gray-500 mb-4">Vi bevakar priserna åt dig och hör av oss när något ändras.</p>
            <EmailCaptureForm providerId="general" source="home-price-alert" />
          </div>
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

        {/* 9. SEO-text — synlig informationstext om AI-kostnader i Sverige */}
        <section className="mb-16 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Vad kostar AI i Sverige 2026?</h2>
          <p className="text-gray-600 leading-relaxed">
            AI-kostnaden i Sverige varierar enormt beroende på hur du använder tekniken.
            En privatperson som chattar med <strong>ChatGPT Plus</strong> eller{" "}
            <strong>Claude Pro</strong> betalar ca 209 kr per månad för ett fast abonnemang.
            En startup som bygger ett eget AI-verktyg via API kan betala allt från 20 kr till
            5 000 kr per månad — beroende på antal användare, modellval och hur långa
            texterna är. Den här kalkylatorn hjälper dig räkna ut det exakta beloppet.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8">De vanligaste AI-kostnaderna</h3>
          <p className="text-gray-600 leading-relaxed">
            Det finns två prismodeller för AI: <strong>abonnemang</strong> och{" "}
            <strong>API-prissättning per token</strong>. Abonnemang passar privatpersoner
            och team som vill ha ett färdigt verktyg utan att behöva koda. Populäraste
            alternativen är ChatGPT Plus (209 kr/mån), Claude Pro (209 kr/mån) och
            Gemini Advanced (199 kr/mån via Google One). De ger tillgång till respektive
            leverantörs bästa modell, webbsökning och bildgenerering.
          </p>
          <p className="text-gray-600 leading-relaxed">
            API-prissättning är för dig som bygger egna applikationer. Du betalar per token —
            den textenhet som AI-modeller bearbetar. GPT-4o kostar $2,50 per miljon
            input-tokens och $10 per miljon output-tokens. Claude Sonnet 4.6 kostar
            $3/$15 per miljon tokens. De billigaste alternativen — GPT-4o mini ($0,15/$0,60)
            och Mistral Small ($0,10/$0,30) — passar hög volym till låg kostnad.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8">Varför kostar svenska texter mer?</h3>
          <p className="text-gray-600 leading-relaxed">
            En viktig faktor för svenska användare: AI-modeller tokeniserar svenska texter
            annorlunda än engelska. Svenska ord tokeniseras till ca{" "}
            <strong>1,3 tokens per ord</strong> mot 0,75 på engelska — på grund av
            sammansatta ord och tecknen å, ä, ö. Det innebär att en svenska prompt kostar
            ca <strong>73 % mer per ord</strong> att bearbeta än en likadan på engelska.
            Kalkylatorn ovan räknar automatiskt in detta.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8">Jämförelse: ChatGPT vs Claude vs Gemini</h3>
          <p className="text-gray-600 leading-relaxed">
            De tre stora AI-leverantörerna konkurrerar hårt om svenska kunder. OpenAI med
            ChatGPT dominerar fortfarande marknaden men Anthropics Claude vinner mark
            tack vare bättre svenska och GDPR-anpassning. Google Gemini 2.5 Pro och
            Flash erbjuder ett kontextfönster på 1 miljon tokens — unikt bland storskaliga
            modeller.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose mt-4 mb-6">
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="font-bold text-gray-900 text-sm mb-1">ChatGPT (OpenAI)</p>
              <p className="text-xs text-gray-500 leading-relaxed">Bredaste ekosystem. Multimodalt (bild, ljud). GPT-4o mini är billigast av de stora modellerna. Plus-abonnemang 209 kr/mån.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="font-bold text-gray-900 text-sm mb-1">Claude (Anthropic)</p>
              <p className="text-xs text-gray-500 leading-relaxed">Bäst på svenska. Prompt caching halverar kostnaden för chatbots. Claude Pro 209 kr/mån. Starkt GDPR-fokus.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="font-bold text-gray-900 text-sm mb-1">Gemini (Google)</p>
              <p className="text-xs text-gray-500 leading-relaxed">1 miljon tokens kontext. Integrerat med Google Workspace. Gemini Advanced 199 kr/mån via Google One.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8">AI för företag i Sverige</h3>
          <p className="text-gray-600 leading-relaxed">
            Svenska företag som inför AI-stöd för sina team räknar typiskt med
            <strong> 200–500 kr per anställd och månad</strong> för individuella abonnemang.
            Väljer de att bygga egna AI-verktyg via API kan kostnaden pressas ner till
            50–100 kr per anställd. Nyckeln är att välja rätt modell för rätt uppgift:
            mini-modeller för klassificering och FAQ, flaggskeppsmodeller för komplex
            analys och kod. Se vår guide om{" "}
            <Link to="/ai-for-foretag" className="text-indigo-600 hover:underline">AI för företag</Link>{" "}
            för konkreta räkneexempel per bransch.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8">Gratis AI-alternativ 2026</h3>
          <p className="text-gray-600 leading-relaxed">
            Alla tre stora leverantörerna erbjuder gratis tier: ChatGPT (utan Plus),
            Claude.ai och Gemini har alla gratis versioner med begränsad åtkomst till
            toppmodellerna. För sporadisk användning räcker gratisversionen långt.
            Vill du testa fler alternativ utan kostnad — se vår sammanställning av{" "}
            <Link to="/gratis-ai" className="text-indigo-600 hover:underline">gratis AI-verktyg</Link>.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8">Tre tips för att hålla AI-kostnaden nere</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>
              <strong>Använd rätt modell för uppgiften.</strong> GPT-4o mini och Claude Haiku
              är 10–20× billigare än flaggskeppsmodellerna och räcker för 80 % av uppgifterna.
              Se{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">billigaste AI-modellerna 2026</Link>.
            </li>
            <li>
              <strong>Begränsa output-längden.</strong> AI-modeller tar betalt 4× mer för output
              än input. Att instruera modellen att svara kort sparar direkt pengar utan att
              kompromissa med kvaliteten.
            </li>
            <li>
              <strong>Aktivera prompt caching.</strong> Om din applikation skickar samma
              systemprompt vid varje anrop ger Anthropic 90 % rabatt på den delen via{" "}
              <Link to="/prompt-caching" className="text-indigo-600 hover:underline">prompt caching</Link>.
              OpenAI erbjuder automatisk caching för prefix över 1 024 tokens.
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
