import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEO } from "../components/SEO";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: "https://aikostnad.se" },
    { "@type": "ListItem", position: 2, name: "Användarvillkor", item: "https://aikostnad.se/villkor" },
  ],
};

export function Villkor() {
  return (
    <>
      <SEO
        title="Användarvillkor — Aikostnad.se"
        description="Läs användarvillkoren för Aikostnad.se — vad tjänsten är, ansvarsbegränsningar för priser, immateriella rättigheter och kontaktuppgifter."
        canonical="/villkor"
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
            Användarvillkor
          </h1>
          <p className="text-gray-500 text-sm">
            Senast uppdaterat: juni 2026
          </p>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              1. Om tjänsten
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se är ett kostnadsfritt informationsverktyg vars syfte är att hjälpa
              privatpersoner, utvecklare och företag förstå vad AI-tjänster kostar. Sajten
              erbjuder prisjämförelser, kostnadskalkylatorer och guider för ett brett urval
              av AI-modeller och tjänster — allt presenterat i svenska kronor.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aikostnad.se ägs och drivs av Ncom (enskild firma). Mer information om
              organisationsnummer och företagsuppgifter hittar du på{" "}
              <a
                href="https://ncom.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:underline"
              >
                ncom.se
              </a>
              . Har du frågor eller synpunkter är du alltid välkommen att höra av dig via{" "}
              <Link to="/kontakt" className="text-brand-700 hover:underline">
                kontaktsidan
              </Link>{" "}
              eller direkt på{" "}
              <a href="mailto:hej@aikostnad.se" className="text-brand-700 hover:underline">
                hej@aikostnad.se
              </a>
              .
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Genom att använda Aikostnad.se accepterar du dessa villkor. Om du inte
              accepterar villkoren ber vi dig att inte använda tjänsten. Vi förbehåller
              oss rätten att när som helst ändra, avbryta eller upphöra med delar av
              tjänsten utan förvarning.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              2. Ansvarsfriskrivning för priser
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Alla priser och kostnadsuppgifter som presenteras på Aikostnad.se är
              uppskattningar baserade på publikt tillgängliga prislistor från respektive
              AI-leverantör. Vi strävar efter att hålla informationen aktuell och korrekt,
              men vi lämnar inga garantier för att priserna är fullständiga, korrekta
              eller uppdaterade vid varje givet tillfälle.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Priser angivna i US-dollar (USD) konverteras till svenska kronor (SEK) med
              en daglig växelkurs hämtad från en öppen valutakälla (Frankfurter API).
              Växelkursen uppdateras regelbundet men kan avvika från den kurs du faktiskt
              möter hos din bank, betaltjänst eller AI-leverantör vid tidpunkten för köp.
              Valutakursfluktuationer kan göra att den slutliga kostnaden i SEK skiljer
              sig från vad som visas på sajten.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-leverantörernas prissättning förändras kontinuerligt — nya modeller
              lanseras, befintliga modeller prisändras och rabatter eller volympriser
              kan tillkomma utan att vi hinner uppdatera Aikostnad.se omedelbart. Faktiska
              kostnader kan därför avvika, ibland avsevärt, från de uppskattningar som
              presenteras här.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Informationen på Aikostnad.se utgör inte finansiell rådgivning, juridisk
              rådgivning eller rekommendation om specifika produkter eller tjänster. Innan
              du fattar ekonomiska beslut baserade på prisinformation från Aikostnad.se
              uppmanas du alltid att kontrollera aktuella priser direkt hos respektive
              leverantörs officiella prislista. Aikostnad.se ansvarar inte för ekonomisk
              skada eller förlust som uppstår till följd av felaktig eller föråldrad
              prisinformation på sajten.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kalkylatorer och uppskattningsverktyg på sajten är avsedda som
              orienteringshjälp. De beräkningar som verktyget producerar är approximationer
              och ska inte användas som underlag för budgetering, avtalsskrivning eller
              andra formella ekonomiska åtaganden utan att du dessförinnan verifierat
              uppgifterna hos leverantören.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              3. Immateriella rättigheter
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Allt innehåll på Aikostnad.se — inklusive men inte begränsat till texter,
              artiklar, guider, kalkylatorer, design, grafik och källkod — ägs av Ncom
              eller dess licensgivare och är skyddat av upphovsrätt och andra immateriella
              rättigheter.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Du är fri att länka till Aikostnad.se från din webbplats, blogg eller
              sociala medier. Att dela enskilda citat eller kortare utdrag med tydlig
              källhänvisning är också tillåtet för icke-kommersiella ändamål.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kopiering, reproduktion eller distribution av längre textavsnitt, hela sidor
              eller verktyg för kommersiellt bruk kräver skriftligt tillstånd från Ncom.
              Det är inte tillåtet att ta bort eller dölja upphovsrättsmarkeringar eller
              att presentera innehåll från Aikostnad.se på ett sätt som ger intryck av att
              det härstammar från annan källa.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tredjepartsnamn, varumärken och logotyper som förekommer på sajten (såsom
              ChatGPT, Claude, Gemini, Grok med flera) tillhör respektive ägare och
              används uteslutande i informationssyfte. Aikostnad.se är inte affilierad
              med eller godkänd av dessa varumärkesinnehavare om inget annat uttryckligen
              anges.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              4. Datainsamling och integritet
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hur Aikostnad.se samlar in och behandlar personuppgifter beskrivs i vår
              separata{" "}
              <Link to="/integritet" className="text-brand-700 hover:underline">
                integritetspolicy
              </Link>
              . Integritetspolicyn är en del av dessa användarvillkor och gäller
              parallellt med dem.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kalkylatorer och beräkningsverktyg på Aikostnad.se körs helt lokalt i din
              webbläsare. Text och data du matar in i verktygen skickas inte till våra
              servrar och sparas inte. Vi samlar in anonym statistik om sidvisningar och
              användningsmönster (med ditt samtycke via cookiebannern) för att förstå hur
              tjänsten används och förbättra den.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              5. Tillgänglighet
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vi strävar efter att Aikostnad.se ska vara tillgänglig för alla användare,
              inklusive personer med funktionsnedsättningar. Vår målsättning är att följa
              riktlinjerna i WCAG 2.1 nivå AA (Web Content Accessibility Guidelines).
              Det innebär bland annat att sajten ska kunna navigeras med tangentbord, att
              bilder ska ha alternativtexter och att kontrasten mellan text och bakgrund
              ska vara tillräcklig för läsbarhet.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vi är medvetna om att tillgänglighet är ett pågående arbete och att det kan
              finnas brister. Om du hittar tillgänglighetsproblem på sajten — sidor som är
              svåra att navigera, formulär som inte fungerar med skärmläsare, eller
              element med otillräcklig kontrast — är vi tacksamma om du hör av dig. Skicka
              ett mejl till{" "}
              <a href="mailto:hej@aikostnad.se" className="text-brand-700 hover:underline">
                hej@aikostnad.se
              </a>{" "}
              med en beskrivning av problemet och vilken sida det gäller, så undersöker
              vi och åtgärdar det så snart som möjligt.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              6. Ändringar av villkoren
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ncom förbehåller sig rätten att när som helst uppdatera eller ändra dessa
              användarvillkor. Vid väsentliga ändringar uppdateras datumet längst ned på
              denna sida. Vi rekommenderar att du besöker sidan regelbundet för att hålla
              dig informerad om eventuella ändringar.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fortsatt användning av Aikostnad.se efter att ändringar publicerats innebär
              att du accepterar de uppdaterade villkoren. Om du inte accepterar de
              uppdaterade villkoren ska du upphöra med att använda tjänsten.
            </p>
          </section>

          <section className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              7. Kontakt
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Har du frågor om dessa användarvillkor, om hur Aikostnad.se hanterar
              personuppgifter eller om innehållet på sajten i övrigt, är du välkommen
              att höra av dig.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              E-post:{" "}
              <a href="mailto:hej@aikostnad.se" className="text-brand-700 hover:underline">
                hej@aikostnad.se
              </a>
              <br />
              Webbformulär:{" "}
              <Link to="/kontakt" className="text-brand-700 hover:underline">
                aikostnad.se/kontakt
              </Link>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mer information om Ncom och verksamheten hittar du på{" "}
              <a
                href="https://ncom.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:underline"
              >
                ncom.se
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4">
            Senast uppdaterat: juni 2026
          </p>
        </article>
      </main>
    </>
  );
}
