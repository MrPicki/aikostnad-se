import { siteConfig } from "../config/siteConfig";

export function HeroSection() {
  return (
    <section className="border-b border-gray-200 pb-10 mb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
        Vad kostar AI? Räkna ut det på en minut.
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
        Välj modell, ange antal användare och antal förfrågningar per dag.
        Kalkylatorn beräknar månadskostnad i kronor — för ChatGPT, Claude,
        Gemini och fler.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
        <span>14 AI-modeller</span>
        <span>Live-valutakurs (USD/SEK)</span>
        <span>Priser verifierade {siteConfig.pricesLastVerified}</span>
        <span>Gratis verktyg</span>
      </div>
    </section>
  );
}
