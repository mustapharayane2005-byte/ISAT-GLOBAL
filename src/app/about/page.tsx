import type { Metadata } from 'next';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Building the infrastructure for Africa’s digital future: connectivity, cloud and AI infrastructure across the continent.',
};

export default function AboutPage() {
  return (
    <Section rhythm="tight" className="min-h-[60dvh]">
      <div className="mx-auto max-w-measure-head pt-12 text-center">
        <h1 className="text-headline text-balance">Building the infrastructure for Africa&rsquo;s digital future</h1>
        <p className="mx-auto mt-6 max-w-measure text-lead text-ink-muted">
          ISAT is a digital infrastructure and services company building intelligent connectivity
          for people, businesses and communities across Africa.
        </p>
      </div>
    </Section>
  );
}
