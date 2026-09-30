import { Rail, type RailItem } from '@/components/Rail';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';

const OUTCOMES = [
  { value: '$30B to $50B', label: 'Added to GDP by 2030' },
  { value: '3M to 5M', label: 'Jobs created, direct and indirect' },
  { value: '2x to 3x', label: 'Internet speeds for households and businesses' },
];

const SECTORS: RailItem[] = [
  {
    id: 'sector-manufacturing',
    title: 'Manufacturing',
    body: 'Private 5G on the factory floor: machine telemetry, automated inspection, no cabling.',
    photoTitle: 'Smarter factories.',
    caption: 'Smarter factories. A factory worker threads wire through a machine on the shop floor.',
    objectPosition: '58% 40%',
  },
  {
    id: 'sector-agriculture',
    title: 'Agriculture',
    body: 'Soil and weather sensing across large holdings, with yield models running at the edge.',
    photoTitle: 'Farms that see.',
    caption: 'Farms that see. An aerial view of cultivated farmland in a patchwork of plots, bordering a town.',
    objectPosition: '40% 55%',
  },
  {
    id: 'sector-education',
    title: 'Education',
    body: 'Campus-wide connectivity and remote teaching that holds up in a full lecture theatre.',
    photoTitle: 'Every classroom, online.',
    caption: "Every classroom, online. Three students review notes and a laptop together on a campus stairway.",
    objectPosition: '50% 32%',
  },
  {
    id: 'sector-healthcare',
    title: 'Healthcare',
    body: 'Imaging moved to specialists in seconds, and consultations that reach rural clinics.',
    photoTitle: 'Care, at a distance.',
    caption: 'Care, at a distance. A doctor in a white coat smiles while reviewing a tablet.',
    objectPosition: '50% 25%',
  },
  {
    id: 'sector-government',
    title: 'Government',
    body: 'Public records and citizen services on planned in-country infrastructure.',
    photoTitle: 'Services, simplified.',
    caption: "Services, simplified. An aerial view of Abuja's government district and the National Mosque.",
    objectPosition: '50% 45%',
  },
  {
    id: 'sector-retail',
    title: 'Retail',
    body: 'Payments, stock and delivery systems that stay up through market-day peaks.',
    photoTitle: 'Every sale, instant.',
    caption: 'Every sale, instant. A street food vendor takes a phone call while tending his stall.',
    objectPosition: '58% 30%',
  },
];

export function Impact() {
  return (
    <Section id="impact">
      <SectionHead
        title="What a national network is worth"
        lead="Independent build-out of this scale changes the arithmetic of every sector that depends on connectivity."
      />

      <ul className="mt-20 border-t border-hairline">
        {OUTCOMES.map((outcome, i) => (
          <Reveal
            as="li"
            key={outcome.label}
            delay={i * 0.08}
            className="flex flex-col gap-2 border-b border-hairline py-8 md:flex-row md:items-baseline md:justify-between md:gap-12 md:py-10"
          >
            <p className="tnum text-title md:basis-1/2">{outcome.value}</p>
            <p className="max-w-measure text-body text-ink-muted md:basis-1/2">{outcome.label}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-24">
        <h3 className="text-title">Six sectors, one network.</h3>
        <p className="mt-4 max-w-measure text-body text-ink-muted">
          Drag sideways to see where the capacity goes first.
        </p>
        <div className="mt-10">
          <Rail items={SECTORS} ariaLabel="Sectors served by the iSAT network" />
        </div>
      </div>
    </Section>
  );
}
