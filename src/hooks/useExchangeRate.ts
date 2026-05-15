import { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

interface ExchangeRateResult {
  rate: number;
  date: string | null;
  loading: boolean;
  error: boolean;
}

export function useExchangeRate(): ExchangeRateResult {
  const [rate, setRate] = useState<number>(siteConfig.fallbackUsdToSekRate);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRate() {
      try {
        // Try our own Edge Function first (with 24h cache), then direct API
        const sources = [
          "/api/exchange-rate",
          "https://api.frankfurter.app/latest?from=USD&to=SEK",
        ];

        for (const url of sources) {
          try {
            const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
            if (!res.ok) continue;
            const data = await res.json();

            // frankfurter.app format: { rates: { SEK: number }, date: string }
            // our edge fn format: { rate: number, date: string }
            const fetchedRate = data.rate ?? data.rates?.SEK;
            const fetchedDate = data.date ?? null;

            if (fetchedRate && typeof fetchedRate === "number") {
              setRate(fetchedRate);
              setDate(fetchedDate);
              setError(false);
              return;
            }
          } catch {
            // try next source
          }
        }

        // All sources failed — keep fallback
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  return { rate, date, loading, error };
}
