import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { RelatedArticles } from "../components/RelatedArticles";
import { Sources } from "../components/Sources";
import { LastUpdated } from "../components/LastUpdated";
import { DefinedTermSchema, SpeakableSchema } from "../components/SchemaBlocks";
import { articles } from "../data/articles";
import { relatedArticles } from "../data/relatedArticles";
import { officialPricingSources } from "../data/sources";

interface Term {
  name: string;
  definition: string;
  link?: string;
}

const TERMS: Term[] = [
  { name: "Abonnemang", definition: "Fast månadsavgift för åtkomst till AI-tjänst (t.ex. ChatGPT Plus 210 kr/mån). Motsats till API-prissättning per token." },
  { name: "Agent", definition: "AI som kan utföra sekvenser av handlingar (söka, klicka, skriva kod) autonomt — inte bara svara på frågor." },
  { name: "Anthropic", definition: "Amerikanskt AI-företag bakom Claude-modellerna. Konkurrent till OpenAI och Google.", link: "/claude-pris" },
  { name: "API (Application Programming Interface)", definition: "Programmatiskt sätt att anropa en AI-modell från egen kod. Du betalar per token istället för fast månadsavgift." },
  { name: "Batch API", definition: "Asynkron väg att skicka många AI-anrop med rabatt (OpenAI ger 50 %). Lämpar sig för icke-tidskritiska arbetsbelastningar." },
  { name: "Bias", definition: "Systematisk skevhet i en AI-modells svar — beror på träningsdata. Viktig att förstå för rättvis användning." },
  { name: "Chain of Thought (CoT)", definition: "Tekniken att be en modell 'tänka högt' steg för steg innan slutsvar. Höjer noggrannheten på resonemangsuppgifter — och tokenkostnaden." },
  { name: "ChatGPT", definition: "OpenAI:s chatprodukt. Använder GPT-4o eller o3 under huven. Inte samma sak som OpenAI API.", link: "/vad-kostar-chatgpt" },
  { name: "Claude", definition: "Anthropics AI-modellfamilj: Haiku (snabb/billig), Sonnet (balans), Opus (flaggskepp).", link: "/claude-pris" },
  { name: "Context window", definition: "Hur mycket text modellen kan 'se' samtidigt — mätt i tokens. Claude Sonnet: 200K, Gemini 2.5 Pro: 1M tokens." },
  { name: "DALL-E", definition: "OpenAI:s bildgenereringsmodell. DALL-E 3 ingår i ChatGPT Plus eller via API.", link: "/ai-bild-pris" },
  { name: "DPA (Data Processing Addendum)", definition: "Juridiskt avtal som krävs för GDPR-efterlevnad vid behandling av personuppgifter. Ingår oftast i Enterprise-versioner, inte gratis-tier." },
  { name: "Embedding", definition: "Numerisk representation av text som möjliggör semantiska sökningar och RAG. Billigare än chattanrop." },
  { name: "Fine-tuning", definition: "Att vidare-träna en bas-modell på egen data för specifik uppgift. Sänker per-anropskostnad vid hög volym men har upfront-kostnad." },
  { name: "Gemini", definition: "Googles AI-modellfamilj. Gemini 2.5 Pro/Flash är aktuella API-modellerna 2026.", link: "/gemini-pris" },
  { name: "GPT (Generative Pre-trained Transformer)", definition: "OpenAI:s familj av språkmodeller. GPT-4o, GPT-4.1 och GPT-4o mini är de mest använda 2026.", link: "/gpt-4-pris" },
  { name: "GPU (Graphics Processing Unit)", definition: "Specialiserad processor som krävs för att köra stora AI-modeller. Cloudkostnad ~3 kr/timme och uppåt." },
  { name: "Hallucination", definition: "När en AI-modell hittar på fakta som låter trovärdiga men är felaktiga. Större problem med flaggskeppsmodeller än reasoning-modeller (o3)." },
  { name: "Inference", definition: "Att köra (inte träna) en AI-modell — alltså varje gång du skickar en fråga. Inferenskostnad = vad du betalar API." },
  { name: "Input tokens", definition: "Tokens i frågan du skickar till modellen. Vanligen billigare än output-tokens (förhållande ungefär 1:4)." },
  { name: "JSON mode", definition: "Inställning som tvingar modellen att svara i strikt JSON-format. Sparar tokens och underlättar parsing i applikationer." },
  { name: "LLM (Large Language Model)", definition: "Samlingsterm för stora språkmodeller som GPT-4, Claude, Gemini, Llama. 'Stora' = miljarder parametrar." },
  { name: "Llama", definition: "Open source LLM-familj från Meta. Llama 4 är aktuell 2026. Gratis att ladda ner — du betalar GPU-kostnad." },
  { name: "Mistral", definition: "Franskt AI-företag med open-source-modeller (Mistral Small/Medium/Large). Populärt EU-alternativ för GDPR-känsliga applikationer." },
  { name: "Multimodal", definition: "AI som kan hantera flera datatyper — text, bild, ljud, video. GPT-4o och Gemini är multimodala; GPT-4.1 är textfokuserad." },
  { name: "OpenAI", definition: "Företaget bakom ChatGPT, GPT-4, DALL-E och o-serien. Världens största AI-företag mätt i konsumentanvändare 2026.", link: "/openai-api-kostnad" },
  { name: "Output tokens", definition: "Tokens i modellens svar. Dyrare än input (typiskt 4×). Att begränsa svarens längd är en av de enklaste sätten att spara pengar." },
  { name: "Prompt", definition: "Instruktionen du ger AI-modellen. Kan bestå av system-prompt (regler), user-prompt (frågan) och eventuella exempel." },
  { name: "Prompt caching", definition: "Återanvänd en bearbetad prompt för rabatt (Anthropic 90 %, OpenAI 50 %). Halverar ofta totalkostnaden för chatbots.", link: "/prompt-caching" },
  { name: "Prompt engineering", definition: "Konsten att skriva effektiva promptar — viktigaste skillnaden mellan amatör- och proffsresultat med samma modell." },
  { name: "RAG (Retrieval Augmented Generation)", definition: "Att hämta in relevant data från vektor-databas och stoppa in i prompten innan modellen svarar. Hur de flesta AI-chatbots fungerar idag." },
  { name: "Reasoning tokens", definition: "Tokens som o3/o3-mini använder internt för att tänka innan svar. Du betalar för dem men ser dem inte. Kan vara 5-10× normal output-volym." },
  { name: "RLHF (Reinforcement Learning from Human Feedback)", definition: "Träningsteknik där människor rangordnar modellsvar för att lära modellen vad som är bra svar. Grunden för moderna AI-assistenter." },
  { name: "Stable Diffusion", definition: "Open source bildgenereringsmodell. Gratis att köra själv. Aktiv community med tusentals anpassade modeller (LoRAs).", link: "/ai-bild-pris" },
  { name: "System prompt", definition: "Instruktionen som sätter modellens beteende ('du är en hjälpsam assistent som svarar på svenska'). Vanligt mål för caching." },
  { name: "Token", definition: "Den minsta textenheten en AI-modell bearbetar. Engelska: ~0,75 token/ord. Svenska: ~1,3 token/ord (73 % dyrare per ord)." },
  { name: "Tokenisering", definition: "Processen att dela upp text i tokens. Varje modell har egen tokenizer — GPT-4 och Claude har olika." },
  { name: "Transformer", definition: "Den neurala arkitektur som ligger bakom alla moderna LLM. Uppfunnen av Google 2017 ('Attention is All You Need')." },
  { name: "Vector database", definition: "Databas optimerad för att lagra och söka embeddings. Pinecone, Weaviate, pgvector. Krävs för RAG-applikationer." },
];

// 5 viktigaste termerna får DefinedTermSchema (Google glossary rich snippets)
const SCHEMA_TERMS = [
  { name: "Token", description: "Den minsta textenheten en AI-modell bearbetar. Engelska: ~0,75 token/ord. Svenska: ~1,3 token/ord." },
  { name: "Prompt caching", description: "Återanvänd en bearbetad prompt för rabatt — Anthropic 90 %, OpenAI 50 %. Halverar ofta totalkostnaden för chatbots." },
  { name: "Context window", description: "Hur mycket text modellen kan 'se' samtidigt — mätt i tokens. Claude Sonnet: 200K, Gemini 2.5 Pro: 1M tokens." },
  { name: "RAG (Retrieval Augmented Generation)", description: "Att hämta in relevant data från vektor-databas och stoppa in i prompten innan modellen svarar." },
  { name: "API", description: "Programmatiskt sätt att anropa en AI-modell från egen kod. Du betalar per token istället för fast månadsavgift." },
];

export function AiOrdlista() {
  return (
    <>
      <SEO
        title="AI-ordlista — termer, tokens, API och prismodeller förklarade"
        description="Komplett ordlista för AI-kostnader på svenska: tokens, prompt, embedding, API, abonnemang, fine-tuning, RAG, RLHF och mer. Begripliga definitioner."
        canonical="/ai-ordlista"
      />
      <BreadcrumbSchema
        items={[
          { name: "Hem", url: "https://aikostnad.se/" },
          { name: "AI-ordlista", url: "https://aikostnad.se/ai-ordlista" },
        ]}
      />
      <ArticleSchema article={articles["ai-ordlista"]} />
      <SpeakableSchema />
      {SCHEMA_TERMS.map((t) => (
        <DefinedTermSchema
          key={t.name}
          name={t.name}
          description={t.description}
          url={`https://aikostnad.se/ai-ordlista#${encodeURIComponent(t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}`}
        />
      ))}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
            ← Tillbaka till kalkylatorn
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            AI-ordlista — termer för AI-kostnader på svenska
          </h1>

          <LastUpdated date={articles["ai-ordlista"].modifiedDate} />

          <p className="text-lg text-gray-600 leading-relaxed">
            Svenska företag möter AI-terminologin på engelska — det här är{" "}
            {TERMS.length} av de viktigaste begreppen översatta och förklarade. Klicka på
            länkade termer för fördjupning.
          </p>
        </div>

        {/* Alfabetisk navigation */}
        <div className="mb-10 flex flex-wrap gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-4">
          {Array.from(new Set(TERMS.map((t) => t.name[0].toUpperCase())))
            .sort()
            .map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors"
              >
                {letter}
              </a>
            ))}
        </div>

        <section className="space-y-8">
          {Array.from(new Set(TERMS.map((t) => t.name[0].toUpperCase())))
            .sort()
            .map((letter) => {
              const termsForLetter = TERMS.filter(
                (t) => t.name[0].toUpperCase() === letter,
              );
              return (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                  <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b border-gray-200 pb-2">
                    {letter}
                  </h2>
                  <div className="space-y-5">
                    {termsForLetter.map((term) => {
                      const slug = term.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/-+$/, "");
                      return (
                        <div key={term.name} id={slug} className="scroll-mt-20">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{term.name}</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {term.definition}
                            {term.link && (
                              <>
                                {" "}
                                <Link
                                  to={term.link}
                                  className="text-indigo-700 hover:underline font-medium"
                                >
                                  Läs mer →
                                </Link>
                              </>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </section>

        <div className="mt-16 card bg-indigo-50 border-indigo-100 text-center">
          <p className="text-sm text-indigo-800">
            Hittade du inte termen?{" "}
            <Link
              to="/kontakt"
              className="font-semibold underline underline-offset-2 hover:text-indigo-900"
            >
              Hör av dig så lägger vi till den
            </Link>
            .{" "}
            Redo att räkna på kostnader?{" "}
            <Link
              to="/#kalkylator"
              className="font-semibold underline underline-offset-2 hover:text-indigo-900"
            >
              Använd kalkylatorn
            </Link>
            .
          </p>
        </div>

        <RelatedArticles links={relatedArticles["ai-ordlista"]} />

        <Sources items={officialPricingSources} />
      </main>
    </>
  );
}
