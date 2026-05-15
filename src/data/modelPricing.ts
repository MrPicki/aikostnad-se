// Prices in USD per 1 million tokens.
// Last verified: 2026-05-15 — verify monthly at provider pricing pages.
// Sources: platform.openai.com/pricing, anthropic.com/pricing, ai.google.dev/pricing

export type ModelCategory = "commercial" | "open-source";

export interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPricePerMToken: number;
  outputPricePerMToken: number;
  contextWindow: number;
  category: ModelCategory;
  hostedVia?: string;
  lastUpdated: string;
  bestFor?: string;
}

export const models: ModelPricing[] = [
  // OpenAI
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    inputPricePerMToken: 2.0,
    outputPricePerMToken: 8.0,
    contextWindow: 1_000_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Komplexa uppgifter, kodning",
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 mini",
    provider: "OpenAI",
    inputPricePerMToken: 0.4,
    outputPricePerMToken: 1.6,
    contextWindow: 1_000_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Snabba svar, låg kostnad",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    inputPricePerMToken: 2.5,
    outputPricePerMToken: 10.0,
    contextWindow: 128_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Multimodalt, bild & text",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    inputPricePerMToken: 0.15,
    outputPricePerMToken: 0.6,
    contextWindow: 128_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Kostnadeffektiv, volym",
  },
  // Anthropic
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic",
    inputPricePerMToken: 15.0,
    outputPricePerMToken: 75.0,
    contextWindow: 200_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Avancerad analys, forskning",
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    inputPricePerMToken: 3.0,
    outputPricePerMToken: 15.0,
    contextWindow: 200_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Balans kvalitet/pris",
  },
  {
    id: "claude-haiku-4",
    name: "Claude Haiku 4",
    provider: "Anthropic",
    inputPricePerMToken: 0.8,
    outputPricePerMToken: 4.0,
    contextWindow: 200_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Snabb, kostnadseffektiv",
  },
  // Google
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    inputPricePerMToken: 0.075,
    outputPricePerMToken: 0.3,
    contextWindow: 1_000_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Snabbast, billigast",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    inputPricePerMToken: 1.25,
    outputPricePerMToken: 5.0,
    contextWindow: 2_000_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Enormt kontextfönster",
  },
  // Mistral
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    inputPricePerMToken: 2.0,
    outputPricePerMToken: 6.0,
    contextWindow: 128_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Europeisk AI, GDPR-vänlig",
  },
  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "Mistral AI",
    inputPricePerMToken: 0.1,
    outputPricePerMToken: 0.3,
    contextWindow: 32_000,
    category: "commercial",
    lastUpdated: "2026-05-15",
    bestFor: "Billigaste alternativet",
  },
  // Open source / hosted
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta (via Groq)",
    inputPricePerMToken: 0.59,
    outputPricePerMToken: 0.79,
    contextWindow: 128_000,
    category: "open-source",
    hostedVia: "Groq",
    lastUpdated: "2026-05-15",
    bestFor: "Open source, snabb inferens",
  },
];

export function getModelById(id: string): ModelPricing | undefined {
  return models.find((m) => m.id === id);
}

export const defaultModelId = "gpt-4o-mini";
