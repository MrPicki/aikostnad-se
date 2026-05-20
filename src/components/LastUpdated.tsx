interface Props {
  date: string;
  reviewer?: string;
}

export function LastUpdated({ date, reviewer = "Aikostnad.se redaktion" }: Props) {
  const formatted = new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <p className="text-xs text-gray-500 mb-6 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1">
        <span aria-hidden>✓</span> Senast uppdaterad{" "}
        <time dateTime={date} className="font-medium text-gray-700">
          {formatted}
        </time>
      </span>
      <span aria-hidden>·</span>
      <span>Verifierad av {reviewer}</span>
    </p>
  );
}
