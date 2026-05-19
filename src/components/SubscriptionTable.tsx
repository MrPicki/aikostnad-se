import { useState } from "react";
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
  const total = Math.round(usd * rate);
  return total >= 10000
    ? `${total.toLocaleString("sv-SE")} kr`
    : `${total} kr`;
}

const PERSON_STEPS = [1, 5, 10, 25, 50, 100];

export function SubscriptionTable() {
  const { rate } = useExchangeRate();
  const [persons, setPersons] = useState(1);

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

  const isTeam = persons > 1;

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
        </p>
      </div>

      {/* Person multiplier — live updates the prices below */}
      <div className="mb-4 rounded-xl bg-indigo-50/60 border border-indigo-100 px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">👥</span>
          <label htmlFor="persons" className="text-sm font-semibold text-gray-800">
            Räkna för
          </label>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {PERSON_STEPS.map((n) => {
            const active = persons === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setPersons(n)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-indigo-100 border border-indigo-200"
                }`}
                aria-pressed={active}
              >
                {n === 1 ? "1 person" : `${n}`}
              </button>
            );
          })}
          <input
            id="persons"
            type="number"
            min={1}
            max={10000}
            value={persons}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (Number.isFinite(v) && v >= 1 && v <= 10000) setPersons(v);
            }}
            className="ml-1 w-16 px-2 py-1 text-xs rounded-md border border-indigo-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
            aria-label="Eget antal personer"
          />
        </div>
        {isTeam && (
          <p className="text-xs text-indigo-700 sm:ml-auto">
            Priserna nedan multipliceras med {persons}.
          </p>
        )}
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
              {PLANS.map((plan) => {
                const totalUsd = plan.priceUsd * persons;
                return (
                  <tr
                    key={plan.service}
                    className={`transition-colors ${
                      plan.popular ? "bg-indigo-50/60 hover:bg-indigo-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {plan.popular && (
                          <span className="inline-block px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full font-semibold uppercase tracking-wide whitespace-nowrap shadow-sm">
                            Bäst för nybörjare
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
                        {formatSek(totalUsd, rate)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isTeam
                          ? `${formatSek(plan.priceUsd, rate)} × ${persons}`
                          : `$${plan.priceUsd}/mån`}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {plan.freeVersion}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                      {plan.bestFor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          Priser i USD per månad (1 USD = {rate.toFixed(2)} SEK). Senast verifierade {siteConfig.pricesLastVerified}.
        </div>
      </div>

      {/* Mobil-cards */}
      <div className="sm:hidden space-y-3">
        {PLANS.map((plan) => {
          const totalUsd = plan.priceUsd * persons;
          return (
            <div
              key={plan.service}
              className={`card py-4 px-4 ${plan.popular ? "border-indigo-200 bg-indigo-50/40 ring-1 ring-indigo-100" : ""}`}
            >
              {plan.popular && (
                <span className="inline-block px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full font-semibold uppercase tracking-wide mb-2 shadow-sm">
                  Bäst för nybörjare
                </span>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm">{plan.service}</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{plan.provider}</p>
                  <p className="text-xs text-gray-500">{plan.bestFor}</p>
                  <p className="text-xs text-gray-400 mt-1">Gratis version: {plan.freeVersion}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-gray-900">
                    {formatSek(totalUsd, rate)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isTeam ? `× ${persons}` : "/mån"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
