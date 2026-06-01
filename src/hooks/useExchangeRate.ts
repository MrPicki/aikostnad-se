import { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

interface ExchangeRateResult {
  rate: number;
  date: string | null;
  loading: boolean;
  error: boolean;
}

// Module-level shared state. Every component that calls useExchangeRate shares
// a single network fetch instead of triggering its own (the homepage alone
// mounts ~5 consumers). The first caller kicks off the request; the rest
// subscribe and receive the cached result.
let cached: ExchangeRateResult | null = null;
let inFlight: Promise<ExchangeRateResult> | null = null;
const subscribers = new Set<(r: ExchangeRateResult) => void>();

const FALLBACK: ExchangeRateResult = {
  rate: siteConfig.fallbackUsdToSekRate,
  date: null,
  loading: true,
  error: false,
};

async function fetchRate(): Promise<ExchangeRateResult> {
  // Our own Edge Function first (24h cache + honest fallback flag), then the
  // upstream API directly as a backup.
  const sources = [
    "/api/exchange-rate",
    "https://api.frankfurter.app/latest?from=USD&to=SEK",
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) continue; // our edge fn returns 503 on its fallback path
      const data = await res.json();

      // frankfurter.app: { rates: { SEK }, date } · our edge fn: { rate, date }
      const fetchedRate = data.rate ?? data.rates?.SEK;
      const fetchedDate = data.date ?? null;

      if (typeof fetchedRate === "number" && fetchedRate > 0 && !data.fallback) {
        return { rate: fetchedRate, date: fetchedDate, loading: false, error: false };
      }
    } catch {
      // try next source
    }
  }

  // All live sources failed — surface the fallback honestly (error: true).
  return {
    rate: siteConfig.fallbackUsdToSekRate,
    date: null,
    loading: false,
    error: true,
  };
}

function loadRate(): Promise<ExchangeRateResult> {
  if (cached && !cached.loading) return Promise.resolve(cached);
  if (inFlight) return inFlight;
  inFlight = fetchRate().then((result) => {
    cached = result;
    inFlight = null;
    subscribers.forEach((cb) => cb(result));
    return result;
  });
  return inFlight;
}

export function useExchangeRate(): ExchangeRateResult {
  const [state, setState] = useState<ExchangeRateResult>(cached ?? FALLBACK);

  useEffect(() => {
    let active = true;
    const cb = (r: ExchangeRateResult) => {
      if (active) setState(r);
    };
    subscribers.add(cb);

    // If a resolved value already exists it's the initial useState value, so no
    // synchronous setState is needed; otherwise kick off (or join) the fetch.
    if (!cached || cached.loading) {
      loadRate();
    }

    return () => {
      active = false;
      subscribers.delete(cb);
    };
  }, []);

  return state;
}
