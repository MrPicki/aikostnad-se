import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../config/siteConfig";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://aikostnad.se/om",
  mainEntity: {
    "@type": "Organization",
    name: "Aikostnad.se",
    url: "https://aikostnad.se",
    email: siteConfig.contactEmail,
    description:
      "Svensk kalkylator för AI-kostnader. Vi översätter API-priser och abonnemang från ChatGPT, Claude, Gemini och fler till svenska kronor.",
    foundingDate: "2026-05",
    areaServed: { "@type": "Country", name: "Sverige" },
    knowsAbout: [
      "AI-kostnader",
      "ChatGPT-priser",
      "Claude-priser",
      "Gemini-priser",
      "API-prissättning",
      "Tokenisering",
      "USD/SEK valutakurs",
    ],
  },
};

export function Om() {
  return (
    <>
      <SEO
        title="Om Aikostnad.se — så verifierar vi AI-priser"
        description="Aikostnad.se är en svensk AI-kostnadskalkylator. Läs om hur vi verifierar modellpriser månadsvis, vilka modeller vi täcker och varför sajten finns."
        canonical="/om"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Om Aikostnad.se", url: "https://aikostnad.se/om" },
      ]} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="space-y-8">
          <header>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Om Aikostnad.se
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sveriges oberoende kalkylator för AI-kostnader. Vi översätter
              API-priser och abonnemang från ChatGPT, Claude, Gemini och fler
              till svenska kronor — så att vanliga människor kan jämföra utan
              att räkna själva.
            </p>
          </header>

          {/* Mission */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Varför sajten finns</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-priser ändras varje månad. De anges nästan alltid i dollar per
              miljon tokens — ett mått som få förstår på fem sekunder. Vi
              översätter det till frågan folk faktiskt ställer:{" "}
              <em>"Vad kostar det per månad om jag använder X?"</em>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se finns för att vi själva tröttnade på att räkna AI-
              kostnader i Excel — och vi misstänkte att fler hade samma problem.
            </p>
          </section>

          {/* Verification process */}
          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Så verifierar vi priser</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Varje månad kontrollerar vi modellpriserna mot leverantörens
              officiella prissida. Datumet för senaste verifiering visas per
              modell i kalkylatorn — är det äldre än 30 dagar har du anledning
              att dubbelkolla.
            </p>
            <div className="text-gray-600 text-sm leading-relaxed">
              <p className="font-semibold text-gray-800 mb-2">Vår process:</p>
              <ol className="list-decimal list-inside space-y-1.5 ml-1">
                <li>Kontrollera officiell prislista (OpenAI, Anthropic, Google, Mistral, DeepSeek)</li>
                <li>Uppdatera modellpriserna i koden</li>
                <li>Stämpla verifieringsdatum per modell</li>
                <li>Deploy → priserna är live samma dag</li>
              </ol>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              USD/SEK-kursen hämtas dagligen via{" "}
              <a
                href="https://www.frankfurter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Frankfurter API
              </a>
              . Faller hämtningen bort används en fallback-kurs (10,50 kr per
              dollar) som markeras tydligt i UI:t.
            </p>
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              Priser senast verifierade {siteConfig.pricesLastVerified}. Hittar
              du ett felaktigt pris?{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-indigo-600 hover:underline"
              >
                Hör gärna av dig.
              </a>
            </p>
          </section>

          {/* Coverage */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Vad sajten täcker</h2>
            <ul className="text-gray-600 text-sm leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">14 AI-modeller</strong> — kommersiella API:er (OpenAI, Anthropic, Google, Mistral) och open-source-alternativ (DeepSeek, Llama via Groq)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Token-baserade API-priser</strong> + fasta konsumentabonnemang (ChatGPT Plus, Claude Pro, Gemini Advanced, GitHub Copilot m.fl.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Korrekt tokenisering för svenska</strong> — vi räknar med 1,3 tokens per ord (engelska är 0,75) p.g.a. å/ä/ö och långa sammansatta ord
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Live USD/SEK-kurs</strong> — uppdateras dagligen
                </span>
              </li>
            </ul>
          </section>

          {/* What we are not */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Vad sajten inte är</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vi är inte en återförsäljare. Vi tar inga betalningar. Det finns
              inga affiliate-länkar idag — om vi lägger till sådana i framtiden
              kommer de märkas tydligt. Sajten finansieras inte — vi driver den
              för att vi själva behöver den.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Alla kalkyler är uppskattningar baserade på publika prislistor och
              standardvärden för svensk tokenisering. Verkliga kostnader kan
              avvika — kontrollera alltid mot leverantörens prislista innan du
              fattar ett affärsbeslut.
            </p>
          </section>

          {/* Contact */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Kontakt</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Frågor om en specifik kalkyl, felrapporter, samarbeten eller bara
              feedback — hör av dig till{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-indigo-600 hover:underline font-medium"
              >
                {siteConfig.contactEmail}
              </a>
              . Vi svarar normalt inom 1–2 arbetsdagar.
            </p>
            <p className="text-xs text-gray-400">
              <Link to="/kontakt" className="text-indigo-500 hover:underline">
                Mer info på kontaktsidan
              </Link>{" "}
              ·{" "}
              <Link to="/integritet" className="text-indigo-500 hover:underline">
                Integritetspolicy
              </Link>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
