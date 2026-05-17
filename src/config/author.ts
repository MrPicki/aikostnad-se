// Single source of truth for author/organization info.
// Used by Om-page, Person/Organization JSON-LD schema, and author signature
// on long-form articles.
//
// IMPORTANT: Update linkedIn and ncomDescription with verified values before
// going live. Google's Helpful Content algorithm checks that author signals
// (sameAs links) actually resolve to real profiles.

export const author = {
  name: "Christoffer Nolét",
  role: "Grundare",
  bio: "Christoffer driver Ncom — ett svenskt tech-bolag som bygger praktiska webbverktyg. Aikostnad.se är ett av Ncom:s öppna projekt, med fokus på att göra AI-priser begripliga för svenska företag.",
  email: "hej@aikostnad.se",
  // TODO: fyll i din verkliga LinkedIn-URL innan launch
  linkedIn: "https://www.linkedin.com/in/christoffer-nolet/",
};

export const parentOrganization = {
  name: "Ncom",
  url: "https://ncom.se",
  description: "Ncom är ett svenskt tech-företag som bygger webbverktyg och digitala produkter.",
};
