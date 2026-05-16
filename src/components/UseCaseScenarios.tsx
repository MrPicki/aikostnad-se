import type { CalcInitialValues } from "./Calculator";

interface Scenario {
  title: string;
  description: string;
  model: string;
  estSek: number;
  values: Required<Omit<CalcInitialValues, "daysPerMonth">>;
}

const SCENARIOS: Scenario[] = [
  {
    title: "Frilansare / soloprenör",
    description: "Skriver texter, analyserar dokument, svarar på mejl med AI-stöd.",
    model: "GPT-4o",
    estSek: 30,
    values: {
      modelId: "gpt-4o",
      wordsPerRequest: 200,
      outputWordsPerRequest: 300,
      requestsPerDay: 30,
      users: 1,
    },
  },
  {
    title: "Team på 5 personer",
    description: "Intern AI-assistent som hjälper med dagliga arbetsuppgifter.",
    model: "GPT-4o",
    estSek: 105,
    values: {
      modelId: "gpt-4o",
      wordsPerRequest: 200,
      outputWordsPerRequest: 300,
      requestsPerDay: 20,
      users: 5,
    },
  },
  {
    title: "Webbshop — AI-kundtjänst",
    description: "Automatiska svar på 500 kundärenden per dag, dygnet runt.",
    model: "Claude Haiku 4.5",
    estSek: 115,
    values: {
      modelId: "claude-haiku-4-5",
      wordsPerRequest: 150,
      outputWordsPerRequest: 120,
      requestsPerDay: 500,
      users: 1,
    },
  },
  {
    title: "Intern assistent, medelstort företag",
    description: "50 anställda som använder AI-hjälp dagligen med längre kontexter.",
    model: "Claude Sonnet 4.6",
    estSek: 1000,
    values: {
      modelId: "claude-sonnet-4-6",
      wordsPerRequest: 300,
      outputWordsPerRequest: 400,
      requestsPerDay: 10,
      users: 50,
    },
  },
];

function formatSek(sek: number): string {
  if (sek >= 1000) return `ca ${(sek / 1000).toFixed(0)} 000 kr`;
  return `ca ${sek} kr`;
}

interface Props {
  onSelect: (values: CalcInitialValues) => void;
}

export function UseCaseScenarios({ onSelect }: Props) {
  return (
    <section aria-label="Räkna på ett verkligt exempel">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          Vad kostar AI för ditt fall?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Välj ett scenario som liknar ditt — kalkylatorn fylls i automatiskt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SCENARIOS.map((s) => (
          <button
            key={s.title}
            onClick={() => onSelect(s.values)}
            className="card text-left hover:border-indigo-200 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm leading-snug">
                {s.title}
              </p>
              <div className="text-right shrink-0">
                <p className="text-base font-bold text-gray-900">
                  {formatSek(s.estSek)}
                </p>
                <p className="text-xs text-gray-400">/mån</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-2">{s.description}</p>
            <p className="text-xs text-indigo-600 font-medium">{s.model}</p>
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Estimaten baseras på svenska texter (1,3 tokens/ord) och 22 arbetsdagar/mån.
        Klicka på ett scenario för att se det exakta beloppet i kalkylatorn.
      </p>
    </section>
  );
}
