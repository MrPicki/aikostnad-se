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

const article = articles["ai-video-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar det att göra en AI-video?",
    answer:
      "Det beror på verktyg och längd. Via abonnemang: ChatGPT Plus (cirka 210 kr/mån) inkluderar ett antal Sora-videor per månad, Runway Standard kostar cirka 158 kr/mån. Via API betalar du per sekund genererad video: Sora 2 kostar cirka 1 kr/sekund i 720p, Google Veo 3.1 cirka 7,90 kr/sekund i högsta kvalitet eller 1,60 kr/sekund i Fast-läget. En 10-sekunders klipp kostar alltså cirka 10–80 kr beroende på kvalitetsnivå.",
  },
  {
    question: "Vad kostar Sora i Sverige?",
    answer:
      "Sora ingår i ChatGPT-abonnemangen: Plus (20 USD/mån, ~210 kr) ger ett begränsat antal videogenereringar per månad, medan Pro (200 USD/mån, ~2 100 kr) ger betydligt fler och högre kvalitet. För utvecklare har Sora 2 via API kostat cirka 0,10 USD per sekund video i 720p (~1 kr/sek) — en typisk 10-sekunders video kostar då cirka 10,50 kr. OpenAI ändrar Sora-erbjudandet ofta, så kontrollera alltid openai.com för aktuella villkor.",
  },
  {
    question: "Vad kostar Google Veo 3?",
    answer:
      "Google Veo 3.1 via API (Vertex AI/Gemini API) kostar cirka 0,75 USD per sekund (~7,90 kr/sek) i standardkvalitet med ljud, eller cirka 0,15 USD per sekund (~1,60 kr/sek) i Fast-läget. För konsumenter ingår Veo i Google AI-abonnemangen — toppnivån Google AI Ultra (249,99 USD/mån, ~2 625 kr) ger flest generationer i högsta kvalitet. En minut färdig video i standardkvalitet kostar via API cirka 470 kr.",
  },
  {
    question: "Vilket AI-videoverktyg är billigast?",
    answer:
      "För enstaka korta klipp är abonnemangsvägen billigast: ChatGPT Plus (~210 kr/mån) med Sora eller Runway Standard (~158 kr/mån). För volymproduktion via API är Veo Fast och Sora 2 i 720p billigast på cirka 1–1,60 kr per sekund. Tänk på att du i praktiken genererar 5–10 gånger mer råmaterial än du använder — räkna med att en färdig 30-sekunders video kan kräva 150–300 sekunder genererat material.",
  },
  {
    question: "Kan jag generera AI-video gratis?",
    answer:
      "Ja, med begränsningar. Flera verktyg har gratisnivåer: Runway ger engångskrediter vid registrering, Kling och Pika har dagliga gratiskrediter, och Googles Gemini-app låter ibland gratisanvändare testa Veo med vattenstämpel och låga limits. Gratisnivåerna räcker för att utvärdera kvaliteten men inte för verklig produktion — vattenstämplar och köer gör dem opraktiska för kommersiellt bruk.",
  },
];

export function AiVideoPris() {
  return (
    <>
      <SEO
        title="AI-video pris 2026 — vad kostar Sora, Veo och Runway i SEK?"
        description="Vad kostar AI-genererad video 2026? Sora 2, Google Veo 3.1, Runway och Kling jämförda i svenska kronor — per sekund, per abonnemang och per färdig video."
        canonical="/ai-video-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI-video pris", url: "https://aikostnad.se/ai-video-pris" },
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
            AI-video pris — vad kostar Sora, Veo och Runway egentligen?
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad kostar AI-genererad video?"
            answer={
              <>
                Räkna med <strong>cirka 1–8 kr per sekund</strong> genererad video via API, eller{" "}
                <strong>160–2 600 kr/mån</strong> för abonnemang. Sora 2 (720p) kostar ~1 kr/sek,
                Google Veo 3.1 ~7,90 kr/sek i toppkvalitet och ~1,60 kr/sek i Fast-läge. Runway
                börjar på ~158 kr/mån. Glöm inte att du genererar 5–10× mer råmaterial än du använder.
              </>
            }
            bullets={[
              "Sora 2 API: ~1 kr/sekund (720p) — 10-sek video ≈ 10,50 kr",
              "Sora via ChatGPT Plus: ingår i ~210 kr/mån (begränsat antal)",
              "Veo 3.1 API: ~7,90 kr/sek standard, ~1,60 kr/sek Fast",
              "Google AI Ultra: ~2 625 kr/mån för flest Veo-generationer",
              "Runway: ~158 kr/mån (Standard), ~368 kr (Pro), ~998 kr (Max)",
              "Tumregel: färdig video kostar 5–10× det råa sekundpriset",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            AI-genererad video har gått från teknikdemonstration till produktionsverktyg på två år.
            OpenAI:s Sora, Googles Veo och Runway används idag för reklamfilm, sociala medier och
            konceptvisualisering. Men prissättningen är förvirrande — krediter, sekunder, abonnemang
            och API-priser blandas. Här är vad det faktiskt kostar i svenska kronor, och hur du
            räknar på en hel produktion.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Prisjämförelse — de stora AI-videoverktygen</h2>
            <p className="text-gray-700 leading-relaxed">
              Priser i USD och SEK (kurs 10,5 SEK/USD). API-priser anges per sekund genererad video:
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Verktyg</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Pris</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">I SEK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">OpenAI Sora 2 (API)</td>
                    <td className="px-3 py-2">720p</td>
                    <td className="px-3 py-2">$0,10/sek</td>
                    <td className="px-3 py-2 font-semibold text-green-700">~1,05 kr/sek</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">OpenAI Sora 2 Pro (API)</td>
                    <td className="px-3 py-2">Högre upplösning</td>
                    <td className="px-3 py-2">$0,15–0,70/sek</td>
                    <td className="px-3 py-2">~1,60–7,35 kr/sek</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Google Veo 3.1 (API)</td>
                    <td className="px-3 py-2">Standard, inkl. ljud</td>
                    <td className="px-3 py-2">$0,75/sek</td>
                    <td className="px-3 py-2">~7,90 kr/sek</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Google Veo 3.1 Fast (API)</td>
                    <td className="px-3 py-2">Snabbläge</td>
                    <td className="px-3 py-2">$0,15/sek</td>
                    <td className="px-3 py-2 font-semibold text-green-700">~1,60 kr/sek</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Runway Standard</td>
                    <td className="px-3 py-2">Kreditbaserat</td>
                    <td className="px-3 py-2">$15/mån</td>
                    <td className="px-3 py-2">~158 kr/mån</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Runway Pro</td>
                    <td className="px-3 py-2">Fler krediter</td>
                    <td className="px-3 py-2">$35/mån</td>
                    <td className="px-3 py-2">~368 kr/mån</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Google AI Ultra</td>
                    <td className="px-3 py-2">Veo i toppkvalitet</td>
                    <td className="px-3 py-2">$249,99/mån</td>
                    <td className="px-3 py-2">~2 625 kr/mån</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              AI-videomarknaden rör sig extremt snabbt — modeller, priser och abonnemangsvillkor
              ändras med några månaders mellanrum. Använd tabellen som riktvärde och verifiera mot
              respektive leverantörs officiella prissida innan du budgeterar ett projekt.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Den dolda kostnaden: du genererar mer än du använder</h2>
            <p className="text-gray-700 leading-relaxed">
              Det viktigaste att förstå när du budgeterar AI-video: <strong>sekundpriset gäller
              genererat material, inte färdig film</strong>. I praktiken kasserar du de flesta
              generationerna — fel rörelse, konstiga händer, fel ljussättning. Erfarna producenter
              räknar med 5–10 generationer per användbart klipp.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Räkneexempel: en 30-sekunders reklamfilm byggd av sex 5-sekundersklipp. Med 7 generationer
              per godkänt klipp genererar du 6 × 7 × 5 = 210 sekunder råmaterial. Med Sora 2 i 720p:
              210 × 1,05 kr ≈ <strong>220 kr</strong>. Med Veo 3.1 i standardkvalitet: 210 × 7,90 kr ≈{" "}
              <strong>1 660 kr</strong>. Fortfarande en bråkdel av en traditionell filmproduktion —
              men 8–75× mer än det naiva "30 sekunder × sekundpris".
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vilket verktyg ska du välja?</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Testa AI-video billigt:</strong> ChatGPT Plus (~210 kr/mån) — du får Sora plus hela ChatGPT-paketet. Bästa instegsvägen.</li>
              <li><strong>Socialt innehåll i volym:</strong> Veo 3.1 Fast eller Sora 2 via API (~1–1,60 kr/sek) — billigast per genererad sekund.</li>
              <li><strong>Högsta kvalitet med ljud:</strong> Veo 3.1 standard — native ljudgenerering och bäst läppsynk, men ~7,90 kr/sek.</li>
              <li><strong>Professionell videoredigering + AI:</strong> Runway — starkast redigeringsverktyg runt genereringen (motion brush, kamerakontroll).</li>
              <li><strong>Företag med Google Workspace:</strong> Google AI-abonnemangen — Veo integrerat i samma fakturering som övriga Google-tjänster.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">AI-video vs AI-bild — helt olika prisklasser</h2>
            <p className="text-gray-700 leading-relaxed">
              En AI-genererad bild kostar öre — en AI-genererad video kostar kronor per sekund.
              Behöver du bara stillbilder för sociala medier eller produktfoton är{" "}
              <Link to="/ai-bild-pris" className="text-brand-700 hover:underline font-medium">AI-bildgenerering</Link>{" "}
              100–1000× billigare. Många användningsfall (annonser, presentationer) löses lika bra
              med bilder plus enkel animation som med full videogenerering.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bygger du en tjänst som kombinerar text, bild och video? Räkna på textdelen med{" "}
              <Link to="/" className="text-brand-700 hover:underline font-medium">vår API-kalkylator</Link>{" "}
              och se{" "}
              <Link to="/openai-api-kostnad" className="text-brand-700 hover:underline font-medium">OpenAI:s samlade API-priser</Link>{" "}
              för helheten.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-video-pris"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-videopriser" />
        <Sources items={[
          {
            title: "OpenAI API Pricing",
            url: "https://openai.com/api/pricing/",
            publisher: "OpenAI (officiell prislista)",
          },
          {
            title: "Google Gemini API Pricing (Veo)",
            url: "https://ai.google.dev/pricing",
            publisher: "Google (officiell prislista)",
          },
          {
            title: "Runway Pricing",
            url: "https://runwayml.com/pricing",
            publisher: "Runway (officiell prissida)",
          },
          {
            title: "Google One AI Plans",
            url: "https://one.google.com/about/google-ai-plans/",
            publisher: "Google (officiell abonnemangsida)",
          },
        ]} />
      </main>
    </>
  );
}
