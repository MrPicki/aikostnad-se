import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { models, defaultModelId } from "../data/modelPricing";
import { siteConfig } from "../config/siteConfig";
import {
  calculateCost,
  formatUsd,
  humanSek,
  validateInputs,
} from "../utils/calculateCost";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { GuideCard } from "./GuideCard";

const DEFAULTS = {
  wordsPerRequest: 100,
  outputWordsPerRequest: 200,
  requestsPerDay: 50,
  users: 1,
  daysPerMonth: 22,
} as const;

function clampInt(raw: string | null, fallback: number, min: number, max: number): number {
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < min || n > max) return fallback;
  return n;
}

function readModelIdFromUrl(params: URLSearchParams): string {
  const m = params.get("model");
  return m && models.some((x) => x.id === m) ? m : defaultModelId;
}

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
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial state: URL params win over defaults. Read once at first render.
  const [modelId, setModelId] = useState(() => readModelIdFromUrl(searchParams));
  const [wordsPerRequest, setWordsPerRequest] = useState(() =>
    clampInt(searchParams.get("input"), DEFAULTS.wordsPerRequest, 1, 100_000)
  );
  const [outputWordsPerRequest, setOutputWordsPerRequest] = useState(() =>
    clampInt(searchParams.get("output"), DEFAULTS.outputWordsPerRequest, 1, 100_000)
  );
  const [requestsPerDay, setRequestsPerDay] = useState(() =>
    clampInt(searchParams.get("req"), DEFAULTS.requestsPerDay, 1, 1_000_000)
  );
  const [users, setUsers] = useState(() =>
    clampInt(searchParams.get("users"), DEFAULTS.users, 1, 10_000_000)
  );
  const [daysPerMonth, setDaysPerMonth] = useState(() =>
    clampInt(searchParams.get("days"), DEFAULTS.daysPerMonth, 1, 31)
  );

  // Hero-click values override current state (later user intent wins).
  useEffect(() => {
    if (!initialValues) return;
    if (initialValues.wordsPerRequest !== undefined) setWordsPerRequest(initialValues.wordsPerRequest);
    if (initialValues.outputWordsPerRequest !== undefined) setOutputWordsPerRequest(initialValues.outputWordsPerRequest);
    if (initialValues.requestsPerDay !== undefined) setRequestsPerDay(initialValues.requestsPerDay);
    if (initialValues.users !== undefined) setUsers(initialValues.users);
    if (initialValues.daysPerMonth !== undefined) setDaysPerMonth(initialValues.daysPerMonth);
    if (initialValues.modelId !== undefined) setModelId(initialValues.modelId);
  }, [initialValues]);

  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (insecure context, old browser) — ignore
    }
  }

  // Sync URL: only include non-default values to keep links short.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const next = new URLSearchParams();
    if (modelId !== defaultModelId) next.set("model", modelId);
    if (wordsPerRequest !== DEFAULTS.wordsPerRequest) next.set("input", String(wordsPerRequest));
    if (outputWordsPerRequest !== DEFAULTS.outputWordsPerRequest) next.set("output", String(outputWordsPerRequest));
    if (requestsPerDay !== DEFAULTS.requestsPerDay) next.set("req", String(requestsPerDay));
    if (users !== DEFAULTS.users) next.set("users", String(users));
    if (daysPerMonth !== DEFAULTS.daysPerMonth) next.set("days", String(daysPerMonth));
    setSearchParams(next, { replace: true });
  }, [modelId, wordsPerRequest, outputWordsPerRequest, requestsPerDay, users, daysPerMonth, setSearchParams]);

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
      {/* Info banners */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 flex-1">
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
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 flex-1">
          <span className="text-blue-400">●</span>
          <span>
            Priser synkade {selectedModel.lastUpdated} · Manuellt verifierade
          </span>
        </div>
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
              <h2 className="text-lg font-semibold text-gray-900 text-center">
                Beräknad kostnad
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Total kostnad / år"
                  sek={result.yearlyCostSek}
                  highlight
                />
                <ResultCard
                  label="Per månad"
                  sek={result.monthlyCostSek}
                />
                <ResultCard
                  label="Per dag"
                  sek={result.dailyCostSek}
                />
                <ResultCard
                  label="Per fråga"
                  sek={result.costPerRequestSek}
                />
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowTokenDetails((v) => !v)}
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors"
                >
                  <span>{showTokenDetails ? "▲" : "▼"}</span>
                  {showTokenDetails ? "Dölj tokendetaljer" : "Visa tokendetaljer"}
                </button>
                {showTokenDetails && (
                  <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Input-tokens/mån</span>
                      <span>{result.monthlyInputTokens.toLocaleString("sv-SE")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Output-tokens/mån</span>
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
                )}
              </div>

              <p className="text-xs text-gray-400">
                * Baserat på {users} användare × {requestsPerDay} frågor/dag ×{" "}
                {daysPerMonth} dagar. Priser i USD konverterade till SEK med
                kursen 1 USD = {rate.toFixed(2)} SEK.
              </p>

              <GuideCard
                modelId={modelId}
                modelName={selectedModel?.name}
                source="calculator"
                className="mt-2"
              />

              <button
                onClick={copyShareLink}
                className="text-xs text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 mt-1 focus:outline-none focus:underline"
                aria-label="Kopiera länk till denna kalkyl"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Länk kopierad
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    Kopiera länk till denna kalkyl
                  </>
                )}
              </button>
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
  highlight?: boolean;
}

function ResultCard({ label, sek, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl p-3 sm:p-4 min-w-0 ${highlight ? "bg-indigo-600 text-white" : "bg-gray-50"}`}
    >
      <p
        className={`text-xs font-medium mb-1 truncate ${highlight ? "text-indigo-200" : "text-gray-500"}`}
      >
        {label}
      </p>
      <p
        className={`text-lg sm:text-xl font-bold break-words ${highlight ? "text-white" : "text-gray-900"}`}
      >
        {humanSek(sek)}
      </p>
    </div>
  );
}
