import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@/components/MapPinIcon';

const COLUMNS = [
  {
    heading: 'Network',
    links: [
      { label: '5G', href: '/#five-g' },
      { label: 'Coverage', href: '/#coverage' },
      { label: 'Impact', href: '/#impact' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'iSAT One', href: '/#isat-one' },
      { label: 'Sovereign cloud', href: '/#isat-one' },
      { label: 'AI and GPU computing', href: '/#isat-one' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Partnerships', href: 'mailto:partnerships@isat.com.ng' },
      { label: 'Call +234 1 279 2000', href: 'tel:+23412792000' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas py-16 text-ink-muted">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <Image
              src="/images/logo-isat.png"
              alt="iSAT"
              width={33}
              height={42}
              className="h-[42px] w-auto"
            />
            <p className="mt-5 max-w-measure text-body">
              Digital freedom for every Nigerian.
            </p>
            <address className="mt-5 max-w-measure not-italic text-body">
              <span className="flex items-start gap-2">
                <MapPinIcon className="mt-[3px] shrink-0 text-[#D6181F]" />
                <span>
                  29 Berkley Street, Ajele
                  <br />
                  Lagos Island, Lagos, Nigeria
                </span>
              </span>
              <a href="tel:+23412792000" className="mt-3 block transition-colors hover:text-ink">
                +234 1 279 2000
              </a>
              <a
                href="mailto:partnerships@isat.com.ng"
                className="block transition-colors hover:text-ink"
              >
                partnerships@isat.com.ng
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 md:gap-x-16">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h3 className="text-caption font-semibold text-ink">{column.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-caption transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-hairline pt-8">
          <p className="max-w-[70ch] text-caption">
            Coverage, investment, capacity and economic figures shown on this page are iSAT
            projections and planning targets, not guaranteed results. Site counts include planned
            build-out through 2030.
          </p>
          <p className="mt-4 text-caption">
            &copy; {new Date().getFullYear()} iSAT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
