import type { Guide } from "./types";

export const anthropicGuide: Guide = {
  providerId: "anthropic",
  providerName: "Anthropic",
  tagline: "Kom igång med Claude API (Sonnet, Haiku, Opus)",
  modelsCovered: ["Claude Sonnet 4.6", "Claude Haiku 4.5", "Claude Opus 4.7"],
  whatYouLearn: [
    "Hur du skapar ett Anthropic-konto och en API-nyckel",
    "Hur du gör ditt första Claude-anrop på 5 minuter",
    "Hur prompt caching kan halvera din kostnad",
    "När Sonnet räcker — och när Opus är värt extra pengarna",
    "Hur du undviker de vanligaste misstagen med Claude",
  ],
  intro:
    "Anthropic är OpenAI:s starkaste konkurrent — med modeller som ofta är bättre på svenska och naturligare i ton. Claude är också unikt i att erbjuda generös prompt caching som kan halvera din nota för chatbot-applikationer. Den här guiden tar dig från noll till första API-anrop.",
  prerequisites: [
    "En e-postadress",
    "Ett betalkort",
    "Grundläggande HTTP-kunskap om du själv ska bygga",
  ],
  steps: [
    {
      title: "Skapa ett Anthropic-konto",
      description:
        "Gå till console.anthropic.com och registrera dig. Detta är separat från claude.ai-chattgränssnittet — du behöver ett developer-konto för API-åtkomst.",
    },
    {
      title: "Verifiera identitet och ladda saldo",
      description:
        "Anthropic kräver att du verifierar telefonnummer + kort innan du får API-åtkomst. Det är ett extra steg jämfört med OpenAI men görs på 5 minuter. Ladda sedan minst 5 USD saldo för att börja.",
    },
    {
      title: "Skapa en API-nyckel",
      description:
        "Gå till 'API Keys' i menyn. Skapa en nyckel, namnge den, kopiera och spara säkert. Du ser nyckeln bara en gång.",
    },
    {
      title: "Sätt utgiftsgräns",
      description:
        "Gå till 'Plans & Billing' → 'Spending limits'. Sätt en månadsgräns på t.ex. 50 USD i början. Detta är din säkerhetsnät mot buggar som genererar tusentals onödiga anrop.",
    },
    {
      title: "Ditt första API-anrop",
      description:
        "Anropet ser lite annorlunda ut än OpenAI:s — Anthropic använder 'system' som separat parameter (inte som meddelande). Modellnamnet 'claude-haiku-4-5' är billigaste valet.",
      code: `// npm install @anthropic-ai/sdk
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const res = await client.messages.create({
  model: "claude-haiku-4-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hej! Skriv en kort välkomsttext." }],
});
console.log(res.content[0].text);`,
    },
    {
      title: "Aktivera prompt caching (viktigaste optimeringen)",
      description:
        "Om din applikation har en lång system-prompt eller dokumentkontext — markera den med cache_control. Då betalar du bara 10 % av normalt pris på den delen vid efterföljande anrop inom 5 minuter. Detta är Claudes största prisfördel.",
      code: `await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: "Du är en kundtjänstrobot för X...", // lång system-prompt
      cache_control: { type: "ephemeral" }
    }
  ],
  messages: [{ role: "user", content: "Min fråga..." }],
});`,
    },
  ],
  costTips: [
    "Använd prompt caching för system-promtar över 1024 tokens — 90 % rabatt på den cachade delen.",
    "Börja med Claude Haiku 4.5 för 80 % av användningsfallen. Eskalera till Sonnet bara där du ser kvalitetsproblem.",
    "Mät cache hit rate via usage.cache_read_input_tokens i svaret. Är den under 50 % är något fel med prompt-strukturen.",
    "För riktigt långa kontexter (50K+ tokens) — använd 1-timmes cache (extended TTL). Kostar mer per write men sparar pengar för dokumentanalys.",
    "Begränsa max_tokens lågt initialt. Du kan alltid höja för specifika anrop som behöver långa svar.",
  ],
  commonMistakes: [
    "Lägga prompt caching på meddelanden som ändras varje anrop — då måste cachen byggas om varje gång och du betalar cache-write-överkostnaden.",
    "Använda Opus för enkla uppgifter. Sonnet är vanligtvis tillräcklig och 8× billigare.",
    "Glömma att Claude använder 'system' som separat parameter, inte ett meddelande med role:'system' som OpenAI.",
    "Inte mäta cache hit rate efter aktivering — det är så du verifierar att det faktiskt sparar pengar.",
  ],
  resources: [
    { label: "Anthropic Console", url: "https://console.anthropic.com" },
    { label: "Officiell prislista", url: "https://www.anthropic.com/pricing" },
    { label: "API-dokumentation", url: "https://docs.anthropic.com" },
    { label: "Prompt caching-guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" },
  ],
};
