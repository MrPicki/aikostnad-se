import { Link } from "react-router-dom";

interface RelatedLink {
  to: string;
  title: string;
  description: string;
}

interface Props {
  title?: string;
  links: RelatedLink[];
}

export function RelatedArticles({ title = "Relaterade guider", links }: Props) {
  return (
    <section className="mt-12 pt-8 border-t border-gray-100" aria-label="Relaterade guider">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 transition-all p-4 group"
          >
            <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 mb-0.5">
              {link.title}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
