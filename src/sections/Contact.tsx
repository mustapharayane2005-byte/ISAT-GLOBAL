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
          href="mailto:partnership@isatnigeria.com"
          className="mt-10 inline-flex items-center rounded-pill bg-accent-strong px-7 py-3 text-body font-medium text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-press active:scale-[0.98]"
        >
          Contact us
        </a>
        <p className="mt-6 text-caption text-ink-muted">partnership@isatnigeria.com</p>

        <div className="mt-12 flex flex-col items-center gap-8 border-t border-hairline pt-10 sm:flex-row sm:justify-center sm:gap-16">
          {[
            {
              lines: ['29 Berkley Street, Ajele', 'Lagos Island, Lagos, Nigeria'],
              mapsQuery: '29+Berkley+Street+Ajele+Lagos+Island+Lagos+Nigeria',
            },
            {
              lines: ['Stallion 42, Blantyre Street', 'Wuse 2, Abuja, Nigeria'],
              mapsQuery: 'Stallion+42+Blantyre+Street+Wuse+2+Abuja+Nigeria',
            },
          ].map((addr) => (
            <div key={addr.mapsQuery} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="shrink-0 text-[#D6181F]" />
                <span className="text-caption font-medium text-ink">Visit us</span>
              </div>
              <p className="text-caption text-ink-muted">
                {addr.lines[0]}
                <br />
                {addr.lines[1]}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${addr.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption font-medium text-[#D6181F] underline-offset-2 hover:underline"
              >
                Open in Maps
              </a>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
