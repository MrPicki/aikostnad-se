import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const article = articles["ai-for-ehandel"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar en AI-chatbot för ett e-handelsföretag per månad?",
    answer:
      "En Claude Haiku-baserad kundtjänst-chatbot som svarar på 300 frågor per dag kostar ungefär 118 SEK per månad i API-kostnader. Lägg till hosting och en enkel backend och totalen landar på 150–400 SEK/mån. Det är billigare än en halvtimmes kundtjänstarbete och chatboten svarar dygnet runt, sju dagar i veckan.",
  },
  {
    question: "Hur bra blir AI-genererade produkttexter för e-handel?",
    answer:
      "Moderna AI-modeller som Claude Haiku och GPT-4o mini ger acceptabel till bra kvalitet för standardiserade produkttexter — specifikationstexter, features-listor och kort SEO-copy. Kreativa texter med stark varumärkesröst och riktigt differentierat copywriting kräver fortfarande mänsklig insats. En bra arbetsprocess är att AI genererar ett utkast som en copywriter sedan finjusterar — det sparar 70–80 % av skrivtiden.",
  },
  {
    question: "Kan AI hjälpa med produktrekommendationer och personalisering?",
    answer:
      "Ja, men det kräver integration med er produktkatalog och köphistorik. Enklest är att använda AI för att generera personaliserat mejlinnehåll baserat på köphistorik — vad kunden har köpt och vad liknande kunder har köpt. För realtids-rekommendationer på sajten krävs mer teknisk integration, men lösningar som Klaviyo, Shopify AI och liknande produkter erbjuder detta utan att ni behöver bygga en API-integration från grunden.",
  },
  {
    question: "Vilken modell är bäst för hög volym e-handelsanvändning?",
    answer:
      "Claude Haiku 4.5 är det bästa valet för e-handel som kombinerar acceptabel svenska, snabb responstid och rimlig kostnad. GPT-4o mini är billigare men ger sämre svenska och kan upplevas som mer robotaktig i kundtjänstkonversationer. För produkttexter som ska hålla hög kvalitetsnivå och stark varumärkesröst på svenska rekommenderas Claude Sonnet 4.6, trots det högre priset.",
  },
];

export function AiForEhandel() {
  return (
    <>
      <SEO
        title="AI för e-handel — produkttexter, support och kostnad (2026)"
        description="AI-kostnader för e-handel: produktbeskrivningar, kundtjänst-chatbot och personaliserade mejl. Claude Haiku för snabb och billig volymhantering. Maj 2026."
        canonical="/ai-for-ehandel"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för e-handel", url: "https://aikostnad.se/ai-for-ehandel" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            AI för e-handel — produkttexter, support och kostnad (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilket AI passar ett e-handelsföretag?"
            answer={
              <>
                <strong>Claude Haiku 4.5</strong> är bäst för e-handel — snabb, acceptabel svenska och billig. Kundtjänst-chatbot 300 frågor/dag kostar <strong>~118 SEK/mån</strong>. Produkttexter 500/mån kostar <strong>~9 SEK/mån</strong>. Personaliserade mejl 1 000/mån kostar <strong>~24 SEK/mån</strong>. Total månadskostnad för ett typiskt e-handelsflöde: under 200 SEK.
              </>
            }
            bullets={[
              "Rekommenderad modell: Claude Haiku 4.5 (snabb, billig, acceptabel svenska)",
              "Kundtjänst-chatbot 300 frågor/dag: ~118 SEK/mån",
              "Produktbeskrivningar 500 texter/mån: ~9 SEK/mån",
              "Personaliserade mejl 1 000/mån: ~24 SEK/mån",
              "Total API-kostnad för alla tre: ~151 SEK/mån",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            E-handel är en av de branscher där AI har störst omedelbar affärspåverkan.
            Produkttexter, kundtjänst och personaliserad marknadsföring är alla arbetstunga
            och repetitiva uppgifter som AI hanterar snabbt och billigt. En e-handlare
            med 500 produkter i sortimentet kan generera SEO-optimerade produkttexter
            på svenska för under 10 kronor. En chatbot som svarar på 300 kundtjänstfrågor
            om dagen kostar under 120 kronor i månaden. Den här guiden ger konkreta
            kostnadssiffror, modellval och en guide för hur ni kommer igång.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Tre AI-tillämpningar för e-handel med bevisad ROI</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6">1. AI-genererade produkttexter i bulk</h3>
            <p className="text-gray-700 leading-relaxed">
              Att skriva 500 produktbeskrivningar manuellt tar hundratals timmar och kostar
              tiotusentals kronor i copywriting-tid. Med AI tar det timmar till en kostnad
              på under 10 kronor. Processen är enkel: mata in produktspecifikationer (namn,
              kategori, features, material) och be AI generera en svensk SEO-optimerad
              produktbeskrivning i ert varumärkes tonalitet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Claude Haiku 4.5 ger godkänd till bra kvalitet för de flesta produktkategorier.
              För produkter med stark varumärkeskommunikation eller komplex teknisk beskrivning
              kan Claude Sonnet 4.6 ge bättre resultat — men till 3× priset. Börja med Haiku och
              uppgradera om kvaliteten inte räcker.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Kundtjänst-chatbot — dygnet runt support</h3>
            <p className="text-gray-700 leading-relaxed">
              En AI-chatbot som är tränad på er FAQ, returriktlinjer, leveransinformation och
              produktkatalog kan svara på 70–85 % av alla inkommande kundtjänstfrågor utan
              mänsklig inblandning. De resterande 15–30 % eskaleras till en mänsklig
              kundtjänstmedarbetare för hantering.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vid 300 frågor per dag med Claude Haiku 4.5 är API-kostnaden ca 118 SEK per
              månad. En heltidsanställd kundtjänstmedarbetare kostar 25 000–35 000 kr per
              månad inklusive sociala avgifter. Om AI tar hand om 70 % av volymen frigörs
              enormt mycket kapacitet.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Personaliserade mejl och kampanjer</h3>
            <p className="text-gray-700 leading-relaxed">
              Personaliserade mejl med produktrekommendationer, mötespåminnelser och
              återaktiveringskampanjer konverterar 3–6× bättre än generiska massutskick.
              Med AI kan ni generera 1 000 individuellt anpassade mejl per månad baserat
              på köphistorik och beteendedata — till en API-kostnad på under 25 SEK.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Integration med Klaviyo, Mailchimp eller liknande e-postverktyg gör det enkelt
              att koppla AI-genererat innehåll till era befintliga segment och automations.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Scenario-tabell: tre konkreta use-cases</h2>
            <p className="text-gray-700 leading-relaxed">
              Beräkningar med Claude Haiku 4.5 (10,50 SEK/Mtok input, 52,50 SEK/Mtok output).
              22 arbetsdagar per månad. Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Use-case</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Volym</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API-kostnad/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Alternativ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Produktbeskrivningar</td>
                    <td className="px-3 py-2">500 texter/mån</td>
                    <td className="px-3 py-2 text-right font-bold">~9 SEK</td>
                    <td className="px-3 py-2 text-gray-500">GPT-4o mini: ~3 SEK</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Kundtjänst-chatbot</td>
                    <td className="px-3 py-2">300 frågor/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~118 SEK</td>
                    <td className="px-3 py-2 text-gray-500">GPT-4o mini: ~38 SEK</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Personaliserade mejl</td>
                    <td className="px-3 py-2">1 000/mån</td>
                    <td className="px-3 py-2 text-right font-bold">~24 SEK</td>
                    <td className="px-3 py-2 text-gray-500">GPT-4o mini: ~7 SEK</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Produkttexter: 200 input-tokens, 300 output-tokens per text. Chatbot: 200 input,
              300 output per fråga, 22 dagar. Mejl: 300 input, 400 output per mejl.
              Välj GPT-4o mini om priset prioriteras framför svenska kvalitet.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Teknisk implementation — tre nivåer</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementation av AI i e-handel kan göras på tre nivåer beroende på er
              tekniska kompetens och budget:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Nivå 1 — No-code (0–500 kr/mån)</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Använd Shopify AI, Tidio, Crisp eller liknande SaaS-produkter som har
                  inbyggd AI-integration. Inget programmeringskunnande krävs. Begränsad
                  anpassningsmöjlighet men snabbast att komma igång. Kostnad: 0–500 kr/mån
                  inklusive platform-avgift.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Nivå 2 — Low-code med Make/Zapier (500–2 000 kr/mån)</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Integrera direkt mot Claude/OpenAI API via automationsplattformar.
                  Exempelflöde: ny order → extrahera kunddata → generera personaliserat
                  tackmejl → skicka via Klaviyo. Kräver grundläggande förståelse för
                  automationsverktyg. Låg API-kostnad, platform-avgift tillkommer.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Nivå 3 — Custom API-integration (engångskostnad 20 000–80 000 kr)</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Full integration mot er e-handelsplattform (Shopify, WooCommerce, Centra).
                  Chatboten har tillgång till er produktkatalog, orderstatus och kundhistorik
                  i realtid. Kräver en backend-utvecklare men ger bäst kundupplevelse och
                  lägst löpande API-kostnad.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på ditt e-handelsflöde</h2>
            <p className="text-gray-700 leading-relaxed">
              Fyll i din specifika volym i{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              och se exakt vad Claude Haiku eller GPT-4o mini kostar för din e-handel —
              produkttexter, kundtjänst och mejlkampanjer jämförda sida vid sida.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-indigo-700 hover:underline">
                  Fullständig guide till AI-chatbot för e-handel
                </Link>
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-indigo-700 hover:underline">
                  Claude Haiku vs GPT-4o mini — detaljjämförelse
                </Link>
              </li>
              <li>
                <Link to="/ai-kostnad-per-manad" className="text-indigo-700 hover:underline">
                  Typiska AI-månadskostnader per e-handelssegment
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI för e-handel är 2026 inte en konkurrensfördel — det är ett konkurrensvillkor.
              Claude Haiku 4.5 ger den bästa balansen av pris, svenska kvalitet och hastighet
              för de flesta e-handelsflöden. Total API-kostnad för produkttexter, chatbot och
              mejl för ett medelstort e-handelsföretag landar på under 200 SEK per månad.
              Börja med kundtjänst-chatboten — det ger snabbast synlig ROI — och bygg
              sedan ut till produkttexter och personaliserade mejl.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras. Verifiera alltid mot respektive leverantörs prislista.
              Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-ehandel"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI för e-handel" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
