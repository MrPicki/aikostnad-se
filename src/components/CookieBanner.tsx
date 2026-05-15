import { useState, useEffect } from "react";

const STORAGE_KEY = "aikostnad_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-meddelande"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 animate-fade-in-up"
    >
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          Vi använder cookies för att förbättra din upplevelse och analysera trafik. Genom att fortsätta godkänner du vår{" "}
          <a href="/integritet" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">
            integritetspolicy
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="btn-primary text-sm whitespace-nowrap shrink-0"
        >
          Acceptera
        </button>
      </div>
    </div>
  );
}
