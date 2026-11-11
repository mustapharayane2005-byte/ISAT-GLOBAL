import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { formatDate, getArticles } from '@/content/articles';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Articles, notices and press publications from ISAT Global Services.',
  alternates: { canonical: '/newsroom/' },
};

export default function NewsroomPage() {
  const articles = getArticles();

  return (
    <Section rhythm="tight" className="min-h-[60dvh]">
      <Reveal className="mx-auto max-w-measure-head text-center">
        <h1 className="text-headline text-balance">Newsroom.</h1>
        <p className="mx-auto mt-6 max-w-measure text-lead text-ink-muted">
          Notices and publications from iSAT.
        </p>
      </Reveal>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={i * 0.06}>
            <Link
              href={`/newsroom/${a.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-frame border border-hairline bg-surface transition-colors duration-300 ease-apple hover:border-[#F83A04]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-apple group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-caption font-medium text-[#C62C02]">{a.category}</p>
                <h2 className="mt-2 text-lead font-semibold text-ink text-balance">{a.title}</h2>
                <p className="mt-auto pt-5 text-caption text-ink-muted">
                  {a.source} &middot; {formatDate(a.date)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
