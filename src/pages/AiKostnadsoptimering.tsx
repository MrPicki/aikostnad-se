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
      name: "Hur mycket kan man spara genom att byta från GPT-4o till GPT-4o mini?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPT-4o mini är 94% billigare per token än GPT-4o (0,15 vs 2,50 USD/Mtok input). I praktiken betyder det att 1 000 kr/mån i GPT-4o-kostnader kan minska till 60 kr/mån om alla anrop klaras av minimodellen. De flesta applikationer kan använda mini för 70–90% av anropen, vilket ger 50–80% kostnadsreduktion totalt.",
      },
    },
    {
      "@type": "Question",
      name: "Vad är prompt caching och hur mycket sparar det?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prompt caching lagrar delar av prompten (system-prompten, dokument, exempel) på servern och återanvänder dem mellan anrop. Cachade tokens kostar 75–80% mindre än vanliga input-tokens. Om ni har en lång system-prompt (500+ tokens) som upprepas i varje anrop kan caching spara 40–60% på input-kostnader. Läs mer i vår guide om prompt caching.",
      },
    },
  ],
};

const faqs: FAQItem[] = [
  {
    question: "Hur mycket kan man spara genom att byta från GPT-4o till GPT-4o mini?",
    answer:
      "GPT-4o mini är 94% billigare per token än GPT-4o. I praktiken: 1 000 kr/mån i GPT-4o-kostnader kan minska till 60 kr/mån om alla anrop klaras av mini. De flesta applikationer kan använda mini för 70–90% av anropen — klassificering, FAQ-svar, korta sammanfattningar. Komplex resonering och långa analyser kräver flaggskeppet.",
  },
  {
    question: "Vad är prompt caching och hur mycket sparar det?",
    answer:
      "Prompt caching lagrar delar av prompten (system-prompt, dokument, exempel) på servern och återanvänder dem. Cachade tokens kostar 75–80% mindre än vanliga tokens. Om er system-prompt är 1 000 tokens och skickas i varje av 10 000 dagliga anrop — utan caching kostar det ~2,6 kr/dag, med caching ~0,5 kr/dag. Läs vår guide om prompt caching för implementationsdetaljer.",
  },
  {
    question: "Är Batch API värt att använda?",
    answer:
      "OpenAI Batch API ger 50% rabatt på asynkrona anrop som levereras inom 24 timmar. Det passar perfekt för: dagliga rapporter och sammanfattningar, massbedömning av supportärenden, SEO-generering av metadata, bulk-embeddings. Inte lämpligt för realtids-chatbottar. Om ni har 50%+ av era anrop i icke-tidskritiska processer är Batch API ett enkelt sätt att halvera den delen av kostnaden.",
  },
  {
    question: "Hur räknar man ut optimal max_tokens för att spara pengar?",
    answer:
      "Output kostar 4× mer per token än input (GPT-4o: 2,50 vs 10,00 USD/Mtok). Analysera era faktiska outputlängder — om median-svaret är 200 tokens men max_tokens är satt till 500, slösar ni ingenting (modellen stoppar ändå). Men om ni explicit ber om 'detaljerade förklaringar' och får 800-tokenssvar när 200 räcker, kan du reformulera prompten och spara 75% på output.",
  },
  {
    question: "Vilka verktyg finns för att övervaka och budgetera AI-kostnader?",
    answer:
      "OpenAI: inbyggd Usage-dashboard med dagliga kostnadsgrapfer, plus möjlighet att sätta hårda månadstak. Anthropic: liknande Usage-sida. LangSmith och Helicone är tredjepartsverktyg som ger detaljerad per-prompt-spårning och kan flagga dyra anrop. För team: sätt per-person API-nycklar med individuella limit — det förhindrar att en utvecklare råkar skicka miljoner tokens i ett test.",
  },
  {
    question: "Vad är hybrid-routing och hur implementerar man det?",
    answer:
      "Hybrid-routing innebär att enkla anrop skickas till billiga modeller och komplexa till dyra. Enklaste implementationen: en klassificeringsmodell (GPT-4o mini eller liknande, kostar ~öre) bedömer varje fråga och routar antingen till mini eller flaggskeppsmodellen. Med 80% av anrop till mini och 20% till GPT-4o minskar ni kostnaden med ~75% jämfört med att alltid använda GPT-4o.",
  },
];

const sources = [
  { title: "OpenAI Pricing", url: "https://openai.com/api/pricing/" },
  { title: "OpenAI Batch API docs", url: "https://platform.openai.com/docs/guides/batch" },
  { title: "Anthropic Prompt Caching guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" },
  { title: "OpenAI Prompt Caching docs", url: "https://platform.openai.com/docs/guides/prompt-caching" },
];

export function AiKostnadsoptimering() {
  return (
    <>
      <SEO
        title="Sänk din AI-kostnad: 7 konkreta sätt att optimera 2026"
        description="Hur sänker man AI-kostnader i en app eller verksamhet? Model routing, prompt caching, Batch API, output-trimning och mer — beräknat i SEK med verkliga exempel."
        canonical="/ai-kostnadsoptimering"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI-kostnadsoptimering", url: "https://aikostnad.se/ai-kostnadsoptimering" },
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
            Sänk din AI-kostnad: 7 konkreta sätt 2026
          </h1>

          <LastUpdated date="2026-06-15" />

          <TLDR
            question="Hur mycket kan man spara på AI-kostnader?"
            answer={
              <>
                Med rätt optimering kan de flesta applikationer sänka sina AI-kostnader med{" "}
                <strong>50–85%</strong> utan att kvaliteten märkbart försämras. De tre
                viktigaste åtgärderna är: (1) <strong>modell-routing</strong> — billiga modeller
                för enkla uppgifter, (2) <strong>prompt caching</strong> för långa system-prompter,
                och (3) <strong>Batch API</strong> för icke-realtids-processer.
              </>
            }
            bullets={[
              "GPT-4o mini: 94% billigare än GPT-4o — passar 70-90% av vanliga uppgifter",
              "Prompt caching: 75-80% lägre kostnad på cachade tokens",
              "Batch API (OpenAI): 50% rabatt på asynkrona anrop",
              "Output-trimning: output kostar 4× mer än input — kortare svar sparar direkt",
              "Hybrid-routing: klassificera varje fråga och välj modell dynamiskt",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed mt-6">
            <p>
              AI-kostnader kan snabbt bli oförutsägbara i en produktionsapplikation. En chatbot
              med 1 000 dagliga användare kan kosta allt från 200 kr/mån till 10 000 kr/mån
              beroende på modellval, prompt-design och hur effektivt ni använder leverantörens
              tekniska funktioner. Den goda nyheten: de flesta optimeringar är tekniskt enkla
              och ger mätbar effekt från dag ett.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">1. Välj rätt modell för varje uppgift</h2>
          <p>
            Det enskilt snabbaste sättet att sänka kostnader. GPT-4o kostar $2,50/Mtok input
            och $10,00/Mtok output. GPT-4o mini kostar $0,15/Mtok input och $0,60/Mtok output
            — det är <strong>94% billigare</strong>. Claude Haiku 3.5 och Gemini Flash är
            liknande i samma prisklass.
          </p>
          <p>
            Uppgifter som klaras utmärkt av minimodeller: klassificering av supportärenden,
            korta FAQ-svar med fast format, sentiment-analys, extraktion av strukturerad data
            (namn, datum, belopp), enkel kodsyntax, och sammanfattning av korta texter. Uppgifter
            som kräver flaggskeppet: komplex resonering i flera steg, lång-form analys med
            källkritik, kod-debugging med subtila logikfel, och kreativt skrivande med hög
            originalitetskrav.
          </p>
          <div className="not-prose bg-gray-50 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-800 mb-2">Räkneexempel: 10 000 anrop/dag (100 tokens input, 200 tokens output)</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">GPT-4o alltid</p>
                <p className="font-bold text-lg text-gray-900">~7 000 kr/mån</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">80% mini, 20% GPT-4o</p>
                <p className="font-bold text-lg text-green-700">~1 750 kr/mån</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">GPT-4o mini alltid</p>
                <p className="font-bold text-lg text-green-700">~425 kr/mån</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">1 USD = 10,50 SEK. Räknas med 1,3 tokens/ord (svenska).</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Prompt caching — det mest underskattade verktyget</h2>
          <p>
            Prompt caching innebär att de delar av prompten som är identiska mellan anrop —
            system-prompten, ett referensdokument, ett batteri av exempel — lagras hos
            leverantören och återanvänds. Cachade tokens kostar <strong>75–80% mindre</strong>
            än vanliga input-tokens.
          </p>
          <p>
            OpenAI aktiverar caching automatiskt för prompter längre än 1 024 tokens. Ni
            behöver strukturera prompts rätt: statisk del (system-prompt, dokument, exempel)
            FÖRST, dynamisk del (användarens fråga) sist. Cachen lever i 5–10 minuter, vilket
            räcker för de flesta applikationer med hög trafik.
          </p>
          <p>
            Anthropic kräver explicit aktivering via API-parametern{" "}
            <code>cache_control: {"{{"}type: "ephemeral"{"}}"}</code> på de block ni vill cacha.
            Läs vår detaljerade{" "}
            <Link to="/prompt-caching" className="text-brand-700 hover:underline">
              guide om prompt caching
            </Link>{" "}
            för implementationsexempel i Python och Node.js.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Batch API för icke-realtids-processer</h2>
          <p>
            OpenAI:s Batch API ger 50% rabatt på anrop som inte behöver svar inom 24 timmar.
            Ni skickar en JSON-fil med upp till 50 000 anrop, och OpenAI levererar svaren i
            en fil inom 24 timmar (normalt snabbare).
          </p>
          <p>
            Perfekt för: daglig generering av produktbeskrivningar, nattlig analys av
            supportärenden, bulk-embeddings för sökindex, SEO-optimering av metadata, och
            automatiska rapporter. Inte lämpligt för realtids-chatbottar eller
            tidskritiska processer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Begränsa output-längden</h2>
          <p>
            Output kostar 4× mer per token än input hos GPT-4o ($10,00 vs $2,50/Mtok). Det
            innebär att ett svar på 800 tokens kostar lika mycket som att skicka 3 200 tokens
            som input. Tre sätt att minska output-kostnaden:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Sätt max_tokens:</strong> Hitta er faktiska median-outputlängd i
              produktionsloggar och sätt max_tokens till ~150% av medianen. Sällsynta
              långa svar trunkeras, men det påverkar sällan användarupplevelsen.
            </li>
            <li>
              <strong>Instruera korthet i prompten:</strong> "Svara i max tre meningar" eller
              "Svara i JSON utan förklaring" minskar output drastiskt. Testa med er faktiska
              prompt — ofta kan man halvera outputlängden utan kvalitetsförsämring.
            </li>
            <li>
              <strong>Structured outputs / JSON mode:</strong> Modellen producerar bara det
              som faktiskt efterfrågas, utan inledande fraser som "Självklart, här är svaret:"
              Typiskt 20–40% kortare output.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">5. RAG istället för långa kontexter</h2>
          <p>
            En chatbot som inkluderar hela konversationshistoriken i varje anrop
            multiplicerar snabbt sin token-förbrukning. En konversation på 10 tur-tagningar
            (400 tokens/tur) innebär att det sista anropet skickar 4 000 tokens enbart i
            historik — även om de flesta av dem är irrelevanta för den aktuella frågan.
          </p>
          <p>
            Retrieval-Augmented Generation (RAG) löser detta: istället för att inkludera
            hela dokumentet eller historiken i varje prompt, hämtar ni bara de relevanta
            delarna via vektorsökning. En RAG-implementation med pgvector (PostgreSQL) eller
            Pinecone kostar typiskt {`<`}500 kr/mån och kan minska token-förbrukningen med
            60–80% för dokumentbaserade applikationer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">6. Övervaka och sätt budgettak</h2>
          <p>
            OpenAI, Anthropic och Google erbjuder alla möjligheten att sätta månadstak för
            API-användning. Om ni inte har ett tak och en bugg råkar loopa 100 000 anrop
            per timme — vilket händer — kan notan bli massiv.
          </p>
          <p>
            Praktisk setup: sätt hårt månadstak på 2× era förväntade kostnader.
            Lägg till alerting på 50% och 80% av taket. Använd separata API-nycklar per
            miljö (dev/staging/prod) med individuella tak — det förhindrar att ett test
            laddar ur produktionsbudgeten.
          </p>
          <p>
            Helicone och LangSmith är tredjepartsverktyg som ger detaljerad spårning på
            prompt-nivå — ni ser exakt vilka prompts som är dyra och kan optimera dem
            specifikt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">7. Fine-tuning för repetitiva uppgifter</h2>
          <p>
            Om ni har en specifik, väldefinierad uppgift som ni gör tusentals gånger per dag —
            t.ex. klassificera supportärenden i 12 kategorier, extrahera fält från fakturor,
            eller omformulera produktbeskrivningar i ett specifikt format — kan fine-tuning
            ge lägre kostnad OCH bättre kvalitet än ett grundmodell med en lång prompt.
          </p>
          <p>
            OpenAI:s fine-tuning av GPT-4o mini kostar $3/miljon tokens för träningsdatan och
            ger sedan lägre kostnad per anrop eftersom system-prompten kan kortas dramatiskt.
            För uppgifter med {`>`}100 000 anrop/dag är payback-perioden ofta under en månad.
          </p>

          <div className="not-prose mt-8 bg-brand-50 border border-brand-100 rounded-xl p-5">
            <h3 className="font-bold text-brand-900 mb-2">Räkna ut din optimerade kostnad</h3>
            <p className="text-sm text-brand-800 mb-3">
              Testa vad olika modellval och volymer kostar med live-valutakurs i vår kalkylator.
            </p>
            <Link
              to="/"
              className="inline-block bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-800 transition-colors text-sm"
            >
              Öppna kostnadskalkylatorn →
            </Link>
          </div>
        </section>

        <RelatedArticles links={relatedArticles["prompt-caching"] || relatedArticles["ai-api-kostnad"] || []} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-kostnadsoptimering" />

        <Sources items={sources} />
      </main>
    </>
  );
}
