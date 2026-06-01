import DOMPurify from "dompurify";

// Article/digest HTML originates from an LLM that is fed third-party RSS titles
// and summaries — i.e. untrusted input. Always run it through DOMPurify before
// dangerouslySetInnerHTML so a poisoned feed can't inject <script>/onerror XSS.
// We allow only the small set of formatting tags our articles actually use.
const ALLOWED_TAGS = [
  "p", "br", "h2", "h3", "h4", "strong", "em", "b", "i",
  "ul", "ol", "li", "a", "blockquote", "code", "pre",
];

const ALLOWED_ATTR = ["href", "title", "target", "rel"];

export function sanitizeArticleHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Block javascript:/data: URLs on links.
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|\/)/i,
  });
}
