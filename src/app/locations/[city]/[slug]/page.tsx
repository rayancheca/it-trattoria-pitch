import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS, type CitySlug, type LocationSlug } from '@/data/locations';
import {
  LocationDetailHero,
  LocationHours,
  LocationNeighborhood,
} from '@/components/locations/LocationDetail';
import { LocationSchema } from '@/components/locations/LocationSchema';
import { MENU_ITEMS, formatPrice } from '@/data/menu';
import { regionBySlug } from '@/data/regions';

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    city: loc.city,
    slug: loc.slug.slice(loc.city.length + 1),
  }));
}

function findLocation(city: string, slug: string) {
  const fullSlug = `${city}-${slug}` as LocationSlug;
  return LOCATIONS.find((l) => l.slug === fullSlug && l.city === (city as CitySlug));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, slug } = await params;
  const loc = findLocation(city, slug);
  if (!loc) return {};
  return pageMetadata({
    title: `${loc.address.line1} — ${loc.address.city} — IT Trattoria`,
    description: `${loc.neighborhood.note} Fresh pasta, pizza alla pala, real espresso. ${loc.phoneFormatted}.`,
    path: `/locations/${city}/${slug}`,
  });
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { city, slug } = await params;
  const loc = findLocation(city, slug);
  if (!loc) notFound();

  const featuredHere = MENU_ITEMS
    .filter((i) => i.availableAt.includes(loc.slug) && i.featured)
    .slice(0, 4);

  return (
    <>
      <LocationSchema location={loc} />
      <LocationDetailHero location={loc} />
      <LocationHours location={loc} />
      <LocationNeighborhood location={loc} />

      {/* Featured at this location */}
      <section className="section bg-carta" aria-labelledby="featured-here">
        <div className="container-edge">
          <p className="label-it mb-3">Sul menù qui · Featured here</p>
          <h2
            id="featured-here"
            className="font-display tracking-tight text-balance mb-12"
            style={{ fontSize: 'var(--text-h1)' }}
          >
            What to <span className="italic">eat</span> at {loc.shortName}.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHere.map((item) => (
              <Link key={item.id} href={`/menu/${item.slug}`} className="group block">
                <div className="aspect-square bg-carta-deep rounded-sm overflow-hidden mb-4 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                    style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                    aria-hidden
                  />
                </div>
                <p className="label-it mb-1">{regionBySlug(item.region)?.name}</p>
                <h3 className="font-display text-xl tracking-tight">{item.name}</h3>
                <p className="mt-2 num text-caffe">{formatPrice(item.priceCents)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catering / large groups */}
      {loc.catering && (
        <section className="section-tight bg-monogram text-carta" aria-labelledby="catering-here">
          <div className="container-edge grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="label-it text-bergamot mb-3">Catering</p>
              <h2 id="catering-here" className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
                Bring {loc.shortName} to your office.
              </h2>
            </div>
            <div className="text-carta/85">
              <p className="text-lg text-pretty max-w-prose">
                Office lunches, conference meals, large groups. We&rsquo;ll deliver from
                {' '}{loc.shortName} or set up on-site. Two days&rsquo; lead time, longer for
                groups over 50.
              </p>
              <Link
                href="/catering"
                className="mt-6 inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
              >
                Submit a catering inquiry
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
