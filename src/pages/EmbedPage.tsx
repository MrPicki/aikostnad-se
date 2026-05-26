import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";

const EMBED_CODE = `<iframe
  src="https://aikostnad.se/embed"
  width="100%"
  height="600"
  frameborder="0"
  title="AI-kostnadskalkylator"
></iframe>`;

export function EmbedPage() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMBED_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <SEO
        title="Bädda in AI-kostnadskalkylatorn på din sajt — gratis embed"
        description="Gratis embed av Aikostnad.se:s AI-kostnadskalkylator. Kopiera iframe-koden och bädda in direkt på din sajt. Inga annonser, kräver bara en länk tillbaka."
        canonical="/embed-info"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Bädda in kalkylatorn", url: "https://aikostnad.se/embed-info" },
      ]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Bädda in AI-kostnadskalkylatorn på din sajt
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Kalkylatorn är helt gratis att bädda in. Inga annonser, ingen branding —
          vi ber bara om en länk tillbaka till{" "}
          <Link to="/" className="text-indigo-600 hover:underline">aikostnad.se</Link>.
        </p>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Så här fungerar det</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card text-center">
              <p className="text-2xl mb-2">1</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Kopiera koden</p>
              <p className="text-xs text-gray-500">Klicka på kopiera-knappen nedan för att hämta iframe-koden.</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl mb-2">2</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Klistra in på din sajt</p>
              <p className="text-xs text-gray-500">Lägg koden var som helst i din HTML, WordPress eller annan plattform.</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl mb-2">3</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Länka tillbaka</p>
              <p className="text-xs text-gray-500">Kalkylatorn inkluderar en diskrekt attribution-länk automatiskt.</p>
            </div>
          </div>
        </section>

        {/* Embed code */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Embed-kod</h2>
          <div className="relative bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre">{EMBED_CODE}</pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? "Kopierat!" : "Kopiera"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Kalkylatorn är responsiv och anpassar sig efter bredden på din container.
            Rekommenderad höjd: 600 px.
          </p>
        </section>

        {/* Preview */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Förhandsvisning</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <iframe
              src="/embed"
              width="100%"
              height="600"
              title="AI-kostnadskalkylator förhandsvisning"
              className="block"
            />
          </div>
        </section>

        {/* What's included */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vad ingår i embed-kalkylatorn?</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Live SEK/USD-kurs via vår edge function</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Alla 11+ modeller: GPT-4o, Claude, Gemini, DeepSeek, o3 m.fl.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Manuellt verifierade priser uppdaterade regelbundet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Responsiv design — fungerar på mobil och desktop</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Inget spårningsskript, inga annonser i embed-vyn</span>
            </li>
          </ul>
        </section>

        {/* Custom embed CTA */}
        <section className="card bg-indigo-50 border-indigo-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Vill du ha en anpassad embed?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Vi kan anpassa kalkylatorn med din logotyp, ditt färgschema eller
            förifyllda parametrar. Kontakta oss så diskuterar vi möjligheterna.
          </p>
          <a
            href="mailto:hej@aikostnad.se"
            className="btn-primary inline-block text-sm"
          >
            Kontakta oss på hej@aikostnad.se
          </a>
        </section>
      </main>
    </>
  );
}
