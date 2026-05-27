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

const article = articles["vad-kostar-ai-per-ar"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar ChatGPT Plus per år?",
    answer:
      "ChatGPT Plus kostar 20 USD per månad, vilket med en kurs på 10,5 SEK/USD ger 210 kr/mån eller 2 520 kr per år. OpenAI erbjuder ingen officiell årsrabatt på Plus-planen. ChatGPT Team kostar 25 USD per user per månad (262 kr) och faktureras månadsvis.",
  },
  {
    question: "Är AI-abonnemang avdragsgilla för företag?",
    answer:
      "Ja. AI-abonnemang som ChatGPT Plus, Claude Pro eller GitHub Copilot som används i verksamheten är avdragsgilla som IT-kostnader (kontotyp 5420 enligt BAS-kontoplanen). Detsamma gäller API-kostnader. Se till att betala med företagskort och spara kvittona — det är enkla avdrag vid bokföringen.",
  },
  {
    question: "Är API billigare än abonnemang per år?",
    answer:
      "Det beror helt på din faktiska användning. En enskild intensivanvändare som nyttjar ChatGPT Plus till max betalar 2 520 kr/år och får obegränsad (soft limit) GPT-4o-tillgång. Samma person via API med 1 000 frågor/dag á 500 tokens kan betala 2 000–8 000 kr/år beroende på modell. API är billigare vid låg eller sporadisk användning; abonnemang är bättre vid intensiv daglig användning.",
  },
  {
    question: "Vad kostar Microsoft 365 Copilot per år för ett litet företag?",
    answer:
      "Microsoft 365 Copilot kostar 30 USD per användare per månad. För ett team på 10 personer: 300 USD/mån = 3 150 kr/mån = 37 800 kr/år. Notera att det kräver en befintlig Microsoft 365-licens (Business Standard eller Premium, 100–200 kr/user/mån). Totalkostnaden för AI-aktiverad Microsoft 365 för 10 personer hamnar på 55 000–70 000 kr/år.",
  },
  {
    question: "Hur planerar jag en realistisk AI-budget?",
    answer:
      "Starta med att inventera befintliga AI-verktyg och faktiska license. Estimera sedan de use cases du vill lägga till. Räkna med att faktisk AI-användning tenderar att växa 20–50 % per kvartal när organisationen vänjer sig. Budgetera med 20 % buffer och planera in en halvårsöversyn. Sätt explicit spending limits på API-konton för att undvika surpriser.",
  },
];

export function VadKostarAiPerAr() {
  return (
    <>
      <SEO
        title="Vad kostar AI per år? Räkna ut din AI-budget för 2026"
        description="Årliga AI-kostnader för privatperson, frilansare, startup och SME. Abonnemang vs API per år, hur du planerar en AI-budget och vanliga misstag som kostar dig pengar. SEK 2026."
        canonical="/vad-kostar-ai-per-ar"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Vad kostar AI per år", url: "https://aikostnad.se/vad-kostar-ai-per-ar" },
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
            Vad kostar AI per år — för privatperson och företag
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar AI per år?"
            answer={
              <>
                Privatperson: <strong>0–2 520 kr/år</strong>. Frilansare:{" "}
                <strong>2 520–5 040 kr/år</strong>. 10-personers företag:{" "}
                <strong>25 000–40 000 kr/år</strong> via abonnemang, eller{" "}
                <strong>5 000–50 000 kr/år</strong> via API. Budgetera alltid med 20 % buffer —
                AI-volym tenderar att växa.
              </>
            }
            bullets={[
              "ChatGPT Plus: 2 520 kr/år ($240)",
              "Claude Pro: 2 520 kr/år",
              "Gemini Advanced: 2 520 kr/år",
              "GitHub Copilot: 1 260 kr/år ($120)",
              "10-pers team med ChatGPT Team: 31 500 kr/år",
              "Microsoft 365 Copilot (10 pers): 37 800 kr/år",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Månadsvis tänker vi sällan på totalkostnaden. Men när du ska budgetera, jämföra med
            alternativ eller argumentera för en AI-investering internt — då är årstalen avgörande.
            En 2 520 kr/år-kostnad är lätt att godkänna. En abonnemangsstruktur som plogar upp till
            40 000 kr/år för ett litet team kräver ett ordentligt business case. Den här guiden ger
            dig de exakta siffrorna.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Varför räkna AI-kostnader per år?</h2>
            <p className="text-gray-700 leading-relaxed">
              Tre konkreta skäl att tänka i årsbelopp istället för månadsbelopp:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Budgetering:</strong> IT-budgetar och verksamhetsplaner görs per år. Du behöver
                årsbelopp för att lägga AI-kostnaden i rätt rad i budgeten.
              </li>
              <li>
                <strong>Jämförelse abonnemang vs API:</strong> API-kostnader varierar månad till månad.
                En årsöversikt synliggör trenden och gör det möjligt att jämföra om ett fast abonnemang
                faktiskt är billigare totalt.
              </li>
              <li>
                <strong>Skattemässigt:</strong> Avdrag bokförs per räkenskapsår. Att veta årsbeloppet
                för AI-verktyg gör bokföringen enklare och säkerställer att du inte missar legitima
                avdrag som IT-kostnad.
              </li>
            </ul>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Privatperson och frilansare — AI-kostnad per år</h2>
            <p className="text-gray-700 leading-relaxed">
              För privatpersoner och soloföretagare handlar det oftast om ett eller ett par abonnemang.
              Här är de vanligaste valen med årsbelopp i SEK (kurs 10,5 SEK/USD):
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Verktyg</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Mån (SEK)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">År (SEK)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Vad du får</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Free</td>
                    <td className="px-3 py-2">0 kr</td>
                    <td className="px-3 py-2 font-bold">0 kr</td>
                    <td className="px-3 py-2">GPT-4o mini, begränsad GPT-4o</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Plus</td>
                    <td className="px-3 py-2">210 kr</td>
                    <td className="px-3 py-2 font-bold">2 520 kr</td>
                    <td className="px-3 py-2">Full GPT-4o, o3, DALL-E</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Pro</td>
                    <td className="px-3 py-2">210 kr</td>
                    <td className="px-3 py-2 font-bold">2 520 kr</td>
                    <td className="px-3 py-2">Claude Sonnet + Opus, Projects</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini Advanced</td>
                    <td className="px-3 py-2">210 kr</td>
                    <td className="px-3 py-2 font-bold">2 520 kr</td>
                    <td className="px-3 py-2">Gemini 1.5 Pro, Google Workspace-integration</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GitHub Copilot</td>
                    <td className="px-3 py-2">105 kr</td>
                    <td className="px-3 py-2 font-bold">1 260 kr</td>
                    <td className="px-3 py-2">Kodkomplettering, chatt i IDE</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-medium">ChatGPT Plus + Copilot</td>
                    <td className="px-3 py-2">315 kr</td>
                    <td className="px-3 py-2 font-bold">3 780 kr</td>
                    <td className="px-3 py-2">Populärt combo för tech-frilansare</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              De flesta privatpersoner betalar 0–2 520 kr/år. Frilansare och soloföretagare inom
              tech betalar ofta 2 520–5 040 kr/år för ett par produktivitetsverktyg. Det är ett
              belopp som vanligtvis är fullt avdragsgillt om AI-verktygen används i verksamheten.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Startup och SME — AI-kostnad per år för 10 personer</h2>
            <p className="text-gray-700 leading-relaxed">
              För ett team på 10 personer blir valet av AI-strategi ekonomiskt betydande. Abonnemang
              per person vs en delad API-lösning kan skilja tiotusentals kronor per år.
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Lösning</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Mån (SEK)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">År (SEK)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Not</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Microsoft 365 Copilot (10×$30)</td>
                    <td className="px-3 py-2">3 150 kr</td>
                    <td className="px-3 py-2 font-bold text-red-700">37 800 kr</td>
                    <td className="px-3 py-2">Kräver M365 Business-licens</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">ChatGPT Team (10×$25)</td>
                    <td className="px-3 py-2">2 625 kr</td>
                    <td className="px-3 py-2 font-bold">31 500 kr</td>
                    <td className="px-3 py-2">GDPR DPA, delad workspace</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Team (10×$25)</td>
                    <td className="px-3 py-2">2 625 kr</td>
                    <td className="px-3 py-2 font-bold">31 500 kr</td>
                    <td className="px-3 py-2">GDPR DPA, Projects, bra svenska</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">API GPT-4o mini (låg vol.)</td>
                    <td className="px-3 py-2">200–500 kr</td>
                    <td className="px-3 py-2 font-bold text-green-700">2 400–6 000 kr</td>
                    <td className="px-3 py-2">Kräver intern app/frontend</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">API GPT-4o mini (måttlig vol.)</td>
                    <td className="px-3 py-2">1 000–2 000 kr</td>
                    <td className="px-3 py-2 font-bold text-green-700">12 000–24 000 kr</td>
                    <td className="px-3 py-2">Flexibelt, skalerbart</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Slutsatsen är tydlig: API-lösningar med GPT-4o mini eller liknande kan vara 5–15×
              billigare än enterprise-abonnemang per användare — men kräver teknisk implementation
              och ger inte samma färdiga produktivitetsverktyg. Rätt val beror på om du behöver
              en produkt (abonnemang) eller vill bygga en intern lösning (API).
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Abonnemang vs API — när lönar det sig att byta?</h2>
            <p className="text-gray-700 leading-relaxed">
              Tumregeln: om du betalar mer än 2 500 kr/år per person i abonnemang och din organisation
              har teknisk kapacitet att bygga ett internt verktyg, är det värt att räkna på ett API-alternativ.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Räkna in inte bara token-kostnaden utan även:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>Utvecklingstid för att bygga och underhålla ett internt verktyg (50–200 timmar)</li>
              <li>Fortlöpande infrastrukturkostnad (hosting, monitoring)</li>
              <li>Värdet av de funktioner du förlorar (DALL-E, Code Interpreter, webb-surfning)</li>
              <li>GDPR-compliance-arbete om ni behandlar känsliga data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              För de flesta team under 20 personer är abonnemang enklast och ibland billigast när man
              räknar in all overhead. För team över 50 personer med standardiserade arbetsflöden är
              en intern API-lösning nästan alltid mer kostnadseffektiv på ett 2-3 år-perspektiv.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Steg-för-steg: planera din AI-budget</h2>
            <p className="text-gray-700 leading-relaxed">
              En realistisk AI-budget för ett kommande år byggs i fem steg:
            </p>

            <div className="space-y-4 not-prose">
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Steg 1: Inventera befintliga verktyg</h3>
                <p className="text-sm text-gray-600">Lista alla AI-relaterade prenumerationer och API-kostnader ni betalar idag. Inkludera GitHub Copilot, Grammarly Business, eventuella API-kostnader. Många organisationer betalar 20–30 % mer än de tror.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Steg 2: Identifiera planerade use cases</h3>
                <p className="text-sm text-gray-600">Lista de AI-funktioner ni planerar lägga till. Klassificera dem som abonnemang eller API-funktioner. Estimera användarantal och frekvens.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Steg 3: Estimera volym och välj modell</h3>
                <p className="text-sm text-gray-600">Använd{" "}
                  <Link to="/" className="text-indigo-700 hover:underline">kalkylatorn på startsidan</Link>{" "}
                  för att estimera API-kostnader baserat på tokens och volym. Räkna på GPT-4o mini som bas och GPT-4o för 20 % av komplexa frågor.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Steg 4: Lägg in 20 % buffer</h3>
                <p className="text-sm text-gray-600">AI-användning växer konsekvent inom organisationer som börjar använda det. Planera för 20 % mer än du tror behövs — du kommer att ha rätt.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Steg 5: Schemalägg halvårsöversyn</h3>
                <p className="text-sm text-gray-600">Sätt en kalenderpost vid halvårsskiftet för att se faktisk vs estimerad kostnad. Justera budgeten och identifiera optimeringspotential.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vanliga misstag som ökar årskostnaden</h2>
            <p className="text-gray-700 leading-relaxed">
              Dessa misstag ser vi ofta hos organisationer som försöker hålla sin AI-budget under kontroll:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Betalar för Pro men använder Free-funktioner:</strong> Många ChatGPT Plus-prenumeranter
                använder primärt grundläggande chatt — inte DALL-E, Code Interpreter eller webb-sökning
                som faktiskt motiverar Plus-priset. Gratis-tieren räcker för sporadisk användning.
              </li>
              <li>
                <strong>Glömmer att API-kostnader ökar med användning:</strong> Till skillnad från
                abonnemang skalear API-notan linjärt med volymen. Utan spending limits och monitoring
                kan en ny feature oavsiktligt tredubbla månadsnotan.
              </li>
              <li>
                <strong>Ignorerar lager-licenser:</strong> Microsoft 365 Business Standard + Microsoft
                365 Copilot + GitHub Copilot för ett 10-personsteam kan kosta 70 000–80 000 kr/år.
                Många inser inte den totala kostnaden eftersom licenserna faktureras separat.
              </li>
              <li>
                <strong>Underskattar tillväxt:</strong> Det är sällsynt att AI-användning sjunker.
                Budgetera för tillväxt, inte för nuläget.
              </li>
            </ul>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Skatteavdrag för AI-kostnader</h2>
            <p className="text-gray-700 leading-relaxed">
              AI-abonnemang och API-kostnader som används i verksamheten är avdragsgilla i Sverige som
              IT-driftskostnader (BAS-konto 5420 eller 6230). Det gäller ChatGPT Plus, Claude Pro,
              GitHub Copilot, Microsoft 365 Copilot och OpenAI/Anthropic API-fakturor.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Praktiska råd: betala alltid med företagskort eller direkt via företagets faktureringskonto.
              Se till att fakturan är utställd på företaget (organisationsnummer) — inte privata betalningar
              som sedan begärs om. Kontrollera med din revisor om du är osäker på vilken kontotyp som
              passar din specifika verksamhet.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose">
              <h3 className="text-base font-bold text-amber-900">Notera</h3>
              <p className="text-sm text-gray-700 mt-1">
                Privatpersoner kan inte dra av AI-abonnemang om de inte används i inkomstgivande verksamhet.
                Frilansare och enskilda firmor kan dra av kostnader direkt kopplade till uppdrag.
                Aktiebolag kan dra av alla verksamhetsrelaterade IT-kostnader.
              </p>
            </div>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 not-prose">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Siffrorna ovan är riktmärken — din faktiska kostnad beror på volym, modellval och
              användningsmönster. Använd{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">kalkylatorn på startsidan</Link>{" "}
              för att räkna ut din exakta månads- och årskostnad i SEK. Se också{" "}
              <Link to="/ai-kostnad-per-manad" className="text-indigo-700 hover:underline font-medium">vad AI kostar per månad</Link>{" "}
              och{" "}
              <Link to="/vad-kostar-ai" className="text-indigo-700 hover:underline font-medium">komplett AI-prisguide 2026</Link>{" "}
              för en full överblick.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["vad-kostar-ai-per-ar"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-kostnad per år" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
