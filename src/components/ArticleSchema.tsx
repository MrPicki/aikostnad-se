import { Helmet } from "react-helmet-async";
import type { ArticleMeta } from "../data/articles";
import { author, parentOrganization } from "../config/author";

interface Props {
  article: ArticleMeta;
}

export function ArticleSchema({ article }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    image: "https://aikostnad.se/og-image.png",
    inLanguage: "sv-SE",
    url: article.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    author: {
      "@type": "Person",
      name: author.name,
      url: author.linkedIn || parentOrganization.url,
      sameAs: [author.linkedIn, parentOrganization.url].filter(Boolean),
    },
    publisher: {
      "@type": "Organization",
      name: "Aikostnad.se",
      url: "https://aikostnad.se",
      logo: {
        "@type": "ImageObject",
        url: "https://aikostnad.se/og-image.png",
      },
      parentOrganization: {
        "@type": "Organization",
        name: parentOrganization.name,
        url: parentOrganization.url,
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
