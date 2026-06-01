import { useState } from "react";
import { trackEvent } from "../utils/analytics";

interface Props {
  providerId: string;
  modelName?: string;
  source: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function EmailCaptureForm({ providerId, modelName, source }: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          providerId,
          modelName,
          source,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Något gick fel");
      }

      trackEvent('email_captured');
      localStorage.setItem("email_subscribed", "1");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Något gick fel");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
        <div className="text-2xl mb-2">✓</div>
        <p className="font-semibold text-green-900 mb-1">Guiden är på väg!</p>
        <p className="text-sm text-green-800">
          Kolla din inbox på <strong>{email}</strong>. Hittar du inte mailet —
          kika i skräpposten.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">
          Din e-postadress
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="namn@exempel.se"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent"
          autoComplete="email"
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded border-gray-300 text-brand-700 focus:ring-brand-700"
          required
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          Jag accepterar att Aikostnad.se skickar prisvarningar när AI-priser
          ändras. Max en gång per vecka. <span className="text-red-500">*</span>
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {errorMsg || "Något gick fel. Försök igen om en stund."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !consent || !email.trim()}
        className="w-full bg-brand-700 hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-base font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        {status === "loading" ? "Skickar…" : "Bevaka mitt pris"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Gratis · Avregistrera när som helst · Max 1 mail/vecka
      </p>
    </form>
  );
}
