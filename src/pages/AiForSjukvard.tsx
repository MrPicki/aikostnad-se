import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const article = articles["ai-for-sjukvard"];

const faqs: FAQItem[] = [
  {
    question: "Är AI-verktyg GDPR-kompatibla för sjukvård och hälsodata?",
    answer:
      "Hälsodata är en särskild kategori av personuppgifter enligt GDPR och kräver extra noggrannhet. För att använda ett kommersiellt AI-API (Claude, GPT-4o) med patientdata krävs: ett Data Processing Agreement (DPA) med leverantören, EU-regional databearbetning (Anthropic Enterprise och Azure OpenAI erbjuder detta), pseudonymisering eller anonymisering av patientidentifierare, och en säkerhetsriskbedömning (DPIA). Alternativet är lokalt hostade modeller som Llama på en privat server — dyrare men ger fullständig datakontroll.",
  },
  {
    question: "Vad kostar AI-journalsammanfattning per månad för ett sjukhus?",
    answer:
      "För 50 journalsammanfattningar per dag (1 100 per månad) med Claude Sonnet 4.6 är API-kostnaden ca 139 SEK per månad. Det verkliga priset är integration och GDPR-compliance-arbete. Om AI sparar en läkare 3 minuter per journal är besparingen 1 100 × 3 min = 55 timmar läkartid per månad — mot en API-kostnad på 139 kr. Kostnaden domineras helt av integration, inte av tokens.",
  },
  {
    question: "Kan AI användas för medicinsk diagnos?",
    answer:
      "AI ska inte användas för självständig medicinsk diagnos. Gällande reglering, patientlag och medicinsk etik kräver att en legitimerad läkare ansvarar för diagnoser och behandlingsbeslut. AI kan användas som beslutsstöd — för att summera information, flagga avvikelser, föreslå differentialdiagnoser som sedan valideras av en specialist. FDA (USA) och EU:s MDR (Medical Device Regulation) reglerar AI som medicinska hjälpmedel och kräver CE-märkning för kliniska verktyg.",
  },
  {
    question: "Vilken AI-modell är bäst för medicinsk dokumentation på svenska?",
    answer:
      "Claude Sonnet 4.6 är det starkaste valet för medicinsk dokumentation på svenska — modellen håller konsekvent medicinsk terminologi, producerar klinisk prosa med rätt formellt register och är stark på att extrahera strukturerad information från fri text. GPT-4o är ett nära andraval. För patientfråge-chatbots med enklare frågor (tider, adresser, allmänna råd) fungerar Claude Haiku 4.5 till lägre kostnad.",
  },
];

export function AiForSjukvard() {
  return (
    <>
      <SEO
        title="AI i sjukvården — kostnader, GDPR och guide (2026)"
        description="AI-kostnader för sjukvård och hälsa: journalsammanfattning, patientchatbot och medicinsk dokumentation. GDPR-krav och lokal hosting. Maj 2026."
        canonical="/ai-for-sjukvard"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI i sjukvården", url: "https://aikostnad.se/ai-for-sjukvard" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            AI i sjukvården — kostnader, GDPR och guide (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Hur använder sjukvården AI på ett säkert sätt?"
            answer={
              <>
                <strong>Claude Sonnet 4.6</strong> rekommenderas för medicinsk dokumentation och journalarbete — hög precision, konsekvent medicinsk svenska. API-kostnad för journalsammanfattning 50/dag är <strong>~139 SEK/mån</strong>. Obligatoriskt: Enterprise DPA, EU-regional bearbetning, DPIA. Hälsodata kräver striktare skyddsåtgärder än normal GDPR.
              </>
            }
            bullets={[
              "Rekommenderad modell: Claude Sonnet 4.6 (GDPR, medicinsk precision)",
              "Journalsammanfattning 50/dag: ~139 SEK/mån i API-kostnad",
              "Patientfråge-chatbot 100/dag: ~53 SEK/mån (Claude Haiku)",
              "Medicinsk dokumentation 30/dag: ~114 SEK/mån",
              "Krav: Enterprise DPA + EU-region + DPIA för hälsodata",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            AI i sjukvården väcker legitimt stora förhoppningar och lika stora farhågor.
            Förhoppningarna handlar om att frigöra tid för kliniker, förbättra dokumentation
            och ge patienter bättre tillgång till information. Farhågorna handlar om
            integritet, patientlag och vad som händer när ett AI-system gör fel. Den här
            guiden ger konkreta kostnadssiffror, en tydlig bild av GDPR-kraven för
            hälsodata och praktiska råd om vilka use-cases som är mogna för
            implementering idag.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR och hälsodata — det som gäller innan ni börjar</h2>
            <p className="text-gray-700 leading-relaxed">
              Hälsodata är en "särskild kategori av personuppgifter" enligt GDPR artikel 9
              och åtnjuter starkare skydd än normala personuppgifter. Konsekvensen är att
              kraven för AI-bearbetning är strängare.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-red-900">Obligatoriska åtgärder för AI med patientdata</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Data Processing Agreement (DPA)</strong> — krävs med varje AI-leverantör som bearbetar patientdata</li>
                <li><strong>Data Protection Impact Assessment (DPIA)</strong> — obligatorisk riskbedömning för behandling av hälsodata</li>
                <li><strong>EU-regional databearbetning</strong> — data får inte överföras till tredjeland utan tillräckliga skyddsåtgärder</li>
                <li><strong>Pseudonymisering</strong> — ta bort eller ersätt patientidentifierare (personnummer, namn) i texten som skickas till AI</li>
                <li><strong>Loggning och spårbarhet</strong> — alla AI-bearbetningar ska kunna spåras i enlighet med journallagstiftningen</li>
                <li><strong>Intern policy</strong> — tydliga riktlinjer för vilken personal som får använda AI och för vilka uppgifter</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              För de vårdgivare med högst krav på datasäkerhet (psykiatri, beroendevård,
              HIV-vård) är lokalt hostade modeller det säkraste alternativet. Llama 3.3
              via Azure Private Cloud eller liknande lösningar håller all data inom
              organisationens egna servrar.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Tre realistiska AI-use-cases för sjukvård 2026</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6">1. Journalsammanfattning och strukturering</h3>
            <p className="text-gray-700 leading-relaxed">
              En av de mest tidskrävande uppgifterna för läkare är att läsa in sig på en
              patients journalhistorik inför ett möte. AI kan sammanfatta relevanta händelser,
              aktuella diagnoser, läkemedelslista och senaste provsvar till en kortfattad
              strukturerad översikt på sekunder. Läkaren kan sedan fokusera mötet på
              kommunikation och beslut snarare än informationsinhämtning.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Förutsättning: journaltexten pseudonymiseras (personnummer och namn ersätts med
              koder) innan den skickas till AI-API:et. Resultaten loggas och valideras av läkaren.
              AI gör aldrig kliniska bedömningar — det är ett verktyg för sammanfattning av
              dokumentation.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Patientinformations-chatbot</h3>
            <p className="text-gray-700 leading-relaxed">
              En AI-chatbot för 1177-liknande frågor, bokningsstöd och allmän vårdinformation
              kan avlasta vårdrådgivning och receptioner avsevärt. Chatboten hanterar frågor
              som "hur länge är jag sjukskriven efter ett knäingrepp?", "vad är normal
              återhämtningstid efter en appendektomi?" och "hur hanterar jag biverkningar
              av metformin?" utan att kräva hälsojuridisk bedömning.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Viktigt: chatboten ska aldrig ge råd om specifika patienters tillstånd,
              diagnostisera eller rekommendera behandlingsändringar. Den hanterar
              allmän medicinsk information, inte individspecifik rådgivning.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Medicinsk dokumentationsassistent</h3>
            <p className="text-gray-700 leading-relaxed">
              Läkare lägger i genomsnitt 35–55 % av sin arbetstid på administration och
              dokumentation. AI kan transkribera diktat, strukturera anteckningar till
              journalformat och generera remisstexter baserat på dikterade sammanfattningar.
              Läkaren dikterar, AI genererar ett journalutkast, läkaren granskar och signerar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lösningar som Abridge, Nabla och Lindy erbjuder specialiserade medicinska
              dokumentationsassistenter med inbyggd HIPAA/GDPR-compliance. För svenska
              sjukhus som vill bygga egna lösningar är Claude Sonnet 4.6 ett starkt alternativ
              för svensk medicinsk text.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Scenario-tabell: tre konkreta use-cases</h2>
            <p className="text-gray-700 leading-relaxed">
              Beräkningar med Claude Sonnet 4.6 (31,50 SEK/Mtok input, 157,50 SEK/Mtok output)
              för journaler och dokumentation, Claude Haiku 4.5 för patientchatbot.
              22 arbetsdagar per månad. Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Use-case</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Volym</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API-kostnad/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-brand-50">
                    <td className="px-3 py-2 font-medium">Journalsammanfattning</td>
                    <td className="px-3 py-2">50/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~139 SEK</td>
                    <td className="px-3 py-2">Claude Sonnet 4.6</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Patientfråge-chatbot</td>
                    <td className="px-3 py-2">100 frågor/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~53 SEK</td>
                    <td className="px-3 py-2">Claude Haiku 4.5</td>
                  </tr>
                  <tr className="bg-brand-50">
                    <td className="px-3 py-2 font-medium">Medicinsk dokumentation</td>
                    <td className="px-3 py-2">30/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~114 SEK</td>
                    <td className="px-3 py-2">Claude Sonnet 4.6</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Journaler: 2 000 input-tokens/journal, 400 output-tokens/summering.
              Patientfrågor: 300 input, 400 output. Dokumentation: 1 500 input, 800 output.
              Alla 22 dagar/mån.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Lokal hosting vs molntjänst för sjukvård</h2>
            <p className="text-gray-700 leading-relaxed">
              Valet mellan molntjänst och lokal hosting beror på er riskprofil och känslighetsnivån
              på den data ni bearbetar:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Lösning</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Datakontroll</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Kostnad</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Passar för</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Anthropic Enterprise</td>
                    <td className="px-3 py-2">EU DPA, ej träning</td>
                    <td className="px-3 py-2">API-priser + DPA-avgift</td>
                    <td className="px-3 py-2">Standard patientinfo</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Azure OpenAI</td>
                    <td className="px-3 py-2">EU-region, HIPAA BAA</td>
                    <td className="px-3 py-2">API-priser + Azure-kostnad</td>
                    <td className="px-3 py-2">Regulatoriskt krävande miljöer</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="px-3 py-2 font-medium">Llama (privat server)</td>
                    <td className="px-3 py-2">Fullständig — data lämnar aldrig organisationen</td>
                    <td className="px-3 py-2">Server-kostnad, lägre skalbarhet</td>
                    <td className="px-3 py-2">Psykiatri, beroendevård, hög risk</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på din sjukvårdsorganisations AI-kostnad</h2>
            <p className="text-gray-700 leading-relaxed">
              Fyll i er volym journaler, chatbotfrågor eller dokumentationsuppgifter i{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              och se exakt vad Claude Sonnet eller Haiku kostar för er specifika verksamhet
              — i SEK per månad.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/claude-pris" className="text-brand-700 hover:underline">
                  Claude Sonnet — priser, DPA och EU-regioner
                </Link>
              </li>
              <li>
                <Link to="/ai-for-foretag" className="text-brand-700 hover:underline">
                  AI för organisationer — enterprise och compliance
                </Link>
              </li>
              <li>
                <Link to="/prompt-caching" className="text-brand-700 hover:underline">
                  Prompt caching — sänk kostnaderna med 60–90 %
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI i sjukvården är tekniskt redo 2026 men kräver noggrann juridisk och
              organisatorisk förberedelse. Claude Sonnet 4.6 är det starkaste valet för
              medicinsk dokumentation och journalarbete på svenska. API-kostnaden är låg —
              de verkliga kostnaderna är compliance, integration och utbildning av personal.
              Börja med ett pilotprojekt på icke-känslig data (informations-chatbot,
              allmänna råd) och bygg gradvis upp kompetensen och avtalsstrukturen
              innan ni hanterar individuell patientdata.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Detta är generell information om AI-kostnader och tekniska möjligheter. Rådgör alltid
              med er DPO, juridisk rådgivare och patientdataansvarig innan ni implementerar AI
              som bearbetar patientdata. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-sjukvard"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI i sjukvården" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
