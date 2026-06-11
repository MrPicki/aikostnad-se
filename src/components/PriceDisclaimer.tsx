export function PriceDisclaimer() {
  return (
    <p className="text-xs text-gray-400 mt-8 border-t border-gray-100 pt-4">
      Priserna på denna sida är uppskattningar baserade på publikt tillgängliga
      prislistor och dagens USD/SEK-kurs. Faktiska kostnader kan avvika.
      Detta utgör inte finansiell rådgivning. Se våra{" "}
      <a href="/villkor" className="underline hover:text-gray-600">användarvillkor</a>{" "}
      för mer information.
    </p>
  );
}
