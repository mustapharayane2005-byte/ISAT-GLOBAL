import { Counter } from '@/components/Counter';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

const FIGURES = [
  { to: 10, suffix: 'M+', label: 'Customers' },
  { to: 15000, suffix: '+', label: 'Sites, current and planned' },
  { to: 20000, suffix: '+', label: 'Kilometres of fibre' },
  { to: 3, prefix: '$', suffix: 'B+', label: 'Planned investment, 2025 to 2030' },
];

export function Figures() {
  return (
    <Section tone="surface" rhythm="tight">
      <ul className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
        {FIGURES.map((figure, i) => (
          <Reveal
            as="li"
            key={figure.label}
            delay={i * 0.08}
            className="border-t border-hairline pt-6 text-left"
          >
            <p className="text-stat">
              <Counter to={figure.to} prefix={figure.prefix} suffix={figure.suffix} />
            </p>
            <p className="mt-3 max-w-[22ch] text-body text-ink-muted">{figure.label}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
