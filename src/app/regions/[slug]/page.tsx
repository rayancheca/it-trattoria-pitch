import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { REGIONS, regionBySlug, type ItalianRegion } from '@/data/regions';
import { MENU_ITEMS, itemsByRegion, formatPrice } from '@/data/menu';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = regionBySlug(slug as ItalianRegion);
  if (!region) return {};
  return pageMetadata({
    title: `${region.name} on the Menu`,
    description: region.longBlurb.slice(0, 155),
    path: `/regions/${slug}`,
  });
}

export default async function RegionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const region = regionBySlug(slug as ItalianRegion);
  if (!region) notFound();

  const items = itemsByRegion(region.slug);
  const isCalabria = region.slug === 'calabria';

  return (
    <>
      <section
        className={`section ${isCalabria ? 'bg-monogram text-carta' : 'bg-carta'}`}
        aria-labelledby="region-heading"
      >
        <div className="container-edge">
          <p className={`label-it mb-3 ${isCalabria ? 'text-bergamot' : ''}`}>
            <Link href="/regions" className={isCalabria ? 'text-carta/80 link-editorial' : 'link-editorial'}>
              Regions
            </Link>{' '}
            · {region.italianName}
          </p>
          <h1
            id="region-heading"
            className="font-display tracking-tight text-balance max-w-5xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            {region.name}
          </h1>
          <p className={`mt-4 text-xl max-w-2xl text-pretty ${isCalabria ? 'text-carta/85' : 'text-caffe-soft'}`}>
            {region.blurb}
          </p>
          {region.founderConnection && (
            <p className={`mt-3 label-it ${isCalabria ? 'text-bergamot' : 'text-peperoncino'}`}>
              {region.founderConnection}
            </p>
          )}
        </div>
      </section>

      {/* Long blurb */}
      <section className="section bg-carta border-t border-carta-deep">
        <div className="container-edge grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="label-it mb-3">La regione</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              {region.italianName}.
            </h2>
            <p className="mt-3 text-caffe-mute">Capital: {region.capital}</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-caffe-soft leading-relaxed text-pretty">
              {region.longBlurb}
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="label-it mb-3">Signature ingredients</p>
                <ul className="space-y-1">
                  {region.signatureIngredients.map((ing) => (
                    <li key={ing} className="text-caffe">{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-it mb-3">Signature dishes</p>
                <ul className="space-y-1">
                  {region.signatureDishes.map((d) => (
                    <li key={d} className="text-caffe">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On the menu from this region */}
      {items.length > 0 && (
        <section className="section bg-carta-deep">
          <div className="container-edge">
            <p className="label-it mb-3">Sul menù · On the menu</p>
            <h2
              className="font-display tracking-tight text-balance mb-12"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              Eat from {region.name}.
            </h2>
            <ul className="divide-y divide-carta">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/menu/${item.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5"
                  >
                    <div>
                      <h3 className="font-display text-2xl tracking-tight group-hover:text-peperoncino transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-caffe-soft text-pretty max-w-2xl">{item.description}</p>
                    </div>
                    <p className="num text-xl text-caffe shrink-0 self-start sm:self-baseline">
                      {formatPrice(item.priceCents)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/order"
              className="mt-12 inline-flex items-center justify-center h-12 px-7 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Order from {region.name}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
