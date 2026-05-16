import type { Guide } from "./types";

export const deepseekGuide: Guide = {
  providerId: "deepseek",
  providerName: "DeepSeek",
  tagline: "Kom igång med DeepSeek API (V3.2, R1)",
  modelsCovered: ["DeepSeek V3.2", "DeepSeek R1"],
  whatYouLearn: [
    "Hur du skapar ett DeepSeek-konto",
    "Hur du gör ditt första API-anrop",
    "Skillnaden mellan V3.2 (snabb) och R1 (resonemang)",
    "Hur DeepSeek priser jämför sig med konkurrenter",
    "Vilka risker du bör känna till med open source-modeller",
  ],
  intro:
    "DeepSeek är en av de mest intressanta nykomlingarna 2025–2026. De erbjuder open source-modeller via API till bråkdelen av priset hos amerikanska konkurrenter. För kostnadsmedvetna byggare som inte är låsta vid en specifik leverantör är DeepSeek värt en allvarlig titt.",
  prerequisites: [
    "En e-postadress",
    "Ett betalkort (internationell betalning)",
  ],
  steps: [
    {
      title: "Skapa konto på DeepSeek Platform",
      description:
        "Gå till platform.deepseek.com och registrera dig. Notera: DeepSeek är ett kinesiskt företag — om dataresidens är en hård krav från dina kunder, läs deras policy noga eller kombinera med self-hosting.",
    },
    {
      title: "Ladda saldo",
      description:
        "DeepSeek använder prepaid-system precis som OpenAI. Ladda minst 5 USD för att börja. Priserna är så låga att 5 USD räcker långt — en hobby-bot kan rulla i månader på det saldot.",
    },
    {
      title: "Skapa API-nyckel",
      description:
        "Under 'API Keys'. Skapa, kopiera, spara. Samma standard som andra leverantörer.",
    },
    {
      title: "Ditt första API-anrop",
      description:
        "DeepSeek API är OpenAI-kompatibelt — använd OpenAI:s SDK och byt bara base_url och nyckel. Det är den snabbaste vägen att börja.",
      code: `// npm install openai (samma SDK som för OpenAI)
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const res = await client.chat.completions.create({
  model: "deepseek-chat", // V3.2
  messages: [{ role: "user", content: "Hej! Skriv en kort välkomsttext." }],
});
console.log(res.choices[0].message.content);`,
    },
    {
      title: "Använd R1 för resonemang",
      description:
        "Om uppgiften kräver att modellen 'tänker högt' — använd deepseek-reasoner (R1). Den är något dyrare men ger märkbart bättre svar på komplexa frågor. För enkla chatbot-svar räcker V3.2 (deepseek-chat).",
    },
  ],
  costTips: [
    "DeepSeek V3.2 ($0,28/$0,42 per Mtok) är prisvärd mainstream-modell. R1 ($0,55/$2,19) är fortfarande billigare än flaggskepp hos OpenAI/Anthropic.",
    "DeepSeek har off-peak-rabatter — anrop mellan 16:30–00:30 UTC är 50–75 % billigare. Schemalägg batch-arbete till dessa timmar.",
    "Eftersom modellerna är open source kan du även själv-hosta dem (på t.ex. Together AI eller Replicate) om DeepSeeks-egna API inte passar.",
    "Använd standard OpenAI-SDK med deras base URL — slipper extra dependency.",
  ],
  commonMistakes: [
    "Anta att DeepSeek-svar är samma kvalitet som GPT-4o. För enkla uppgifter är de jämförbara, för komplexa kan GPT/Claude fortfarande vinna.",
    "Skicka känslig kunddata utan att ha läst DeepSeeks privacy policy. För svenska kunder med datasäkerhetskrav — välj Mistral eller självhosta DeepSeek istället.",
    "Anta att deepseek-chat och deepseek-reasoner används likadant. R1 har annorlunda svarsstruktur (tankegång + slutgiltigt svar).",
    "Glömma off-peak-rabatten. Du kan spara 50 % bara genom att schemalägga rapport-jobb till natten.",
  ],
  resources: [
    { label: "DeepSeek Platform", url: "https://platform.deepseek.com" },
    { label: "Officiell prislista", url: "https://api-docs.deepseek.com/quick_start/pricing" },
    { label: "API-dokumentation", url: "https://api-docs.deepseek.com" },
    { label: "Status", url: "https://status.deepseek.com" },
  ],
};
