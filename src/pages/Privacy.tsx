import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../config/siteConfig";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: "https://aikostnad.se" },
    { "@type": "ListItem", position: 2, name: "Integritetspolicy", item: "https://aikostnad.se/integritet" },
  ],
};

export function Privacy() {
  return (
    <>
      <SEO
        title="Integritetspolicy"
        description="Läs om hur Aikostnad.se hanterar dina personuppgifter enligt GDPR."
        canonical="/integritet"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none space-y-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Integritetspolicy
          </h1>
          <p className="text-gray-500 text-sm">
            Senast uppdaterad: 2026-05-16
          </p>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              1. Personuppgiftsansvarig
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se är en gratistjänst som drivs som ett oberoende
              initiativ från Sverige. Läs mer om sajten på{" "}
              <Link to="/om" className="text-indigo-600 hover:underline">
                Om Aikostnad.se
              </Link>
              . Har du frågor om behandlingen av dina personuppgifter, kontakta
              oss på{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 hover:underline">
                {siteConfig.contactEmail}
              </a>.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              2. Vilka uppgifter samlar vi in?
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                <strong>Kalkylatorn och tokenräknaren</strong> arbetar helt
                lokalt i din webbläsare. Vi skickar inte den text du klistrar in
                till någon server. Inga beräkningar sparas.
              </p>
              <p>
                <strong>Webbanalys (Vercel Analytics):</strong> Vi kan använda
                Vercel Analytics för att förstå sidtrafik. Detta samlar
                aggregerad, anonym data om besök — inga cookies sätts, inga
                personuppgifter lagras.
              </p>
              <p>
                <strong>E-postadresser (guide-utskick):</strong> Om du väljer att
                få en guide skickad till dig anger du din e-postadress i ett formulär
                och ger ditt explicita samtycke. Din adress sparas i vår databas
                (Supabase, se avsnitt 4) och används för att skicka den begärda
                guiden via Resend. Om du också samtycker till marknadsföring kan vi
                skicka enstaka uppdateringar om nya AI-priser och guider (max ~1/mån).
                Du kan när som helst begära radering genom att skriva till{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 hover:underline">
                  {siteConfig.contactEmail}
                </a>{" "}
                eller svara på ett av våra mail. Vi delar aldrig din adress med tredje part.
              </p>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              3. Cookies
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                Aikostnad.se i sin nuvarande form använder inga spårningscookies
                eller tredjepartscookies.
              </p>
              <p>
                Valutakursen cachas tillfälligt via Vercel&apos;s edge network —
                detta är en teknisk cache, inte en användar-cookie.
              </p>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              4. Tredjeparter
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                <strong>Frankfurter API (frankfurter.app):</strong> Vi hämtar
                live-valutakurs (USD/SEK) från Frankfurter API. Det är en öppen
                tjänst utan registrering. Din IP-adress kan loggas av
                Frankfurter API vid anropet.
              </p>
              <p>
                <strong>Vercel:</strong> Webbplatsen hostas på Vercel (USA).
                Vercel kan logga teknisk information om förfrågningar (IP,
                user-agent) som en del av normal serverloggning.
              </p>
              <p>
                <strong>Supabase:</strong> Vi använder Supabase (EU-region) för att
                spara e-postadresser som lämnats i guide-formuläret. Data lagras
                krypterat och nås bara via vår backend med service-role-nyckel.
              </p>
              <p>
                <strong>Resend:</strong> Guide-mail skickas via Resend (USA). Din
                e-postadress och guideinnehållet skickas till Resend för leverans.
                Resend&apos;s datapolicy finns på resend.com/legal/privacy-policy.
              </p>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              5. Dina rättigheter (GDPR)
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                Enligt GDPR har du rätt att begära information om, rättelse av
                och radering av dina personuppgifter. Om du lämnat din
                e-postadress i guide-formuläret kan du när som helst begära att
                vi raderar den.
              </p>
              <p>
                Har du frågor — kontakta oss på{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-600 hover:underline">
                {siteConfig.contactEmail}
              </a>.
              </p>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              6. Ändringar i policyn
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Om vi gör väsentliga ändringar i denna policy uppdateras datumet
              längst upp på sidan. Vi rekommenderar att du besöker sidan
              regelbundet.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
