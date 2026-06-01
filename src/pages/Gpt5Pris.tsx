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

const article = articles["gpt-5-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar GPT-5 per token i svenska kronor?",
    answer:
      "GPT-5 kostar 157,50 SEK per miljon input-tokens och 630 SEK per miljon output-tokens (baserat på $15/$60 per Mtok och 10,50 SEK/USD). Det gör GPT-5 till OpenAIs dyraste textmodell — ungefär 7,5 gånger dyrare per input-token än GPT-4.1 och 100 gånger dyrare än GPT-4o mini.",
  },
  {
    question: "Vad är skillnaden mellan GPT-5 och GPT-4o?",
    answer:
      "GPT-5 är OpenAIs flagship-modell lanserad 2026 och presterar markant bättre än GPT-4o på komplexa resoneringsuppgifter, kodning och analys. GPT-4o kostar $2,50/$10 per Mtok (26,25/105 SEK) jämfört med GPT-5:s $15/$60. Välj GPT-5 för uppgifter där noggrannhet väger tyngre än kostnad — välj GPT-4o för dagliga arbetsuppgifter.",
  },
  {
    question: "Hur stort kontextfönster har GPT-5?",
    answer:
      "GPT-5 stöder 128 000 tokens kontextfönster i standardkonfiguration, vilket räcker för att analysera ett 300-sidigt dokument i en enda förfrågan. GPT-4.1 erbjuder upp till 1 miljon tokens kontextfönster för extra långa analyser, men GPT-5:s 128K räcker för de allra flesta affärsuppgifter.",
  },
  {
    question: "Är GPT-5 värt priset — när ska jag välja det framför billigare alternativ?",
    answer:
      "GPT-5 är värt priset när felnivån i GPT-4o eller GPT-4.1 är oacceptabel — typiskt juridisk analys, medicinsk rådgivning, komplex finansiell modellering eller avancerad kodgenerering. För kundtjänst-chatbots, innehållsredigering och FAQ-svar ger GPT-4o mini eller GPT-4.1 95 % av kvaliteten till 1–10 % av kostnaden. Tumregel: om en människa ändå granskar svaret räcker GPT-4.1.",
  },
  {
    question: "Hur testar jag GPT-5 utan att binda upp en stor kostnad?",
    answer:
      "Börja med OpenAI Playground — du betalar bara per token utan månadsabonnemang. Sätt ett dagligt utgiftsgräns i OpenAI-kontot (Usage limits) på t.ex. 10 dollar. Kör dina 50 viktigaste prompt-scenarion och jämför med GPT-4.1. Om GPT-5 ger mätbart bättre resultat kan du räkna på volymkostnad — annars väljer du GPT-4.1 och sparar 87 %.",
  },
];

export function Gpt5Pris() {
  return (
    <>
      <SEO
        title="GPT-5 pris Sverige 2026 — vad kostar det i kronor?"
        description="GPT-5 API-priser i svenska kronor. Jämförelse mot GPT-4o och GPT-4.1 — när ska du välja GPT-5 vs billigare alternativ? Typiska månadskostnader per use case."
        canonical="/gpt-5-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "GPT-5 pris", url: "https://aikostnad.se/gpt-5-pris" },
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
            GPT-5 pris — vad kostar OpenAIs senaste modell?
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar GPT-5 och när ska jag välja det?"
            answer={
              <>
                GPT-5 är OpenAIs dyraste modell: <strong>157,50 kr/Mtok input</strong> och{" "}
                <strong>630 kr/Mtok output</strong>. Det är 7,5 gånger dyrare än GPT-4.1 och 100 gånger
                dyrare än GPT-4o mini. Välj GPT-5 enbart för uppgifter där precision är
                kritisk — för 90 % av vardagsanvändning räcker GPT-4.1 eller GPT-4o mini.
              </>
            }
            bullets={[
              "Input: 157,50 SEK per miljon tokens ($15/Mtok)",
              "Output: 630 SEK per miljon tokens ($60/Mtok)",
              "GPT-4.1 är 7,5× billigare — räcker för det mesta",
              "GPT-4o mini är 100× billigare för enkla uppgifter",
              "Välj GPT-5 för juridik, medicin och komplex kod",
              "Testa med Playground utan månadsabonnemang",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            GPT-5 lanserades av OpenAI i början av 2026 och är deras mest kapabla
            textmodell hittills. Men den är också avsevärt dyrare än föregångarna.
            Den här guiden reder ut exakt vad GPT-5 kostar i svenska kronor, hur det
            jämförs mot GPT-4.1 och GPT-4o, och för vilka use cases kostnaden är
            motiverad.
          </p>

          {/* Pricing */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GPT-5 priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI prissätter GPT-5 till $15 per miljon input-tokens och $60 per
              miljon output-tokens. Med växelkursen 10,50 SEK per dollar blir det:
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
                    <td className="px-3 py-2 font-medium">GPT-5</td>
                    <td className="px-3 py-2 text-right">$15,00</td>
                    <td className="px-3 py-2 text-right font-bold">157,50 kr</td>
                    <td className="px-3 py-2 text-right">$60,00</td>
                    <td className="px-3 py-2 text-right font-bold">630,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-right">$2,00</td>
                    <td className="px-3 py-2 text-right">21,00 kr</td>
                    <td className="px-3 py-2 text-right">$8,00</td>
                    <td className="px-3 py-2 text-right">84,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2 text-right">$2,50</td>
                    <td className="px-3 py-2 text-right">26,25 kr</td>
                    <td className="px-3 py-2 text-right">$10,00</td>
                    <td className="px-3 py-2 text-right">105,00 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right">$0,15</td>
                    <td className="px-3 py-2 text-right">1,58 kr</td>
                    <td className="px-3 py-2 text-right">$0,60</td>
                    <td className="px-3 py-2 text-right">6,30 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">o3</td>
                    <td className="px-3 py-2 text-right">$10,00</td>
                    <td className="px-3 py-2 text-right">105,00 kr</td>
                    <td className="px-3 py-2 text-right">$30,00</td>
                    <td className="px-3 py-2 text-right">315,00 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Priser verifierade maj 2026. Källa:{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                openai.com/api/pricing
              </a>. Växelkurs 10,50 SEK/USD.
            </p>
          </section>

          {/* Cost comparison */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Relativt pris — vad ger du upp när du väljer billigare?</h2>
            <p className="text-gray-700 leading-relaxed">
              GPT-5 är inte bara marginellt dyrare — det är ett dramatiskt prishopp.
              För att förstå storleksordningen: om GPT-4o mini kostar en krona i
              tokens kostar GPT-5 samma uppgift nästan 100 kronor. Priskvoten mellan
              GPT-5 och GPT-4o mini är 100:1 på input-sidan.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Det betyder att om du idag betalar 500 kr/mån med GPT-4.1 och byter
              till GPT-5 kan samma volym kosta upp till 3 750 kr/mån. Den
              uppgraderingen måste motiveras av ett tydligt kvalitetshopp som skapar
              affärsvärde.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">GPT-5 vs o3 — vilket ska du välja?</h3>
            <p className="text-gray-700 leading-relaxed">
              OpenAI:s o3 ($10/$40 per Mtok, 105/420 SEK) är specialiserat på
              komplex logisk resonering — matematik, vetenskap, kodning med långa
              kedjor av steg. GPT-5 är mer allroundat och presterar bättre på
              naturligt språk, instruktionsföljning och kreativa uppgifter. o3 är
              billigare om ditt primära behov är reasoning-tunga uppgifter. GPT-5 är
              rätt val när du vill ha excellens i alla dimensioner med ett enda API-anrop.
            </p>
          </section>

          {/* Monthly cost scenarios */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Typiska månadskostnader — konkreta scenarion</h2>
            <p className="text-gray-700 leading-relaxed">
              Hur ser det ut i praktiken? Vi räknar på ett konkret scenario: en
              kundtjänst-chatbot som hanterar 500 frågor per dag (22 arbetsdagar/mån)
              med 150 tokens input per fråga och 300 tokens output per svar.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-700">Förutsättningar:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>500 frågor/dag × 22 dagar = 11 000 konversationer/mån</li>
                <li>Input: 150 tokens × 11 000 = 1,65 miljoner tokens</li>
                <li>Output: 300 tokens × 11 000 = 3,3 miljoner tokens</li>
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
                    <td className="px-3 py-2 font-medium">GPT-5</td>
                    <td className="px-3 py-2 text-right">260 kr</td>
                    <td className="px-3 py-2 text-right">2 079 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~2 339 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2 text-right">35 kr</td>
                    <td className="px-3 py-2 text-right">277 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~312 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2 text-right">43 kr</td>
                    <td className="px-3 py-2 text-right">347 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~390 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right">2,61 kr</td>
                    <td className="px-3 py-2 text-right">20,79 kr</td>
                    <td className="px-3 py-2 text-right font-bold">~23 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Skillnaden är enorm: <strong>23 kr vs 2 339 kr per månad</strong> för
              samma konversationsvolym. GPT-4o mini ger utmärkt kvalitet för
              standardiserade kundtjänstfrågor. GPT-5 bör reserveras för fall där
              varje svar kräver nyanserat resonemang och felets kostnad överstiger
              modellens merkostnad.
            </p>
          </section>

          {/* When to use GPT-5 */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När väljer du GPT-5 — och när räcker billigare?</h2>

            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-brand-900">Välj GPT-5 om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Hanterar juridiska kontrakt, medicinska frågor eller regulatorisk compliance</li>
                <li>Bygger kod-agenter som löser komplexa multi-steg-uppgifter autonomt</li>
                <li>Analyserar finansiella rapporter eller komplexa affärsdokument</li>
                <li>Behöver minimal mänsklig granskning av output (lågvolym, hög stake)</li>
                <li>Har bevisat att GPT-4.1 inte når acceptabel felnivå för ditt specifika use case</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-green-900">Välj GPT-4.1 eller GPT-4o mini om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Driver en kundtjänst-chatbot med standardiserade frågor</li>
                <li>Genererar produktbeskrivningar, e-postmallar eller socialt innehåll</li>
                <li>Sammanfattar nyheter, möten eller rapporter</li>
                <li>Bygger intern FAQ-bot där en människa granskar känsliga svar</li>
                <li>Har volym som gör GPT-5:s pris ekonomiskt ohållbart</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              En enkel beslutsregel: kör dina 50 kritiskaste prompter på GPT-4.1 och
              GPT-5 parallellt. Om GPT-4.1 når minst 90 % av GPT-5:s kvalitet på
              ditt specifika dataset — välj GPT-4.1. Du sparar 87 % på
              token-kostnaden. Investera besparingen i fler iterationer och bättre
              promptdesign istället.
            </p>
          </section>

          {/* API access */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur får du tillgång till GPT-5 API?</h2>
            <p className="text-gray-700 leading-relaxed">
              GPT-5 är tillgängligt via OpenAI API för alla betalande API-kunder.
              Du behöver ett konto på{" "}
              <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                platform.openai.com
              </a>
              , lägga in ett betalkort och sedan använda modell-ID:t{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">gpt-5</code> i dina
              API-anrop. Det finns inget separat GPT-5-abonnemang — du betalar enbart
              per token du faktiskt använder.
            </p>
            <p className="text-gray-700 leading-relaxed">
              OpenAI erbjuder också GPT-5 via ChatGPT Pro ($200/mån, ca 2 100 SEK/mån)
              för interaktiv användning utan programatisk API-tillgång. Pro-abonnemanget
              inkluderar obegränsad ChatGPT-access inklusive GPT-5, men ger inget API-kredit.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För att sätta budgetgränser: logga in på platform.openai.com och gå till
              Settings → Limits. Här kan du sätta ett hårt månadstak så att kostnaden
              aldrig överstiger din budget.
            </p>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellerna ovan visar generella scenarion. Dina faktiska kostnader beror
              på din exakta token-volym, längden på system-prompten och om du kan
              utnyttja prompt caching.{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i dina egna siffror och se månadskostnaden i SEK för
              GPT-5 och alla andra modeller sida vid sida.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/openai-api-pris" className="text-brand-700 hover:underline">
                  Komplett pristabell för alla OpenAI-modeller
                </Link>{" "}
                — GPT-5, GPT-4.1, o3, embeddings i SEK
              </li>
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-brand-700 hover:underline">
                  Vad kostar ChatGPT API?
                </Link>{" "}
                — GPT-4o och GPT-4o mini med kalkylatorn
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-brand-700 hover:underline">
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
              GPT-5 är OpenAIs kraftfullaste modell och kostar 157,50 kr per miljon
              input-tokens och 630 kr per miljon output-tokens. Det är ett markant
              prishopp jämfört med GPT-4.1 (21/84 SEK) och framför allt GPT-4o mini
              (1,58/6,30 SEK). För de allra flesta svenska företag är GPT-4.1
              tillräckligt bra till en bråkdel av priset.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Välj GPT-5 när uppgiftens komplexitet är extremt hög och felmarginalen
              är låg — juridik, regulatorisk analys, avancerad kodning. Välj GPT-4.1
              för resten. Kör ett A/B-test på dina egna prompter innan du bestämmer
              dig för ett dramatiskt prislyft.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras när som helst. Verifiera alltid mot OpenAI:s officiella
              prislista innan du signerar avtal eller beräknar årsbudget.
              Senast verifierade 2026-05-25.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["gpt-5-pris"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om GPT-5 pris" />

        <Sources items={officialPricingSources} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-brand-50 to-white border border-brand-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att komma igång?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nu vet du vad GPT-5 kostar. Nästa steg är att skapa ditt konto och börja bygga.
          </p>
          <a
            href="https://platform.openai.com/signup"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'openai', source: 'gpt-5-pris' })}
          >
            Skapa ditt GPT-5-konto gratis →
          </a>
          <p className="text-xs text-gray-400 mt-2">Samarbetslänk — vi kan ta emot provision vid köp.</p>
        </div>
      </main>
    </>
  );
}
