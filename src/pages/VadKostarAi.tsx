import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { SubscriptionTable } from "../components/SubscriptionTable";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI per månad för en privatperson?",
    answer:
      "De flesta AI-tjänster för privatbruk kostar 0–209 kr per månad. ChatGPT Plus, Claude Pro och Gemini Advanced kostar alla ca 209 kr/mån (20 USD). Det finns också gratis versioner med begränsad åtkomst — ChatGPT, Claude och Gemini erbjuder alla gratisalternativ. GitHub Copilot är billigare på ca 105 kr/mån och passar bäst för utvecklare.",
  },
  {
    question: "Är det värt att betala för ChatGPT Plus?",
    answer:
      "ChatGPT Plus ger tillgång till GPT-4o, bildgenerering via DALL·E, webbsökning och kodkörning. Om du använder AI dagligen för arbete eller studier är 209 kr/mån ofta lönsamt — det motsvarar under 10 kr per arbetsdag. Gratisversionen har hastighetsbegränsningar och ger inte tillgång till GPT-4o fullt ut.",
  },
  {
    question: "Hur mycket kostar AI för ett litet företag?",
    answer:
      "För ett team på 5 personer med abonnemang (ChatGPT Plus eller Claude Pro) landar kostnaden på 1 000–1 100 kr/mån. Väljer ni istället att bygga en intern AI-assistent via API kan kostnaden vara lägre — ett team som använder GPT-4o API med 20 anrop/dag och 5 användare kostar typiskt 100–200 kr/mån. Fyll i era siffror i kalkylatorn på startsidan för ett exakt svar.",
  },
  {
    question: "Vad skiljer abonnemang och API?",
    answer:
      "Abonnemang (ChatGPT Plus, Claude Pro etc.) ger dig tillgång till ett färdigt chattgränssnitt för en fast månadsavgift. API är för dig som bygger egna applikationer — du betalar per token (textbit) som bearbetas, och det finns inget fast pris. API är ofta billigare för låg volym men kräver teknisk kompetens att integrera.",
  },
  {
    question: "Finns det gratis AI-alternativ som fungerar bra?",
    answer:
      "Ja. ChatGPT (utan Plus), Claude.ai och Gemini erbjuder alla gratis tier med god förmåga. För den som inte använder AI intensivt räcker ofta gratisversionen. Begränsningarna brukar vara: hastighetsgränser, äldre modell, begränsat antal meddelanden per dag. DeepSeek V3 är ett open-source-alternativ du kan köra gratis via deras webbapp.",
  },
];

export function VadKostarAi() {
  return (
    <>
      <SEO
        title="Vad kostar AI? Komplett prisguide 2026 — ChatGPT, Claude, Gemini"
        description="Komplett guide till AI-kostnader 2026. Jämför ChatGPT Plus, Claude Pro och Gemini Advanced. Se vad AI kostar per månad för privatpersoner, team och företag."
        canonical="/vad-kostar-ai"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Vad kostar AI?", url: "https://aikostnad.se/vad-kostar-ai" },
      ]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Vad kostar AI? Prisguide 2026
          </h1>

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              AI-priset beror helt på hur du använder det. En privatperson som chattar med
              ChatGPT betalar 0–209 kr i månaden. En webbshop med automatisk kundtjänst
              kan betala 500–5 000 kr — eller nästan ingenting om de väljer rätt modell.
              Den här guiden reder ut vad som faktiskt driver kostnaden.
            </p>
            <p>
              Det finns två huvudspår: <strong>fasta abonnemang</strong> och{" "}
              <strong>API-prissättning per token</strong>. Abonnemang passar privatpersoner
              och team som vill ha ett färdigt verktyg. API passar dig som bygger egna
              applikationer och vill betala exakt för vad du använder.
            </p>
            <p>
              Nedan ser du de populäraste fasta abonnemangen. Vill du räkna på API-kostnader
              för en specifik modell hittar du en detaljkalkylator på{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                startsidan
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mb-12">
          <SubscriptionTable />
        </div>

        <div className="mb-10 card bg-gray-50 border-gray-200">
          <h2 className="text-base font-bold text-gray-900 mb-3">
            Tre saker som påverkar AI-kostnaden mest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Val av modell</p>
              <p className="text-gray-500 leading-relaxed">
                GPT-4o mini och Claude Haiku är 10–50× billigare än
                flaggskeppsmodellerna. Välj rätt modell för uppgiften.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Textlängd</p>
              <p className="text-gray-500 leading-relaxed">
                Längre kontext och längre svar driver kostnaden. Kortare,
                precisare prompts sparar ofta 30–50 %.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Volym</p>
              <p className="text-gray-500 leading-relaxed">
                10 anrop/dag är knappt märkbart. 10 000 anrop/dag kräver
                noggrann modelloptimering.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">AI-kostnad per användarprofil</h2>
          <p>
            Generella siffror är svåra att tolka utan kontext. Här är vad olika typer av
            användare i Sverige faktiskt betalar för AI per månad 2026:
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Privatperson — 50–200 kr/mån</h3>
          <p>
            Vanligaste valet är ett konsumentabonnemang: <strong>ChatGPT Plus</strong>,{" "}
            <strong>Claude Pro</strong> eller <strong>Gemini Advanced</strong> (alla
            ca 209 kr/mån) ger tillgång till deras toppmodell, webbsökning och
            bildgenerering. För enstaka frågor räcker gratisversionerna långt — de
            har begränsningar i hastighet men inte i kvalitet.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Frilansare och soloprenörer — 200–500 kr/mån</h3>
          <p>
            En frilansare som skriver texter, analyserar dokument och svarar på mejl
            med AI-stöd kommer ut på 200–500 kr/mån. Ofta lägre via API än via
            abonnemang om volymen är låg. GPT-4o eller Claude Sonnet räcker för 95 %
            av uppgifterna. Tips: prova en månad abonnemang först — om du upptäcker
            att du sällan slår taket är API troligen billigare.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Småföretag (5–10 personer) — 1 000–2 000 kr/mån</h3>
          <p>
            Här lönar abonnemang sig fortfarande för individuell användning. Lägg till
            en intern AI-assistent via API (chatbot, dokumentassistent) och den totala
            AI-budgeten landar i spannet 1 000–2 000 kr/mån. Se vår{" "}
            <Link to="/ai-chatbot-kostnad" className="text-indigo-600 hover:underline">chatbot-kostnadsguide</Link>{" "}
            för konkreta API-exempel.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Mellanstort företag (50–100 personer) — 3 000–10 000 kr/mån</h3>
          <p>
            Avancerad användning kräver kombinationen abonnemang + API + eventuellt
            enterprise-avtal. Företagsversioner av ChatGPT och Claude (ca 25 USD/användare
            /månad) erbjuder admin-funktioner och säkerhetscertifieringar — SOC 2, GDPR-DPA
            etc. Räkna med att 60–70 % av budgeten går till abonnemang och resten till
            API-driven automation.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Stort företag — 10 000+ kr/mån</h3>
          <p>
            Enterprise-avtal med volymrabatter, eventuell custom training, och dedikerad
            support. Här lönar det sig att förhandla direkt med leverantörerna — listpriser
            är ofta 30–50 % över verkligt avtalspris vid stora volymer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Tre faktorer som äter AI-budgeten</h2>
          <ol>
            <li>
              <strong>Långa svar.</strong> Output är 4× dyrare än input per token. En bot
              som svarar i 500 ord när 150 räcker dubblar din output-kostnad. Be modellen
              vara koncis — det är gratis besparing.
            </li>
            <li>
              <strong>Onödig kontext.</strong> Att klistra in hela PDF:en när bara två
              sidor behövs är slöseri. Använd RAG (retrieval) för att hämta in bara den
              relevanta delen — kan sänka kostnaden med 70–90 % för dokumentanalys.
            </li>
            <li>
              <strong>Fel modell för uppgiften.</strong> Att använda Claude Opus eller
              GPT-4.1 för att klassificera supportärenden är som att hyra Formula 1-bil
              för pendling. Använd <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">mini-modeller</Link>{" "}
              där de räcker.
            </li>
          </ol>
        </section>

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-kostnader" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/billigaste-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Billigaste AI 2026
            </p>
            <p className="text-xs text-gray-500">
              Vilket AI-verktyg ger mest för pengarna? Jämförelse per användningsfall.
            </p>
          </Link>
          <Link to="/vad-kostar-chatgpt" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Vad kostar ChatGPT?
            </p>
            <p className="text-xs text-gray-500">
              Detaljguide och kalkylator för GPT-4o API-kostnader.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
