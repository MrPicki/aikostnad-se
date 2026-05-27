import { Calculator } from "../components/Calculator";

export function EmbedCalculator() {
  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-6">
      <Calculator />
      <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          Inbäddad kalkylator från{" "}
          <a
            href="https://aikostnad.se?utm_source=embed&utm_medium=widget&utm_campaign=embed_attribution"
            target="_blank"
            rel="noopener"
            className="font-semibold text-indigo-700 hover:underline"
          >
            Aikostnad.se
          </a>{" "}
          — Sveriges kostnadskalkylator för AI. Live SEK-kurs · Verifierade
          priser.{" "}
          <a
            href="https://aikostnad.se/press?utm_source=embed&utm_medium=widget&utm_campaign=embed_attribution"
            target="_blank"
            rel="noopener"
            className="text-indigo-700 hover:underline"
          >
            Bädda in själv →
          </a>
        </p>
      </div>
    </main>
  );
}
