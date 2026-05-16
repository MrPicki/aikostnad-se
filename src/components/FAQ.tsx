import { useState } from "react";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Vad kostar ChatGPT API per månad?",
    answer:
      "Kostnaden beror på hur många tokens du skickar och tar emot. GPT-4o kostar $2,50/Mtok (input) och $10/Mtok (output). Med 100 frågor per dag á 100 input-ord och 200 output-ord landar månadskostnaden på ungefär 100–300 kr. För GPT-4o mini hamnar samma volym på cirka 10–30 kr/månad. Använd vår kalkylator för ett exakt estimat.",
  },
  {
    question: "Vad är ett token?",
    answer:
      "Ett token är en textbit som en AI-modell bearbetar — ungefär 0,75 ord på engelska. För svenska texter (med å, ä, ö och långa sammansatta ord) är det däremot ca 1,3 tokens per ord. Det betyder att svenska texter kostar mer att processa än engelska, vilket vår kalkylator tar hänsyn till. Klistra in en text i vår tokenräknare för att se exakt hur många tokens den innehåller.",
  },
  {
    question: "Vilken AI-modell är billigast 2026?",
    answer:
      "Bland kommersiella API:er är DeepSeek V3 ($0,28/$0,42 per Mtok), Mistral Small och GPT-4o mini billigast. Gemini 2.5 Flash är billig på input men dyrare på output. För open-weight-modeller är Llama 3.3 70B via Groq snabb och prisvärd, och DeepSeek-modellerna kan även köras self-hosted. Se vår jämförelsetabell för aktuella priser sorterade per fråga.",
  },
  {
    question: "Vad kostar Claude jämfört med ChatGPT?",
    answer:
      "Claude Haiku 4.5 ($1/$5 per Mtok) ligger ungefär i samma härad som GPT-4o mini ($0,15/$0,60) men är något dyrare per token. Claude Sonnet 4.6 ($3/$15) är jämförbar i pris med GPT-4o ($2,50/$10), men har 200K context. Claude Opus 4.7 ($5/$25) är dyrare än GPT-4.1 ($2/$8). För svenska texter presterar Claude och GPT-4 likvärdigt; valet hänger oftare på funktioner som promptcaching eller verktygsanvändning.",
  },
  {
    question: "Hur räknar jag ut AI-kostnaden för en chatbot?",
    answer:
      "Estimera tre saker: (1) genomsnittligt antal ord i användarens fråga + tidigare konversation som skickas med, (2) genomsnittligt antal ord i botens svar, och (3) antal frågor per dag. Multiplicera med antal användare. Vår kalkylator gör beräkningen automatiskt — du fyller bara in värdena och får både dags-, månads- och årskostnad direkt.",
  },
  {
    question: "Skiljer sig kostnaden för svenska och engelska AI-svar?",
    answer:
      "Ja. Svenska texter tokeniseras till fler tokens per ord jämfört med engelska — ungefär 1,3 vs 0,75. Det gör att en prompt på 100 svenska ord kostar cirka 73% mer att bearbeta än 100 engelska ord, allt annat lika. Tips: skriv dina systempromptar på engelska för att sänka kostnaden — det påverkar inte modellens förmåga att svara på svenska.",
  },
  {
    question: "Vad är prompt caching och hur sparar man pengar på det?",
    answer:
      "Prompt caching innebär att AI-leverantören återanvänder en del av en tidigare prompt (typiskt en lång systemprompt eller dokumentkontext) istället för att processa hela inputen på nytt. Anthropic och OpenAI ger upp till 90% rabatt på cachad input. För en chatbot med en 5000-tokens systemprompt kan caching halvera månadskostnaden. Vi planerar att lägga till caching-stöd i kalkylatorn — i nuläget visar vi standardpriserna utan rabatt.",
  },
  {
    question: "Vad kostar det att bygga en AI-assistent för mitt företag?",
    answer:
      "För en intern assistent med 10–20 anställda, 50 frågor per användare per dag, och en genomsnittlig prompt på 200 ord in / 300 ord ut, landar månadskostnaden typiskt på 200–2000 kr/månad beroende på modellval. GPT-4o mini och Claude Haiku 4.5 är populära val här. Lägg på utvecklingskostnad (typiskt 50–200k kr för en MVP) och eventuell vektor-databas för internt material.",
  },
  {
    question: "Hur konverterar ni priset till kronor?",
    answer:
      "Vi hämtar en live-valutakurs (USD/SEK) dagligen via Frankfurter API. Om hämtningen misslyckas används en fallback-kurs på 10,50 kr. Kursen visas alltid synligt i kalkylatorn så du vet vilket underlag som används. Du kan också alltid jämföra USD-priset bredvid SEK-priset i resultatkorten.",
  },
  {
    question: "Hur ofta uppdateras AI-priserna på sidan?",
    answer:
      "Vi siktar på att verifiera priserna månadsvis — AI-priser ändras relativt ofta, ibland från en månad till nästa. Datumet för senaste verifiering visas i kalkylatorn och i sidfoten, och varje modell har sitt eget verifieringsdatum. Om du hittar ett felaktigt pris, kontakta oss gärna.",
  },
  {
    question: "Kan jag använda kalkylatorn för att beräkna kostnaden för min SaaS-produkt?",
    answer:
      "Absolut. Fyll i antal användare, genomsnittligt antal frågor per dag, och beräknad input/output-längd. Kalkylatorn ger dig månadskostnaden för hela din användarbas, vilket är perfekt för att sätta rätt pris på din produkt. Tumregel: AI-kostnaden bör vara max 20–30% av abonnemangspriset om du vill ha sunda marginaler.",
  },
  {
    question: "Vad kostar det att analysera ett avtal eller dokument med AI?",
    answer:
      "Ett kontrakt på ~10 sidor (cirka 5000 ord) blir ungefär 6500 tokens som input. Med Claude Sonnet 4.6 ($3/$15 per Mtok) och en sammanfattning på 500 ord (~650 tokens) blir kostnaden cirka 0,03 USD eller 30 öre per analys. För 50 dokument per dag landar månadskostnaden på cirka 33 kr. Långa dokument (50+ sidor)? Använd Gemini 2.5 Pro med dess 1M context.",
  },
  {
    question: "Hur många tokens får plats i en AI-modells context-fönster?",
    answer:
      "Kontextfönstret varierar mellan modeller. GPT-4.1 och Gemini 2.5 Flash hanterar 1 miljon tokens (cirka 750k svenska ord, eller en hel bokserie). Claude-modellerna ligger på 200k tokens. GPT-4o och Llama 3.3 ligger på 128k. För korta chattar räcker 32k mer än väl — för dokumentanalys eller långa konversationer bör du välja en modell med större context.",
  },
  {
    question: "Är open-source-modeller alltid billigare?",
    answer:
      "Inte alltid. Open-weight-modeller som Llama 3.3 70B och DeepSeek V3 är billiga via providers som Groq och DeepSeek API. Self-hostat blir kostnaden främst GPU-hyra — typiskt 5–20 kr/timme för en H100 via Replicate eller RunPod. Det blir lönsamt när du har hög och jämn volym; för låg eller variabel volym vinner kommersiella API:er nästan alltid eftersom du bara betalar för faktisk användning.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        <span
          className={`flex-shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section aria-label="Vanliga frågor">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Vanliga frågor om AI-kostnader
      </h2>

      <div className="card divide-y divide-gray-200 p-0 px-6">
        {faqs.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
