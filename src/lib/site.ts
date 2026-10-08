/**
 * Central site-URL / indexing config, so the cPanel preview build and a
 * future production (Vercel) build can diverge via env vars without
 * touching code.
 */

// Falls back to the production domain when unset (e.g. local dev,
// or the plain `npm run build` / Vercel path before its own env is set).
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://isatnigeria.com';
}

// Indexing is on by default; set `NEXT_PUBLIC_NOINDEX`
// to 'true' to block it (preview builds).
export function isNoIndex(): boolean {
  return process.env.NEXT_PUBLIC_NOINDEX === 'true';
}
