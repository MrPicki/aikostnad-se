import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vilken AI är helt gratis att använda?",
    answer:
      "ChatGPT (utan Plus), Claude.ai och Gemini erbjuder alla gratis nivåer med tillgång till sina modeller. DeepSeek erbjuder gratis webbapp och generöst API-gratis-tier. Gemini har det generösaste API-gratiserbjudandet: 1 500 fria förfrågningar per dag med Gemini 2.5 Flash. Begränsningarna brukar vara hastighetsgränser och lägre prioritet, inte kvaliteten på modellen.",
  },
  {
    question: "Kan jag använda gratis AI för mitt företag?",
    answer:
      "Det beror på hur ni behandlar data. Gratisversioner av ChatGPT, Claude.ai och Gemini ger vanligtvis INTE GDPR-kompatibla databehandlingsavtal — ni accepterar konsumentvillkor. För affärsanvändning med personuppgifter behöver ni betalversioner med DPA. För intern testning och text som inte innehåller personuppgifter kan gratisnivåerna fungera.",
  },
  {
    question: "Vad är skillnaden mellan gratis och betald AI?",
    answer:
      "Gratisversioner ger tillgång till modellen men med hastighetsgränser (antal frågor per dag/timme), köer vid hög belastning och ibland en äldre modellversion. Betalversioner ger obegränsad (eller högt prioriterad) åtkomst, tillgång till senaste modellen, extra funktioner (bildgenerering, webbsökning, filuppladdning) och juridiska garantier kring dataskydd.",
  },
  {
    question: "Är DeepSeek ett säkert alternativ för svenska företag?",
    answer:
      "DeepSeek är kinesiskt och kräver separata sekretessbedömningar. Modellerna är open-source och kan köras self-hosted (ingen data skickas till Kina), men DeepSeek API skickar data till kinesiska servrar. För intern testning och icke-känslig data kan DeepSeek webbappen användas fritt. För produktionsapplikationer eller känslig data rekommenderar vi europeiska eller amerikanska alternativ med GDPR-DPA.",
  },
  {
    question: "Vilket gratis AI-alternativ är bäst för textskrivning på svenska?",
    answer:
      "Claude.ai gratisversion är ofta det bästa alternativet för svenska texter — det ger tillgång till Claude Sonnet och är känt för naturlig svenska. ChatGPT (gratis) med GPT-4o mini är också ett starkt alternativ. Gemini fungerar bra men är lite svagare på svenska. Alla tre är gratis och tillräckligt kapabla för sporadisk textproduktion.",
  },
];

export function GratisAi() {
  return (
    <>
      <SEO
        title="Gratis AI 2026 — bästa gratis AI-verktyg för svenska användare"
        description="Vilka AI-verktyg är gratis 2026? Jämförelse av ChatGPT, Claude, Gemini och fler gratis AI-tjänster. Se begränsningar, gratis API-tier och alternativ utan kostnad."
        canonical="/gratis-ai"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Gratis AI", url: "https://aikostnad.se/gratis-ai" },
      ]} />
      <ArticleSchema article={articles["gratis-ai"]} />
      <SpeakableSchema />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Gratis AI 2026 — komplett jämförelse
          </h1>

          <LastUpdated date={articles["gratis-ai"].modifiedDate} />

          <TLDR
            question="Vilka AI-verktyg är helt gratis 2026?"
            answer={
              <>
                <strong>ChatGPT (Free), Claude.ai (Free), Gemini och DeepSeek</strong> är alla gratis att använda i webbgränssnitt. För utvecklare har <strong>Gemini det generösaste gratis-API:t</strong>: 1 500 förfrågningar/dag mot Gemini 2.5 Flash. Begränsningarna är hastighet och dagliga limits — inte modellkvaliteten. Företagsbruk kräver oftast betalversioner för GDPR-DPA.
              </>
            }
            bullets={[
              "ChatGPT Free: GPT-4o mini, daglig limit",
              "Claude Free: Claude Sonnet, ~30 meddelanden / 5h",
              "Gemini: gratis via gemini.google.com",
              "Google AI Studio: 1 500 free req/dag (Flash)",
              "DeepSeek: gratis webbapp + generöst API-tier",
              "GitHub Copilot: gratis för studenter och OSS",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed">
            De bästa AI-verktygen i världen är tillgängliga gratis — med begränsningar.
            Den här guiden går igenom vad de faktiskt ger dig gratis, var gränserna
            går och när det är värt att betala. Alla alternativ testade på svenska.
          </p>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Gratis AI-verktyg — jämförelsetabell 2026</h2>

          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Verktyg</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Gratis modell</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Begränsning</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Bra för</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-3 py-2 font-medium">ChatGPT</td>
                  <td className="px-3 py-2">GPT-4o (begränsat)</td>
                  <td className="px-3 py-2">~10–15 GPT-4o-frågor/dag, köer</td>
                  <td className="px-3 py-2">Allmän chat, textskrivning</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Claude.ai</td>
                  <td className="px-3 py-2">Claude Sonnet (begränsat)</td>
                  <td className="px-3 py-2">~20–30 meddelanden/dag, ingen Projects</td>
                  <td className="px-3 py-2">Svenska texter, analys</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Gemini</td>
                  <td className="px-3 py-2">Gemini 2.5 Flash</td>
                  <td className="px-3 py-2">Hastighetsgränser, begränsat Workspace</td>
                  <td className="px-3 py-2">Google-integration, multimodalt</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">DeepSeek</td>
                  <td className="px-3 py-2">DeepSeek V3.2</td>
                  <td className="px-3 py-2">Kan ha köer vid hög belastning</td>
                  <td className="px-3 py-2">Kodning, analys, engelska</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Mistral (Le Chat)</td>
                  <td className="px-3 py-2">Mistral Small</td>
                  <td className="px-3 py-2">Hastighetsgränser</td>
                  <td className="px-3 py-2">Europeiskt alternativ, GDPR</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Microsoft Copilot</td>
                  <td className="px-3 py-2">GPT-4o (gratis tier)</td>
                  <td className="px-3 py-2">Begränsad Bing-integration</td>
                  <td className="px-3 py-2">Webbsökning + AI, Windows-integration</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-2 font-medium">Gemini AI Studio (API)</td>
                  <td className="px-3 py-2">Gemini 2.5 Flash</td>
                  <td className="px-3 py-2">1 500 req/dag, 15 req/min</td>
                  <td className="px-3 py-2">Prototyp och dev-testning</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">ChatGPT gratis — vad ingår?</h2>
          <p>
            ChatGPT:s gratisnivå ger tillgång till GPT-4o men med tydliga begränsningar.
            Du kan ställa ungefär 10–15 frågor med GPT-4o per dag — därefter växlar
            tjänsten ner till GPT-4o mini. För mer intensiv användning eller tillgång
            till bildgenerering (DALL·E), webbsökning och filuppladdning behövs
            ChatGPT Plus (209 kr/mån).
          </p>
          <p>
            <strong>Bäst för:</strong> sporadisk användning, enkla textuppgifter,
            att prova AI för första gången. Räcker inte för daglig intensiv
            arbetsanvändning.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Claude.ai gratis — vad ingår?</h2>
          <p>
            Anthropics gratisnivå ger tillgång till Claude Sonnet med ett dagligt tak
            på ca 20–30 meddelanden. Utan abonnemang saknas funktioner som Projects
            (delade kontexter) och högre prioritet. Claude anses ha bäst svenska av
            de stora modellerna — gratisversionen är ett utmärkt sätt att testa det.
          </p>
          <p>
            <strong>Bäst för:</strong> svenska textuppgifter, analys av dokument
            du klistrar in, personlig produktivitet med sparsam användning.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Gemini gratis — vad ingår?</h2>
          <p>
            Google Gemini (på gemini.google.com) ger gratis tillgång till Gemini 2.5 Flash
            med hastighetsbegränsningar. Gemini integreras med Google-kontot och har
            grundläggande integration med Google Docs och Gmail — mer fullständig
            integration kräver Google One AI Premium (199 kr/mån).
          </p>
          <p>
            Googles <strong>AI Studio (API)</strong> erbjuder det generösaste gratis-tieret
            bland de stora aktörerna: 1 500 Gemini 2.5 Flash-förfrågningar per dag och
            25 Gemini 2.5 Pro per dag — helt gratis, ingen kreditkortsinformation krävs.
            Perfekt för prototypande och less-traffic production.
          </p>
          <p>
            <strong>Bäst för:</strong> Google Workspace-användare, prototyper via API,
            multimodala uppgifter.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">DeepSeek — gratis och kraftfullt</h2>
          <p>
            DeepSeek V3.2 är en kinesisk open-source-modell som är gratis att använda via
            DeepSeek:s webbapp (chat.deepseek.com). Modellen är konkurrenskraftig med
            GPT-4o på kodning och analys, med noll kostnad för webbapp-användning.
          </p>
          <p>
            <strong>Viktigt:</strong> DeepSeek är kinesiskt. Inga känsliga uppgifter,
            affärsdata eller personuppgifter bör läggas in. För open-source-entusiasterna
            finns modellen att köra self-hosted via Hugging Face eller Ollama — då är
            ingen data extern. Se vår{" "}
            <Link to="/billigaste-ai" className="text-brand-700 hover:underline">
              jämförelse av billigaste AI-modellerna
            </Link>{" "}
            för full kostnadsanalys.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Mistral (Le Chat) — det europeiska gratis-alternativet</h2>
          <p>
            Mistral AI är ett franskt bolag med stark GDPR-fokus. Le Chat-webbappen ger
            gratis tillgång till Mistral-modeller. För svenska texter presterar Mistral
            något sämre än Claude och GPT-4o, men det är ett trovärdigt europeiskt
            alternativ om dataskydd är prioriterat.
          </p>
          <p>
            Mistral Small via API är dessutom det billigaste alternativet av alla
            ($0,10/$0,30 per miljon tokens) — se{" "}
            <Link to="/billigaste-ai" className="text-brand-700 hover:underline">
              billigaste AI-modellerna
            </Link>{" "}
            för jämförelse.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Gratis AI-verktyg för specifika uppgifter</h2>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Gratis AI för textskrivning</h3>
          <p>
            Bästa gratisvalet för svenska texter: <strong>Claude.ai</strong> (naturlig
            svenska, konsekvent ton) eller <strong>ChatGPT</strong> (bredare funktioner,
            webbsökning). Båda är gratis med dagliga begränsningar. Skriver du mer
            sällan än 10 texter per dag räcker gratisnivåerna utmärkt.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Gratis AI för kodning</h3>
          <p>
            <strong>GitHub Copilot</strong> har en gratis tier (2 000 kodkompletteringar/mån).
            <strong>DeepSeek</strong> är gratis och stark på kodning.
            <strong>Claude.ai</strong> och <strong>ChatGPT</strong> hanterar kodfrågor
            i sin gratisnivå. Bygger du mer seriöst finns GitHub Copilot Pro (ca 105 kr/mån)
            som direkt integrerat i VS Code.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">Gratis AI för bildgenerering</h3>
          <p>
            <strong>Microsoft Designer</strong> (powered by DALL·E) ger gratis bildgenerering
            med 15 generationer per dag. <strong>Canva AI</strong> och <strong>Adobe Firefly</strong>
            erbjuder gratis tier. Vill du ha mer volym krävs en betald nivå — ChatGPT Plus
            inkluderar DALL·E.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">När är det värt att betala?</h2>
          <p>
            Gratisnivåerna räcker för sporadisk personlig användning. Betalt är värt det när:
          </p>
          <ul>
            <li>Du stöter i begränsningstaket dagligen och väntar i kö</li>
            <li>Du behöver filuppladdning, bildgenerering eller webbsökning</li>
            <li>Du använder AI för arbete och behöver GDPR-kompatibelt DPA</li>
            <li>Du vill bygga applikationer (då är API nödvändigt)</li>
          </ul>
          <p>
            ChatGPT Plus och Claude Pro kostar 209 kr/mån — ca 7 kr per arbetsdag.
            Om AI sparar dig 30 minuter per dag är ROI:n uppenbar. Se{" "}
            <Link to="/vad-kostar-ai" className="text-brand-700 hover:underline">
              vår kompletta AI-prisguide
            </Link>{" "}
            för full jämförelse av abonnemang och API.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Sammanfattning: Bästa gratis AI 2026</h2>
          <div className="space-y-2 not-prose">
            <div className="flex gap-3 items-center border border-gray-200 rounded-lg p-3">
              <span className="text-lg shrink-0">🥇</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Bäst för svenska: Claude.ai</p>
                <p className="text-xs text-gray-500">Naturlig svenska, ca 20–30 frågor/dag gratis</p>
              </div>
            </div>
            <div className="flex gap-3 items-center border border-gray-200 rounded-lg p-3">
              <span className="text-lg shrink-0">🥈</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Bäst för allroundanvändning: ChatGPT</p>
                <p className="text-xs text-gray-500">GPT-4o begränsat gratis, webbsökning utan Plus</p>
              </div>
            </div>
            <div className="flex gap-3 items-center border border-gray-200 rounded-lg p-3">
              <span className="text-lg shrink-0">🥉</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Bäst gratis API: Google AI Studio (Gemini Flash)</p>
                <p className="text-xs text-gray-500">1 500 req/dag gratis — generösast för developers</p>
              </div>
            </div>
            <div className="flex gap-3 items-center border border-gray-200 rounded-lg p-3">
              <span className="text-lg shrink-0">🌍</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Bäst GDPR-säkert gratis: Mistral (Le Chat)</p>
                <p className="text-xs text-gray-500">Europeiskt, GDPR-fokus, gratis webbapp</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedArticles links={relatedArticles["gratis-ai"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om gratis AI" />

        <Sources items={officialPricingSources} />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/billigaste-ai" className="card hover:border-brand-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-brand-700 mb-1 text-sm">
              Billigaste betalda AI 2026
            </p>
            <p className="text-xs text-gray-500">
              Billigare än gratis med rätt modellval? Jämför GPT-4o mini, Mistral Small med mera.
            </p>
          </Link>
          <Link to="/vad-kostar-ai" className="card hover:border-brand-200 hover:shadow-sm transition-all group">
            <p className="font-semibold text-gray-900 group-hover:text-brand-700 mb-1 text-sm">
              Komplett AI-prisguide 2026
            </p>
            <p className="text-xs text-gray-500">
              Alla AI-abonnemang och API-priser jämförda i svenska kronor.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
