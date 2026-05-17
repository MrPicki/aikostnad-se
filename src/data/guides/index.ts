import type { Guide } from "./types";
import { openaiGuide } from "./openai";
import { anthropicGuide } from "./anthropic";
import { googleGuide } from "./google";
import { mistralGuide } from "./mistral";
import { deepseekGuide } from "./deepseek";

export const guides: Record<Guide["providerId"], Guide> = {
  openai: openaiGuide,
  anthropic: anthropicGuide,
  google: googleGuide,
  mistral: mistralGuide,
  deepseek: deepseekGuide,
};

export const MODEL_TO_PROVIDER: Record<string, Guide["providerId"]> = {
  "gpt-4o": "openai",
  "gpt-4o-mini": "openai",
  "gpt-4.1": "openai",
  "gpt-4.1-mini": "openai",
  "claude-sonnet-4-6": "anthropic",
  "claude-opus-4-7": "anthropic",
  "claude-haiku-4-5": "anthropic",
  "gemini-2.5-flash": "google",
  "gemini-2.5-pro": "google",
  "mistral-small": "mistral",
  "mistral-large": "mistral",
  "deepseek-v3.2": "deepseek",
  "deepseek-v3": "deepseek",
  "deepseek-r1": "deepseek",
  // Llama via Groq uses an OpenAI-compatible API — point to OpenAI guide as
  // closest practical match so estimator results always show the GuideCard.
  "llama-3.3-70b": "openai",
};

// Always returns a guide so the GuideCard / email capture is never silently
// hidden. Unknown modelIds fall back to the OpenAI guide (most general).
export function getGuideForModel(modelId: string): Guide {
  const providerId = MODEL_TO_PROVIDER[modelId] ?? "openai";
  return guides[providerId];
}

export type { Guide, GuideStep, GuideResource } from "./types";
