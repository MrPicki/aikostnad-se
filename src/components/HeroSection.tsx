import { siteConfig } from "../config/siteConfig";

export function HeroSection() {
  return (
    <section className="pb-10 mb-10 border-b border-gray-200">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
        AI-priser är förvirrande.
        <span className="text-indigo-600"> Här förstår du dem.</span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
        Jämför ChatGPT, Claude och Gemini. Se vad AI faktiskt kostar per månad
        — för privatpersoner, team och företag. Priser på svenska kronor,
        uppdaterade dagligen.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <span className="text-gray-500">14 AI-modeller</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Live-valutakurs USD/SEK</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Verifierat {siteConfig.pricesLastVerified}</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Gratis</span>
      </div>
    </section>
  );
}
