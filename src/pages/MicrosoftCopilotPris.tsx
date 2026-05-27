import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { PriceOfferSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Microsoft 365 Copilot per användare?",
    answer:
      "Microsoft 365 Copilot kostar 30 USD per användare och månad (cirka 330 kr/användare/mån i 2026), med årsavtal. Det är tillägg ovanpå en befintlig Microsoft 365-licens (Business Standard, Business Premium, E3 eller E5). En kund med 50 anställda betalar alltså 16 500 kr/månad eller cirka 198 000 kr/år bara för Copilot-tillägget.",
  },
  {
    question: "Vad är skillnaden mellan Copilot Pro och Microsoft 365 Copilot?",
    answer:
      "Copilot Pro (20 USD/mån, ~210 kr/mån) är för privatpersoner och ger Copilot inuti Word, Excel, PowerPoint och Outlook samt prioriterad åtkomst till GPT-4 i copilot.microsoft.com. Microsoft 365 Copilot (30 USD/mån, ~330 kr/mån) är företagsversionen — den har samma funktioner plus integration mot din organisations data (SharePoint, Teams-chattar, mejl) via Microsoft Graph och företagsgrade säkerhet och GDPR-DPA.",
  },
  {
    question: "Hur mycket kostar GitHub Copilot?",
    answer:
      "GitHub Copilot Individual kostar 10 USD/mån (~105 kr/mån) för privata utvecklare. GitHub Copilot Business kostar 19 USD/användare/mån (~200 kr/användare/mån) för team. GitHub Copilot Enterprise kostar 39 USD/användare/mån (~410 kr/användare/mån) och inkluderar anpassning mot din egen kodbas. Det är separat från Microsoft 365 Copilot — du behöver båda om du vill ha både kontors-AI och kod-AI.",
  },
  {
    question: "Är Microsoft Copilot dyrare än ChatGPT eller Claude?",
    answer:
      "Per användare ligger M365 Copilot (330 kr/mån) ungefär 50 % över ChatGPT Plus (210 kr/mån) och Claude Pro (210 kr/mån). Men Copilot inkluderar något ingen av de andra gör: djup integration mot din organisations egen data via Microsoft Graph. För ett bolag som redan kör Microsoft 365 är merkostnaden ofta värd det. Använder du inte M365 — välj ChatGPT eller Claude.",
  },
  {
    question: "Vem ska välja Copilot Studio?",
    answer:
      "Copilot Studio (tidigare Power Virtual Agents) är Microsofts lågkod-verktyg för att bygga egna AI-agenter mot er data. Det kostar 200 USD/månad för 25 000 meddelanden, eller via pay-as-you-go vid 0,01 USD per meddelande. Det är bäst för IT-team som vill bygga AI-bottar (HR-bot, IT-support-bot) utan utveckling. Kräver Microsoft 365 och hör hemma i större organisationer.",
  },
  {
    question: "Finns det en gratisversion av Copilot?",
    answer:
      "Ja. Copilot Free (tidigare Bing Chat) i copilot.microsoft.com är gratis och inkluderar GPT-4-baserad chatt, bildgenerering med DALL-E 3 (med daglig kvot) och webbsökning. Begränsningen är att du inte får integration mot dina egna Office-dokument eller företagsdata — för det krävs Pro eller M365 Copilot. För många privatpersoner räcker gratisversionen.",
  },
];

export function MicrosoftCopilotPris() {
  return (
    <>
      <SEO
        title="Microsoft Copilot pris 2026 — M365 Copilot, Copilot Pro, GitHub Copilot"
        description="Vad kostar Microsoft Copilot 2026? Komplett guide till alla varianter — Copilot Free, Pro, Microsoft 365 Copilot, GitHub Copilot och Copilot Studio i SEK."
        canonical="/microsoft-copilot-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Microsoft Copilot pris", url: "https://aikostnad.se/microsoft-copilot-pris" },
      ]} />
      <ArticleSchema article={articles["microsoft-copilot-pris"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="Microsoft Copilot — abonnemang och företagslicenser"
        description="Microsoft Copilot pris 2026: Copilot Free, Copilot Pro, Microsoft 365 Copilot, GitHub Copilot Individual/Business/Enterprise — alla priser i SEK."
        brand="Microsoft"
        url="https://aikostnad.se/microsoft-copilot-pris"
        offers={[
          { name: "Copilot Free", priceSek: 0, description: "Gratis i copilot.microsoft.com — GPT-4, DALL-E 3 begränsad" },
          { name: "Copilot Pro", priceSek: 210, description: "Privatperson — Copilot i Word, Excel, PowerPoint, Outlook" },
          { name: "GitHub Copilot Individual", priceSek: 105, description: "Privat utvecklare — AI-kodning i IDE" },
          { name: "GitHub Copilot Business", priceSek: 200, description: "Per användare/mån — team-fokuserad AI-kodning" },
          { name: "Microsoft 365 Copilot", priceSek: 330, description: "Per användare/mån — företag, Graph-integration" },
          { name: "GitHub Copilot Enterprise", priceSek: 410, description: "Per användare/mån — anpassning mot egen kodbas" },
          { name: "Copilot Studio", priceSek: 2100, description: "Per månad — bygg egna AI-agenter, 25 000 meddelanden" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Microsoft Copilot pris 2026 — Microsoft 365 Copilot, Copilot Pro och GitHub Copilot
          </h1>

          <LastUpdated date={articles["microsoft-copilot-pris"].modifiedDate} />

          <TLDR
            question="Vad kostar Microsoft Copilot?"
            answer={
              <>
                Microsoft har sju (!) olika Copilot-varianter. De vanligaste:{" "}
                <strong>Microsoft 365 Copilot 330 kr/användare/mån</strong> (företag),{" "}
                <strong>Copilot Pro 210 kr/mån</strong> (privat),{" "}
                <strong>GitHub Copilot 105 kr/mån</strong> (privat utvecklare). Det finns även en gratisversion.
              </>
            }
            bullets={[
              "Copilot Free: 0 kr — GPT-4 i webbläsaren",
              "Copilot Pro: 210 kr/mån (privat, i Office-appar)",
              "GitHub Copilot Individual: 105 kr/mån",
              "GitHub Copilot Business: 200 kr/användare/mån",
              "Microsoft 365 Copilot: 330 kr/användare/mån (företag)",
              "GitHub Copilot Enterprise: 410 kr/användare/mån",
              "Copilot Studio: 2 100 kr/mån (25 000 meddelanden)",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Microsofts Copilot-portfölj är 2026 den mest spretiga AI-prisstrukturen på marknaden.
              Det finns minst sju olika varianter — Copilot Free, Copilot Pro, Microsoft 365 Copilot,
              GitHub Copilot Individual/Business/Enterprise, plus Copilot Studio för att bygga egna
              agenter. Den här guiden gör ordning på allihop.
            </p>
            <p>
              Snabb sammanfattning: <strong>Privatperson?</strong> Börja med Copilot Free och uppgradera
              till Copilot Pro (210 kr/mån) om du vill ha AI inuti Word, Excel och PowerPoint.{" "}
              <strong>Utvecklare?</strong> GitHub Copilot (105 kr/mån) är en självklarhet.{" "}
              <strong>Företag på Microsoft 365?</strong> M365 Copilot (330 kr/användare/mån) ger
              integration mot er egen data — det är där Copilot på riktigt sticker ut mot{" "}
              <Link to="/vad-kostar-chatgpt" className="text-indigo-700 hover:underline">ChatGPT</Link>{" "}
              och <Link to="/claude-pris" className="text-indigo-700 hover:underline">Claude</Link>.
            </p>
            <p>
              För ett bolag med 50 anställda kostar M365 Copilot cirka <strong>198 000 kr/år</strong> —
              en betydande summa, men för organisationer som redan är djupt inne i Microsoft-ekosystemet
              är det ofta mer värt än att bygga motsvarande lösning från grunden. Se vår guide om{" "}
              <Link to="/ai-for-foretag" className="text-indigo-700 hover:underline">AI för företag</Link>{" "}
              för en bredare jämförelse av enterprise-AI.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Alla Copilot-varianter — vad är vad?</h2>

          <h3 className="text-lg font-bold text-gray-900 mt-6">1. Copilot Free (0 kr)</h3>
          <p>
            Gratis på <code>copilot.microsoft.com</code>. Hette tidigare Bing Chat. Bygger på GPT-4
            men med begränsad volym. Inkluderar bildgenerering med DALL-E 3 (begränsad daglig kvot)
            och webbsökning. Bra för spontana frågor och bilder, men du saknar integration mot Office
            och dina egna dokument.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">2. Copilot Pro (210 kr/mån)</h3>
          <p>
            Privatpersoners "Pro"-variant. Ger:
          </p>
          <ul>
            <li>AI inbäddad i Word, Excel, PowerPoint, Outlook och OneNote (kräver Microsoft 365-prenumeration)</li>
            <li>Prioriterad åtkomst till de senaste GPT-modellerna även vid topptider</li>
            <li>100 Designer-boosts per dag (snabbare bildgenerering)</li>
            <li>Tillgång till Copilot GPTs (anpassade chattbottar)</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">3. Microsoft 365 Copilot (330 kr/användare/mån)</h3>
          <p>
            Företagsversionen. Kräver befintlig M365-licens (Business Standard, Business Premium,
            E3 eller E5). Det stora värdet är <strong>Microsoft Graph-integration</strong>:
          </p>
          <ul>
            <li>Copilot ser och förstår era SharePoint-dokument, Teams-chattar, mejl och kalender</li>
            <li>Du kan fråga: "sammanfatta mötet med Acme i förra veckan" eller "skriv ett mejl till Anna baserat på vår produktstrategi"</li>
            <li>Företags-grade säkerhet, GDPR-DPA, EU-datalagring</li>
            <li>Compliance med era Microsoft 365-policys (DLP, sensitivity labels)</li>
          </ul>
          <p>
            Minimivolym brukar vara 300 användare för enterprise-avtal, men många återförsäljare säljer
            det utan minimum till mindre kunder.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">4. GitHub Copilot Individual (105 kr/mån)</h3>
          <p>
            AI-assistent i din IDE (VS Code, Visual Studio, JetBrains, Neovim). Föreslår kodrader,
            skapar tester, förklarar kod, gör code review. Inkluderar GPT-4 och Claude som
            underliggande modeller. För privat utvecklare 10 USD/mån eller 100 USD/år.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">5. GitHub Copilot Business (200 kr/användare/mån)</h3>
          <p>
            Team-versionen. Lägger till:
          </p>
          <ul>
            <li>Organisationskontroll (proxy, policys, audit)</li>
            <li>Säkerhetsfilter — undviker att föreslå kod från publik kodbas med osäker licens</li>
            <li>Ingen data används för att träna modellen</li>
            <li>SAML SSO</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">6. GitHub Copilot Enterprise (410 kr/användare/mån)</h3>
          <p>
            Allt i Business plus:
          </p>
          <ul>
            <li>Anpassning mot er egen kodbas (Copilot förstår era interna API:er och konventioner)</li>
            <li>Copilot Chat in GitHub.com — diskutera pull requests och issues med AI</li>
            <li>Knowledge bases — låt Copilot referera till intern dokumentation</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">7. Copilot Studio (2 100 kr/mån)</h3>
          <p>
            Lågkod-plattform för att bygga egna AI-agenter. Inkluderar 25 000 meddelanden per månad,
            därefter pay-as-you-go på 0,01 USD per meddelande. Används för att bygga interna botar
            (HR-bot som svarar på personalfrågor, IT-support-bot, säljbot mot CRM).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Microsoft Copilot vs ChatGPT vs Claude — prisjämförelse</h2>
          <p>
            För en privatperson som vill ha en kontors-AI ser jämförelsen ut så här:
          </p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Tjänst</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Pris/mån</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Vad du får</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">ChatGPT Plus</td>
                  <td className="p-3">210 kr</td>
                  <td className="p-3 text-gray-600">GPT-4o, GPT-4.1, bildgenerering, Custom GPTs</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Claude Pro</td>
                  <td className="p-3">210 kr</td>
                  <td className="p-3 text-gray-600">Claude Sonnet 4.6, Projects, högre limits</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Copilot Pro</td>
                  <td className="p-3">210 kr</td>
                  <td className="p-3 text-gray-600">GPT-4 i Word/Excel/PowerPoint/Outlook, DALL-E 3 boosts</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="p-3 font-medium">M365 Copilot (företag)</td>
                  <td className="p-3 font-semibold">330 kr/användare</td>
                  <td className="p-3 text-gray-600">Allt ovan + Graph-integration mot er Microsoft-data</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            För privatpersoner är priserna nästan identiska. Skillnaden är: <strong>Copilot Pro</strong> är
            bäst om du lever i Office, <strong>ChatGPT Plus</strong> är bäst för bred AI-användning och
            bildgenerering, <strong>Claude Pro</strong> är bäst för skrivande och kod.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Vem ska välja Microsoft 365 Copilot?</h2>
          <p>
            M365 Copilot är värt 330 kr/användare/mån om:
          </p>
          <ul>
            <li>Ni redan kör Microsoft 365 (Word, Excel, Outlook, Teams) som primär plattform</li>
            <li>Ni har minst 10 anställda — under det blir det dyrt per person</li>
            <li>Ni har strukturerad data i SharePoint som AI kan referera till</li>
            <li>Ni vill undvika att data lämnar Microsoft-molnet (GDPR, branschkrav)</li>
            <li>Ni har en IT-funktion som kan driva utrullning och utbildning</li>
          </ul>
          <p>
            Skippa M365 Copilot och välj ChatGPT Team (250 kr/användare/mån) eller Claude Team
            (315 kr/användare/mån) om: ni inte är djupt inne i Microsoft, ni är ett litet team
            (under 10), eller ni främst vill ha generell AI snarare än integration mot egen data.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">ROI-räkning för M365 Copilot</h2>
          <p>
            Microsoft hävdar att M365 Copilot sparar ca 30 minuter per dag per kunskapsarbetare.
            Räkneövning för en svensk kund med 50 anställda och genomsnittslön 50 000 kr/mån
            (~400 kr/timme i arbetsgivarkostnad):
          </p>
          <div className="not-prose bg-green-50 border border-green-100 rounded-xl p-5 my-4">
            <ul className="text-sm space-y-2 text-gray-700">
              <li><strong>Kostnad:</strong> 50 × 330 kr/mån = <strong>16 500 kr/månad</strong></li>
              <li><strong>Sparad tid:</strong> 30 min/dag × 22 dagar × 50 personer = 550 timmar/månad</li>
              <li><strong>Värdet av sparad tid:</strong> 550 × 400 kr = <strong>220 000 kr/månad</strong></li>
              <li><strong>Break-even:</strong> Copilot behöver bara ge ca 2 minuters tidsbesparing per dag/person</li>
            </ul>
          </div>
          <p>
            Verkligheten är att tidsbesparingen sällan är jämnt fördelad — den landar främst hos personer
            som hanterar mycket mejl, möten och dokumentskapande. Räkna med att 20–30 % av användarna
            får mest värde och resten knappt använder det. Vår rekommendation: börja med ett pilotteam på
            5–10 personer i tre månader innan ni rullar ut brett.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["microsoft-copilot-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om Microsoft Copilot priser" />

        <Sources items={officialPricingSources} />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Vill du jämföra Copilot mot andra AI-alternativ?{" "}
            <Link to="/vad-kostar-ai" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              Se den kompletta AI-prisguiden
            </Link>{" "}
            eller{" "}
            <Link to="/ai-for-foretag" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              läs om AI för svenska företag
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
