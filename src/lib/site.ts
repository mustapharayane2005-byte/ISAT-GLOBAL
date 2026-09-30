/**
 * Central site-URL / indexing config, so the cPanel preview build and a
 * future production (Vercel) build can diverge via env vars without
 * touching code.
 */

// Falls back to the cPanel preview subdomain when unset (e.g. local dev,
// or the plain `npm run build` / Vercel path before its own env is set).
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://new.isatnigeria.com';
}

// The site is in preview: default to noindex while `NEXT_PUBLIC_NOINDEX`
// is unset. Only an explicit 'false' allows indexing.
export function isNoIndex(): boolean {
  return process.env.NEXT_PUBLIC_NOINDEX !== 'false';
}
