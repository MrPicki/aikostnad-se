// Single source of truth for per-route SEO metadata.
// Consumed by scripts/prerender-seo.mjs at build time to inject
// correct meta tags into the static HTML for each route.

export const SITE = {
  url: "https://aikostnad.se",
  name: "Aikostnad.se",
  ogImage: "https://aikostnad.se/og-image.png",
  defaultTitle: "AI Kostnad – Räkna ut vad AI, ChatGPT och API-användning kostar",
  defaultDesc: "Använd Aikostnad.se för att snabbt räkna ut vad AI kostar per fråga, månad och år.",
};

// Order matters for sitemap-aligned prerender output.
export const ROUTES = [
  {
    path: "/",
    title: "Vad kostar AI? Kalkylator för ChatGPT, Claude och Gemini",
    description: "Räkna ut vad ChatGPT, Claude och Gemini kostar per månad i svenska kronor. Jämför abonnemang och API-priser. Gratis kalkylator.",
  },
  {
    path: "/vad-kostar-chatgpt",
    title: "Vad kostar ChatGPT? Räkna ut API-kostnaden för GPT-4o",
    description: "Räkna ut exakt vad ChatGPT (GPT-4o) kostar per månad för din svenska applikation. Gratis kalkylator med live-valutakurs i SEK.",
  },
  {
    path: "/claude-pris",
    title: "Claude Pris — vad kostar Claude Sonnet API per månad?",
    description: "Se vad Claude Sonnet 4.6 kostar per token och per månad. Jämför med ChatGPT och beräkna din AI-budget med live-kurs i SEK.",
  },
  {
    path: "/gpt-4-pris",
    title: "GPT-4.1 Pris — vad kostar GPT-4 API per månad?",
    description: "Räkna ut vad GPT-4.1 kostar per token och per månad. Jämför med GPT-4o och Claude med live-valutakurs i SEK.",
  },
  {
    path: "/vad-kostar-ai",
    title: "Vad kostar AI? Komplett prisguide 2026 — ChatGPT, Claude, Gemini",
    description: "Komplett guide till AI-kostnader 2026. Jämför ChatGPT Plus, Claude Pro och Gemini Advanced. Se vad AI kostar per månad för privatpersoner, team och företag.",
  },
  {
    path: "/billigaste-ai",
    title: "Billigaste AI 2026 — Jämför ChatGPT mini, Claude Haiku och Gemini Flash",
    description: "Vilket AI är billigast 2026? Jämför GPT-4o mini, Claude Haiku 4.5 och Gemini 2.5 Flash. Räkna ut exakt kostnad i SEK med vår gratis kalkylator.",
  },
  {
    path: "/chatgpt-vs-claude",
    title: "ChatGPT vs Claude — pris och prestanda jämfört 2026",
    description: "Vilken AI ska du välja? Komplett jämförelse av ChatGPT (GPT-4o) och Claude Sonnet — pris i SEK, kvalitet, svenska, prompt caching och kodning. Uppdaterat 2026.",
  },
  {
    path: "/ai-chatbot-kostnad",
    title: "Vad kostar en AI-chatbot? Komplett guide 2026",
    description: "Vad kostar det att bygga en AI-chatbot? Konkreta budgetexempel för hobby, småföretag och B2C — i svenska kronor. Plus hur du sänker kostnaden med rätt modellval.",
  },
  {
    path: "/prompt-caching",
    title: "Prompt caching — så halverar du din Claude- och GPT-kostnad",
    description: "Komplett guide till prompt caching för Claude, GPT-4o och Gemini. Hur det fungerar, vilka modeller stödjer det, exakta rabattnivåer och konkreta exempel i SEK.",
  },
  {
    path: "/token-kalkylator",
    title: "Tokenräknare — räkna tokens i din text",
    description: "Klistra in din text och se hur många tokens den innehåller, vad det kostar för olika AI-modeller, och hur svenska texter skiljer sig från engelska.",
  },
  {
    path: "/integritet",
    title: "Integritetspolicy",
    description: "Läs om hur Aikostnad.se hanterar dina personuppgifter enligt GDPR.",
  },
  {
    path: "/kontakt",
    title: "Kontakta oss — Aikostnad.se",
    description: "Frågor om AI-priser, felaktiga modellpriser eller samarbeten? Hör av dig till oss på hej@aikostnad.se.",
  },
  {
    path: "/om",
    title: "Om Aikostnad.se — så verifierar vi AI-priser",
    description: "Aikostnad.se är en svensk AI-kostnadskalkylator. Läs om hur vi verifierar modellpriser månadsvis, vilka modeller vi täcker och varför sajten finns.",
  },
  {
    path: "/press",
    title: "Press & embed — använd Aikostnad.se i din artikel",
    description: "Press-info för svenska journalister och bloggare. Embed-kod för AI-kostnadskalkylatorn, bilder och kontaktinfo.",
  },
  {
    path: "/gemini-pris",
    title: "Gemini Pris 2026 — vad kostar Google Gemini API per månad?",
    description: "Se vad Google Gemini 2.5 Pro och Flash kostar per token och per månad. Räkna ut din AI-budget i SEK med live-valutakurs. Jämför med ChatGPT och Claude.",
  },
  {
    path: "/ai-for-foretag",
    title: "AI för företag i Sverige 2026 — kostnader, verktyg och GDPR",
    description: "Vilken AI ska svenska företag välja? Pris per anställd, enterprise-avtal, GDPR-DPA och konkreta räkneexempel i SEK. Komplett guide 2026.",
  },
  {
    path: "/gratis-ai",
    title: "Gratis AI 2026 — bästa gratis AI-verktygen jämförda",
    description: "Komplett guide till gratis AI: ChatGPT Free, Claude Free, Gemini, Copilot och fler. Vilken är bäst, vad är begränsningarna och när måste du börja betala?",
  },
  {
    path: "/ai-konsult-pris",
    title: "Vad kostar en AI-konsult i Sverige 2026? Timpriser och paket",
    description: "AI-konsult priser i Sverige 2026: timpris, projektpris, retainer och vad du faktiskt får för pengarna. Jämför seniora och juniora AI-konsulter.",
  },
  {
    path: "/microsoft-copilot-pris",
    title: "Microsoft Copilot pris 2026 — vad kostar Copilot per användare?",
    description: "Vad kostar Microsoft 365 Copilot, Copilot Pro och GitHub Copilot i Sverige 2026? Komplett prisguide per användare och månad — i SEK.",
  },
  {
    path: "/openai-api-kostnad",
    title: "OpenAI API-kostnad 2026 — komplett prisguide för GPT-4, GPT-4o och o3",
    description: "OpenAI API-priser i SEK 2026. Allt om GPT-4o, GPT-4o mini, o3, o3-mini, embeddings, DALL-E och Whisper. Räkna ut din månadskostnad direkt.",
  },
  {
    path: "/chatgpt-pro-vs-plus",
    title: "ChatGPT Pro vs Plus 2026 — vilken är värd 200 dollar i månaden?",
    description: "ChatGPT Plus (20 dollar) eller Pro (200 dollar)? Komplett jämförelse av funktioner, modeller och vem som faktiskt får valuta för Pro-priset.",
  },
  {
    path: "/ai-bild-pris",
    title: "AI-bild pris 2026 — Midjourney, DALL-E 3 och Stable Diffusion jämfört",
    description: "Vad kostar AI-bildgenerering 2026? Midjourney, DALL-E 3, Stable Diffusion, Ideogram och Flux — priser i SEK och vilken som ger bäst kvalitet för pengarna.",
  },
  {
    path: "/perplexity-pris",
    title: "Perplexity AI pris 2026 — vad kostar Perplexity Pro per månad?",
    description: "Perplexity AI priser i Sverige: gratis tier, Pro (20 dollar/mån) och Enterprise. Vad du faktiskt får och om Perplexity Pro är värt pengarna 2026.",
  },
  {
    path: "/ai-ordlista",
    title: "AI-ordlista — termer, tokens, API och prismodeller förklarade",
    description: "Komplett ordlista för AI-kostnader på svenska: tokens, prompt, embedding, API, abonnemang, fine-tuning, RAG, RLHF och mer. Begripliga definitioner.",
  },
];
