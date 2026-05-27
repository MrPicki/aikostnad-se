import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { TLDR } from "../components/TLDR";
import { LastUpdated } from "../components/LastUpdated";
import { Sources } from "../components/Sources";
import { PriceOfferSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";
import { officialPricingSources } from "../data/sources";

const faqs: FAQItem[] = [
  {
    question: "Vad kostar AI-bildgenerering 2026?",
    answer:
      "Spannet är stort. Midjourney Basic kostar 105 kr/månad (10 USD) för ca 200 bilder. DALL-E 3 via OpenAI API kostar 0,04 USD per standard-bild (1024×1024). Flux via Replicate eller fal.ai kostar 0,03 USD/bild. Stable Diffusion är gratis att köra själv men kräver GPU eller cloudtjänst (~3 kr/timme). Per bild landar du oftast på 0,30–1,50 kr beroende på modell och upplösning.",
  },
  {
    question: "Är Midjourney bättre än DALL-E 3?",
    answer:
      "Midjourney anses ge mest kommersiellt användbar fotorealism och stilistisk konsistens. DALL-E 3 är bäst på att följa exakta instruktioner i prompten (typography, layout) och integrerat direkt i ChatGPT. Flux (Black Forest Labs) är nykomlingen som vunnit mark — fri-tier är mest tillgänglig. För arbetsproduktion 2026 är Midjourney förstavalet hos de flesta byråer.",
  },
  {
    question: "Kan jag använda AI-bilder kommersiellt?",
    answer:
      "Det beror på licensen. Midjourney Standard (315 kr/mån) och uppåt ger full kommersiell rätt. DALL-E 3 via OpenAI ger kommersiella rättigheter. Stable Diffusion (CreativeML OpenRAIL-M) tillåter kommersiell användning. Adobe Firefly är specifikt tränad på licensierat material och säkrast för marknadsföring. Kontrollera alltid licensen för exakt din användning.",
  },
  {
    question: "Vad är skillnaden mellan Midjourney och Stable Diffusion?",
    answer:
      "Midjourney är en stängd molntjänst — du betalar abonnemang och får tillgång via Discord eller webb. Stable Diffusion är öppen källkod du kan ladda ner och köra själv (gratis) eller köpa via ett API som Replicate. Stable Diffusion ger mer kontroll (LoRA, ControlNet, anpassad finetune) men kräver mer teknisk kompetens. Midjourney ger högre baseline-kvalitet 'out of the box'.",
  },
  {
    question: "Finns det gratis AI-bildgenerering?",
    answer:
      "Ja. Bing Image Creator (DALL-E 3) är gratis via Microsoft Copilot. Gemini erbjuder bildgenerering gratis. Stable Diffusion kan köras gratis lokalt om du har en GPU eller via Hugging Face Spaces. Adobe Firefly har en gratis tier med begränsad kvot. För enstaka bilder räcker gratisversionerna långt — för kommersiell produktionsvolym betalas det oftast in.",
  },
];

export function AiBildPris() {
  return (
    <>
      <SEO
        title="AI-bild pris 2026 — Midjourney, DALL-E 3 och Stable Diffusion jämfört"
        description="Vad kostar AI-bildgenerering 2026? Midjourney, DALL-E 3, Stable Diffusion, Ideogram och Flux — priser i SEK och vilken som ger bäst kvalitet för pengarna."
        canonical="/ai-bild-pris"
      />
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://aikostnad.se/" },
          { name: "AI-bild pris", url: "https://aikostnad.se/ai-bild-pris" },
        ]}
      />
      <ArticleSchema article={articles["ai-bild-pris"]} />
      <SpeakableSchema />
      <PriceOfferSchema
        productName="AI-bildgenerering — abonnemang och API"
        description="AI-bildgenerering pris 2026: Midjourney, DALL-E 3, Stable Diffusion, Flux och Ideogram — abonnemang och per-bild i svenska kronor."
        url="https://aikostnad.se/ai-bild-pris"
        offers={[
          { name: "Bing Image Creator (DALL-E 3)", priceSek: 0, description: "Gratis via Microsoft Copilot" },
          { name: "Stable Diffusion (self-hosted)", priceSek: 0, description: "Open source — GPU-kostnad tillkommer" },
          { name: "Midjourney Basic", priceSek: 105, description: "~200 bilder/mån, 10 USD" },
          { name: "Midjourney Standard", priceSek: 315, description: "15h Fast GPU + unlimited Relax, kommersiell rätt" },
          { name: "Midjourney Pro", priceSek: 630, description: "30h Fast + Stealth mode" },
          { name: "Midjourney Mega", priceSek: 1260, description: "60h Fast + Stealth" },
          { name: "DALL-E 3 API (standard 1024px)", priceSek: 0.42, description: "0,04 USD per bild" },
          { name: "Flux via fal.ai", priceSek: 0.32, description: "0,03 USD per bild" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AI-bild pris 2026 — komplett jämförelse
          </h1>

          <LastUpdated date={articles["ai-bild-pris"].modifiedDate} />

          <TLDR
            question="Vad kostar AI-bildgenerering?"
            answer={
              <>
                AI-bilder kostar från <strong>0 kr (Bing Image Creator)</strong> till <strong>1 260 kr/mån (Midjourney Mega)</strong>. Vanligast är <strong>Midjourney Standard 315 kr/mån</strong> för kommersiella byråer. Per bild via API: <strong>~0,30–0,42 kr</strong> (Flux, DALL-E 3). Stable Diffusion är gratis self-hosted men kräver GPU.
              </>
            }
            bullets={[
              "Gratis: Bing Image Creator, Gemini, Adobe Firefly (limit)",
              "Midjourney Basic: 105 kr/mån (10 USD)",
              "Midjourney Standard: 315 kr/mån (kommersiell rätt)",
              "DALL-E 3 API: 0,04 USD/bild (~0,42 kr)",
              "Flux Schnell via fal.ai: 0,03 USD/bild",
              "Stable Diffusion: gratis open source",
            ]}
          />

          <div className="prose text-gray-600 space-y-4 text-base leading-relaxed">
            <p>
              AI-bildgenerering har gått från experimentell teknologi till en standard-del av
              marknadsföringsstacken på 2 år. Idag finns det fem dominerande plattformar att
              välja mellan: <strong>Midjourney</strong>, <strong>DALL-E 3</strong>,{" "}
              <strong>Stable Diffusion</strong>, <strong>Flux</strong> (Black Forest Labs) och{" "}
              <strong>Adobe Firefly</strong>. Var och en har sin styrka och prissättning.
            </p>
            <p>
              Det här guiden går igenom alla aktuella priser i svenska kronor, vad du faktiskt
              får för pengarna och vilken plattform som passar olika användningsfall. Vill du
              istället räkna på <Link to="/vad-kostar-chatgpt" className="text-indigo-700 hover:underline">ChatGPT-API-kostnaden</Link>{" "}
              eller jämföra med <Link to="/billigaste-ai" className="text-indigo-700 hover:underline">billigaste AI-text-modellerna</Link>?
            </p>
          </div>
        </div>

        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Midjourney — branschstandard för kommersiell AI-konst</h2>
          <p>
            Midjourney är den mest populära plattformen för fotorealistisk AI-bildgenerering
            och kommersiell konst. Företaget bakom har under 2026 lanserat fyra abonnemangsnivåer:
          </p>
          <ul>
            <li><strong>Basic — 105 kr/mån</strong> (10 USD): ca 200 bilder, 3,3 timmar Fast GPU.</li>
            <li><strong>Standard — 315 kr/mån</strong> (30 USD): 15h Fast GPU + unlimited Relax mode, full kommersiell rätt.</li>
            <li><strong>Pro — 630 kr/mån</strong> (60 USD): 30h Fast GPU, Stealth mode (privata bilder).</li>
            <li><strong>Mega — 1 260 kr/mån</strong> (120 USD): 60h Fast GPU, allt det Pro har.</li>
          </ul>
          <p>
            Standard-planen är "the sweet spot" för 90 % av byråanvändning. Privata bilder
            (Stealth mode) kräver Pro eller högre — viktigt för konfidentiella kundprojekt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">DALL-E 3 — integrerat med ChatGPT</h2>
          <p>
            DALL-E 3 ingår i <Link to="/vad-kostar-chatgpt" className="text-indigo-700 hover:underline">ChatGPT Plus (210 kr/mån)</Link>{" "}
            och uppåt, eller direkt via OpenAI API för <strong>0,04 USD per standard 1024×1024-bild</strong>{" "}
            (HD-versionen kostar 0,08 USD). DALL-E 3:s största styrka är följsamhet — den
            tolkar långa, detaljerade prompts bättre än någon konkurrent.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Stable Diffusion — gratis och flexibel</h2>
          <p>
            Stable Diffusion är open source och kan köras gratis på egen hårdvara (kräver en
            GPU med 8+ GB VRAM). För dig som inte vill köpa GPU finns molntjänster som{" "}
            <strong>Replicate (~0,01–0,02 USD/bild)</strong> och{" "}
            <strong>fal.ai</strong> där du betalar per generering. Open source-modellen ger
            också tillgång till tusentals community-LoRAs och anpassade finetunes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Flux — Black Forest Labs utmanare</h2>
          <p>
            Flux från Black Forest Labs är 2026:s snabbast växande open-source-modell. Den
            erbjuds både som självhostad open source (Flux.1 [schnell]) och via API-tjänster
            som <strong>fal.ai (0,03 USD/bild)</strong> och Replicate. Kvalitetsmässigt
            jämförbar med Midjourney på fotorealism — ofta bättre på text-i-bild.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Adobe Firefly — säkrast för annonser</h2>
          <p>
            Adobe Firefly är tränad uteslutande på licensierat material från Adobe Stock —
            vilket gör den juridiskt säkrast för annonskampanjer och produktbilder. Ingår i
            Creative Cloud (vissa nivåer) eller säljs separat. Kreditbaserad prissättning från
            ca 60 kr/mån för 100 generative credits.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10">Hur väljer du rätt?</h2>
          <ul>
            <li><strong>Kommersiella byråer:</strong> Midjourney Standard eller Pro.</li>
            <li><strong>Startups/utvecklare:</strong> Flux via fal.ai eller DALL-E 3 API.</li>
            <li><strong>Sporadisk användning:</strong> Bing Image Creator (gratis) eller ChatGPT Plus (DALL-E).</li>
            <li><strong>Hög volym med kontroll:</strong> Stable Diffusion self-hosted.</li>
            <li><strong>Reklam/produktbilder:</strong> Adobe Firefly för juridisk trygghet.</li>
          </ul>
        </section>

        <RelatedArticles links={relatedArticles["ai-bild-pris"] ?? []} />
        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-bildgenerering" />
        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
