/**
 * Newsroom registry. To add an article:
 *   1. drop its image in public/images/newsroom/
 *   2. create src/content/articles/<slug>.md (body text)
 *   3. add ONE entry below.
 * The PDF (public/newsroom-pdf/<slug>.pdf) is generated at build time from `image`.
 */
export type Article = {
  slug: string;
  title: string;
  source: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
  category: string;
  /** Path under /public, e.g. /images/newsroom/<file>.webp */
  image: string;
  /** Path under /public of the generated PDF (always /newsroom-pdf/<slug>.pdf) */
  pdf: string;
};

export const ARTICLES: Article[] = [
  {
    slug: 'isat-individual-consumer-code-of-practice',
    title: 'ISAT Global Services Limited: Individual Consumer Code of Practice',
    source: 'The Punch, page 25',
    date: '2026-11-10',
    summary:
      "ISAT's Individual Consumer Code of Practice for its internet service provider operations, as published in The Punch.",
    category: 'Notice',
    image: '/images/newsroom/punch-2026-11-10-isat-code.webp',
    pdf: '/newsroom-pdf/isat-individual-consumer-code-of-practice.pdf',
  },
];

export function getArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
