import type { Location } from '@/data/locations';
import { DAY_KEYS } from '@/lib/hours';
import { SITE } from '@/lib/seo';

interface Props {
  location: Location;
}

/**
 * Inline JSON-LD for `Restaurant` (extends `LocalBusiness`). Renders into a
 * `<script>` tag in the page head via the App Router pattern.
 *
 * Per R6: this is one of the three highest-leverage technical SEO fixes —
 * the current site ships zero `Restaurant` schema, costing Map Pack visibility.
 */
export function LocationSchema({ location }: Props) {
  const openingHours = DAY_KEYS.flatMap((day) => {
    const range = location.hours[day];
    if (range === 'closed') return [];
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayToSchema(day),
        opens: range.open,
        closes: range.close,
      },
    ];
  });

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE.url}/locations/${location.city}/${location.slug.slice(location.city.length + 1)}`,
    name: location.name,
    image: location.hero.src,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.line1,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    telephone: location.phone,
    priceRange: '$$',
    servesCuisine: ['Italian', 'Calabrian', 'Mediterranean'],
    acceptsReservations: Boolean(location.reservations),
    menu: `${SITE.url}/menu`,
    url: `${SITE.url}/locations/${location.city}/${location.slug.slice(location.city.length + 1)}`,
    openingHoursSpecification: openingHours,
    sameAs: ['https://www.instagram.com/it.trattoria.usa/'],
  };

  return (
    <script
      type="application/ld+json"
      // Stringify on the server; no user input flows in
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function dayToSchema(day: string): string {
  return ({
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  } as Record<string, string>)[day] ?? day;
}
