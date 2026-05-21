import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS, CITIES, type CitySlug } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';
import { ArrowLink } from '@/components/ui/ArrowLink';

export const metadata = pageMetadata({
  title: 'Locations — Miami Beach & New York',
  description:
    'Four IT trattorias across the US — two in Miami Beach (Collins, Lincoln Road) and two in Manhattan (Midtown 7th, Midtown 5th).',
  path: '/locations',
});

export default function LocationsHubPage() {
  return (
    <>
      <section className="section bg-carta" aria-labelledby="locations-hub-heading">
        <div className="container-edge">
          <p className="label-it mb-4">Trovaci · Find us</p>
          <h1
            id="locations-hub-heading"
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Four trattorias.
            <br /> <span className="italic">Two cities you already love.</span>
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Walk in, beep, eat. Open from 7am for cappuccino and cornetti, fresh
            pasta from late morning, dolci until close.
          </p>
        </div>
      </section>

      {(Object.entries(CITIES) as [CitySlug, typeof CITIES[CitySlug]][]).map(([city, meta]) => {
        const locs = LOCATIONS.filter((l) => l.city === city);
        return (
          <section key={city} className="section bg-carta-deep border-t border-carta" aria-labelledby={`city-${city}`}>
            <div className="container-edge">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div>
                  <p className="label-it mb-3">{city === 'miami-beach' ? 'Florida' : 'New York'}</p>
                  <h2
                    id={`city-${city}`}
                    className="font-display tracking-tight text-balance"
                    style={{ fontSize: 'var(--text-h1)' }}
                  >
                    {meta.name}
                  </h2>
                  <p className="mt-3 text-caffe-soft">{meta.subtitle}</p>
                </div>
                <ArrowLink href={`/locations/${city}`}>See {meta.name} hub</ArrowLink>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                {locs.map((loc) => {
                  const status = getOpenStatus(loc.hours, loc.timezone);
                  const detailPath = `/locations/${city}/${loc.slug.slice(city.length + 1)}`;
                  return (
                    <Link key={loc.slug} href={detailPath} className="group block">
                      <div className="aspect-[16/10] bg-carta rounded-sm overflow-hidden relative mb-5">
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                          style={{ backgroundImage: `url('${loc.hero.src}')` }}
                          aria-hidden
                        />
                        <div className="absolute top-4 left-4 chip bg-carta/90 backdrop-blur-sm">
                          <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                          <span className={status.open ? 'text-monogram' : 'text-caffe-mute'}>
                            {status.open ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors">
                        {loc.shortName}
                      </h3>
                      <p className="mt-1 text-caffe-soft">{loc.address.line1}, {loc.address.city}</p>
                      <p className="mt-2 text-sm text-caffe-mute">
                        Today {formatRange(loc.hours.monday)} · {loc.phoneFormatted}
                      </p>
                      <p className="mt-4 text-pretty text-caffe-soft">{loc.neighborhood.note}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
