import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

export type UserPath = "use" | "build";

const STORAGE_KEY = "aikostnad_user_path";

export function getStoredPath(): UserPath | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "use" || v === "build" ? v : null;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface Props {
  onPathChange?: (path: UserPath) => void;
}

export function PathSelector({ onPathChange }: Props = {}) {
  const [storedPath, setStoredPath] = useState<UserPath | null>(null);

  useEffect(() => {
    setStoredPath(getStoredPath());
  }, []);

  function pickPath(path: UserPath) {
    track("path_selector_click", { path });
    try {
      window.localStorage.setItem(STORAGE_KEY, path);
    } catch {
      // localStorage may be unavailable (private mode) — ignore
    }
    setStoredPath(path);
    onPathChange?.(path);
    scrollTo(path === "use" ? "abonnemang" : "kalkylator");
  }

  return (
    <section aria-label="Välj väg in på sajten" className="mb-16">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">
        Är du ny här? Välj väg
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        <PathCard
          path="use"
          emoji="📱"
          kicker="Jag vill använda AI"
          title="Jämför månadsabonnemang"
          body="ChatGPT Plus, Claude Pro, Gemini Advanced — fasta priser från ca 210 kr/mån. Ingen kod, inga API-nycklar."
          cta="Se abonnemang ↓"
          isLastChoice={storedPath === "use"}
          onClick={() => pickPath("use")}
        />
        <PathCard
          path="build"
          emoji="💻"
          kicker="Jag vill bygga med AI"
          title="Räkna på API-volym"
          body="Du betalar per token (textdel). Räkna på din volym för chatbot, dokumentanalys eller integration i egen app."
          cta="Öppna kalkylatorn ↓"
          isLastChoice={storedPath === "build"}
          onClick={() => pickPath("build")}
        />
      </div>
    </section>
  );
}

interface CardProps {
  path: UserPath;
  emoji: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  isLastChoice: boolean;
  onClick: () => void;
}

function PathCard({
  emoji,
  kicker,
  title,
  body,
  cta,
  isLastChoice,
  onClick,
}: CardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left bg-white rounded-2xl p-5 transition-all group ${
        isLastChoice
          ? "border-2 border-indigo-300 shadow-sm ring-1 ring-indigo-100"
          : "border border-gray-200 hover:border-indigo-300 hover:shadow-sm"
      }`}
    >
      {isLastChoice && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full font-semibold uppercase tracking-wide shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full" aria-hidden="true" />
          Senast vald
        </span>
      )}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl" aria-hidden="true">{emoji}</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5">
            {kicker}
          </p>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed pl-9">{body}</p>
      <p className="text-xs font-semibold text-indigo-600 mt-3 pl-9 group-hover:underline">
        {cta}
      </p>
    </button>
  );
}
