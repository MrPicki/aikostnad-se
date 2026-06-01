import { HelmetProvider, Helmet } from "react-helmet-async";
import { siteConfig } from "../config/siteConfig";
import { WebsiteSchema } from "./SchemaBlocks";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  children?: React.ReactNode;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aikostnad.se",
  url: "https://aikostnad.se",
  logo: "https://aikostnad.se/og-image.png",
  email: siteConfig.contactEmail,
  description:
    "Svensk kalkylator för AI-kostnader. Vi översätter API-priser och abonnemang från ChatGPT, Claude, Gemini och fler till svenska kronor.",
  areaServed: { "@type": "Country", name: "Sverige" },
  knowsAbout: [
    "AI-kostnader",
    "ChatGPT-priser",
    "Claude-priser",
    "Gemini-priser",
    "API-prissättning",
    "Tokenisering",
    "AI för företag",
    "Gratis AI-verktyg",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.contactEmail,
    contactType: "customer support",
    availableLanguage: "Swedish",
  },
};

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="sv" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <WebsiteSchema />
      {children}
    </HelmetProvider>
  );
}

export function SEO({ title, description, canonical, children }: SEOProps) {
  const defaultTitle =
    "AI Kostnad Kalkylator — Räkna ut vad ChatGPT, Claude och Gemini kostar i SEK";
  const defaultDesc =
    "Räkna ut vad AI kostar per månad i svenska kronor. Jämför ChatGPT, Claude, Gemini och fler — gratis kalkylator med live-valutakurs.";
  const siteUrl = "https://aikostnad.se";

  const fullTitle = title ? `${title} | Aikostnad.se` : defaultTitle;
  const desc = description ?? defaultDesc;
  // Normalise canonical: accept either a path ("/claude-pris") or a full URL
  // and always emit exactly one absolute URL — prevents the double-prefixed
  // "https://aikostnad.sehttps://…" canonical bug. Also strip query/hash so the
  // calculator's ?model=/?input= share links don't create duplicate-content.
  const rawPath = (canonical ?? "").replace(/^https?:\/\/aikostnad\.se/i, "");
  const cleanPath = rawPath.split("?")[0].split("#")[0];
  const url = cleanPath ? `${siteUrl}${cleanPath}` : siteUrl;
  const ogImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="sv-SE" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="Aikostnad.se" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Aikostnad.se — räkna ut vad AI kostar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aikostnad" />
      <meta name="twitter:creator" content="@aikostnad" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Helmet>
  );
}
