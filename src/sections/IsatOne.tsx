'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AudioWaveform, Cloud, Cpu, Landmark, RadioTower, ShieldCheck } from 'lucide-react';
import { IconTile } from '@/components/IconTile';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal, RevealWords } from '@/components/Reveal';
import { usePrefersReducedMotion } from '@/lib/motion';

const FEATURES = [
  {
    icon: Cloud,
    title: 'Cloud infrastructure',
    body: 'Planned regional cloud capacity, designed for data residency and compliance across the markets we serve.',
  },
  {
    icon: Cpu,
    title: 'AI and GPU computing',
    body: 'Planned training and inference capacity for research, industry and public services.',
  },
  {
    icon: RadioTower,
    title: 'Edge computing',
    body: 'Compute planned beside the radio, so latency-bound work will stay local.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity operations',
    body: 'A planned round-the-clock security operations centre to defend the platform and its tenants.',
  },
  {
    icon: AudioWaveform,
    title: 'Network operations',
    body: 'A planned control plane to watch radio, transport and core across every site.',
  },
  {
    icon: Landmark,
    title: 'Financial-sector cloud',
    body: 'A planned isolated environment, designed to meet the controls Nigerian banks and regulators expect.',
  },
];

export function IsatOne() {
  const reduce = usePrefersReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  // Slow vertical drift on the panorama, so the widest image on the page has
  // depth against the black field rather than sitting flat. The range collapses
  // to a flat 0 for reduced motion, rather than the style prop switching to
  // undefined, so the first paint stays identical to the server's render.
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);

  return (
    <section id="isat-one" className="bg-night py-section text-white">
      <div className="shell">
        <header className="mx-auto max-w-measure-head text-center">
          <p className="text-caption font-medium tracking-[0.02em] text-accent">ISAT ONE&trade;</p>
          <RevealWords
            text="ISAT ONE — Building infrastructure for the AI era"
            className="mt-5 text-headline text-balance"
          />
          <p className="mx-auto mt-6 max-w-measure text-lead text-night-muted">
            Our planned cloud, data-centre and AI infrastructure platform is being developed to
            support secure, scalable digital services for enterprises, governments and technology
            ecosystems.
          </p>
        </header>
      </div>

      <div ref={photoRef} className="shell mt-16 md:mt-20">
        <div className="overflow-hidden rounded-frame">
          {/* scale lives in the same style object as y, not a separate class:
              Framer's own inline transform for y would otherwise silently
              override a static scale-[1.16] class on this element. */}
          <motion.div style={{ y: parallaxY, scale: 1.16 }}>
            <PhotoSlot
              id="isat-one"
              ratio="banner"
              tone="dark"
              caption="Built for scale. The exterior of a data-centre building, photographed from its approach."
              objectPosition="50% 50%"
            />
          </motion.div>
        </div>
        <p className="mt-3 text-center text-[12px] text-[#6E6E73]">Concept illustration</p>
      </div>

      <div className="shell">
        <ul className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal
                as="li"
                key={feature.title}
                delay={(i % 3) * 0.08}
                className="border-t border-night-hairline pt-6"
              >
                <IconTile icon={Icon} />
                <h3 className="mt-5 text-body font-semibold">{feature.title}</h3>
                <p className="mt-2 max-w-measure text-body text-night-muted">{feature.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
