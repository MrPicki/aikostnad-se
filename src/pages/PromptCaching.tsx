import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

const faqs: FAQItem[] = [
  {
    question: "Vad är prompt caching?",
    answer:
      "Prompt caching innebär att LLM-leverantören återanvänder en bearbetad version av din input för senare anrop, så att du inte betalar fullt pris för samma input två gånger. När du skickar en lång system-prompt eller dokumentkontext som inte ändras mellan anrop, kan modellen läsa den från cache istället för att bearbeta hela texten från grunden — och du får rabatt på de tokens som matchar cachen.",
  },
  {
    question: "Vilka modeller stödjer prompt caching?",
    answer:
      "Anthropic var först ut med explicit prompt caching för Claude (Haiku, Sonnet, Opus) — du markerar själv vilka block som ska cachas. OpenAI har automatisk prompt caching på GPT-4o, GPT-4o mini och o-serien sedan slutet av 2024 — den triggas när prefixet är minst 1 024 tokens och matchas exakt. Google Gemini och Mistral har också liknande funktioner men med olika villkor.",
  },
  {
    question: "Hur mycket kan jag spara med prompt caching?",
    answer:
      "Spannet är 25–90 % rabatt på den cachade delen av input. Anthropic ger ca 90 % rabatt på cached input (10 % av normalt pris). OpenAI ger 50 % rabatt på cached input för GPT-4o. För en chatbot med 2 000 ord lång system-prompt och 10 000 förfrågningar per dag kan caching halvera totalkostnaden eftersom input vanligen är hälften av notan.",
  },
  {
    question: "När är prompt caching inte värt det?",
    answer:
      "När din input är kort (under 1 000 tokens), när den ändras vid varje anrop, eller när du har låg volym (under 100 anrop per timme). Hos Anthropic har cache-write en överkostnad (1,25× normalt pris) som gör caching olönsamt om du inte återanvänder cachen flera gånger inom TTL-fönstret (5 minuter default, 1 timme opt-in).",
  },
  {
    question: "Hur implementerar jag prompt caching i min applikation?",
    answer:
      "Hos Anthropic: lägg till `cache_control: { type: 'ephemeral' }` på de meddelandeblock du vill cacha — typiskt system-prompt och eventuell dokumentkontext. Hos OpenAI är det automatiskt — du behöver bara strukturera din prompt så att den oföränderliga delen kommer först. Mät cache hit rate via `usage.cache_read_input_tokens` (Anthropic) eller `usage.prompt_tokens_details.cached_tokens` (OpenAI) — om du ser 0 % hit rate är något fel med strukturen.",
  },
];

export function PromptCaching() {
  return (
    <>
      <SEO
        title="Prompt caching — så halverar du din Claude- och GPT-kostnad"
        description="Komplett guide till prompt caching för Claude, GPT-4o och Gemini. Hur det fungerar, vilka modeller stödjer det, exakta rabattnivåer och konkreta exempel i SEK."
        canonical="/prompt-caching"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Prompt caching", url: "https://aikostnad.se/prompt-caching" },
      ]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Prompt caching — så halverar du AI-kostnaden
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Prompt caching är den mest underutnyttjade prisoptimeringen i
            LLM-världen. För chatbots och RAG-applikationer kan rätt
            cache-strategi <strong>sänka månadsnotan med 40–60 %</strong> utan
            att tappa kvalitet. Den här guiden förklarar hur det fungerar, vad
            varje leverantör erbjuder, och när det faktiskt lönar sig.
          </p>

          {/* What is it */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vad är prompt caching?</h2>
            <p className="text-gray-700 leading-relaxed">
              Varje gång du skickar en fråga till en LLM måste modellen
              processa hela inputen — system-prompt, eventuell dokumentkontext,
              chatthistorik och den nya användarfrågan. Den här bearbetningen
              dominerar input-kostnaden.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Problemet: i de flesta produktions-applikationer ändras stora
              delar av input inte mellan anrop. System-prompten är samma. Den
              uppladdade PDF:en är samma. Bara den nya användarfrågan är ny.
              Trots det betalar du för bearbetning av <em>hela</em> inputen
              varje gång.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Prompt caching löser det. Leverantören sparar en bearbetad
              version av din återanvända input i en cache och läser tillbaka
              den vid nästa anrop — för en bråkdel av normalt pris.
            </p>
          </section>

          {/* How it works */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur det fungerar tekniskt</h2>
            <p className="text-gray-700 leading-relaxed">
              Tre koncept du behöver förstå:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Cache-prefix.</strong> Caching gäller den{" "}
                <em>första</em> delen av din prompt. Om du har system-prompt +
                dokument + användarfråga, kan system-prompt och dokument
                cachas — men inte användarfrågan (den ändras).
              </li>
              <li>
                <strong>TTL (time-to-live).</strong> Cachen försvinner efter
                en viss tid utan användning. Hos Anthropic är default 5
                minuter, opt-in för 1 timme. Hos OpenAI typiskt 5–10 minuter
                automatiskt.
              </li>
              <li>
                <strong>Cache-write vs cache-read.</strong> Första gången du
                skickar ny input som ska cachas debiteras du <em>extra</em>{" "}
                för cache-write (ca 1,25× normalt pris hos Anthropic).
                Efterföljande läsningar är billigast. Du måste återanvända
                cachen <em>flera gånger</em> inom TTL-fönstret för att det ska
                löna sig.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Det betyder att caching inte är "gratis besparing". Det är
              "amortisering" — du tar en initial kostnad och får tillbaka den
              över flera anrop.
            </p>
          </section>

          {/* When it pays off */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När caching lönar sig</h2>
            <p className="text-gray-700 leading-relaxed">
              Tumregler från praktiken:
            </p>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-green-900">✓ Stark kandidat för caching</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>System-prompt över 1 000 tokens (typiskt 750+ ord)</li>
                <li>RAG-applikation med samma dokumentkontext över flera turns</li>
                <li>Volym över 100 anrop per timme</li>
                <li>Förutsägbara trafikmönster — kontorstid, kampanjer, etc.</li>
                <li>Multi-turn-chatt där tidigare meddelanden återanvänds</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-red-900">✗ Caching lönar sig inte</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>Input under 500 tokens — inte tillräckligt att cacha</li>
                <li>Varje anrop har unik kontext (inga återanvändbara prefixer)</li>
                <li>Mindre än 5–10 anrop per minut — TTL hinner gå ut</li>
                <li>Single-shot-applikationer (en fråga, ett svar, ny session)</li>
              </ul>
            </div>
          </section>

          {/* Provider comparison */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur leverantörerna jämför sig</h2>
            <p className="text-gray-700 leading-relaxed">
              De stora leverantörerna hanterar caching olika — både i hur du
              aktiverar det och hur stor rabatt du får:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Leverantör</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Aktivering</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Cache-rabatt</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Anthropic (Claude)</td>
                    <td className="px-3 py-2">Manuell via <code>cache_control</code></td>
                    <td className="px-3 py-2 text-green-700">~90 % billigare</td>
                    <td className="px-3 py-2">5 min default, 1 h opt-in</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">OpenAI (GPT-4o)</td>
                    <td className="px-3 py-2">Automatisk vid 1 024+ tokens</td>
                    <td className="px-3 py-2 text-green-700">~50 % billigare</td>
                    <td className="px-3 py-2">5–10 min automatiskt</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Google (Gemini)</td>
                    <td className="px-3 py-2">Manuell context caching</td>
                    <td className="px-3 py-2 text-green-700">~75 % billigare</td>
                    <td className="px-3 py-2">Konfigurerbar</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Mistral / DeepSeek</td>
                    <td className="px-3 py-2">Varierar per modell</td>
                    <td className="px-3 py-2">Varierar</td>
                    <td className="px-3 py-2">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500">
              Källor:{" "}
              <a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Anthropic Prompt Caching</a>{" "}
              ·{" "}
              <a href="https://platform.openai.com/docs/guides/prompt-caching" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">OpenAI Prompt Caching</a>
              . Verifierade maj 2026.
            </p>

            <p className="text-gray-700 leading-relaxed">
              <strong>Anthropic vinner på rabattens storlek</strong> — 90 % är
              massivt. Men du måste själv markera vad som ska cachas, vilket
              kräver lite mer ingenjörsarbete.{" "}
              <strong>OpenAI vinner på enkelhet</strong> — automatisk caching
              kräver inget extra från dig, men rabatten är hälften så stor.
            </p>
          </section>

          {/* Concrete example */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Konkret räkneexempel</h2>
            <p className="text-gray-700 leading-relaxed">
              Scenario: En kundtjänst-chatbot med en system-prompt på{" "}
              <strong>2 000 ord</strong> (≈2 600 tokens på svenska). Boten
              hanterar <strong>10 000 förfrågningar per dag</strong> där varje
              användarfråga är ca 100 ord och svaret 200 ord.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Utan caching</strong> (Claude Sonnet 4.6):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
              <li>System-prompt-tokens per anrop: 2 600 (input)</li>
              <li>User-fråga-tokens per anrop: 130 (input)</li>
              <li>Svar-tokens per anrop: 260 (output)</li>
              <li>Per månad (22 dagar): 600 Mtok input + 57 Mtok output (avrundat)</li>
              <li>Kostnad: 600 × $3 + 57 × $15 = <strong>$2 655/månad</strong> (~27 900 kr)</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              <strong>Med caching</strong> (system-prompt cachas):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
              <li>Cache-read input: 572 Mtok × $0,30 (10 %) = $172</li>
              <li>Ny input per anrop (user-fråga): 28 Mtok × $3 = $84</li>
              <li>Output: 57 Mtok × $15 = $855</li>
              <li>Plus initial cache-write-overhead: ~$3</li>
              <li>Total: <strong>~$1 114/månad</strong> (~11 700 kr)</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              <strong>Besparing: ~58 %</strong>, eller cirka 16 000 kr/månad
              i det här scenariot. Det här är inte ett ovanligt utfall — det
              är vad de flesta chatbot-byggare som inte använder caching
              betalar i onödan.
            </p>
          </section>

          {/* Implementation tips */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Implementation — fem tips</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Strukturera prompten med statisk del först.</strong>{" "}
                System-prompt och dokumentkontext före användarfrågan — då
                kan leverantören matcha prefix:et exakt.
              </li>
              <li>
                <strong>Cacha inte chathistoriken om den växer.</strong> Varje
                ny turn ändrar prefix:et och invaliderar cachen. Strategi:
                cacha system-prompt + dokument, lämna konversationsturer
                utanför.
              </li>
              <li>
                <strong>Mät cache hit rate.</strong> Anthropic visar{" "}
                <code>cache_read_input_tokens</code> i usage-objektet. OpenAI
                visar <code>cached_tokens</code>. Om hit rate är under 50 %
                är något fel med strukturen.
              </li>
              <li>
                <strong>Tänk på TTL.</strong> Om din applikation har bursttrafik
                följt av låg aktivitet — använd Anthropics 1-timmes-TTL.
                Det kostar mer per write men sparar pengar om volymen är
                ojämn.
              </li>
              <li>
                <strong>Cacha inte små promtar.</strong> Under 500 tokens
                lönar det sig sällan. Cache-write-overheaden äter upp
                besparingen.
              </li>
            </ol>
          </section>

          {/* CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på din specifika situation</h2>
            <p className="text-gray-700 leading-relaxed">
              Om du redan kör en chatbot eller RAG-applikation i produktion —
              kolla din nuvarande månadsfaktura mot priserna i exemplet ovan.
              En 50-procentig sänkning är inom räckhåll om du inte har
              caching aktiverat idag.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              För att räkna grovt på din egen volym:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/" className="text-indigo-600 hover:underline">
                  Använd kalkylatorn på startsidan
                </Link>{" "}
                — räkna utan caching och estimera 40–60 % lägre med caching
              </li>
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Räkna specifikt på Claude
                </Link>{" "}
                — Anthropic ger bäst cache-rabatt
              </li>
              <li>
                <Link to="/ai-chatbot-kostnad" className="text-indigo-600 hover:underline">
                  Komplett chatbot-kostnadsguide
                </Link>{" "}
                — där caching är ett av fyra knep
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              Prompt caching är gratis pengar för rätt arbetsbelastning. Om
              din applikation har en återanvänd system-prompt över 1 000
              tokens och minst 100 anrop per timme — caching kommer halvera
              din input-kostnad. Anthropic ger störst rabatt (90 %), OpenAI
              ger enklast aktivering (automatisk), Google ligger däremellan.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Det viktigaste beslutet är inte vilken leverantör — det är att
              överhuvudtaget aktivera caching. De flesta produktionsapplikationer
              vi ser i Sverige idag har det <em>inte</em> aktiverat.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser och cache-rabatter verifierade 2026-05-15 mot officiella
              dokumentationer. Caching-modeller utvecklas snabbt — kontrollera
              alltid mot leverantörens senaste guide innan ni
              produktionsätter.
            </p>
          </section>
        </article>

        <LandingFAQ items={faqs} heading="Vanliga frågor om prompt caching" />
      </main>
    </>
  );
}
