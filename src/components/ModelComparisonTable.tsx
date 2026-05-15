import { useState, useMemo } from "react";
import { models, type ModelPricing } from "../data/modelPricing";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { formatSek, formatUsd } from "../utils/calculateCost";
import { siteConfig } from "../config/siteConfig";

type SortKey = "name" | "inputPrice" | "outputPrice" | "totalScenario" | "contextWindow";
type SortDir = "asc" | "desc";

// Standard scenario: 100 input words + 200 output words, in Swedish
const SCENARIO_INPUT_TOKENS = Math.ceil(100 * siteConfig.languageFactor);
const SCENARIO_OUTPUT_TOKENS = Math.ceil(200 * siteConfig.languageFactor);

function scenarioCostUsd(model: ModelPricing): number {
  return (
    (SCENARIO_INPUT_TOKENS / 1_000_000) * model.inputPricePerMToken +
    (SCENARIO_OUTPUT_TOKENS / 1_000_000) * model.outputPricePerMToken
  );
}

function formatContext(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

interface ThProps {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  direction: SortDir;
  onClick: (k: SortKey) => void;
}

function Th({ label, sortKey, current, direction, onClick }: ThProps) {
  const active = current === sortKey;
  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-indigo-600 whitespace-nowrap"
      onClick={() => onClick(sortKey)}
      aria-sort={active ? (direction === "asc" ? "ascending" : "descending") : "none"}
    >
      <span className="flex items-center gap-1">
        {label}
        <span className="text-gray-300">
          {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </span>
    </th>
  );
}

export function ModelComparisonTable() {
  const [sortKey, setSortKey] = useState<SortKey>("totalScenario");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showOpenSource, setShowOpenSource] = useState(true);
  const { rate } = useExchangeRate();

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    const filtered = showOpenSource
      ? models
      : models.filter((m) => m.category === "commercial");

    return [...filtered].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;
      switch (sortKey) {
        case "name":
          valA = a.name;
          valB = b.name;
          break;
        case "inputPrice":
          valA = a.inputPricePerMToken;
          valB = b.inputPricePerMToken;
          break;
        case "outputPrice":
          valA = a.outputPricePerMToken;
          valB = b.outputPricePerMToken;
          break;
        case "contextWindow":
          valA = a.contextWindow;
          valB = b.contextWindow;
          break;
        default:
          valA = scenarioCostUsd(a);
          valB = scenarioCostUsd(b);
      }
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDir === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDir === "asc"
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });
  }, [sortKey, sortDir, showOpenSource]);

  return (
    <section aria-label="Modell-jämförelsetabell">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Vilken AI-modell är billigast?
        </h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Standardscenario: {SCENARIO_INPUT_TOKENS} input-tokens +{" "}
          {SCENARIO_OUTPUT_TOKENS} output-tokens per fråga (ca 100 + 200 ord
          på svenska)
        </p>
      </div>
      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={showOpenSource}
            onChange={(e) => setShowOpenSource(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600"
          />
          Visa open source
        </label>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="grid">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <Th
                  label="Modell"
                  sortKey="name"
                  current={sortKey}
                  direction={sortDir}
                  onClick={handleSort}
                />
                <Th
                  label="Input /Mtok"
                  sortKey="inputPrice"
                  current={sortKey}
                  direction={sortDir}
                  onClick={handleSort}
                />
                <Th
                  label="Output /Mtok"
                  sortKey="outputPrice"
                  current={sortKey}
                  direction={sortDir}
                  onClick={handleSort}
                />
                <Th
                  label="Kostnad/fråga"
                  sortKey="totalScenario"
                  current={sortKey}
                  direction={sortDir}
                  onClick={handleSort}
                />
                <Th
                  label="Kontextfönster"
                  sortKey="contextWindow"
                  current={sortKey}
                  direction={sortDir}
                  onClick={handleSort}
                />
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Bäst för
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((model, i) => {
                const scenarioCost = scenarioCostUsd(model);
                const isCheapest =
                  sortKey === "totalScenario" &&
                  sortDir === "asc" &&
                  i === 0;
                return (
                  <tr
                    key={model.id}
                    className={`hover:bg-gray-50 transition-colors ${isCheapest ? "bg-green-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isCheapest && (
                          <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                            Billigast
                          </span>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {model.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {model.provider}
                            {model.category === "open-source" && (
                              <span className="ml-1 text-blue-500">
                                · open source
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      ${model.inputPricePerMToken}
                      <span className="block text-xs text-gray-400">
                        {formatSek(model.inputPricePerMToken * rate)}/Mtok
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      ${model.outputPricePerMToken}
                      <span className="block text-xs text-gray-400">
                        {formatSek(model.outputPricePerMToken * rate)}/Mtok
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {formatSek(scenarioCost * rate)}
                      <span className="block text-xs font-normal text-gray-400">
                        {formatUsd(scenarioCost)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatContext(model.contextWindow)}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">
                      {model.bestFor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          Priser i USD per miljon tokens. Senast verifierade {siteConfig.pricesLastVerified}.
          Klicka på kolumnrubriker för att sortera.
        </div>
      </div>
    </section>
  );
}
