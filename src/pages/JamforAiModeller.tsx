import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Jämförelse av AI-modeller",
  "numberOfItems": 11,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "GPT-4.1", "url": "https://aikostnad.se/gpt-4-pris" },
    { "@type": "ListItem", "position": 2, "name": "GPT-4o", "url": "https://aikostnad.se/vad-kostar-chatgpt" },
    { "@type": "ListItem", "position": 3, "name": "GPT-4o mini", "url": "https://aikostnad.se/vad-kostar-chatgpt" },
    { "@type": "ListItem", "position": 4, "name": "Claude Opus 4.7", "url": "https://aikostnad.se/claude-pris" },
    { "@type": "ListItem", "position": 5, "name": "Claude Sonnet 4.6", "url": "https://aikostnad.se/claude-pris" },
    { "@type": "ListItem", "position": 6, "name": "Claude Haiku 4.5", "url": "https://aikostnad.se/claude-pris" },
    { "@type": "ListItem", "position": 7, "name": "Gemini 2.5 Pro", "url": "https://aikostnad.se/gemini-pris" },
    { "@type": "ListItem", "position": 8, "name": "Gemini 2.5 Flash", "url": "https://aikostnad.se/gemini-pris" },
    { "@type": "ListItem", "position": 9, "name": "DeepSeek V3", "url": "https://aikostnad.se/deepseek-pris" },
    { "@type": "ListItem", "position": 10, "name": "Mistral Large", "url": "https://aikostnad.se/jamfor-ai-modeller" },
    { "@type": "ListItem", "position": 11, "name": "Mistral Small", "url": "https://aikostnad.se/jamfor-ai-modeller" },
  ],
};

const article = articles["jamfor-ai-modeller"];

const faqs: FAQItem[] = [
  {
    question: "Vilken AI-modell är billigast totalt 2026?",
    answer:
      "DeepSeek V3 är billigast bland duktiga modeller med 2,94 SEK/Mtok input och 4,41 SEK/Mtok output — men medför GDPR-risker som kinesisk AI. Bland västerländska modeller är GPT-4o mini billigast: 1,58 SEK/Mtok input och 6,30 SEK/Mtok output. Mistral Small är näst billigast bland europeiska alternativ (1,05/3,15 SEK/Mtok). Räknat på total TCO (input + output kombinerat) för en typisk chatbot-konversation vinner GPT-4o mini nästan alltid bland GDPR-säkra alternativ.",
  },
  {
    question: "Vilken modell bör jag välja för svenska texter?",
    answer:
      "Claude Sonnet 4.6 anses generellt bäst för svenska. Anthropics modeller har investerat mer i flerspråkig träning, och Sonnet håller en naturlig och konsekvent ton i långa svenska texter, gör färre direktöversättningar från engelska och hanterar svenska idiom bättre. GPT-4o är ett nära andraval. Mistral Large är ett intressant europeiskt alternativ med stark flerspråkighet och rimliga priser.",
  },
  {
    question: "Är DeepSeek GDPR-kompatibelt för svenska företag?",
    answer:
      "Nej — DeepSeek är ett kinesiskt bolag vars data hanteras under kinesisk lagstiftning. Kinesisk lag kräver att bolaget kan lämna ut data till myndigheterna på begäran, utan den transparens och rättsprocess som GDPR kräver. För känsliga personuppgifter, kunddata eller affärskritisk information bör svenska företag undvika DeepSeek. Använd istället europeiska alternativ som Mistral (franska servrar) eller USA-baserade leverantörer med GDPR DPA (Anthropic, OpenAI Enterprise).",
  },
  {
    question: "Hur väljer jag modell systematiskt utan att ha teknisk bakgrund?",
    answer:
      "Följ dessa tre frågor: 1) Vad är uppgiften? (kod, text, analys, klassificering) — se rekommendationerna per use case i den här artikeln. 2) Vilken volym? — hög volym driver mot billigare modeller (Haiku, GPT-4o mini). 3) Vilka krav? — GDPR-krav, svenska textkvalitet, lång kontext. Med de svaren är det svårt att gå fel. Börja alltid med en mellannivåmodell (Sonnet eller GPT-4o), mät kvaliteten, gå sedan ner i pris om det funkar.",
  },
  {
    question: "Vad är kontextfönster och varför spelar det roll?",
    answer:
      "Kontextfönstret är hur mycket text modellen kan 'komma ihåg' och arbeta med i en session — mätt i tokens (ca 0,7 ord per token på svenska). GPT-4.1 och Gemini 2.5 Pro har 1 miljon tokens, vilket räcker för en hel bok eller stor kodbas. Claude Sonnet har 200 000 tokens — ca 150 000 svenska ord, eller en 500-sidig roman. GPT-4o mini har 128 000 tokens. För de flesta kundtjänst-chatbots spelar detta ingen roll. För dokumentanalys av långa kontrakt, stora kodbasers felsökning eller bokmanuskript gör det stor skillnad.",
  },
];

export function JamforAiModeller() {
  return (
    <>
      <SEO
        title="Jämför AI-modeller 2026 — pris och prestanda i SEK"
        description="Stor jämförelsetabell: GPT-4o, Claude Sonnet, Gemini Flash, DeepSeek, Mistral — priser i SEK, styrkor/svagheter och rekommendation per use case. Maj 2026."
        canonical="/jamfor-ai-modeller"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Jämför AI-modeller", url: "https://aikostnad.se/jamfor-ai-modeller" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Jämför AI-modeller — hitta rätt modell för ditt behov
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vilken AI-modell passar mig?"
            answer={
              <>
                <strong>GPT-4o mini</strong> är billigast bland mainstream-modeller (1,58 kr/Mtok input). <strong>Claude Sonnet 4.6</strong> bäst balans för svenska. <strong>DeepSeek V3</strong> billigast totalt (2,94 kr/Mtok) men GDPR-risk. <strong>Gemini 2.5 Pro</strong> bäst för riktigt långa dokument (1M tokens kontext). Välj modell baserat på cost-per-use-case och kvalitetskrav — inte enbart på pris per token.
              </>
            }
            bullets={[
              "Billigast bland GDPR-säkra: GPT-4o mini (1,58 SEK/Mtok input)",
              "Bäst svenska: Claude Sonnet 4.6 (31,50 SEK/Mtok)",
              "Lång kontext: Gemini 2.5 Pro eller GPT-4.1 (1M tokens)",
              "Absolut billigast: DeepSeek V3 (2,94 SEK/Mtok) — GDPR-risk",
              "Europeisk AI: Mistral Large (21 SEK/Mtok), franska servrar",
              "Kodassistent: Claude Sonnet 4.6 eller GPT-4.1 — jämbördiga",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Antalet tillgängliga AI-modeller har exploderat 2026. GPT-5, Claude Opus,
            Gemini 2.5 Pro, DeepSeek V3, Mistral Large — alla lovar att vara bäst på
            sitt. I verkligheten är rätt modell beroende av ditt specifika use case,
            kvalitetskrav, volym och om du behöver GDPR-kompatibilitet. Det här är
            den kompletta jämförelsetabellen med alla priser i SEK och en tydlig
            rekommendation per användningsfall.
          </p>

          {/* Big comparison table */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Komplett modell-jämförelse i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              Alla priser per miljon tokens (Mtok), omräknade till SEK (1 USD = 10,50 SEK).
              Maj 2026.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Leverantör</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Input SEK/Mtok</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Output SEK/Mtok</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Kontext</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Bäst för</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4.1</td>
                    <td className="px-3 py-2">OpenAI</td>
                    <td className="px-3 py-2 text-right">21,00</td>
                    <td className="px-3 py-2 text-right">84,00</td>
                    <td className="px-3 py-2">1M tokens</td>
                    <td className="px-3 py-2">Kod, analys, stor kontext</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2">OpenAI</td>
                    <td className="px-3 py-2 text-right">26,25</td>
                    <td className="px-3 py-2 text-right">105,00</td>
                    <td className="px-3 py-2">128K tokens</td>
                    <td className="px-3 py-2">Multimodalt, generell bredd</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2">OpenAI</td>
                    <td className="px-3 py-2 text-right font-bold">1,58</td>
                    <td className="px-3 py-2 text-right font-bold">6,30</td>
                    <td className="px-3 py-2">128K tokens</td>
                    <td className="px-3 py-2">Volym, kostnadskänslig chatbot</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Opus 4.7</td>
                    <td className="px-3 py-2">Anthropic</td>
                    <td className="px-3 py-2 text-right">52,50</td>
                    <td className="px-3 py-2 text-right">262,50</td>
                    <td className="px-3 py-2">200K tokens</td>
                    <td className="px-3 py-2">Komplexa agenter, avancerad kod</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-3 py-2 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-3 py-2">Anthropic</td>
                    <td className="px-3 py-2 text-right">31,50</td>
                    <td className="px-3 py-2 text-right">157,50</td>
                    <td className="px-3 py-2">200K tokens</td>
                    <td className="px-3 py-2">Bäst svenska, produktion, balans</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Haiku 4.5</td>
                    <td className="px-3 py-2">Anthropic</td>
                    <td className="px-3 py-2 text-right">10,50</td>
                    <td className="px-3 py-2 text-right">52,50</td>
                    <td className="px-3 py-2">200K tokens</td>
                    <td className="px-3 py-2">Snabb Q&A, hög volym</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini 2.5 Pro</td>
                    <td className="px-3 py-2">Google</td>
                    <td className="px-3 py-2 text-right">~13,13</td>
                    <td className="px-3 py-2 text-right">~52,50</td>
                    <td className="px-3 py-2">1M tokens</td>
                    <td className="px-3 py-2">Extremt långa dokument, multimodalt</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Gemini 2.5 Flash</td>
                    <td className="px-3 py-2">Google</td>
                    <td className="px-3 py-2 text-right">3,15</td>
                    <td className="px-3 py-2 text-right">26,25</td>
                    <td className="px-3 py-2">1M tokens</td>
                    <td className="px-3 py-2">Snabb, billig, lång kontext</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-3 py-2 font-medium">DeepSeek V3</td>
                    <td className="px-3 py-2">DeepSeek (CN)</td>
                    <td className="px-3 py-2 text-right font-bold">2,94</td>
                    <td className="px-3 py-2 text-right font-bold">4,41</td>
                    <td className="px-3 py-2">64K tokens</td>
                    <td className="px-3 py-2">Billigast — OBS: GDPR-risk</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Mistral Large</td>
                    <td className="px-3 py-2">Mistral (FR)</td>
                    <td className="px-3 py-2 text-right">21,00</td>
                    <td className="px-3 py-2 text-right">63,00</td>
                    <td className="px-3 py-2">128K tokens</td>
                    <td className="px-3 py-2">Europeisk AI, GDPR-nativt, flerspråkig</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">Mistral Small</td>
                    <td className="px-3 py-2">Mistral (FR)</td>
                    <td className="px-3 py-2 text-right">1,05</td>
                    <td className="px-3 py-2 text-right">3,15</td>
                    <td className="px-3 py-2">32K tokens</td>
                    <td className="px-3 py-2">Billigast europeisk, enkel klassificering</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">
              Priser i SEK per miljon tokens (Mtok). Maj 2026. 1 USD = 10,50 SEK.
              Gemini 2.5 Pro input-pris varierar med volym (lågtrafik/hög­trafik-gräns).
              Verifiera alltid mot respektive leverantörs officiella prislista.
            </p>
          </section>

          {/* Recommendations per use case */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Rekommendation per use case</h2>
            <p className="text-gray-700 leading-relaxed">
              Rätt modell beror mer på vad du ska göra än på listpriset. Här är
              konkreta rekommendationer för de vanligaste svenska AI-användningsfallen:
            </p>

            <h3 className="text-lg font-bold text-gray-900">Kundtjänst-chatbot</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: låg kostnad per svar, snabb responstid, acceptabel svenska.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: kundtjänst-chatbot</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Bäst balans:</strong> Claude Haiku 4.5 — naturlig svenska, 10,50 SEK/Mtok</li>
                <li><strong>Lägst kostnad:</strong> GPT-4o mini — 1,58 SEK/Mtok, men sämre svenska</li>
                <li><strong>Europeisk GDPR:</strong> Mistral Small — 1,05 SEK/Mtok, franska servrar</li>
                <li><strong>Undvik:</strong> Opus, GPT-4.1 — överkurs och för dyrt för enkel Q&A</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Kodassistent / pair programming</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: hög precision, förstår komplex kod, ger välmotiverade förslag.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: kodassistent</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Toppalternativ:</strong> Claude Sonnet 4.6 eller GPT-4.1 — jämbördiga på SWE-bench</li>
                <li><strong>Budget-alternativ:</strong> Claude Haiku 4.5 — bra för enkel kod, review, testning</li>
                <li><strong>Stor kodbas (hel repo):</strong> GPT-4.1 eller Gemini 2.5 Pro — 1M tokens kontext</li>
                <li><strong>Undvik för seriös kod:</strong> GPT-4o mini, Mistral Small — kvalitetsfall vid komplex logik</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Dokumentanalys — långa dokument</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: stort kontextfönster, koherens i analys av hela dokumentet, korrekt extraktion.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: dokumentanalys</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Riktigt långa (bok, hel kodbas):</strong> Gemini 2.5 Pro (1M tokens) eller GPT-4.1</li>
                <li><strong>Medellånga (avtal, rapporter, 100–300 sidor):</strong> Claude Sonnet 4.6 (200K, stark koherens)</li>
                <li><strong>Ekonomisk analys av många korta dokument:</strong> Gemini 2.5 Flash</li>
                <li><strong>Undvik:</strong> GPT-4o mini och Mistral Small — kortare kontext, sämre på extraktion</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Textgenerering och marknadsföring på svenska</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: naturlig svenska, konsekvent ton, kreativt men kontrollerat.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: svensk textgenerering</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Bäst på svenska:</strong> Claude Sonnet 4.6 — naturligast, håller ton längst</li>
                <li><strong>Nära andraval:</strong> GPT-4o — stark, men något mer oversatt-känsla</li>
                <li><strong>Europeisk flerspråkig:</strong> Mistral Large — franskt AI, stark europeisk träning</li>
                <li><strong>Budget för enkla texter:</strong> Claude Haiku 4.5 — acceptabel svenska till lägre pris</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">Hög volym och lågprisapplikationer</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: lägsta kostnad per token, tillräcklig (inte bäst) kvalitet.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: hög volym / lågpris</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Billigast GDPR-säker:</strong> GPT-4o mini (1,58 SEK/Mtok) — stark modell för priset</li>
                <li><strong>Europeisk billigast:</strong> Mistral Small (1,05 SEK/Mtok) — franska servrar</li>
                <li><strong>Billigast absolut:</strong> DeepSeek V3 (2,94 SEK/Mtok) — OBS: GDPR-risk</li>
                <li><strong>Om svenska krävs:</strong> Claude Haiku 4.5 — dyrare men bättre svenska än mini</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-6">GDPR-kritiska applikationer</h3>
            <p className="text-gray-700 leading-relaxed">
              Prioritet: EU-dataresidens eller robust GDPR DPA, transparent datahantering.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Rekommendation: GDPR-kritiskt</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Bäst:</strong> Mistral Large — franska servrar, EU-nativt, inget DPA-förhandling krävs</li>
                <li><strong>Alternativ:</strong> OpenAI Enterprise eller Anthropic Enterprise med GDPR DPA och EU-regioner</li>
                <li><strong>Budget GDPR:</strong> Mistral Small — billigast europeisk med inbyggd EU-kompatibilitet</li>
                <li><strong>Undvik absolut:</strong> DeepSeek (kinesisk lag), alla API:er utan DPA för känsliga uppgifter</li>
              </ul>
            </div>
          </section>

          {/* How to choose systematically */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur du väljer modell systematiskt</h2>
            <p className="text-gray-700 leading-relaxed">
              Att jämföra 13 modeller kan verka överväldigande. Det finns ett enkelt
              ramverk som fungerar för de flesta svenska företag och utvecklare:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Definiera uppgiften exakt.</strong> Är det kundtjänst, kodning,
                dokument-analys eller textgenerering? Välj rekommendationen ur tabellen ovan.
              </li>
              <li>
                <strong>Bedöm GDPR-kravet.</strong> Hanterar du personuppgifter, patientdata
                eller affärshemligheter? Välj Mistral (nativt EU) eller Enterprise-avtal.
                Hanterar du bara opersonlig data? Öppnar fler alternativ.
              </li>
              <li>
                <strong>Estimera volymen.</strong> Under 100 förfrågningar per dag: välj
                baserat på kvalitet. Över 1 000 per dag: kostnadsoptimering blir kritisk.
              </li>
              <li>
                <strong>Börja med mellannivån.</strong> Starta med Claude Sonnet 4.6 eller
                GPT-4o — test om kvaliteten räcker. Gå ner till Haiku/mini om det fungerar.
                Gå upp till Opus/GPT-4.1 bara om nödvändigt.
              </li>
              <li>
                <strong>Mät cost-per-use-case, inte pris-per-token.</strong> En modell som
                kräver 3 anrop för att ge rätt svar är dyrare än en modell som ger rätt
                svar på 1 anrop — även om den senare kostar 5× mer per token.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              Vill du räkna mer konkret? Kolla vår{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">
                guide till billigaste AI-modellerna
              </Link>{" "}
              eller vår{" "}
              <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">
                djupjämförelse av ChatGPT och Claude
              </Link>
              .
            </p>
          </section>

          {/* Special mentions */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Noteringar om specifika modeller</h2>

            <h3 className="text-lg font-bold text-gray-900">DeepSeek V3 och R1 — billigast men med risker</h3>
            <p className="text-gray-700 leading-relaxed">
              DeepSeek V3 (2,94 SEK/Mtok) och R1 är imponerande modeller till extremt låga
              priser. DeepSeek R1 är ett reasoning-orienterat alternativ jämförbart med
              OpenAI o3 men en bråkdel av priset. Problemet är datahanteringen — som
              kinesiskt bolag lyder DeepSeek under kinesisk lag, vilket innebär att
              myndigheter kan begära tillgång till data utan den transparens GDPR kräver.
              För testmiljöer och opersonlig data kan det vara ett rimligt val. För
              produktionsdata med GDPR-krav är det inte rekommenderat.
            </p>

            <h3 className="text-lg font-bold text-gray-900">Mistral Large — det europeiska alternativet</h3>
            <p className="text-gray-700 leading-relaxed">
              Mistral AI är ett franskt bolag med servrar i Frankrike. Mistral Large (21 SEK/Mtok
              input) är ett seriöst alternativ till GPT-4o och Claude Sonnet för europeiska
              företag med strikta datakrav. Mistral Small (1,05 SEK/Mtok) är det billigaste
              seriösa europeiska alternativet för enklare uppgifter. Bägge modellerna
              stödjer robust flerspråkig hantering, inklusive svenska.
            </p>

            <h3 className="text-lg font-bold text-gray-900">Gemini 2.5 Flash — Googles prisfyndet</h3>
            <p className="text-gray-700 leading-relaxed">
              Gemini 2.5 Flash kombinerar 1 miljon tokens kontextfönster med ett pris på
              3,15 SEK/Mtok (input) — ett unikt erbjudande för applikationer som behöver
              bearbeta extremt långa dokument till låg kostnad. För svenska texter är
              kvaliteten godkänd men inte i klass med Claude Sonnet.
            </p>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Tabellen ovan ger en bra bild av relativa kostnader, men din faktiska
              månadskostnad beror på din specifika volym och konversationslängd.{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i exakt antal frågor och genomsnittlig längd — och ser
              månadskostnaden för alla modeller sida vid sida i SEK.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">
                  Djupanalys av de billigaste modellerna
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Alla Claude-modeller i detalj
                </Link>
              </li>
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">
                  Alla GPT-modellers priser och kostnader
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              Det finns ingen universellt bäst AI-modell 2026 — det beror på ditt use case.
              GPT-4o mini är billigast bland mainstream GDPR-säkra alternativ. Claude Sonnet
              4.6 är bäst på svenska och allmän produktion. DeepSeek V3 är billigast totalt
              men GDPR-problematiskt. Gemini 2.5 Pro vinner på kontextfönster. Mistral Large
              är rätt val när EU-dataresidens är ett krav utan kompromiss. Välj baserat på
              uppgift, datakrav och verklig cost-per-use-case — inte på lägsta listpris.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras varje månad. Verifiera alltid mot respektive leverantörs
              prislista innan ni väljer och ingår avtal. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["jamfor-ai-modeller"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om att jämföra AI-modeller" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
