import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

export function Contact() {
  return (
    <Section id="contact" tone="surface">
      <Reveal className="mx-auto max-w-measure-lead text-center">
        <h2 className="text-headline text-balance">Let&rsquo;s build digital freedom together.</h2>
        <p className="mx-auto mt-6 max-w-measure text-lead text-ink-muted">
          Operators, governments, lenders and enterprise partners: the build is open to
          collaboration at every layer.
        </p>
        <a
          href="mailto:partnerships@isat.com.ng"
          className="mt-10 inline-flex items-center rounded-pill bg-accent-strong px-7 py-3 text-body font-medium text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-press active:scale-[0.98]"
        >
          Contact us
        </a>
        <p className="mt-6 text-caption text-ink-muted">partnerships@isat.com.ng</p>
      </Reveal>
    </Section>
  );
}
