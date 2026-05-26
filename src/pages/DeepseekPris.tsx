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
import { trackEvent } from "../utils/analytics";

const article = articles["deepseek-pris"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar DeepSeek V3 i svenska kronor?",
    answer:
      "DeepSeek V3 kostar 0,28 USD per miljon input-tokens och 0,42 USD per miljon output-tokens via DeepSeeks officiella API. Med en kurs på 10,5 SEK/USD blir det 2,94 kr per Mtok input och 4,41 kr per Mtok output. Det är bland de lägsta priserna på marknaden — jämfört med GPT-4o:s 26,25 kr/Mtok input är det nästan 90 % billigare.",
  },
  {
    question: "Är DeepSeek säkert för svenska företag att använda?",
    answer:
      "Det beror på vilken data du skickar. DeepSeek är ett kinesiskt bolag (Hangzhou DeepSeek Artificial Intelligence Co.) och lagrar data på servrar i Kina. Inga EU GDPR databehandlingsavtal (DPA) finns tillgängliga. För intern testning med icke-känsliga data kan det fungera. För kunddata, personuppgifter eller affärskritisk information rekommenderar vi inte DeepSeek:s egna API — välj då en EU-kompatibel hostinglösning.",
  },
  {
    question: "Hur bra är DeepSeek V3 jämfört med ChatGPT?",
    answer:
      "Imponerande bra för priset. DeepSeek V3 presterar i nivå med GPT-4o och Claude Sonnet på många standardbenchmarks — coding, reasoning, matematik — till en bråkdel av priset. R1-modellen är specifikt optimerad för flerstegrsresonemang och jämförs med o1/o3. Kvalitetsskillnaden märks mest vid komplexa, nyanserade uppgifter och på svenska (DeepSeek är primärt tränad på engelska och kinesiska).",
  },
  {
    question: "Vad är DeepSeek R1 och när ska jag använda den?",
    answer:
      "R1 är DeepSeeks reasoning-modell — specialiserad på matematisk problemlösning, kodning och flerstegsresonemang, liknande OpenAI:s o1/o3. R1 kostar mer än V3: 5,78 kr/Mtok input och 23,00 kr/Mtok output (0,55 USD/2,19 USD). Välj R1 när du behöver djupt resonemang, matematik eller kodningsuppgifter. Välj V3 för allt annat — det är billigare och fortfarande mycket kapabelt.",
  },
  {
    question: "Kan jag köra DeepSeek self-hosted och vara GDPR-compliant?",
    answer:
      "Ja. DeepSeek V3 och R1 är open-weight-modeller, vilket betyder att vikterna är publikt tillgängliga. Du kan ladda ner och köra dem på din egna EU-server (via Hugging Face, Ollama eller liknande). Då är du fullständigt GDPR-compliant — data lämnar aldrig EU. Nackdelen är infrastrukturkostnad: en full V3-modell kräver ett datacenter med kraftfull GPU-kapacitet, men kvantiserade versioner kan köras på mer blygsam hårdvara.",
  },
];

export function DeepseekPris() {
  return (
    <>
      <SEO
        title="DeepSeek pris Sverige 2026 — billigaste AI-modellen?"
        description="DeepSeek V3 och R1 priser i SEK. Jämförelse mot GPT-4o och Claude, kvalitet, GDPR-risker med kinesisk AI och när DeepSeek är rätt val för svenska företag. Maj 2026."
        canonical="/deepseek-pris"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "DeepSeek pris", url: "https://aikostnad.se/deepseek-pris" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            DeepSeek pris — är det verkligen billigare än ChatGPT?
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Hur billigt är DeepSeek och vad är risken?"
            answer={
              <>
                DeepSeek V3 är bland de billigaste AI-modellerna som finns:{" "}
                <strong>2,94 kr/Mtok input</strong> mot GPT-4o:s 26,25 kr — nästan 90 % billigare.
                Kvaliteten imponerar för priset. Men: kinesisk datahantering och inga EU GDPR-garantier
                gör det olämpligt för personuppgifter. Self-hosted open-weight är det säkrare alternativet.
              </>
            }
            bullets={[
              "DeepSeek V3: 2,94 kr/Mtok input, 4,41 kr/Mtok output",
              "DeepSeek R1 (reasoning): 5,78 kr/Mtok input, 23,00 kr/Mtok output",
              "Jämfört med GPT-4o: 90 % billigare på input",
              "Kinesiskt bolag — data lagras i Kina, inga EU GDPR DPA",
              "Open-weight: kan hostar på EU-server för full GDPR-compliance",
              "Bäst för: intern testning, icke-känsliga data, open-source-projekt",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            I januari 2026 skakade DeepSeek om AI-världen när V3 och R1 visade benchmarkresultat i
            paritet med GPT-4o och Claude Sonnet — men till en bråkdel av kostnaden. För svenska företag
            och utvecklare uppstår omedelbart tre frågor: Hur billig är den faktiskt? Hur bra är den? Och
            är det säkert att använda kinesisk AI?
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">DeepSeek V3 och R1 — priser i SEK</h2>
            <p className="text-gray-700 leading-relaxed">
              DeepSeek erbjuder två primära modeller via sitt API: V3 är generalisten, R1 är reasoning-specialisten.
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
                  <tr>
                    <td className="px-3 py-2 font-medium">DeepSeek V3</td>
                    <td className="px-3 py-2">$0,28/Mtok</td>
                    <td className="px-3 py-2">$0,42/Mtok</td>
                    <td className="px-3 py-2 text-green-700 font-semibold">2,94 kr</td>
                    <td className="px-3 py-2 text-green-700 font-semibold">4,41 kr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">DeepSeek R1</td>
                    <td className="px-3 py-2">$0,55/Mtok</td>
                    <td className="px-3 py-2">$2,19/Mtok</td>
                    <td className="px-3 py-2">5,78 kr</td>
                    <td className="px-3 py-2">23,00 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Priserna gäller DeepSeeks egna API och kan skilja sig hos tredjepartshosting (Together.ai,
              Fireworks, Groq). Priser i SEK räknas om i realtid på{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">startsidans kalkylator</Link>.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Prisjämförelse — DeepSeek vs konkurrenterna</h2>
            <p className="text-gray-700 leading-relaxed">
              För att sätta priserna i perspektiv: här är de fyra populäraste budget-modellerna jämförda
              på input-token-pris (SEK per Mtok):
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Modell</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Input (SEK/Mtok)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Output (SEK/Mtok)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">GDPR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-medium">DeepSeek V3</td>
                    <td className="px-3 py-2 font-bold text-green-700">2,94 kr</td>
                    <td className="px-3 py-2 font-bold text-green-700">4,41 kr</td>
                    <td className="px-3 py-2 text-red-600">Nej (kinesisk)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Gemini 2.5 Flash</td>
                    <td className="px-3 py-2">3,15 kr</td>
                    <td className="px-3 py-2">26,25 kr</td>
                    <td className="px-3 py-2 text-green-600">Ja (DPA)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o mini</td>
                    <td className="px-3 py-2">1,58 kr</td>
                    <td className="px-3 py-2">6,30 kr</td>
                    <td className="px-3 py-2 text-green-600">Ja (DPA)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Claude Haiku 4.5</td>
                    <td className="px-3 py-2">10,50 kr</td>
                    <td className="px-3 py-2">52,50 kr</td>
                    <td className="px-3 py-2 text-green-600">Ja (DPA)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">GPT-4o</td>
                    <td className="px-3 py-2 text-red-600">26,25 kr</td>
                    <td className="px-3 py-2 text-red-600">105 kr</td>
                    <td className="px-3 py-2 text-green-600">Ja (DPA)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Notabelt: GPT-4o mini (1,58 kr input) är faktiskt billigare på input än DeepSeek V3,
              men DeepSeek slår på output (4,41 kr vs 6,30 kr). Eftersom output-tokens är fler vid
              längre svar kan DeepSeek vara billigare totalt beroende på use case.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Kvalitetsjämförelse — imponerande för priset</h2>
            <p className="text-gray-700 leading-relaxed">
              DeepSeek V3 presterar på benchmarks i klass med GPT-4o och Claude Sonnet — modeller som kostar
              5–10× mer. På MMLU (allmänkunskap), HumanEval (kodning) och MATH (matematik) är V3
              konkurrenskraftigt. R1 tävlar med OpenAI:s o1/o3 på matematisk problemlösning och multi-step
              reasoning.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Där skillnaderna märks: på <strong>svenska</strong> är DeepSeek klart sämre än Claude Sonnet
              och GPT-4o (primärt tränad på engelska och kinesiska). För kulturell kontext, nyanser och
              svenska myndighetstexter är europeiska modeller bättre. DeepSeek är starkast på engelsk kod
              och matematik — och det räcker för många tekniska use cases.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">GDPR-risker med kinesisk AI</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose">
              <h3 className="text-base font-bold text-amber-900">Viktigt för svenska och EU-baserade företag</h3>
              <p className="text-sm text-gray-700 mt-2">
                DeepSeek AI är ett kinesiskt bolag (Hangzhou DeepSeek Artificial Intelligence Co., Ltd.)
                och lagrar data på servrar i Kina. Kinesisk lag kräver att bolag delar data med
                myndigheter på begäran. Det finns inga EU GDPR-databehandlingsavtal (DPA) tillgängliga.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              EU-myndigheter har reagerat: Italiens dataskyddsmyndighet Garante blockerade tillfälligt
              DeepSeek-appen i landet tidigt 2026 och krävde klargöranden om datahantering. Irlands
              Data Protection Commission (DPC) — som hanterar EU-tillsyn för många techbolag —
              inledde en utredning.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Det konkreta problemet: om du skickar personuppgifter (namn, e-post, IP-adress, hälsodata,
              kundinteraktioner) till DeepSeeks API bryter du troligtvis mot GDPR artikel 44 om
              tredjelandsöverföringar. Det räcker inte att "anta" att det är ok — du behöver ett rättsligt
              stöd (SCC, adequacy decision) som i nuläget saknas för Kina.
            </p>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När DeepSeek är rätt val</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Intern testning och prototyping:</strong> Kod och logik innehåller sällan personuppgifter. DeepSeek V3 är utmärkt för att snabbt testa ett koncept.</li>
              <li><strong>Teknisk dokumentation och kodgenerering:</strong> Ingen persondata, starka benchmarks på kod. Billigaste alternativet för rena kodningsuppgifter.</li>
              <li><strong>Open-source-projekt:</strong> Inga affärshemligheter, inga användares persondata — GDPR-risken är minimal.</li>
              <li><strong>Research och akademi:</strong> Offentliga datasätt och generella frågor utan känslig information.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När du ska välja ett alternativ</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Kunddata av något slag:</strong> Välj OpenAI (ChatGPT Enterprise), Anthropic (Claude Enterprise) eller Google Cloud Vertex AI — alla erbjuder EU GDPR DPA.</li>
              <li><strong>Hälso- eller juridisk information:</strong> Striktaste dataskyddskraven — välj leverantör med datacenters i EU och certifierade säkerhetsstandarder.</li>
              <li><strong>Svenska texter med hög krav på språkkvalitet:</strong> Claude Sonnet eller GPT-4o är klart bättre på svenska.</li>
              <li><strong>Produktionsapplikationer med slutanvändare:</strong> GDPR-risken är för stor utan rättsligt stöd för tredjelandsöverföring.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Self-hosted DeepSeek — den GDPR-säkra lösningen</h2>
            <p className="text-gray-700 leading-relaxed">
              Det bästa av två världar: DeepSeek är open-weight, vilket innebär att modellvikterna är
              publikt tillgängliga. Du kan ladda ner modellen från Hugging Face och köra den på din
              egna EU-server via Ollama, vLLM eller liknande ramverk.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Då gäller din egna integritetspolicy och din egna infrastruktur — data lämnar aldrig EU
              och du är fullständigt GDPR-compliant. Kostnaden är GPU-infrastruktur, inte tokens per
              anrop. För höga volymer kan det vara billigare totalt, men det kräver teknisk expertis
              och löpande underhåll.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Kvantiserade versioner av DeepSeek V3 (4-bit eller 8-bit) kan köras på mer blygsam
              hårdvara. Kvaliteten sjunker något men är fortfarande konkurrenskraftig mot äldre
              GPT-4-versioner — och du betalar inga API-avgifter alls efter initial investering.
            </p>
          </section>

          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 not-prose">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Vill du jämföra DeepSeek V3:s faktiska kostnad mot GPT-4o mini eller Claude Haiku för ditt
              use case? Använd{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">kalkylatorn på startsidan</Link>{" "}
              — mata in dina tokens och se en direkt jämförelse i SEK. Se också vår guide om{" "}
              <Link to="/billigaste-ai" className="text-indigo-600 hover:underline font-medium">billigaste AI-modellerna</Link>{" "}
              och{" "}
              <Link to="/jamfor-ai-modeller" className="text-indigo-600 hover:underline font-medium">jämförelse av alla AI-modeller</Link>.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["deepseek-pris"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om DeepSeek" />
        <Sources items={[
          ...officialPricingSources,
          {
            title: "DeepSeek API Pricing",
            url: "https://platform.deepseek.com/api-docs/pricing",
            publisher: "DeepSeek (officiell prislista)",
          },
          {
            title: "Garante Italy — DeepSeek investigation",
            url: "https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/10082645",
            publisher: "Garante per la protezione dei dati personali",
          },
        ]} />

        {/* Kom igång */}
        <div className="card mt-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Redo att komma igång?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nu vet du vad DeepSeek API kostar. Nästa steg är att skapa ditt konto och börja bygga.
          </p>
          <a
            href="https://platform.deepseek.com/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-block text-sm"
            onClick={() => trackEvent('affiliate_click', { provider: 'deepseek', source: 'deepseek-pris' })}
          >
            Skapa ditt DeepSeek-konto gratis →
          </a>
          <p className="text-xs text-gray-400 mt-2">Samarbetslänk — vi kan ta emot provision vid köp.</p>
        </div>
      </main>
    </>
  );
}
