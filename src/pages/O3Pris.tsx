import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";
import { trackEvent } from "../utils/analytics";

const article = articles["o3-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar OpenAI o3 per token i svenska kronor?",
    answer:
      "OpenAI o3 kostar $10 per miljon input-tokens och $40 per miljon output-tokens (maj 2026). Med en kurs på 10,50 SEK/USD blir det 105 SEK per Mtok input och 420 SEK per Mtok output. Det gör o3 till en av OpenAIs dyraste modeller — ungefär 5 gånger dyrare på input än GPT-4.1 ($2/$8).",
  },
  {
    question: "Vad är skillnaden mellan o3 och o3-mini?",
    answer:
      "o3 är OpenAIs kraftfullaste reasoning-modell, optimerad för de svåraste logiska och matematiska problemen. o3-mini kostar $1,10/$4,40 per Mtok (11,55/46,20 SEK) — ungefär 9 gånger billigare på input — och presterar starkt på kodning och vetenskap men når inte riktigt o3:s topp. För de flesta reasoning-uppgifter räcker o3-mini väl och sparar betydande kostnad.",
  },
  {
    question: "Vad är o4-mini och hur skiljer det sig från o3-mini?",
    answer:
      "o4-mini är OpenAIs senaste mini-reasoning-modell (maj 2026) med samma prispunkt som o3-mini: $1,10/$4,40 per Mtok. o4-mini presterar bättre än o3-mini på flera benchmarks, särskilt kodning och matematik, och är nu OpenAIs rekommenderade mini-reasoning-modell. Priset är identiskt, så o4-mini är ett direkt uppgrade från o3-mini utan extra kostnad.",
  },
  {
    question: "När ska jag välja o3 framför GPT-5 eller GPT-4.1?",
    answer:
      "o3 är specialbyggt för steg-för-steg-resonemang — matematik, formell logik, vetenskapliga beräkningar och komplex koddebuggning. GPT-5 ($15/$60 per Mtok) är mer allroundat och bättre på naturligt språk, kreativt skrivande och instruktionsföljning. GPT-4.1 ($2/$8) räcker för de flesta affärsuppgifter utan reasoning-krav. Välj o3 när din uppgift kräver djup logisk kedja och GPT-4.1 konsekvent missar.",
  },
  {
    question: "Hur testar jag o3 utan stor kostnad?",
    answer:
      "Börja med o4-mini (11,55/46,20 SEK per Mtok) via OpenAI Playground. Kör dina 20–30 viktigaste reasoning-uppgifter och jämför kvaliteten mot GPT-4.1. Om o4-mini löser problemen räcker det. Behöver du mer kraft, testa o3 på samma dataset. Sätt ett dagligt utgiftstak i OpenAI-kontot (Settings → Limits) på t.ex. 50 kronor för att hålla testet billigt.",
  },
];

export function O3Pris() {
  return (
    <>
      <SEO
        title="Vad kostar OpenAI o3? Priser i SEK (2026)"
        description="OpenAI o3, o3-mini och o4-mini priser i svenska kronor. Reasoning-modeller för komplex analys — när är kostnaden motiverad och hur jämför de mot GPT-5?"
        canonical="/o3-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "o3 pris", url: "https://aikostnad.se/o3-pris" },
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
            Vad kostar OpenAI o3? Priser i SEK (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar o3 och när ska jag välja det?"
            answer={
              <>
                OpenAI o3 kostar <strong>105 SEK/Mtok input</strong> och{" "}
                <strong>420 SEK/Mtok output</strong>. o3-mini och o4-mini är 9× billigare
                (11,55/46,20 SEK) och räcker för de flesta reasoning-uppgifter. Välj o3 enbart
                när steg-för-steg-logik är kritisk och billigare modeller konstant missar.
              </>
            }
            bullets={[
              "o3: 105 SEK/Mtok input, 420 SEK/Mtok output ($10/$40)",
              "o3-mini: 11,55 SEK/Mtok input, 46,20 SEK/Mtok output ($1,10/$4,40)",
              "o4-mini: 11,55 SEK/Mtok input, 46,20 SEK/Mtok output ($1,10/$4,40)",
              "o4-mini är uppgrade från o3-mini — samma pris, bättre prestanda",
              "Välj o3 för matematik, formell logik och komplex koddebuggning",
              "Testa alltid o4-mini först — ger 90 % av o3 till 11 % av priset",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            OpenAIs o3-serie är specialbyggd för reasoning — den typ av uppgifter där
            modellen måste tänka i långa logiska kedjor innan den svarar. Resultatet är
            markant bättre på matematik, formell logik och vetenskapliga problem jämfört
            med GPT-4o och GPT-4.1. Men det höga priset gör att de flesta bör börja
            med o4-mini och uppgradera till o3 enbart om de kan mäta en tydlig
            kvalitetsförbättring som motiverar 9× kostnadsökningen.
          </p>

          {/* Pricing table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">o3-priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI prissätter sina reasoning-modeller högt jämfört med standard-GPT-modellerna.
              Här är en komplett översikt av o3-familjens priser i maj 2026:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input USD/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input SEK/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output USD/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output SEK/Mtok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-amber-50">
                    <td className="px-3 py-2 font-medium">o3</td>
                    <td className="px-3 py-2 text-right">$10,00</td>
                    <td className="px-3 py-2 text-right font-bold">105,00 kr</td>
                    <td className="px-3 py-2 text-right">$40,00</td>
                    <td className="px-3 py-2 text-right font-bold">420,00 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">o4-mini</td>
                    <td className="px-3 py-2 text-right">$1,10</td>
                    <td className="px-3 py-2 text-right font-bold">11,55 kr</td>
                    <td className="px-3 py-2 text-right">$4,40</td>
                    <td className="px-3 py-2 text-right font-bold">46,20 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">o3-mini</td>
                    <td className="px-3 py-2 text-right">$1,10</td>
                    <td className="px-3 py-2 text-right">11,55 kr</td>
                    <td className="px-3 py-2 text-right">$4,40</td>
                    <td className="px-3 py-2 text-right">46,20 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1 (jämförelse)</td>
                    <td className="px-3 py-2 text-right">$2,00</td>
                    <td className="px-3 py-2 text-right">21,00 kr</td>
                    <td className="px-3 py-2 text-right">$8,00</td>
                    <td className="px-3 py-2 text-right">84,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-5 (jämförelse)</td>
                    <td className="px-3 py-2 text-right">$15,00</td>
                    <td className="px-3 py-2 text-right">157,50 kr</td>
                    <td className="px-3 py-2 text-right">$60,00</td>
                    <td className="px-3 py-2 text-right">630,00 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Priser verifierade maj 2026. Källa:{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                openai.com/api/pricing
              </a>. Växelkurs 10,50 SEK/USD.
            </p>
          </section>

          {/* What is o3 */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vad är o3 — och varför kostar det så mycket?</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAIs o-serie (o1, o3, o3-mini, o4-mini) skiljer sig fundamentalt från
              GPT-modellerna. Medan GPT-4o och GPT-4.1 genererar svar direkt, använder
              o-modellerna en teknik kallad <em>chain-of-thought reasoning</em> — de tänker
              igenom problemet steg för steg i en intern kedja av resonemang innan de
              producerar ett svar. Denna extra beräkning gör modellerna markant bättre på:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Matematiska problem (bevisföring, kalkyl, statistik)</li>
              <li>Formell logik och algoritmdesign</li>
              <li>Komplex koddebuggning med långa beroendekedjor</li>
              <li>Vetenskapliga analyser och hypotesgenerering</li>
              <li>Flerstegsplanering i agentiska arbetsflöden</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Det höga priset för o3 ($10/$40 per Mtok) speglar den extra beräkningskostnaden
              för reasoning-stegen. Det är inte bara en dyrare version av GPT — det är en
              annan arkitektur med en annan kostnadsprofil.
            </p>
          </section>

          {/* Monthly cost scenarios */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Typiska månadskostnader — konkreta scenarion</h2>
            <p className="text-gray-700 leading-relaxed">
              Reasoning-uppgifter tenderar att ha kortare volymer men längre svar.
              Här räknar vi på ett scenario: ett verktyg för juridisk dokumentanalys
              som processar 100 kontrakt per dag med 500 tokens input och 1 000 tokens output.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-700">Förutsättningar:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>100 dokument/dag × 22 dagar = 2 200 analyser/mån</li>
                <li>Input: 500 tokens × 2 200 = 1,1 miljoner tokens</li>
                <li>Output: 1 000 tokens × 2 200 = 2,2 miljoner tokens</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input-kostnad</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output-kostnad</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Total/mån (SEK)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-amber-50">
                    <td className="px-3 py-2 font-medium">o3</td>
                    <td className="px-3 py-2 text-right">116 kr</td>
                    <td className="px-3 py-2 text-right">924 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~1 040 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">o4-mini</td>
                    <td className="px-3 py-2 text-right">12,71 kr</td>
                    <td className="px-3 py-2 text-right">101,64 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~114 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-right">23,10 kr</td>
                    <td className="px-3 py-2 text-right">184,80 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~208 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Skillnaden är stor: <strong>114 kr vs 1 040 kr per månad</strong> för
              samma volym. o4-mini ger utmärkt reasoning-kvalitet för de flesta
              juridiska och analytiska uppgifter till 11 % av o3:s pris. Testa
              alltid o4-mini på ditt specifika dataset innan du väljer o3.
            </p>
          </section>

          {/* When to choose */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">o3, o4-mini eller GPT-5 — när väljer du vad?</h2>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-amber-900">Välj o3 om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Löser formella matematiska problem eller bevisföring</li>
                <li>Debuggar komplex kod med djupa beroendekedjor och subtila logikfel</li>
                <li>Analyserar vetenskapliga data med strikta felmarginaler</li>
                <li>Kör agentiska arbetsflöden med lång planeringshorisont</li>
                <li>Har bevisat att o4-mini inte når acceptabel felnivå på just din uppgift</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-green-900">Välj o4-mini om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Behöver reasoning till rimligt pris — o4-mini är 9× billigare än o3</li>
                <li>Kör kodgranskning, enhetstestgenerering eller algoritmoptimering</li>
                <li>Bygger ett system som anropar reasoning-modeller med hög frekvens</li>
                <li>Vill testa reasoning-förmåga utan att binda upp stor budget</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Välj GPT-5 ($15/$60 per Mtok) om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Behöver excellens i <em>alla</em> dimensioner — naturligt språk, instruktionsföljning OCH reasoning</li>
                <li>Vill ha ett enda modell-API för hela din pipeline</li>
                <li>Skriver kundkommunikation, marknadsföring eller komplexa rapporter med hög kvalitet</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              En tumregel: om din uppgift är primärt <em>logisk</em> (matematik, kod, analys)
              välj o-serien. Om den är primärt <em>språklig</em> (skrivande, konversation,
              kreativitet) välj GPT-4.1 eller GPT-5. Om du är osäker, testa o4-mini mot
              GPT-4.1 på 30 verkliga prompt-exempel och välj baserat på resultat.
            </p>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellerna ovan visar generella scenarion. Dina faktiska kostnader beror
              på din token-volym och om du blandar modeller. Använd{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              för att fylla i dina egna siffror och jämföra o3-modellerna mot GPT och Claude.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/openai-api-pris" className="text-indigo-700 hover:underline">
                  Komplett pristabell för alla OpenAI-modeller
                </Link>{" "}
                — GPT-5, GPT-4.1, o3, embeddings i SEK
              </li>
              <li>
                <Link to="/gpt-5-pris" className="text-indigo-700 hover:underline">
                  GPT-5 pris
                </Link>{" "}
                — när ska du betala det extra priset?
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-indigo-700 hover:underline">
                  Billigaste AI 2026
                </Link>{" "}
                — jämförelse av alla budget-modeller
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI o3 är en specialiserad reasoning-modell som kostar 105 SEK per miljon
              input-tokens och 420 SEK per miljon output-tokens. Det är ett högt pris som
              motiveras av markant bättre prestanda på logik, matematik och komplex
              kodning — men inte för alla uppgifter.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För de allra flesta reasoning-uppgifter är o4-mini (11,55/46,20 SEK)
              det rätta valet: 9× billigare och med utmärkt prestanda på kodning,
              vetenskap och steg-för-steg-analys. Reservera o3 för de uppgifter där
              du kan mäta ett tydligt kvalitetshopp som motiverar kostnadsskillnaden.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser verifierade maj 2026. OpenAI uppdaterar priser löpande — kontrollera
              alltid mot{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                openai.com/api/pricing
              </a>{" "}
              inför budgetbeslut.
            </p>
          </section>
        </article>

        <LandingFAQ items={faqs} heading="Vanliga frågor om o3-priser" />

        <Sources items={officialPricingSources} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att komma igång?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nu vet du vad OpenAI o3 kostar. Nästa steg är att skapa ditt konto och börja bygga.
          </p>
          <a
            href="https://platform.openai.com/signup"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'openai', source: 'o3-pris' })}
          >
            Skapa ditt OpenAI-konto gratis →
          </a>
          <p className="text-xs text-gray-400 mt-2">Samarbetslänk — vi kan ta emot provision vid köp.</p>
        </div>
      </main>
    </>
  );
}
