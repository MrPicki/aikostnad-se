import { useState, useMemo } from "react";
import { models, type ModelPricing } from "../data/modelPricing";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { formatSek, formatUsd, humanSek } from "../utils/calculateCost";
import { siteConfig } from "../config/siteConfig";

type SortKey = "name" | "inputPrice" | "outputPrice" | "totalScenario" | "contextWindow";
type SortDir = "asc" | "desc";
type ViewMode = "simple" | "advanced";

// Standard scenario: 100 input words + 200 output words, Swedish
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

// Recommendation badges shown in simple view
const BADGES: Record<string, { label: string; color: string }> = {
  "gpt-4o-mini":       { label: "Mest prisvärd",         color: "bg-indigo-50 text-indigo-700" },
  "mistral-small":     { label: "Billigast",             color: "bg-green-50 text-green-700" },
  "claude-haiku-4-5":  { label: "Bäst kundtjänst",      color: "bg-blue-50 text-blue-700" },
  "claude-sonnet-4-6": { label: "Bäst svenska",         color: "bg-purple-50 text-purple-700" },
  "gpt-4.1":           { label: "Bäst för kodning",      color: "bg-orange-50 text-orange-700" },
  "gemini-2.5-pro":    { label: "Bäst långa dokument",   color: "bg-teal-50 text-teal-700" },
};

// Expert tips shown below the simple table
const EXPERT_TIPS = [
  "För de flesta enkla chatbotar och FAQ-funktioner räcker GPT-4o mini eller Mistral Small.",
  "Claude Sonnet är dyrare men ger märkbart bättre svenska svar för längre analyser och kundkommunikation.",
  "Open source-modeller (DeepSeek, Llama) kan vara billigare på papper men kräver mer teknisk setup och drift.",
  "För förutsägbar kostnad och inget tekniskt ansvar är ett fast abonnemang ofta bättre än API.",
];

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
        <span className="text-gray-300">{active ? (direction === "asc" ? "↑" : "↓") : "↕"}</span>
      </span>
    </th>
  );
}

export function ModelComparisonTable() {
  const [sortKey, setSortKey] = useState<SortKey>("totalScenario");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showOpenSource, setShowOpenSource] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("simple");
  const { rate } = useExchangeRate();

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  const sorted = useMemo(() => {
    const filtered = showOpenSource ? models : models.filter((m) => m.category === "commercial");
    return [...filtered].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;
      switch (sortKey) {
        case "name":         valA = a.name; valB = b.name; break;
        case "inputPrice":   valA = a.inputPricePerMToken; valB = b.inputPricePerMToken; break;
        case "outputPrice":  valA = a.outputPricePerMToken; valB = b.outputPricePerMToken; break;
        case "contextWindow": valA = a.contextWindow; valB = b.contextWindow; break;
        default:             valA = scenarioCostUsd(a); valB = scenarioCostUsd(b);
      }
      if (typeof valA === "string" && typeof valB === "string")
        return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortDir === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [sortKey, sortDir, showOpenSource]);

  return (
    <section aria-label="Modell-jämförelsetabell">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Vilken AI-modell passar dig?</h2>
        <p className="text-sm text-gray-500 mt-1">
          Standardscenario: {SCENARIO_INPUT_TOKENS} input + {SCENARIO_OUTPUT_TOKENS} output-tokens per fråga
          (ca 100 + 200 ord på svenska)
        </p>
        <details className="mt-2 group">
          <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 select-none list-none inline-flex items-center gap-1.5">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Vad betyder "token", "input" och "output"?
          </summary>
          <p className="mt-2 text-xs text-gray-500 leading-relaxed max-w-2xl">
            <strong className="text-gray-700">Token</strong> ≈ ett ord (svenska räknas {siteConfig.languageFactor}× pga å/ä/ö).{" "}
            <strong className="text-gray-700">Input</strong> = vad du skickar till AI:n (din fråga).{" "}
            <strong className="text-gray-700">Output</strong> = AI:ns svar — kostar ofta 3-5× mer per token än input.
          </p>
        </details>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        {/* View toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("simple")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "simple"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Enkel vy
          </button>
          <button
            onClick={() => setViewMode("advanced")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "advanced"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Avancerad vy
          </button>
        </div>

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

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          {viewMode === "simple" ? (
            <SimpleTable sorted={sorted} rate={rate} />
          ) : (
            <AdvancedTable
              sorted={sorted}
              rate={rate}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          )}
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
          {viewMode === "simple"
            ? `Kostnad per fråga baserat på ca 100+200 ord. Senast verifierade ${siteConfig.pricesLastVerified}.`
            : `Priser i USD per miljon tokens. Senast verifierade ${siteConfig.pricesLastVerified}. Klicka på kolumnrubriker för att sortera.`}
        </div>
      </div>

      {/* Expert tips — simple view only */}
      {viewMode === "simple" && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERT_TIPS.map((tip) => (
            <p key={tip} className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
              💡 {tip}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Simple view (card grid) ───────────────────────────────────────────────────

interface SimpleTableProps {
  sorted: ModelPricing[];
  rate: number;
}

function SimpleTable({ sorted, rate }: SimpleTableProps) {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sorted.map((model) => {
        const cost = scenarioCostUsd(model);
        const badge = BADGES[model.id];
        return (
          <div
            key={model.id}
            className={`rounded-xl border p-4 bg-white ${badge ? "border-indigo-100 shadow-sm" : "border-gray-100"}`}
          >
            {badge && (
              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-3 ${badge.color}`}>
                {badge.label}
              </span>
            )}
            <p className="font-semibold text-gray-900 text-sm leading-tight">{model.name}</p>
            <p className="text-xs text-gray-400 mb-3">
              {model.provider}
              {model.category === "open-source" && (
                <span className="ml-1 text-blue-500">· open source</span>
              )}
            </p>
            <p className="text-xl font-bold text-gray-900">{humanSek(cost * rate)}</p>
            <p className="text-xs text-gray-400 mb-3">/fråga</p>
            <p className="text-xs text-gray-500 leading-relaxed">{model.bestFor}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Advanced view ─────────────────────────────────────────────────────────────

interface AdvancedTableProps {
  sorted: ModelPricing[];
  rate: number;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (k: SortKey) => void;
}

function AdvancedTable({ sorted, rate, sortKey, sortDir, onSort }: AdvancedTableProps) {
  return (
    <table className="w-full" role="grid">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <Th label="Modell"        sortKey="name"         current={sortKey} direction={sortDir} onClick={onSort} />
          <Th label="Input /Mtok"   sortKey="inputPrice"   current={sortKey} direction={sortDir} onClick={onSort} />
          <Th label="Output /Mtok"  sortKey="outputPrice"  current={sortKey} direction={sortDir} onClick={onSort} />
          <Th label="Kostnad/fråga" sortKey="totalScenario" current={sortKey} direction={sortDir} onClick={onSort} />
          <Th label="Kontextfönster" sortKey="contextWindow" current={sortKey} direction={sortDir} onClick={onSort} />
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Bäst för
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {sorted.map((model, i) => {
          const cost = scenarioCostUsd(model);
          const isCheapest = sortKey === "totalScenario" && sortDir === "asc" && i === 0;
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
                    <p className="font-medium text-gray-900 text-sm">{model.name}</p>
                    <p className="text-xs text-gray-400">
                      {model.provider}
                      {model.category === "open-source" && (
                        <span className="ml-1 text-blue-500">· open source</span>
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
                {formatSek(cost * rate)}
                <span className="block text-xs font-normal text-gray-400">{formatUsd(cost)}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{formatContext(model.contextWindow)}</td>
              <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{model.bestFor}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
