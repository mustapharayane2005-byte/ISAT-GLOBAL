'use client';

import { useRef, useState } from 'react';
import { MapPinIcon } from '@/components/MapPinIcon';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

type Status = 'idle' | 'sending' | 'success' | 'error';

// The cPanel static export can't host the Next.js API route, so that build
// posts to the PHP handler instead. Same payload shape either way.
const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_BUILD_TARGET === 'cpanel' ? '/contact.php' : '/api/contact';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const startedAtRef = useRef<number>(Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          company: data.get('company'),
          message: data.get('message'),
          company_website: data.get('company_website'),
          startedAt: startedAtRef.current,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(json.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <Section id="contact" tone="surface">
      <Reveal className="mx-auto max-w-measure-lead text-center">
        <h2 className="text-headline text-balance">Let&rsquo;s build digital freedom together.</h2>
        <p className="mx-auto mt-6 max-w-measure text-lead text-ink-muted">
          Operators, governments, lenders and enterprise partners: the build is open to
          collaboration at every layer.
        </p>

        {status === 'success' ? (
          <p role="status" aria-live="polite" className="mt-10 text-body font-medium text-ink">
            Thanks — your message has been sent. We&rsquo;ll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-lg text-left" noValidate>
            {/* Honeypot: hidden from real visitors, invisible to screen readers. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Leave this field empty</label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-caption font-medium text-ink">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={200}
                  className="mt-2 w-full rounded-frame border border-hairline bg-canvas px-4 py-3 text-body text-ink outline-none focus:border-accent-strong"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-caption font-medium text-ink">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={320}
                  className="mt-2 w-full rounded-frame border border-hairline bg-canvas px-4 py-3 text-body text-ink outline-none focus:border-accent-strong"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="text-caption font-medium text-ink">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={50}
                  className="mt-2 w-full rounded-frame border border-hairline bg-canvas px-4 py-3 text-body text-ink outline-none focus:border-accent-strong"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="text-caption font-medium text-ink">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  maxLength={200}
                  className="mt-2 w-full rounded-frame border border-hairline bg-canvas px-4 py-3 text-body text-ink outline-none focus:border-accent-strong"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-caption font-medium text-ink">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  className="mt-2 w-full rounded-frame border border-hairline bg-canvas px-4 py-3 text-body text-ink outline-none focus:border-accent-strong"
                />
              </div>
            </div>

            {status === 'error' ? (
              <p role="alert" aria-live="assertive" className="mt-4 text-caption font-medium text-[#D6181F]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 inline-flex items-center rounded-pill bg-accent-strong px-7 py-3 text-body font-medium text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-press active:scale-[0.98] disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

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

        <div className="mt-8 flex flex-col items-center gap-1 text-caption text-ink-muted sm:flex-row sm:justify-center sm:gap-6">
          <a href="tel:+2347089697172" className="hover:text-ink">
            +234 708 969 7172
          </a>
          <a href="tel:+2348075606396" className="hover:text-ink">
            +234 807 560 6396
          </a>
          <a href="mailto:Info@isatnigeria.com" className="hover:text-ink">
            Info@isatnigeria.com
          </a>
          <a href="mailto:partnership@isatnigeria.com" className="hover:text-ink">
            partnership@isatnigeria.com
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
