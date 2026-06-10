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

const article = articles["mistral-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar Mistral AI i svenska kronor?",
    answer:
      "Mistral Small kostar 0,10 USD per miljon input-tokens och 0,30 USD per miljon output-tokens — cirka 1,05 kr respektive 3,15 kr med kursen 10,5 SEK/USD. Det gör den till en av marknadens absolut billigaste modeller. Mistral Large kostar 2 USD/Mtok input och 6 USD/Mtok output (21 kr/63 kr). Chattjänsten Le Chat har en gratisversion; betalversionen prissätts på mistral.ai.",
  },
  {
    question: "Varför är Mistral intressant för svenska företag?",
    answer:
      "Mistral är Europas ledande AI-bolag, baserat i Frankrike, med datahantering inom EU. För GDPR-känsliga verksamheter — offentlig sektor, vård, juridik, finans — försvinner hela problematiken med tredjelandsöverföring till USA. Du behöver inget Data Privacy Framework-beroende eller komplexa standardavtalsklausuler. För många svenska upphandlingar är EU-baserad AI ett skallkrav, och då är Mistral i praktiken enda fullskaliga alternativet.",
  },
  {
    question: "Hur bra är Mistral jämfört med ChatGPT och Claude?",
    answer:
      "Mistral Large presterar i nivå strax under GPT-4o och Claude Sonnet på de flesta benchmarks — fullt tillräckligt för de flesta affärstillämpningar. Mistral Small överraskar positivt för priset och är jämförbar med GPT-4o mini. På svenska är Mistral godkänd men inte bäst i klassen; Claude och GPT-4o producerar mer idiomatisk svenska. Mistrals styrkor är pris, EU-hemvist och att API:et är OpenAI-kompatibelt — du kan byta med några raders kodändring.",
  },
  {
    question: "Är Mistral open source?",
    answer:
      "Delvis. Mistral släpper vissa modeller med öppna vikter (exempelvis Mistral Small-familjen och äldre Mixtral-modeller) under Apache 2.0-licens, vilket innebär att du kan ladda ner och köra dem på egen infrastruktur helt utan API-kostnad. Flaggskeppsmodellerna som Mistral Large är dock proprietära och nås endast via API. Self-hosting av en öppen Mistral-modell på EU-server ger maximal GDPR-kontroll.",
  },
  {
    question: "Vad är Le Chat och vad kostar det?",
    answer:
      "Le Chat är Mistrals motsvarighet till ChatGPT — en chattassistent på webben och i mobilappar. Gratisversionen är generös och inkluderar webbsökning och bilduppladdning. Betalversionen (Le Chat Pro) lägger till högre limits och de starkaste modellerna; aktuellt pris finns på mistral.ai. För privatpersoner som vill ha ett EU-baserat ChatGPT-alternativ är gratisversionen av Le Chat den enklaste startpunkten.",
  },
];

export function MistralPris() {
  return (
    <>
      <SEO
        title="Mistral AI pris 2026 — vad kostar Europas AI i SEK?"
        description="Mistral AI priser 2026: Mistral Large och Small per token i SEK, Le Chat gratis och Pro. Det GDPR-vänliga EU-alternativet till ChatGPT — komplett prisguide."
        canonical="/mistral-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Mistral AI pris", url: "https://aikostnad.se/mistral-pris" },
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
            Mistral AI pris — Europas svar på OpenAI, i svenska kronor
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar Mistral AI?"
            answer={
              <>
                Mistral Small är en av marknadens billigaste modeller:{" "}
                <strong>1,05 kr/Mtok input och 3,15 kr/Mtok output</strong>. Flaggskeppet Mistral
                Large kostar 21/63 kr per Mtok — klart billigare än GPT-4o. Chattjänsten Le Chat
                har en generös gratisversion. Största fördelen för svenska företag: Mistral är
                EU-baserat med datahantering inom EU — ingen GDPR-problematik med tredjelandsöverföring.
              </>
            }
            bullets={[
              "Mistral Small: 1,05 kr/Mtok input, 3,15 kr/Mtok output",
              "Mistral Large: 21 kr/Mtok input, 63 kr/Mtok output",
              "Le Chat: generös gratisversion, Pro-version för power users",
              "EU-baserat (Frankrike) — datahantering inom EU, GDPR-vänligt",
              "OpenAI-kompatibelt API — enkel migrering från ChatGPT",
              "Vissa modeller open-weight — kan self-hostas utan API-kostnad",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Mistral AI är Europas ledande AI-bolag och det enda fullskaliga alternativet till de
            amerikanska och kinesiska jättarna. För svenska företag är det intressant av två skäl:
            priserna är aggressiva — Mistral Small är prisledare i budgetsegmentet — och datahanteringen
            sker inom EU, vilket löser GDPR-frågan som komplicerar OpenAI- och Anthropic-användning.
            Här är hela prisbilden i svenska kronor.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Mistral API — priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              Mistral erbjuder modeller i tre nivåer via sin plattform La Plateforme.
              Priser i USD och SEK (kurs 10,5 SEK/USD):
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
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Mistral Small</td>
                    <td className="px-3 py-2">$0,10/Mtok</td>
                    <td className="px-3 py-2">$0,30/Mtok</td>
                    <td className="px-3 py-2 font-bold text-green-700">1,05 kr</td>
                    <td className="px-3 py-2 font-bold text-green-700">3,15 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Mistral Large</td>
                    <td className="px-3 py-2">$2,00/Mtok</td>
                    <td className="px-3 py-2">$6,00/Mtok</td>
                    <td className="px-3 py-2">21,00 kr</td>
                    <td className="px-3 py-2">63,00 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Codestral (kod)</td>
                    <td className="px-3 py-2">$0,30/Mtok</td>
                    <td className="px-3 py-2">$0,90/Mtok</td>
                    <td className="px-3 py-2">3,15 kr</td>
                    <td className="px-3 py-2">9,45 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Jämför med GPT-4o (26,25/105 kr) och Claude Sonnet (31,50/157,50 kr): Mistral Large
              är 20–60 % billigare än de amerikanska flaggskeppen. Mistral uppdaterar sin
              modellfamilj ofta — kontrollera{" "}
              <a href="https://mistral.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline font-medium">officiella prislistan</a>{" "}
              för senaste modellversionerna.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR-fördelen — därför väljer svenska företag Mistral</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 not-prose">
              <h3 className="text-base font-bold text-green-900">EU-baserad AI utan tredjelandsöverföring</h3>
              <p className="text-sm text-gray-700 mt-2">
                Mistral är ett franskt bolag med datahantering inom EU. När du använder Mistrals API
                lämnar dina data aldrig EU — du slipper hela GDPR-problematiken kring överföring
                till USA (Schrems-domarna, Data Privacy Framework-beroendet) som gäller för OpenAI,
                Anthropic och Google.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Det här är inte en teoretisk fördel. För offentlig sektor, vårdgivare, advokatbyråer
              och finansbolag är EU-datahantering ofta ett absolut krav i upphandlingar och
              riskbedömningar. Amerikanska leverantörer löser det med EU-datacenter och
              standardavtalsklausuler — men den juridiska grunden vilar på politiska beslut som
              kan ändras. Med Mistral försvinner frågan helt.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Kombinationen med priset gör kalkylen intressant: du får EU-compliance{" "}
              <em>och</em> lägre tokenpriser än hos OpenAI. Kompromissen är något lägre toppkvalitet
              och svagare svenska än{" "}
              <Link to="/claude-pris" className="text-brand-700 hover:underline font-medium">Claude</Link> —
              testa med dina egna prompts innan du bestämmer dig.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Le Chat — gratis ChatGPT-alternativ från EU</h2>
            <p className="text-gray-700 leading-relaxed">
              Le Chat är Mistrals konsumenttjänst — motsvarigheten till ChatGPT och Claude.ai.
              Gratisversionen är generös: webbsökning, dokumentuppladdning och bildgenerering ingår.
              Pro-versionen ger högre limits och prioriterad tillgång till de starkaste modellerna.
            </p>
            <p className="text-gray-700 leading-relaxed">
              För privatpersoner som vill minska sitt beroende av amerikanska tjänster är Le Chat
              det mest kompletta EU-alternativet. Se även vår guide till{" "}
              <Link to="/gratis-ai" className="text-brand-700 hover:underline font-medium">gratis AI-verktyg</Link>{" "}
              för hela gratisutbudet.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Räkneexempel — Mistral i praktiken</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Kundtjänst-chatbot (Mistral Small):</strong> 20 000 svar/mån à 800 input + 300 output tokens ≈ 17 + 19 kr ≈ <strong>36 kr/mån</strong>.</li>
              <li><strong>Dokumentanalys för advokatbyrå (Mistral Large):</strong> 500 dokument/mån à 10 000 input + 1 500 output tokens ≈ 105 + 47 kr ≈ <strong>152 kr/mån</strong> — med full EU-datahantering.</li>
              <li><strong>Kodassistent (Codestral):</strong> 50 000 kompletteringar/mån à 2 000 input + 200 output tokens ≈ 315 + 95 kr ≈ <strong>410 kr/mån</strong>.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Räkna på din egen volym i{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">kalkylatorn på startsidan</Link>{" "}
              — Mistral Small och Large finns med i modellistan, omräknade med live-valutakurs.
            </p>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 not-prose">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">När är Mistral rätt val?</h2>
            <p className="text-gray-700 leading-relaxed">
              Välj Mistral när EU-datahantering är ett krav, när budgeten är tight, eller när du vill
              ha en leverantör utanför de amerikanska jättarna. Välj{" "}
              <Link to="/chatgpt-vs-claude" className="text-brand-700 hover:underline font-medium">ChatGPT eller Claude</Link>{" "}
              när högsta svenska språkkvalitet eller det bredaste ekosystemet väger tyngst. Se{" "}
              <Link to="/jamfor-ai-modeller" className="text-brand-700 hover:underline font-medium">hela modelljämförelsen</Link>{" "}
              för detaljerna.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["mistral-pris"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om Mistral-priser" />
        <Sources items={[
          {
            title: "Mistral AI Pricing",
            url: "https://mistral.ai/pricing",
            publisher: "Mistral AI (officiell prislista)",
          },
          {
            title: "Mistral La Plateforme",
            url: "https://console.mistral.ai",
            publisher: "Mistral AI (utvecklarplattform)",
          },
          {
            title: "Le Chat",
            url: "https://chat.mistral.ai",
            publisher: "Mistral AI (officiell chattjänst)",
          },
        ]} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-brand-50 to-white border border-brand-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att testa Mistral?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Börja gratis med Le Chat, eller skapa ett La Plateforme-konto för API-utveckling med EU-datahantering.
          </p>
          <a
            href="https://console.mistral.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'mistral', source: 'mistral-pris' })}
          >
            Skapa Mistral-konto gratis →
          </a>
        </div>
      </main>
    </>
  );
}
