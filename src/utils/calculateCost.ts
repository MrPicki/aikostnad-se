import { type ModelPricing } from "../data/modelPricing";

export interface CalculatorInputs {
  model: ModelPricing;
  wordsPerRequest: number;
  outputWordsPerRequest: number;
  requestsPerDay: number;
  users: number;
  daysPerMonth: number;
  languageFactor: number;
  usdToSekRate: number;
}

export interface CalculationResult {
  inputTokensPerRequest: number;
  outputTokensPerRequest: number;
  monthlyInputTokens: number;
  monthlyOutputTokens: number;
  costPerRequestUsd: number;
  costPerRequestSek: number;
  dailyCostUsd: number;
  dailyCostSek: number;
  monthlyCostUsd: number;
  monthlyCostSek: number;
  yearlyCostUsd: number;
  yearlyCostSek: number;
  inputCostUsd: number;
  outputCostUsd: number;
}

export function calculateCost(inputs: CalculatorInputs): CalculationResult {
  const {
    model,
    wordsPerRequest,
    outputWordsPerRequest,
    requestsPerDay,
    users,
    daysPerMonth,
    languageFactor,
    usdToSekRate,
  } = inputs;

  const inputTokensPerRequest = Math.ceil(wordsPerRequest * languageFactor);
  const outputTokensPerRequest = Math.ceil(
    outputWordsPerRequest * languageFactor
  );

  const totalRequests = requestsPerDay * users * daysPerMonth;
  const monthlyInputTokens = inputTokensPerRequest * totalRequests;
  const monthlyOutputTokens = outputTokensPerRequest * totalRequests;

  const inputCostUsd =
    (monthlyInputTokens / 1_000_000) * model.inputPricePerMToken;
  const outputCostUsd =
    (monthlyOutputTokens / 1_000_000) * model.outputPricePerMToken;
  const monthlyCostUsd = inputCostUsd + outputCostUsd;

  const requestsPerDayTotal = requestsPerDay * users;
  const dailyInputTokens = inputTokensPerRequest * requestsPerDayTotal;
  const dailyOutputTokens = outputTokensPerRequest * requestsPerDayTotal;
  const dailyCostUsd =
    (dailyInputTokens / 1_000_000) * model.inputPricePerMToken +
    (dailyOutputTokens / 1_000_000) * model.outputPricePerMToken;

  const costPerRequestUsd =
    (inputTokensPerRequest / 1_000_000) * model.inputPricePerMToken +
    (outputTokensPerRequest / 1_000_000) * model.outputPricePerMToken;

  return {
    inputTokensPerRequest,
    outputTokensPerRequest,
    monthlyInputTokens,
    monthlyOutputTokens,
    costPerRequestUsd,
    costPerRequestSek: costPerRequestUsd * usdToSekRate,
    dailyCostUsd,
    dailyCostSek: dailyCostUsd * usdToSekRate,
    monthlyCostUsd,
    monthlyCostSek: monthlyCostUsd * usdToSekRate,
    yearlyCostUsd: monthlyCostUsd * 12,
    yearlyCostSek: monthlyCostUsd * 12 * usdToSekRate,
    inputCostUsd,
    outputCostUsd,
  };
}

export function humanSek(sek: number): string {
  if (sek < 0.01) return "< 1 öre";
  if (sek < 1) return `${Math.round(sek * 100)} öre`;
  return formatSek(Math.round(sek));
}

export function formatSek(amount: number): string {
  if (amount < 0.01) {
    return `${(amount * 100).toFixed(4)} öre`;
  }
  if (amount < 1) {
    return `${amount.toFixed(2)} kr`;
  }
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: amount >= 100 ? 0 : 2,
  }).format(amount);
}

export function formatUsd(amount: number): string {
  if (amount < 0.001) {
    return `$${amount.toFixed(6)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount >= 10 ? 2 : 4,
  }).format(amount);
}

export function estimateTokens(text: string, languageFactor: number): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words * languageFactor);
}

export function validateInputs(
  values: Record<string, number>
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (values.wordsPerRequest <= 0 || values.wordsPerRequest > 100_000) {
    errors.wordsPerRequest = "Ange ett värde mellan 1 och 100 000 ord";
  }
  if (values.outputWordsPerRequest <= 0 || values.outputWordsPerRequest > 100_000) {
    errors.outputWordsPerRequest = "Ange ett värde mellan 1 och 100 000 ord";
  }
  if (values.requestsPerDay <= 0 || values.requestsPerDay > 1_000_000) {
    errors.requestsPerDay = "Ange ett värde mellan 1 och 1 000 000";
  }
  if (values.users <= 0 || values.users > 10_000_000) {
    errors.users = "Ange ett värde mellan 1 och 10 000 000";
  }
  if (values.daysPerMonth <= 0 || values.daysPerMonth > 31) {
    errors.daysPerMonth = "Ange ett värde mellan 1 och 31";
  }

  return errors;
}
