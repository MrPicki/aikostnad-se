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
    modifiedDate: "2026-05-17",
    url: "https://aikostnad.se/prompt-caching",
  },
  "ai-chatbot-kostnad": {
    slug: "ai-chatbot-kostnad",
    headline: "Vad kostar en AI-chatbot? Komplett guide 2026",
    description:
      "Vad kostar det att bygga en AI-chatbot? Konkreta budgetexempel för hobby, småföretag och B2C — i svenska kronor. Plus hur du sänker kostnaden med rätt modellval.",
    publishedDate: "2026-05-16",
    modifiedDate: "2026-05-17",
    url: "https://aikostnad.se/ai-chatbot-kostnad",
  },
  "chatgpt-vs-claude": {
    slug: "chatgpt-vs-claude",
    headline: "ChatGPT vs Claude — pris och prestanda jämfört 2026",
    description:
      "Vilken AI ska du välja? Komplett jämförelse av ChatGPT (GPT-4o) och Claude Sonnet — pris i SEK, kvalitet, svenska, prompt caching och kodning. Uppdaterat 2026.",
    publishedDate: "2026-05-16",
    modifiedDate: "2026-05-17",
    url: "https://aikostnad.se/chatgpt-vs-claude",
  },
};
