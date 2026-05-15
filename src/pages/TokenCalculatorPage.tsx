import { SEO } from "../components/SEO";
import { TokenCounter } from "../components/TokenCounter";
import { Link } from "react-router-dom";

export function TokenCalculatorPage() {
  return (
    <>
      <SEO
        title="Tokenräknare — räkna tokens i din text"
        description="Klistra in din text och se hur många tokens den innehåller, vad det kostar för olika AI-modeller, och hur svenska texter skiljer sig från engelska."
        canonical="/token-kalkylator"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
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

        <div className="mt-10 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Varför fler tokens för svenska?
          </h2>
          <div className="prose text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              De flesta stora AI-modeller (GPT, Claude, Gemini) är tränade
              primärt på engelska text. Engelskans tokenizer delar upp ord i
              ungefär 0,75 tokens per ord.
            </p>
            <p>
              Svenska har längre sammansatta ord (t.ex. &quot;järnvägsstationen&quot;),
              och de speciella tecknen å, ä och ö tokeniseras ibland som flera
              tokens. I praktiken landar svenska texter på ca <strong>1,2–1,5
              tokens per ord</strong>, med ett medelvärde på ca 1,3.
            </p>
            <p>
              Det innebär att din svenska prompt kostar ungefär{" "}
              <strong>73% mer</strong> att processa än en motsvarande engelsk
              text med samma antal ord.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-amber-800">
                <strong>Tips:</strong> Om du vill sänka AI-kostnaden kan du
                prova att skriva dina systempromptar på engelska, vilket ger
                färre tokens och lägre kostnad.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
