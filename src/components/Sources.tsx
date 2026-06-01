interface Source {
  title: string;
  url: string;
  publisher?: string;
}

interface Props {
  items: Source[];
  heading?: string;
}

export function Sources({ items, heading = "Källor och referenser" }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 border-t border-gray-200 pt-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{heading}</h2>
      <ul className="text-sm text-gray-600 space-y-2">
        {items.map((s, i) => (
          <li key={i}>
            <a
              href={s.url}
              rel="noopener nofollow"
              target="_blank"
              className="text-brand-700 hover:underline"
            >
              {s.title}
            </a>
            {s.publisher && (
              <span className="text-gray-500"> — {s.publisher}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
