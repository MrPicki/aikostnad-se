import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";

const faqs: FAQItem[] = [
  {
    question: "Är ChatGPT eller Claude bäst på svenska?",
    answer:
      "Claude Sonnet ger generellt naturligare svenska än GPT-4o. Skillnaden märks tydligast på längre svar och i ton — Claude följer en initial stil bättre genom hela svaret. GPT-4o är dock fullt användbart för svenska och vinner när du behöver multimodal förmåga (kombinera bild och text i samma fråga).",
  },
  {
    question: "Är ChatGPT eller Claude billigare?",
    answer:
      "OpenAI är billigare per token i alla tre prisnivåer just nu (maj 2026). GPT-4o mini är ca 4× billigare än Claude Haiku per input-token. På flaggskeppsnivå är skillnaden ännu större — GPT-4.1 kostar $2/$8 mot Opus 4.7:s $5/$25 per miljon tokens. Anthropic kompenserar dock med prompt caching som kan sänka effektivt input-pris med 90 %.",
  },
  {
    question: "Vad är prompt caching och vilken modell har det?",
    answer:
      "Prompt caching innebär att återanvända en lång system-prompt eller kontext utan att betala fullt pris för den varje gång. Anthropic erbjuder cached input till 10 % av normalt pris för Claude. OpenAI har också automatisk caching på vissa modeller men med andra villkor. För chatbot-applikationer med fast systemprompt kan caching halvera totalkostnaden.",
  },
  {
    question: "Vilken modell är bäst för kodning?",
    answer:
      "GPT-4.1 och Claude Sonnet 4.6 är väldigt jämbördiga på kodningsbenchmarks. På SWE-bench Verified (verkliga GitHub-buggar) leder de växelvis från månad till månad. För Python och TypeScript är skillnaden marginell. För systemkodning och obskurare språk leder GPT-4.1 vanligtvis. Båda är överkurs för att fixa småbuggar — där räcker mini-varianterna.",
  },
  {
    question: "Kan jag byta från ChatGPT till Claude (eller tvärtom) senare?",
    answer:
      "Ja. API:erna är tillräckligt lika att byta vanligtvis tar några timmars arbete — du ändrar endpoint, autentisering och justerar prompten lite. Det enda du tappar är eventuella ChatGPT-specifika funktioner som Custom GPTs eller plugins. För ren chatbot-funktionalitet är leverantörsbyte trivialt och något de flesta produktionsapplikationer faktiskt gör efter 2–3 månaders A/B-test.",
  },
];

export function ChatGPTvsClaude() {
  return (
    <>
      <SEO
        title="ChatGPT vs Claude — pris och prestanda jämfört 2026"
        description="Vilken AI ska du välja? Komplett jämförelse av ChatGPT (GPT-4o) och Claude Sonnet — pris i SEK, kvalitet, svenska, prompt caching och kodning. Uppdaterat 2026."
        canonical="/chatgpt-vs-claude"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "ChatGPT vs Claude", url: "https://aikostnad.se/chatgpt-vs-claude" },
      ]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            ChatGPT vs Claude — vilken passar dig?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Båda är toppmodeller från USA:s ledande AI-bolag. För 8 av 10
            uppgifter är de utbytbara — det här är vad som skiljer dem på pris,
            svenska språk, kodning och multimodalt stöd. Uppdaterat maj 2026.
          </p>

          {/* Intro */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Skillnaden i ett nötskal</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI ligger bakom ChatGPT. Anthropic ligger bakom Claude. Båda
              släpper nya modeller varje halvår och båda har samma typ av
              prismodell — du betalar per miljon tokens, med ett pris för{" "}
              <em>input</em> (det du skickar in) och ett dyrare pris för{" "}
              <em>output</em> (det modellen genererar).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Den korta sanningen om var de skiljer sig:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>ChatGPT är bredare.</strong> Multimodalt stöd (bild,
                ljud, video är på väg), större ekosystem (Custom GPTs, plugins,
                webbsökning, DALL·E), snabbare iterationer på nya features.
              </li>
              <li>
                <strong>Claude är djupare.</strong> Längre svar med högre
                koherens, starkare på svensk text, generös prompt
                caching som kan halvera kostnaden för chatbot-användning.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Skillnaden märks tydligast på <strong>pris</strong> och i{" "}
              <strong>sättet de skriver</strong>. För det mesta annat är de
              utbytbara.
            </p>
          </section>

          {/* Price comparison table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Pris per nivå</h2>
            <p className="text-gray-700 leading-relaxed">
              Båda bolagen erbjuder tre tiers: premium, mainstream och budget.
              Här är vad de kostar per miljon tokens i maj 2026:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Nivå</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">OpenAI</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Anthropic</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Vinnare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Premium</td>
                    <td className="px-3 py-2">GPT-4.1 — $2/$8</td>
                    <td className="px-3 py-2">Opus 4.7 — $5/$25</td>
                    <td className="px-3 py-2 text-green-700">OpenAI</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Mainstream</td>
                    <td className="px-3 py-2">GPT-4o — $2,50/$10</td>
                    <td className="px-3 py-2">Sonnet 4.6 — $3/$15</td>
                    <td className="px-3 py-2 text-green-700">OpenAI (knappt)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Budget</td>
                    <td className="px-3 py-2">GPT-4o mini — $0,15/$0,60</td>
                    <td className="px-3 py-2">Haiku 4.5 — $1/$5</td>
                    <td className="px-3 py-2 text-green-700">OpenAI</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Priser i USD per miljon tokens (input/output). Källor: officiella
              prislistor från{" "}
              <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">OpenAI</a>{" "}
              och{" "}
              <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Anthropic</a>.
              Verifierade maj 2026.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Per token är OpenAI billigast i alla tre nivåer just nu. Men
              priset per token är inte hela bilden — Anthropics prompt caching
              kan ändra ekvationen radikalt för chatbots med fast system-prompt.
            </p>
          </section>

          {/* Real-world cost */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vad kostar de i verkligheten?</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi tar ett konkret scenario: en kundtjänst-chatbot som svarar på
              500 frågor per dag på svenska. Varje fråga består av ca 100 ord
              input (≈130 tokens) och 200 ord svar (≈260 tokens). Totalt per
              månad (22 arbetsdagar):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>500 × 22 = <strong>11 000 förfrågningar/mån</strong></li>
              <li>Input: ≈1,43 miljoner tokens</li>
              <li>Output: ≈2,86 miljoner tokens</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Månadskostnad per modell (1 USD = 10,50 SEK, utan caching):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">USD/mån</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">SEK/mån</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2">GPT-4o</td>
                    <td className="px-3 py-2 text-right">$32,18</td>
                    <td className="px-3 py-2 text-right font-medium">~338 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2 text-right">$47,19</td>
                    <td className="px-3 py-2 text-right font-medium">~496 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2">GPT-4o mini</td>
                    <td className="px-3 py-2 text-right">$1,93</td>
                    <td className="px-3 py-2 text-right font-medium">~20 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Claude Haiku 4.5</td>
                    <td className="px-3 py-2 text-right">$15,73</td>
                    <td className="px-3 py-2 text-right font-medium">~165 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Skillnaden mellan <strong>GPT-4o mini och Claude Haiku</strong> är
              dramatisk — 8 gånger billigare. Men Haiku ger ofta bättre svenska
              svar, så för svenskspråkig kundtjänst kan det vara värt
              prisskillnaden. Vill du räkna på dina egna siffror?{" "}
              <Link to="/" className="text-indigo-600 hover:underline">
                Använd kalkylatorn på startsidan
              </Link>{" "}
              — fyll i din volym och se månadskostnaden i SEK för varje modell.
            </p>
          </section>

          {/* Capabilities */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Pris vs. förmåga — när är dyrare värt det?</h2>
            <p className="text-gray-700 leading-relaxed">
              Pris är trivialt att jämföra. Förmåga är inte. Här är vad vi ser i
              praktiken:
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Claude vinner på</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Svenska språket.</strong> Anthropic har lagt mer
                träningstid på flerspråkighet. Claude Sonnet skriver naturligare
                svenska, gör färre direkta översättningar från engelska och
                håller stilen längre genom svaret.
              </li>
              <li>
                <strong>Långa dokumentanalyser.</strong> Båda har 200K
                kontextfönster i mainstream-tier, men Claude håller koherens
                bättre när du lägger in en 100-sidig PDF.
              </li>
              <li>
                <strong>Prompt caching.</strong> Anthropic tillåter cached input
                till 10 % av normalt pris — om din system-prompt är 2000 ord
                och du kör 10 000 frågor per dag kan caching sänka den delen av
                kostnaden med 90 %. Det här är Claudes hemliga vapen för
                chatbot-byggare.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mt-6">ChatGPT vinner på</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Multimodalt.</strong> GPT-4o är genuint multimodal —
                bild, text och ljud i samma modell. Claude har bildstöd men inte
                ljudkonversationer.
              </li>
              <li>
                <strong>Kodningsbenchmarks.</strong> På SWE-bench Verified
                (verkliga GitHub-buggar) toppar GPT-4.1 och Claude Sonnet
                växelvis. För Python och TypeScript är de jämbördiga; för
                obskurare språk leder GPT.
              </li>
              <li>
                <strong>Ekosystem.</strong> Custom GPTs, plugins, web search,
                DALL·E-bildgenerering — allt är inbyggt i ChatGPT-konton.
                Claude.ai har inte motsvarande än.
              </li>
              <li>
                <strong>1 miljon tokens kontextfönster i GPT-4.1.</strong>{" "}
                Behöver du analysera en hel kodbase eller bok på en gång — det
                är OpenAI som vunnit den ronden.
              </li>
            </ul>
          </section>

          {/* Decision guide */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vilken ska du välja?</h2>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Välj Claude om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Skriver mycket på svenska (artiklar, rapporter, kundkommunikation)</li>
                <li>Bygger chatbots med lång system-prompt (prompt caching halverar din nota)</li>
                <li>Värdesätter konsekvent ton i långa svar</li>
                <li>Vill ha förutsägbar prisbild — Anthropic höjer sällan utan förvarning</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-green-900">Välj ChatGPT om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Behöver multimodalt stöd (bild-in/bild-ut, ljud)</li>
                <li>Bygger kodverktyg eller kodningsassistent</li>
                <li>Vill ha det billigaste alternativet på budget-nivå (GPT-4o mini slår Haiku 4× per token)</li>
                <li>Vill utnyttja OpenAI:s plug-in-ekosystem och Custom GPTs</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-gray-900">Använd båda om du…</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed text-sm">
                <li>Inte vill låsa in dig hos en leverantör</li>
                <li>Bygger för B2B-kunder som har preferens</li>
                <li>Vill A/B-testa kvalitet på dina specifika prompter</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Vår erfarenhet: de flesta produktionsapplikationer börjar med en
              av modellerna och byter efter 2–3 månader när
              användningsmönstret är klart. Det är OK — API:erna är tillräckligt
              lika att byta tar ett par timmars arbete.
            </p>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Generella tabeller visar storleksordning. Verklig kostnad beror på
              din volym, längd på input och output, och hur mycket du kan
              utnyttja prompt caching.{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i dina egna siffror och få månadskostnaden i SEK
              för varje modell.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              För djupdykning per modell:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">
                  Räkna specifikt på ChatGPT API-kostnader
                </Link>{" "}
                (GPT-4o och 4o mini)
              </li>
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Räkna specifikt på Claude Sonnet och Haiku
                </Link>
              </li>
              <li>
                <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">
                  Jämför mot de billigaste AI-modellerna
                </Link>{" "}
                totalt sett
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              OpenAI är billigare per token i alla tre nivåer just nu. Anthropic
              är ofta bättre på svenska och har det viktigaste pris-knepet
              (prompt caching). För en typisk svensk SaaS-användning är
              skillnaden i månadskostnad mellan Claude Sonnet och GPT-4o under
              200 kr — välj därför baserat på <em>kvaliteten</em> du får, inte
              på prisetiketten.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För hög volym till låg kostnad slår GPT-4o mini Claude Haiku — där
              är OpenAI överlägset.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras varje månad. Verifiera alltid mot leverantörens
              prislista innan ni signar ett kontrakt. Senast verifierade
              2026-05-15.
            </p>
          </section>
        </article>

        <LandingFAQ items={faqs} heading="Vanliga frågor om ChatGPT vs Claude" />
      </main>
    </>
  );
}
