import { MapPinIcon } from '@/components/MapPinIcon';
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

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-hairline pt-10">
          <div className="flex items-center gap-2">
            <MapPinIcon className="shrink-0 text-[#D6181F]" />
            <span className="text-caption font-medium text-ink">Visit us</span>
          </div>
          <p className="text-caption text-ink-muted">
            29 Berkley Street, Ajele
            <br />
            Lagos Island, Lagos, Nigeria
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=29+Berkley+Street+Ajele+Lagos+Island+Lagos+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption font-medium text-[#D6181F] underline-offset-2 hover:underline"
          >
            Open in Maps
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
