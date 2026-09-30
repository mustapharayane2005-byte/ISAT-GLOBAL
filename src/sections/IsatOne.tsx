'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Bank,
  Broadcast,
  CloudCheck,
  Cpu,
  ShieldCheck,
  Waveform,
} from '@phosphor-icons/react/dist/ssr';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal, RevealWords } from '@/components/Reveal';
import { usePrefersReducedMotion } from '@/lib/motion';

const FEATURES = [
  {
    icon: CloudCheck,
    title: 'Cloud infrastructure',
    body: 'Planned regional cloud capacity, designed for data residency and compliance across the markets we serve.',
  },
  {
    icon: Cpu,
    title: 'AI and GPU computing',
    body: 'Training and inference capacity for research, industry and public services.',
  },
  {
    icon: Broadcast,
    title: 'Edge computing',
    body: 'Compute placed beside the radio, so latency-bound work stays local.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity operations',
    body: 'A round-the-clock security operations centre defending the platform and its tenants.',
  },
  {
    icon: Waveform,
    title: 'Network operations',
    body: 'One control plane watching radio, transport and core across every site.',
  },
  {
    icon: Bank,
    title: 'Financial-sector cloud',
    body: 'An isolated environment built to the controls Nigerian banks and regulators expect.',
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
              ratio="21/9"
              tone="dark"
              caption="Built for scale. A row of server racks recedes down a data-hall aisle, cable ports lit in red and blue."
              objectPosition="55% 62%"
            />
          </motion.div>
        </div>
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
                <Icon size={26} weight="light" className="text-accent" aria-hidden />
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
