export function HeroSection() {
  return (
    <section
      className="text-center pb-10 pt-4"
      style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-[-0.03em] leading-[1.1] mb-3">
        Räkna ut exakt vad din AI-idé kostar — <span className="text-indigo-600">i kronor</span>
      </h1>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Jämför månadsabonnemang som ChatGPT&nbsp;Plus eller räkna ut API-kostnader för
        din egen app — på svenska, i kronor.
      </p>
      <p className="text-sm text-gray-500 italic mt-1">
        De flesta betalar 40–60% mer än nödvändigt — för att de valt fel modell.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <span>✓ Gratis för alltid</span>
        <span className="hidden sm:inline">·</span>
        <span>✓ Ingen inloggning</span>
        <span className="hidden sm:inline">·</span>
        <span>✓ Priser i svenska kronor</span>
      </div>
    </section>
  );
}
