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

const article = articles["ai-for-skola"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar en AI-läxhjälp-chatbot för 200 elever per månad?",
    answer:
      "En GPT-4o mini-baserad läxhjälp-chatbot för 200 elever som ställer 3 frågor per dag var kostar ca 29 SEK per månad i API-kostnader. Plattform, hosting och pedagogisk konfiguration är de verkliga kostnaderna. En välimplementerad lösning via existerande EdTech-verktyg (som Khanmigo, Socratic eller lokala alternativ) kan ha en total månadskostnad på 500–3 000 SEK beroende på platform och volymen.",
  },
  {
    question: "Är AI-verktyg GDPR-kompatibla för elever under 18 år?",
    answer:
      "Det ställer extra krav. GDPR artikel 8 sätter åldersgränsen för samtycke till 13 år (16 år i vissa EU-länder inklusive Sverige). För elever under 16 år krävs vårdnadshavares samtycke för behandling baserat på samtycke. Alternativt kan behandlingen grundas på allmänt intresse (kommunal utbildningsverksamhet) om den är proportionerlig. Kontrollera att AI-leverantören inte använder elevers data för modellträning och att DPA finns på plats.",
  },
  {
    question: "Hur påverkar AI fusk och plagiat i skolan?",
    answer:
      "Det är en reell utmaning. AI-detektionsverktyg (Turnitin AI, GPTZero) är inte helt tillförlitliga och ger falska positiva. Den mer hållbara lösningen är att anpassa examinationsformer — muntliga examinationer, processbaserade uppgifter, redovisningar i klassrummet och problemuppgifter med kontext som är svåra att lösa med generisk AI. Skolverket och akademisk litteratur rekommenderar en pedagogisk omstöpning snarare än teknisk detektion.",
  },
  {
    question: "Vad säger Skolverket om AI i undervisningen?",
    answer:
      "Skolverket har utfärdat riktlinjer som uppmuntrar ett genomtänkt men öppet förhållningssätt till AI i undervisningen. AI ska inte förbjudas generellt men elever och lärare behöver utbildning om hur AI fungerar, dess begränsningar och källkritik kring AI-genererat innehåll. Skolan ska också säkerställa att digitala klyftor inte förstärks — alla elever ska ha likvärdig tillgång till AI-verktyg om de används i undervisningen.",
  },
];

export function AiForSkola() {
  return (
    <>
      <SEO
        title="AI i skolan — vad kostar det för kommuner och skolor? (2026)"
        description="AI-kostnader för skolor och kommuner: läxhjälp-chatbot, bedömningsstöd och kursplaneringsassistent. GPT-4o mini för priseffektiv implementering. Maj 2026."
        canonical="/ai-for-skola"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI i skolan", url: "https://aikostnad.se/ai-for-skola" },
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
            AI i skolan — vad kostar det för kommuner och skolor? (2026)
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar AI för en skola eller kommun?"
            answer={
              <>
                <strong>GPT-4o mini</strong> är det primära valet för skolverksamhet — lägst pris och tillräcklig kvalitet för läxhjälp och standarduppgifter. Läxhjälp-chatbot för 200 elever (3 frågor/dag) kostar <strong>~29 SEK/mån</strong> i API. Bedömningsstöd 100 uppgifter/dag kostar <strong>~7 SEK/mån</strong>. De verkliga kostnaderna är platform, integration och pedagogisk implementation.
              </>
            }
            bullets={[
              "Rekommenderad modell: GPT-4o mini (priset prioriteras, tillräcklig kvalitet)",
              "Läxhjälp-chatbot 200 elever × 3 frågor/dag: ~29 SEK/mån",
              "Bedömningsstöd 100 uppgifter/dag: ~7 SEK/mån",
              "Kursplaneringsassistent 10 lärare: ~1 SEK/mån",
              "Verkliga kostnader: platform + DPA + pedagogisk utbildning",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            AI i skolan är inte längre en framtidsfråga — det är en nutidsfråga. Elever
            använder ChatGPT och Claude redan, oavsett om skolan har en policy eller inte.
            Det relevanta beslutet för kommuner och skolledningar är inte "om" utan "hur":
            hur implementeras AI på ett pedagogiskt genomtänkt, GDPR-säkert och rättvist
            sätt? Den här guiden ger konkreta kostnadssiffror, en bild av de
            tekniska och juridiska förutsättningarna och praktiska råd för skolledningar
            och IT-chefer i kommunal verksamhet.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Tre konkreta AI-tillämpningar för skolan</h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6">1. Läxhjälp-chatbot för elever</h3>
            <p className="text-gray-700 leading-relaxed">
              En AI-chatbot för läxhjälp är det vanligaste och mest omedelbart värdefulla
              use-caset i skolan. En välkonfigurerad bot besvarar frågor om matematikproblem,
              hjälper till att förstå historiska skeenden, förklarar grammatikregler och ger
              feedback på utkast — utan att göra jobbet åt eleven.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Skillnaden mot en okontrollerad ChatGPT-användning är konfigurationen: en
              skolspecifik chatbot kan vara inriktad på Sokrates-metoden (fråga tillbaka
              istället för att ge svaret direkt), begränsad till relevanta ämnen och tränad
              på skolans kursplaner. Khan Academy's Khanmigo är ett välkänt internationellt
              exempel. För svenska kommuner som vill bygga egna lösningar med GPT-4o mini
              är API-kostnaden för 200 elever × 3 frågor/dag ca 29 SEK per månad.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Bedömningsstöd för lärare</h3>
            <p className="text-gray-700 leading-relaxed">
              Lärare lägger en stor del av sin arbetstid på bedömning och feedback.
              AI kan hjälpa till att snabba upp första rättningen av strukturerade uppgifter,
              generera formativ feedback på utkast och flagga elever som behöver extra stöd
              baserat på mönster i inlämningar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Viktigt: AI ersätter inte lärarens professionella bedömning. Det är ett
              verktyg för att snabba upp rutinarbete och ge läraren mer tid för direkt
              pedagogisk interaktion med eleverna. Slutbedömningen görs alltid av läraren.
              Vid 100 uppgifter per dag och GPT-4o mini är API-kostnaden ca 7 SEK per månad.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Kursplaneringsassistent för lärare</h3>
            <p className="text-gray-700 leading-relaxed">
              AI kan hjälpa lärare att strukturera kursplaner, generera övningsuppgifter
              för olika svårighetsnivåer, skapa diskussionsfrågor och anpassa material för
              elever med särskilda behov. En lärare som förbereder en ny kursmodul kan
              använda AI för att snabbt generera ett råutkast som sedan bearbetas och
              anpassas till den specifika klassen och skolans kontext.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För 10 lärare med en handledningssession per vecka var är API-kostnaden
              med GPT-4o mini under 2 SEK per månad — marginellt jämfört med värdet
              av frigjord planeringstid.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Scenario-tabell: tre konkreta use-cases</h2>
            <p className="text-gray-700 leading-relaxed">
              Beräkningar med GPT-4o mini (1,575 SEK/Mtok input, 6,30 SEK/Mtok output).
              22 skoladagar per månad. Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Use-case</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Volym</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API-kostnad/mån</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Sparad tid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Läxhjälp-chatbot</td>
                    <td className="px-3 py-2">200 elever × 3 frågor/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~29 SEK</td>
                    <td className="px-3 py-2">Elevernas self-service lärande</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Bedömningsstöd</td>
                    <td className="px-3 py-2">100 uppgifter/dag</td>
                    <td className="px-3 py-2 text-right font-bold">~7 SEK</td>
                    <td className="px-3 py-2">~5–10 lärartimmar/dag</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Kursplaneringsstöd</td>
                    <td className="px-3 py-2">10 lärare, 10 sessioner/mån</td>
                    <td className="px-3 py-2 text-right font-bold">&lt;2 SEK</td>
                    <td className="px-3 py-2">~2–3 h planeringstid/lärare</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Läxhjälp: 200 input-tokens/fråga, 300 output-tokens/svar, 22 dagar.
              Bedömning: 500 input-tokens/uppgift, 400 output-tokens/feedback, 22 dagar.
              Kursplanering: 1 000 input, 1 000 output per session.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR och elevers dataskydd</h2>
            <p className="text-gray-700 leading-relaxed">
              Kommunal skolverksamhet behandlar personuppgifter om minderåriga, vilket
              ställer höga krav. Kommunen är normalt personuppgiftsansvarig och AI-leverantören
              är personuppgiftsbiträde.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-amber-900">Checklista för GDPR-kompatibel AI i skolan</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>DPA med AI-leverantören</strong> — OpenAI erbjuder Education-avtal, Anthropic Enterprise för kommuner</li>
                <li><strong>Ingen träning på elevdata</strong> — säkerställ att API-konversationer inte används för modellträning</li>
                <li><strong>EU-regional databearbetning</strong> — välj EU-region om leverantören erbjuder det</li>
                <li><strong>Åldersanpassat samtycke</strong> — elever under 16 år kräver vårdnadshavares samtycke (alternativt: grunda behandlingen på allmänt intresse)</li>
                <li><strong>Elevinformation</strong> — informera elever om hur AI används i undervisningen</li>
                <li><strong>Inget personidentifierbart innehåll</strong> — läx-chatboten ska inte lagra vem som ställde vilken fråga med koppling till elevidentitet</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur kommuner upphandlar AI-tjänster för skolan</h2>
            <p className="text-gray-700 leading-relaxed">
              Kommunal upphandling av AI-tjänster i skolan följer LOU (Lagen om offentlig
              upphandling). Det finns flera vägar:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Avrop från ramavtal.</strong> Kammarkollegiets ramavtal för IT-tjänster
                och molntjänster täcker i vissa fall AI-relaterade tjänster. Kräver att
                ni kontrollerar om er specifika tjänst ryms i befintliga ramavtal.
              </li>
              <li>
                <strong>Direktupphandling (under tröskelvärdena).</strong> För belopp under
                ca 700 000 kr kan kommunen direktupphandla utan formell anbudsprocess —
                men dokumentation och affärsmässig motivering krävs.
              </li>
              <li>
                <strong>Samordnad upphandling via SKR (Sveriges Kommuner och Regioner).</strong>
                SKR arbetar med ramavtal för EdTech som kan inkludera AI-verktyg.
                Fördelarna är stordriftsfördelar och juridisk förberedelse.
              </li>
              <li>
                <strong>Pilotprojekt med befintliga licenser.</strong> Många kommuner har
                Microsoft 365 Education med Copilot inkluderat — ett naturligt startpunkt
                för AI utan ny upphandling.
              </li>
            </ol>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Verklig budget för en mellanstor skola</h2>
            <p className="text-gray-700 leading-relaxed">
              En skola med 500 elever och 40 lärare som vill implementera AI-läxhjälp
              och lärarbedömningsstöd:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>API-kostnad (GPT-4o mini, alla tre use-cases):</strong> ~40 SEK/mån</li>
              <li><strong>EdTech-plattform (om befintlig inte används):</strong> 0–2 000 SEK/mån</li>
              <li><strong>Teknisk integration och setup (engångskostnad):</strong> 20 000–60 000 SEK</li>
              <li><strong>Personalutbildning:</strong> 10 000–30 000 SEK (engångskostnad)</li>
              <li><strong>Löpande förvaltning:</strong> 500–2 000 SEK/mån</li>
              <li><strong>Total år 1:</strong> 50 000–100 000 SEK (dominated av setup och utbildning)</li>
              <li><strong>Total år 2+:</strong> 10 000–30 000 SEK/år</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Notera att API-kostnaden är marginell. Den dominerande kostnaden är pedagogisk
              implementation, inte tokens.
            </p>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på din skola eller kommuns AI-kostnad</h2>
            <p className="text-gray-700 leading-relaxed">
              Fyll i antal elever, frågor per dag och eventuella lärarbedömningsuppgifter i{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">
                kalkylatorn på startsidan
              </Link>{" "}
              och se exakt vad GPT-4o mini eller Claude Haiku kostar för er specifika skola
              — i SEK per månad.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/billigaste-ai" className="text-brand-700 hover:underline">
                  GPT-4o mini vs Claude Haiku — vilken är billigast?
                </Link>
              </li>
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-brand-700 hover:underline">
                  Bygga en AI-chatbot — komplett budgetguide
                </Link>
              </li>
              <li>
                <Link to="/vad-kostar-ai" className="text-brand-700 hover:underline">
                  Komplett AI-prisguide — abonnemang och API
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI-implementering i skolan är tekniskt billig men kräver pedagogisk och
              juridisk investering. GPT-4o mini ger tillräcklig kvalitet för läxhjälp och
              standarduppgifter till extremt låg kostnad — under 40 SEK per månad för
              en hel skola med 500 elever. De verkliga kostnaderna är platform, GDPR-arbete
              och personalutbildning. Börja smalt: ett pilotprojekt i ett ämne, en
              väldefinierad användning, tydliga pedagogiska mål och GDPR-compliance på plats
              innan ni skalar ut till hela skolan eller kommunen.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Informationen avser generella kostnads- och teknikfrågor. Rådgör med er DPO
              och juridisk rådgivare innan ni implementerar AI i skolverksamhet. Följ
              Skolverkets riktlinjer för AI i undervisningen. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-skola"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI i skolan" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
