import { SEO } from "../components/SEO";
import { TokenCounter } from "../components/TokenCounter";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RelatedArticles } from "../components/RelatedArticles";
import { relatedArticles } from "../data/relatedArticles";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: "https://aikostnad.se" },
    { "@type": "ListItem", position: 2, name: "Tokenräknare", item: "https://aikostnad.se/token-kalkylator" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tokenräknare för AI — räkna tokens i din text",
  description: "Klistra in din text och se hur många tokens den innehåller, vad det kostar för olika AI-modeller, och hur svenska texter skiljer sig från engelska.",
  url: "https://aikostnad.se/token-kalkylator",
  inLanguage: "sv-SE",
  dateModified: "2026-05-25",
  isPartOf: { "@type": "WebSite", url: "https://aikostnad.se" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: "https://aikostnad.se" },
      { "@type": "ListItem", position: 2, name: "Tokenräknare", item: "https://aikostnad.se/token-kalkylator" },
    ],
  },
};

export function TokenCalculatorPage() {
  return (
    <>
      <SEO
        title="Tokenräknare — räkna tokens i din text"
        description="Klistra in din text och se hur många tokens den innehåller, vad det kostar för olika AI-modeller, och hur svenska texter skiljer sig från engelska."
        canonical="/token-kalkylator"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-brand-700 hover:underline flex items-center gap-1"
          >
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Tokenräknare för AI
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Klistra in vilken text som helst för att se hur många tokens den
            innehåller och vad det kostar att skicka till olika AI-modeller.
          </p>
        </div>

        <TokenCounter />

        <div className="mt-8 card bg-brand-50 border-brand-100">
          <p className="text-sm text-brand-800">
            Vet du nu hur lång din prompt är?{" "}
            <Link
              to="/#kalkylator"
              className="font-semibold underline underline-offset-2 hover:text-brand-900"
            >
              Använd kalkylatorn för att räkna ut månadskostnaden i SEK
            </Link>
            .
          </p>
        </div>

        {/* Section: Why Swedish costs more */}
        <div className="mt-10 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Varför fler tokens för svenska?
          </h2>
          <div className="prose text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              De flesta stora AI-modeller (GPT, Claude, Gemini) är tränade
              primärt på engelska text. Engelskans tokenizer delar upp text i
              ungefär <strong>0,75 tokens per ord</strong> — ett genomsnittligt
              engelskt ord ryms alltså inom en enda token.
            </p>
            <p>
              Svenska skiljer sig på två sätt. Dels har svenska många långa
              sammansatta ord, som &quot;järnvägsstationen&quot; eller
              &quot;förhandlingsprotokoll&quot;, som tokenizern delar upp i flera
              delar. Dels är tecknen <strong>å, ä och ö</strong> sällsynta i
              träningsdatan och kodas ofta som två tokens vardera snarare än ett.
            </p>
            <p>
              I praktiken landar svenska texter på ca{" "}
              <strong>1,2–1,5 tokens per ord</strong>, med ett medelvärde på
              ungefär <strong>1,3</strong>. Det innebär att din svenska prompt
              kostar ungefär <strong>73 % mer</strong> att processa jämfört med
              en textmässigt likvärdig engelsk text.
            </p>
            <p>
              Kalkylatorn ovan tar hänsyn till detta när den beräknar kostnaden.
              Tokenräknaren nedan visar det faktiska tokenantalet baserat på
              cl100k_base — samma tokenizer som OpenAI GPT-4o och liknande modeller
              använder.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-amber-800">
                <strong>Tips:</strong> Vill du sänka AI-kostnaden direkt? Skriv
                dina systempromptar på engelska. Det ger färre tokens, kortare
                svarstider och lägre kostnad — utan att du behöver byta modell.
              </p>
            </div>
          </div>
        </div>

        {/* Section: What is a token? */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Vad är en token? Förklarat enkelt
          </h2>
          <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              En <strong>token</strong> är den minsta textenhet en AI-modell
              arbetar med. Det är varken ett tecken eller ett ord — det är något
              mittemellan. Moderna tokenizers (som BPE, Byte Pair Encoding) delar
              upp text i vanliga teckenföljder baserat på hur ofta de förekommer
              i träningsdatan.
            </p>
            <p>Några konkreta exempel på hur engelska tokeniseras:</p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                <span>
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Hello</code>{" "}
                  = 1 token
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                <span>
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">ChatGPT</code>{" "}
                  = 2 tokens (Chat + GPT)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                <span>
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">tokenization</code>{" "}
                  = 3 tokens (token + ization → token / iz / ation)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                <span>
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">järnvägsstationen</code>{" "}
                  = 6–8 tokens (svenska sammansatta ord slås sönder)
                </span>
              </li>
            </ul>
            <p>
              En tumregel som håller ganska bra för engelska: <strong>1 000 tokens ≈ 750 ord</strong>,
              eller ungefär tre sidor A4-text. För svenska: <strong>1 000 tokens ≈ 570 ord</strong>.
            </p>
            <p>
              AI-leverantörer debiterar alltid per token, inte per ord eller tecken.
              Det är därför tokentalet är den relevanta enheten när du räknar ut vad
              en prompt faktiskt kostar.
            </p>
          </div>
        </div>

        {/* Section: Token costs per model */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Token-kostnader per modell — en snabb jämförelse
          </h2>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Alla priser nedan är i USD per miljon tokens (input / output) och gäller
            standardprislistan utan rabatter. Priserna uppdateras löpande —{" "}
            <Link to="/" className="text-brand-700 hover:underline">
              se aktuella priser i kronor på kalkylatorn
            </Link>
            .
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4 font-semibold text-gray-700">Modell</th>
                  <th className="py-2 pr-4 font-semibold text-gray-700 text-right">Input / M tokens</th>
                  <th className="py-2 pr-4 font-semibold text-gray-700 text-right">Output / M tokens</th>
                  <th className="py-2 font-semibold text-gray-700">Passar för</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">GPT-4o</td>
                  <td className="py-2.5 pr-4 text-right">$2,50</td>
                  <td className="py-2.5 pr-4 text-right">$10,00</td>
                  <td className="py-2.5">Avancerade uppgifter, multimodalt</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">GPT-4o mini</td>
                  <td className="py-2.5 pr-4 text-right">$0,15</td>
                  <td className="py-2.5 pr-4 text-right">$0,60</td>
                  <td className="py-2.5">Hög volym, enkla uppgifter</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">Claude Sonnet 4</td>
                  <td className="py-2.5 pr-4 text-right">$3,00</td>
                  <td className="py-2.5 pr-4 text-right">$15,00</td>
                  <td className="py-2.5">Kodning, analys, långa texter</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">Claude Haiku 3.5</td>
                  <td className="py-2.5 pr-4 text-right">$0,80</td>
                  <td className="py-2.5 pr-4 text-right">$4,00</td>
                  <td className="py-2.5">Snabb, kostnadseffektiv</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">Gemini 1.5 Pro</td>
                  <td className="py-2.5 pr-4 text-right">$1,25</td>
                  <td className="py-2.5 pr-4 text-right">$5,00</td>
                  <td className="py-2.5">Lång kontext (upp till 2M tokens)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">Gemini 1.5 Flash</td>
                  <td className="py-2.5 pr-4 text-right">$0,075</td>
                  <td className="py-2.5 pr-4 text-right">$0,30</td>
                  <td className="py-2.5">Billigast, snabb svarstid</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Output-tokens kostar typiskt 4–5× mer än input. Välj modell
            utifrån uppgiftens komplexitet — inte bara pris.
          </p>
        </div>

        {/* Section: How to reduce token costs */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Hur minskar du token-kostnaderna?
          </h2>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Fem konkreta åtgärder du kan göra utan att byta modell eller sänka
            kvaliteten på svaren.
          </p>
          <ol className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">1</span>
              <div>
                <strong className="text-gray-800 block mb-0.5">Skriv systempromptar på engelska</strong>
                Svenska systempromptar kostar 73 % mer per ord. Håll instruktionerna
                på engelska och låt bara användarens faktiska fråga vara på svenska.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">2</span>
              <div>
                <strong className="text-gray-800 block mb-0.5">Begränsa output-längden</strong>
                Output-tokens kostar 4–5× mer än input. Lägg till en instruktion som
                &quot;Svara i max 3 meningar&quot; eller &quot;Ge bara det viktigaste&quot; för att skära
                ner onödig text.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">3</span>
              <div>
                <strong className="text-gray-800 block mb-0.5">Aktivera prompt caching</strong>
                Upprepar du samma systemprompt i varje anrop? Med{" "}
                <Link to="/prompt-caching" className="text-brand-700 hover:underline">
                  prompt caching
                </Link>{" "}
                betalar du bara för de faktiska ändringarna — upp till 90 % rabatt
                på cachead input.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">4</span>
              <div>
                <strong className="text-gray-800 block mb-0.5">Välj rätt modell för uppgiften</strong>
                GPT-4o mini och Claude Haiku är 10–20× billigare än sina respektive
                flaggskepp och klarar de flesta rutinuppgifter lika bra. Använd
                de dyrare modellerna bara när komplexiteten kräver det.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">5</span>
              <div>
                <strong className="text-gray-800 block mb-0.5">Trimma kontextfönstret</strong>
                Skickar du hela konversationshistoriken vid varje anrop? Det är ett
                vanligt mönster som snabbt blåser upp token-räkningen. Skicka bara
                de senaste 3–5 turerna — modellen klarar sig oftast utmärkt ändå.
              </div>
            </li>
          </ol>
        </div>

        {/* Section: FAQ */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Vanliga frågor om tokens
          </h2>
          <div className="space-y-5">

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Är tokeniseringen identisk för alla AI-modeller?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nej. OpenAI GPT-4 och GPT-4o använder cl100k_base, medan äldre
                GPT-modeller använde p50k. Claude och Gemini har egna tokenizers
                som ger ungefär samma antal tokens men inte exakt samma. Skillnaden
                är vanligtvis under 5 % — tillräckligt liten för budgetberäkningar.
                Vår räknare använder cl100k_base som approximation.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Räknas bilder och filer som tokens?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ja. Bilder i multimodala modeller som GPT-4o och Claude konverteras
                till en fast mängd tokens beroende på bildstorlek och detaljnivå.
                En liten bild på 512×512 px kostar exempelvis ca 170 tokens hos
                OpenAI. Den här räknaren hanterar bara text.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Hur stor är skillnaden mellan svenska och engelska i praktiken?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Klistra in en text på svenska, notera tokenantalet, och jämför
                med en Google-översättning av samma text på engelska — vanligtvis
                ser du 20–40 % färre tokens på engelska. Åtgärder som att skriva
                systempromptar på engelska kan därför spara tusentals kronor per
                månad vid hög volym.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Vad innebär &quot;kontextfönster&quot; och varför spelar det roll?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kontextfönstret är det maximala antal tokens en modell kan hantera
                i en och samma konversation — input och output tillsammans.
                GPT-4o har 128 000 tokens, Claude Sonnet 200 000 och Gemini 1.5 Pro
                upp till 2 miljoner. Om du skickar långa konversationshistoriker
                riskerar du dels att nå taket, dels att betala för tokens som
                modellen ändå ignorerar (äldre kontext värderas lägre).
              </p>
            </div>

          </div>
        </div>

        <RelatedArticles links={relatedArticles["token-kalkylator"]} />
      </main>
    </>
  );
}
