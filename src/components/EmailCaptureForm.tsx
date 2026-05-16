import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  providerId: string;
  modelName?: string;
  source: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function EmailCaptureForm({ providerId, modelName, source }: Props) {
  const [email, setEmail] = useState("");
  const [consentGuide, setConsentGuide] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentGuide || !email.trim()) return;

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
          consentMarketing,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Något gick fel");
      }

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
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          autoComplete="email"
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consentGuide}
          onChange={(e) => setConsentGuide(e.target.checked)}
          className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          required
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          Jag samtycker till att Aikostnad.se sparar min e-postadress för att skicka
          denna guide. Min data sparas säkert och delas aldrig med tredje part. Jag
          kan när som helst be om radering via{" "}
          <a href="mailto:hej@aikostnad.se" className="text-indigo-600 hover:underline">
            hej@aikostnad.se
          </a>
          . Läs mer i vår{" "}
          <Link to="/integritet" className="text-indigo-600 hover:underline" target="_blank">
            integritetspolicy
          </Link>
          . <span className="text-red-500">*</span>
        </span>
      </label>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consentMarketing}
          onChange={(e) => setConsentMarketing(e.target.checked)}
          className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          Skicka mig även enstaka uppdateringar om nya AI-priser och guider (max ~1
          mail/månad). Du kan avsluta när som helst. (Frivilligt)
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {errorMsg || "Något gick fel. Försök igen om en stund."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !consentGuide || !email.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
      >
        {status === "loading" ? "Skickar…" : "Skicka guiden till mig"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Inga spamutskick. Ingen kortinformation. Gratis.
      </p>
    </form>
  );
}
