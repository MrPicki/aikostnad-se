// Per-article publication metadata for long-form pages.
// Used by ArticleSchema (JSON-LD) and ArticleByline (visible "Skriven av X").
//
// Keep dates accurate — Google uses dateModified for freshness ranking.
// When you substantively update an article, bump the modified date.

export interface ArticleMeta {
  slug: string;
  headline: string;
  description: string;
  publishedDate: string;
  modifiedDate: string;
  url: string;
}

export const articles: Record<string, ArticleMeta> = {
  "prompt-caching": {
    slug: "prompt-caching",
    headline: "Prompt caching — så halverar du din Claude- och GPT-kostnad",
    description:
      "Komplett guide till prompt caching för Claude, GPT-4o och Gemini. Hur det fungerar, vilka modeller stödjer det, exakta rabattnivåer och konkreta exempel i SEK.",
    publishedDate: "2026-05-16",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/prompt-caching",
  },
  "ai-chatbot-kostnad": {
    slug: "ai-chatbot-kostnad",
    headline: "Vad kostar en AI-chatbot? Komplett guide 2026",
    description:
      "Vad kostar det att bygga en AI-chatbot? Konkreta budgetexempel för hobby, småföretag och B2C — i svenska kronor. Plus hur du sänker kostnaden med rätt modellval.",
    publishedDate: "2026-05-16",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/ai-chatbot-kostnad",
  },
  "chatgpt-vs-claude": {
    slug: "chatgpt-vs-claude",
    headline: "ChatGPT vs Claude — pris och prestanda jämfört 2026",
    description:
      "Vilken AI ska du välja? Komplett jämförelse av ChatGPT (GPT-4o) och Claude Sonnet — pris i SEK, kvalitet, svenska, prompt caching och kodning. Uppdaterat 2026.",
    publishedDate: "2026-05-16",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/chatgpt-vs-claude",
  },
  "vad-kostar-ai": {
    slug: "vad-kostar-ai",
    headline: "Vad kostar AI? Komplett prisguide 2026",
    description:
      "Komplett guide till AI-kostnader 2026. Jämför ChatGPT Plus, Claude Pro och Gemini Advanced. Se vad AI kostar per månad för privatpersoner, team och företag i SEK.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/vad-kostar-ai",
  },
  "vad-kostar-chatgpt": {
    slug: "vad-kostar-chatgpt",
    headline: "Vad kostar ChatGPT? Räkna ut API-kostnaden för GPT-4o",
    description:
      "Räkna ut exakt vad ChatGPT (GPT-4o) kostar per månad för din svenska applikation. Gratis kalkylator med live-valutakurs i SEK.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/vad-kostar-chatgpt",
  },
  "claude-pris": {
    slug: "claude-pris",
    headline: "Claude pris 2026 — vad kostar Claude Sonnet och Haiku per månad?",
    description:
      "Vad kostar Claude API i Sverige? Se priser för Claude Sonnet 4.6 och Haiku 4.5 per token. Jämför med ChatGPT och räkna ut din AI-budget i SEK.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/claude-pris",
  },
  "gpt-4-pris": {
    slug: "gpt-4-pris",
    headline: "GPT-4 pris 2026 — vad kostar GPT-4.1 och GPT-4o per månad?",
    description:
      "Räkna ut vad GPT-4.1 kostar per token och per månad. Jämför med GPT-4o och Claude med live-valutakurs i SEK.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/gpt-4-pris",
  },
  "gemini-pris": {
    slug: "gemini-pris",
    headline: "Gemini pris 2026 — vad kostar Google Gemini API per månad?",
    description:
      "Google Gemini 2.5 Pro och Flash — priser per token och månadskostnad. Jämför med ChatGPT och Claude med live-valutakurs i SEK.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/gemini-pris",
  },
  "billigaste-ai": {
    slug: "billigaste-ai",
    headline: "Billigaste AI 2026 — GPT-4o mini, Claude Haiku, Gemini Flash jämförda",
    description:
      "Vilket AI är billigast 2026? Jämför GPT-4o mini, Claude Haiku 4.5 och Gemini 2.5 Flash. Räkna ut exakt kostnad i SEK med vår gratis kalkylator.",
    publishedDate: "2026-05-14",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/billigaste-ai",
  },
  "ai-for-foretag": {
    slug: "ai-for-foretag",
    headline: "AI för företag i Sverige 2026 — kostnader, verktyg och GDPR",
    description:
      "Vilken AI ska svenska företag välja? Pris per anställd, enterprise-avtal, GDPR-DPA och konkreta räkneexempel i SEK. Komplett guide 2026.",
    publishedDate: "2026-05-17",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/ai-for-foretag",
  },
  "gratis-ai": {
    slug: "gratis-ai",
    headline: "Gratis AI 2026 — bästa gratis AI-verktygen jämförda",
    description:
      "Komplett guide till gratis AI: ChatGPT Free, Claude Free, Gemini, Copilot och fler. Vilken är bäst, vad är begränsningarna och när måste du börja betala?",
    publishedDate: "2026-05-17",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/gratis-ai",
  },
  "ai-konsult-pris": {
    slug: "ai-konsult-pris",
    headline: "Vad kostar en AI-konsult i Sverige 2026?",
    description:
      "AI-konsult priser i Sverige 2026: timpris, projektpris, retainer och vad du faktiskt får för pengarna. Jämför seniora och juniora AI-konsulter.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/ai-konsult-pris",
  },
  "microsoft-copilot-pris": {
    slug: "microsoft-copilot-pris",
    headline: "Microsoft Copilot pris 2026 — Microsoft 365, Copilot Pro och GitHub Copilot",
    description:
      "Vad kostar Microsoft 365 Copilot, Copilot Pro och GitHub Copilot i Sverige 2026? Komplett prisguide per användare och månad — i SEK.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/microsoft-copilot-pris",
  },
  "openai-api-kostnad": {
    slug: "openai-api-kostnad",
    headline: "OpenAI API-kostnad 2026 — komplett prisguide",
    description:
      "OpenAI API-priser i SEK 2026. Allt om GPT-4o, GPT-4o mini, o3, o3-mini, embeddings, DALL-E och Whisper. Räkna ut din månadskostnad direkt.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/openai-api-kostnad",
  },
  "chatgpt-pro-vs-plus": {
    slug: "chatgpt-pro-vs-plus",
    headline: "ChatGPT Pro vs Plus 2026 — vilken är värd 200 dollar i månaden?",
    description:
      "ChatGPT Plus (20 dollar) eller Pro (200 dollar)? Komplett jämförelse av funktioner, modeller och vem som faktiskt får valuta för Pro-priset.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/chatgpt-pro-vs-plus",
  },
  "ai-bild-pris": {
    slug: "ai-bild-pris",
    headline: "AI-bild pris 2026 — Midjourney, DALL-E 3 och Stable Diffusion jämfört",
    description:
      "Vad kostar AI-bildgenerering 2026? Midjourney, DALL-E 3, Stable Diffusion, Ideogram och Flux — priser i SEK och vilken som ger bäst kvalitet för pengarna.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/ai-bild-pris",
  },
  "perplexity-pris": {
    slug: "perplexity-pris",
    headline: "Perplexity AI pris 2026 — vad kostar Perplexity Pro per månad?",
    description:
      "Perplexity AI priser i Sverige: gratis tier, Pro (20 dollar/mån) och Enterprise. Vad du faktiskt får och om Perplexity Pro är värt pengarna 2026.",
    publishedDate: "2026-05-20",
    modifiedDate: "2026-05-20",
    url: "https://aikostnad.se/perplexity-pris",
  },
};
