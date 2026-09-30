import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

// Required for `output: 'export'` (the cPanel build): this route has no
// dynamic input, so it can be rendered once at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // Fixed at build time rather than `new Date()` so the static export is
  // reproducible and doesn't churn the sitemap on every rebuild.
  const lastModified = '2026-01-01T00:00:00.000Z';

  return [
    {
      url: siteUrl,
      lastModified,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
    },
  ];
}
