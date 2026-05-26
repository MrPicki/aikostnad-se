import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { LastUpdated } from "../components/LastUpdated";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { articles } from "../data/articles";

const article = articles["prisandringar"];

const faqs: FAQItem[] = [
  {
    question: "Har AI-priser sjunkit sedan 2024?",
    answer:
      "Ja, dramatiskt. Från oktober 2024 till maj 2026 har de ledande AI-modellerna sänkt sina priser med 50–90 %. GPT-4o sänktes 50 % i oktober 2024, Claude Haiku 3 sänktes 80 % i mars 2025 och GPT-4o mini sänktes ytterligare 60 % i maj 2025. Trenden drivs av ökad konkurrens, bättre inferensinfrastruktur och tillväxt i antalet API-kunder.",
  },
  {
    question: "Vad kostade GPT-4o från början och vad kostar det nu?",
    answer:
      "GPT-4o lanserades i maj 2024 till $5/$15 per miljon tokens (input/output). I oktober 2024 sänktes priset med 50 % till $2,50/$10 per Mtok — en besparing på hälften för alla API-användare. För en tjänst med 1 miljon frågor per månad innebar det en besparing på tusentals kronor per månad utan att byta modell.",
  },
  {
    question: "Kommer AI-priserna att fortsätta sjunka?",
    answer:
      "Historiken pekar på ja. Varje ny modellgeneration tenderar att leverera bättre prestanda till lägre kostnad. Konkurrensen mellan OpenAI, Anthropic, Google och DeepSeek driver prissättningen nedåt. Dock är de snabbaste sänkningarna på äldre modeller — de allra senaste flagship-modellerna (o3, GPT-5, Claude Opus 4.7) håller höga priser tills nästa generation lanseras.",
  },
  {
    question: "Hur påverkar prisändringarna min befintliga app?",
    answer:
      "Prisändringar på befintliga modeller påverkar automatiskt din faktiska kostnad om du inte har satt ett pristak. OpenAI och Anthropic sänker priser unilateralt (du behöver inte göra något). Observera att modeller ibland tas ur produktion och ersätts av nyare versioner — kontrollera OpenAIs och Anthropics ändringsloggar om du har hårdkodade modell-ID:n i koden.",
  },
];

interface PriceChange {
  date: string;
  model: string;
  provider: string;
  before: string;
  after: string;
  change: string;
  impact: string;
}

const changes: PriceChange[] = [
  {
    date: "Maj 2025",
    model: "GPT-4o mini",
    provider: "OpenAI",
    before: "$0,15 / $0,60 per Mtok",
    after: "$0,06 / $0,24 per Mtok",
    change: "−60 %",
    impact: "Besparing ~540 kr/mån för 1 000 frågor/dag",
  },
  {
    date: "Mars 2025",
    model: "Claude Haiku 3",
    provider: "Anthropic",
    before: "$0,25 / $1,25 per Mtok",
    after: "$0,05 / $0,25 per Mtok",
    change: "−80 %",
    impact: "Drastisk sänkning — Haiku 3 nu konkurrenskraftig med GPT-4o mini",
  },
  {
    date: "Februari 2025",
    model: "Gemini 1.5 Flash",
    provider: "Google",
    before: "Begränsad gratis tier",
    after: "Utökad gratis tier — 15 req/min gratis",
    change: "Gratis-volym utökad",
    impact: "Idealt för prototyper och låg-volym-applikationer utan kostnad",
  },
  {
    date: "Januari 2025",
    model: "OpenAI o1",
    provider: "OpenAI",
    before: "Ej tillgänglig via API",
    after: "$15 / $60 per Mtok (API-lansering)",
    change: "Ny modell",
    impact: "Reasoning-förmåga tillgänglig för API-utvecklare för första gången",
  },
  {
    date: "November 2024",
    model: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    before: "$3 / $15 per Mtok",
    after: "$3 / $15 per Mtok (uppgraderad version)",
    change: "Bättre modell, samma pris",
    impact: "Markant bättre kodprestanda utan prisökning — effektiv prissänkning per kvalitetsenhet",
  },
  {
    date: "Oktober 2024",
    model: "GPT-4o",
    provider: "OpenAI",
    before: "$5 / $15 per Mtok",
    after: "$2,50 / $10 per Mtok",
    change: "−50 %",
    impact: "Besparing ~1 300 kr/mån för 1 000 frågor/dag (100 tok in + 200 tok ut)",
  },
];

export function Prisandringar() {
  return (
    <>
      <SEO
        title="AI-priser i Sverige — Historik och prisändringar 2024–2026"
        description="Komplett historik över AI-prisändringar 2024–2026. GPT-4o, Claude, Gemini — se hur priserna sjunkit och vad det innebär för din AI-budget."
        canonical="/prisandringar"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Prisändringar", url: "https://aikostnad.se/prisandringar" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            AI-priser i Sverige — Historik och prisändringar 2024–2026
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            AI-priser har fallit kraftigt sedan 2024. OpenAI, Anthropic och Google
            har sänkt sina modellpriser med 50–90 % på 18 månader. Den här sidan
            samlar alla kända prisändringar i kronologisk ordning med konkret
            beräkning av hur mycket du faktiskt sparar.
          </p>

          {/* Summary stats */}
          <div className="not-prose grid grid-cols-3 gap-4 mb-10">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-green-700">−60 %</p>
              <p className="text-xs text-gray-600 mt-1">GPT-4o mini, maj 2025</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-green-700">−80 %</p>
              <p className="text-xs text-gray-600 mt-1">Claude Haiku 3, mars 2025</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-green-700">−50 %</p>
              <p className="text-xs text-gray-600 mt-1">GPT-4o, okt 2024</p>
            </div>
          </div>

          {/* Changelog table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Alla prisändringar 2024–2026</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellen nedan listar bekräftade prisändringar för de ledande AI-modellerna
              sedan oktober 2024, i omvänd kronologisk ordning.
            </p>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">Datum</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 hidden sm:table-cell">Förändring</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Effekt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {changes.map((c) => (
                    <tr key={c.date + c.model} className="align-top">
                      <td className="px-3 py-3 text-gray-500 whitespace-nowrap text-xs">{c.date}</td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-gray-900">{c.model}</p>
                        <p className="text-xs text-gray-500">{c.provider}</p>
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${c.change.startsWith("−") ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                          {c.change}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {c.before} → {c.after}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600">{c.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Analysis by provider */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Prisanalys per leverantör</h2>

            <h3 className="text-lg font-bold text-gray-900">OpenAI</h3>
            <p className="text-gray-700 leading-relaxed">
              OpenAI har gjort de mest dramatiska prissänkningarna på sina äldre modeller.
              GPT-4o sänktes med 50 % i oktober 2024 och GPT-4o mini med ytterligare
              60 % i maj 2025. För en applikation som körde GPT-4o med 1 miljon tokens
              per dag i oktober 2024 och gick över till GPT-4o mini i maj 2025 minskade
              månadskostnaden med uppskattningsvis 85 %. Nya flagship-modeller (GPT-5, o3)
              lanseras fortfarande till höga priser — prissänkningar på dessa väntas
              när nästa generation lanseras.
            </p>

            <h3 className="text-lg font-bold text-gray-900">Anthropic</h3>
            <p className="text-gray-700 leading-relaxed">
              Anthropic sänkte Claude Haiku 3 med 80 % i mars 2025 — den mest kraftfulla
              procentuella prissänkningen bland de ledande leverantörerna. Claude Sonnet
              och Opus-prisnivåerna har hållits stabila men fått uppgraderade versioner
              (3.5, 4) med bättre prestanda till samma pris, vilket innebär en de facto
              prissänkning per kvalitetsenhet. Prompt caching (90 % rabatt på cachad input)
              lanserades under 2024 och kan halvera den effektiva kostnaden för chatbot-applikationer.
            </p>

            <h3 className="text-lg font-bold text-gray-900">Google</h3>
            <p className="text-gray-700 leading-relaxed">
              Google har tagit en annan strategi: i stället för att primärt sänka priser
              har man utökat gratistiern. Gemini 1.5 Flash utökades till 15 förfrågningar
              per minut gratis i februari 2025 — tillräckligt för prototyper och
              låg-volym-applikationer utan kostnad alls. Gemini 2.5 Pro och Flash är
              prissatta konkurrenskraftigt mot GPT-4.1 respektive GPT-4o mini.
            </p>

            <h3 className="text-lg font-bold text-gray-900">DeepSeek — störningsfaktorn</h3>
            <p className="text-gray-700 leading-relaxed">
              DeepSeek V3 och R1 lanserades i januari 2025 och satte marknadsprissättning
              under press med priser runt $0,28/$0,42 per Mtok — en bråkdel av
              GPT-4o:s pris. Detta satte omedelbart press på alla leverantörer att
              sänka priser eller förbättra erbjudanden för att förbli konkurrenskraftiga.
              DeepSeek-effekten anses bidra till de prissänkningar som skett från
              OpenAI och Anthropic under första halvåret 2025.
            </p>
          </section>

          {/* What it means for your budget */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vad innebär det för din AI-budget?</h2>
            <p className="text-gray-700 leading-relaxed">
              Om du satte en AI-budget baserat på 2024 års priser och inte uppdaterat
              den kan du ha betalat onödigt mycket — eller ha utrymme att bygga mer.
              Tre konkreta råd:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Granska din modellval kvartalsvis.</strong> Om du valde GPT-4o
                för ett år sedan och inte tittat på alternativen kan GPT-4.1 eller
                GPT-4o mini ge samma kvalitet till ett bråkdel av kostnaden.
              </li>
              <li>
                <strong>Testa mini-modeller på din faktiska data.</strong> GPT-4o mini
                och Claude Haiku 4.5 presterar förvånansvärt bra på strukturerade
                uppgifter (klassificering, sammanfattning, FAQ). En snabb A/B-test
                kan spara tusentals kronor per månad.
              </li>
              <li>
                <strong>Aktivera prompt caching om du inte gjort det.</strong> För
                chatbotar med fast system-prompt kan Anthropics prompt caching (90 %
                rabatt på cachad input) halvera den effektiva kostnaden utan att
                ändra en rad affärslogik.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              Använd{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              för att räkna ut vad du faktiskt betalar med nuvarande priser och
              jämföra alternativa modeller sida vid sida.
            </p>
          </section>

          {/* Links */}
          <section className="space-y-2 mb-12 not-prose">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Aktuella prissidor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/vad-kostar-chatgpt" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">ChatGPT API-priser</p>
                <p className="text-xs text-gray-500 mt-0.5">GPT-4o och GPT-4o mini med kalkylator</p>
              </Link>
              <Link to="/claude-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">Claude API-priser</p>
                <p className="text-xs text-gray-500 mt-0.5">Sonnet, Haiku och Opus i SEK</p>
              </Link>
              <Link to="/gemini-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">Gemini API-priser</p>
                <p className="text-xs text-gray-500 mt-0.5">Gemini 2.5 Pro och Flash i SEK</p>
              </Link>
              <Link to="/deepseek-pris" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">DeepSeek-priser</p>
                <p className="text-xs text-gray-500 mt-0.5">Billigaste mainstream-modellen?</p>
              </Link>
            </div>
          </section>
        </article>

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-prisändringar" />
      </main>
    </>
  );
}
