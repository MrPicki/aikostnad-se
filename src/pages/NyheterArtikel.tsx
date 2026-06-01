import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { sanitizeArticleHtml } from "../utils/sanitizeHtml";

interface Article {
  date: string;
  title: string;
  ingress: string;
  content: string;
}

function formatSwedishDate(dateStr: string): string {
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const months = [
    "januari", "februari", "mars", "april", "maj", "juni",
    "juli", "augusti", "september", "oktober", "november", "december",
  ];
  return `${day} ${months[month - 1]} ${year}`;
}

export function NyheterArtikel() {
  const { date } = useParams<{ date: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!date) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    fetch(`/api/article?date=${date}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<Article>;
      })
      .then((data) => {
        if (data) setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [date]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-24 flex justify-center">
        <div className="w-8 h-8 border-2 border-brand-700 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <>
        <SEO
          title="Artikel hittades inte"
          description="Den här AI-rapporten kunde inte hittas."
          canonical={`/nyheter/${date ?? ""}`}
        >
          <meta name="robots" content="noindex" />
        </SEO>
        <main className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-500 mb-4">Artikeln hittades inte.</p>
          <Link
            to="/nyheter"
            className="text-sm text-brand-700 hover:text-brand-800 underline"
          >
            ← Alla nyheter
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.ingress ?? ""}
        canonical={`/nyheter/${date}`}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.ingress ?? "",
            datePublished: article.date,
            dateModified: article.date,
            inLanguage: "sv-SE",
            mainEntityOfPage: `https://aikostnad.se/nyheter/${date}`,
            author: { "@type": "Organization", name: "Aikostnad.se" },
            publisher: {
              "@type": "Organization",
              name: "Aikostnad.se",
              logo: {
                "@type": "ImageObject",
                url: "https://aikostnad.se/og-image.png",
              },
            },
          })}
        </script>
      </SEO>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/nyheter"
          className="text-sm text-brand-700 hover:text-brand-800 transition-colors mb-8 inline-block"
        >
          ← Alla nyheter
        </Link>

        <article>
          <p className="text-sm text-gray-500 mb-3">
            {formatSwedishDate(article.date)}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          {article.ingress && (
            <p className="text-lg text-gray-600 italic border-l-4 border-brand-300 pl-4 mb-8 leading-relaxed">
              {article.ingress}
            </p>
          )}

          <div
            className="prose max-w-none text-gray-700 mb-12
              prose-headings:text-gray-900 prose-headings:font-semibold
              prose-h2:text-xl prose-h2:mt-8
              prose-p:leading-relaxed
              prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline"
            // LLM-generated from third-party RSS — sanitized before render.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(article.content) }}
          />
        </article>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Link
            to="/nyheter"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Alla nyheter
          </Link>
          <Link
            to="/token-kalkylator"
            className="inline-block bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-800 transition-colors text-sm"
          >
            Räkna ut din AI-kostnad →
          </Link>
        </div>
      </main>
    </>
  );
}
