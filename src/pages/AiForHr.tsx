import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { Helmet } from "react-helmet-async";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vad kostar AI-verktyg för HR per månad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det varierar kraftigt. En enstaka HR-specialist med ChatGPT Plus betalar 210 kr/mån. Ett team på 10 HR-medarbetare med ChatGPT Teams betalar ~2 630 kr/mån. Specialiserade AI-rekryteringsverktyg som Teamtailor AI eller Greenhouse AI kostar 3 000–15 000 kr/mån för medelstora organisationer. Bygger ni egna verktyg via API landar kostnaden på 200–2 000 kr/mån beroende på volym.",
      },
    },
    {
      "@type": "Question",
      name: "Är det lagligt att använda AI i rekryteringsprocessen i Sverige?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, men med restriktioner. EU AI Act (gäller från 2025-2026) klassificerar AI för rekrytering och HR-beslut som 'hög risk', vilket kräver transparens, mänsklig tillsyn och dokumentation. I Sverige tillkommer diskrimineringslagen — ni måste kunna visa att AI-stödd gallring inte diskriminerar baserat på kön, ålder, etnisk bakgrund eller andra skyddade grunder. IMY (Datainspektionen) rekommenderar att mänskliga beslut alltid fattas av en person.",
      },
    },
  ],
};

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI-verktyg för HR per månad?",
    answer:
      "En enstaka HR-specialist med ChatGPT Plus: 210 kr/mån. Team på 10 med ChatGPT Teams: ~2 630 kr/mån. Specialiserade AI-rekryteringsverktyg (Teamtailor AI, Greenhouse): 3 000–15 000 kr/mån. Bygger ni egna HR-chatbotar via API: 200–2 000 kr/mån beroende på volym. Räkna ut era specifika API-kostnader i kalkylatorn på startsidan.",
  },
  {
    question: "Är det lagligt att använda AI i rekryteringsprocessen i Sverige?",
    answer:
      "Ja, men med restriktioner. EU AI Act klassificerar AI för rekrytering som 'hög risk' — ni behöver dokumentation, transparens mot kandidater och mänsklig tillsyn vid beslut. Diskrimineringslagen kräver att ni kan visa att AI-gallring inte diskriminerar. IMY rekommenderar att slutbeslut alltid fattas av en människa. Informera kandidater i er integritetspolicy.",
  },
  {
    question: "Kan AI hjälpa till med lönekartläggning enligt diskrimineringslagen?",
    answer:
      "Ja — AI kan dramatiskt effektivisera lönekartläggningsarbetet som alla arbetsgivare med 10+ anställda är skyldiga att genomföra. AI kan gruppa befattningar, identifiera likvärda arbeten, hitta statistiska mönster i löneskillnader och generera förklaringstext till kartläggningen. Verktygen är antingen inbyggda i HRIS (som Workday AI, SAP SuccessFactors) eller kan byggas med generell AI-API.",
  },
  {
    question: "Vilka HR-uppgifter är mest lönsamma att automatisera med AI?",
    answer:
      "Rankat efter ROI: (1) Platsannons-generering — från ingångsvärden till publicering på minuter, sparar 1–3 timmar per annons. (2) Kandidatgallring — strukturera CV-data och matcha mot kravprofil, sparar 30–60% av screeningtid. (3) Onboarding-dokumentation — generera personanpassad onboarding-plan. (4) Medarbetarundersökning — AI-analys av fritext-svar ger tematisk sammanfattning på sekunder. (5) Policies och handböcker — uppdatera och anpassa befintliga dokument snabbt.",
  },
  {
    question: "Hur hanterar vi GDPR när vi använder AI i rekrytering?",
    answer:
      "Kandidatdata är personuppgifter och kräver GDPR-hantering. Ni behöver: (1) DPA med er AI-leverantör, (2) informera kandidater om AI-användning i er sekretesspolicy, (3) rättslig grund för behandlingen (vanligtvis berättigat intresse eller avtalets fullgörande), (4) lagringstid — kandidatdata bör raderas 2 år efter avslutad process om inte kandidaten samtycker till längre tid, (5) undvika att skicka känsliga uppgifter (hälsotillstånd, fackmedlemskap) till externa AI-tjänster.",
  },
  {
    question: "Kan AI ersätta HR-personal?",
    answer:
      "Inte i bred mening — men det förändrar vad HR-rollen innehåller. Administrativa uppgifter (dokumenthantering, standardsvar, rapportgenerering) automatiseras i hög grad. Strategiska och mellanmänskliga uppgifter (organisationsutveckling, konflikthantering, coachning, kulturarbete) förstärks av AI men ersätts inte. De HR-team som lyckas bäst 2026 kombinerar AI-effektivitet i admin-arbetet med mer tid för mänskliga dimensioner.",
  },
];

const sources = [
  {
    title: "EU AI Act — HR och rekrytering (hög risk)",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
  },
  {
    title: "IMY — Personuppgifter i rekrytering",
    url: "https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-dataskyddsforordningen/rekrytering/",
  },
  {
    title: "Diskrimineringsombudsmannen — Lönekartläggning",
    url: "https://www.do.se/",
  },
];

export function AiForHr() {
  return (
    <>
      <SEO
        title="AI för HR och rekrytering 2026 — kostnader, verktyg och GDPR"
        description="Vad kostar AI för HR? Rekrytering, lönekartläggning, onboarding och medarbetarundersökningar — kostnader i SEK, GDPR-krav och vilka uppgifter som lönar sig att automatisera."
        canonical="/ai-for-hr"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI för HR och rekrytering", url: "https://aikostnad.se/ai-for-hr" },
      ]} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <SpeakableSchema />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AI för HR och rekrytering 2026 — vad det kostar och vad man kan automatisera
          </h1>

          <LastUpdated date="2026-06-15" />

          <TLDR
            question="Hur kan HR-avdelningar använda AI och vad kostar det?"
            answer={
              <>
                AI ger störst ROI i HR-arbete för tre saker:{" "}
                <strong>platsannonsering</strong> (från 3 timmar till 15 minuter),{" "}
                <strong>kandidatgallring</strong> (50–70% kortare screeningtid) och{" "}
                <strong>onboarding-dokumentation</strong>. En HR-specialist med ChatGPT Plus
                betalar <strong>210 kr/mån</strong>. Specialiserade AI-rekryteringsverktyg
                kostar 3 000–15 000 kr/mån. Viktigt: EU AI Act kräver transparens och mänsklig
                tillsyn vid AI-stödda rekryteringsbeslut.
              </>
            }
            bullets={[
              "ChatGPT Plus (individuellt): 210 kr/mån — passar enskild HR-specialist",
              "ChatGPT Teams (10 pers): ~2 630 kr/mån — dela arbetsytor och prompts",
              "Specialiserade AI-rekryteringsverktyg: 3 000–15 000 kr/mån",
              "EU AI Act: rekrytering = 'hög risk' — dokumentation och mänsklig tillsyn krävs",
              "GDPR: DPA med AI-leverantör + informera kandidater i sekretesspolicyn",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed mt-6">
            <p>
              HR-avdelningar är bland de tidiga adopterna av AI i svenska organisationer —
              och det finns goda skäl till det. HR-arbetet innehåller många väldefinierade,
              repetitiva textuppgifter som AI hanterar mycket väl: skriva annonser, sammanfatta
              intervjuanteckningar, generera referensmallar, analysera medarbetarundersökningar.
              Samtidigt är rekrytering ett av de mest juridiskt känsliga användningsområdena
              — EU AI Act och diskrimineringslagen sätter tydliga ramar.
            </p>
            <p>
              Den här guiden täcker vad HR-avdelningar konkret kan automatisera, vad det
              kostar, och vilka juridiska krav ni måste förhålla er till i Sverige 2026.
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none space-y-6">

          <h2 className="text-2xl font-bold text-gray-900">Vad AI faktiskt kan göra i HR</h2>
          <p>
            Det är viktigt att skilja mellan vad AI gör bra idag och vad som fortfarande
            kräver mänskligt omdöme. Baserat på hur svenska HR-team använder AI 2026:
          </p>
          <div className="not-prose space-y-3">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="font-semibold text-green-900 text-sm mb-2">Hög ROI — AI klarar detta bra</h3>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
                <li><strong>Platsannonser:</strong> Generera utkast från kravprofil och kulturbeskrivning — från 3 timmar till 15 minuter</li>
                <li><strong>Strukturera CV-data:</strong> Extrahera erfarenhet, kompetenser, utbildning i standardformat för jämförelse</li>
                <li><strong>Intervjufrågor:</strong> Generera kompetensbaserade frågor utifrån kravprofil och STAR-metod</li>
                <li><strong>Onboarding-planer:</strong> Personanpassade onboarding-scheman baserade på roll och avdelning</li>
                <li><strong>Policyer och handböcker:</strong> Uppdatera och anpassa befintliga dokument till ny lagstiftning</li>
                <li><strong>Medarbetarundersökningar:</strong> Tematisk analys av fritext-svar — 500 svar sammanfattas på minuter</li>
                <li><strong>Lönekartläggning:</strong> Identifiera likvärda arbeten och hitta statistiska mönster</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h3 className="font-semibold text-amber-900 text-sm mb-2">Mellannivå — AI assisterar, människa beslutar</h3>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
                <li><strong>Kandidatranking:</strong> AI-förslag på prioriteringsordning, men HR-specialist verifierar</li>
                <li><strong>Referenstagning:</strong> AI strukturerar referenssamtal, människa tolkar nuanserna</li>
                <li><strong>Förhandlingsunderlag:</strong> AI sammanställer marknadsdata, HR/chef fattar beslut</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="font-semibold text-red-900 text-sm mb-2">Undvik autonomt AI — kräver alltid mänskligt beslut</h3>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
                <li>Anställningsbeslut — enligt EU AI Act och diskrimineringslagen</li>
                <li>Lönesättning av individer — diskrimineringsrisk</li>
                <li>Uppsägningsbeslut — kräver mänsklig bedömning och dokumentation</li>
                <li>Personlighets- eller psykologiska bedömningar av kandidater</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Kostnader för AI i HR — tre modeller</h2>
          <p>
            Det finns i huvudsak tre sätt att använda AI i HR-arbete, med mycket olika kostnadsprofil.
          </p>
          <div className="not-prose space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Modell 1: Generella AI-verktyg (lägst tröskel)</h3>
              <p className="text-sm text-gray-600 mb-3">
                ChatGPT, Claude eller Gemini via webbgränssnitt. HR-specialisten skriver
                prompts direkt. Passar enskilda medarbetare och små HR-team.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-1.5 text-gray-500 font-medium">Verktyg</th>
                    <th className="text-right py-1.5 text-gray-500 font-medium">Pris/person/mån</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr><td className="py-1.5 text-gray-700">ChatGPT Free</td><td className="py-1.5 text-right text-gray-700">0 kr (begränsad)</td></tr>
                  <tr><td className="py-1.5 text-gray-700">ChatGPT Plus</td><td className="py-1.5 text-right text-gray-700">210 kr</td></tr>
                  <tr><td className="py-1.5 text-gray-700">ChatGPT Teams</td><td className="py-1.5 text-right text-gray-700">263 kr</td></tr>
                  <tr><td className="py-1.5 text-gray-700">Claude Pro</td><td className="py-1.5 text-right text-gray-700">210 kr</td></tr>
                  <tr><td className="py-1.5 text-gray-700">Microsoft Copilot (M365)</td><td className="py-1.5 text-right text-gray-700">~330 kr</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Modell 2: Specialiserade AI-rekryteringsverktyg</h3>
              <p className="text-sm text-gray-600 mb-2">
                Verktyg byggda specifikt för HR/rekrytering med inbyggda mallar, kandidatdatabas
                och ATS-integration. Teamtailor (Sverige), Workable, Greenhouse med AI-tillägg.
              </p>
              <p className="text-sm text-gray-600">
                Kostnad: <strong>3 000–15 000 kr/mån</strong> för medelstora organisationer
                (50–500 anställda). Inkluderar normalt ATS-funktionalitet, inte bara AI.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Modell 3: Egenutvecklade AI-verktyg via API</h3>
              <p className="text-sm text-gray-600 mb-2">
                HR bygger interna verktyg — en intern chatbot för HR-policyer, automatiserad
                annons-generator, medarbetarundersökning-analysator. Kräver teknisk resurs.
              </p>
              <p className="text-sm text-gray-600">
                Kostnad: <strong>200–2 000 kr/mån</strong> i API-avgifter, plus
                utvecklingskostnad (engångsinvestering). Bäst ROI vid hög volym och specifika,
                repetitiva uppgifter.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">EU AI Act och rekrytering — vad HR behöver veta</h2>
          <p>
            EU AI Act, som trädde i kraft 2024 och börjar tillämpas fullt ut 2025–2026,
            klassificerar AI-system som används i rekrytering och HR-beslut som{" "}
            <strong>"hög risk"</strong>. Det innebär specifika krav på er som arbetsgivare:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Transparens mot kandidater:</strong> Ni måste informera kandidater om
              att AI används i screeningprocessen och på vilket sätt.
            </li>
            <li>
              <strong>Mänsklig tillsyn:</strong> AI-stödda beslut om att gå vidare eller
              avslå en kandidat måste granskas och bekräftas av en människa.
            </li>
            <li>
              <strong>Dokumentation:</strong> Ni måste kunna visa att ert AI-system inte
              diskriminerar och att det är testat för bias. Leverantörer av hög-risk AI-system
              måste tillhandahålla teknisk dokumentation.
            </li>
            <li>
              <strong>Rätt till förklaring:</strong> Kandidater som nekas efter ett AI-stött
              beslut har rätt att begära en förklaring.
            </li>
          </ul>
          <p>
            Generella AI-verktyg som ChatGPT, när ni använder dem för att skriva annonser
            eller strukturera CV-data, faller inte automatiskt under AI Act's högrisk-kategori.
            Det är när AI direkt rankar eller gallrar kandidater som kraven aktiveras.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Praktisk guide: kom igång med AI i HR</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Börja med annons-generering.</strong> Det är den uppgift med lägst risk
              och högst ROI. Ge AI er kravprofil, kulturbeskrivning och vilken ton ni vill ha.
              Granska och anpassa — AI genererar ett starkt utkast på 2 minuter.
            </li>
            <li>
              <strong>Bygg en prompt-bibliotek.</strong> Samla era bäst fungerande prompts
              i ett delat dokument (Notion, SharePoint). HR-teamet behöver inte uppfinna hjulet
              varje gång.
            </li>
            <li>
              <strong>Testa CV-strukturering på gamla ansökningar.</strong> Kör 50 gamla
              CV:n genom ett strukturerat AI-flöde och mät kvaliteten mot er manuella bedömning
              innan ni driftsätter det på riktiga kandidater.
            </li>
            <li>
              <strong>Uppdatera er sekretesspolicy.</strong> Informera kandidater om att AI
              används i er rekryteringsprocess. Teckna DPA med er leverantör om kandidatdata
              behandlas via API.
            </li>
            <li>
              <strong>Dokumentera bias-tester.</strong> Kör er AI-screening på ett testset
              av CV:n med varierade namn, åldrar och bakgrunder. Dokumentera resultaten.
              Det skyddar er om en kandidat senare ifrågasätter processen.
            </li>
          </ol>

          <div className="not-prose mt-6 bg-brand-50 border border-brand-100 rounded-xl p-4">
            <p className="text-sm text-brand-800">
              Jämför alla AI-modeller och priser:{" "}
              <Link to="/jamfor-ai-modeller" className="font-semibold underline underline-offset-2 hover:text-brand-900">
                Fullständig modelljämförelse →
              </Link>
              {" "}·{" "}
              <Link to="/ai-gdpr-sverige" className="font-semibold underline underline-offset-2 hover:text-brand-900">
                AI och GDPR för svenska företag →
              </Link>
            </p>
          </div>
        </section>

        <RelatedArticles links={relatedArticles["ai-for-foretag"] || []} />

        <LandingFAQ items={faqs} heading="Vanliga frågor: AI för HR och rekrytering" />

        <Sources items={sources} />
      </main>
    </>
  );
}
