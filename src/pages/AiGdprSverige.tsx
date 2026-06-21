import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { Helmet } from "react-helmet-async";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Måste ett svenskt företag teckna DPA med OpenAI och Anthropic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, om ni behandlar personuppgifter via deras API. Alla tre stora leverantörer — OpenAI, Anthropic och Google — erbjuder databehandlingstillägg (DPA) som uppfyller GDPR-krav. DPA:n hittas under respektive leverantörs juridiska sidor. Viktigt: gratisversioner och konsumentabonnemang (ChatGPT Plus, Claude Pro) inkluderar normalt inte DPA.",
      },
    },
    {
      "@type": "Question",
      name: "Lagrar AI-leverantörer mitt företags data för träning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det beror på plan. API-kunder och enterprise-kunder med DPA har normalt garanti att data INTE används för modellträning. Konsumentplaner (ChatGPT Free, Claude.ai utan team-plan) kan använda konversationer för träning om du inte aktivt opt-outar. Kontrollera alltid den specifika planen och DPA:n.",
      },
    },
  ],
};

const faqs: FAQItem[] = [
  {
    question: "Måste ett svenskt företag teckna DPA med OpenAI och Anthropic?",
    answer:
      "Ja, om ni behandlar personuppgifter via deras API. Alla tre stora leverantörer — OpenAI, Anthropic och Google — erbjuder databehandlingstillägg (DPA). DPA:n reglerar hur personuppgifter behandlas och är ett krav under GDPR artikel 28. Viktigt: gratisversioner och konsumentabonnemang inkluderar normalt inte DPA — ni behöver minst API-åtkomst eller ett team/enterprise-avtal.",
  },
  {
    question: "Lagrar AI-leverantörer mitt företags data för träning?",
    answer:
      "Det beror på plan och inställningar. API-kunder hos OpenAI och Anthropic med DPA har normalt garanti om att data inte används för modellträning. Konsumentplaner kan använda konversationer för träning om du inte aktivt opt-outar. Kontrollera alltid den specifika planen. Google Cloud (Vertex AI) erbjuder starka garantier och är GDPR-certifierat.",
  },
  {
    question: "Kan vi använda ChatGPT för kundtjänst utan att bryta mot GDPR?",
    answer:
      "Ja, men med rätt avtalsstyrning. Ni behöver: (1) DPA med OpenAI, (2) instruera systemprompten att inte samla in onödiga personuppgifter, (3) informera kunder i er integritetspolicy om att AI används, (4) ha rutiner för att hantera rättighetsförfrågningar (radering, tillgång). ChatGPT Enterprise eller Teams ger starkast GDPR-stöd.",
  },
  {
    question: "Vilken AI-leverantör är bäst för GDPR-efterlevnad?",
    answer:
      "Alla stora leverantörer är GDPR-kompatibla med rätt avtal, men det finns skillnader. Microsoft Azure OpenAI och Google Cloud Vertex AI är ofta förstahandsval för stora svenska företag tack vare EU-datacenter och starka avtalsstöd. Anthropic Claude är populärt för sin dataminimering. Mistral AI är ett EU-baserat alternativ (Frankrike) utan transatlantisk datatransfer.",
  },
  {
    question: "Behöver vi uppdatera vår integritetspolicy om vi börjar använda AI?",
    answer:
      "Ja, om AI-verktyget behandlar personuppgifter som ni ansvarar för. Er integritetspolicy bör nämna: vilka AI-verktyg ni använder som personuppgiftsbiträden, vilken typ av data som behandlas, rättslig grund (samtycke, berättigat intresse, avtal), och hur länge data lagras. Datainspektionen (IMY) rekommenderar transparens om automatiserat beslutsfattande.",
  },
  {
    question: "Vad är Schrems II och påverkar det vår AI-användning?",
    answer:
      "Schrems II (2020) underkände Privacy Shield och försvårade EU-US datatransfer. Från 2023 ersätts det av EU-US Data Privacy Framework (DPF), under vilket OpenAI och Google är certifierade. Det innebär att datatransfer till dessa leverantörer igen är laglig under DPF-skyddet. Ni bör kontrollera att er leverantör är DPF-certifierad om ni hanterar känsliga personuppgifter.",
  },
];

const gdprSources = [
  {
    title: "IMY — Datainspektionen: AI och dataskydd",
    url: "https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-dataskyddsforordningen/ai/",
  },
  {
    title: "OpenAI Enterprise Privacy",
    url: "https://openai.com/enterprise-privacy/",
  },
  {
    title: "Anthropic Privacy Policy & DPA",
    url: "https://www.anthropic.com/legal/privacy",
  },
  {
    title: "EU-US Data Privacy Framework",
    url: "https://www.dataprivacyframework.gov/",
  },
  {
    title: "GDPR Artikel 28 — Personuppgiftsbiträden",
    url: "https://gdpr-info.eu/art-28-gdpr/",
  },
];

export function AiGdprSverige() {
  return (
    <>
      <SEO
        title="AI och GDPR för svenska företag 2026 — komplett guide"
        description="Vad gäller för GDPR när ni använder ChatGPT, Claude eller Gemini i Sverige? DPA, datatransfer, integritetspolicy och rättslig grund — komplett guide 2026."
        canonical="/ai-gdpr-sverige"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI och GDPR Sverige", url: "https://aikostnad.se/ai-gdpr-sverige" },
      ]} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <SpeakableSchema />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AI och GDPR för svenska företag 2026
          </h1>

          <LastUpdated date="2026-06-15" />

          <TLDR
            question="Kan svenska företag använda AI och ändå följa GDPR?"
            answer={
              <>
                Ja — med rätt avtal och rutiner. Nyckeln är att teckna ett <strong>databehandlingstillägg (DPA)</strong> med er AI-leverantör, använda enterprise- eller API-planer som garanterar att data inte tränar modeller, och informera era kunder om AI-användningen i er integritetspolicy. Konsumentplaner (<strong>ChatGPT Plus, Claude.ai</strong>) är generellt <em>inte</em> GDPR-kompatibla för affärsbruk.
              </>
            }
            bullets={[
              "DPA (databehandlingstillägg) krävs vid API-åtkomst med personuppgifter",
              "OpenAI, Anthropic och Google erbjuder alla DPA — men inte på gratisplaner",
              "EU-US Data Privacy Framework (2023) gör US-leverantörer lagliga igen",
              "Mistral AI (Frankrike) och Azure OpenAI EU är alternativ utan transatlantisk transfer",
              "Uppdatera er integritetspolicy att nämna AI-verktyg som personuppgiftsbiträden",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed mt-6">
            <p>
              GDPR och AI är ett ämne som orsakar onödig oro hos många svenska företag — men
              också verklig osäkerhet kring vad som faktiskt gäller. Den korta versionen: det
              finns inga hinder mot att använda moderna AI-verktyg i Sverige, men det kräver
              att ni väljer rätt plan, tecknar rätt avtal, och kommunicerar öppet med era
              kunder om hur AI används.
            </p>
            <p>
              Den här guiden täcker de fyra centrala frågorna: vilka avtal ni behöver, var data
              lagras och behandlas, hur ni hanterar rättighetsförfrågningar från kunder, och
              vilken leverantör som passar bäst för er specifika situation.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">DPA — det avtal alla glömmer</h2>
          <p>
            GDPR artikel 28 kräver att ni har ett skriftligt avtal med alla personuppgiftsbiträden
            — det vill säga alla externa parter som behandlar personuppgifter för er räkning.
            En AI-leverantör som ni skickar kunddata till är ett personuppgiftsbiträde, och
            ni behöver ett <strong>databehandlingstillägg (DPA)</strong> med dem.
          </p>
          <p>
            Den goda nyheten: OpenAI, Anthropic och Google erbjuder alla färdiga DPA som är
            GDPR-kompatibla. Den dåliga nyheten: DPA är normalt bara tillgänglig för
            betalande API-kunder och enterprise-kunder — inte för gratis- eller
            konsumentabonnemang.
          </p>
          <div className="not-prose space-y-3">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="font-semibold text-green-900 text-sm mb-2">Planer som inkluderar DPA</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>OpenAI API (betald) — DPA under "Privacy" på platform.openai.com</li>
                <li>ChatGPT Team ($25/användare/mån) och ChatGPT Enterprise</li>
                <li>Claude API (betald) — DPA under anthropic.com/legal</li>
                <li>Claude Team ($25/användare/mån) och Claude Enterprise</li>
                <li>Google Cloud Vertex AI — DPA via Google Cloud-avtalet</li>
                <li>Microsoft Azure OpenAI — DPA via Microsofts standardvillkor</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="font-semibold text-red-900 text-sm mb-2">Planer utan DPA — undvik för känslig data</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>ChatGPT Free och ChatGPT Plus (konsumentprodukt)</li>
                <li>Claude.ai Free och Claude.ai Pro (utan team-plan)</li>
                <li>Gemini Free (google.com/gemini, inte Workspace)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Datatransfer till USA — läget 2026</h2>
          <p>
            En av de vanligaste frågorna svenska juridikavdelningar ställer: är det lagligt
            att skicka data till amerikanska AI-leverantörer? Svaret 2026 är <strong>ja</strong>
            — med viktiga förbehåll.
          </p>
          <p>
            EU-US Data Privacy Framework (DPF), som trädde i kraft juli 2023, ersatte det
            ogiltiga Privacy Shield och skapade en ny mekanism för laglig EU-US datatransfer.
            OpenAI och Google är DPF-certifierade. Det innebär att datatransfer till dessa
            leverantörer är laglig under förutsättning att ni har ett DPA och att leverantören
            upprätthåller sin DPF-certifiering.
          </p>
          <p>
            Vill ni undvika transatlantisk datatransfer helt? Det finns starka alternativ.
            <strong> Microsoft Azure OpenAI</strong> kan konfigureras med EU-datacenter (Stockholm
            och Amsterdam ingår i tillgängliga regioner). <strong>Mistral AI</strong> är ett
            franskt bolag med EU-baserad infrastruktur. Båda alternativen innebär att data
            aldrig lämnar EU/EES.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Tränas AI-modeller på ert data?</h2>
          <p>
            En av de mest missförstådda frågorna. Det enkla svaret: med rätt plan, nej.
          </p>
          <p>
            Alla stora leverantörer garanterar i sina DPA att data som behandlas via API
            inte används för modellträning. Konkret innebär det att konversationer ni skickar
            via API, chatbotinteraktioner via ert egna system, och dokumentanalys via API
            inte återanvänds för att förbättra OpenAI:s eller Anthropics modeller.
          </p>
          <p>
            Konsumentplaner fungerar annorlunda. ChatGPT Free tillåter OpenAI att använda
            konversationer för förbättring av modeller om inte användaren aktivt opt-outar
            under Inställningar → Datakontroller. Claude.ai har liknande inställningar.
            Det är ett av skälen till att konsumentplaner inte passar för verksamhetskritisk
            datahantering.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Rättslig grund — vad ni behöver bestämma</h2>
          <p>
            GDPR kräver att all behandling av personuppgifter har en rättslig grund (artikel 6).
            För AI-användning i affärssammanhang är de vanligaste grunderna:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Avtalets fullgörande (6.1.b):</strong> Om AI-verktyget används för att
              leverera er tjänst till kunden — t.ex. automatiserad kundtjänst — kan detta
              ofta motiveras som nödvändigt för avtalets fullgörande.
            </li>
            <li>
              <strong>Berättigat intresse (6.1.f):</strong> Vanligast för intern AI-användning
              (analys av supportärenden, sammanfattning av möten, HR-processer). Kräver en
              intresseavvägning som dokumenteras.
            </li>
            <li>
              <strong>Samtycke (6.1.a):</strong> Sällsynt och svårhanterligt för löpande
              affärsprocesser. Undvik om möjligt — samtycke kan återkallas när som helst.
            </li>
            <li>
              <strong>Rättslig förpliktelse (6.1.c):</strong> Relevant om ni är skyldiga
              enligt lag att använda AI i vissa processer (ännu ovanligt, men ökande inom
              medicinsk AI och finansiell riskbedömning).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Integritetspolicyn — vad som måste uppdateras</h2>
          <p>
            Om ert AI-verktyg behandlar uppgifter om era kunder eller anställda måste er
            integritetspolicy reflektera detta. IMY (Datainspektionen) rekommenderar att
            ni tydligt informerar om:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Vilka AI-verktyg</strong> ni använder som personuppgiftsbiträden (t.ex.
              "Vi använder OpenAI API för att automatisera vår kundtjänst").
            </li>
            <li>
              <strong>Vilken typ av data</strong> som behandlas via AI (namn, ärendenummer,
              e-postinnehåll etc.).
            </li>
            <li>
              <strong>Rättslig grund</strong> för behandlingen.
            </li>
            <li>
              <strong>Lagringstid</strong> — hur länge data sparas hos AI-leverantören (normalt
              30 dagar för API-loggar hos OpenAI).
            </li>
            <li>
              <strong>Automatiserat beslutsfattande</strong> — om AI fattar beslut som påverkar
              individer (t.ex. kreditbedömning, rekrytering) krävs explicit information och
              rätt till mänsklig granskning (GDPR artikel 22).
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Praktisk checklista för GDPR-kompatibel AI</h2>
          <div className="not-prose space-y-3">
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
              <h3 className="font-bold text-brand-900 mb-3">Steg-för-steg: kom igång GDPR-säkert</h3>
              <ol className="text-sm text-gray-700 space-y-2.5 list-decimal pl-5">
                <li>Identifiera vilken data ni skickar till AI-leverantören — innehåller den personuppgifter?</li>
                <li>Välj API-plan eller team/enterprise-plan (inte konsumentplan) hos er leverantör.</li>
                <li>Hämta och underteckna DPA — eller godkänn den digitalt via leverantörens portal.</li>
                <li>Dokumentera rättslig grund (artikel 6) och spara i er registerförteckning (artikel 30).</li>
                <li>Uppdatera er integritetspolicy med information om AI-leverantören som personuppgiftsbiträde.</li>
                <li>Implementera minimering: skicka bara den data som faktiskt behövs — anonymisera eller pseudonymisera om möjligt.</li>
                <li>Dokumentera era rutiner för att hantera rättighetsförfrågningar (radering, tillgång, rättelse).</li>
                <li>Om ni använder Azure OpenAI: konfigurera EU-datacenter för att undvika US-transfer helt.</li>
              </ol>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Kostnaden för GDPR-kompatibel AI</h2>
          <p>
            GDPR-kompatibla planer kostar mer än gratisalternativ — men skillnaden är ofta
            mindre än man tror. Räknat i svenska kronor (maj 2026):
          </p>
          <div className="not-prose space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-700">Lösning</th>
                    <th className="text-right py-2 font-semibold text-gray-700">Pris</th>
                    <th className="text-center py-2 font-semibold text-gray-700">DPA</th>
                    <th className="text-center py-2 font-semibold text-gray-700">EU-data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 text-gray-700">OpenAI API (betald)</td>
                    <td className="py-2 text-right text-gray-700">Från ~10 kr/mån</td>
                    <td className="py-2 text-center text-green-600">✓</td>
                    <td className="py-2 text-center text-amber-500">DPF</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">ChatGPT Teams</td>
                    <td className="py-2 text-right text-gray-700">263 kr/anv/mån</td>
                    <td className="py-2 text-center text-green-600">✓</td>
                    <td className="py-2 text-center text-amber-500">DPF</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Azure OpenAI (EU)</td>
                    <td className="py-2 text-right text-gray-700">API-priser + ~5%</td>
                    <td className="py-2 text-center text-green-600">✓</td>
                    <td className="py-2 text-center text-green-600">EU</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Mistral API (FR)</td>
                    <td className="py-2 text-right text-gray-700">Från 1 kr/mån</td>
                    <td className="py-2 text-center text-green-600">✓</td>
                    <td className="py-2 text-center text-green-600">EU</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Claude API (betald)</td>
                    <td className="py-2 text-right text-gray-700">Från ~10 kr/mån</td>
                    <td className="py-2 text-center text-green-600">✓</td>
                    <td className="py-2 text-center text-amber-500">DPF</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-2">DPF = EU-US Data Privacy Framework (laglig transfer). EU = data stannar i EU/EES.</p>
            </div>
          </div>
          <p>
            Vill ni räkna ut exakt vad API-alternativen kostar för er volym? Använd{" "}
            <Link to="/" className="text-brand-700 hover:underline">
              kalkylatorn på startsidan
            </Link>{" "}
            — välj modell och ange era volymer för ett pris i SEK.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["ai-for-foretag"] || []} />

        <LandingFAQ items={faqs} heading="Vanliga frågor: AI och GDPR i Sverige" />

        <Sources items={gdprSources} />

        <div className="mt-10 card bg-brand-50 border-brand-100">
          <p className="text-sm text-brand-800">
            Läs mer:{" "}
            <Link to="/ai-for-foretag" className="font-semibold underline underline-offset-2 hover:text-brand-900">
              AI för svenska företag — kostnader och ROI
            </Link>
            {" "}·{" "}
            <Link to="/mistral-pris" className="font-semibold underline underline-offset-2 hover:text-brand-900">
              Mistral AI-priser (EU-alternativet)
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
