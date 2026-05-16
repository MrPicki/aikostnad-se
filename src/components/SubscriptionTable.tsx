import { useExchangeRate } from "../hooks/useExchangeRate";
import { siteConfig } from "../config/siteConfig";

interface Plan {
  service: string;
  provider: string;
  plan: string;
  priceUsd: number;
  includes: string;
  bestFor: string;
}

const PLANS: Plan[] = [
  {
    service: "ChatGPT Plus",
    provider: "OpenAI",
    plan: "Plus",
    priceUsd: 20,
    includes: "GPT-4o, DALL·E, kodkörning, webbsökning",
    bestFor: "Allround, privatanvändare, kodning",
  },
  {
    service: "Claude Pro",
    provider: "Anthropic",
    plan: "Pro",
    priceUsd: 20,
    includes: "Claude Sonnet, prioritet, längre konversationer",
    bestFor: "Skrivande, analys, juridik",
  },
  {
    service: "Gemini Advanced",
    provider: "Google",
    plan: "Google One AI Premium",
    priceUsd: 19.99,
    includes: "Gemini 2.5 Pro, Google Workspace-integration",
    bestFor: "Google-ekosystem, dokument, kalkylblad",
  },
  {
    service: "Perplexity Pro",
    provider: "Perplexity",
    plan: "Pro",
    priceUsd: 20,
    includes: "Obegränsad AI-sökning, GPT-4o & Claude-tillgång",
    bestFor: "Research, faktakoll, källhänvisningar",
  },
  {
    service: "GitHub Copilot",
    provider: "GitHub (Microsoft)",
    plan: "Individual",
    priceUsd: 10,
    includes: "Kodkomplettering i IDE, chatbot för kod",
    bestFor: "Utvecklare, kodassistent",
  },
  {
    service: "Midjourney Standard",
    provider: "Midjourney",
    plan: "Standard",
    priceUsd: 30,
    includes: "15 GPU-timmar/mån, kommersiell licens",
    bestFor: "Bildgenerering, design, kreativitet",
  },
];

function formatSek(usd: number, rate: number): string {
  const sek = usd * rate;
  return `${Math.round(sek)} kr`;
}

export function SubscriptionTable() {
  const { rate } = useExchangeRate();

  return (
    <section aria-label="AI-abonnemang jämförelse">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Vad kostar AI per månad? Fasta abonnemang
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fasta månadspriser för privatpersoner och team — ingen token-räkning.
          Kursen 1 USD = {rate.toFixed(2)} SEK.
        </p>
      </div>

      <div className="card p-0 overflow-hidden">
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                  Ingår
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
                    <p className="font-medium text-gray-900 text-sm">{plan.service}</p>
                    <p className="text-xs text-gray-400">{plan.provider}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatSek(plan.priceUsd, rate)}
                    </p>
                    <p className="text-xs text-gray-400">${plan.priceUsd}/mån</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell max-w-xs">
                    {plan.includes}
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
          Priser i USD per månad. Senast verifierade {siteConfig.pricesLastVerified}.
          Konverterade till SEK med live-valutakurs.
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Behöver du ett API-abonnemang för att bygga egna applikationer?{" "}
        <a href="#kalkylator" className="text-indigo-600 hover:underline">
          Använd kalkylatorn ovan
        </a>{" "}
        för token-baserad prissättning.
      </p>
    </section>
  );
}
