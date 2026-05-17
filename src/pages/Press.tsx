import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { author, parentOrganization } from "../config/author";

const EMBED_SNIPPET = `<iframe
  src="https://aikostnad.se/embed"
  width="100%"
  height="900"
  style="border:1px solid #e5e7eb; border-radius:12px;"
  loading="lazy"
  title="AI-kostnadskalkylator från Aikostnad.se"
></iframe>`;

export function Press() {
  const [copied, setCopied] = useState(false);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(EMBED_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <SEO
        title="Press & embed — använd Aikostnad.se i din artikel"
        description="Press-info för svenska journalister och bloggare. Embed-kod för AI-kostnadskalkylatorn, bilder och kontaktinfo."
        canonical="/press"
      />
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://aikostnad.se/" },
          { name: "Press & embed", url: "https://aikostnad.se/press" },
        ]}
      />

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
              Press & embed
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Aikostnad.se är fri att referera, citera och embedda. Det här är
              info för svenska journalister, bloggare och tech-skribenter.
            </p>
          </header>

          {/* Quick facts */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Kort om sajten</h2>
            <ul className="text-gray-600 text-sm leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong>Vad:</strong> Svensk kalkylator för AI-kostnader (ChatGPT, Claude, Gemini m.fl.) i SEK.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong>För vem:</strong> Företagare, utvecklare och privatpersoner som vill veta vad AI faktiskt kostar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong>Av vem:</strong> {author.name} ({author.role}) på{" "}
                  <a href={parentOrganization.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {parentOrganization.name}
                  </a>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong>Affärsmodell:</strong> Helt gratis. Inga affiliate-länkar idag (om vi lägger till sådana märks de tydligt).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">→</span>
                <span><strong>Lansering:</strong> Maj 2026.</span>
              </li>
            </ul>
          </section>

          {/* Embed snippet */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Embedda kalkylatorn</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Skriver du en artikel om AI-kostnader? Du får gärna embedda
              kalkylatorn direkt i din sajt. Kopiera koden nedan — den fungerar
              i de flesta CMS (WordPress, Ghost, Webflow, Notion).
            </p>
            <div className="relative">
              <pre className="text-xs bg-gray-900 text-gray-100 rounded-lg px-4 py-4 overflow-x-auto leading-relaxed font-mono whitespace-pre">
                <code>{EMBED_SNIPPET}</code>
              </pre>
              <button
                onClick={copySnippet}
                className="absolute top-2 right-2 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors"
              >
                {copied ? "Kopierad!" : "Kopiera"}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Vi ber dig behålla "Powered by Aikostnad.se"-länken som ingår i embeden.
              Det är det enda villkoret. Vill du anpassa höjd eller styling — hör av dig.
            </p>
          </section>

          {/* Preview */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Förhandsvisning</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Så här ser embeden ut:
            </p>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <iframe
                src="/embed"
                title="Förhandsvisning av Aikostnad.se kalkylator-embed"
                className="w-full"
                style={{ height: 900, border: 0 }}
              />
            </div>
          </section>

          {/* Citation */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Citera oss</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Använder du våra prisuppgifter i en artikel? Vi uppskattar
              hänvisning till källan så läsarna kan kolla siffrorna.
            </p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3 font-mono leading-relaxed">
              Källa: <a href="https://aikostnad.se" className="text-indigo-600 hover:underline">Aikostnad.se</a>
            </p>
          </section>

          {/* Contact */}
          <section className="card space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Kontakt för press</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              För intervjuer, citat, eller anpassade embeds:{" "}
              <a
                href={`mailto:${author.email}`}
                className="text-indigo-600 hover:underline font-medium"
              >
                {author.email}
              </a>
              . Vi svarar inom 1–2 arbetsdagar.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
