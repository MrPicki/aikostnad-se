import { Helmet } from "react-helmet-async";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { siteConfig } from "../config/siteConfig";

interface Plan {
  service: string;
  provider: string;
  priceUsd: number;
  freeVersion: string;
  includes: string;
  bestFor: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    service: "ChatGPT Plus",
    provider: "OpenAI",
    priceUsd: 20,
    freeVersion: "Ja (begränsat)",
    includes: "GPT-4o, DALL·E, kodkörning, webbsökning",
    bestFor: "Allround, privatanvändare, kodning",
    popular: true,
  },
  {
    service: "Claude Pro",
    provider: "Anthropic",
    priceUsd: 20,
    freeVersion: "Ja (begränsat)",
    includes: "Claude Sonnet, prioritet, längre konversationer",
    bestFor: "Skrivande, analys, juridik",
  },
  {
    service: "Gemini Advanced",
    provider: "Google",
    priceUsd: 19.99,
    freeVersion: "Ja (begränsat)",
    includes: "Gemini 2.5 Pro, Google Workspace-integration",
    bestFor: "Google-ekosystem, dokument, kalkylblad",
  },
  {
    service: "Perplexity Pro",
    provider: "Perplexity",
    priceUsd: 20,
    freeVersion: "Ja (begränsat)",
    includes: "Obegränsad AI-sökning, GPT-4o & Claude-tillgång",
    bestFor: "Research, faktakoll, källhänvisningar",
  },
  {
    service: "GitHub Copilot",
    provider: "GitHub (Microsoft)",
    priceUsd: 10,
    freeVersion: "Ja (studenter/open source)",
    includes: "Kodkomplettering i IDE, chatbot för kod",
    bestFor: "Utvecklare, kodassistent",
  },
  {
    service: "Midjourney Standard",
    provider: "Midjourney",
    priceUsd: 30,
    freeVersion: "Nej",
    includes: "15 GPU-timmar/mån, kommersiell licens",
    bestFor: "Bildgenerering, design, kreativitet",
  },
];

function formatSek(usd: number, rate: number): string {
  return `${Math.round(usd * rate)} kr`;
}

export function SubscriptionTable() {
  const { rate } = useExchangeRate();

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "AI-abonnemang jämförelse",
    itemListElement: PLANS.map((p, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: p.service,
      description: p.includes,
      seller: { "@type": "Organization", name: p.provider },
      price: Math.round(p.priceUsd * rate),
      priceCurrency: "SEK",
      category: p.bestFor,
    })),
  };

  return (
    <section aria-label="AI-abonnemang jämförelse">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(offerCatalogSchema)}</script>
      </Helmet>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          Vad kostar AI per månad?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fasta månadspriser — ingen token-räkning, ingen teknisk kunskap krävs.
          Kursen 1 USD = {rate.toFixed(2)} SEK.
        </p>
      </div>

      {/* Desktop-tabell */}
      <div className="card p-0 overflow-hidden hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Tjänst
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Pris / mån
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Gratis version?
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                  Passar bäst för
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLANS.map((plan) => (
                <tr key={plan.service} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {plan.popular && (
                        <span className="inline-block px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-medium whitespace-nowrap">
                          Populärast
                        </span>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{plan.service}</p>
                        <p className="text-xs text-gray-400">{plan.provider}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatSek(plan.priceUsd, rate)}
                    </p>
                    <p className="text-xs text-gray-400">${plan.priceUsd}/mån</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {plan.freeVersion}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                    {plan.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          Priser i USD per månad. Senast verifierade {siteConfig.pricesLastVerified}. Konverterade med live-valutakurs.
        </div>
      </div>

      {/* Mobil-cards */}
      <div className="sm:hidden space-y-3">
        {PLANS.map((plan) => (
          <div key={plan.service} className="card py-4 px-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-gray-900 text-sm">{plan.service}</p>
                  {plan.popular && (
                    <span className="inline-block px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-medium shrink-0">
                      Populärast
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{plan.provider}</p>
                <p className="text-xs text-gray-500">{plan.bestFor}</p>
                <p className="text-xs text-gray-400 mt-1">Gratis version: {plan.freeVersion}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-bold text-gray-900">
                  {formatSek(plan.priceUsd, rate)}
                </p>
                <p className="text-xs text-gray-400">/mån</p>
              </div>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-400 pt-1">
          Senast verifierade {siteConfig.pricesLastVerified}.
        </p>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Bygger du en app och behöver räkna per token?{" "}
        <a href="#kalkylator" className="text-indigo-600 hover:underline">
          Se API-kalkylatorn
        </a>{" "}
        längre ner.
      </p>
    </section>
  );
}
