import { Counter } from '@/components/Counter';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

const FIGURES = [
  { to: 10, suffix: 'M+', label: 'Customers targeted across services' },
  { to: 15000, suffix: '+', label: 'Sites, current and planned' },
  { to: 20000, suffix: '+', label: 'Kilometres of fibre planned, access and backbone' },
  { to: 3, prefix: '$', suffix: 'B+', label: 'Planned investment, 2025 to 2030' },
];

export function Figures() {
  return (
    <Section tone="surface" className="!py-16 md:!py-24">
      <p className="text-center text-caption font-semibold text-[#D6181F]">Planned scale</p>
      <h2 className="mt-3 text-center text-title">Built for national scale.</h2>

      <ul className="mt-14 grid grid-cols-2 gap-y-12 gap-x-6 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
        {FIGURES.map((figure, i) => (
          <Reveal
            as="li"
            key={figure.label}
            delay={i * 0.08}
            className="border-t border-hairline pt-6 text-left"
          >
            <p className="tnum whitespace-nowrap text-stat">
              <Counter to={figure.to} prefix={figure.prefix} suffix={figure.suffix} />
            </p>
            <p className="mt-3 line-clamp-2 max-w-[22ch] text-body text-ink-muted">{figure.label}</p>
          </Reveal>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-measure text-center text-[13px] text-ink-muted">
        Figures reflect ISAT&rsquo;s plans and targets and are subject to regulatory approvals and
        market conditions.
      </p>
    </Section>
  );
}
