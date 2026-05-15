import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <>
      <SEO
        title="Integritetspolicy"
        description="Läs om hur Aikostnad.se hanterar dina personuppgifter enligt GDPR."
        canonical="/integritet"
      />

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
            Senast uppdaterad: 2026-05-15
          </p>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              1. Personuppgiftsansvarig
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se är en gratistjänst. Tjänsten tillhandahålls utan
              organisationsnummer eller juridisk person just nu under MVP-fasen.
              Om du har frågor om behandlingen av dina personuppgifter kan du
              kontakta oss via e-post.
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
                <strong>E-postadresser (ej aktivt):</strong> Om vi i framtiden
                lägger till ett e-postformuläret (t.ex. för prisnotiser) kommer
                du att ge ditt explicita samtycke, och vi kommer tydligt
                informera om hur adressen används.
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
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              5. Dina rättigheter (GDPR)
            </h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                Enligt GDPR har du rätt att begära information om, rättelse av
                och radering av dina personuppgifter. Eftersom vi i nuläget inte
                samlar in identifieringsbara personuppgifter om besökare är
                detta praktiskt sett inte tillämpligt för kalkylatortjänsten.
              </p>
              <p>
                Har du frågor — kontakta oss via e-post.
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
