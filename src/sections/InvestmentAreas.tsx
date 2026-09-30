import {
  BrainCircuit,
  Building2,
  Cable,
  Cloud,
  GraduationCap,
  RadioTower,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { IconTile } from '@/components/IconTile';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';

const AREAS = [
  { icon: RadioTower, title: '5G network deployment', body: 'Planned rollout of dense 3.5 GHz coverage across priority cities.' },
  { icon: Cable, title: 'Fibre & backbone expansion', body: 'Planned metro and long-haul fibre linking every phase of the build.' },
  { icon: Server, title: 'Edge & data centres', body: 'Planned facilities placing compute closer to where it is needed.' },
  { icon: Cloud, title: 'Cloud platforms', body: 'Planned regional cloud capacity for enterprises and public services.' },
  { icon: BrainCircuit, title: 'AI infrastructure', body: 'Planned training and inference capacity for research and industry.' },
  { icon: Building2, title: 'Private 5G & enterprise', body: 'Planned dedicated networks for factories, campuses and sites.' },
  { icon: GraduationCap, title: 'Digital education', body: 'Planned connectivity aimed at classrooms and remote learning.' },
  { icon: ShieldCheck, title: 'Cybersecurity & trust', body: 'Planned security operations to protect the platform and its users.' },
];

export function InvestmentAreas() {
  return (
    <Section tone="surface">
      <SectionHead
        kicker={<p className="mb-4 text-caption font-semibold text-[#D6181F]">Planned investment areas</p>}
        title="Where the build will focus."
      />

      <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {AREAS.map((area, i) => (
          <Reveal as="li" key={area.title} delay={(i % 4) * 0.08} className="text-left">
            <IconTile icon={area.icon} />
            <h3 className="mt-5 text-body font-semibold">{area.title}</h3>
            <p className="mt-2 max-w-measure text-body text-ink-muted">{area.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
