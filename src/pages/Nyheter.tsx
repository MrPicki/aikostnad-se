import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  source: string;
}

function relativeTime(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (minutes < 60) return `${minutes} min sedan`;
  if (hours < 24) return `${hours} timm${hours === 1 ? "e" : "ar"} sedan`;
  if (days < 30) return `${days} dag${days === 1 ? "" : "ar"} sedan`;
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
  });
}

function internalLink(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("gpt") || t.includes("openai") || t.includes("chatgpt"))
    return "/vad-kostar-chatgpt";
  if (t.includes("claude") || t.includes("anthropic")) return "/claude-pris";
  if (t.includes("gemini") || t.includes("google")) return "/gemini-pris";
  if (t.includes("deepseek")) return "/deepseek-pris";
  return "/jamfor-ai-modeller";
}

function buildTweet(title: string, path: string): string {
  const shortTitle = title.slice(0, 100);
  return `${shortTitle}\n\nRäkna ut vad det kostar dig på aikostnad.se 👇\nhttps://aikostnad.se${path}\n\n#AI #AIpriser`;
}

function ArticleCard({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);
  const path = internalLink(article.title);

  function handleCopy() {
    navigator.clipboard
      .writeText(buildTweet(article.title, path))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 transition-colors">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span className="font-medium text-indigo-600">{article.source}</span>
        <span>·</span>
        <span>{relativeTime(article.pubDate)}</span>
      </div>

      <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600 transition-colors"
        >
          {article.title}
        </a>
      </h2>

      {article.summary && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={path}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Se aktuella priser →
        </Link>

        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
            copied
              ? "border-green-400 text-green-700 bg-green-50"
              : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {copied ? "Kopierat! ✓" : "Kopiera tweet"}
        </button>
      </div>
    </article>
  );
}

export function Nyheter() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/ai-news")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<Article[]>;
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="AI-nyheter 2026 | Aikostnad.se"
        description="Senaste nyheterna om AI-priser, modelluppdateringar och lanseringar från OpenAI, Anthropic och Google — på ett ställe."
        canonical="https://aikostnad.se/nyheter"
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          AI-nyheter
        </h1>
        <p className="text-gray-500 text-center mb-10 text-sm">
          Senaste nytt från OpenAI, Anthropic och TechCrunch
        </p>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">
              Kunde inte hämta nyheter just nu.
            </p>
            <button
              onClick={() => {
                setError(false);
                setLoading(true);
                fetch("/api/ai-news")
                  .then((r) => r.json() as Promise<Article[]>)
                  .then((data) => {
                    setArticles(data);
                    setLoading(false);
                  })
                  .catch(() => {
                    setError(true);
                    setLoading(false);
                  });
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 underline"
            >
              Försök igen
            </button>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            Inga nyheter hittades.
          </p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article, i) => (
              <ArticleCard key={`${article.link}-${i}`} article={article} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
