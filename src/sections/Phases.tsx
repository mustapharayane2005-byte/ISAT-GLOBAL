import {
  Building2,
  Handshake,
  Lightbulb,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { MapPinIcon } from '@/components/MapPinIcon';
import { NigeriaMap, type MapPhase } from '@/components/NigeriaMap';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { Tabs, type TabItem } from '@/components/Tabs';

type Phase = {
  id: MapPhase;
  label: string;
  window: string;
  summary: string;
  cities: string[];
  targets?: string[];
};

const PHASES: Phase[] = [
  {
    id: 'phase-1',
    label: 'Phase 1',
    window: '0 to 12 months',
    summary:
      'Dense 3.5 GHz build across the four cities that carry most of Nigeria\u2019s data traffic, anchored on new metro fibre.',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
    targets: [
      'Commercial launch in Lagos, Abuja, Port Harcourt and Ibadan',
      'Core 5G network infrastructure',
      'Enterprise and government connectivity',
      'Initial fixed wireless access services',
      'Strategic fibre integration',
      'AI-enabled network operations centre',
      'Initial edge computing infrastructure',
    ],
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    window: '13 to 24 months',
    summary:
      'The network will move inland. Six commercial centres will come online, linked by long-haul fibre to the coastal landing points.',
    cities: ['Kano', 'Kaduna', 'Enugu', 'Benin', 'Owerri', 'Ilorin'],
    targets: [
      'Expanded 5G coverage to major cities',
      'Scaled fibre backbone and edge infrastructure',
      'Enterprise, industrial and smart city solutions',
    ],
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    window: '25 to 36 months',
    summary:
      'Every state capital and the regional cities between them, to complete national coverage of the 3.5 GHz layer.',
    cities: ['All 36 state capitals', 'Regional cities nationwide'],
    targets: [
      'Nationwide 5G in urban and high-demand areas',
      'Fibre extended to all states and key corridors',
      'Advanced 5G applications such as IoT, AI, XR and smart cities',
    ],
  },
];

const ENABLERS = [
  { icon: Scale, title: 'Regulatory support' },
  { icon: Handshake, title: 'Investment-friendly environment' },
  { icon: Building2, title: 'Infrastructure collaboration' },
  { icon: Lightbulb, title: 'Innovation & R&D' },
  { icon: ShieldCheck, title: 'Security & resilience' },
  { icon: Users, title: 'Local content & jobs' },
];

function PhasePanel({ phase }: { phase: Phase }) {
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <NigeriaMap phase={phase.id} />

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

        {phase.targets ? (
          <div className="mt-10">
            <p className="text-caption font-medium text-ink">
              {phase.id === 'phase-1' ? 'First 12 months, planned targets' : 'Planned targets'}
            </p>
            <ul className="mt-4 space-y-3">
              {phase.targets.map((target) => (
                <li key={target} className="flex items-start gap-3 text-body text-ink-muted">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {target}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
        lead="A thirty-six month build, sequenced so that each phase will pay for the next."
        className="mb-14"
      />
      <Tabs items={items} ariaLabel="Network build phases" track="canvas" />

      <div className="mt-24">
        <h3 className="text-title">What will help us deliver</h3>
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ENABLERS.map((enabler, i) => {
            const Icon = enabler.icon;
            return (
              <Reveal
                as="li"
                key={enabler.title}
                delay={(i % 3) * 0.08}
                className="flex items-center gap-4 border-t border-hairline pt-5"
              >
                <Icon size={22} strokeWidth={1.5} className="shrink-0 text-[#D6181F]" aria-hidden />
                <p className="text-body font-semibold text-ink">{enabler.title}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
