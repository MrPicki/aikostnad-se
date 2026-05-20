import { Helmet } from "react-helmet-async";

const SITE_URL = "https://aikostnad.se";

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aikostnad.se",
    url: SITE_URL,
    inLanguage: "sv-SE",
    description:
      "Sveriges kalkylator för AI-kostnader. Räkna ut vad ChatGPT, Claude, Gemini och andra AI-modeller kostar per månad i svenska kronor.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Aikostnad.se",
      url: SITE_URL,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface SoftwareAppProps {
  name?: string;
  url: string;
  description: string;
}

export function SoftwareAppSchema({
  name = "Aikostnad.se AI-kostnadskalkylator",
  url,
  description,
}: SoftwareAppProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web-based)",
    inLanguage: "sv-SE",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Räknar AI-kostnad i svenska kronor",
      "Live SEK/USD-valutakurs",
      "Stödjer 11 AI-modeller (ChatGPT, Claude, Gemini m.fl.)",
      "Justering för svenska språkets tokenisering",
      "Tokenräknare",
      "Prisjämförelse abonnemang och API",
    ],
    creator: {
      "@type": "Organization",
      name: "Aikostnad.se",
      url: SITE_URL,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface HowToStep {
  name: string;
  text: string;
}

interface HowToProps {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}

export function HowToSchema({ name, description, totalTime, steps }: HowToProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: "sv-SE",
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface SpeakableProps {
  selectors?: string[];
}

export function SpeakableSchema({
  selectors = [".tldr", "h1", ".speakable"],
}: SpeakableProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface PriceOffer {
  name: string;
  priceSek: number;
  description?: string;
  url?: string;
}

interface PriceOfferProps {
  productName: string;
  description: string;
  brand?: string;
  url: string;
  offers: PriceOffer[];
}

export function PriceOfferSchema({
  productName,
  description,
  brand,
  url,
  offers,
}: PriceOfferProps) {
  const prices = offers.map((o) => o.priceSek);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description,
    url,
    ...(brand
      ? {
          brand: {
            "@type": "Brand",
            name: brand,
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SEK",
      lowPrice: Math.min(...prices).toString(),
      highPrice: Math.max(...prices).toString(),
      offerCount: offers.length.toString(),
      offers: offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        price: o.priceSek.toString(),
        priceCurrency: "SEK",
        availability: "https://schema.org/InStock",
        ...(o.description ? { description: o.description } : {}),
        ...(o.url ? { url: o.url } : {}),
      })),
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface DefinedTermProps {
  name: string;
  description: string;
  url: string;
}

export function DefinedTermSchema({ name, description, url }: DefinedTermProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "AI-ordlista — Aikostnad.se",
      url: `${SITE_URL}/ai-ordlista`,
    },
    url,
    inLanguage: "sv-SE",
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
