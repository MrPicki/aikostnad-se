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
import { Helmet } from "react-helmet-async";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vad kostar AI för ett litet företag per månad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "För ett team på 5 personer räknar ni med 1 000–1 100 kr/mån med individuella ChatGPT Plus- eller Claude Pro-abonnemang. Bygger ni ett internt AI-verktyg via API kan kostnaden sänkas till 200–500 kr/mån för samma team — beroende på modellval och användningsfrekvens.",
      },
    },
    {
      "@type": "Question",
      name: "Vilken AI är bäst för svenska företag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det beror på användningsfall. Claude (Anthropic) anses bäst på svenska och har starkt GDPR-fokus — populärt för textintensiva arbetsflöden. ChatGPT (OpenAI) dominerar marknaden och har bredast ekosystem. Microsoft Copilot används av 76% av svenska organisationer med AI-åtkomst tack vare integrationen i Microsoft 365.",
      },
    },
  ],
};

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI för ett litet företag per månad?",
    answer:
      "För ett team på 5 personer räknar ni med 1 000–1 100 kr/mån med individuella ChatGPT Plus- eller Claude Pro-abonnemang (209 kr/person). Bygger ni ett internt AI-verktyg via API kan kostnaden sänkas till 200–500 kr/mån för samma team — beroende på modellval och hur ofta verktyget används. Räkna på er specifika volym i kalkylatorn på startsidan.",
  },
  {
    question: "Vilken AI är bäst för svenska företag?",
    answer:
      "Det beror på användningsfall. Claude (Anthropic) upplevs bäst på svenska och har starkt GDPR-fokus. ChatGPT (OpenAI) dominerar med bredast ekosystem och lägsta API-kostnad. Microsoft Copilot används av 76 % av svenska organisationer med AI-åtkomst tack vare Microsoft 365-integrationen. Google Gemini passar om ni redan använder Google Workspace.",
  },
  {
    question: "Behöver vi teckna enterprise-avtal eller räcker det med individuella konton?",
    answer:
      "För team under 10 personer räcker individuella abonnemang (ChatGPT Plus, Claude Pro). För 10–50 personer finns teamversioner: ChatGPT Team ($25/användare/mån), Claude Team ($25/användare/mån). Över 50–100 användare eller vid behov av SSO, avancerad admin och GDPR-DPA är Enterprise-avtal typiskt nödvändigt. Kontakta respektive leverantör direkt för priser.",
  },
  {
    question: "Hur hanterar vi GDPR och dataskydd med AI?",
    answer:
      "Alla stora leverantörer erbjuder databehandlingstillägg (DPA): OpenAI, Anthropic och Google har EU/GDPR-kompatibla avtalsstrukturer. ChatGPT Enterprise och Claude Enterprise erbjuder garantier om att ert data inte används för träning. Viktigt: gratisversioner och konsumentabonnemang ger vanligtvis INTE dessa garantier — enterprise-nivå krävs för GDPR-efterlevnad vid behandling av personuppgifter.",
  },
  {
    question: "Hur lång tid tar det att komma igång med AI i ett företag?",
    answer:
      "Med ett konsumentabonnemang (ChatGPT Plus, Claude Pro) är ni igång inom en timme. En grundläggande intern chatbot via API tar typiskt 1–3 dagar att bygga. En produktionsklar applikation med säkerhet, fallback och evals tar 2–6 veckor. De flesta svenska SME-företag börjar med abonnemang för individuell användning och bygger sedan interna verktyg när de förstår sina behov.",
  },
];

export function AiForForetag() {
  return (
    <>
      <SEO
        title="AI för företag Sverige 2026 — kostnader, verktyg och GDPR"
        description="Komplett guide till AI för svenska företag. Vad kostar AI per anställd? Vilken AI passar er? Hur hanterar ni GDPR? Konkreta räkneexempel i SEK."
        canonical="/ai-for-foretag"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för företag", url: "https://aikostnad.se/ai-for-foretag" },
      ]} />
      <ArticleSchema article={articles["ai-for-foretag"]} />
      <SpeakableSchema />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AI för företag — guide och kostnader 2026
          </h1>

          <LastUpdated date={articles["ai-for-foretag"].modifiedDate} />

          <TLDR
            question="Vad kostar AI för svenska företag?"
            answer={
              <>
                Räkna med <strong>200–500 kr per anställd och månad</strong> för individuella abonnemang (ChatGPT Plus, Claude Pro, Copilot). Med team-/enterprise-avtal eller egenbyggda API-lösningar kan kostnaden pressas till <strong>50–100 kr/anställd</strong>. För GDPR-efterlevnad krävs DPA — som följer med Enterprise-versioner men inte gratisversioner.
              </>
            }
            bullets={[
              "Soloprenör: 200–500 kr/mån",
              "Småföretag 5–10 pers: 1 000–2 000 kr/mån",
              "Mellanstort 50–100 pers: 3 000–10 000 kr/mån",
              "Storföretag: enterprise-avtal, 30–50 % rabatt över listpris",
              "76 % av svenska org. med AI-tillgång använder Copilot",
              "GDPR-DPA: krav för persondata, ingår i Enterprise",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed">
            Sverige är ett av Europas ledande AI-länder — 76 % av svenska organisationer
            med AI-åtkomst använder redan verktyg aktivt. Den här guiden hjälper dig
            förstå vad AI kostar per anställd, vilket verktyg som passar ert företag
            och hur ni hanterar GDPR. Alla kostnader i svenska kronor.
          </p>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">AI-kostnader per företagsstorlek</h2>
          <p>
            Kostnaden för AI i ett företag beror på hur ni väljer att använda det:
            individuella abonnemang, teamversioner eller egenutvecklade verktyg via API.
            Här är realistiska månadsbudgetar per företagsstorlek (maj 2026):
          </p>

          <div className="space-y-4 not-prose">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="text-base font-bold text-green-900 mb-2">Soloprenör / frilansare — 200–500 kr/mån</h3>
              <p className="text-sm text-gray-700 mb-3">
                En person som skriver texter, analyserar data och svarar på mejl med AI-stöd.
              </p>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>ChatGPT Plus eller Claude Pro: <strong>209 kr/mån</strong></li>
                <li>Microsoft Copilot (M365 Business): <strong>~290 kr/mån</strong> (ingår i M365)</li>
                <li>API-alternativ (GPT-4o, ca 50 frågor/dag): <strong>~34 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Abonnemang är enklast att komma igång med. API lönar sig bara om ni
                bygger egna verktyg.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <h3 className="text-base font-bold text-indigo-900 mb-2">Litet företag (5–15 pers.) — 1 000–3 000 kr/mån</h3>
              <p className="text-sm text-gray-700 mb-3">
                Team som använder AI dagligen för produktivitet, kundkommunikation och analys.
              </p>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>5× ChatGPT Plus: <strong>1 045 kr/mån</strong></li>
                <li>5× Claude Pro: <strong>1 045 kr/mån</strong></li>
                <li>ChatGPT Team (5 pers.): <strong>~1 315 kr/mån</strong> ($25/pers.)</li>
                <li>API (intern assistent, 500 frågor/dag): <strong>~338 kr/mån</strong> (GPT-4o)</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Om teamet använder AI intensivt är en intern assistent via API ofta 3–5×
                billigare än individuella abonnemang.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <h3 className="text-base font-bold text-purple-900 mb-2">Mellanstort företag (20–100 pers.) — 5 000–20 000 kr/mån</h3>
              <p className="text-sm text-gray-700 mb-3">
                Kombination av abonnemang för individuell användning och API-drivna
                interna verktyg (HR-bot, kundtjänst, dokumentanalys).
              </p>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>50× individuella abonnemang: <strong>~10 450 kr/mån</strong></li>
                <li>ChatGPT Enterprise (50 pers.): <strong>prissätts individuellt</strong></li>
                <li>Intern chatbot (2 000 frågor/dag, GPT-4o): <strong>~1 350 kr/mån</strong></li>
                <li>Hybrid (abonnemang + intern bot): <strong>6 000–12 000 kr/mån</strong></li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h3 className="text-base font-bold text-amber-900 mb-2">Stort företag (100+ pers.) — 20 000+ kr/mån</h3>
              <p className="text-sm text-gray-700 mb-3">
                Enterprise-avtal med SSO, admin, GDPR-DPA och eventuellt privata
                deployments via Azure OpenAI eller Google Vertex AI.
              </p>
              <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
                <li>ChatGPT Enterprise: förhandlas individuellt (uppskattad lägstanivå ~$15/pers.)</li>
                <li>Microsoft Copilot M365 (100 pers.): <strong>~30 000 kr/mån</strong></li>
                <li>Azure OpenAI (dedikerat): från <strong>~5 000 kr/mån</strong> + per-token</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Volymrabatter på 20–40 % är möjliga vid stora volymer — förhandla direkt.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Vilket AI-verktyg passar ert företag?</h2>
          <p>
            Det finns inget universellt svar — rätt verktyg beror på era arbetsflöden,
            teknisk kompetens och krav på dataskydd. Här är de vanligaste valen bland
            svenska företag 2026:
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Microsoft Copilot</h3>
          <p>
            Används av 76 % av svenska organisationer med AI-åtkomst. Inbyggt i Word,
            Excel, PowerPoint, Teams och Outlook — ingen integration behövs. Kostar
            ca 290 kr/pers./mån (ingår i Microsoft 365 Business Premium eller som
            tillägg). Bäst för: kontorstäta företag som redan betalar för M365.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">ChatGPT (OpenAI)</h3>
          <p>
            Det globalt mest använda AI-verktyget. Lättast att komma igång med,
            bredast funktionalitet (webbsökning, bildgenerering, Custom GPTs). Billigast
            i API-prissättning per token. Bäst för: team som vill ha flexibelt verktyg
            utan teknisk integration, eller developers som bygger egna applikationer.
            Se{" "}
            <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">
              vad ChatGPT kostar för företag
            </Link>.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Claude (Anthropic)</h3>
          <p>
            Populärt val bland svenska företag med textintensiva arbetsflöden — juridik,
            marknadsföring, HR och analys. Bättre på svenska än ChatGPT, starkare på
            instruktionsföljning och långa dokument. Prompt caching kan halvera kostnaden
            för chatbot-applikationer. Bäst för: företag med GDPR-krav och mycket
            textproduktion. Se{" "}
            <Link to="/claude-pris" className="text-indigo-600 hover:underline">
              vad Claude kostar för företag
            </Link>.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Google Gemini / Workspace AI</h3>
          <p>
            Rätt val för företag som primärt arbetar i Google Workspace (Gmail, Drive,
            Docs). Gemini Advanced (199 kr/mån via Google One) ger direkt AI-stöd i alla
            Google-appar. API-mässigt konkurrerar Gemini Flash med sina låga priser och
            unika 1-miljon-tokens kontextfönster. Se{" "}
            <Link to="/gemini-pris" className="text-indigo-600 hover:underline">
              Gemini-priser för företag
            </Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">GDPR och dataskydd för företag</h2>
          <p>
            Svenska företag måste säkerställa GDPR-efterlevnad när AI bearbetar
            personuppgifter. Här är vad du behöver veta:
          </p>

          <div className="space-y-3 not-prose">
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Teckna ett DPA (Databehandlingsavtal)</p>
                <p className="text-sm text-gray-600">Alla stora leverantörer erbjuder GDPR-kompatibla DPA. OpenAI, Anthropic och Google har EU-DPA. Kräv det innan ni behandlar personuppgifter.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Välj Enterprise-tier för dataskydd</p>
                <p className="text-sm text-gray-600">ChatGPT Enterprise och Claude Enterprise garanterar att ert data INTE används för modellträning. Gratisversioner och Plus ger vanligtvis inte dessa garantier.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-amber-600 font-bold mt-0.5 shrink-0">!</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Undvik personuppgifter i prompts</p>
                <p className="text-sm text-gray-600">Ens med DPA bör ni anonymisera eller pseudonymisera personuppgifter innan de skickas till AI-modeller. Bygger ni RAG-system — håll personuppgifter utanför vektordatabasen om möjligt.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-blue-600 font-bold mt-0.5 shrink-0">ℹ</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Azure OpenAI / Vertex AI för full EU-kontroll</p>
                <p className="text-sm text-gray-600">Via Azure OpenAI Service eller Google Vertex AI kan ni köra GPT-4o respektive Gemini med all bearbetning inom EU — och med microsofts/googles enterprise-avtal direkt mot er organisation.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Tre steg för att börja med AI i ert företag</h2>
          <ol className="space-y-4">
            <li>
              <strong>Steg 1: Testa med individuella abonnemang (vecka 1–4).</strong> Låt 2–3
              nyckelpersoner testa ChatGPT Plus eller Claude Pro i sina dagliga arbetsuppgifter.
              Dokumentera vilka uppgifter AI hjälper mest och hur mycket tid som sparas.
            </li>
            <li>
              <strong>Steg 2: Bygg ett internt proof-of-concept (månad 2–3).</strong> Identifiera
              ett konkret internt problem — t.ex. FAQ-bot för HR-frågor eller ett verktyg för
              att sammanfatta kundrecensioner. Bygg en enkel version via API. Mät kostnaden
              mot tidsbesparingen.
            </li>
            <li>
              <strong>Steg 3: Skala och optimera (månad 4+).</strong> Välj rätt modell för
              varje uppgift (mini för volym, flaggskepp för komplexa ärenden). Aktivera
              prompt caching där tillämpligt. Teckna DPA och säkerhetscertifieringar. Se vår{" "}
              <Link to="/ai-chatbot-kostnad" className="text-indigo-600 hover:underline">
                guide om AI-chatbot-kostnader
              </Link>{" "}
              för konkreta budgetexempel.
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">ROI — vad är AI värt för ett företag?</h2>
          <p>
            Typiska tidsbesparingar som svenska företag rapporterar:
          </p>
          <ul>
            <li>
              <strong>Textskrivande:</strong> 30–60 % snabbare för utkast, sammanfattningar och
              kundkommunikation. En anställd som skriver 2 timmar per dag sparar 1–2 timmar om
              dagen med AI-stöd — vid en timlön på 350 kr/h är det 3 500–7 000 kr i värde per
              månaden mot en AI-kostnad på 209 kr.
            </li>
            <li>
              <strong>Dokumentanalys:</strong> Att analysera ett 50-sidigt kontrakt tar en
              advokat normalt 2–3 timmar. En välkonfigurerad AI-prompt gör en första
              riskanalys på under 2 minuter. Kostnaden per analys: 5–15 kr.
            </li>
            <li>
              <strong>Kundtjänst:</strong> En AI-chatbot som svarar på 500 vanliga frågor per
              dag kostar typiskt 20–340 kr/mån beroende på modell — mot en deltidstjänst på
              minst 15 000 kr/mån. Det är ROI på hundratals procent för rätt usecase.
            </li>
          </ul>
        </section>

        <RelatedArticles links={relatedArticles["ai-for-foretag"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI för företag" />

        <Sources items={officialPricingSources} />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/ai-chatbot-kostnad" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Vad kostar en AI-chatbot?
            </p>
            <p className="text-xs text-gray-500">
              Konkreta budgetexempel för hobby, småföretag och B2C i SEK.
            </p>
          </Link>
          <Link to="/vad-kostar-ai" className="card hover:border-indigo-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1 text-sm">
              Komplett AI-prisguide 2026
            </p>
            <p className="text-xs text-gray-500">
              Alla AI-leverantörer och abonnemang jämförda i SEK.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
