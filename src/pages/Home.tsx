import { useCallback, useState } from "react";
import { SEO } from "../components/SEO";
import { Calculator, type CalcInitialValues } from "../components/Calculator";
import { ModelComparisonTable } from "../components/ModelComparisonTable";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { FAQ } from "../components/FAQ";
import { HeroSection } from "../components/HeroSection";
import { SimpleEstimator } from "../components/SimpleEstimator";
import { EmailCaptureForm } from "../components/EmailCaptureForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

// Calm, plain-language orientation for newcomers: the three ways an ordinary
// person actually pays for AI. One line each, then a link to go deeper.
const PAYMENT_PATHS = [
  {
    to: "/vad-kostar-ai",
    label: "Abonnemang",
    price: "ca 209 kr/mån",
    body: "Fast pris för färdiga verktyg som ChatGPT Plus eller Claude Pro. Enklast om du bara vill använda AI.",
  },
  {
    to: "/ai-api-kostnad",
    label: "API (bygga själv)",
    price: "från ören/fråga",
    body: "Betala per användning när du bygger något eget. Billigt vid låg volym, skalar med trafiken.",
  },
  {
    to: "/gratis-ai",
    label: "Gratis",
    price: "0 kr",
    body: "Gratisversionerna räcker långt för sporadisk användning. Börja här innan du betalar.",
  },
];

const GUIDES = [
  { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT?" },
  { to: "/claude-pris", title: "Claude-priser" },
  { to: "/gemini-pris", title: "Gemini-priser" },
  { to: "/billigaste-ai", title: "Billigaste AI just nu" },
  { to: "/chatgpt-vs-claude", title: "ChatGPT vs Claude" },
  { to: "/ai-for-foretag", title: "AI för företag" },
  { to: "/prompt-caching", title: "Halvera notan med caching" },
  { to: "/token-kalkylator", title: "Räkna tokens i en text" },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aikostnad.se",
  url: "https://aikostnad.se",
  description:
    "Räkna ut vad AI kostar per månad. Jämför ChatGPT, Claude och Gemini i svenska kronor.",
  dateModified: siteConfig.pricesLastVerified,
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
  dateModified: siteConfig.pricesLastVerified,
  offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
  featureList: [
    "Beräkning i svenska kronor (SEK)",
    "Live-valutakurs USD/SEK",
    "Stöd för 16+ AI-modeller",
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
    { "@type": "HowToStep", name: "Beskriv din idé", text: "Skriv vad du vill använda AI till — t.ex. en kundtjänst-chatbot." },
    { "@type": "HowToStep", name: "Få en uppskattning", text: "Aikostnad.se uppskattar volym, väljer en lämplig modell och visar kostnaden i kronor." },
    { "@type": "HowToStep", name: "Finjustera", text: "Öppna den detaljerade kalkylatorn för att justera antal frågor, användare och textlängd." },
  ],
  tool: { "@type": "HowToTool", name: "AI Kostnadskalkylator", url: "https://aikostnad.se" },
};

/** Calm, consistent section heading used across the page. */
function SectionHeading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-1">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {sub && <p className="text-sm text-gray-500 mt-1.5 max-w-prose">{sub}</p>}
    </div>
  );
}

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
        title="AI Kostnadskalkylator — Räkna ut vad ChatGPT, Claude och Gemini kostar i SEK"
        description="Räkna ut exakt vad ChatGPT, Claude och Gemini kostar dig — i svenska kronor. Beskriv din idé, få svar på 5 sekunder. Gratis AI-kalkylator."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* 1. Hero — one headline, one promise */}
        <HeroSection />

        {/* 2. The hero tool — describe your idea, get a number (show, don't tell) */}
        <section aria-label="Snabb AI-kostnadsuppskattning" className="scroll-mt-4">
          <SimpleEstimator onUseInCalculator={handleScenario} />
        </section>

        {/* 2b. Editorial context — why AI pricing is hard to grasp */}
        <section className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Varför AI-kostnader är svåra att förstå
            </h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                API-priser anges i dollar per miljon tokens — en enhet som är svår att
                koppla till verklig användning. Vad kostar det att driva en chatbot med
                1 000 meddelanden om dagen? Hur mycket dyrare är GPT-4o jämfört med
                Claude Haiku? Utan en kalkylator är det nästan omöjligt att jämföra.
              </p>
              <p>
                Dessutom kostar svenska texter mer än engelska. AI-modeller är tränade
                primärt på engelska och tokeniserar svenska sämre: ett genomsnittligt
                svenskt ord ger <strong>1,3 tokens</strong> mot 0,75 på engelska. Det
                innebär att en svensk prompt kostar ungefär <strong>73 % mer</strong>{" "}
                per ord att bearbeta — något som inte syns i de officiella prislistorna.
              </p>
              <p>
                Aikostnad.se översätter dollar-per-miljon-tokens till kronor per månad,
                räknar in det svenska tokenövertaget och låter dig se vad din specifika
                användning faktiskt kostar — innan du betalar.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Orientation — the three ways people pay for AI */}
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <SectionHeading
            eyebrow="Grunderna"
            title="Tre sätt att betala för AI"
            sub="Du betalar för AI på ett av tre sätt. Här är vad de innebär — och ungefär vad de kostar."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAYMENT_PATHS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:border-brand-300 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{p.label}</span>
                  <span className="text-xs font-medium text-brand-700 whitespace-nowrap">{p.price}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Detailed calculator — clearly secondary, for those who want exact numbers */}
        <section id="kalkylator" className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100 scroll-mt-4">
          <SectionHeading
            eyebrow="Räkna exakt"
            title="Detaljerad kalkylator"
            sub="Justera antal frågor, användare och textlängd för en exakt månadskostnad per modell."
          />
          <Calculator initialValues={calcValues} />
        </section>

        {/* 5. Subscriptions — for the "use AI" crowd */}
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <SectionHeading eyebrow="Abonnemang" title="Vad kostar de färdiga AI-tjänsterna?" />
          <SubscriptionTable />
        </section>

        {/* 6. Model comparison — for the "build" crowd */}
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <SectionHeading eyebrow="API-priser" title="Jämför AI-modeller" sub="Pris per miljon tokens, sorterbart. Live-kurs i kronor." />
          <ModelComparisonTable />
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <FAQ />
        </section>

        {/* 8. Single email capture */}
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <div className="card max-w-lg mx-auto text-center">
            <p className="text-base font-bold text-gray-900 mb-1">Få mejl när AI-priser ändras</p>
            <p className="text-sm text-gray-500 mb-4">Vi bevakar priserna åt dig — max ett mejl i veckan.</p>
            <EmailCaptureForm providerId="general" source="home-price-alert" />
          </div>
        </section>

        {/* 9. More guides — compact, calm */}
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-100">
          <SectionHeading title="Fler prisguider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {GUIDES.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="flex items-center justify-between py-2.5 border-b border-gray-100 text-gray-700 hover:text-brand-700 transition-colors group"
              >
                <span>{g.title}</span>
                <span className="text-gray-300 group-hover:text-brand-700 group-hover:translate-x-0.5 transition-all" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Deep dive — kept for readers (and SEO), folded away so the page
            stays calm for newcomers. */}
        <details className="group mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-gray-200">
          <summary className="cursor-pointer list-none flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="text-brand-700 group-open:rotate-90 transition-transform inline-block">▸</span>
            Fördjupning: vad kostar AI i Sverige 2026?
          </summary>

          <div className="prose prose-gray max-w-none mt-6">
            <p className="text-gray-600 leading-relaxed">
              AI-kostnaden i Sverige varierar enormt beroende på hur du använder tekniken.
              En privatperson som chattar med <strong>ChatGPT Plus</strong> eller{" "}
              <strong>Claude Pro</strong> betalar ca 209 kr per månad för ett fast abonnemang.
              En startup som bygger ett eget AI-verktyg via API kan betala allt från 20 kr till
              5 000 kr per månad — beroende på antal användare, modellval och hur långa
              texterna är.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">De två prismodellerna</h3>
            <p className="text-gray-600 leading-relaxed">
              Det finns två sätt att betala: <strong>abonnemang</strong> och{" "}
              <strong>API-pris per token</strong>. Abonnemang passar dig som vill ha ett färdigt
              verktyg — ChatGPT Plus (209 kr/mån), Claude Pro (209 kr/mån) och Gemini Advanced
              (199 kr/mån). API-pris passar dig som bygger egna appar och betalar per token —
              GPT-4o kostar $2,50/$10 per miljon tokens, Claude Sonnet $3/$15. De billigaste —
              GPT-4o mini ($0,15/$0,60) och Mistral Small ($0,10/$0,30) — passar hög volym.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Varför kostar svenska texter mer?</h3>
            <p className="text-gray-600 leading-relaxed">
              AI-modeller tokeniserar svenska annorlunda än engelska. Svenska ord blir ca{" "}
              <strong>1,3 tokens per ord</strong> mot 0,75 på engelska — på grund av sammansatta
              ord och tecknen å, ä, ö. En svensk prompt kostar alltså ca{" "}
              <strong>73 % mer per ord</strong> att bearbeta. Kalkylatorn ovan räknar in detta.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Tre tips för att hålla nere kostnaden</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Använd rätt modell.</strong> GPT-4o mini och Claude Haiku är 10–20× billigare
                än flaggskeppen och räcker för 80 % av uppgifterna. Se{" "}
                <Link to="/billigaste-ai" className="text-brand-700 hover:underline">billigaste AI 2026</Link>.
              </li>
              <li>
                <strong>Begränsa output.</strong> Output kostar 4× mer än input — be modellen svara kort.
              </li>
              <li>
                <strong>Aktivera prompt caching.</strong> Upp till 90 % rabatt på upprepade systempromptar.{" "}
                <Link to="/prompt-caching" className="text-brand-700 hover:underline">Så funkar det</Link>.
              </li>
            </ol>

            <p className="text-xs text-gray-400 mt-6">
              Priser verifierade {siteConfig.pricesLastVerified}. Live-kurs USD/SEK via Frankfurter API.
            </p>
          </div>
        </details>
      </main>
    </>
  );
}
