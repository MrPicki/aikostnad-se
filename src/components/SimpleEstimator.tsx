import { useState, useCallback } from "react";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { formatSek } from "../utils/calculateCost";
import type { CalcInitialValues } from "./Calculator";
import { GuideCard } from "./GuideCard";

const EXAMPLE_CHIPS: { label: string; prompt: string }[] = [
  {
    label: "Kundsupport-bot",
    prompt:
      "En kundtjänst-chatbot för min webbshop som svarar på ca 300 frågor per dag.",
  },
  {
    label: "Skriva texter",
    prompt:
      "Jag vill använda AI för att skriva produkttexter och nyhetsbrev — ca 20 texter per dag.",
  },
  {
    label: "Analysera dokument",
    prompt:
      "Jag vill analysera och sammanfatta avtal och rapporter — ca 10 dokument per dag.",
  },
  {
    label: "Intern AI-assistent",
    prompt:
      "Vår personal på 15 personer ska kunna fråga en intern AI-assistent dagligen.",
  },
];

// Mirrors EstimateCostResult from api/estimate-cost.ts (kept separate to avoid
// pulling the edge-runtime file into the Vite compilation)
export interface EstimateResult {
  scenarioTitle: string;
  summary: string;
  modelId: string;
  modelName: string;
  modelReason: string;
  cheapAlternativeId: string;
  cheapAlternativeName: string;
  balancedAlternativeId: string;
  balancedAlternativeName: string;
  premiumAlternativeId: string;
  premiumAlternativeName: string;
  monthlyCostUsdCheap: number;
  monthlyCostUsdRecommended: number;
  monthlyCostUsdPremium: number;
  assumptions: {
    requestsPerDay: number;
    users: number;
    inputWords: number;
    outputWords: number;
    daysPerMonth: number;
  };
  confidence: "low" | "medium" | "high";
  warning: string;
}

interface Props {
  onUseInCalculator: (values: CalcInitialValues) => void;
}

export function SimpleEstimator({ onUseInCalculator }: Props) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "error">("idle");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { rate } = useExchangeRate();

  const handleSubmit = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/estimate-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as EstimateResult;
      setResult(data);
      setStatus("result");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Kunde inte göra uppskattningen just nu. Testa igen eller använd Räkna manuellt."
      );
    }
  }, [text]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
  }

  const sek = (usd: number) => formatSek(usd * rate);

  return (
    <section aria-label="Enkel AI-kostnadsestimering">
      {(status === "idle" || status === "error") && (
        <div className="max-w-2xl mx-auto">
          <label htmlFor="estimate-input" className="block text-sm font-semibold text-gray-700 mb-2 text-center">
            Vad skulle du vilja använda AI till?
          </label>

          {/* Quick-start chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setText(chip.prompt)}
                className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 rounded-full transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              id="estimate-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="…eller skriv själv — t.ex. &ldquo;En chatbot för min webbshop som svarar på 500 kundfrågor per dag.&rdquo;"
              className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white px-5 pt-5 pb-16 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              rows={5}
              maxLength={800}
            />
            <div className="absolute bottom-3 left-5 right-3 flex items-center justify-between">
              <p className="text-xs text-gray-400">{text.length}/800</p>
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Beräkna →
              </button>
            </div>
          </div>
          {status === "error" && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 mt-3">
              {errorMsg}
            </p>
          )}
          <p className="text-xs text-gray-400 text-center mt-3">
            Ctrl+Enter för att skicka · Gratis · Ingen inloggning krävs
          </p>
        </div>
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500 max-w-2xl mx-auto">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-gray-700">Analyserar din idé…</p>
          <p className="text-xs text-gray-400 mt-1">Brukar ta 3–5 sekunder</p>
        </div>
      )}

      {status === "result" && result && (
        <div className="card">
          <EstimateResultView
            result={result}
            sek={sek}
            onReset={handleReset}
            onUseInCalculator={onUseInCalculator}
          />
        </div>
      )}
    </section>
  );
}

interface ResultProps {
  result: EstimateResult;
  sek: (usd: number) => string;
  onReset: () => void;
  onUseInCalculator: (values: CalcInitialValues) => void;
}

function EstimateResultView({ result, sek, onReset, onUseInCalculator }: ResultProps) {
  const { assumptions } = result;

  const confidenceMap = {
    high:   { label: "Hög träffsäkerhet",  cls: "text-green-600 bg-green-50" },
    medium: { label: "Medel träffsäkerhet", cls: "text-amber-700 bg-amber-50" },
    low:    { label: "Låg träffsäkerhet",   cls: "text-red-600 bg-red-50" },
  };
  const conf = confidenceMap[result.confidence] ?? confidenceMap.medium;

  function handleUseInCalc() {
    onUseInCalculator({
      modelId:               result.modelId,
      wordsPerRequest:       assumptions.inputWords,
      outputWordsPerRequest: assumptions.outputWords,
      requestsPerDay:        assumptions.requestsPerDay,
      users:                 assumptions.users,
      daysPerMonth:          assumptions.daysPerMonth,
    });
  }

  const lowEqHigh =
    result.monthlyCostUsdCheap.toFixed(4) === result.monthlyCostUsdPremium.toFixed(4);

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5">
            {result.scenarioTitle}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{result.summary}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-lg shrink-0 ${conf.cls}`}>
          {conf.label}
        </span>
      </div>

      {/* Cost range */}
      <div className="bg-indigo-600 rounded-xl p-5 text-white">
        <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wide mb-2">
          Grovt uppskattad kostnad
        </p>
        {lowEqHigh ? (
          <p className="text-3xl font-extrabold mb-1">
            ca {sek(result.monthlyCostUsdRecommended)}/mån
          </p>
        ) : (
          <p className="text-3xl font-extrabold mb-1">
            {sek(result.monthlyCostUsdCheap)}–{sek(result.monthlyCostUsdPremium)}/mån
          </p>
        )}
        <p className="text-sm text-indigo-200">
          Med {result.modelName}: ca {sek(result.monthlyCostUsdRecommended)}/mån
        </p>
      </div>

      {/* Recommended model */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          Rekommenderad modell
        </p>
        <p className="font-semibold text-gray-900 text-sm">{result.modelName}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{result.modelReason}</p>
      </div>

      {/* Assumptions */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Antaganden
        </p>
        <ul className="space-y-1.5 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-gray-300 mt-0.5">→</span>
            <span>
              {assumptions.requestsPerDay.toLocaleString("sv-SE")} frågor/dag
              {assumptions.users > 1 && ` · ${assumptions.users} användare`}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-300 mt-0.5">→</span>
            <span>
              {assumptions.inputWords} ord/fråga · {assumptions.outputWords} ord/svar
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-300 mt-0.5">→</span>
            <span>
              {assumptions.daysPerMonth} aktiva dagar/mån · 1,3 tokens/ord (svenska)
            </span>
          </li>
        </ul>
      </div>

      {/* Alternatives */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Alternativa modeller
        </p>
        <div className="grid grid-cols-3 gap-2">
          <AltCard
            tier="Billigast"
            name={result.cheapAlternativeName}
            cost={sek(result.monthlyCostUsdCheap)}
            variant="green"
          />
          <AltCard
            tier="Balanserad"
            name={result.balancedAlternativeName}
            cost={sek(result.monthlyCostUsdRecommended)}
            variant="indigo"
            highlight
          />
          <AltCard
            tier="Premium"
            name={result.premiumAlternativeName}
            cost={sek(result.monthlyCostUsdPremium)}
            variant="purple"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button onClick={handleUseInCalc} className="btn-primary flex-1 text-sm text-center">
          Visa detaljerad kalkyl →
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Beskriv annat scenario
        </button>
      </div>

      <GuideCard
        modelId={result.modelId}
        modelName={result.modelName}
        source="estimator"
      />

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
        ⚠ {result.warning}
      </p>
    </div>
  );
}

interface AltCardProps {
  tier: string;
  name: string;
  cost: string;
  variant: "green" | "indigo" | "purple";
  highlight?: boolean;
}

function AltCard({ tier, name, cost, variant, highlight }: AltCardProps) {
  const cls = {
    green:  "bg-green-50  border-green-100  text-green-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    purple: "bg-purple-50 border-purple-100 text-purple-800",
  }[variant];

  return (
    <div
      className={`rounded-xl border p-3 text-center ${cls} ${highlight ? "ring-1 ring-indigo-400" : ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-60">{tier}</p>
      <p className="text-xs font-medium leading-tight mb-1.5">{name}</p>
      <p className="text-sm font-bold">{cost}</p>
      <p className="text-xs opacity-50">/mån</p>
    </div>
  );
}
