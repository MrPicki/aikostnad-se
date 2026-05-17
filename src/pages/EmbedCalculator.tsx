import { Calculator } from "../components/Calculator";

export function EmbedCalculator() {
  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-6">
      <Calculator />
      <div className="max-w-5xl mx-auto mt-4 text-center">
        <a
          href="https://aikostnad.se?utm_source=embed"
          target="_blank"
          rel="noopener"
          className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
        >
          Powered by <span className="font-semibold">Aikostnad.se</span> — räkna ut vad AI kostar
        </a>
      </div>
    </main>
  );
}
