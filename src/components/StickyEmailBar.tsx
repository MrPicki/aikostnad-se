import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

const COOKIE_CONSENT_KEY = 'cookie_consent_v1';

export function StickyEmailBar() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (
      localStorage.getItem("email_subscribed") ||
      localStorage.getItem("sticky_dismissed")
    ) return;

    function maybeShow() {
      // Don't overlap with CookieBanner — wait until cookie consent is decided
      if (!localStorage.getItem(COOKIE_CONSENT_KEY)) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", maybeShow, { passive: true });
    return () => window.removeEventListener("scroll", maybeShow);
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
    if (!consent || !email.trim()) return;
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
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-3 sm:px-6 py-3"
      style={{ boxShadow: "0 -2px 16px rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-2xl mx-auto">
        {status === "success" ? (
          <p className="text-sm text-green-700 font-medium text-center py-1">
            ✓ Du bevakar nu AI-priser — kolla inkorgen!
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 select-none">
                📬 Prisvarning när AI-priserna ändras
              </span>
              <button
                onClick={dismiss}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-2"
                aria-label="Stäng"
              >
                ×
              </button>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-brand-700 focus:ring-brand-700 shrink-0"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                Jag godkänner att Aikostnad.se skickar prisvarningar. Max 1 mail/vecka.{" "}
                <Link to="/integritet" className="underline hover:text-gray-800">
                  Integritetspolicy
                </Link>.
              </span>
            </label>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.se"
                aria-label="Din e-postadress för prisvarningar"
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 flex-1 sm:w-52 sm:flex-none"
              />
              <button
                type="submit"
                disabled={status === "loading" || !consent}
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
          </div>
        )}
      </div>
    </div>
  );
}
