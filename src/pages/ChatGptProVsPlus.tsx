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
import { openAISources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad är skillnaden mellan ChatGPT Plus och Pro?",
    answer:
      "ChatGPT Plus (20 USD/mån, ~210 kr) ger tillgång till GPT-4o, GPT-4.1, o3-mini, bildgenerering med DALL-E 3, custom GPTs, röst och webbläsning. ChatGPT Pro (200 USD/mån, ~2 100 kr) lägger till obegränsad åtkomst till o3 (full reasoning-modell), o3 pro mode (ännu djupare resonemang), obegränsad Sora-video, betydligt högre limits på alla modeller och tidigare åtkomst till nya features. För 95 % av användarna räcker Plus.",
  },
  {
    question: "Är ChatGPT Pro värt 200 dollar i månaden?",
    answer:
      "För de flesta — nej. Pro är värt det om du: (1) använder o3 dagligen för djup analys eller kodning, (2) skapar mycket video med Sora, (3) når dagliga limits på Plus, eller (4) använder ChatGPT i ditt yrke och tjänar in priset på en handfull timsbesparingar. För studenter, hobbyanvändare och de flesta kontorsarbetare räcker Plus.",
  },
  {
    question: "Vilka modeller får jag på Plus respektive Pro?",
    answer:
      "Plus ger: GPT-4o, GPT-4.1, o3-mini, o4-mini, GPT-4o image generation, DALL-E 3, Advanced Voice. Pro ger allt detta plus: o3 (full reasoning), o3 pro mode (förstärkt reasoning för riktigt svåra problem), obegränsad Sora-video, tidig åtkomst till nya modeller (Pro-användare fick t.ex. GPT-5 först), högre messages/dag-limits, prioriterad åtkomst vid topptider.",
  },
  {
    question: "När ska jag uppgradera till Team eller Business istället?",
    answer:
      "ChatGPT Team (25 USD/användare/mån, ~263 kr) är bra för team på 2+ personer — ger delad arbetsyta, längre kontexter och privata Custom GPTs. ChatGPT Business (60 USD/användare/mån) lägger till SSO, audit logs och avancerad admin. ChatGPT Enterprise är custom-prissatt och inkluderar GPT-4 Turbo med 128K kontext, SOC 2 Type 2, dedikerat support och datalagringskontroll. Om du driver ett företag — välj Team eller Business framför att alla har egna Plus.",
  },
  {
    question: "Kan jag växla mellan Plus och Pro?",
    answer:
      "Ja. Du kan uppgradera till Pro mitt i en månad (du betalar mellanskillnaden pro rata) och nedgradera när som helst — nedgraderingen träder i kraft vid nästa faktureringsperiod. Många användare gör så här: kör Plus normalt, men uppgraderar till Pro under intensiva projektmånader (t.ex. forskning, kodprojekt, videoproduktion) och nedgraderar igen efteråt.",
  },
  {
    question: "Hur mycket sparar jag med årsbetalning?",
    answer:
      "OpenAI erbjuder inte längre årsrabatt på Plus eller Pro privatabonnemang — de är månadsbaserade. Team-abonnemanget har dock en årsrabatt: 25 USD/användare/mån vid årsavtal mot 30 USD/användare/mån vid månadsbetalning, alltså ca 17 % besparing. För Enterprise gäller anpassade årsavtal med ofta större rabatter vid längre commitments.",
  },
];

export function ChatGptProVsPlus() {
  return (
    <>
      <SEO
        title="ChatGPT Pro vs Plus 2026 — vilken är värd 200 dollar i månaden?"
        description="ChatGPT Plus (20 dollar) eller Pro (200 dollar)? Komplett jämförelse av funktioner, modeller, limits och vem som faktiskt får valuta för Pro-priset 2026."
        canonical="/chatgpt-pro-vs-plus"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "ChatGPT Pro vs Plus", url: "https://aikostnad.se/chatgpt-pro-vs-plus" },
      ]} />
      <ArticleSchema article={articles["chatgpt-pro-vs-plus"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="ChatGPT — Plus, Pro, Team och Business"
        description="ChatGPT abonnemangsjämförelse 2026: Plus 20 USD/mån, Pro 200 USD/mån, Team 25 USD/användare/mån, Business 60 USD/användare/mån — i SEK."
        brand="OpenAI"
        url="https://aikostnad.se/chatgpt-pro-vs-plus"
        offers={[
          { name: "ChatGPT Free", priceSek: 0, description: "Begränsad GPT-4o-åtkomst, basversion" },
          { name: "ChatGPT Plus", priceSek: 210, description: "Privat — GPT-4o, GPT-4.1, o3-mini, DALL-E 3" },
          { name: "ChatGPT Team", priceSek: 263, description: "Per användare/mån vid årsavtal" },
          { name: "ChatGPT Business", priceSek: 630, description: "Per användare/mån — SSO, audit, admin" },
          { name: "ChatGPT Pro", priceSek: 2100, description: "Privat — obegränsad o3, Sora, högre limits" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            ChatGPT Pro vs Plus 2026 — vilken är värd 200 dollar i månaden?
          </h1>

          <LastUpdated date={articles["chatgpt-pro-vs-plus"].modifiedDate} />

          <TLDR
            question="Är ChatGPT Pro värt pengarna?"
            answer={
              <>
                <strong>ChatGPT Plus (210 kr/mån)</strong> räcker för ca <strong>95 % av användarna</strong>.{" "}
                <strong>ChatGPT Pro (2 100 kr/mån)</strong> är värt det bara om du använder o3 dagligen,
                gör mycket Sora-video eller är en heavy power user med långa research-uppgifter och
                stora kodprojekt.
              </>
            }
            bullets={[
              "ChatGPT Free: 0 kr — begränsad GPT-4o",
              "ChatGPT Plus: 210 kr/mån (20 USD)",
              "ChatGPT Pro: 2 100 kr/mån (200 USD) — 10× dyrare",
              "Pro ger: obegränsad o3, Sora-video, högre limits",
              "Team: 263 kr/användare/mån (för 2+ personer)",
              "Business: 630 kr/användare/mån (SSO, admin)",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              När OpenAI lanserade <strong>ChatGPT Pro</strong> i december 2024 var det en chock för
              många: 200 USD i månaden, tio gånger Plus-priset. Frågan som följt sedan dess är enkel —
              är det värt det? Den här guiden ger ett rakt svar baserat på vad du faktiskt får.
            </p>
            <p>
              Det korta svaret: <strong>För de flesta — nej.</strong> ChatGPT Plus räcker till 95 % av
              all användning. Pro är värt det bara om du tillhör en av fyra power user-grupper:
              forskare som kör o3 dagligen, kodare som behöver djup reasoning, kreatörer som producerar
              mycket Sora-video, eller proffsanvändare som når Plus dagliga limits.
            </p>
            <p>
              För svenska företag finns dessutom ett bättre alternativ för flera anställda — ChatGPT
              Team (263 kr/användare/mån) eller Business — som ger delad arbetsyta utan att betala 2 100 kr per
              person. Se vår guide om <Link to="/ai-for-foretag" className="text-indigo-600 hover:underline">AI för svenska företag</Link>{" "}
              för hela jämförelsen.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Prisjämförelse i SEK</h2>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Plan</th>
                  <th className="text-left p-3 font-semibold text-gray-900">USD/mån</th>
                  <th className="text-left p-3 font-semibold text-gray-900">SEK/mån</th>
                  <th className="text-left p-3 font-semibold text-gray-900">SEK/år</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">Free</td>
                  <td className="p-3">0 USD</td>
                  <td className="p-3">0 kr</td>
                  <td className="p-3">0 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Plus</td>
                  <td className="p-3">20 USD</td>
                  <td className="p-3">~210 kr</td>
                  <td className="p-3">~2 520 kr</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="p-3 font-medium">Pro</td>
                  <td className="p-3">200 USD</td>
                  <td className="p-3 font-semibold">~2 100 kr</td>
                  <td className="p-3 font-semibold">~25 200 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Team (per användare)</td>
                  <td className="p-3">25 USD</td>
                  <td className="p-3">~263 kr</td>
                  <td className="p-3">~3 156 kr</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Business (per användare)</td>
                  <td className="p-3">60 USD</td>
                  <td className="p-3">~630 kr</td>
                  <td className="p-3">~7 560 kr</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">Räknat med SEK/USD ≈ 10,50. Verklig kostnad varierar med valutakurs.</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Funktionsjämförelse — Plus vs Pro</h2>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Funktion</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Plus (210 kr)</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Pro (2 100 kr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">GPT-4o / GPT-4.1</td>
                  <td className="p-3 text-green-700">Ja</td>
                  <td className="p-3 text-green-700">Ja (högre limits)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">o3-mini, o4-mini</td>
                  <td className="p-3 text-green-700">Ja</td>
                  <td className="p-3 text-green-700">Ja (högre limits)</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="p-3 font-medium">o3 (full reasoning)</td>
                  <td className="p-3 text-gray-400">Nej</td>
                  <td className="p-3 text-green-700 font-semibold">Ja, obegränsat</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="p-3 font-medium">o3 pro mode</td>
                  <td className="p-3 text-gray-400">Nej</td>
                  <td className="p-3 text-green-700 font-semibold">Ja</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">DALL-E 3 bildgenerering</td>
                  <td className="p-3 text-green-700">Ja (limits)</td>
                  <td className="p-3 text-green-700">Ja (högre)</td>
                </tr>
                <tr className="bg-indigo-50">
                  <td className="p-3 font-medium">Sora (videogenerering)</td>
                  <td className="p-3 text-gray-600">50 videos/mån</td>
                  <td className="p-3 text-green-700 font-semibold">Obegränsat</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Advanced Voice</td>
                  <td className="p-3 text-green-700">Ja</td>
                  <td className="p-3 text-green-700">Ja (högre)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Custom GPTs</td>
                  <td className="p-3 text-green-700">Ja</td>
                  <td className="p-3 text-green-700">Ja</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Code Interpreter / Canvas</td>
                  <td className="p-3 text-green-700">Ja</td>
                  <td className="p-3 text-green-700">Ja</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Tidig åtkomst nya features</td>
                  <td className="p-3 text-gray-400">Nej</td>
                  <td className="p-3 text-green-700">Ja</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Prioriterad åtkomst vid topptider</td>
                  <td className="p-3 text-gray-400">Nej</td>
                  <td className="p-3 text-green-700">Ja</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Vem ska välja ChatGPT Pro?</h2>
          <p>
            Pro är värt 2 100 kr/mån om du tillhör en av dessa fyra grupper:
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">1. Forskare och analytiker som kör o3 dagligen</h3>
          <p>
            o3 (full reasoning-modellen) är dramatiskt starkare än o3-mini på komplex analys, matematik
            och flerstegsresonemang. Plus-användare har bara o3-mini och begränsad o3-tillgång; Pro ger
            obegränsad o3. Om du gör 20+ djupa research-frågor i veckan tjänar du in priset på sparad
            tid och bättre svar.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">2. Utvecklare och kodprojekt</h3>
          <p>
            o3 och särskilt o3 pro mode är bäst-i-klass på agentic coding och stora kod-refactors. För
            seniora utvecklare som hanterar komplexa kodbaser kan Pro vara värt det, men många väljer
            istället att kombinera Plus + Claude Pro + GitHub Copilot (totalt ~525 kr/mån) för att få
            tre verktygs styrkor.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">3. Sora-kreatörer</h3>
          <p>
            Sora (text-till-video) är begränsad på Plus till 50 generationer/månad i 720p. Pro ger
            obegränsade generationer i 1080p, längre videor och möjlighet att köra flera parallellt.
            För contentcreators och marknadsförare som gör video är det enda planet som faktiskt
            fungerar i produktionsskala.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">4. Heavy power users som når Plus-limits</h3>
          <p>
            Plus har dagliga och timbaserade limits på GPT-4o och o-modellerna. Om du regelbundet ser
            "you've hit your usage limit" är det ett tecken — Pro:s limits är 5–10× högre. Notera dock
            att OpenAI inte publicerar exakta tal för Pro-limits, men i praktiken når få användare dem.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">ROI-analys — när tjänar du in 2 100 kr/mån?</h2>
          <p>
            En enkel räkneövning: om Pro sparar dig 30 minuter per arbetsdag jämfört med Plus, och din
            tid värderas till 500 kr/timme, sparar du ca 250 kr/dag × 22 dagar = 5 500 kr/månad — mer
            än dubbelt så mycket som Pro kostar.
          </p>
          <p>
            Frågan är: <strong>sparar Pro faktiskt 30 minuter/dag för dig?</strong> För forskare,
            seniora utvecklare och kreatörer ofta ja. För kontorsarbetare som främst använder ChatGPT
            för mejl, sammanfattningar och brainstorming — nästan aldrig.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Alternativ — Team, Business och Enterprise</h2>
          <p>
            Om du driver ett företag finns smartare alternativ än individuella Pro-abonnemang:
          </p>

          <div className="not-prose space-y-4 my-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-900 mb-2">ChatGPT Team (263 kr/användare/mån, årsavtal)</h3>
              <p className="text-sm text-gray-700">
                För 2+ personer. Allt i Plus plus delad arbetsyta, högre limits, privata Custom GPTs,
                inga träningsdatautlämning. Vår rekommendation för de flesta små företag.
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-indigo-900 mb-2">ChatGPT Business (630 kr/användare/mån)</h3>
              <p className="text-sm text-gray-700">
                Lägger till SSO, audit logs, central admin och avancerad användarhantering. För
                medelstora företag med IT-funktion.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-purple-900 mb-2">ChatGPT Enterprise (custom pricing)</h3>
              <p className="text-sm text-gray-700">
                Skräddarsytt pris (typiskt 60+ USD/användare/mån vid 150+ användare). GPT-4 Turbo med
                128K kontext, SOC 2 Type 2, GDPR-DPA, dedikerad support, datalagringskontroll. För
                större bolag med compliance-krav.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Slutsats — vår rekommendation</h2>
          <p>
            <strong>Privatperson?</strong> Börja med Plus (210 kr/mån). Uppgradera bara till Pro om du
            konkret märker att du behöver mer o3 eller Sora.
          </p>
          <p>
            <strong>Frilansare / konsult?</strong> Plus räcker oftast. Komplettera med{" "}
            <Link to="/claude-pris" className="text-indigo-600 hover:underline">Claude Pro</Link> (210 kr)
            för specifika styrkor — totalt 420 kr/mån ger dig bredare verktyg än bara ChatGPT Pro till
            en femtedel av priset.
          </p>
          <p>
            <strong>Företag?</strong> Välj Team eller Business framför individuella Pro-abonnemang.
            263 kr/användare ger nästan allt en kontorsarbetare behöver.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["chatgpt-pro-vs-plus"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om ChatGPT Pro och Plus" />

        <Sources items={openAISources} />

        <div className="mt-12 card bg-indigo-50 border-indigo-100">
          <p className="text-sm text-indigo-800">
            Räkna ut vad du faktiskt skulle använda i tokens:{" "}
            <Link to="/vad-kostar-chatgpt" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              ChatGPT API-kalkylator
            </Link>{" "}
            eller{" "}
            <Link to="/chatgpt-vs-claude" className="font-semibold underline underline-offset-2 hover:text-indigo-900">
              jämför ChatGPT mot Claude
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
