// Shared email design system for aikostnad.se.
//
// Every mail we send (the daily newsletter in morning-digest.ts and the
// guide / price-alert mails in send-guide.ts) is built from these helpers so
// the whole project stays on one visual line. The styling mirrors the website
// (src/index.css + tailwind.config.js): Plus Jakarta Sans, an off-white canvas
// (#f9fafb) around a white card with rounded-xl corners, a 1px gray-200 border
// and the site's soft card shadow, gray-900 headings, gray-700 body text and
// brand-700 (#4338ca) as the single accent for links and buttons.
//
// This module is pure string-building with no runtime-specific imports, so it
// is safe to import from both the Node (morning-digest) and Edge (send-guide)
// functions. The leading underscore keeps Vercel from treating it as a route.

export const FONT =
  "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

// Brand + gray scale, mirrored from tailwind.config.js / the Tailwind defaults.
export const COLORS = {
  brand: "#4338ca", // brand-700 — buttons, links, accents
  brandHover: "#3730a3", // brand-800
  canvas: "#f9fafb", // gray-50 — page background behind the card
  card: "#ffffff",
  heading: "#111827", // gray-900
  body: "#374151", // gray-700
  bodyMuted: "#4b5563", // gray-600
  muted: "#6b7280", // gray-500
  faint: "#9ca3af", // gray-400
  border: "#e5e7eb", // gray-200
  borderLight: "#f3f4f6", // gray-100
} as const;

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

// ---- Body typography (matches the site's heading/body scale) --------------

export function h1(html: string): string {
  return `<h1 style="font-size:28px;font-weight:800;color:${COLORS.heading};letter-spacing:-0.02em;line-height:1.15;margin:0 0 14px;">${html}</h1>`;
}

export function ingress(html: string): string {
  return `<p style="font-size:17px;color:${COLORS.bodyMuted};line-height:1.6;margin:0 0 4px;">${html}</p>`;
}

// A section = a light divider, a heading, then its body HTML — the same rhythm
// the site uses between content blocks (border-t + heading).
export function section(titleHtml: string, bodyHtml: string): string {
  return (
    `<hr style="border:none;border-top:1px solid ${COLORS.border};margin:28px 0;">` +
    `<h2 style="font-size:18px;font-weight:700;color:${COLORS.heading};line-height:1.3;margin:0 0 10px;">${titleHtml}</h2>` +
    bodyHtml
  );
}

export function p(html: string): string {
  return `<p style="font-size:15px;color:${COLORS.body};line-height:1.7;margin:0 0 12px;">${html}</p>`;
}

export function hr(): string {
  return `<hr style="border:none;border-top:1px solid ${COLORS.border};margin:28px 0;">`;
}

export function ul(itemsHtml: string[]): string {
  return (
    `<ul style="margin:0;padding-left:20px;">` +
    itemsHtml
      .map(
        (item) =>
          `<li style="font-size:15px;color:${COLORS.body};line-height:1.7;margin:0 0 8px;">${item}</li>`
      )
      .join("") +
    `</ul>`
  );
}

export function link(href: string, label: string): string {
  return `<a href="${escapeAttr(href)}" style="color:${COLORS.brand};font-weight:600;text-decoration:none;">${escapeHtml(label)}</a>`;
}

// Small uppercase eyebrow label (e.g. the newsletter's "Slutsats").
export function eyebrow(text: string): string {
  return `<p style="margin:0 0 6px;font-size:11px;font-weight:700;color:${COLORS.faint};text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(text)}</p>`;
}

// ---- Buttons --------------------------------------------------------------

// Primary CTA — mirrors the site's brand-700 form button (rounded-xl, semibold).
// Rendered as a table so Outlook keeps the solid background.
export function primaryButton(href: string, label: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
      <td class="btn-cta-td" bgcolor="${COLORS.brand}" style="background-color:${COLORS.brand};border-radius:12px;">
        <a class="btn-cta" href="${escapeAttr(href)}" style="display:inline-block;background-color:${COLORS.brand};color:#ffffff;font-size:16px;font-weight:600;padding:14px 28px;border-radius:12px;text-decoration:none;font-family:${FONT};">${escapeHtml(label)}</a>
      </td>
    </tr></table>`;
}

// Share-on-X button — mirrors the site's secondary (outlined gray) button and
// its "Dela på X" label. Uses the 𝕏 glyph (SVG is unreliable in email).
export function shareButtonX(tweetText: string): string {
  const text = tweetText.length > 280 ? tweetText.slice(0, 240) + "…" : tweetText;
  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
      <td class="btn-share-td" bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid ${COLORS.border};border-radius:8px;">
        <a class="btn-share" href="${escapeAttr(href)}" style="display:inline-block;background-color:#ffffff;color:${COLORS.body};font-size:14px;font-weight:600;padding:11px 22px;border-radius:8px;text-decoration:none;font-family:${FONT};">𝕏&nbsp;&nbsp;Dela på X</a>
      </td>
    </tr></table>`;
}

// ---- Footer ---------------------------------------------------------------

export function footer(reasonHtml: string): string {
  return (
    `<p style="margin:0 0 6px;font-size:13px;color:${COLORS.faint};text-align:center;line-height:1.6;">${reasonHtml}</p>` +
    `<p style="margin:0;font-size:13px;color:${COLORS.faint};text-align:center;line-height:1.6;">` +
    `<a href="https://aikostnad.se" style="color:${COLORS.faint};text-decoration:none;">aikostnad.se</a>` +
    `&nbsp;&middot;&nbsp;Avregistrera: svara på mailet eller maila hej@aikostnad.se` +
    `</p>`
  );
}

// ---- Shell ----------------------------------------------------------------

export interface ShellOpts {
  subject: string;
  headerLabel: string; // right side of the header (date, or mail type)
  contentHtml: string; // the already-built body of the mail
  footerHtml: string;
}

// Wraps content in the full email chrome: light canvas, white rounded card with
// the site's border + shadow, logo header with a muted label on the right, and
// a centred footer. Forces light mode on dark-mode clients so the card reads the
// same everywhere.
export function emailShell(opts: ShellOpts): string {
  const { subject, headerLabel, contentHtml, footerHtml } = opts;
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
/* Force light mode — Apple Mail, Outlook iOS */
@media (prefers-color-scheme: dark) {
  body, .outer-wrap, .inner-wrap, .content-td, .header-td { background-color: #ffffff !important; color: #1f2937 !important; }
  .outer-wrap, .footer-td { background-color: ${COLORS.canvas} !important; }
  .btn-cta-td, .btn-cta { background-color: ${COLORS.brand} !important; color: #ffffff !important; }
  .btn-share-td, .btn-share { background-color: #ffffff !important; color: ${COLORS.body} !important; }
}
/* Gmail dark mode (Android + iOS app) */
[data-ogsc] body, [data-ogsc] .inner-wrap, [data-ogsc] .content-td, [data-ogsc] .header-td { background-color: #ffffff !important; color: #1f2937 !important; }
[data-ogsc] .outer-wrap, [data-ogsc] .footer-td { background-color: ${COLORS.canvas} !important; }
[data-ogsc] .btn-cta-td, [data-ogsc] .btn-cta { background-color: ${COLORS.brand} !important; color: #ffffff !important; }
[data-ogsc] .btn-share-td, [data-ogsc] .btn-share { background-color: #ffffff !important; color: ${COLORS.body} !important; }
[data-ogsb] body, [data-ogsb] .inner-wrap, [data-ogsb] .content-td, [data-ogsb] .header-td { background-color: #ffffff !important; color: #1f2937 !important; }
[data-ogsb] .outer-wrap, [data-ogsb] .footer-td { background-color: ${COLORS.canvas} !important; }
[data-ogsb] .btn-cta-td, [data-ogsb] .btn-cta { background-color: ${COLORS.brand} !important; color: #ffffff !important; }
</style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.canvas};color-scheme:light;supported-color-schemes:light;font-family:${FONT};">
<table class="outer-wrap" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.canvas}" style="background-color:${COLORS.canvas};padding:24px 12px;">
  <tr>
    <td align="center" style="background-color:${COLORS.canvas};">
      <table class="inner-wrap" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid ${COLORS.border};border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);overflow:hidden;">

        <!-- Header -->
        <tr>
          <td class="header-td" bgcolor="#ffffff" style="background-color:#ffffff;padding:20px 32px;border-bottom:1px solid ${COLORS.borderLight};">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:middle;">
                  <a href="https://aikostnad.se" style="text-decoration:none;display:inline-block;">
                    <img src="https://aikostnad.se/email-logo.png" alt="Aikostnad.se" width="167" height="22" style="display:block;border:0;outline:none;max-width:167px;height:auto;" />
                  </a>
                </td>
                <td align="right" style="vertical-align:middle;"><span style="font-size:13px;color:${COLORS.faint};">${escapeHtml(headerLabel)}</span></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="content-td" bgcolor="#ffffff" style="padding:32px;background-color:#ffffff;">
            ${contentHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer-td" bgcolor="${COLORS.canvas}" style="background-color:${COLORS.canvas};padding:20px 32px;border-top:1px solid ${COLORS.borderLight};">
            ${footerHtml}
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
