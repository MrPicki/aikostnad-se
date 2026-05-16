import type { Guide } from "./types";

export const mistralGuide: Guide = {
  providerId: "mistral",
  providerName: "Mistral AI",
  tagline: "Kom igång med Mistral API (Small, Large)",
  modelsCovered: ["Mistral Small", "Mistral Large"],
  whatYouLearn: [
    "Hur du skapar ett Mistral La Plateforme-konto",
    "Hur du gör ditt första Mistral-anrop",
    "Varför Mistral är intressant för svenska företag (EU-baserat)",
    "När Small räcker och när Large är värt extra",
    "Hur du undviker de vanligaste misstagen",
  ],
  intro:
    "Mistral är det ledande europeiska AI-bolaget och en stark kandidat om du värdesätter GDPR-vänlig datahantering eller stöd för flerspråkighet inklusive svenska. Mistral Small är dessutom en av de absolut billigaste modellerna på marknaden — $0,10/$0,30 per Mtok.",
  prerequisites: [
    "En e-postadress",
    "Ett betalkort (EU-fakturering tillgänglig)",
  ],
  steps: [
    {
      title: "Skapa konto på La Plateforme",
      description:
        "Gå till console.mistral.ai och registrera dig. Mistral är franskt och har serverhantering inom EU — om dataresidens är viktigt för dig är detta en stor fördel jämfört med amerikanska leverantörer.",
    },
    {
      title: "Aktivera billing",
      description:
        "Gå till 'Billing' och lägg till ett kort. Mistral erbjuder en gratis-tier för utveckling, men för produktion behöver du paid tier. Sätt en månadsgräns direkt.",
    },
    {
      title: "Skapa en API-nyckel",
      description:
        "Under 'API Keys' — skapa nyckel, kopiera, spara. Standardförfarande.",
    },
    {
      title: "Ditt första API-anrop",
      description:
        "Mistral API är OpenAI-kompatibelt — många bibliotek fungerar direkt om du byter URL och nyckel. Annars använd Mistral SDK.",
      code: `// npm install @mistralai/mistralai
import MistralClient from "@mistralai/mistralai";
const client = new MistralClient(process.env.MISTRAL_API_KEY);

const res = await client.chat({
  model: "mistral-small-latest",
  messages: [{ role: "user", content: "Hej! Skriv en kort välkomsttext." }],
});
console.log(res.choices[0].message.content);`,
    },
    {
      title: "Bygg och deploya",
      description:
        "Eftersom Mistral är OpenAI-kompatibelt kan du återanvända samma backend-kod om du redan har en OpenAI-integration. Byt bara endpoint till api.mistral.ai/v1 och API-nyckel.",
    },
  ],
  costTips: [
    "Mistral Small är prisledare ($0,10/$0,30 per Mtok) — använd den för all volym-tung användning där du inte specifikt behöver Large.",
    "Mistral Large är 5–8× dyrare än Small. Bara värt det för komplexa resonemang eller djup kodning.",
    "Mistral har inte lika utvecklat prompt caching som Anthropic/OpenAI. Optimera istället genom att hålla promtar korta.",
    "GDPR-fördel: Mistral processar data inom EU. För svenska B2B-kunder kan detta vara avgörande för avtal.",
    "Övervaka via Console → Usage. Sätt budget-alert vid 50 % av månadsbudget.",
  ],
  commonMistakes: [
    "Använda Mistral Large för uppgifter där Small räcker — testa alltid Small först.",
    "Anta att svenska språkkvalitet är samma som engelska. Mistral är bra på svenska men inte lika starkt som Claude.",
    "Förvänta sig multimodalt stöd som GPT-4o. Mistral fokuserar på text — för bild/ljud, välj annan leverantör.",
    "Glömma att Mistral har egen takt på modelluppdateringar — modellnamn ändras oftare än hos OpenAI.",
  ],
  resources: [
    { label: "Mistral La Plateforme", url: "https://console.mistral.ai" },
    { label: "Officiell prislista", url: "https://mistral.ai/technology/#pricing" },
    { label: "API-dokumentation", url: "https://docs.mistral.ai" },
    { label: "Status & uptime", url: "https://status.mistral.ai" },
  ],
};
