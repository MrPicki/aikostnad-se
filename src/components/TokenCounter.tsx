import { useState, useMemo } from "react";
import { models, defaultModelId } from "../data/modelPricing";
import { siteConfig } from "../config/siteConfig";
import { estimateTokens, formatSek, formatUsd } from "../utils/calculateCost";
import { useExchangeRate } from "../hooks/useExchangeRate";

interface TokenCounterProps {
  compact?: boolean;
}

export function TokenCounter({ compact = false }: TokenCounterProps) {
  const [text, setText] = useState("");
  const [modelId, setModelId] = useState(defaultModelId);
  const { rate } = useExchangeRate();

  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];

  const stats = useMemo(() => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const tokens = estimateTokens(text, siteConfig.languageFactor);
    const inputCostUsd = (tokens / 1_000_000) * selectedModel.inputPricePerMToken;
    const outputCostUsd =
      (tokens / 1_000_000) * selectedModel.outputPricePerMToken;
    return { wordCount, tokens, inputCostUsd, outputCostUsd };
  }, [text, selectedModel]);

  return (
    <div className={compact ? "" : "card"}>
      {!compact && (
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tokenräknare</h2>
      )}
      <p className="text-sm text-gray-500 mb-4">
        Klistra in din text nedan för att se hur många tokens den är värd och
        vad det kostar. Använder {siteConfig.languageFactor} tokens/ord för
        svenska texter.
      </p>

      <textarea
        className="input-field resize-none mb-4"
        rows={6}
        placeholder="Klistra in din prompt eller text här…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Text att räkna tokens för"
      />

      <div className="mb-4">
        <label htmlFor="tc-model" className="label">
          AI-modell (för prisberäkning)
        </label>
        <select
          id="tc-model"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="input-field"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {text.trim().length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox label="Ord" value={stats.wordCount.toLocaleString("sv-SE")} />
          <StatBox
            label="Tokens (est.)"
            value={stats.tokens.toLocaleString("sv-SE")}
            highlight
          />
          <StatBox
            label="Kostnad (input)"
            value={formatSek(stats.inputCostUsd * rate)}
            sub={formatUsd(stats.inputCostUsd)}
          />
          <StatBox
            label="Kostnad (output)"
            value={formatSek(stats.outputCostUsd * rate)}
            sub={formatUsd(stats.outputCostUsd)}
          />
        </div>
      )}
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

function StatBox({ label, value, sub, highlight }: StatBoxProps) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${highlight ? "bg-indigo-50 border border-indigo-100" : "bg-gray-50"}`}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p
        className={`text-lg font-bold ${highlight ? "text-indigo-700" : "text-gray-900"}`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}
