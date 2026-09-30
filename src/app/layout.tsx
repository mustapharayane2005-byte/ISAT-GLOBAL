import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import Script from 'next/script';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Countdown } from '@/components/Countdown';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://isat.com.ng'),
  title: {
    default: 'ISAT | Connecting Africa to What’s Next',
    template: '%s | ISAT',
  },
  description:
    'ISAT is a digital infrastructure and services company building intelligent connectivity for people, businesses and communities across Africa.',
  openGraph: {
    title: 'ISAT | Connecting Africa to What’s Next',
    description:
      'ISAT is a digital infrastructure and services company building intelligent connectivity for people, businesses and communities across Africa.',
    url: 'https://isat.com.ng',
    siteName: 'ISAT',
    locale: 'en_NG',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ISAT',
  url: 'https://isat.com.ng',
  logo: 'https://isat.com.ng/images/logo-isat.png',
  telephone: ['+234-708-969-7172', '+234-807-560-6396'],
  email: 'Info@isatnigeria.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '29 Berkley Street, Ajele',
      addressLocality: 'Lagos Island',
      addressRegion: 'Lagos',
      addressCountry: 'NG',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Stallion 42, Blantyre Street',
      addressLocality: 'Wuse 2',
      addressRegion: 'Abuja',
      addressCountry: 'NG',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
        {/* Runs before the page paints (Next.js hoists beforeInteractive
            scripts into <head>, executed during HTML parsing): every reload
            lands back at the hero, instantly, on mobile and desktop alike,
            instead of the browser restoring last scroll position or jumping
            straight to a hash target. Design, animation and nav are untouched. */}
        <Script id="scroll-to-top-on-load" strategy="beforeInteractive">
          {`
            try {
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              if (location.hash) {
                history.replaceState(null, '', location.pathname + location.search);
              }
              // The site sets html { scroll-behavior: smooth } globally, and
              // plain scrollTo(0, 0) defers to that (it's spec'd as behavior:
              // 'auto', which means "honour the CSS property"), so it would
              // animate here rather than jump. behavior: 'instant' is the
              // explicit override that ignores scroll-behavior entirely.
              var toTop = function () {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              };
              toTop();
              // Stripping the hash above does not cancel the browser's own
              // native "scroll to the fragment's target element" behaviour,
              // which is queued from the original navigation and can still
              // fire once that element exists in the DOM, after this script
              // has already run. A second, later correction on load is what
              // reliably wins that race.
              window.addEventListener('load', toTop);
            } catch (e) {}
          `}
        </Script>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-2.5 focus:text-nav focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {/* Normal block, not sticky or fixed: scrolls away with the page.
            The nav (fixed) sits offset below it at rest and closes the gap
            once this has scrolled out of view; see Nav.tsx. */}
        <Countdown variant="dark" />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
