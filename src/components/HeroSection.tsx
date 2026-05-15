import { useState, useEffect, useRef, useCallback } from "react";

const ROTATE_MS = 10_000;
const FADE_MS = 300;

export interface CalcValues {
  wordsPerRequest: number;
  outputWordsPerRequest: number;
  requestsPerDay: number;
  users: number;
  daysPerMonth: number;
}

export type HeroDest = "calculator" | "tokenraknare";

interface Headline {
  text: string;
  sub: string;
  dest: HeroDest;
  values?: CalcValues;
  initialText?: string;
}

const HEADLINES: Headline[] = [
  {
    text: "Vad kostar en AI-chatbot för mitt företag?",
    sub: "Uppskatta månads- och årskostnad för din kundtjänst eller interna assistent",
    dest: "calculator",
    values: { wordsPerRequest: 200, outputWordsPerRequest: 300, requestsPerDay: 100, users: 3, daysPerMonth: 22 },
  },
  {
    text: "Hur mycket kostar det att bygga en webbsida med AI?",
    sub: "Se vad det kostar att generera text, kod och innehåll med AI",
    dest: "calculator",
    values: { wordsPerRequest: 500, outputWordsPerRequest: 800, requestsPerDay: 20, users: 1, daysPerMonth: 22 },
  },
  {
    text: "Vad kostar GPT-4o för ett litet team per månad?",
    sub: "Beräkna kostnaden per användare och dag för hela teamet",
    dest: "calculator",
    values: { wordsPerRequest: 150, outputWordsPerRequest: 200, requestsPerDay: 50, users: 5, daysPerMonth: 22 },
  },
  {
    text: "Hur många tokens är ett typiskt kundtjänstärende?",
    sub: "Räkna tokens och kostnad för en verklig supportkonversation",
    dest: "tokenraknare",
    initialText:
      "Hej! Jag har ett problem med min beställning nummer 12345. Jag beställde produkten för tre veckor sedan men har fortfarande inte mottagit den. Kan ni hjälpa mig att spåra paketet och ge mig en uppdatering om leveransstatus? Tack på förhand!",
  },
  {
    text: "Vad kostar det att analysera avtal och dokument med AI?",
    sub: "Beräkna kostnad för dokumentanalys och automatisk sammanfattning",
    dest: "calculator",
    values: { wordsPerRequest: 2000, outputWordsPerRequest: 500, requestsPerDay: 10, users: 1, daysPerMonth: 22 },
  },
  {
    text: "Hur dyr är Claude jämfört med ChatGPT?",
    sub: "Jämför priser för alla populära AI-modeller sida vid sida",
    dest: "calculator",
    values: { wordsPerRequest: 100, outputWordsPerRequest: 200, requestsPerDay: 50, users: 1, daysPerMonth: 22 },
  },
];

interface HeroSectionProps {
  onNavigate: (dest: HeroDest, values?: CalcValues, text?: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [input, setInput] = useState("");
  const pausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % HEADLINES.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const goTo = useCallback(
    (i: number) => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i);
        setVisible(true);
      }, FADE_MS);
      startInterval();
    },
    [startInterval]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    pausedRef.current = e.target.value.length > 0;
  };

  const handleSubmit = () => {
    const h = HEADLINES[index];
    onNavigate(h.dest, h.values, h.initialText ?? (input.trim() || undefined));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const current = HEADLINES[index];

  return (
    <section className="text-center max-w-3xl mx-auto animate-fade-in-up">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
        <span>🇸🇪</span>
        <span>Gjord för svenska texter</span>
      </div>

      {/* Rotating headline */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
          {current.text}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">{current.sub}</p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center items-center gap-2 mt-6 mb-8">
        {HEADLINES.map((h, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={h.text}
            aria-label={`Gå till: ${h.text}`}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
              i === index
                ? "w-6 bg-indigo-500"
                : "w-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Chat input card */}
      <div className="card text-left animate-fade-in-up animation-delay-300">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={current.text}
          rows={2}
          className="input-field resize-none text-sm"
          aria-label="Beskriv ditt användningsfall"
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            Referensvärden används för snabb överblick — justera parametrarna
            nedan för exakta siffror.
          </p>
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2 text-sm shrink-0"
          >
            Beräkna
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
