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

const article = articles["ai-for-advokatbyra"];

const faqs: FAQItem[] = [
  {
    question: "Är Claude GDPR-kompatibelt för advokatbyråer?",
    answer:
      "Anthropic erbjuder ett Data Processing Agreement (DPA) och tillåter EU-regionval via enterprise-avtal. Det innebär att data inte behöver lämna EU för bearbetning. För advokater som hanterar klientkommunikation och känsliga avtal är detta nödvändigt — standardkonton utan DPA räcker inte. Kontakta Anthropic Enterprise eller en certifierad återförsäljare för att teckna rätt avtal innan ni skickar klientdata till API:et.",
  },
  {
    question: "Vad kostar kontraktsanalys med AI per månad för en advokatbyrå?",
    answer:
      "För en medelstora advokatbyrå som analyserar 500 sidor kontrakt per månad med Claude Sonnet 4.6 kostar det ungefär 47–80 SEK per månad i ren API-kostnad. Det verkliga priset inkluderar integration, drift och eventuell konsultkostnad för setup. En genomsnittlig junior jurist kostar 300–400 kr per timme — om AI sparar 5 timmar juridisk research per månad är ROI mycket tydlig.",
  },
  {
    question: "Kan AI ersätta jurister på en advokatbyrå?",
    answer:
      "Nej — AI ersätter inte juridisk bedömning, rådgivning eller ansvar. Vad AI gör bra är att hantera repetitivt textarbete: sammanfatta dokument, hitta relevanta klausuler, genomföra första genomläsningen av standardkontrakt och kategorisera ärenden. Jurister kan fokusera på analys, rådgivning och domstolsarbete. AI är ett produktivitetsverktyg, inte en jurist.",
  },
  {
    question: "Vilken AI-modell är bäst för juridisk text på svenska?",
    answer:
      "Claude Sonnet 4.6 är generellt bäst för svenska juridiska texter — modellen har stark koherens i långa dokument, hanterar juridisk terminologi väl och skriver naturlig svenska. För kortare, repetitiva uppgifter (klassificering, extrahering) fungerar Claude Haiku 4.5 billigare. Undvik GPT-4o mini för komplexa juridiska analyser — kvalitetsskillnaden är märkbar. För GDPR-strikt hantering: välj Claude med Enterprise DPA.",
  },
];

export function AiForAdvokatbyra() {
  return (
    <>
      <SEO
        title="AI för advokatbyråer — vad kostar det? Guide + kalkylator (2026)"
        description="Konkreta AI-kostnader för advokatbyråer: kontraktsanalys, juridisk research och klientkommunikation. Claude Sonnet rekommenderas för GDPR och hög precision. Maj 2026."
        canonical="/ai-for-advokatbyra"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för advokatbyråer", url: "https://aikostnad.se/ai-for-advokatbyra" },
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
            AI för advokatbyråer — vad kostar det? Guide + kalkylator (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilket AI ska advokatbyråer välja?"
            answer={
              <>
                <strong>Claude Sonnet 4.6</strong> är det starkaste valet för juridisk text på svenska — precis, koherent i långa dokument och kan konfigureras med GDPR DPA via Anthropic Enterprise. API-kostnad för kontraktsanalys (500 sidor/mån) är ca <strong>47–80 SEK/mån</strong>. ROI är tydlig: AI sparar 5–15 timmars repetitivt textarbete per advokat per månad.
              </>
            }
            bullets={[
              "Rekommenderad modell: Claude Sonnet 4.6 (GDPR, hög precision, bäst svenska)",
              "Kontraktsanalys 500 sidor/mån: ~47 SEK i API-kostnad",
              "Juridisk research 200 frågor/dag: ~388 SEK/mån",
              "Klientmail-summering 50/dag: ~43 SEK/mån",
              "Krav: Anthropic Enterprise DPA för klientdata och sekretessbelagda handlingar",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Advokatbyråer är en av de branscher som tjänar mest på AI — och samtidigt en av de
            branscher med strängast krav på säkerhet och sekretess. En oförsiktig AI-integration
            kan bryta mot advokatsekretessen och GDPR. En välkonfigurerad integration kan spara
            hundratals timmars repetitivt arbete per år och ge juristerna mer tid för verklig
            rådgivning. Den här guiden ger en konkret genomgång av kostnader, rekommenderade modeller
            och vad ni faktiskt måste tänka på.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vanliga AI-use-cases för advokatbyråer</h2>
            <p className="text-gray-700 leading-relaxed">
              De tre vanligaste och mest lönsamma tillämpningarna för AI på en advokatbyrå är
              kontraktsanalys, juridisk research och klientkommunikation. Alla tre kräver hög
              precision och GDPR-säker hantering av data.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">Kontraktsanalys och granskning</h3>
            <p className="text-gray-700 leading-relaxed">
              AI kan läsa igenom standardkontrakt, identifiera avvikande klausuler, markera
              risker och sammanfatta nyckelvillkor på sekunder. En jurist som annars lägger
              2–3 timmar på en första genomgång av ett 50-sidigt hyresavtal kan med AI-stöd
              ha en strukturerad analys på under 10 minuter. Juristen behöver fortfarande
              validera, bedöma och ge råd — men det repetitiva läsarbetet automatiseras.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För en byrå som hanterar 500 kontraktssidor per månad (ca 10 standardavtal)
              med Claude Sonnet 4.6 är API-kostnaden ungefär 47 SEK per månad. En enda
              sparad juristtimme motsvarar 300–500 kronor. ROI-kalkylen är enkel.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">Juridisk research och prejudikatsökning</h3>
            <p className="text-gray-700 leading-relaxed">
              AI är inte en auktoritativ juridisk databas och ersätter inte Karnov, JUNO eller
              direkta prejudikatssökningar. Däremot kan AI hjälpa till att strukturera
              rättsliga frågeställningar, identifiera relevanta rättsområden och formulera
              sökfrågor som sparar tid i de etablerade juridiska databaserna. Dessutom kan AI
              sammanfatta långa domar och rättsutredningar till handlingsbara punktlistor.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vid 200 research-förfrågningar per dag (en stor byrå med många handläggare)
              uppgår API-kostnaden till ca 388 SEK per månad med Claude Sonnet. Per fråga
              är det under 9 öre.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">Klientkommunikation och ärendesammanfattning</h3>
            <p className="text-gray-700 leading-relaxed">
              Att sammanfatta en lång e-postkorrespondens med en klient inför ett möte, att
              kategorisera inkommande ärenden, eller att utforma ett standardsvar på vanliga
              frågor — allt detta kan AI hantera effektivt. För 50 mejlsammanfattningar per
              dag (en medelstors byrå) landar API-kostnaden på ungefär 43 SEK per månad.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Scenario-tabell: tre konkreta use-cases</h2>
            <p className="text-gray-700 leading-relaxed">
              Alla beräkningar baseras på Claude Sonnet 4.6 (31,50 SEK/Mtok input,
              157,50 SEK/Mtok output). Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Use-case</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Volym</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API-kostnad/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Sparad tid/mån</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Kontraktsanalys</td>
                    <td className="px-3 py-2">500 sidor/mån</td>
                    <td className="px-3 py-2 text-right font-bold">~47 SEK</td>
                    <td className="px-3 py-2">15–30 juristtimmar</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-medium">Juridisk research</td>
                    <td className="px-3 py-2">200 frågor/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~388 SEK</td>
                    <td className="px-3 py-2">20–40 juristtimmar</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Klientmail-summering</td>
                    <td className="px-3 py-2">50 mejl/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~43 SEK</td>
                    <td className="px-3 py-2">10–20 juristtimmar</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Beräkningar: kontraktsanalys = 2 000 input-tokens/sida, 200 output-tokens/sida.
              Research = 300 input-tokens/fråga, 500 output-tokens/svar, 22 arbetsdagar/mån.
              Klientmail = 500 input-tokens/mejl, 150 output-tokens/summering, 22 dagar.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR och advokatsekretess — vad gäller?</h2>
            <p className="text-gray-700 leading-relaxed">
              Det är inte förbjudet att använda AI i advokatverksamhet, men det ställer
              krav. Advokatsamfundets regler och GDPR kräver att ni vet var klientdata
              bearbetas och att ni har rätt avtal på plats.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-amber-900">Krav innan ni skickar klientdata till AI-API</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Data Processing Agreement (DPA)</strong> med leverantören — standard för Anthropic Enterprise</li>
                <li><strong>EU-regionval</strong> — säkerställ att data bearbetas inom EU om ni hanterar känsliga personuppgifter</li>
                <li><strong>Ingen träning på er data</strong> — kontrollera att leverantören inte använder API-data för modellträning (Anthropic gör det inte per default via API)</li>
                <li><strong>Intern policy</strong> — definiera vilken typ av klientdata som får skickas till AI och informera berörda klienter om det</li>
                <li><strong>Anonymisering</strong> — överväg att anonymisera klientnamn och identifierare i de texter som skickas till AI</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              För advokatbyråer med strikta sekretess-krav finns alternativet att köra
              en lokalt hostad öppen modell (t.ex. Llama via Azure Private Cloud). Det är
              dyrare och kräver mer teknisk kompetens, men ger fullständig datakontroll.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Räkna ut ROI för din advokatbyrå</h2>
            <p className="text-gray-700 leading-relaxed">
              Antag en advokatbyrå med 5 jurister. Varje jurist lägger i genomsnitt
              1 timme per dag på uppgifter som AI kan assistera med (läsning, summering,
              kategorisering). Med ett timpris inkl. sociala avgifter på 500 kr:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Sparad tid per år: 5 jurister × 1 h/dag × 220 dagar = <strong>1 100 timmar</strong></li>
              <li>Värde av sparad tid: 1 100 h × 500 kr = <strong>550 000 kr/år</strong></li>
              <li>API-kostnad (alla use-cases ovan): ~500 kr/mån = <strong>6 000 kr/år</strong></li>
              <li>Setup och integration (engångskostnad): <strong>15 000–50 000 kr</strong></li>
              <li>ROI år 1: (550 000 − 56 000) / 56 000 ≈ <strong>882 %</strong></li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Siffrorna är konservativa. Om juristerna istället använder frigjord tid till
              fakturerbara klienttimmar är vinsten ännu större. Nyckeln är att mäta faktisk
              tidsbesparing, inte uppskattad.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur ni börjar — steg för steg</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Identifiera ett pilotprojekt.</strong> Välj ett avgränsat use-case —
                t.ex. summering av inkommande ärenden. Börja med ej klientidentifierbar data.
              </li>
              <li>
                <strong>Teckna rätt avtal.</strong> Kontakta Anthropic Enterprise eller en
                partner för att få ett DPA på plats innan ni hanterar klientdata.
              </li>
              <li>
                <strong>Bygg en enkel integration.</strong> En Python-script eller en no-code
                lösning (Zapier, Make) räcker för att automatisera summering av mejl eller
                kategorisering av ärenden.
              </li>
              <li>
                <strong>Mät och utvärdera.</strong> Logga hur lång tid uppgifterna tog
                med och utan AI under en månad. Dokumentera kvaliteten.
              </li>
              <li>
                <strong>Rulla ut och skala.</strong> Om piloten lyckas, utöka till fler
                use-cases och fler jurister. Skapa interna riktlinjer för AI-användning.
              </li>
            </ol>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din advokatbyrå</h2>
            <p className="text-gray-700 leading-relaxed">
              Vill du se exakt vad kontraktsanalys eller juridisk research kostar med
              din volym och din valda modell?{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i antal förfrågningar, genomsnittlig dokumentlängd och jämföra
              Claude Sonnet, Haiku och GPT-4o sida vid sida i SEK.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/jamfor-ai-modeller" className="text-indigo-600 hover:underline">
                  Jämför alla AI-modeller — GDPR och precision
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Claude Sonnet — alla priser i SEK
                </Link>
              </li>
              <li>
                <Link to="/ai-for-foretag" className="text-indigo-600 hover:underline">
                  AI för företag — enterprise-avtal och DPA
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI kan spara advokatbyråer hundratals juristtimmar per år till en
              API-kostnad på några hundra kronor i månaden. Rätt modell är Claude Sonnet 4.6
              för svenska juridiska texter och GDPR-kritisk hantering. Kritiska förutsättningar
              är DPA-avtal, EU-regionval och en tydlig intern policy för vilken data som
              får skickas till externa AI-tjänster. Med rätt setup är ROI tydlig redan
              under det första halvåret.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras. Verifiera alltid mot Anthropics officiella prislista
              och rådgör med er DPO innan ni hanterar klientdata i AI-system. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-advokatbyra"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI för advokatbyråer" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
