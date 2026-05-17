import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { ArticleByline } from "../components/ArticleByline";
import { LandingFAQ, type FAQItem } from "../components/LandingFAQ";
import { RelatedArticles } from "../components/RelatedArticles";
import { relatedArticles } from "../data/relatedArticles";
import { articles } from "../data/articles";

const article = articles["ai-chatbot-kostnad"];

const faqs: FAQItem[] = [
  {
    question: "Vad kostar det att bygga en AI-chatbot?",
    answer:
      "För en hobby-bot med ca 50 frågor per dag landar AI-kostnaden på under 20 kr/månad om du använder GPT-4o mini eller Claude Haiku. För ett småföretag med 500 frågor per dag är spannet 150–500 kr/månad beroende på modellval och svarens längd. För 5 000 frågor per dag (medelstor B2C-applikation) räkna med 1 500–5 000 kr/månad. Lägg på 100–300 kr för hosting och eventuell vektor-databas om du använder RAG.",
  },
  {
    question: "Är det billigare att använda ChatGPT Plus eller API?",
    answer:
      "ChatGPT Plus (210 kr/mån) är billigare om bara 1–2 personer använder boten direkt via chattgränssnittet. Bygger du in AI i en egen applikation som ska användas av många kunder eller anställda är API nästan alltid billigare per användare — och du betalar bara för faktisk användning. Brytpunkten ligger ungefär vid 10 aktiva användare eller 200 frågor per dag.",
  },
  {
    question: "Vilken AI-modell ger bäst pris/prestanda för en chatbot?",
    answer:
      "För svenskspråkig kundtjänst där svaren ska vara naturliga rekommenderar vi Claude Haiku 4.5 ($1/$5 per Mtok) eller Claude Sonnet 4.6 om kvalitet är kritisk. För engelska eller enklare scenarier är GPT-4o mini ($0,15/$0,60) ojämförbart billigt — 8× billigare än Haiku per token. Mistral Small är ett bra europeiskt alternativ för kostnadsmedvetna byggare.",
  },
  {
    question: "Hur mycket kan prompt caching sänka kostnaden?",
    answer:
      "Prompt caching sänker kostnaden för återanvänd input (typiskt system-prompt) till 10 % av normalt pris hos Anthropic. För en chatbot med 2 000 ord lång system-prompt och 10 000 förfrågningar per dag motsvarar det ca 90 % besparing på input-kostnaden — vilket i praktiken halverar totalkostnaden eftersom input är cirka hälften av notan. Det är Claudes mest underutnyttjade fördel.",
  },
  {
    question: "Vad mer än AI-kostnad behöver jag budgetera för?",
    answer:
      "Hosting: 0–200 kr/mån (Vercel/Render gratis tier räcker långt). Vektor-databas vid RAG: 0–250 kr/mån (Supabase pgvector eller Pinecone starter). Loggning/monitoring: 0–100 kr/mån. Total infrastructure-kostnad är vanligen 10–25 % av LLM-kostnaden för små botar och 5–15 % för större. Med andra ord — LLM-kostnaden dominerar nästan alltid.",
  },
];

export function AiChatbotKostnad() {
  return (
    <>
      <SEO
        title="Vad kostar en AI-chatbot? Komplett guide 2026"
        description="Vad kostar det att bygga en AI-chatbot? Konkreta budgetexempel för hobby, småföretag och B2C — i svenska kronor. Plus hur du sänker kostnaden med rätt modellval."
        canonical="/ai-chatbot-kostnad"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "AI-chatbot kostnad", url: "https://aikostnad.se/ai-chatbot-kostnad" },
      ]} />
      <ArticleSchema article={article} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Vad kostar en AI-chatbot? Praktisk guide 2026
          </h1>
          <ArticleByline article={article} />
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Det korta svaret: <strong>20 kr/mån</strong> för en hobby-bot,{" "}
            <strong>500 kr/mån</strong> för ett seriöst B2C-fall,{" "}
            <strong>5 000 kr/mån</strong> för medelstor produktion. Det långa
            svaret beror på fyra saker — som vi går igenom härmed konkreta
            exempel i SEK.
          </p>

          {/* Four factors */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">De fyra faktorerna som driver kostnaden</h2>
            <p className="text-gray-700 leading-relaxed">
              När du bygger en AI-chatbot är priset per token sällan det
              viktigaste. Det är hur du kombinerar fyra variabler som avgör vad
              du betalar i slutet av månaden:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-4 border-indigo-400 pl-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">1. Volym (frågor per dag)</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Linjärt — dubbla frågor, dubbla kostnaden. 50 frågor/dag är
                  hobbynivå. 500 är småföretag. 5 000 är medelstor B2C.
                  50 000+ är där du måste börja optimera ordentligt.
                </p>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">2. Modellnivå (mini vs flaggskepp)</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Mini-modeller (GPT-4o mini, Claude Haiku, Gemini Flash) är{" "}
                  <strong>10–20 gånger billigare</strong> än flaggskeppsmodeller.
                  De räcker för 80 % av chatbot-uppgifter — klassificering,
                  enkla svar, FAQ. Reservera flaggskeppen för komplex
                  resonemang.
                </p>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">3. Längd på input och output</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Långa kontexter och långa svar dominerar notan.{" "}
                  <strong>Output är 4× dyrare per token än input</strong> hos
                  de flesta leverantörer — så att begränsa svarens längd från
                  300 ord till 100 ord kan sänka totalkostnaden med 40 %.
                </p>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">4. Caching av återanvänd kontext</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Om din bot har en lång system-prompt eller alltid skickar
                  med samma instruktioner — använd prompt caching. Anthropic
                  ger 90 % rabatt på cached input. För en chatbot med 2 000-
                  ord systemprompt och hög volym kan caching halvera kostnaden.
                </p>
              </div>
            </div>
          </section>

          {/* Three budgets */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Tre konkreta budget-exempel</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi räknar med svenska texter (1,3 tokens/ord), 100 ord input och
              200 ord output per fråga, 22 arbetsdagar per månad, och 1 USD =
              10,50 SEK. Priser per maj 2026.
            </p>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="text-lg font-bold text-green-900 mb-2">Hobby / soloprenör — 50 frågor/dag</h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-3">
                En personlig assistent eller en bot för din egen webbsida med
                låg trafik. 1 100 förfrågningar per månad.
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>GPT-4o mini: <strong>~2 kr/mån</strong></li>
                <li>Claude Haiku 4.5: <strong>~17 kr/mån</strong></li>
                <li>GPT-4o (premium): <strong>~34 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                💡 På den här volymen är skillnaden mellan modellerna nästan
                irrelevant. Välj baserat på kvalitet, inte pris.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Småföretag — 500 frågor/dag</h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-3">
                Kundtjänst-bot för en webbshop eller intern AI-assistent för
                ett team på 10 personer. 11 000 förfrågningar per månad.
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>GPT-4o mini: <strong>~20 kr/mån</strong></li>
                <li>Claude Haiku 4.5: <strong>~165 kr/mån</strong></li>
                <li>GPT-4o: <strong>~338 kr/mån</strong></li>
                <li>Claude Sonnet 4.6: <strong>~496 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                💡 Sweet spot — billig nog för B2B-marginaler, dyr nog för
                ordentlig kvalitet. Det vi rekommenderar att de flesta
                applikationer börjar i.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Medelstor B2C — 5 000 frågor/dag</h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-3">
                Publik chatbot för en webbsida med stor trafik eller en SaaS-
                produkt med tusentals användare. 110 000 förfrågningar per
                månad.
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>GPT-4o mini: <strong>~200 kr/mån</strong></li>
                <li>Claude Haiku 4.5: <strong>~1 650 kr/mån</strong></li>
                <li>GPT-4o: <strong>~3 380 kr/mån</strong></li>
                <li>Claude Sonnet 4.6: <strong>~4 960 kr/mån</strong></li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                💡 Här börjar optimering verkligen löna sig. Prompt caching
                och hybrid-routing (mini default, escalate vid behov) kan
                halvera kostnaden.
              </p>
            </div>
          </section>

          {/* How to reduce cost */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Fyra sätt att sänka kostnaden</h2>
            <p className="text-gray-700 leading-relaxed">
              Innan du börjar förhandla med leverantören — de här fyra greppen
              är vad de flesta produktions-chatbots gör för att hålla notan
              nere:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Använd mini-modeller där det räcker.</strong> Klassi-
                ficering, kategorisering, enkla FAQ-svar — allt det här klarar{" "}
                <Link to="/billigaste-ai" className="text-indigo-600 hover:underline">de billigaste mini-modellerna</Link>{" "}
                lika bra som flaggskeppen.
              </li>
              <li>
                <strong>Begränsa output-längden.</strong> Skriv tydligt i din
                prompt att svaret ska vara under 100 ord. Output är 4× dyrare
                än input — kortare svar är direktbesparing.
              </li>
              <li>
                <strong>Använd prompt caching</strong> hos Anthropic eller
                automatisk caching hos OpenAI. För en chatbot med fast system-
                prompt över 1 024 tokens är detta nästan alltid lönsamt.
              </li>
              <li>
                <strong>Routing — bygg en hybrid.</strong> Skicka 90 % av
                trafiken till en mini-modell. Eskalera till flaggskeppet
                endast när mini-modellen flaggar att den är osäker. Spar
                70–80 % av kostnaden mot att köra allt på flaggskepp.
              </li>
            </ol>
          </section>

          {/* What else to budget */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Vad du också behöver budgetera för</h2>
            <p className="text-gray-700 leading-relaxed">
              LLM-kostnaden dominerar för de flesta chatbots, men det finns
              annat:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Hosting / serverless:</strong> 0–200 kr/månad. Vercel,
                Cloudflare Workers och Render har generösa gratis-tier som
                räcker långt. Du betalar inte alls förrän du har riktig
                trafik.
              </li>
              <li>
                <strong>Vektor-databas (om du gör RAG):</strong> 0–250 kr/mån.
                Supabase pgvector är gratis upp till 500 MB. Pinecone starter
                ligger på $50/mån när du behöver mer.
              </li>
              <li>
                <strong>Loggning och monitoring:</strong> 0–100 kr/mån. Helicone,
                LangSmith eller Vercel Analytics räcker långt på gratis-tier.
              </li>
              <li>
                <strong>Utveckling och drift:</strong> Den största dolda
                kostnaden. Räkna med 20–40 timmar för att få upp en bra
                production-bot inkl. säkerhet, fallback och evals.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              För en typisk produktions-chatbot är{" "}
              <strong>LLM-kostnaden 70–90 % av månadsnotan</strong> — resten är
              småmynt. Det betyder att modellvalet är den ojämförbart viktigaste
              kostnadsbeslutet.
            </p>
          </section>

          {/* When NOT to build */}
          <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">När bygga är inte värt det</h2>
            <p className="text-gray-700 leading-relaxed">
              Inte alla problem behöver en egenbyggd chatbot. Här är när du{" "}
              <strong>inte</strong> ska bygga:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Under 100 frågor per dag</strong> — använd ChatGPT Plus
                eller Claude Pro (210 kr/mån). En egenbyggd lösning lönar sig
                inte.
              </li>
              <li>
                <strong>Endast 1–3 användare totalt</strong> — abonnemang per
                person är billigare än API + frontend att bygga och underhålla.
              </li>
              <li>
                <strong>När fast pris är ett affärskrav</strong> — vissa
                B2B-kunder vill ha förutsägbar kostnad. Då passar ett
                Enterprise-abonnemang bättre än rörlig API-prissättning.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              För en kundtjänst med 500–5 000 frågor/dag är däremot en egen
              chatbot nästan alltid billigare än ens en deltidsanställd
              kundtjänstmedarbetare — och tillgänglig dygnet runt.
            </p>
          </section>

          {/* CTA */}
          <section className="space-y-3 mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-0">Räkna på din specifika idé</h2>
            <p className="text-gray-700 leading-relaxed">
              Talen ovan är generella riktmärken. Verklig kostnad beror på din
              volym, svarslängd och hur väl du kan utnyttja caching. På{" "}
              <Link to="/" className="text-indigo-600 hover:underline font-medium">
                startsidan
              </Link>{" "}
              kan du beskriva din chatbot-idé i fri text — vi använder AI för
              att uppskatta månadskostnaden i SEK för rätt modell.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              Vill du gå djupare per modell?
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <Link to="/vad-kostar-chatgpt" className="text-indigo-600 hover:underline">
                  Räkna specifikt på ChatGPT (GPT-4o och 4o mini)
                </Link>
              </li>
              <li>
                <Link to="/claude-pris" className="text-indigo-600 hover:underline">
                  Räkna specifikt på Claude Haiku och Sonnet
                </Link>
              </li>
              <li>
                <Link to="/chatgpt-vs-claude" className="text-indigo-600 hover:underline">
                  Jämför ChatGPT vs Claude för chatbots
                </Link>
              </li>
            </ul>
          </section>

          {/* Summary */}
          <section className="space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Sammanfattning</h2>
            <p className="text-gray-700 leading-relaxed">
              En AI-chatbot kostar idag <strong>20–5 000 kr/månad</strong>{" "}
              beroende på volym och modellval. Mini-modeller (GPT-4o mini,
              Claude Haiku) räcker för 80 % av användningsfallen. Begränsa
              output-längden, använd prompt caching, och välj rätt modell per
              uppgift — det är de tre besluten som bestämmer om din nota
              landar på 200 kr eller 2 000 kr.
            </p>
            <p className="text-xs text-gray-500 mt-4 bg-gray-50 rounded-lg px-3 py-2">
              Priser verifierade 2026-05-15. AI-priser ändras varje månad —
              dubbelkolla alltid mot leverantörens prislista innan ni
              beslutar.
            </p>
          </section>
        </article>

        <RelatedArticles links={relatedArticles["ai-chatbot-kostnad"]} />

        <LandingFAQ items={faqs} heading="Vanliga frågor om AI-chatbot-kostnad" />
      </main>
    </>
  );
}
