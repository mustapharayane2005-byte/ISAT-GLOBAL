import type { Metadata } from 'next';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'The People Behind iSAT',
  description: 'The leadership team guiding ISAT Global Services.',
};

const LEADERS = [
  {
    name: 'Dr. Abdullah Adeyanju Binuyo, PhD',
    title: 'Managing Director/CEO',
    image: '/images/leadership/abdullah-binuyo.webp',
    width: 1157,
    height: 1280,
    position: '50% 15%',
    bio: 'Dr. Adeyanju Binuyo is a technology executive and strategist with over two decades of experience across digital infrastructure, telecoms, public policy and sustainable development. As MD/CEO of ISAT Global Services, he leads its evolution into an AI-native digital infrastructure and services platform, advancing next-generation connectivity, 5G, satellite, cloud and enterprise solutions across Nigeria and Africa. He is an alumnus of the University of Lagos, with executive education from the University of London and University of Oxford, and holds a PhD in Sustainable Development.',
  },
  {
    name: 'Sir Ganiyou Afolabi Moustapha',
    title: 'Chairman, ISAT Global Services Ltd.',
    image: '/images/leadership/ganiyou-moustapha.webp',
    width: 816,
    height: 1232,
    position: '50% 22%',
    bio: "Sir Ganiyou Afolabi Moustapha is a distinguished entrepreneur and strategic business leader with over two decades of experience spanning oil and gas, logistics and international commodity trading. As Chairman of ISAT Global Services Ltd., he provides strategic leadership and governance, guiding the company's ambitious growth agenda with a strong emphasis on integrity, innovation and sustainable value creation. An MBA holder and fully bilingual, he combines entrepreneurial instinct, global business experience and strategic foresight to build enduring enterprises and transform bold ideas into lasting impact.",
  },
];

export default function LeadershipPage() {
  return (
    <Section rhythm="tight" className="min-h-[60dvh]">
      <Reveal className="mx-auto max-w-measure-head text-center">
        <h1 className="text-headline text-balance">The people behind iSAT.</h1>
        <p className="mx-auto mt-6 max-w-measure text-lead text-ink-muted">
          Leading Nigeria&rsquo;s digital future.
        </p>
      </Reveal>

      <div className="mt-14 space-y-8 md:space-y-10">
        {LEADERS.map((leader) => (
          <Reveal key={leader.name} as="div">
            <article className="grid overflow-hidden rounded-frame border border-hairline bg-surface md:grid-cols-[2fr_3fr]">
              <div className="group relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[480px]">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={leader.width}
                  height={leader.height}
                  sizes="(min-width: 768px) 450px, 100vw"
                  style={{ objectPosition: leader.position }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-title text-ink">{leader.name}</h2>
                <p className="mt-2 text-lead font-medium text-[#F83A04]">{leader.title}</p>
                <p className="mt-6 text-body text-ink-muted">{leader.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Reserved: "Governance" and "Sustainability" blocks go here later. */}
      <div id="more" className="mt-14" />
    </Section>
  );
}
