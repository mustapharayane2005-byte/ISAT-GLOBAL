import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { OriginalViewer } from '@/components/OriginalViewer';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SourceLabel } from '@/components/SourceLabel';
import { ARTICLES, formatDate, getArticle } from '@/content/articles';
import { loadArticleBody } from '@/content/load-article';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/newsroom/${article.slug}/` },
    openGraph: { title: article.title, description: article.summary, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const body = loadArticleBody(article.slug);
  const [tagline, company, subtitle, ...contacts] = body.header;

  return (
    <Section rhythm="tight">
      <Reveal className="mx-auto max-w-shell">
        <Link href="/newsroom/" className="text-caption font-medium text-ink-muted hover:text-ink">
          &larr; Newsroom
        </Link>
        <p className="mt-8 text-caption font-medium text-[#C62C02]">{article.category}</p>
        <h1 className="mt-3 max-w-measure-head text-headline text-balance">{article.title}</h1>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-shell gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <aside className="lg:order-2">
          <div className="space-y-6 rounded-frame-sm border border-hairline bg-surface p-6 lg:sticky lg:top-32">
            <a
              href={article.pdf}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent-strong px-5 py-3 text-body font-medium text-white transition-colors duration-200 ease-apple hover:bg-accent-press active:scale-[0.98]"
            >
              <DownloadSimple size={20} weight="bold" />
              Download PDF
            </a>
            <dl className="space-y-4 text-body">
              <div>
                <dt className="text-caption text-ink-muted">Source</dt>
                <dd className="font-medium text-ink">
                  <SourceLabel source={article.source} />
                </dd>
              </div>
              <div>
                <dt className="text-caption text-ink-muted">Date</dt>
                <dd className="font-medium text-ink">{formatDate(article.date)}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <article className="min-w-0 lg:order-1">
          <Reveal className="border-b border-hairline pb-8">
            <p className="text-caption font-semibold text-ink-muted">{tagline}</p>
            <p className="mt-2 text-title text-ink">{company}</p>
            <p className="mt-2 text-body font-semibold text-[#C62C02]">{subtitle}</p>
            {contacts.map((line) => (
              <p key={line} className="mt-1 text-body text-ink-muted">
                {line}
              </p>
            ))}
          </Reveal>

          {body.sections.map((s) => {
            const [, num, title] = s.title.match(/^(\d+)\.\s*(.*)$/) ?? [null, '', s.title];
            return (
              <Reveal key={s.title} className="mt-12">
                <section aria-labelledby={`s-${num}`}>
                  <h2 id={`s-${num}`} className="flex items-baseline gap-4 text-lead font-semibold text-ink">
                    <span className="text-[#F83A04]">{num}</span>
                    <span>{title}</span>
                  </h2>
                  <div className="mt-4 max-w-[40rem] space-y-5 text-body text-ink-muted">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}

          <div className="mt-16 border-t border-hairline pt-8">
            <OriginalViewer src={article.image} alt={`${article.title} (${article.source})`} />
          </div>
        </article>
      </div>
    </Section>
  );
}
