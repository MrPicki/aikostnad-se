import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'cookie_consent_v1';

function updateGtagConsent(granted: boolean) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const value = granted ? 'granted' : 'denied';
    (window as any).gtag('consent', 'update', {
      'analytics_storage': value,
      'ad_storage': value,
      'ad_user_data': value,
      'ad_personalization': value,
    });
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      updateGtagConsent(stored === 'granted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    updateGtagConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    updateGtagConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="flex-1 text-sm text-gray-600">
          Vi använder cookies för att förstå hur sajten används (Google Analytics) och för att visa relevanta annonser (Google AdSense).{' '}
          <Link to="/integritet" className="underline hover:text-indigo-600">
            Läs mer i vår integritetspolicy
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Neka
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Godkänn
          </button>
        </div>
      </div>
    </div>
  );
}
