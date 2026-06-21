import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export function Kontakt() {
  return (
    <>
      <SEO
        title="Kontakta oss — Aikostnad.se"
        description="Frågor om AI-priser, felaktiga modellpriser eller samarbeten? Hör av dig till oss på hej@aikostnad.se. Vi svarar inom 1–2 arbetsdagar."
        canonical="/kontakt"
      />
      <BreadcrumbSchema items={[
        { name: "Hem", url: "https://aikostnad.se/" },
        { name: "Kontakta oss", url: "https://aikostnad.se/kontakt" },
      ]} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="text-sm text-brand-700 hover:underline flex items-center gap-1">
            ← Tillbaka till startsidan
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Kontakta oss</h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          Har du frågor om AI-priser, hittat en felaktighet i vår data, eller vill du samarbeta?
          Vi välkomnar all återkoppling. E-posta oss och vi återkommer inom 1–2 arbetsdagar.
        </p>

        <div className="space-y-6">

          {/* Primary contact */}
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              E-post
            </h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-xl font-semibold text-brand-700 hover:text-brand-700 transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Det enda sättet att nå oss just nu — inga chattar, inga formulär.
              Vi svarar normalt inom <strong>1–2 arbetsdagar</strong> (måndag–fredag).
            </p>
          </div>

          {/* Use cases */}
          <div className="card space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Vad kan du höra av dig om?
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Felaktiga priser</strong> — om du
                  hittar ett modellpris som stämmer fel är vi tacksamma för ett tips.
                  Bifoga gärna en länk till leverantörens officiella prissida så kan
                  vi verifiera och uppdatera snabbt.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Saknade modeller</strong> — finns
                  det en AI-modell du vill se i jämförelsetabellen? Ange modellens
                  namn och leverantör så ser vi om vi kan lägga till den.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Samarbeten</strong> — partnerskap,
                  gästartiklar eller länkbyten. Bifoga gärna en kortfattad beskrivning
                  av ditt projekt och vad du vill samarbeta om.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Tekniska frågor</strong> — om hur
                  kalkylatorn räknar, hur valutakursen hämtas eller hur token-beräkningen
                  för svenska fungerar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">→</span>
                <span>
                  <strong className="text-gray-800">Allmänna frågor</strong> — om
                  AI-kostnader, val av modell, eller hur du bäst kommer igång med
                  AI för ditt specifika användningsfall.
                </span>
              </li>
            </ul>
          </div>

          {/* What happens with a price report */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Vad händer när du anmäler ett fel pris?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Vi tar prisriktighet på stort allvar — felaktiga priser leder till
              felaktiga budgetar. När du skickar en prisavvikelse, gärna med en
              länk till den officiella prissidan, granskar vi uppgiften manuellt.
              Stämmer avvikelsen uppdaterar vi kalkylatorn inom 1–3 arbetsdagar
              och bekräftar uppdateringen i svaret till dig.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Vi uppdaterar också det manuella verifieringsdatumet som visas längst
              ner på startsidan. Vill du bli notifierad automatiskt när priser
              ändras framöver kan du prenumerera via{" "}
              <Link to="/" className="text-brand-700 hover:underline">
                prisavisering på startsidan
              </Link>
              .
            </p>
          </div>

          {/* About the site / responsible publisher */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Om Aikostnad.se</h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Aikostnad.se är en oberoende prisjämförelsesajt för AI-modeller och
                AI-tjänster riktad till svenska användare. Sajten hjälper privatpersoner,
                frilansare och företag att förstå vad AI faktiskt kostar i svenska kronor
                — utan att behöva räkna om dollar-priser eller gissa token-volymer manuellt.
              </p>
              <p>
                <strong>Ansvarig utgivare:</strong> Christoffer Nolet.
              </p>
              <p>
                Sajten drivs via företaget <strong>Ncom (enskild firma)</strong>.
                Fullständiga företagsuppgifter inklusive organisationsnummer och
                adress finns på{" "}
                <a
                  href="https://ncom.se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  ncom.se
                </a>
                .
              </p>
              <p>
                Aikostnad.se är inte affilierad med OpenAI, Anthropic, Google eller
                någon annan AI-leverantör. Priser och data hämtas direkt från
                respektive leverantörs officiella prissidor och verifieras manuellt
                med regelbundna mellanrum. Valutakursen USD/SEK hämtas i realtid
                via Frankfurter API.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Vanliga frågor om kontakt
            </h2>
            <div className="space-y-6">

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Hur snabbt svarar ni?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vi siktar på att svara inom <strong>1–2 arbetsdagar</strong>,
                  måndag till fredag. Under helger och röda dagar kan det ta
                  ytterligare ett par dagar. Om ärendet är brådskande, ange
                  det i ämnesraden så prioriterar vi det.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Kan jag ringa er?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vi har inget publikt telefonnummer. E-post är det bästa sättet att
                  nå oss — det ger oss möjlighet att ge ett genomtänkt svar och att
                  spåra ärendet om uppföljning behövs.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Hur vet jag att ni uppdaterat ett pris jag rapporterat?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vi svarar alltid på felrapporter och bekräftar i svaret om vi gjort
                  en uppdatering. Datumet "Priser verifierade" på startsidan uppdateras
                  också. Ser du att datumet ändrats och att priset nu stämmer är
                  uppdateringen klar.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Accepterar ni gästinlägg?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I enstaka fall, om ämnet är relevant för AI-kostnader och innehållet
                  håller hög faktakvalitet. Hör av dig med en kort idébeskrivning (2–3
                  meningar) på svenska eller engelska, och ange vilket ämne du vill
                  skriva om. Vi återkommer med besked.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Var hittar jag er integritetspolicy?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Du hittar vår integritetspolicy på sidan{" "}
                  <Link to="/integritet" className="text-brand-700 hover:underline">
                    /integritet
                  </Link>
                  . Läs också gärna vår{" "}
                  <Link to="/om" className="text-brand-700 hover:underline">
                    Om-sida
                  </Link>{" "}
                  för mer bakgrund om hur sajten fungerar och vilka tjänster
                  vi använder.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Säljer ni annonsutrymme?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vi utvärderar det löpande. Om du är intresserad av annonsering
                  eller sponsrat innehåll är du välkommen att höra av dig med en
                  beskrivning av ditt varumärke och din målgrupp.
                </p>
              </div>

            </div>
          </div>

          {/* Navigation nudges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/om"
              className="card hover:border-brand-300 border border-gray-200 transition-colors block"
            >
              <p className="text-sm font-semibold text-gray-800 mb-1">Om sajten →</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mer om hur Aikostnad.se fungerar och vem som driver den.
              </p>
            </Link>
            <Link
              to="/integritet"
              className="card hover:border-brand-300 border border-gray-200 transition-colors block"
            >
              <p className="text-sm font-semibold text-gray-800 mb-1">Integritetspolicy →</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Hur vi hanterar din data och vad vi eventuellt lagrar.
              </p>
            </Link>
          </div>

          {/* FAQ nudge */}
          <p className="text-xs text-gray-400 text-center">
            Har du en teknisk fråga om hur kalkylatorn räknar?{" "}
            <Link to="/#faq" className="text-brand-500 hover:underline">
              Kolla FAQ:n
            </Link>{" "}
            — den täcker de vanligaste frågorna om tokens, valuta och beräkningsmetodik.
          </p>

        </div>
      </main>
    </>
  );
}
