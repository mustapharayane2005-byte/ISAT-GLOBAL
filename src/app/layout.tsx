import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://isat.com.ng'),
  title: {
    default: 'iSAT 5G. Be free.',
    template: '%s | iSAT',
  },
  description: 'iSAT 5G. Be free.',
  openGraph: {
    title: 'iSAT 5G. Be free.',
    description: 'iSAT 5G. Be free.',
    url: 'https://isat.com.ng',
    siteName: 'iSAT',
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
  name: 'iSAT',
  url: 'https://isat.com.ng',
  logo: 'https://isat.com.ng/images/logo-isat.png',
  telephone: '+234-1-279-2000',
  email: 'partnerships@isat.com.ng',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '29 Berkley Street, Ajele',
    addressLocality: 'Lagos Island',
    addressRegion: 'Lagos',
    addressCountry: 'NG',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
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
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
