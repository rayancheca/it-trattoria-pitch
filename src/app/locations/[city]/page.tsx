import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CITIES, LOCATIONS, type CitySlug } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const meta = CITIES[city as CitySlug];
  if (!meta) return {};
  return pageMetadata({
    title: `${meta.name} — IT Trattoria`,
    description: meta.subtitle,
    path: `/locations/${city}`,
  });
}

export default async function CityHubPage({ params }: PageProps) {
  const { city } = await params;
  const cityKey = city as CitySlug;
  const meta = CITIES[cityKey];
  if (!meta) notFound();

  const locs = LOCATIONS.filter((l) => l.city === cityKey);

  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">
            {cityKey === 'miami-beach' ? 'Florida' : 'New York'}
          </p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            {meta.name}
          </h1>
          <p className="mt-4 text-xl text-caffe-soft max-w-2xl text-pretty">{meta.subtitle}</p>
        </div>
      </section>

      <section className="section-tight bg-cartaDeep border-t border-carta">
        <div className="container-edge grid md:grid-cols-2 gap-10">
          {locs.map((loc) => {
            const status = getOpenStatus(loc.hours, loc.timezone);
            const detailPath = `/locations/${cityKey}/${loc.slug.slice(cityKey.length + 1)}`;
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
                      {status.message}
                    </span>
                  </div>
                </div>
                <h2 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors">
                  {loc.shortName}
                </h2>
                <p className="mt-1 text-caffe-soft">{loc.address.line1}, {loc.address.city}</p>
                <p className="mt-2 text-sm text-caffe-mute">
                  Today {formatRange(loc.hours.monday)} · {loc.phoneFormatted}
                </p>
                <p className="mt-4 text-pretty text-caffe-soft">{loc.neighborhood.note}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
