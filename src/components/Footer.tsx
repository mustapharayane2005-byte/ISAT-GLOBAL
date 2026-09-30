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
      { label: 'Cloud infrastructure', href: '/#isat-one' },
      { label: 'AI and GPU computing', href: '/#isat-one' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Partnerships', href: 'mailto:partnership@isatnigeria.com' },
      { label: 'Call +234 708 969 7172', href: 'tel:+2347089697172' },
    ],
  },
];

const ADDRESSES = [
  {
    lines: ['29 Berkley Street, Ajele', 'Lagos Island, Lagos, Nigeria'],
    mapsQuery: '29+Berkley+Street+Ajele+Lagos+Island+Lagos+Nigeria',
  },
  {
    lines: ['Stallion 42, Blantyre Street', 'Wuse 2, Abuja, Nigeria'],
    mapsQuery: 'Stallion+42+Blantyre+Street+Wuse+2+Abuja+Nigeria',
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
              alt="ISAT"
              width={33}
              height={42}
              className="h-[42px] w-auto"
            />
            <p className="mt-5 max-w-measure text-body">
              Connecting Africa to what&rsquo;s next.
            </p>

            <div className="mt-5 space-y-5">
              {ADDRESSES.map((addr) => (
                <address key={addr.mapsQuery} className="max-w-measure not-italic text-body">
                  <span className="flex items-start gap-2">
                    <MapPinIcon className="mt-[3px] shrink-0 text-[#D6181F]" />
                    <span>
                      {addr.lines[0]}
                      <br />
                      {addr.lines[1]}
                    </span>
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${addr.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block pl-[26px] text-caption font-medium text-[#D6181F] hover:underline"
                  >
                    Open in Maps
                  </a>
                </address>
              ))}
            </div>

            <div className="mt-5 space-y-1 text-body">
              <a href="tel:+2347089697172" className="block transition-colors hover:text-ink">
                +234 708 969 7172
              </a>
              <a href="tel:+2348075606396" className="block transition-colors hover:text-ink">
                +234 807 560 6396
              </a>
              <a href="mailto:Info@isatnigeria.com" className="block transition-colors hover:text-ink">
                Info@isatnigeria.com
              </a>
            </div>
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
            Coverage, investment, capacity and economic figures shown on this page are ISAT
            projections and planning targets, not guaranteed results. Site counts include planned
            build-out through 2030.
          </p>
          <p className="mt-4 text-caption">
            &copy; {new Date().getFullYear()} ISAT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
