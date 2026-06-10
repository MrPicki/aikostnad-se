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
import { trackEvent } from "../utils/analytics";

const article = articles["grok-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Grok i svenska kronor?",
    answer:
      "Grok finns i flera nivåer. Gratisversionen på X har strikta begränsningar. SuperGrok kostar 30 USD/månad (cirka 315 kr) och ger full tillgång till Grok 4. X Premium+ kostar 40 USD/månad (cirka 420 kr) och inkluderar både Grok 4 och X-förmåner som annonsfri läsning. För utvecklare kostar Grok 4 API 3 USD per miljon input-tokens (31,50 kr) och 15 USD per miljon output-tokens (157,50 kr).",
  },
  {
    question: "Är Grok gratis att använda?",
    answer:
      "Ja, det finns en gratisversion av Grok på X (Twitter) och i Grok-appen, men med tydliga begränsningar i antal frågor per dag och tillgång till de senaste modellerna. För regelbunden användning behöver du SuperGrok (30 USD/mån) eller X Premium+ (40 USD/mån). Gratisversionen räcker för att testa, men limits gör den opraktisk som dagligt arbetsverktyg.",
  },
  {
    question: "Hur skiljer sig Grok 4 från Grok 4 Fast i pris?",
    answer:
      "Skillnaden är stor: Grok 4 kostar 3 USD/Mtok input och 15 USD/Mtok output (31,50/157,50 kr), medan Grok 4 Fast kostar 0,20 USD/Mtok input och 0,50 USD/Mtok output (2,10/5,25 kr) — alltså ungefär 15–30 gånger billigare. Grok 4 Fast är xAI:s svar på GPT-4o mini och Gemini Flash: en snabb, billig modell för volymtunga uppgifter där du inte behöver flaggskeppets djupa resonemang.",
  },
  {
    question: "Är Grok bra på svenska?",
    answer:
      "Grok hanterar svenska godkänt men ligger efter Claude Sonnet och GPT-4o i språkkvalitet på svenska. Grok är primärt tränad på engelskt material, inklusive innehåll från X. Styrkan är i stället realtidsinformation — Grok har direkt tillgång till aktuella inlägg på X, vilket gör den unik för nyhetsbevakning och trendanalys. För svenska affärstexter rekommenderar vi Claude eller GPT-4o.",
  },
  {
    question: "Hur ser GDPR-läget ut för Grok och xAI?",
    answer:
      "xAI är ett amerikanskt bolag och Grok är tätt integrerat med X-plattformen. För företagsbruk med personuppgifter gäller samma försiktighet som med andra amerikanska leverantörer: kontrollera att du har databehandlingsavtal (DPA) och rättslig grund för tredjelandsöverföring. Värt att veta är också att X historiskt använt användardata för att träna Grok — granska inställningarna om du använder Grok via X med känslig information.",
  },
];

export function GrokPris() {
  return (
    <>
      <SEO
        title="Grok pris 2026 — vad kostar Grok AI och SuperGrok i SEK?"
        description="Vad kostar Grok 2026? SuperGrok, X Premium+ och Grok 4 API-priser i svenska kronor. Jämförelse mot ChatGPT och Claude — och när Grok är värt pengarna."
        canonical="/grok-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Grok pris", url: "https://aikostnad.se/grok-pris" },
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
            Grok pris — vad kostar Elon Musks AI egentligen?
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar Grok per månad?"
            answer={
              <>
                Grok har en begränsad gratisversion. <strong>SuperGrok kostar 30 USD/mån (~315 kr)</strong>{" "}
                för full Grok 4-tillgång, X Premium+ 40 USD/mån (~420 kr) inklusive X-förmåner.
                API-priset för Grok 4 är 31,50 kr/Mtok input och 157,50 kr/Mtok output — samma nivå
                som Claude Sonnet. Budgetmodellen Grok 4 Fast kostar bara 2,10/5,25 kr per Mtok.
              </>
            }
            bullets={[
              "Gratis: begränsad tillgång via X och Grok-appen",
              "SuperGrok: 30 USD/mån (~315 kr) — full Grok 4-tillgång",
              "X Premium+: 40 USD/mån (~420 kr) — Grok 4 + X-förmåner",
              "SuperGrok Heavy: 300 USD/mån (~3 150 kr) — för power users",
              "Grok 4 API: 31,50 kr/Mtok input, 157,50 kr/Mtok output",
              "Grok 4 Fast API: 2,10 kr/Mtok input, 5,25 kr/Mtok output",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Grok från xAI har på kort tid blivit en av de mest omtalade AI-assistenterna — inte minst
            tack vare den täta integrationen med X (Twitter) och tillgången till realtidsinformation.
            Men prissättningen är snårig: gratisversion, SuperGrok, X Premium+, Heavy och API-priser
            blandas ihop. Här reder vi ut exakt vad varje nivå kostar i svenska kronor och när Grok
            är rätt val jämfört med ChatGPT och Claude.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Grok-abonnemang — priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              För privatpersoner och de flesta yrkesanvändare är abonnemangen den naturliga vägen in.
              Priser i USD och SEK (kurs 10,5 SEK/USD):
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Plan</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Pris (USD/mån)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Pris (SEK/mån)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Vad du får</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Grok Free</td>
                    <td className="px-3 py-2">0 USD</td>
                    <td className="px-3 py-2">0 kr</td>
                    <td className="px-3 py-2">Begränsat antal frågor, äldre modeller</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">SuperGrok</td>
                    <td className="px-3 py-2">30 USD</td>
                    <td className="px-3 py-2 font-semibold">~315 kr</td>
                    <td className="px-3 py-2">Full Grok 4-tillgång, högre limits</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">X Premium+</td>
                    <td className="px-3 py-2">40 USD</td>
                    <td className="px-3 py-2">~420 kr</td>
                    <td className="px-3 py-2">Grok 4 + annonsfri X, verifiering</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">SuperGrok Heavy</td>
                    <td className="px-3 py-2">300 USD</td>
                    <td className="px-3 py-2">~3 150 kr</td>
                    <td className="px-3 py-2">Högsta limits, tidig tillgång till nya modeller</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Jämför med <Link to="/vad-kostar-chatgpt" className="text-brand-700 hover:underline font-medium">ChatGPT Plus (20 USD/mån)</Link>{" "}
              och Claude Pro (20 USD/mån): SuperGrok är 50 % dyrare än båda. Det du betalar extra för
              är realtidsdata från X och xAI:s snabba modellutveckling — inte nödvändigtvis bättre
              svarskvalitet på svenska.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Grok API — priser per token</h2>
            <p className="text-gray-700 leading-relaxed">
              För utvecklare erbjuder xAI ett OpenAI-kompatibelt API. Grok 4 är flaggskeppet med
              256K kontextfönster, Grok 4 Fast är budgetmodellen:
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Input (USD)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Output (USD)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Input (SEK)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Output (SEK)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Grok 4</td>
                    <td className="px-3 py-2">$3,00/Mtok</td>
                    <td className="px-3 py-2">$15,00/Mtok</td>
                    <td className="px-3 py-2">31,50 kr</td>
                    <td className="px-3 py-2">157,50 kr</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Grok 4 Fast</td>
                    <td className="px-3 py-2">$0,20/Mtok</td>
                    <td className="px-3 py-2">$0,50/Mtok</td>
                    <td className="px-3 py-2 font-semibold text-green-700">2,10 kr</td>
                    <td className="px-3 py-2 font-semibold text-green-700">5,25 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Grok 4 ligger prismässigt exakt på Claude Sonnet-nivå ($3/$15) — se vår{" "}
              <Link to="/claude-pris" className="text-brand-700 hover:underline font-medium">Claude-prisguide</Link>.
              Grok 4 Fast konkurrerar i stället med GPT-4o mini och Gemini Flash i{" "}
              <Link to="/billigaste-ai" className="text-brand-700 hover:underline font-medium">budgetsegmentet</Link>.
              Priserna ändras snabbt hos xAI — verifiera alltid mot officiella prislistan innan du budgeterar.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Grok vs ChatGPT vs Claude — vad får du för pengarna?</h2>
            <p className="text-gray-700 leading-relaxed">
              Groks unika styrka är <strong>realtidsdata från X</strong>. Ingen annan stor AI-assistent
              har direkt tillgång till vad som diskuteras just nu — för nyhetsbevakning, trendanalys
              och marknadssentiment är det en verklig differentierare. Grok har också färre
              innehållsrestriktioner än konkurrenterna, vilket vissa användare uppskattar och andra
              ser som en risk i professionella sammanhang.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Svagheterna: svenska språkkvaliteten ligger efter{" "}
              <Link to="/chatgpt-vs-claude" className="text-brand-700 hover:underline font-medium">Claude och GPT-4o</Link>,
              ekosystemet av integrationer är mindre, och för företag saknas den mognad i
              enterprise-avtal och GDPR-dokumentation som OpenAI, Anthropic och Google byggt upp.
              Som primärt arbetsverktyg för svenska företag är ChatGPT eller Claude fortfarande
              tryggare val — Grok är ett komplement för realtidsinformation.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Räkneexempel — vad kostar Grok i praktiken?</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Privatperson som testar:</strong> Gratisversionen räcker för enstaka frågor. 0 kr/mån.</li>
              <li><strong>Daglig användare:</strong> SuperGrok ~315 kr/mån — jämför med ChatGPT Plus ~210 kr/mån innan du väljer.</li>
              <li><strong>Chatbot med Grok 4 Fast:</strong> 10 000 svar/mån à 500 input + 300 output tokens ≈ 10,5 + 1,6 kr ≈ <strong>12 kr/mån</strong> — mycket konkurrenskraftigt.</li>
              <li><strong>Analysverktyg med Grok 4:</strong> 1 000 körningar/mån à 5 000 input + 1 000 output tokens ≈ 158 + 158 kr ≈ <strong>316 kr/mån</strong>.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Vill du räkna på din egen volym? Använd{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">kalkylatorn på startsidan</Link>{" "}
              och jämför mot motsvarande modeller från OpenAI, Anthropic och Google.
            </p>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 not-prose">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Jämför innan du väljer</h2>
            <p className="text-gray-700 leading-relaxed">
              Grok är spännande men sällan det självklara förstavalet för svenska användare. Se vår{" "}
              <Link to="/jamfor-ai-modeller" className="text-brand-700 hover:underline font-medium">stora modelljämförelse</Link>{" "}
              och guiden{" "}
              <Link to="/vad-kostar-ai" className="text-brand-700 hover:underline font-medium">Vad kostar AI?</Link>{" "}
              för helhetsbilden innan du binder dig vid ett abonnemang.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["grok-pris"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om Grok-priser" />
        <Sources items={[
          {
            title: "xAI API Pricing",
            url: "https://x.ai/api",
            publisher: "xAI (officiell prislista)",
          },
          {
            title: "xAI Grok",
            url: "https://grok.com",
            publisher: "xAI (officiell produktsida)",
          },
          {
            title: "X Premium plans",
            url: "https://help.x.com/en/using-x/x-premium",
            publisher: "X Corp (officiell abonnemangsida)",
          },
        ]} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-brand-50 to-white border border-brand-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att testa Grok?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Börja med gratisversionen och uppgradera om realtidsdata från X tillför värde för dig.
          </p>
          <a
            href="https://grok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'xai', source: 'grok-pris' })}
          >
            Testa Grok gratis →
          </a>
        </div>
      </main>
    </>
  );
}
