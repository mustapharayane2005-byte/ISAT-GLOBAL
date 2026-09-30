import type { Metadata } from 'next';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Section } from '@/components/Section';
import { Tabs, type TabItem } from '@/components/Tabs';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Building the infrastructure for Africa’s digital future: connectivity, cloud and AI infrastructure across the continent.',
};

const PRINCIPLE =
  "Africa does not need to replicate yesterday's telecommunications model to build tomorrow's digital economy. By combining terrestrial networks, shared infrastructure, satellite connectivity, cloud computing and intelligent digital platforms, ISAT aims to extend high-quality digital services to people and businesses wherever they are.";

const APPROACH_LAYERS = [
  'Terrestrial networks',
  'Shared infrastructure',
  'Satellite connectivity',
  'Cloud computing',
  'Intelligent digital platforms',
];

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-measure-head space-y-6 text-body text-ink-muted">{children}</div>;
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <Prose>
      <h3 className="text-title text-ink">{title}</h3>
      <p>Content to be provided by ISAT.</p>
    </Prose>
  );
}

const TABS: TabItem[] = [
  {
    id: 'company',
    label: 'Our Company',
    panel: (
      <Prose>
        <p>
          ISAT Global Services Limited is a Nigerian digital infrastructure and technology services
          company focused on expanding access to reliable, intelligent and resilient connectivity.
        </p>
        <p>
          We are building an integrated platform that brings together next-generation mobile and
          fixed connectivity, satellite communications, cloud and data-centre infrastructure,
          artificial intelligence, enterprise technology and digital services.
        </p>
        <p>{PRINCIPLE}</p>
      </Prose>
    ),
  },
  {
    id: 'purpose',
    label: 'Our Purpose',
    panel: (
      <Prose>
        <p>
          From major commercial centres to underserved communities, our ambition is to help close
          infrastructure gaps, enable enterprises, support public services and create the digital
          foundations for a more connected and productive Africa.
        </p>
      </Prose>
    ),
  },
  {
    id: 'approach',
    label: 'Our Approach',
    panel: (
      <Prose>
        <p>{PRINCIPLE}</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {APPROACH_LAYERS.map((layer) => (
            <li
              key={layer}
              className="rounded-frame border border-hairline bg-surface px-5 py-4 text-body font-medium text-ink"
            >
              {layer}
            </li>
          ))}
        </ul>
      </Prose>
    ),
  },
  {
    id: 'leadership',
    label: 'Leadership',
    panel: <PlaceholderPanel title="Leadership" />,
  },
  {
    id: 'governance',
    label: 'Governance',
    panel: <PlaceholderPanel title="Governance" />,
  },
  {
    id: 'impact',
    label: 'Sustainability & Impact',
    panel: <PlaceholderPanel title="Sustainability & Impact" />,
  },
];

export default function AboutPage() {
  return (
    <Section rhythm="tight" className="min-h-[60dvh]">
      <div className="overflow-hidden rounded-frame">
        <PhotoSlot
          id="about-banner"
          ratio="banner"
          priority
          sizes="100vw"
          caption="Network lines connecting the African continent, a stylised map of digital connectivity."
          objectPosition="50% 50%"
        />
      </div>

      <div className="mx-auto max-w-measure-head pt-12 text-center">
        <h1 className="text-headline text-balance">Building the infrastructure for Africa&rsquo;s digital future</h1>
      </div>

      <div className="mt-14">
        <Tabs items={TABS} ariaLabel="About ISAT" track="canvas" />
      </div>
    </Section>
  );
}
