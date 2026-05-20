// Shared source citations used by the Sources component across pages.
// Linking out to authoritative primary sources strengthens E-E-A-T signals
// — Google rewards pages that cite their data instead of just asserting it.

export interface SourceItem {
  title: string;
  url: string;
  publisher?: string;
}

export const officialPricingSources: SourceItem[] = [
  {
    title: "OpenAI API Pricing",
    url: "https://openai.com/api/pricing/",
    publisher: "OpenAI (officiell prislista)",
  },
  {
    title: "Anthropic Claude Pricing",
    url: "https://www.anthropic.com/pricing",
    publisher: "Anthropic (officiell prislista)",
  },
  {
    title: "Google Gemini API Pricing",
    url: "https://ai.google.dev/pricing",
    publisher: "Google (officiell prislista)",
  },
  {
    title: "ChatGPT Plans (Free, Plus, Pro, Business, Enterprise)",
    url: "https://openai.com/chatgpt/pricing/",
    publisher: "OpenAI (officiell abonnemangsida)",
  },
];

export const claudeSources: SourceItem[] = [
  {
    title: "Anthropic Claude API priser per modell",
    url: "https://www.anthropic.com/pricing",
    publisher: "Anthropic",
  },
  {
    title: "Claude.ai abonnemangsplaner (Pro, Team, Enterprise)",
    url: "https://www.anthropic.com/pricing#anthropic-claude",
    publisher: "Anthropic",
  },
  {
    title: "Prompt caching documentation",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
    publisher: "Anthropic docs",
  },
];

export const openAISources: SourceItem[] = [
  {
    title: "OpenAI API priser per modell (GPT-4o, GPT-4o mini, o3)",
    url: "https://openai.com/api/pricing/",
    publisher: "OpenAI",
  },
  {
    title: "ChatGPT Plans (Plus 20 dollar/mån, Pro 200 dollar/mån)",
    url: "https://openai.com/chatgpt/pricing/",
    publisher: "OpenAI",
  },
  {
    title: "Tokenization explained",
    url: "https://platform.openai.com/tokenizer",
    publisher: "OpenAI Platform",
  },
];

export const geminiSources: SourceItem[] = [
  {
    title: "Google Gemini API priser (Pro, Flash, Flash-Lite)",
    url: "https://ai.google.dev/pricing",
    publisher: "Google AI for Developers",
  },
  {
    title: "Google One AI Premium (Gemini Advanced)",
    url: "https://one.google.com/about/ai-premium/",
    publisher: "Google One",
  },
];

export const exchangeRateSource: SourceItem = {
  title: "SEK/USD valutakurs (live)",
  url: "https://www.frankfurter.app/",
  publisher: "Frankfurter API · ECB-data",
};
