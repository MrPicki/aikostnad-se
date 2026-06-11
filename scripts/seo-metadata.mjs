// Single source of truth for per-route SEO metadata.
// AUTO-SYNCED with each page's <SEO> props — see scripts/check-seo-sync.mjs,
// which fails the build if this list and the pages ever drift apart.
// Consumed by scripts/prerender-seo.mjs (static HTML) and
// scripts/generate-sitemap.mjs (sitemap.xml).

export const SITE = {
  url: "https://aikostnad.se",
  name: "Aikostnad.se",
  ogImage: "https://aikostnad.se/og-image.png",
  locale: "sv_SE",
  defaultTitle: "AI Kostnad – Räkna ut vad AI, ChatGPT och API-användning kostar",
  defaultDesc: "Använd Aikostnad.se för att snabbt räkna ut vad AI kostar per fråga, månad och år.",
};

export const ROUTES = [
  {
    path: "/",
    title: "AI Kostnadskalkylator — Räkna ut vad ChatGPT, Claude och Gemini kostar i SEK",
    description: "Räkna ut exakt vad ChatGPT, Claude och Gemini kostar dig — i svenska kronor. Beskriv din idé, få svar på 5 sekunder. Gratis AI-kalkylator.",
  },
  {
    path: "/ai-api-kostnad",
    title: "AI API kostnad — vad kostar det att integrera AI i din app?",
    description: "Typiska AI API-kostnader för startups och SaaS. Estimera kostnader, räkna cost-per-user och sänk notan med caching och smart modellval. Realistiska budgetar i SEK.",
  },
  {
    path: "/ai-bild-pris",
    title: "AI-bild pris 2026 — Midjourney, DALL-E 3 och Stable Diffusion jämfört",
    description: "Vad kostar AI-bildgenerering 2026? Midjourney, DALL-E 3, Stable Diffusion, Ideogram och Flux — priser i SEK och vilken som ger bäst kvalitet för pengarna.",
  },
  {
    path: "/ai-video-pris",
    title: "AI-video pris 2026 — vad kostar Sora, Veo och Runway i SEK?",
    description: "Vad kostar AI-genererad video 2026? Sora 2, Google Veo 3.1, Runway och Kling jämförda i svenska kronor — per sekund, per abonnemang och per färdig video.",
  },
  {
    path: "/ai-chatbot-kostnad",
    title: "Vad kostar en AI-chatbot? Komplett guide 2026",
    description: "Vad kostar det att bygga en AI-chatbot? Konkreta budgetexempel för hobby, småföretag och B2C — i svenska kronor. Plus hur du sänker kostnaden med rätt modellval.",
  },
  {
    path: "/ai-for-advokatbyra",
    title: "AI för advokatbyråer — vad kostar det? Guide + kalkylator (2026)",
    description: "Konkreta AI-kostnader för advokatbyråer: kontraktsanalys, juridisk research och klientkommunikation. Claude Sonnet rekommenderas för GDPR och hög precision. Maj 2026.",
  },
  {
    path: "/ai-for-ehandel",
    title: "AI för e-handel — produkttexter, support och kostnad (2026)",
    description: "AI-kostnader för e-handel: produktbeskrivningar, kundtjänst-chatbot och personaliserade mejl. Claude Haiku för snabb och billig volymhantering. Maj 2026.",
  },
  {
    path: "/ai-for-foretag",
    title: "AI för företag Sverige 2026 — kostnader, verktyg och GDPR",
    description: "Komplett guide till AI för svenska företag. Vad kostar AI per anställd? Vilken AI passar er? Hur hanterar ni GDPR? Konkreta räkneexempel i SEK.",
  },
  {
    path: "/ai-for-redovisning",
    title: "AI för redovisning och bokföring — kostnader och guide (2026)",
    description: "AI-kostnader för redovisningsbyråer och bokförare: kvittoanalys, skattefrågor och rapportgenerering. GPT-4o mini för hög volym och låg kostnad. Maj 2026.",
  },
  {
    path: "/ai-for-sjukvard",
    title: "AI i sjukvården — kostnader, GDPR och guide (2026)",
    description: "AI-kostnader för sjukvård och hälsa: journalsammanfattning, patientchatbot och medicinsk dokumentation. GDPR-krav och lokal hosting. Maj 2026.",
  },
  {
    path: "/ai-for-skola",
    title: "AI i skolan — vad kostar det för kommuner och skolor? (2026)",
    description: "AI-kostnader för skolor och kommuner: läxhjälp-chatbot, bedömningsstöd och kursplaneringsassistent. GPT-4o mini för priseffektiv implementering. Maj 2026.",
  },
  {
    path: "/ai-for-smaforetag",
    title: "AI för småföretag — vad kostar det och är det värt det? 2026",
    description: "Realistiska AI-kostnader för 1–10 personers företag. Vilka verktyg är gratis, när API är billigare, konkreta exempel per bransch och ROI-argument. Maj 2026.",
  },
  {
    path: "/ai-konsult-pris",
    title: "AI-konsult pris 2026 — vad kostar en AI-konsult i Sverige?",
    description: "Vad kostar en AI-konsult i Sverige 2026? Timpris, projektpris och retainer — junior, senior och specialist. Komplett guide med riktpriser i SEK.",
  },
  {
    path: "/ai-kostnad-per-manad",
    title: "AI-kostnad per månad — räkna ut vad AI kostar ditt företag",
    description: "Genomsnittliga AI-kostnader per månad för chatbot, textgenerering och analys. Skillnad abonnemang vs API, hur du budgeterar och typiska kostnader per anställd. Maj 2026.",
  },
  {
    path: "/ai-ordlista",
    title: "AI-ordlista — termer, tokens, API och prismodeller förklarade",
    description: "Komplett ordlista för AI-kostnader på svenska: tokens, prompt, embedding, API, abonnemang, fine-tuning, RAG, RLHF och mer. Begripliga definitioner.",
  },
  {
    path: "/anthropic-claude-api-pris",
    title: "Anthropic Claude API pris 2026 — Claude Opus, Sonnet, Haiku i SEK",
    description: "Alla Claude-modellers priser i svenska kronor. Skillnad mellan Opus, Sonnet och Haiku. Prompt caching-besparingar, GDPR och jämförelse mot OpenAI. Maj 2026.",
  },
  {
    path: "/billigaste-ai",
    title: "Billigaste AI 2026 — Jämför GPT-4o mini, Claude Haiku och Gemini Flash i SEK",
    description: "Vilket AI är billigast per token i Sverige 2026? Komplett jämförelse av GPT-4o mini, Claude Haiku 4.5, Gemini Flash och Mistral Small. Räkna ut exakt kostnad i SEK.",
  },
  {
    path: "/chatgpt-pro-vs-plus",
    title: "ChatGPT Pro vs Plus 2026 — vilken är värd 200 dollar i månaden?",
    description: "ChatGPT Plus (20 dollar) eller Pro (200 dollar)? Komplett jämförelse av funktioner, modeller, limits och vem som faktiskt får valuta för Pro-priset 2026.",
  },
  {
    path: "/chatgpt-vs-claude",
    title: "ChatGPT vs Claude 2026 — pris, svenska och prestanda jämfört",
    description: "ChatGPT eller Claude? Komplett jämförelse av GPT-4o och Claude Sonnet 4.6 — pris i SEK, svenska språkkvalitet, kodning och GDPR. Uppdaterat maj 2026.",
  },
  {
    path: "/claude-pris",
    title: "Claude Pris 2026 — vad kostar Claude Sonnet och Haiku per månad?",
    description: "Vad kostar Claude API i Sverige? Se priser för Claude Sonnet 4.6 och Haiku 4.5 per token. Jämför med ChatGPT och räkna ut din AI-budget i SEK.",
  },
  {
    path: "/deepseek-pris",
    title: "DeepSeek pris Sverige 2026 — billigaste AI-modellen?",
    description: "DeepSeek V3 och R1 priser i SEK. Jämförelse mot GPT-4o och Claude, kvalitet, GDPR-risker med kinesisk AI och när DeepSeek är rätt val för svenska företag. Maj 2026.",
  },
  {
    path: "/embed-info",
    title: "Bädda in AI-kostnadskalkylatorn på din sajt — gratis embed",
    description: "Gratis embed av Aikostnad.se:s AI-kostnadskalkylator. Kopiera iframe-koden och bädda in direkt på din sajt. Inga annonser, kräver bara en länk tillbaka.",
  },
  {
    path: "/gemini-pris",
    title: "Gemini Pris 2026 — vad kostar Google Gemini 2.5 API per månad?",
    description: "Se vad Google Gemini 2.5 Pro och Flash kostar per token och per månad. Jämför med ChatGPT och Claude. Räkna ut din AI-kostnad i SEK med live-valutakurs.",
  },
  {
    path: "/gpt-4-pris",
    title: "GPT-4.1 Pris 2026 — vad kostar GPT-4 API per månad i SEK?",
    description: "Räkna ut vad GPT-4.1 och GPT-4o kostar per token och per månad. Jämför alla GPT-4-varianter med live-valutakurs i svenska kronor.",
  },
  {
    path: "/gpt-5-pris",
    title: "GPT-5 pris Sverige 2026 — vad kostar det i kronor?",
    description: "GPT-5 API-priser i svenska kronor. Jämförelse mot GPT-4o och GPT-4.1 — när ska du välja GPT-5 vs billigare alternativ? Typiska månadskostnader per use case.",
  },
  {
    path: "/gratis-ai",
    title: "Gratis AI 2026 — bästa gratis AI-verktyg för svenska användare",
    description: "Vilka AI-verktyg är gratis 2026? Jämförelse av ChatGPT, Claude, Gemini och fler gratis AI-tjänster. Se begränsningar, gratis API-tier och alternativ utan kostnad.",
  },
  {
    path: "/grok-pris",
    title: "Grok pris 2026 — vad kostar Grok AI och SuperGrok i SEK?",
    description: "Vad kostar Grok 2026? SuperGrok, X Premium+ och Grok 4 API-priser i svenska kronor. Jämförelse mot ChatGPT och Claude — och när Grok är värt pengarna.",
  },
  {
    path: "/integritet",
    title: "Integritetspolicy",
    description: "Läs om hur Aikostnad.se hanterar dina personuppgifter enligt GDPR.",
  },
  {
    path: "/jamfor-ai-modeller",
    title: "Jämför AI-modeller 2026 — pris och prestanda i SEK",
    description: "Stor jämförelsetabell: GPT-4o, Claude Sonnet, Gemini Flash, DeepSeek, Mistral — priser i SEK, styrkor/svagheter och rekommendation per use case. Maj 2026.",
  },
  {
    path: "/kontakt",
    title: "Kontakta oss — Aikostnad.se",
    description: "Frågor om AI-priser, felaktiga modellpriser eller samarbeten? Hör av dig till oss på hej@aikostnad.se. Vi svarar inom 1–2 arbetsdagar.",
  },
  {
    path: "/microsoft-copilot-pris",
    title: "Microsoft Copilot pris 2026 — M365 Copilot, Copilot Pro, GitHub Copilot",
    description: "Vad kostar Microsoft Copilot 2026? Komplett guide till alla varianter — Copilot Free, Pro, Microsoft 365 Copilot, GitHub Copilot och Copilot Studio i SEK.",
  },
  {
    path: "/mistral-pris",
    title: "Mistral AI pris 2026 — vad kostar Europas AI i SEK?",
    description: "Mistral AI priser 2026: Mistral Large och Small per token i SEK, Le Chat gratis och Pro. Det GDPR-vänliga EU-alternativet till ChatGPT — komplett prisguide.",
  },
  {
    path: "/nyheter",
    title: "Dagens AI-rapport",
    description: "Daglig AI-nyhetsrapport — det viktigaste inom AI sammanfattat på svenska av aikostnad.se.",
  },
  {
    path: "/o3-pris",
    title: "Vad kostar OpenAI o3? Priser i SEK (2026)",
    description: "OpenAI o3, o3-mini och o4-mini priser i svenska kronor. Reasoning-modeller för komplex analys — när är kostnaden motiverad och hur jämför de mot GPT-5?",
  },
  {
    path: "/om",
    title: "Om Aikostnad.se — så verifierar vi AI-priser",
    description: "Aikostnad.se är en svensk AI-kostnadskalkylator. Läs om hur vi verifierar modellpriser månadsvis, vilka modeller vi täcker och varför sajten finns.",
  },
  {
    path: "/openai-api-kostnad",
    title: "OpenAI API-kostnad 2026 — komplett prisguide i SEK",
    description: "Alla OpenAI API-priser 2026 i svenska kronor. GPT-4o, GPT-4o mini, o3, DALL-E 3, Whisper, embeddings och Batch API — räkneexempel för svenska kunder.",
  },
  {
    path: "/openai-api-pris",
    title: "OpenAI API pris Sverige 2026 — GPT-4o, GPT-4o mini, o3 i SEK",
    description: "Komplett pristabell för alla OpenAI-modeller i SEK. GPT-4o, GPT-4o mini, GPT-4.1, o3, o4-mini, embeddings — hur du beräknar din månadskostnad.",
  },
  {
    path: "/perplexity-pris",
    title: "Perplexity AI pris 2026 — vad kostar Perplexity Pro per månad?",
    description: "Perplexity AI priser i Sverige: gratis tier, Pro (20 USD/mån) och Enterprise. Vad du faktiskt får och om Perplexity Pro är värt pengarna 2026.",
  },
  {
    path: "/press",
    title: "Press & embed — använd Aikostnad.se i din artikel",
    description: "Press-info för svenska journalister och bloggare. Embed-kod för AI-kostnadskalkylatorn, bilder och kontaktinfo.",
  },
  {
    path: "/prisandringar",
    title: "AI-priser i Sverige — Historik och prisändringar 2024–2026",
    description: "Komplett historik över AI-prisändringar 2024–2026. GPT-4o, Claude, Gemini — se hur priserna sjunkit och vad det innebär för din AI-budget.",
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
    path: "/vad-kostar-ai",
    title: "Vad kostar AI? Komplett prisguide 2026 — ChatGPT, Claude, Gemini",
    description: "Komplett guide till AI-kostnader 2026. Jämför ChatGPT Plus, Claude Pro och Gemini Advanced. Se vad AI kostar per månad för privatpersoner, team och företag.",
  },
  {
    path: "/vad-kostar-ai-per-ar",
    title: "Vad kostar AI per år? Räkna ut din AI-budget för 2026",
    description: "Årliga AI-kostnader för privatperson, frilansare, startup och SME. Abonnemang vs API per år, hur du planerar en AI-budget och vanliga misstag som kostar dig pengar. SEK 2026.",
  },
  {
    path: "/vad-kostar-chatgpt",
    title: "Vad kostar ChatGPT? Räkna ut GPT-4o API-kostnad i SEK 2026",
    description: "Vad kostar ChatGPT Plus och GPT-4o API per månad i Sverige? Gratis kalkylator med live-valutakurs. Jämför GPT-4o, GPT-4o mini och priser i SEK.",
  },
  {
    path: "/villkor",
    title: "Användarvillkor — Aikostnad.se",
    description: "Läs användarvillkoren för Aikostnad.se — vad tjänsten är, ansvarsbegränsningar för priser, immateriella rättigheter och kontaktuppgifter.",
  },
];
