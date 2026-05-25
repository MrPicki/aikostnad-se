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
  "ai-konsult-pris": [
    { to: "/ai-for-foretag", title: "AI för företag — kostnader och val", description: "Bygg eller köpa? Pris per anställd i SEK." },
    { to: "/ai-chatbot-kostnad", title: "Vad kostar en AI-chatbot?", description: "Konkreta budgetar för hobby, SME och B2C." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Översikt över alla AI-leverantörer i SEK." },
    { to: "/openai-api-kostnad", title: "OpenAI API-kostnad förklarad", description: "Bygger ni själva? Här är OpenAI-priserna." },
  ],
  "microsoft-copilot-pris": [
    { to: "/vad-kostar-chatgpt", title: "ChatGPT vs Copilot", description: "Båda kör GPT-4 — jämför priset." },
    { to: "/ai-for-foretag", title: "AI för företag i Sverige", description: "Copilot eller Claude för svenska SME?" },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-abonnemang jämfört." },
    { to: "/chatgpt-pro-vs-plus", title: "ChatGPT Pro vs Plus", description: "Är ChatGPT Pro värt 2 100 kr/mån?" },
  ],
  "openai-api-kostnad": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT API?", description: "Detaljguide för GPT-4o och GPT-4o mini." },
    { to: "/gpt-4-pris", title: "GPT-4.1 pris och varianter", description: "Jämför alla GPT-4-varianter." },
    { to: "/billigaste-ai", title: "Billigaste AI 2026", description: "GPT-4o mini vs Claude Haiku vs Gemini Flash." },
    { to: "/prompt-caching", title: "Halvera notan med prompt caching", description: "OpenAI:s automatiska caching förklarad." },
  ],
  "chatgpt-pro-vs-plus": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT?", description: "Komplett prisöversikt för alla ChatGPT-nivåer." },
    { to: "/openai-api-kostnad", title: "OpenAI API-kostnad", description: "Bygger du själv? Räkna på API:t." },
    { to: "/microsoft-copilot-pris", title: "Microsoft Copilot pris", description: "Copilot är ofta billigare alternativet." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Jämför med Claude, Gemini och fler." },
  ],
  "ai-bild-pris": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT?", description: "DALL-E 3 ingår i ChatGPT Plus." },
    { to: "/openai-api-kostnad", title: "OpenAI API — inkl. DALL-E", description: "Bygger du in bildgenerering i app?" },
    { to: "/billigaste-ai", title: "Billigaste AI 2026", description: "Vill du ha både text och bild?" },
    { to: "/ai-ordlista", title: "AI-ordlista", description: "Vad är diffusion, LoRA, ControlNet?" },
  ],
  "perplexity-pris": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT?", description: "ChatGPT Plus är största konkurrenten." },
    { to: "/claude-pris", title: "Claude pris", description: "Perplexity Pro ger tillgång till Claude." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-abonnemang jämförda." },
    { to: "/ai-ordlista", title: "AI-ordlista", description: "Vad är RAG, embedding, vector database?" },
  ],
  "ai-ordlista": [
    { to: "/vad-kostar-ai", title: "Vad kostar AI?", description: "Praktisk guide om priser efter att du läst termerna." },
    { to: "/prompt-caching", title: "Prompt caching förklarat", description: "Djupguide för en av termerna i ordlistan." },
    { to: "/token-kalkylator", title: "Tokenräknare", description: "Räkna tokens i din text — verktyget." },
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT?", description: "Tillämpa kunskapen på ChatGPT-priser." },
  ],
  "gpt-5-pris": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT API?", description: "GPT-4o och GPT-4o mini — detaljguide." },
    { to: "/openai-api-pris", title: "OpenAI API priser — komplett tabell", description: "Alla OpenAI-modeller i SEK." },
    { to: "/chatgpt-vs-claude", title: "GPT vs Claude — jämförelse", description: "Välj rätt modell för ditt behov." },
    { to: "/billigaste-ai", title: "Billigaste AI 2026", description: "GPT-5 är dyrt — när passar billigare modeller?" },
  ],
  "ai-kostnad-per-manad": [
    { to: "/", title: "Kalkylera din månadskostnad", description: "Räkna exakt kostnad för din volym i SEK." },
    { to: "/ai-api-kostnad", title: "AI API-kostnad för app-builders", description: "Vad kostar det att integrera AI i en produkt?" },
    { to: "/vad-kostar-ai-per-ar", title: "Vad kostar AI per år?", description: "Planera en realistisk AI-budget." },
    { to: "/billigaste-ai", title: "Billigaste AI 2026", description: "Sänk din månadskostnad med rätt modell." },
  ],
  "openai-api-pris": [
    { to: "/vad-kostar-chatgpt", title: "Vad kostar ChatGPT API?", description: "Detaljguide för GPT-4o och GPT-4o mini." },
    { to: "/openai-api-kostnad", title: "OpenAI API-kostnad förklarad", description: "Räkna ut din faktiska månadskostnad." },
    { to: "/chatgpt-vs-claude", title: "OpenAI vs Anthropic — jämförelse", description: "Pris och prestanda head-to-head." },
    { to: "/gpt-5-pris", title: "GPT-5 pris — vad kostar flaggskeppet?", description: "Jämför GPT-5 mot äldre modeller." },
  ],
  "anthropic-claude-api-pris": [
    { to: "/claude-pris", title: "Claude pris — abonnemang och API", description: "Komplett guide till Claude.ai och API." },
    { to: "/chatgpt-vs-claude", title: "Claude vs ChatGPT — jämförelse", description: "Pris, prestanda och GDPR." },
    { to: "/prompt-caching", title: "Spara 90 % med prompt caching", description: "Claudes starkaste prisfördel." },
    { to: "/billigaste-ai", title: "Billigaste AI 2026", description: "Claude Haiku vs GPT-4o mini." },
  ],
  "ai-for-smaforetag": [
    { to: "/ai-for-foretag", title: "AI för företag i Sverige", description: "Bredare guide för alla företagsstorlekar." },
    { to: "/gratis-ai", title: "Gratis AI för småföretag", description: "Vilka verktyg är gratis och räcker de?" },
    { to: "/ai-kostnad-per-manad", title: "Vad kostar AI per månad?", description: "Typiska månadskostnader per use case." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-leverantörer och abonnemang." },
  ],
  "jamfor-ai-modeller": [
    { to: "/billigaste-ai", title: "Billigaste AI-modellen 2026", description: "Fokus på budget-modellerna." },
    { to: "/chatgpt-vs-claude", title: "ChatGPT vs Claude — djupguide", description: "Detaljerad jämförelse av de två största." },
    { to: "/", title: "Kalkylera alla modeller i SEK", description: "Fyll i din volym och se månadskostnad." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Priser, abonnemang och API-kostnader." },
  ],
  "ai-api-kostnad": [
    { to: "/openai-api-pris", title: "OpenAI API priser i SEK", description: "Prislistor för alla GPT-modeller." },
    { to: "/anthropic-claude-api-pris", title: "Claude API priser i SEK", description: "Opus, Sonnet och Haiku — priser och val." },
    { to: "/ai-kostnad-per-manad", title: "Månadskostnad per use case", description: "Typiska kostnader för chatbot, analys m.m." },
    { to: "/prompt-caching", title: "Sänk API-notan med caching", description: "90 % rabatt på cachad input hos Claude." },
  ],
  "deepseek-pris": [
    { to: "/billigaste-ai", title: "Billigaste AI-modeller 2026", description: "DeepSeek vs GPT-4o mini vs Mistral Small." },
    { to: "/jamfor-ai-modeller", title: "Jämför alla AI-modeller", description: "Komplett tabell med priser i SEK." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-leverantörer i SEK." },
    { to: "/chatgpt-vs-claude", title: "ChatGPT vs Claude", description: "Europeiska alternativ till DeepSeek." },
  ],
  "vad-kostar-ai-per-ar": [
    { to: "/ai-kostnad-per-manad", title: "Räkna på månadsnivå", description: "Detaljerad genomgång av månadskostnader." },
    { to: "/vad-kostar-ai", title: "Komplett AI-prisguide 2026", description: "Alla AI-leverantörer och planer." },
    { to: "/ai-for-smaforetag", title: "AI för småföretag — budget", description: "Realistiska kostnader för 1–10 anst." },
    { to: "/gratis-ai", title: "Gratis AI — hur länge räcker det?", description: "Spara på årskostnaden med gratisverktyg." },
  ],
};
