import type { ArticleMeta } from "../data/articles";
import { author, parentOrganization } from "../config/author";

interface Props {
  article: ArticleMeta;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleByline({ article }: Props) {
  const updated = article.modifiedDate !== article.publishedDate;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 border-y border-gray-100 py-3 my-4">
      <span>
        Skriven av{" "}
        <a
          href={author.linkedIn || parentOrganization.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-medium hover:text-indigo-600 hover:underline"
        >
          {author.name}
        </a>
        , {author.role} på{" "}
        <a
          href={parentOrganization.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-medium hover:text-indigo-600 hover:underline"
        >
          {parentOrganization.name}
        </a>
      </span>
      <span className="text-gray-300">·</span>
      <span>
        Publicerad <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
      </span>
      {updated && (
        <>
          <span className="text-gray-300">·</span>
          <span>
            Uppdaterad <time dateTime={article.modifiedDate}>{formatDate(article.modifiedDate)}</time>
          </span>
        </>
      )}
    </div>
  );
}
