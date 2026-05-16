import type { Guide } from "./types";

export const openaiGuide: Guide = {
  providerId: "openai",
  providerName: "OpenAI",
  tagline: "Kom igång med ChatGPT API (GPT-4o, GPT-4o mini, GPT-4.1)",
  modelsCovered: ["GPT-4o", "GPT-4o mini", "GPT-4.1", "GPT-4.1 mini"],
  whatYouLearn: [
    "Hur du skapar ett OpenAI-konto och en API-nyckel",
    "Hur du gör ditt första API-anrop på 5 minuter",
    "Hur tokens fungerar och hur du undviker att slösa pengar",
    "Hur du kopplar OpenAI till en webbsida eller egen applikation",
    "Hur du sätter en utgiftsgräns så notan aldrig överraskar",
  ],
  intro:
    "OpenAI är världens mest använda AI-leverantör. De gör ChatGPT, men de erbjuder också ett API som du kan koppla in i dina egna applikationer — chatbots, kundtjänst, content-generering, kodassistenter. Den här guiden tar dig från noll till första API-anrop på under 10 minuter.",
  prerequisites: [
    "En e-postadress",
    "Ett betalkort (du laddar med saldo, ingen prenumeration)",
    "Grundläggande förståelse för HTTP-anrop (om du tänker själv bygga något)",
  ],
  steps: [
    {
      title: "Skapa ett OpenAI-konto",
      description:
        "Gå till platform.openai.com och registrera dig med din e-post eller via Google/Microsoft. Detta är ett separat konto från ChatGPT — om du redan har ChatGPT Plus så fungerar samma inloggning här.",
    },
    {
      title: "Skapa en API-nyckel",
      description:
        "Gå till 'API keys' i menyn. Klicka 'Create new secret key', namnge nyckeln (t.ex. 'min-chatbot'), kopiera den och spara på säker plats. Du ser nyckeln bara EN gång — tappar du bort den får du skapa en ny.",
    },
    {
      title: "Ladda saldo (eller sätt up auto-recharge)",
      description:
        "Gå till 'Billing'. OpenAI använder prepaid-saldo — du laddar t.ex. 100 kr och förbrukar tills det är slut. För produktion: sätt upp auto-recharge så du inte tappar service mitt i en kampanj. För test: ladda 100 kr och se hur långt det räcker.",
    },
    {
      title: "Sätt en utgiftsgräns (viktigt!)",
      description:
        "Gå till 'Limits'. Sätt en hård månadsgräns på t.ex. 500 kr för att vara säker. Om din kod skulle ha en bugg som gör 100 000 anrop kommer OpenAI då stoppa anropen — inte tömma ditt kort. Detta är ditt skyddsnät.",
    },
    {
      title: "Ditt första API-anrop",
      description:
        "Använd vilket språk som helst — Python, JavaScript, curl. Här är ett minimalt exempel i Node.js. Modellnamnet 'gpt-4o-mini' är det billigaste valet för att börja.",
      code: `// npm install openai
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const res = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Hej! Skriv en kort välkomsttext." }],
});
console.log(res.choices[0].message.content);`,
    },
    {
      title: "Koppla till din webbsida eller app",
      description:
        "Anropa ALDRIG OpenAI API direkt från frontend — då exponeras din API-nyckel. Bygg en liten backend (Vercel Edge Function, Cloudflare Worker eller motsvarande) som tar emot frontend-anropet och vidarebefordrar det till OpenAI med din hemliga nyckel.",
    },
  ],
  costTips: [
    "Börja med gpt-4o-mini ($0,15/$0,60 per Mtok) — 17× billigare än gpt-4o med jämförbar kvalitet för enkla uppgifter.",
    "Sätt max_tokens på 200–300 om du inte specifikt behöver långa svar. Output är 4× dyrare än input.",
    "OpenAI cachar automatiskt prefix på minst 1024 tokens. Strukturera promten med statisk del först (system-prompt, dokument) för att maximera cache hit rate.",
    "Använd Batch API för icke-tidskritiska anrop — 50 % rabatt om du kan vänta upp till 24 timmar på svaret.",
    "Övervaka faktisk förbrukning via 'Usage'-dashboarden under den första veckan så du fångar oväntat höga kostnader tidigt.",
  ],
  commonMistakes: [
    "Använda gpt-4o för allt — i 80 % av fallen räcker gpt-4o-mini. Skillnaden i pris är dramatisk.",
    "Glömma att sätta utgiftsgräns. En enda buggig loop kan generera 10 000 anrop på en minut.",
    "Exponera API-nyckeln i frontend-koden. Allt på klienten kan läsas av användaren — kör alltid via backend.",
    "Skicka hela chatthistoriken vid varje anrop när bara senaste turnerna behövs. Tokens skalas linjärt med kontextlängden.",
  ],
  resources: [
    { label: "OpenAI Platform", url: "https://platform.openai.com" },
    { label: "Officiell prislista", url: "https://openai.com/api/pricing/" },
    { label: "API-dokumentation", url: "https://platform.openai.com/docs" },
    { label: "Status & uptime", url: "https://status.openai.com" },
  ],
};
