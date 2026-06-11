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
            className="text-sm text-brand-700 hover:underline flex items-center gap-1"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>

        <article className="prose prose-gray max-w-none space-y-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Integritetspolicy
          </h1>
          <p className="text-gray-500 text-sm">
            Senast uppdaterad: 2026-06-11
          </p>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              1. Personuppgiftsansvarig
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se är en gratistjänst som drivs som ett oberoende
              initiativ från Sverige. Läs mer om sajten på{" "}
              <Link to="/om" className="text-brand-700 hover:underline">
                Om Aikostnad.se
              </Link>
              . Har du frågor om behandlingen av dina personuppgifter, kontakta
              oss på{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-700 hover:underline">
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
                <strong>Webbanalys (Google Analytics 4):</strong> Med ditt
                samtycke använder vi Google Analytics 4 för att förstå hur
                besökare använder sajten (sidor, trafikkällor, sessioner). GA4
                sätter cookies (_ga, _gid) och skickar data till Google LLC
                (USA). Utan samtycke skickas ingen analysdata.
              </p>
              <p>
                <strong>Annonser (Google AdSense):</strong> Med ditt samtycke
                visar vi annonser via Google AdSense som kan använda cookies för
                att visa relevanta annonser. Utan samtycke kan icke-personaliserade
                annonser visas utan cookies.
              </p>
              <p>
                <strong>E-postadresser (guide-utskick):</strong> Om du väljer att
                få en guide skickad till dig anger du din e-postadress i ett formulär
                och ger ditt explicita samtycke. Din adress sparas i vår databas
                (Supabase, se avsnitt 4) och används för att skicka den begärda
                guiden via Resend. Om du också samtycker till marknadsföring kan vi
                skicka enstaka uppdateringar om nya AI-priser och guider (max ~1/mån).
                Du kan när som helst begära radering genom att skriva till{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-700 hover:underline">
                  {siteConfig.contactEmail}
                </a>{" "}
                eller svara på ett av våra mail. Vi delar aldrig din adress med tredje part.
              </p>
              <p>
                <strong>Lagringstid:</strong> Din e-postadress sparas tills du begär
                radering, dock längst 24 månader efter att den samlades in. Därefter
                gallras den automatiskt.
              </p>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              3. Cookies och samtycke
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                Vi använder Google Consent Mode v2. Alla analyticscookies och
                annonscookies är blockerade som standard och aktiveras{" "}
                <strong>endast om du aktivt godkänner</strong> via cookiebannern.
                Du kan när som helst återkalla eller ändra ditt samtycke via
                länken <strong>"Cookie-inställningar"</strong> i sidfoten på alla
                sidor — det är lika enkelt som att ge samtycket. Du kan också
                rensa din webbläsares localStorage (nyckel:{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">cookie_consent_v1</code>).
              </p>
              <p>
                <strong>Rättslig grund:</strong> Samtycke enligt GDPR art. 6(1)(a).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Cookie</th>
                      <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Ändamål</th>
                      <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Lagringstid</th>
                      <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">Part</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-gray-200">_ga, _ga_*</td>
                      <td className="p-2 border border-gray-200">Webbanalys (Google Analytics 4)</td>
                      <td className="p-2 border border-gray-200">2 år</td>
                      <td className="p-2 border border-gray-200">Google LLC</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-gray-200">_gid</td>
                      <td className="p-2 border border-gray-200">Sessionsanalys (GA4)</td>
                      <td className="p-2 border border-gray-200">24 timmar</td>
                      <td className="p-2 border border-gray-200">Google LLC</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-200">AdSense-cookies</td>
                      <td className="p-2 border border-gray-200">Personaliserade annonser</td>
                      <td className="p-2 border border-gray-200">Upp till 13 månader</td>
                      <td className="p-2 border border-gray-200">Google LLC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                <strong>Google Analytics 4 (Google LLC, USA):</strong> Med ditt
                samtycke skickas anonymiserad användningsdata till Google.
                Google är personuppgiftsbiträde. Dataöverföring till USA sker
                under EU-godkänt ramverk (EU-U.S. Data Privacy Framework).
                Googles integritetspolicy:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                  policies.google.com/privacy
                </a>.
              </p>
              <p>
                <strong>Google AdSense (Google LLC, USA):</strong> Med ditt
                samtycke kan Google visa personaliserade annonser. Utan samtycke
                kan icke-personaliserade annonser visas. Googles annonspolicy:{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                  policies.google.com/technologies/ads
                </a>.
              </p>
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
                <strong>Vercel Analytics:</strong> Vi använder Vercel Analytics
                för aggregerad besöksstatistik. Tjänsten är cookiefri och sparar
                inga identifierare i din webbläsare — besök räknas via en
                anonymiserad hash som inte kan kopplas till dig som person.
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
              <p>Enligt GDPR har du följande rättigheter:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-1">
                <li><strong>Tillgång</strong> — rätt att få veta vilka uppgifter vi behandlar om dig</li>
                <li><strong>Rättelse</strong> — rätt att få felaktiga uppgifter rättade</li>
                <li><strong>Radering</strong> — rätt att begära att dina uppgifter raderas</li>
                <li><strong>Invändning</strong> — rätt att invända mot behandling</li>
                <li><strong>Återkalla samtycke</strong> — du kan när som helst återkalla ditt cookie-samtycke
                  utan att det påverkar lagligheten av behandling som skett dessförinnan</li>
                <li><strong>Klagomål</strong> — rätt att inge klagomål till Integritetsskyddsmyndigheten (IMY)
                  på <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">imy.se</a>
                </li>
              </ul>
              <p>
                Har du frågor — kontakta oss på{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-700 hover:underline">
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
