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

const article = articles["ai-api-kostnad"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar det att bygga en app med AI-API från noll?",
    answer:
      "Det beror helt på volym och modellval. En MVP med under 1 000 aktiva användare och GPT-4o mini kostar typiskt 200–2 000 kr/mån i ren API-kostnad. Väljer du en premiumpmodell som GPT-4o eller Claude Sonnet kan samma volym kosta 5–20 gånger mer. Börja alltid med en mini-modell och uppgradera bara när du mäter att kvaliteten inte räcker.",
  },
  {
    question: "Hur räknar jag ut kostnad per användare?",
    answer:
      "Formeln är: (tokens per fråga × antal frågor per user per månad × pris per token) = AI-kostnad per user. Exempel: 300 tokens/fråga × 50 frågor/mån × GPT-4o mini-pris (1,58 kr per Mtok) = 300 × 50 × 0,00000158 kr = 0,0237 kr per user per månad. Med 1 000 MAU = 23,7 kr/mån totalt — extremt prisvärt.",
  },
  {
    question: "Vad är prompt caching och hur mycket sparar det?",
    answer:
      "Prompt caching innebär att du återanvänder en lång system-prompt utan att betala fullt pris för varje anrop. Claude ger upp till 90 % rabatt på cachad input, OpenAI ger 50 %. Om din system-prompt är 2 000 tokens och du gör 100 000 anrop/mån kan caching spara 80–90 % av input-kostnaden. Det är en av de mest effektiva sätten att sänka API-notan.",
  },
  {
    question: "När ska jag byta från abonnemang till API?",
    answer:
      "Abonnemang (ChatGPT Plus, Claude Pro på 210 kr/mån) är billigast om du är en enskild användare med måttlig användning. Bygger du en produkt som fler ska använda är API alltid rätt val — du betalar per faktisk förbrukning och kan tjäna pengar på skillnaden. En SaaS med 100+ users har nästan alltid bättre ekonomi med API + smart modellval än att köpa per-seat-licenser.",
  },
  {
    question: "Hur undviker jag oväntade API-räkningar?",
    answer:
      "Sätt alltid spending limits i OpenAI/Anthropic-dashboarden. Implementera max_tokens på varje anrop för att begränsa output-längd. Logga tokens per request och bygg dashboards för faktisk förbrukning. Testa nya funktioner med batch-API (50 % rabatt) innan du exponerar dem för real-time-trafik. Ha alltid en 20-procentig kostnadsbuffer i budgeten.",
  },
];

export function AiApiKostnad() {
  return (
    <>
      <SEO
        title="AI API kostnad — vad kostar det att integrera AI i din app?"
        description="Typiska AI API-kostnader för startups och SaaS. Estimera kostnader, räkna cost-per-user och sänk notan med caching och smart modellval. Realistiska budgetar i SEK."
        canonical="/ai-api-kostnad"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI API kostnad", url: "https://aikostnad.se/ai-api-kostnad" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Vad kostar det att integrera AI i en app eller tjänst?
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar AI API för en SaaS-app?"
            answer={
              <>
                En SaaS-app med 1 000 aktiva användare kostar typiskt{" "}
                <strong>200–2 000 kr/mån</strong> i AI-API-kostnader med GPT-4o mini. Välj
                mini-modell för 80 % av förfrågningarna och premiumpmodell för resten. Caching är
                gratis — och kan halvera din faktura.
              </>
            }
            bullets={[
              "1 000 MAU × 50 frågor × 300 tokens med GPT-4o mini ≈ 237 kr/mån",
              "Cost-per-user: 0,24 kr/mån — enkelt att prissätta i din produkt",
              "Smart routing: billig modell för enkla frågor, dyr för komplexa",
              "Prompt caching: 50–90 % rabatt på återanvänd system-prompt",
              "MVP-budget (0–1 000 users): 200–2 000 kr/mån",
              "Growth-budget (1K–10K users): 2 000–20 000 kr/mån",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Att integrera AI i en app eller tjänst är inte längre en fråga om teknik — det är en fråga om
            ekonomi. Hur mycket kostar varje API-anrop? Vad betyder det i cost-per-user? Och hur ska du
            budgetera innan du ens vet din volym? Den här guiden ger dig konkreta formler, räkneexempel
            i SEK och riktlinjer för varje tillväxtfas.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Startup vs etablerad SaaS — två olika problem</h2>
            <p className="text-gray-700 leading-relaxed">
              En startup i tidig fas vet inte hur mycket användarna faktiskt kommer att använda AI-funktionen.
              Den etablerade SaaS-bolaget vet exakt sin MAU, sina sessions-mönster och sin input/output-ratio.
              Det gör att de har helt olika utmaningar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Startup (osäker volym):</strong> prioritera lägsta möjliga pris per token, sätt hårda
              spending limits och bygg in en modell-kill-switch. GPT-4o mini eller Claude Haiku är ditt
              standardval — du kan alltid uppgradera. Estimera worst case (alla användare använder allt hela
              månaden) och räkna om det är hanterbart.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Etablerad SaaS (känd volym):</strong> du har data — använd den. Titta på genomsnittlig
              tokens per session, peak-tider och vilka features som driver mest AI-förbrukning. Här lönar det
              sig att optimera: caching, batching och modell-routing kan sänka kostnaden 50–80 % utan att
              försämra användarupplevelsen nämnvärt.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Estimera kostnader INNAN du bygger</h2>
            <p className="text-gray-700 leading-relaxed">
              Grundformeln för att estimera API-kostnader är enkel:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose">
              <p className="font-mono text-sm text-gray-800 leading-relaxed">
                Kostnad/mån = tokens/fråga × frågor/user/mån × antal users × pris/token
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tokenlängder varierar. Enkla frågor med korta svar: 200–500 tokens totalt. Komplexa frågor med
              lång kontext och detaljerat svar: 2 000–8 000 tokens. System-prompten tillkommer varje gång —
              det är här caching sparar mest.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Räkna alltid med en input/output-ratio på 60/40 eller 70/30. Output-tokens är alltid dyrare
              (3–5× hos de flesta leverantörer), men systemprompten och kontexten utgör vanligen majoriteten
              av input-tokens — och den kan cachas.
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Scenario</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Tokens/fråga</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Typisk use case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2">Enkelt</td>
                    <td className="px-3 py-2">200–500</td>
                    <td className="px-3 py-2">Klassificering, tagging, FAQ-svar</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Medel</td>
                    <td className="px-3 py-2">500–2 000</td>
                    <td className="px-3 py-2">Chatt med kontext, sammanfattning</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Komplext</td>
                    <td className="px-3 py-2">2 000–8 000</td>
                    <td className="px-3 py-2">Dokumentanalys, kod, RAG</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Agent</td>
                    <td className="px-3 py-2">8 000–50 000</td>
                    <td className="px-3 py-2">Multi-step agentic workflows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Cost-per-user — ett konkret räkneexempel</h2>
            <p className="text-gray-700 leading-relaxed">
              Låt oss räkna på ett realistiskt SaaS-scenario: en app med 1 000 månatliga aktiva användare
              (MAU), där varje user ställer i genomsnitt 50 frågor per månad och varje fråga genererar
              300 tokens (input + output sammanlagt).
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 not-prose space-y-3">
              <h3 className="text-base font-bold text-indigo-900">Räkneexempel: 1 000 MAU</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Volym: 1 000 users × 50 frågor × 300 tokens = <strong>15 000 000 tokens/mån</strong> (15 Mtok)</li>
                <li>GPT-4o mini input: 15 × 1,58 kr = 23,7 kr</li>
                <li>GPT-4o mini output (antag 1/3 output): 5 × 6,30 kr = 31,5 kr</li>
                <li><strong>Total: ~55 kr/mån</strong> — eller 0,055 kr per user per månad</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">
                Vill du räkna med din exakta volym?{" "}
                <Link to="/" className="text-indigo-700 hover:underline">Använd kalkylatorn på startsidan.</Link>
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Det är en remarkabelt låg kostnad. Även med GPT-4o (26,25 kr/Mtok input) och 10× fler tokens
              hamnar du under 1 000 kr/mån för 1 000 users — ett belopp som enkelt ryms i en modest
              SaaS-marginal. Det är när du skalear till 100 000+ users utan optimering som det börjar bita.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sänka kostnaderna — fyra beprövade metoder</h2>

            <h3 className="text-xl font-semibold text-gray-900">1. Välj rätt modell för uppgiften</h3>
            <p className="text-gray-700 leading-relaxed">
              Den enskilt mest effektiva åtgärden. GPT-4o mini kostar 17× mindre än GPT-4o per token. Claude
              Haiku kostar 5× mindre än Claude Sonnet. Gemini 2.5 Flash kostar 8× mindre än GPT-4o. Analysera
              dina förfrågningar — troligtvis kan 70–80 % hanteras av en billigare modell utan att användaren
              märker någon skillnad.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">2. Prompt caching — gratis guldgruva</h3>
            <p className="text-gray-700 leading-relaxed">
              Om din system-prompt är 2 000 tokens lång och du gör 100 000 API-anrop per månad betalar du
              normalt för 200 miljoner tokens i system-prompt-input. Med{" "}
              <Link to="/prompt-caching" className="text-indigo-700 hover:underline font-medium">prompt caching</Link>{" "}
              (90 % rabatt hos Claude, 50 % hos OpenAI) sänker du det till 20–100 miljoner tokens. Det är
              vanligtvis den billigaste optimeringen räknat i implementationstid per sparad krona.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">3. Batching för icke-tidskritiska jobs</h3>
            <p className="text-gray-700 leading-relaxed">
              OpenAI:s Batch API ger 50 % rabatt på alla modeller mot svarstid inom 24 timmar. Perfekt för
              dokumentanalys, klassificering av historik, embedding-pipelines och nattliga rapporter. En
              kund som batch-bearbetar 500 miljoner tokens/mån sparar 50 % — potentiellt tusentals kronor.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">4. Smart routing — billig modell för enkla frågor</h3>
            <p className="text-gray-700 leading-relaxed">
              Bygg ett enkelt klassificeringssteg som avgör om frågan är enkel eller komplex. Enkla frågor
              (FAQ, klassificering, korta svar) skickas till GPT-4o mini eller Claude Haiku. Komplexa frågor
              (analys, kodning, långa dokument) eskaleras till GPT-4o eller Claude Sonnet. I praktiken
              hamnar 60–80 % av frågor i den billiga kategorin.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Budgetriktlinjer per tillväxtfas</h2>
            <p className="text-gray-700 leading-relaxed">
              Baserat på erfarenhet från hundratals AI-produkter kan vi ge dessa riktlinjer för rimliga
              AI API-budgetar. Notera att dessa förutsätter GPT-4o mini eller motsvarande för majoriteten
              av förfrågningarna.
            </p>

            <div className="space-y-4 not-prose">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-green-900 mb-2">MVP (0–1 000 aktiva users)</h3>
                <p className="text-sm text-gray-700">
                  <strong>200–2 000 kr/mån.</strong> I den här fasen är API-kostnaden ditt minsta problem —
                  fokusera på att validera produkten. Sätt en spending limit på 500 kr/mån och skala upp när
                  du har betalande kunder. GPT-4o mini för allt.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-amber-900 mb-2">Growth (1 000–10 000 users)</h3>
                <p className="text-sm text-gray-700">
                  <strong>2 000–20 000 kr/mån.</strong> Nu börjar det vara värt att optimera. Implementera
                  prompt caching, mät tokens per request och identifiera de dyraste endpoints. Smart routing
                  kan spara 30–50 % av kostnaden i den här fasen.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-red-900 mb-2">Scale (10 000+ users)</h3>
                <p className="text-sm text-gray-700">
                  <strong>20 000 kr/mån och uppåt.</strong> Vid den här skalan är optimering inte valfritt —
                  det är en central del av produkten. Titta på volymrabatter, enterprise-avtal och om det
                  lönar sig att host:a egna open-source-modeller för delar av workloaden. DeepSeek V3
                  self-hosted kan vara aktuellt för icke-känsliga data.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vanliga och kostsamma misstag</h2>
            <p className="text-gray-700 leading-relaxed">
              Dessa misstag ser vi upprepade gånger hos team som bygger AI-produkter för första gången:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Streaming utan caching:</strong> Streaming (token för token i realtid) förhindrar
                ofta prompt caching att fungera korrekt. Om du streamar svar utan att ha konfigurerat
                explicit caching betalar du fullt pris för varje system-prompt varje gång.
              </li>
              <li>
                <strong>GPT-4o där GPT-4o mini räcker:</strong> Det vanligaste misstaget. Testa alltid
                mini-modellen först. Skillnaden märks sällan för användaren men syns alltid på fakturan.
              </li>
              <li>
                <strong>Ingen kontroll på input/output-ratio:</strong> Om du låter användaren mata in obegränsad
                text och ber modellen generera långa svar utan max_tokens-limit kan en enskild session kosta
                10–100× mer än genomsnittet. Sätt alltid max_tokens.
              </li>
              <li>
                <strong>Glömt att räkna konversationshistorik:</strong> I chatt-applikationer skickar du
                hela samtalshistoriken med varje meddelande. Vid 20 utbyten i ett samtal kan du skicka
                10× mer tokens än för en enkel fråga. Implementera context-window-management från dag ett.
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 not-prose">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Alla siffror i den här guiden är uppskattningar baserade på typiska scenarios. Din produkt är
              unik. Använd{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">kalkylatorn på startsidan</Link>{" "}
              för att mata in dina faktiska tokens per fråga, förväntad volym och val av modell — och se
              exakt vad det kostar per månad i SEK med live-valutakurs. Jämför också gärna{" "}
              <Link to="/billigaste-ai" className="text-indigo-700 hover:underline font-medium">billigaste AI-modellerna</Link>{" "}
              och{" "}
              <Link to="/prompt-caching" className="text-indigo-700 hover:underline font-medium">vår guide om prompt caching</Link>{" "}
              för att maximera besparingarna.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-api-kostnad"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI API-kostnader för apputveckling" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
