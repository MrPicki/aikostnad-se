import { HelmetProvider, Helmet } from "react-helmet-async";

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
  logo: "https://aikostnad.se/icon-512.png",
  description:
    "Svensk AI-kostnadskalkylator för företag, utvecklare och privatpersoner.",
  inLanguage: "sv-SE",
};

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="sv" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      {children}
    </HelmetProvider>
  );
}

export function SEO({ title, description, canonical, children }: SEOProps) {
  const defaultTitle =
    "AI Kostnad – Räkna ut vad AI, ChatGPT och API-användning kostar";
  const defaultDesc =
    "Använd Aikostnad.se för att snabbt räkna ut vad AI kostar per fråga, månad och år.";
  const siteUrl = "https://aikostnad.se";

  const fullTitle = title ? `${title} | Aikostnad.se` : defaultTitle;
  const desc = description ?? defaultDesc;
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const ogImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Aikostnad.se" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Aikostnad.se — räkna ut vad AI kostar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Helmet>
  );
}
