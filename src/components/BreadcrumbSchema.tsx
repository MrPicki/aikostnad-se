import { Helmet } from "react-helmet-async";

interface Crumb {
  name: string;
  url: string;
}

interface Props {
  items: Crumb[];
}

export function BreadcrumbSchema({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
