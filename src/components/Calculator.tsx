import { useState, useMemo, useEffect } from "react";
import { models, defaultModelId } from "../data/modelPricing";
import { siteConfig } from "../config/siteConfig";
import {
  calculateCost,
  formatSek,
  formatUsd,
  validateInputs,
} from "../utils/calculateCost";
import { useExchangeRate } from "../hooks/useExchangeRate";

interface FieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (v: number) => void;
  error?: string;
  min?: number;
  max?: number;
  tooltip?: string;
}

function NumberField({
  label,
  id,
  value,
  onChange,
  error,
  min = 1,
  max,
  tooltip,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {tooltip && (
          <span
            className="ml-1 text-gray-400 cursor-help"
            title={tooltip}
            aria-label={tooltip}
          >
            ⓘ
          </span>
        )}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`input-field ${error ? "border-red-400 focus:ring-red-400" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export interface CalcInitialValues {
  wordsPerRequest?: number;
  outputWordsPerRequest?: number;
  requestsPerDay?: number;
  users?: number;
  daysPerMonth?: number;
  modelId?: string;
}

export function Calculator({ initialValues }: { initialValues?: CalcInitialValues } = {}) {
  const { rate, date, loading, error: rateError } = useExchangeRate();

  const [modelId, setModelId] = useState(defaultModelId);
  const [wordsPerRequest, setWordsPerRequest] = useState(100);
  const [outputWordsPerRequest, setOutputWordsPerRequest] = useState(200);
  const [requestsPerDay, setRequestsPerDay] = useState(50);
  const [users, setUsers] = useState(1);
  const [daysPerMonth, setDaysPerMonth] = useState(22);

  useEffect(() => {
    if (!initialValues) return;
    if (initialValues.wordsPerRequest !== undefined) setWordsPerRequest(initialValues.wordsPerRequest);
    if (initialValues.outputWordsPerRequest !== undefined) setOutputWordsPerRequest(initialValues.outputWordsPerRequest);
    if (initialValues.requestsPerDay !== undefined) setRequestsPerDay(initialValues.requestsPerDay);
    if (initialValues.users !== undefined) setUsers(initialValues.users);
    if (initialValues.daysPerMonth !== undefined) setDaysPerMonth(initialValues.daysPerMonth);
    if (initialValues.modelId !== undefined) setModelId(initialValues.modelId);
  }, [initialValues]);

  const errors = useMemo(
    () =>
      validateInputs({
        wordsPerRequest,
        outputWordsPerRequest,
        requestsPerDay,
        users,
        daysPerMonth,
      }),
    [wordsPerRequest, outputWordsPerRequest, requestsPerDay, users, daysPerMonth]
  );

  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];

  const result = useMemo(() => {
    if (Object.keys(errors).length > 0) return null;
    return calculateCost({
      model: selectedModel,
      wordsPerRequest,
      outputWordsPerRequest,
      requestsPerDay,
      users,
      daysPerMonth,
      languageFactor: siteConfig.languageFactor,
      usdToSekRate: rate,
    });
  }, [
    selectedModel,
    wordsPerRequest,
    outputWordsPerRequest,
    requestsPerDay,
    users,
    daysPerMonth,
    rate,
    errors,
  ]);

  const commercialModels = models.filter((m) => m.category === "commercial");
  const openSourceModels = models.filter((m) => m.category === "open-source");

  return (
    <section className="card" aria-label="AI-kostnadskalkylator">
      {/* Exchange rate banner */}
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
        <span className="text-green-500">●</span>
        {loading ? (
          <span>Hämtar valutakurs…</span>
        ) : rateError ? (
          <span>
            Valutakurs: 1 USD = {rate.toFixed(2)} SEK (fallback — live-hämtning
            misslyckades)
          </span>
        ) : (
          <span>
            1 USD = {rate.toFixed(2)} SEK
            {date && ` · Kurs hämtad ${date}`}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input form */}
        <div className="space-y-5">
          {/* Model selector */}
          <div>
            <label htmlFor="model" className="label">
              AI-modell
            </label>
            <select
              id="model"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="input-field"
            >
              <optgroup label="Kommersiella API:er">
                {commercialModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Open source / hosted">
                {openSourceModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </optgroup>
            </select>
            {selectedModel && (
              <p className="mt-1 text-xs text-gray-400">
                ${selectedModel.inputPricePerMToken}/Mtok in ·{" "}
                ${selectedModel.outputPricePerMToken}/Mtok out ·{" "}
                {selectedModel.bestFor}
              </p>
            )}
          </div>

          <NumberField
            label="Ord per fråga (input)"
            id="wordsPerRequest"
            value={wordsPerRequest}
            onChange={setWordsPerRequest}
            error={errors.wordsPerRequest}
            tooltip={`Svenska texter räknas med ${siteConfig.languageFactor} tokens/ord (p.g.a. å/ä/ö)`}
          />
          <NumberField
            label="Ord per svar (output)"
            id="outputWordsPerRequest"
            value={outputWordsPerRequest}
            onChange={setOutputWordsPerRequest}
            error={errors.outputWordsPerRequest}
          />
          <NumberField
            label="Antal förfrågningar per dag"
            id="requestsPerDay"
            value={requestsPerDay}
            onChange={setRequestsPerDay}
            error={errors.requestsPerDay}
          />
          <NumberField
            label="Antal användare"
            id="users"
            value={users}
            onChange={setUsers}
            error={errors.users}
          />
          <NumberField
            label="Dagar per månad"
            id="daysPerMonth"
            value={daysPerMonth}
            onChange={setDaysPerMonth}
            error={errors.daysPerMonth}
            max={31}
          />

          <div className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2">
            Tokenuppskattning: {siteConfig.languageFactor} tokens/ord för svenska
            texter (engelska: 0.75)
          </div>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Beräknad kostnad
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Per fråga"
                  sek={result.costPerRequestSek}
                  usd={result.costPerRequestUsd}
                  highlight
                />
                <ResultCard
                  label="Per dag"
                  sek={result.dailyCostSek}
                  usd={result.dailyCostUsd}
                />
                <ResultCard
                  label="Per månad"
                  sek={result.monthlyCostSek}
                  usd={result.monthlyCostUsd}
                />
                <ResultCard
                  label="Per år"
                  sek={result.yearlyCostSek}
                  usd={result.yearlyCostUsd}
                />
              </div>

              <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                <h3 className="font-medium text-gray-700 text-xs uppercase tracking-wide">
                  Tokendetaljer / månad
                </h3>
                <div className="flex justify-between text-gray-600">
                  <span>Input-tokens</span>
                  <span>{result.monthlyInputTokens.toLocaleString("sv-SE")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Output-tokens</span>
                  <span>{result.monthlyOutputTokens.toLocaleString("sv-SE")}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-gray-600">
                  <span>Input-kostnad</span>
                  <span>{formatUsd(result.inputCostUsd)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Output-kostnad</span>
                  <span>{formatUsd(result.outputCostUsd)}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-800">
                  <span>Tokens per fråga</span>
                  <span>
                    {result.inputTokensPerRequest} in +{" "}
                    {result.outputTokensPerRequest} out
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                * Baserat på {users} användare × {requestsPerDay} frågor/dag ×{" "}
                {daysPerMonth} dagar. Priser i USD konverterade till SEK med
                kursen 1 USD = {rate.toFixed(2)} SEK.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-40 text-gray-400 text-sm">
              Fyll i formuläret för att se kostnaden
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ResultCardProps {
  label: string;
  sek: number;
  usd: number;
  highlight?: boolean;
}

function ResultCard({ label, sek, usd, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl p-4 ${highlight ? "bg-indigo-600 text-white" : "bg-gray-50"}`}
    >
      <p
        className={`text-xs font-medium mb-1 ${highlight ? "text-indigo-200" : "text-gray-500"}`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}
      >
        {formatSek(sek)}
      </p>
      <p className={`text-xs ${highlight ? "text-indigo-200" : "text-gray-400"}`}>
        {formatUsd(usd)}
      </p>
    </div>
  );
}
