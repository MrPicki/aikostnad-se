import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad kostar en AI-konsult per timme i Sverige?",
    answer:
      "En junior AI-konsult i Sverige kostar typiskt 1 500–2 500 kr/timme och en senior AI-konsult 2 000–3 500 kr/timme (2026). Specialistroller som ML-engineers eller LLM-experter på de stora konsultbolagen kan ligga på 3 500–5 000 kr/timme. Timpriser under 900 kr/h bör betraktas som en varningssignal — antingen är personen orutinerad eller arbetar utanför normala SLA:er.",
  },
  {
    question: "Vad är skillnaden mellan timpris, projektpris och retainer?",
    answer:
      "Timpris (1 500–3 500 kr/h) passar korta uppdrag eller när scope är oklart. Projektpris (50 000–500 000 kr) är fast pris för ett tydligt avgränsat leverabel — t.ex. en chatbot eller AI-prototyp. Retainer (30 000–100 000 kr/mån) ger löpande tillgång till konsulten ett visst antal timmar i månaden. Retainer är vanligtvis 10–20 % billigare per timme än ad hoc-fakturering.",
  },
  {
    question: "Hur lång tid tar ett AI-implementeringsprojekt?",
    answer:
      "En enkel AI-prototyp (chatbot mot egen kunskap, dokumentanalys) tar typiskt 2–6 veckor och kostar 80 000–250 000 kr. En produktionsklar lösning med integrationer, säkerhet och GDPR-compliance ligger på 3–6 månader och 300 000–1 500 000 kr. För större strategi- och plattformsuppdrag (AI-agenter, workflows över flera system) räkna med 6–12 månader.",
  },
  {
    question: "Är det billigare att anställa internt än att hyra in konsult?",
    answer:
      "På lång sikt ofta ja. En senior AI-utvecklare kostar 800 000–1 200 000 kr/år i lönekostnad (inkl. sociala avgifter), motsvarande ca 500–750 kr/timme. Men det förutsätter att du kan rekrytera, har 12 månaders sysselsättning och kan upprätthålla kompetensen. För kortare uppdrag eller projekt under 6 månader är konsult oftast billigare totalt. Många svenska företag väljer en hybrid — konsult för uppstart och sedan internalisering.",
  },
  {
    question: "Vad ska jag som beställare se upp för?",
    answer:
      "Tre vanliga varningssignaler: 1) Pris under 900 kr/h utan transparent förklaring — kan tyda på underleverantörer eller orutinerad konsult. 2) Vaga leverabler (\"AI-strategi\") utan mätbara mål eller acceptanskriterier. 3) Tekniklåsning — konsult som låser dig till en specifik plattform utan tydlig exit-strategi. Be alltid om referensuppdrag, fast pris på första delleveransen och en plan för kompetensöverföring.",
  },
  {
    question: "Vilka AI-konsultroller finns det och vad kostar de?",
    answer:
      "AI-strateg/rådgivare: 2 500–4 000 kr/h, fokus på roadmap och affärsnytta. AI-utvecklare/ML-engineer: 1 500–3 000 kr/h, bygger lösningarna. Data engineer: 1 200–2 500 kr/h, bygger datapipelines. Prompt engineer: 1 200–2 500 kr/h, specialiserar sig på LLM-promptar. MLOps-konsult: 1 800–3 200 kr/h, produktionsdrift av AI-modeller. För de flesta projekt behövs en mix av minst två roller.",
  },
];

export function AiKonsultPris() {
  return (
    <>
      <SEO
        title="AI-konsult pris 2026 — vad kostar en AI-konsult i Sverige?"
        description="Vad kostar en AI-konsult i Sverige 2026? Timpris, projektpris och retainer — junior, senior och specialist. Komplett guide med riktpriser i SEK."
        canonical="/ai-konsult-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI-konsult pris", url: "https://aikostnad.se/ai-konsult-pris" },
      ]} />
      <ArticleSchema article={articles["ai-konsult-pris"]} />
      <SpeakableSchema />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Vad kostar en AI-konsult i Sverige 2026?
          </h1>

          <LastUpdated date={articles["ai-konsult-pris"].modifiedDate} />

          <TLDR
            question="Vad kostar en AI-konsult i Sverige?"
            answer={
              <>
                AI-konsulter i Sverige tar typiskt <strong>1 500–2 500 kr/timme</strong> (junior) och{" "}
                <strong>2 000–3 500 kr/timme</strong> (senior). Projektpris ligger på{" "}
                <strong>50 000–500 000 kr</strong> beroende på omfattning, och retainer på{" "}
                <strong>30 000–100 000 kr/mån</strong>. Priser under 900 kr/h bör ses som en varningssignal.
              </>
            }
            bullets={[
              "Junior AI-konsult: 1 500–2 500 kr/timme",
              "Senior AI-konsult: 2 000–3 500 kr/timme",
              "Specialist (ML/LLM): 3 500–5 000 kr/timme",
              "Projektpris prototyp: 80 000–250 000 kr",
              "Projektpris produktion: 300 000–1 500 000 kr",
              "Retainer (löpande): 30 000–100 000 kr/mån",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              Att hyra in en AI-konsult i Sverige 2026 är inte längre lika dyrt — eller lika billigt — som
              för bara två år sedan. Marknaden har stabiliserats, antalet konsulter har vuxit och prisbilden
              är tydligare. <strong>Snittpriset för en senior AI-konsult ligger på 2 500 kr/timme</strong>,
              men spannet är brett: från 1 500 kr/h för en duktig junior till över 5 000 kr/h för en
              eftertraktad ML-specialist på något av de stora konsultbolagen.
            </p>
            <p>
              Den här guiden går igenom vad du faktiskt får för pengarna, när det lönar sig att anlita en
              konsult kontra att <Link to="/ai-for-foretag" className="text-brand-700 hover:underline">bygga AI internt</Link>,
              vilka roller som finns och hur du undviker de vanligaste fallgroparna i AI-konsultupphandlingar.
            </p>
            <p>
              För småföretag som bara behöver komma igång med generativ AI är konsulthjälp inte alltid svaret —
              ofta räcker en bra <Link to="/vad-kostar-ai" className="text-brand-700 hover:underline">översikt över AI-priser och verktyg</Link>{" "}
              och några dagars internt experimenterande. Men för dataintensiva, säkerhetskritiska eller
              integrationstunga projekt är extern expertis nästan alltid en bra investering.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Timpriser per seniority i Sverige 2026</h2>
          <p>
            Riktpriser för svenska AI-konsulter, exklusive moms. Priserna varierar med storstad
            (Stockholm/Göteborg dyrast), bransch (finans och hälsa premium) och bolagstyp (frilans
            billigare än konsultbolag).
          </p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-900">Roll / Senioritet</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Timpris (SEK)</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Typiskt uppdrag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">Junior AI-konsult</td>
                  <td className="p-3">1 500–2 500 kr</td>
                  <td className="p-3 text-gray-600">Prototyper, PoC, mindre integrationer</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Medel AI-konsult</td>
                  <td className="p-3">1 800–2 800 kr</td>
                  <td className="p-3 text-gray-600">Produktion, integrationer, modellval</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Senior AI-konsult</td>
                  <td className="p-3">2 000–3 500 kr</td>
                  <td className="p-3 text-gray-600">Arkitektur, leda team, kritiska system</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">ML/LLM-specialist</td>
                  <td className="p-3">3 500–5 000 kr</td>
                  <td className="p-3 text-gray-600">Fine-tuning, RAG-system, prestanda-optimering</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">AI-strateg/rådgivare</td>
                  <td className="p-3">2 500–4 000 kr</td>
                  <td className="p-3 text-gray-600">Roadmap, affärsnytta, change management</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Projektpris vs retainer — vad ska du välja?</h2>
          <p>
            Tre vanliga avtalsformer används på den svenska AI-konsultmarknaden. Valet beror främst på
            hur väl avgränsat ditt projekt är och hur lång löptid du tänker dig.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Timpris (löpande räkning)</h3>
          <p>
            Bäst när scope är oklart eller projektet är kort. Du betalar för faktisk tid och får
            flexibilitet, men risken för budgetöverskridning är högre. Använd timpris för förstudier,
            workshops och småprojekt under 50 000 kr.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Fast projektpris</h3>
          <p>
            Bäst när du har tydligt definierade leverabler — t.ex. "en chatbot tränad på vår produktdokumentation
            som svarar på svenska med GDPR-godkänd hosting." Vanliga prisintervall:
          </p>
          <ul>
            <li><strong>PoC / prototyp:</strong> 80 000–250 000 kr (2–6 veckor)</li>
            <li><strong>MVP-implementation:</strong> 200 000–600 000 kr (1–3 månader)</li>
            <li><strong>Produktion + integrationer:</strong> 400 000–1 500 000 kr (3–6 månader)</li>
            <li><strong>Enterprise-plattform:</strong> 1 000 000–5 000 000 kr (6–12 månader)</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Retainer (månadsavtal)</h3>
          <p>
            Bäst för långsiktigt samarbete, t.ex. AI-strateg som följer er resa. Vanliga nivåer:
          </p>
          <ul>
            <li><strong>10 timmar/mån:</strong> 25 000–35 000 kr — bollplank och puff vid behov</li>
            <li><strong>20 timmar/mån:</strong> 45 000–65 000 kr — aktivt deltagande i veckomöten</li>
            <li><strong>40 timmar/mån:</strong> 80 000–120 000 kr — halvtid, hands-on i kod</li>
          </ul>
          <p>
            Retainer ger typiskt 10–20 % rabatt på timpriset jämfört med ad hoc-fakturering.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Vad får du faktiskt för pengarna?</h2>
          <p>
            En bra AI-konsult levererar mer än kod. Förvänta dig:
          </p>
          <ul>
            <li><strong>Modellval och arkitektur</strong> — vilken LLM, vilket RAG-mönster, vilken vektor-DB</li>
            <li><strong>Datakvalitet och pipelines</strong> — utan rätt data fungerar ingen AI</li>
            <li><strong>GDPR och datalagring</strong> — DPA-avtal, EU-region, PII-hantering</li>
            <li><strong>Säkerhet</strong> — prompt injection, jailbreak-skydd, RBAC</li>
            <li><strong>Mätbara KPI:er</strong> — accuracy, latency, kostnad per request</li>
            <li><strong>Kompetensöverföring</strong> — så ni inte är låsta vid konsulten</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Varningssignaler — när priset är fel</h2>
          <p>
            Tre röda flaggor som ska få dig att gå vidare till nästa konsult:
          </p>
          <div className="not-prose space-y-4 my-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-red-900 mb-2">Timpris under 900 kr/h utan förklaring</h3>
              <p className="text-sm text-gray-700">
                I Sverige 2026 är 900 kr/h en realistisk lägstanivå för en junior. Underliggande
                kostnad (lön, sociala avgifter, overhead) gör att lägre pris ofta betyder utländska
                underleverantörer, orutinerad person eller saknade SLA:er.
              </p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-red-900 mb-2">Vaga leverabler ("AI-strategi", "AI-mognadsanalys")</h3>
              <p className="text-sm text-gray-700">
                Om konsulten inte kan beskriva exakt vad du kommer få i din mejlinkorg när uppdraget
                är klart — gå vidare. Bra konsulter levererar dokument, demos eller mätbara resultat,
                inte luddiga "insikter".
              </p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="text-base font-bold text-red-900 mb-2">Tekniklåsning utan exit-strategi</h3>
              <p className="text-sm text-gray-700">
                Om allt byggs i en proprietär plattform som bara konsulten kan underhålla — be om
                en plan för hur ni på sikt kan ta över. Bra konsulter använder öppna API:er och
                dokumenterar arkitektur så att ni kan byta leverantör.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">AI-konsult vs intern AI-utveckling</h2>
          <p>
            Ett återkommande beslut: ska vi anställa eller hyra in? Här är en grov tumregel.
          </p>
          <p>
            <strong>Anlita konsult när:</strong> uppdraget är &lt; 6 månader, ni saknar AI-kompetens
            idag, det är specialistkunskap (RAG, MLOps, fine-tuning), eller ni behöver komma igång snabbt.
          </p>
          <p>
            <strong>Anställ internt när:</strong> AI är kärnan i er produkt, ni har minst 12 månaders
            sysselsättning, ni vill bygga långsiktig kompetens, eller datakänsligheten kräver att all kod
            stannar in-house. Mer om totalkostnad finns i vår guide om{" "}
            <Link to="/ai-for-foretag" className="text-brand-700 hover:underline">AI för företag i Sverige</Link>.
          </p>
          <p>
            <strong>Hybrid (oftast bäst):</strong> konsult driver uppstart och PoC, ni anställer för
            förvaltning och vidareutveckling. På så sätt får ni fart utan att binda upp er på en
            tjänst innan ni vet vad ni behöver.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Implementeringstider — vad är realistiskt?</h2>
          <p>
            Förvänta dig dessa tidsspann för olika typer av AI-projekt:
          </p>
          <ul>
            <li><strong>Workshop / strategi:</strong> 1–2 veckor</li>
            <li><strong>PoC (proof of concept):</strong> 2–6 veckor</li>
            <li><strong>MVP i produktion:</strong> 2–4 månader</li>
            <li><strong>Skalbar plattform:</strong> 6–12 månader</li>
            <li><strong>Enterprise-rollout (1000+ anställda):</strong> 12–24 månader</li>
          </ul>
          <p>
            Tidsspannet inkluderar oftast inte change management och utbildning av slutanvändare — räkna
            med ytterligare 20–30 % av projekttiden för att få faktisk användning av lösningen.
          </p>
        </section>

        <RelatedArticles links={relatedArticles["ai-konsult-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-konsult priser" />

        <Sources items={officialPricingSources} />

        <div className="mt-12 card bg-brand-50 border-brand-100">
          <p className="text-sm text-brand-800">
            Vill du jämföra konsultkostnad mot att bygga själv?{" "}
            <Link to="/ai-for-foretag" className="font-semibold underline underline-offset-2 hover:text-brand-900">
              Se vår guide om AI för företag
            </Link>{" "}
            eller{" "}
            <Link to="/" className="font-semibold underline underline-offset-2 hover:text-brand-900">
              räkna ut AI-kostnaden direkt i kalkylatorn
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
