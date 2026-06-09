const CONSENT_KEY = 'cookie_consent_v1';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'granted';
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && (window as any).gtag && hasAnalyticsConsent()) {
    (window as any).gtag('event', name, params);
  }
}
