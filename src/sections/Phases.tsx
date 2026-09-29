import { MapPinIcon } from '@/components/MapPinIcon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Section, SectionHead } from '@/components/Section';
import { Tabs, type TabItem } from '@/components/Tabs';

type Phase = {
  id: string;
  label: string;
  window: string;
  summary: string;
  cities: string[];
  photo: { id: string; caption: string; objectPosition: string };
};

const PHASES: Phase[] = [
  {
    id: 'phase-1',
    label: 'Phase 1',
    window: '0 to 12 months',
    summary:
      'Dense 3.5 GHz build across the four cities that carry most of Nigeria\u2019s data traffic, anchored on new metro fibre.',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
    photo: {
      id: 'phase-1',
      caption:
        'Lagos first. A rooftop view over Lagos, the city skyline, palm trees and a market street below.',
      objectPosition: '50% 42%',
    },
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    window: '13 to 24 months',
    summary:
      'The network moves inland. Six commercial centres come online, linked by long-haul fibre to the coastal landing points.',
    cities: ['Kano', 'Kaduna', 'Enugu', 'Benin', 'Owerri', 'Ilorin'],
    photo: {
      id: 'phase-2',
      caption:
        'Fibre, city by city. A close-up of fibre-optic patch cables plugged into a network switch.',
      objectPosition: '68% 55%',
    },
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    window: '25 to 36 months',
    summary:
      'Every state capital and the regional cities between them, completing national coverage of the 3.5 GHz layer.',
    cities: ['All 36 state capitals', 'Regional cities nationwide'],
    photo: {
      id: 'phase-3',
      caption:
        'Every state capital. Close-up portrait of a man on a phone call at golden hour, a cypress tree behind him.',
      objectPosition: '45% 50%',
    },
  },
];

function PhasePanel({ phase }: { phase: Phase }) {
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <PhotoSlot
        id={phase.photo.id}
        ratio="4/3"
        caption={phase.photo.caption}
        sizes="(max-width: 1024px) 100vw, 520px"
        tone="muted"
        objectPosition={phase.photo.objectPosition}
      />

      <div>
        <p className="text-caption font-medium text-accent-strong">{phase.window}</p>
        <h3 className="mt-3 text-title">{phase.label}</h3>
        <p className="mt-5 max-w-measure text-body text-ink-muted">{phase.summary}</p>

        <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
          {phase.cities.map((city) => (
            <li
              key={city}
              className="group/city flex items-center gap-3 border-t border-hairline pt-3 text-body font-medium"
            >
              <MapPinIcon className="city-pin shrink-0 text-[#D6181F]" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const items: TabItem[] = PHASES.map((phase) => ({
  id: phase.id,
  label: phase.label,
  panel: <PhasePanel phase={phase} />,
}));

export function Phases() {
  return (
    <Section id="coverage" tone="surface">
      <SectionHead
        title="Three phases. One nation."
        lead="A thirty-six month build, sequenced so that each phase pays for the next."
        className="mb-14"
      />
      <Tabs items={items} ariaLabel="Network build phases" track="canvas" />
    </Section>
  );
}
