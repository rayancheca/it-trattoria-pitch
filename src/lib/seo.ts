import type { Metadata } from 'next';

export const SITE = {
  name: 'IT — Italian Trattoria',
  shortName: 'IT Trattoria',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://it-trattoria-pitch.vercel.app',
  defaultLocale: 'en',
  locales: ['en', 'it', 'es-US'] as const,
  twitter: '@it.trattoria.usa',
  instagram: '@it.trattoria.usa',
  ogImageDefault: '/og/default.png',
  themeColor: '#1F4D2E',
} as const;

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  ogImage = SITE.ogImageDefault,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title.endsWith(SITE.shortName) ? title : `${title} — ${SITE.shortName}`;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'it': url,
        'es-US': url,
        'x-default': url,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
