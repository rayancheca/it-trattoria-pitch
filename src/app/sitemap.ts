import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { LOCATIONS, CITIES, type CitySlug } from '@/data/locations';
import { MENU_ITEMS } from '@/data/menu';
import { REGIONS } from '@/data/regions';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPaths = [
    '/',
    '/menu',
    '/menu/builder',
    '/regions',
    '/story',
    '/locations',
    '/order',
    '/reserve',
    '/catering',
    '/private-events',
    '/journal',
    '/press',
    '/careers',
    '/contact',
    '/gift-cards',
    '/franchising',
    '/legal/privacy',
    '/legal/terms',
    '/legal/accessibility',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));

  const cityPaths = (Object.keys(CITIES) as CitySlug[]).map((city) => ({
    url: `${base}/locations/${city}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const locationPaths = LOCATIONS.map((loc) => ({
    url: `${base}/locations/${loc.city}/${loc.slug.slice(loc.city.length + 1)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const menuPaths = MENU_ITEMS.map((item) => ({
    url: `${base}/menu/${item.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const regionPaths = REGIONS.map((r) => ({
    url: `${base}/regions/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPaths,
    ...cityPaths,
    ...locationPaths,
    ...menuPaths,
    ...regionPaths,
  ];
}
