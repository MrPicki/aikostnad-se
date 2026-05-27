import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { PriceOfferSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Perplexity Pro per månad 2026?",
    answer:
      "Perplexity Pro kostar 20 USD/månad (ca 210 kr) eller 200 USD/år (ca 1 890 kr/år vilket motsvarar 158 kr/mån — 17 % rabatt). Det ger 300 Pro Searches per dag, möjlighet att välja modell (GPT-4o, Claude Sonnet, Gemini Pro), Pro File Upload, Spaces (delade research-rum) och bildgenerering.",
  },
  {
    question: "Är Perplexity Pro värt det jämfört med ChatGPT Plus?",
    answer:
      "De är komplement, inte ersättning. ChatGPT Plus är bättre för generella uppgifter, kreativt skrivande och kodning. Perplexity Pro är bättre för researcharbete med källhänvisningar, faktakontroll och 'frågor med konkret svar'. Många heavy users har båda. Använder du AI främst för att hitta korrekt, citerbar information — välj Perplexity. För allt-i-ett — ChatGPT.",
  },
  {
    question: "Vad är skillnaden mellan Perplexity Free och Pro?",
    answer:
      "Perplexity Free ger obegränsade Quick Searches och 5 Pro Searches per dag (med Sonar-modellen). Pro ger 300 Pro Searches/dag, modellval (GPT-4o, Claude, Gemini), Pro File Upload (filer upp till 50 MB), Spaces, bildgenerering via DALL-E och längre kontextfönster. Free räcker för sporadisk användning; Pro behövs vid 10+ avancerade sökningar per dag.",
  },
  {
    question: "Vad kostar Perplexity Enterprise?",
    answer:
      "Perplexity Enterprise börjar på 40 USD/användare/månad (ca 420 kr) vid årsbetalning eller 50 USD/mån vid månadsbetalning. Det inkluderar SSO, admin-konsoll, SOC 2-compliance och databehandlingsavtal (DPA). För team över 250 personer förhandlas anpassade priser direkt med Perplexity.",
  },
  {
    question: "Stödjer Perplexity svenska?",
    answer:
      "Ja, Perplexity stödjer svenska fullt ut — både inputfrågor och svar. Modellerna under huven (GPT-4o, Claude Sonnet, Sonar) hanterar svenska bra. Källhänvisningar till svenska sidor fungerar också. Många journalister och researchers i Sverige använder Perplexity som första källa för faktakontroll.",
  },
];

export function PerplexityPris() {
  return (
    <>
      <SEO
        title="Perplexity AI pris 2026 — vad kostar Perplexity Pro per månad?"
        description="Perplexity AI priser i Sverige: gratis tier, Pro (20 USD/mån) och Enterprise. Vad du faktiskt får och om Perplexity Pro är värt pengarna 2026."
        canonical="/perplexity-pris"
      />
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://aikostnad.se/" },
          { name: "Perplexity pris", url: "https://aikostnad.se/perplexity-pris" },
        ]}
      />
      <ArticleSchema article={articles["perplexity-pris"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="Perplexity AI — abonnemang"
        description="Perplexity AI pris 2026: Free, Pro (20 USD/mån) och Enterprise (40 USD/användare/mån) — i svenska kronor."
        brand="Perplexity"
        url="https://aikostnad.se/perplexity-pris"
        offers={[
          { name: "Perplexity Free", priceSek: 0, description: "Obegränsade Quick Searches, 5 Pro Searches/dag" },
          { name: "Perplexity Pro (månadsvis)", priceSek: 210, description: "20 USD/mån — 300 Pro Searches, modellval, Spaces" },
          { name: "Perplexity Pro (årsbetalning)", priceSek: 158, description: "200 USD/år, 17 % rabatt — per månad" },
          { name: "Perplexity Enterprise", priceSek: 420, description: "40 USD/användare/mån (årsbetalning) — SSO, SOC 2, DPA" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Perplexity AI pris — vad kostar Perplexity Pro?
          </h1>

          <LastUpdated date={articles["perplexity-pris"].modifiedDate} />

          <TLDR
            question="Vad kostar Perplexity?"
            answer={
              <>
                <strong>Perplexity Free</strong> är gratis (5 Pro Searches/dag). <strong>Perplexity Pro 210 kr/mån</strong> (20 USD) ger 300 Pro Searches/dag, modellval (GPT-4o, Claude, Gemini), Spaces och bildgenerering. <strong>Enterprise från 420 kr/användare/mån</strong> med SSO, SOC 2 och DPA. Vid årsbetalning sparar du 17 %.
              </>
            }
            bullets={[
              "Perplexity Free: 0 kr (5 Pro Searches/dag)",
              "Perplexity Pro: 210 kr/mån (300 Pro Searches/dag)",
              "Pro årsbetalning: 158 kr/mån (1 890 kr/år)",
              "Enterprise: 420 kr/användare/mån",
              "Modellval i Pro: GPT-4o, Claude, Gemini, Grok",
              "Spaces (delade research-rum) endast för Pro+",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Perplexity är inte en chatbot — det är en <strong>"answer engine"</strong>. Du
              ställer en fråga och får ett konkret svar med <strong>källhänvisningar</strong>{" "}
              direkt under varje påstående. För faktakontroll, researcharbete och allt där du
              behöver kunna citera källan är Perplexity överlägset.
            </p>
            <p>
              Sedan 2025 har Perplexity byggt ett ekosystem som konkurrerar med både{" "}
              <Link to="/vad-kostar-chatgpt" className="text-indigo-700 hover:underline">ChatGPT</Link>{" "}
              och <Link to="/claude-pris" className="text-indigo-700 hover:underline">Claude</Link>{" "}
              med funktioner som Spaces (delade research-rum) och Pro File Upload (analysera filer
              upp till 50 MB). Den här guiden går igenom priser, vad du får och när det lönar sig.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Vad ingår i Perplexity Pro (210 kr/mån)?</h2>
          <ul>
            <li><strong>300 Pro Searches/dag</strong> — i praktiken obegränsat för 95 % av användare.</li>
            <li><strong>Modellval</strong>: välj mellan GPT-4o, Claude Sonnet 4.6, Gemini 2.5 Pro, Grok 3 och Perplexitys egen Sonar — modell per fråga.</li>
            <li><strong>Pro File Upload</strong>: ladda upp filer upp till 50 MB (PDF, CSV, bilder) och låt Perplexity analysera dem.</li>
            <li><strong>Spaces</strong>: delade research-rum för team eller projekt — som "GPT" eller "Project" hos ChatGPT/Claude.</li>
            <li><strong>Bildgenerering</strong>: DALL-E 3 inbyggd.</li>
            <li><strong>Längre kontextfönster</strong> än Free-versionen.</li>
            <li><strong>Inga annonser</strong>: Free-versionen har börjat visa annonser i sökresultat.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Perplexity Pro vs ChatGPT Plus — vilken är bäst?</h2>
          <p>
            Båda kostar samma (210 kr/mån) och har överlappande funktioner. Skillnaden ligger
            i fokus:
          </p>
          <ul>
            <li><strong>Perplexity Pro</strong>: bäst för research, faktakontroll, citerbarhet, snabba svar med källor.</li>
            <li><strong>ChatGPT Plus</strong>: bäst för kreativt arbete, kodning, längre konversationer, Custom GPTs.</li>
          </ul>
          <p>
            Power users har båda. Måste du välja en — utgå från vad du gör mest. Skriver du
            mest texter och kod: ChatGPT Plus. Letar du fakta och underbyggnad: Perplexity Pro.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När är Perplexity Pro inte värt det?</h2>
          <p>
            Om du gör under 5 djupa sökningar per dag räcker Free-versionen. Om du är heavy
            user av modellval och faktiskt kör samma modeller direkt via{" "}
            <Link to="/openai-api-kostnad" className="text-indigo-700 hover:underline">OpenAI</Link>{" "}
            eller Claude.ai kan du också skippa Perplexity. Och om du främst använder AI för
            skrivande och kodning ger ChatGPT Plus mer värde för samma pengar.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["perplexity-pris"] ?? []} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om Perplexity-priser" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
