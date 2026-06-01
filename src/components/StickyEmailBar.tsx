import { useState, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

export function StickyEmailBar() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (
      localStorage.getItem("email_subscribed") ||
      localStorage.getItem("sticky_dismissed")
    ) return;

    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [status]);

  function dismiss() {
    localStorage.setItem("sticky_dismissed", "1");
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "sticky-bar" }),
      });
      if (!res.ok) throw new Error();
      trackEvent("email_captured", { source: "sticky-bar" });
      localStorage.setItem("email_subscribed", "1");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div
      className="flex fixed bottom-0 left-0 right-0 z-50 items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-white border-t border-gray-100"
      style={{ boxShadow: "0 -2px 16px rgba(0,0,0,0.07)" }}
    >
      {status === "success" ? (
        <p className="text-sm text-green-700 font-medium">
          ✓ Du bevakar nu AI-priser — kolla inkorgen!
        </p>
      ) : (
        <>
          <span className="hidden sm:inline text-sm text-gray-700 whitespace-nowrap select-none">
            📬 Prisvarning när AI-priserna ändras →
          </span>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 sm:flex-none min-w-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@email.se"
              aria-label="Din e-postadress för prisvarningar"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 flex-1 min-w-0 sm:w-52 sm:flex-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "…" : "Bevaka"}
            </button>
          </form>
          {status === "error" && (
            <span className="text-xs text-red-600" role="alert">
              Något gick fel — försök igen.
            </span>
          )}
          <button
            onClick={dismiss}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-1"
            aria-label="Stäng"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}
