// Per-page related-article configuration for internal cross-linking.
// Each page lists 3–5 reciprocal links to related pages with varied anchor
// text — distributes PageRank and helps Google understand topic clusters.

interface RelatedLink {
  to: string;
  title: string;
  description: string;
}

export const relatedArticles: Record<string, RelatedLink[]> = {
  "vad-kostar-ai": [
    { to: "/vad-kostar-chatgpt", title: "Räkna på ChatGPT API i SEK", description: "GPT-4o per token, månadskostnad för svenska scenarion." },
    { to: "/claude-pris", title: "Claude Sonnet och Haiku — vad kostar de?", description: "Anthropic-modeller per token + jämförelse mot ChatGPT." },
    { to: "/billigaste-ai", title: "Vilken AI är billigast just nu?", description: "Jämför mini-modellerna från OpenAI, Anthropic, Google och DeepSeek." },
    { to: "/ai-for-foretag", title: "AI för företag — kostnader och verktyg", description: "Vad kostar AI per anställd? Räkneexempel i SEK." },
  ],
  "vad-kostar-chatgpt": [
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Översikt över alla AI-leverantörer och abonnemang." },
    { to: "/chatgpt-vs-claude", title: "Jämför GPT-4o mot Claude Sonnet", description: "Pris och prestanda head-to-head." },
    { to: "/gpt-4-pris", title: "GPT-4.1 — vad kostar nya flaggskeppet?", description: "Jämför GPT-4.1 med GPT-4o och GPT-4o mini." },
    { to: "/ai-chatbot-kostnad", title: "Bygga AI-chatbot — komplett budgetguide", description: "Hobby, småföretag och B2C — konkreta SEK-belopp." },
  ],
  "claude-pris": [
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Översikt över alla AI-leverantörer i SEK." },
    { to: "/chatgpt-vs-claude", title: "Claude vs ChatGPT — jämförelse", description: "Vilken modell passar svenska företag?" },
    { to: "/prompt-caching", title: "Prompt caching — halvera Claude-notan", description: "Anthropics 90 %-rabatt på cachad input." },
    { to: "/vad-kostar-chatgpt", title: "Räkna på ChatGPT API i SEK", description: "GPT-4o kostnad — jämför med Claude." },
  ],
  "gpt-4-pris": [
    { to: "/vad-kostar-chatgpt", title: "ChatGPT API-kostnad förklarad", description: "GPT-4o detaljer + månadsexempel i SEK." },
    { to: "/chatgpt-vs-claude", title: "Claude eller ChatGPT — jämförelse", description: "Pris och prestanda head-to-head." },
    { to: "/prompt-caching", title: "Sänk GPT-4 notan med caching", description: "OpenAI's automatiska prompt caching förklarad." },
    { to: "/billigaste-ai", title: "Billigaste AI-modellen just nu", description: "Jämför mini-modeller från alla leverantörer." },
  ],
  "billigaste-ai": [
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Översikt över alla AI-leverantörer i SEK." },
    { to: "/vad-kostar-chatgpt", title: "GPT-4o mini — räkna på din volym", description: "Mest populära billig-modellen." },
    { to: "/gemini-pris", title: "Gemini Flash — Googles billiga modell", description: "Gemini 2.5 Flash-priser i SEK." },
    { to: "/gratis-ai", title: "Gratis AI — hur långt räcker det?", description: "Gratisversioner av ChatGPT, Claude och Gemini." },
  ],
  "chatgpt-vs-claude": [
    { to: "/vad-kostar-chatgpt", title: "ChatGPT API-kostnad förklarad", description: "GPT-4o detaljer + månadsexempel i SEK." },
    { to: "/claude-pris", title: "Claude Sonnet och Haiku — kostnader", description: "Anthropic-modeller per token." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Översikt över alla AI-leverantörer." },
    { to: "/prompt-caching", title: "Prompt caching — Claudes hemliga vinst", description: "Hur Anthropic ger 90 % rabatt på cachad input." },
  ],
  "ai-chatbot-kostnad": [
    { to: "/billigaste-ai", title: "Vilken modell är billigast för chatbot?", description: "Jämför GPT-4o mini, Claude Haiku, Gemini Flash." },
    { to: "/prompt-caching", title: "Halvera chatbot-notan med caching", description: "Lång system-prompt? Cache den." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-leverantörer + abonnemang i SEK." },
    { to: "/chatgpt-vs-claude", title: "Vilken modell ska du välja?", description: "ChatGPT vs Claude — kvalitet och pris." },
  ],
  "prompt-caching": [
    { to: "/claude-pris", title: "Claude Sonnet och Haiku — kostnader", description: "Anthropic — bäst stöd för prompt caching." },
    { to: "/gpt-4-pris", title: "GPT-4.1 — automatisk prompt caching", description: "OpenAI's caching räcker för många use cases." },
    { to: "/chatgpt-vs-claude", title: "ChatGPT eller Claude för caching?", description: "Vilken leverantör är billigast med cache?" },
    { to: "/ai-chatbot-kostnad", title: "Chatbot-kostnad förklarad", description: "Bygg en bot för 20–5 000 kr/månad." },
  ],
  "gemini-pris": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT API?", description: "GPT-4o vs Gemini Flash — jämför per token." },
    { to: "/claude-pris", title: "Claude vs Gemini — prisguide", description: "Anthropic-modeller i SEK + jämförelse." },
    { to: "/billigaste-ai", title: "Vilken AI är billigast totalt?", description: "Gemini Flash vs GPT-4o mini vs Mistral Small." },
    { to: "/gratis-ai", title: "Gratis AI 2026 — Gemini gratis tier", description: "Google AI Studio ger 1 500 gratis req/dag." },
  ],
  "ai-for-foretag": [
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-leverantörer och abonnemang i SEK." },
    { to: "/ai-chatbot-kostnad", title: "Vad kostar en AI-chatbot?", description: "Konkreta budgetexempel för hobby, SME och B2C." },
    { to: "/chatgpt-vs-claude", title: "ChatGPT eller Claude för företag?", description: "Pris, svenska, GDPR — vilken passar er?" },
    { to: "/gratis-ai", title: "Gratis AI för företag — vad fungerar?", description: "Vilket gratis AI är lämpligt för affärsbruk?" },
  ],
  "gratis-ai": [
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Vad kostar AI när gratis inte räcker?" },
    { to: "/billigaste-ai", title: "Billigaste betalda AI 2026", description: "GPT-4o mini, Mistral Small — nästan gratis." },
    { to: "/ai-for-foretag", title: "Gratis AI för företag", description: "Vad kan företag använda gratis och när krävs betalt?" },
    { to: "/chatgpt-vs-claude", title: "ChatGPT vs Claude — gratis jämförelse", description: "Vilken är bäst på sina gratisnivåer?" },
  ],
};
