import type { Guide } from "./types";

export const googleGuide: Guide = {
  providerId: "google",
  providerName: "Google AI",
  tagline: "Kom igång med Gemini API (Pro, Flash)",
  modelsCovered: ["Gemini 2.5 Pro", "Gemini 2.5 Flash"],
  whatYouLearn: [
    "Hur du skapar ett Google AI Studio-konto och en API-nyckel",
    "Hur du gör ditt första Gemini-anrop på 5 minuter",
    "När du ska välja Gemini Pro vs Flash",
    "Hur context caching fungerar hos Google",
    "Hur du undviker vanliga misstag",
  ],
  intro:
    "Google Gemini är ett starkt alternativ till OpenAI och Anthropic — särskilt om du redan är inne i Google-ekosystemet eller behöver multimodalt stöd. Gemini 2.5 Pro har upp till 1 miljon tokens kontextfönster och är gratis upp till en generös gräns via Google AI Studio.",
  prerequisites: [
    "Ett Google-konto (Gmail, Workspace eller liknande)",
    "Ett betalkort för billing om du vill överskrida gratis-tier",
  ],
  steps: [
    {
      title: "Gå till Google AI Studio",
      description:
        "Besök aistudio.google.com och logga in med ditt Google-konto. Du landar direkt i en lekplats där du kan testa Gemini utan att skriva en rad kod.",
    },
    {
      title: "Skapa en API-nyckel",
      description:
        "Klicka 'Get API key' uppe i menyn. Skapa ett nytt Google Cloud-projekt (eller välj ett befintligt). Kopiera nyckeln och spara säkert.",
    },
    {
      title: "Kontrollera billing-status",
      description:
        "Gemini API har en generös gratis-tier för utveckling och låg volym. För produktion: koppla billing-konto i Google Cloud Console. Sätt budget-alerts så du får mail om du närmar dig en gräns.",
    },
    {
      title: "Ditt första API-anrop",
      description:
        "Gemini SDK är tillgängligt för Python, Node.js, Go och Java. Här är ett minimalt exempel i Node.js. Modellnamnet 'gemini-2.5-flash' är snabbaste och billigaste valet.",
      code: `// npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const result = await model.generateContent("Hej! Skriv en kort välkomsttext.");
console.log(result.response.text());`,
    },
    {
      title: "Använd context caching för långa promtar",
      description:
        "Om du har en lång återanvänd kontext (t.ex. en PDF eller en hel kodbas) — skapa en CachedContent och referera till den. Du betalar bara reduced pris för den cachade delen, vilket sänker kostnaden för dokumentbaserade applikationer med 50–75 %.",
    },
  ],
  costTips: [
    "Använd Gemini 2.5 Flash som default — den är billig nog för de flesta volymer och tillräcklig för 80 % av uppgifterna.",
    "Reservera Gemini 2.5 Pro för uppgifter som kräver 200K+ kontextfönster eller djup resonemang.",
    "Aktivera context caching om din kontext är över 32K tokens och återanvänds — det är där det börjar löna sig.",
    "Övervaka via Google Cloud Console → Billing. Sätt budgetalarm vid 50 % och 90 % av månadsbudgeten.",
    "Använd Gemini API direkt istället för via Vertex AI om du inte behöver enterprise-features — det är enklare och billigare för småprojekt.",
  ],
  commonMistakes: [
    "Använda Gemini Pro för enkla uppgifter — Flash räcker och är 3–10× billigare.",
    "Glömma att Gemini har separata gratis-tier-gränser för Studio och paid API. Om du blandar dem kan det bli förvirrande vad som debiteras.",
    "Inte konfigurera safety settings när du bygger för en svensk publik — defaults kan blockera helt rimliga svar.",
    "Lägga prompten direkt i frontend-kod. Använd alltid en backend-proxy som med andra leverantörer.",
  ],
  resources: [
    { label: "Google AI Studio", url: "https://aistudio.google.com" },
    { label: "Officiell prislista", url: "https://ai.google.dev/pricing" },
    { label: "API-dokumentation", url: "https://ai.google.dev/docs" },
    { label: "Context caching-guide", url: "https://ai.google.dev/gemini-api/docs/caching" },
  ],
};
