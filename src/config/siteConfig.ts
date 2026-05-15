export const siteConfig = {
  siteName: "Aikostnad.se",
  siteUrl: "https://aikostnad.se",
  siteDescription:
    "Använd Aikostnad.se för att snabbt räkna ut vad AI kostar per fråga, månad och år.",

  // Swedish tokenization: ~1.3 tokens per word (vs 0.75 for English)
  // due to Swedish characters å/ä/ö and longer compound words
  languageFactor: 1.3,

  // Fallback exchange rate used when live fetch fails
  fallbackUsdToSekRate: 10.5,

  // Set to true to enable email lead capture form (Supabase integration prepared)
  leadCaptureEnabled: false,

  pricesLastVerified: "2026-05-15",
};
