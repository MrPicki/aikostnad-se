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

const article = articles["ai-for-smaforetag"];

const faqs: FAQItem[] = [
  {
    question: "Räcker gratis AI-verktyg för ett litet företag?",
    answer:
      "Ja, för många användningsfall. ChatGPT Free, Claude Free och Gemini Free räcker utmärkt om du skriver mejl, skapar marknadsföringstext eller svarar på standardfrågor ett par gånger om dagen. Begränsningarna märks när du behöver analysera långa dokument, använda avancerade modeller (GPT-4o, Claude Sonnet) utan begränsning, eller integrera AI i ett automatiserat flöde. Uppgradera till Plus/Pro (ca 200–210 kr/mån) när du märker att du stöter i taket dagligen.",
  },
  {
    question: "Vad kostar en AI-chatbot för ett litet e-handelsföretag?",
    answer:
      "En Claude Haiku-baserad chatbot som svarar på 500 produktfrågor per dag kostar typiskt 60–120 kr per månad i API-kostnader. Lägg till kostnaden för hosting och enklare backend (0–200 kr/mån beroende på lösning) och du hamnar på 60–320 kr/mån totalt. Det är billigare än ett halvtimmes arbete för en kundtjänstmedarbetare och chatboten jobbar dygnet runt.",
  },
  {
    question: "Är Claude Pro eller ChatGPT Plus bättre för ett litet företag i Sverige?",
    answer:
      "För svenska företag som primärt kommunicerar på svenska är Claude Pro (209 kr/mån) generellt ett bättre val — Anthropics modeller skriver naturligare svenska, håller konsekvent ton i längre texter och är starka på dokumentanalys. ChatGPT Plus (ca 210 kr/mån) är starkare om du behöver multimodala funktioner (bilder, voice), webbsökning integrerad i samtalet eller Custom GPTs. Pröva gratisversionerna i en vecka vardera och välj den som passar ditt arbetsflöde.",
  },
  {
    question: "Hur beräknar jag ROI på AI-investeringen?",
    answer:
      "Räkna enkelt: om en anställd lägger 1 timme per dag på uppgifter som AI kan hantera, och timkostnaden (lön + arbetsgivaravgifter) är 250 kr, sparar du 250 kr per person och dag. Under ett år (220 arbetsdagar) är det 55 000 kr per person. En Claude Team-licens för 5 anställda kostar 1 400 kr/mån × 12 = 16 800 kr per år. ROI = (5 × 55 000 − 16 800) / 16 800 ≈ 1 540 % — om besparingen är reell. Var nykter med uppskattningen av sparad tid.",
  },
  {
    question: "När är API-lösning bättre än ett abonnemang som ChatGPT Plus?",
    answer:
      "API är bättre när du har ett automatiserat flöde med mer än 100–200 förfrågningar per dag, vill integrera AI i din hemsida eller kundtjänstsystem, eller behöver anpassad logik runt AI:t. Abonnemang passar bättre för manuellt arbete — du chattar med AI och kopierar resultaten. En e-handlare med 500 kundfrågor per dag sparar pengar på API (ca 80 kr/mån med Haiku) jämfört med ett Plus-abonnemang (210 kr/mån) utan att ens räkna med att API-lösningen kan skalas utan extra kostnad.",
  },
];

export function AiForSmaforetag() {
  return (
    <>
      <SEO
        title="AI för småföretag — vad kostar det och är det värt det? 2026"
        description="Realistiska AI-kostnader för 1–10 personers företag. Vilka verktyg är gratis, när API är billigare, konkreta exempel per bransch och ROI-argument. Maj 2026."
        canonical="/ai-for-smaforetag"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för småföretag", url: "https://aikostnad.se/ai-for-smaforetag" },
      ]} />
      <ArticleSchema article={article} />
      <SpeakableSchema />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            AI för småföretag — kostnad, nytta och hur du börjar
          </h1>
          <ArticleByline article={article} />
          <LastUpdated date={article.modifiedDate} />

          <TLDR
            question="Vad bör ett litet företag satsa på AI?"
            answer={
              <>
                Börja <strong>gratis</strong> (ChatGPT Free, Claude Free) — de räcker för de flesta dagliga uppgifter. Uppgradera till <strong>Plus/Pro (200–210 kr/mån)</strong> när du märker begränsningar. En <strong>API-chatbot</strong> med Claude Haiku lönar sig när du har 500+ automatiserade frågor/dag till en kostnad på ca 80 kr/mån. <strong>ROI är typiskt 10–50×</strong> om du räknar realistiskt på sparad tid.
              </>
            }
            bullets={[
              "Gratisverktyg: ChatGPT Free, Claude Free, Gemini — räcker för de flesta",
              "Plus/Pro: ca 200–210 kr/mån — uppgradera när gratis är otillräckligt",
              "API-chatbot (Haiku): ca 80 kr/mån för 500 frågor/dag",
              "Claude Team 5 pers: 1 400 kr/mån — lönar sig om 1 h/dag sparas per anst.",
              "ROI: 10–50× typiskt för småföretag som räknar nykter på sparad tid",
            ]}
          />

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Många småföretag överskattar vad AI kostar och underskattar vad de kan få gratis.
            Andra gör misstaget och köper dyra licenser utan att använda dem. Den här guiden
            går igenom realistiska kostnader för ett 1–10 personers företag, med konkreta
            branschexempel och ett ärligt ROI-resonemang.
          </p>

          {/* Free tools */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Gratis AI-verktyg som faktiskt räcker</h2>
            <p className="text-gray-700 leading-relaxed">
              Det finns ett brett utbud av gratis AI-verktyg av hög kvalitet 2026. Innan du
              köper något — testa om gratis räcker för dina behov.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>ChatGPT Free.</strong> GPT-4o mini med dagliga gränser. Räcker för
                att skriva och redigera text, brainstorma idéer, svara på enkla frågor och
                generera marknadsföringsinnehåll ett par gånger om dagen.
              </li>
              <li>
                <strong>Claude Free.</strong> Ger tillgång till Claude Sonnet med dagliga
                gränser. Bättre än ChatGPT Free på långa dokument och konsekvent svenska.
                Utmärkt för att analysera kontrakt, skriva offerter och formulera
                kundkommunikation.
              </li>
              <li>
                <strong>Gemini (Google).</strong> Integrerat med Google Workspace, gratis via
                Google AI Studio upp till 1 500 förfrågningar per dag. Starkt val om ni
                redan arbetar i Google Docs och Drive.
              </li>
              <li>
                <strong>Microsoft Copilot.</strong> Ingår i vissa Microsoft 365-licenser utan
                extra kostnad. Praktiskt för Excel, Word och Teams — men begränsat utanför
                Microsoft-ekosystemet.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Läs mer i vår{" "}
              <Link to="/gratis-ai" className="text-indigo-700 hover:underline">
                fullständiga guide till gratis AI-verktyg
              </Link>
              .
            </p>
          </section>

          {/* Branch examples */}
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Konkreta branschexempel</h2>
            <p className="text-gray-700 leading-relaxed">
              Abstrakt prislista är svår att omsätta till verkligheten. Här är fem konkreta
              scenarion med realistiska kostnader:
            </p>

            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Frisörsalong — 2 anställda</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Använder ChatGPT Free för att skriva FAQ-mallar för hemsidan, svara på
                  Googles recensioner och formulera inlägg till Instagram. Spenderar ca 30
                  minuter per vecka på AI-assisterat arbete. Kostnad: <strong>0 kr/mån</strong>.
                  Behov: gratis räcker helt — volymen är för låg för att motivera betalabonnemang.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Liten restaurang — 5 anställda</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Kocken och ägaren använder ChatGPT Plus (ca 210 kr/mån) för att skriva
                  menybeskrivningar på svenska och engelska, generera säsongsrecept-idéer
                  och formulera professionella svar på negativa Tripadvisor-recensioner.
                  Kostnad: <strong>ca 210 kr/mån</strong>. ROI: 2 timmars skrivarbete per
                  vecka eliminerat — motsvarar ca 2 000 kr/mån i frigjord tid.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">E-handel med 500 frågor/dag — 3 anställda</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Bygger en Claude Haiku-baserad chatbot som automatiskt svarar på produktfrågor,
                  leveransstatus-förfrågningar och returinformation via hemsidan. 500 frågor/dag
                  × 22 arbetsdagar = 11 000 frågor/mån. Med genomsnitts­konversation på 200
                  input-tokens och 400 output-tokens kostar det ca 80 kr/mån i API-kostnader.
                  Kostnad: <strong>~80 kr/mån (API)</strong> plus minimal hosting.
                  Frigör 3–4 timmars kundtjänstarbete per dag.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">IT-konsult — ensam företagare</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Använder Claude Pro (209 kr/mån) som daglig arbetspartner: kod-review,
                  tekniska dokumentationen, kundpresentationer och att sammanfatta långa
                  upphandlingsdokument. Obegränsad tillgång till Sonnet 4.6 plus Opus-sessioner
                  för komplexa arkitekturfrågor. Kostnad: <strong>209 kr/mån</strong>.
                  Sparar uppskattningsvis 1–2 timmar per arbetsdag = 22 000–44 000 kr/år i
                  frigjord faktureringsbara timmar.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900">Marknadsföringsbyrå — 5 anställda</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Köper Claude Team för 5 användare à ca 280 kr/user/mån = <strong>1 400 kr/mån</strong>.
                  Alla i teamet har obegränsat tillgång till Sonnet 4.6 och delar projektytor.
                  Används för copywriting, brief-analys, kampanjidéer och rapportskrivning.
                  Varje anställd sparar ca 1 timme per dag. Med ett timpris på 250 kr och
                  220 arbetsdagar per år: 5 × 250 × 220 = 275 000 kr i frigjord kapacitet,
                  mot 16 800 kr i AI-kostnad per år. ROI: ~1 540 %.
                </p>
              </div>
            </div>
          </section>

          {/* When API is better */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När API är billigare än abonnemang</h2>
            <p className="text-gray-700 leading-relaxed">
              Det finns ett brytpunkt där det lönar sig att gå från ett chatbaserat abonnemang
              (Plus/Pro) till att integrera direkt mot API:et. Den punkten inträffar när du
              har ett automatiserat, repetitivt flöde med hög volym.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Scenario</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Abonnemang</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">API (Haiku)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Vinnare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2">5 manuella chattar/dag</td>
                    <td className="px-3 py-2 text-right">210 kr/mån</td>
                    <td className="px-3 py-2 text-right">~2 kr/mån</td>
                    <td className="px-3 py-2 text-green-700">API (men setup-kostnad)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">100 auto-frågor/dag</td>
                    <td className="px-3 py-2 text-right">Fungerar ej automatiserat</td>
                    <td className="px-3 py-2 text-right">~16 kr/mån</td>
                    <td className="px-3 py-2 text-green-700">API klart</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">500 auto-frågor/dag</td>
                    <td className="px-3 py-2 text-right">Fungerar ej automatiserat</td>
                    <td className="px-3 py-2 text-right">~80 kr/mån</td>
                    <td className="px-3 py-2 text-green-700">API klart</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Varierad daglig analys, 1 pers</td>
                    <td className="px-3 py-2 text-right">209 kr/mån</td>
                    <td className="px-3 py-2 text-right">Ej praktiskt manuellt</td>
                    <td className="px-3 py-2 text-green-700">Abonnemang klart</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tumregel: om du kan beskriva uppgiften som "skicka text X, ta emot svar Y,
              gör handling Z" — utan mänsklig inblandning — är API rätt väg. Om du behöver
              konversation, iterationer och mänsklig bedömning i varje steg är ett abonnemang
              smidigare.
            </p>
          </section>

          {/* ROI */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Räkna på ROI — ett ärligt resonemang</h2>
            <p className="text-gray-700 leading-relaxed">
              ROI-kalkyler för AI kan se imponerande ut på papper. Här är ett nyktrare
              sätt att tänka:
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Konservativt scenario:</strong> En 5-personers byrå investerar i
              Claude Team (1 400 kr/mån). Varje anställd sparar i genomsnitt 45 minuter
              per dag på AI-assisterade uppgifter (copywriting, summering, research). Med
              en genomsnittlig timkostnad inkl. arbetsgivaravgifter på 350 kr:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>5 anst × 0,75 h × 350 kr × 220 dagar = <strong>288 750 kr/år</strong> i frigjord tid</li>
              <li>AI-kostnad: 1 400 kr × 12 = <strong>16 800 kr/år</strong></li>
              <li>ROI = (288 750 − 16 800) / 16 800 = <strong>1 619 %</strong></li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Det ser hisnande ut — och det är det faktiskt, om siffrorna stämmer. Den
              kritiska frågan är: vad gör de frigjorda 45 minuterna? Om de omvandlas till
              fakturerbara timmar eller ny kundanskaffning är ROI reell. Om de absorberas
              av längre fikapauser är vinsten lägre. Var ärlig med er usage-data.
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-indigo-900">Hur du mäter faktisk ROI</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>Mät konkret: be varje anställd logga AI-tid och sparad tid en vecka</li>
                <li>Räkna på faktisk timkostnad (lön + sociala avgifter = ca 1,42× bruttolön)</li>
                <li>Sätt ett mål: "vi sparar X timmar/vecka på Y uppgifter" — mät mot det</li>
                <li>Starta smalt: prova gratis, uppgradera en person, sen teamet</li>
              </ul>
            </div>
          </section>

          {/* How to start */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Hur du börjar — steg för steg</h2>
            <p className="text-gray-700 leading-relaxed">
              De flesta småföretag bör följa denna progression:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Vecka 1–2: Testa gratis.</strong> Börja med ChatGPT Free och Claude
                Free. Identifiera 3–5 konkreta uppgifter där AI sparar tid. Mät hur lång tid
                de tar utan AI och med AI.
              </li>
              <li>
                <strong>Vecka 3–4: Uppgradera en person.</strong> Om gratis räcker för resten
                av teamet, köp ett Plus/Pro-abonnemang för den person som använder AI mest.
                Följ upp om sparad tid ökar.
              </li>
              <li>
                <strong>Månad 2–3: Rulla ut till teamet om det fungerar.</strong> Köp Team-licens
                om hela teamet vinner på AI. Skapa delade promptmallar och "best practices" internt.
              </li>
              <li>
                <strong>Månad 4+: Automatisering.</strong> Om du identifierat ett repetitivt flöde
                med hög volym — undersök API-integration med Claude Haiku eller GPT-4o mini.
                Kontakta en AI-konsult om du saknar teknisk kompetens internt.
              </li>
            </ol>
          </section>

          {/* Calculator CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på just din användning</h2>
            <p className="text-gray-700 leading-relaxed">
              Undrar du vad ett specifikt API-flöde kostar för just din volym?{" "}
              <Link to="/" className="text-indigo-700 hover:underline font-medium">
                Kalkylatorn på startsidan
              </Link>{" "}
              låter dig fylla i antal frågor per dag, genomsnittlig längd och se
              månadskostnaden i SEK för Haiku, Sonnet och GPT-4o mini sida vid sida.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/ai-for-foretag" className="text-indigo-700 hover:underline">
                  Läs mer om AI för större företag (10+ anst.)
                </Link>
              </li>
              <li>
                <Link to="/gratis-ai" className="text-indigo-700 hover:underline">
                  Jämförelse av alla gratis AI-verktyg
                </Link>
              </li>
              <li>
                <Link to="/ai-kostnad-per-manad" className="text-indigo-700 hover:underline">
                  Typiska AI-månadskostnader per use case
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              AI är 2026 inte en lyx — det är ett konkurrensmedel för småföretag. Gratis
              verktyg räcker för de flesta som börjar. Plus/Pro-abonnemang (200–210 kr/mån)
              är rätt steg två. API-integration lönar sig när du har 500+ automatiserade
              förfrågningar per dag. ROI är reell om du räknar nykter, mäter faktisk
              tidsbesparing och säkerställer att frigjord tid faktiskt skapar värde.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser kan ändras. Verifiera alltid mot leverantörens officiella prislista
              innan du väljer lösning. Senast verifierade maj 2026.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-for-smaforetag"]} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI för småföretag" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
