import type { MetadataRoute } from 'next';
import { getSiteUrl, isNoIndex } from '@/lib/site';

// Required for `output: 'export'` (the cPanel build): this route has no
// dynamic input, so it can be rendered once at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${getSiteUrl()}/sitemap.xml`;

  if (isNoIndex()) {
    // Site is in cPanel preview: keep it out of search engines entirely.
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: sitemapUrl,
  };
}
