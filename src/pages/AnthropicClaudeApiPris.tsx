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
import { trackEvent } from "../utils/analytics";

const article = articles["anthropic-claude-api-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Claude API per månad för ett litet företag?",
    answer:
      "Det beror helt på volymen. En kundtjänst-chatbot som hanterar 200 frågor per dag kostar typiskt 150–400 kr/mån med Claude Haiku 4.5, och 600–1 200 kr/mån med Claude Sonnet 4.6 utan caching. Med prompt caching (fast system-prompt) halveras inputkostnaden. För ett internt verktyg med 20–50 förfrågningar/dag rör det sig om 20–80 kr/mån.",
  },
  {
    question: "Vad är skillnaden mellan Claude Opus, Sonnet och Haiku?",
    answer:
      "Opus 4.7 är Anthropics kraftfullaste modell, avsedd för komplexa agenter, avancerad kodgenerering och djup analys — men kostar 52,50 SEK/Mtok (input) och 262,50 SEK/Mtok (output). Sonnet 4.6 är balansmodellen med hög kvalitet till rimligt pris (31,50/157,50 SEK/Mtok) och används av de flesta produktionsapplikationer. Haiku 4.5 är snabbast och billigast (10,50/52,50 SEK/Mtok) och lämpar sig för enkla Q&A-bots och klassificeringsuppgifter.",
  },
  {
    question: "Hur fungerar prompt caching och hur mycket kan jag spara?",
    answer:
      "Prompt caching låter dig märka upp en del av din prompt (t.ex. systeminstruktioner eller ett långt dokument) så att Anthropic cachelagrar den. Nästa gång samma prefix skickas betalas bara 10 % av normalt input-pris. För Claude Sonnet 4.6 innebär det 3,15 SEK/Mtok för cachad input istället för 31,50 SEK/Mtok. Om din systemprompt är 500 ord och du gör 5 000 anrop per dag sparar du ca 85 % av den kostnadsdelen per månad.",
  },
  {
    question: "Är Claude GDPR-kompatibelt för svenska företag?",
    answer:
      "Anthropic erbjuder GDPR Data Processing Agreement (DPA) för Enterprise-kunder. De har också möjlighet till EU-dataresidens via AWS-regioner i Europa. För standardkunder via API:t är data subject to US law. Behöver du garanterad EU-dataresidens bör du förhandla ett Enterprise-avtal, eller undersöka europeiska alternativ som Mistral Large (franska servrar).",
  },
  {
    question: "Vad kostar Claude.ai-abonnemanget jämfört med API:t?",
    answer:
      "Claude.ai Free är gratis med begränsad daglig användning. Claude.ai Pro kostar 209 kr/mån (ca 20 USD) och ger obegränsat tillgång till Sonnet och Haiku, plus 5× mer Opus-användning än Free. Claude Team kostar ca 280 kr/user/mån och lägger till delad arbetsyta, längre kontext och prioritet. API:t faktureras per token och är bättre för automerade system och hög volym — abonnemangen passar bättre för manuellt arbete och kunskap.",
  },
];

export function AnthropicClaudeApiPris() {
  return (
    <>
      <SEO
        title="Anthropic Claude API pris 2026 — Claude Opus, Sonnet, Haiku i SEK"
        description="Alla Claude-modellers priser i svenska kronor. Skillnad mellan Opus, Sonnet och Haiku. Prompt caching-besparingar, GDPR och jämförelse mot OpenAI. Maj 2026."
        canonical="/anthropic-claude-api-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Anthropic Claude API pris", url: "https://aikostnad.se/anthropic-claude-api-pris" },
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
            Claude API priser — Opus, Sonnet och Haiku i kronor
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilket Claude-tier ska jag välja?"
            answer={
              <>
                <strong>Claude Haiku 4.5</strong> är billigast (10,50/52,50 kr/Mtok) och räcker för enkla chatbots och klassificering. <strong>Claude Sonnet 4.6</strong> är bäst balans (31,50/157,50 kr/Mtok) och används i de flesta produktionsapplikationer. Med <strong>prompt caching</strong> sjunker Sonnets effektiva inputpris till 3,15 kr/Mtok för cachad del — den starkaste prisoptimeringen för chatbotar med fast systemprompt.
              </>
            }
            bullets={[
              "Haiku 4.5: 10,50 SEK input / 52,50 SEK output per Mtok",
              "Sonnet 4.6: 31,50 SEK input / 157,50 SEK output per Mtok",
              "Opus 4.7: 52,50 SEK input / 262,50 SEK output per Mtok",
              "Prompt caching: 90 % rabatt på cachad input = 3,15 kr/Mtok (Sonnet)",
              "Claude.ai Pro: 209 kr/mån, Team: 280 kr/user/mån",
              "GDPR DPA finns för Enterprise — kräver avtal",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Anthropic erbjuder tre distinkta modellnivåer i sitt Claude API — Opus, Sonnet
            och Haiku — med priser i USD som omräknat till svenska kronor (1 USD = 10,50 SEK)
            ger tydliga skillnader i kostnad och kapacitet. Det här är en komplett genomgång
            av vad varje modell kostar, när du ska välja vilken och hur prompt caching
            dramatiskt kan sänka din månadsnotan.
          </p>

          {/* Full pricing table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Alla Claude API-priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              Nedan är fullständig pristabell för Claude API i maj 2026, omräknat till
              svenska kronor. Priserna är per miljon tokens (Mtok).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input SEK/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output SEK/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Cachad input SEK/Mtok</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Kontextfönster</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Bäst för</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Opus 4.7</td>
                    <td className="px-3 py-2 text-right">52,50</td>
                    <td className="px-3 py-2 text-right">262,50</td>
                    <td className="px-3 py-2 text-right">5,25</td>
                    <td className="px-3 py-2">200 000 tokens</td>
                    <td className="px-3 py-2">Komplexa agenter, avancerad kod</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2 text-right">31,50</td>
                    <td className="px-3 py-2 text-right">157,50</td>
                    <td className="px-3 py-2 text-right">3,15</td>
                    <td className="px-3 py-2">200 000 tokens</td>
                    <td className="px-3 py-2">Produktion, balans, svenska</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Haiku 4.5</td>
                    <td className="px-3 py-2 text-right">10,50</td>
                    <td className="px-3 py-2 text-right">52,50</td>
                    <td className="px-3 py-2 text-right">1,05</td>
                    <td className="px-3 py-2">200 000 tokens</td>
                    <td className="px-3 py-2">Snabb Q&A, klassificering, hög volym</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Priser baserade på Anthropics officiella prislista maj 2026. 1 USD = 10,50 SEK.
              Caching write-pris (Sonnet): 39,38 SEK/Mtok. Cachad read: 3,15 SEK/Mtok (90 % rabatt).
              Verifiera alltid mot{" "}
              <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                anthropic.com/pricing
              </a>{" "}
              innan du ingår avtal.
            </p>
          </section>

          {/* When to use which model */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vilken Claude-nivå ska du välja?</h2>
            <p className="text-gray-700 leading-relaxed">
              Anthropics tre modeller är inte bara olika priser — de är designade för
              fundamentalt olika uppgifter. Att välja rätt modell kan vara skillnaden
              mellan en månadskostnad på 200 kr och 2 000 kr för samma volym.
            </p>

            <h3 className="text-lg font-bold text-gray-900">Claude Haiku 4.5 — när snabbhet och kostnad prioriteras</h3>
            <p className="text-gray-700 leading-relaxed">
              Haiku är den snabbaste och billigaste Claude-modellen. Med 10,50 SEK per
              miljon input-tokens är den konkurrenskraftig mot GPT-4o mini (1,58 SEK/Mtok),
              men Haiku ger genomgående bättre svenska och mer naturliga svar för
              nordiska marknader. Typiska användningsfall:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>FAQ-chatbotar med enkla, upprepade frågor</li>
              <li>Klassificering av kundärenden, kategorisering av text</li>
              <li>Snabb extraktion av data ur strukturerade dokument</li>
              <li>Notifikations-texter och korta mallbaserade svar</li>
              <li>Pipelines med hög volym där latens är viktigt</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900">Claude Sonnet 4.6 — standardvalet för produktion</h3>
            <p className="text-gray-700 leading-relaxed">
              Sonnet 4.6 är den modell de flesta professionella applikationer bör starta med.
              Den balanserar kapacitet och kostnad på ett sätt som gör den till rätt val för
              de flesta use cases. Styrkor:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>Utmärkt på svenska — naturligare och mer kontextmedveten än GPT-4o</li>
              <li>200 000 tokens kontextfönster — hela böcker, långa avtal, kodbasers utdrag</li>
              <li>Stark på dokumentanalys, summering och strukturerad textgenerering</li>
              <li>Bäst utnyttjande av prompt caching — cachad input kostar bara 3,15 SEK/Mtok</li>
              <li>Pålitlig för kundkommunikation, offert-generering, rapportskrivning</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900">Claude Opus 4.7 — för komplexa agenter och expertuppgifter</h3>
            <p className="text-gray-700 leading-relaxed">
              Opus är Anthropics kraftfullaste modell och kostar 5× mer än Sonnet på input.
              Den är motiverad i begränsade situationer: när du bygger autonoma agenter som
              planerar och utför komplexa flerstegsuppgifter, analyserar kod på arkitekturell
              nivå, eller behöver den starkaste möjliga resonemangsförmågan. De flesta
              produktionsapplikationer har inte behov av Opus.
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Beslutsguide</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Enkel chatbot, hög volym, kostnadskänslig:</strong> Haiku 4.5</li>
                <li><strong>Produktion, svenska, dokumentanalys, chatbot med systemprompt:</strong> Sonnet 4.6</li>
                <li><strong>Komplex AI-agent, avancerad kodanalys, expertresone mang:</strong> Opus 4.7</li>
                <li><strong>Prototyp/test:</strong> börja med Sonnet, byt baserat på behov</li>
              </ul>
            </div>
          </section>

          {/* Prompt caching */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Prompt caching — Anthropics hemliga prisfördel</h2>
            <p className="text-gray-700 leading-relaxed">
              Prompt caching är den enskilt viktigaste prisoptimeringsmöjligheten i Claude API.
              Konceptet är enkelt: om du har en lång systemprompt (instruktioner, kontext,
              personlighet) som är densamma i varje anrop kan du cachelagra den hos Anthropic.
              Återanvändning av cached tokens kostar bara 10 % av normalt input-pris.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I praktiken för Claude Sonnet 4.6:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>Normal input: <strong>31,50 SEK/Mtok</strong></li>
              <li>Caching write (första gången du lagrar prefixet): <strong>39,38 SEK/Mtok</strong></li>
              <li>Cached read (alla efterföljande anrop): <strong>3,15 SEK/Mtok</strong> — 90 % rabatt</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Konkret exempel: din chatbot har en 600-ord systemprompt (≈800 tokens) och
              hanterar 3 000 frågor per dag. Utan caching betalar du full input-pris för
              de 800 systemprompt-tokens varje gång. Med caching betalar du bara 3,15 SEK/Mtok
              för dem — en besparing på ~22 kr per 1 000 anrop, eller ca 660 kr i månaden
              enbart på systemprompt-delen. För chatbotar med lång kontext och hög volym
              kan caching halvera den totala månadsnotan.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Läs mer i vår{" "}
              <Link to="/prompt-caching" className="text-indigo-600 hover:underline">
                djupguide om prompt caching
              </Link>
              .
            </p>
          </section>

          {/* Claude.ai subscriptions */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Claude.ai — abonnemang vs API</h2>
            <p className="text-gray-700 leading-relaxed">
              Förutom API:t erbjuder Anthropic direktanvändning via Claude.ai med
              abonnemangsnivåer:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Plan</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Pris</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Inkluderar</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Passar för</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Free</td>
                    <td className="px-3 py-2 text-right">0 kr/mån</td>
                    <td className="px-3 py-2">Sonnet och Haiku med dagliga gränser</td>
                    <td className="px-3 py-2">Testanvändning, hobby</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-medium">Pro</td>
                    <td className="px-3 py-2 text-right">ca 209 kr/mån</td>
                    <td className="px-3 py-2">Obegränsat Sonnet/Haiku, 5× Opus</td>
                    <td className="px-3 py-2">Ensam frilansare, kunskapsarbetare</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Team</td>
                    <td className="px-3 py-2 text-right">ca 280 kr/user/mån</td>
                    <td className="px-3 py-2">Delad arbetsyta, längre kontext, prioritet</td>
                    <td className="px-3 py-2">Småteam 2–20 pers</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Enterprise</td>
                    <td className="px-3 py-2 text-right">Offert</td>
                    <td className="px-3 py-2">SSO, GDPR DPA, EU-dataresidens, SLA</td>
                    <td className="px-3 py-2">Kräver GDPR-avtal, stor organisation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tumregel: välj abonnemang om ditt team primärt använder Claude manuellt för
              skrivande, analys och problemlösning. Välj API om du bygger automatiserade
              system, integrationer eller applikationer med hög volym.
            </p>
          </section>

          {/* GDPR */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR och EU-dataintressen</h2>
            <p className="text-gray-700 leading-relaxed">
              För svenska och europeiska företag är datahantering en viktig fråga. Anthropic
              erbjuder GDPR Data Processing Agreement för Enterprise-nivå. Utan ett sådant
              avtal behandlas API-trafik under amerikansk lagstiftning, vilket kan vara
              problematiskt för känsliga data (personuppgifter, patientinformation, etc.).
            </p>
            <p className="text-gray-700 leading-relaxed">
              AWS-regioner i Europa (eu-west-1, eu-central-1) kan användas för att hålla
              data inom EU, men detta kräver konfiguration och Enterprise-avtal. Om du
              hanterar känsliga personuppgifter och inte kan ingå ett Enterprise-avtal
              bör du överväga europeisk AI som{" "}
              <a href="https://mistral.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Mistral Large
              </a>{" "}
              (franska servrar, inbyggd EU-kompatibilitet).
            </p>
          </section>

          {/* vs OpenAI */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Claude vs OpenAI — vilket API passar bäst?</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI är billigare per token i alla tre nivåer: GPT-4o mini (1,58 SEK/Mtok)
              slår Haiku (10,50 SEK/Mtok) med bred marginal. GPT-4.1 (21 SEK/Mtok) är
              billigare än Sonnet (31,50 SEK/Mtok). Varför väljer ändå många Anthropic?
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Bättre svenska.</strong> Claude Sonnet skriver naturligare, håller
                konsekvens i långa svar och gör färre grammatiska anglisismer. Skillnaden
                märks tydligast på kundkommunikation och innehållsgenerering.
              </li>
              <li>
                <strong>Prompt caching är mer transparent.</strong> Anthropics caching är
                explicit och deterministisk — du vet exakt vad som cachas och betalar för.
                OpenAI:s automatiska caching är mer oförutsägbar.
              </li>
              <li>
                <strong>Konsekvent prisbild.</strong> Anthropic höjer sällan priser utan
                förvarning, vilket underlättar budgetering.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Läs vår fullständiga jämförelse i{" "}
              <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">
                ChatGPT vs Claude
              </Link>{" "}
              eller se vår{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">
                guide till billigaste AI-modellerna
              </Link>
              .
            </p>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellerna ovan visar priser per token, men din faktiska månadskostnad beror
              på volymen, hur lång din systemprompt är och hur mycket du kan utnyttja
              prompt caching.{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i din exakta volym och se månadskostnad i SEK för varje
              Claude-modell.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Se Claude-priser med abonnemangsjämförelse
                </Link>
              </li>
              <li>
                <Link to="/prompt-caching" className="text-indigo-600 hover:underline">
                  Räkna på prompt caching-besparingar
                </Link>
              </li>
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">
                  Jämför med OpenAI API-priser
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              Claude API erbjuder tre tydliga nivåer med olika pris-prestanda-förhållanden.
              Haiku är rätt för snabba, enkla och kostnadskänsliga uppgifter. Sonnet är
              standardvalet för de flesta produktionsapplikationer, särskilt på svenska.
              Opus reserveras för komplexa agentics där förmågan är viktigare än kostnaden.
              Prompt caching är den viktigaste enskilda optimeringen — för chatbotar med
              fast systemprompt kan den halvera månadskostnaden jämfört med att betala
              full input-pris varje gång.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras. Verifiera alltid mot Anthropics officiella prislista
              på anthropic.com/pricing innan du ingår avtal. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["anthropic-claude-api-pris"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om Claude API-priser" />
        <Sources items={officialPricingSources} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att komma igång?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nu vet du vad Claude API kostar. Nästa steg är att skapa ditt konto och börja bygga.
          </p>
          <a
            href="https://console.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'anthropic', source: 'anthropic-claude-api-pris' })}
          >
            Skapa ditt Claude API-konto gratis →
          </a>
          <p className="text-xs text-gray-400 mt-2">Samarbetslänk — vi kan ta emot provision vid köp.</p>
        </div>
      </main>
    </>
  );
}
