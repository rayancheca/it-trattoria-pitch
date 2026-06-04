import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { StickyOrderBar } from '@/components/layout/StickyOrderBar';
import { LocationPicker } from '@/components/order/LocationPicker';
import { CartDrawer } from '@/components/order/CartDrawer';
import { CartBar } from '@/components/order/CartBar';
import { CartBurst } from '@/components/order/CartBurst';
import { SITE } from '@/lib/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Fresh pasta, real Italian, no table`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    'Counter-service Italian by two Calabrian brothers. Fresh pasta made daily, pizza alla pala, real espresso. Four trattorias across Miami Beach and Manhattan.',
  applicationName: SITE.shortName,
  authors: [{ name: 'Renato Iera' }, { name: 'Gio Iera' }],
  keywords: [
    'italian counter service',
    'fresh pasta',
    'italian restaurant Miami Beach',
    'italian restaurant NYC',
    'calabrian food',
    'pizza alla pala',
    'italian breakfast',
    'penn station italian',
    'bryant park italian',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
  },
};

export const viewport: Viewport = {
  themeColor: '#1F4D2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carta text-caffe">
        <Nav />
        <main id="main" className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <LocationPicker />
        <CartDrawer />
        <CartBar />
        <CartBurst />
        <StickyOrderBar />
      </body>
    </html>
  );
}
