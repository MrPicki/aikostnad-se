import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export function Kontakt() {
  return (
    <>
      <SEO
        title="Kontakta oss — Aikostnad.se"
        description="Frågor om AI-priser, felaktiga modellpriser eller samarbeten? Hör av dig till oss på hej@aikostnad.se."
        canonical="/kontakt"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Kontakta oss", url: "https://aikostnad.se/kontakt" },
      ]} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Kontakta oss</h1>
        <p className="text-gray-500 text-sm mb-10">
          Vi svarar normalt inom 1–2 arbetsdagar.
        </p>

        <div className="space-y-6">
          {/* Primary contact */}
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              E-post
            </h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Det enda sättet att nå oss just nu — inga chattar, inga formulär.
            </p>
          </div>

          {/* Use cases */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Vad kan du höra av dig om?
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong className="text-gray-800">Felaktiga priser</strong> — om du hittar en modellpris som stämmer fel är vi tacksamma för ett tips.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong className="text-gray-800">Saknade modeller</strong> — finns det en AI-modell du vill se i jämförelsetabellen?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong className="text-gray-800">Samarbeten</strong> — partnerskap, gästartiklar eller länkbyten.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong className="text-gray-800">Allmänna frågor</strong> — om AI-kostnader eller hur kalkylatorn fungerar.</span>
              </li>
            </ul>
          </div>

          {/* FAQ nudge */}
          <p className="text-xs text-gray-400 text-center">
            Har du en teknisk fråga om hur kalkylatorn räknar?{" "}
            <Link to="/#faq" className="text-indigo-500 hover:underline">
              Kolla FAQ:n
            </Link>{" "}
            — den täcker de vanligaste frågorna.
          </p>
        </div>
      </main>
    </>
  );
}
