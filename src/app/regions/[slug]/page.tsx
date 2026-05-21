import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { REGIONS, regionBySlug, type ItalianRegion } from '@/data/regions';
import { itemsByRegion, formatPrice } from '@/data/menu';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

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

const REGION_PHOTOS: Partial<Record<ItalianRegion, string>> = {
  calabria: '/images/regions/calabria.jpg',
  sicilia: '/images/regions/sicilia.jpg',
  campania: '/images/regions/campania.jpg',
  puglia: '/images/regions/puglia.jpg',
  lazio: '/images/regions/lazio.jpg',
  toscana: '/images/regions/toscana.jpg',
  'emilia-romagna': '/images/regions/emilia-romagna.jpg',
  liguria: '/images/regions/liguria.jpg',
};

export default async function RegionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const region = regionBySlug(slug as ItalianRegion);
  if (!region) notFound();

  const items = itemsByRegion(region.slug);
  const isCalabria = region.slug === 'calabria';
  const heroPhoto = REGION_PHOTOS[region.slug];

  return (
    <>
      {/* Hero — photo + overlay */}
      <section
        className="relative text-carta bg-caffe"
        style={{ minHeight: '60svh' }}
        aria-labelledby="region-heading"
      >
        {heroPhoto && (
          <ParallaxImage
            src={heroPhoto}
            alt={`${region.name} landscape`}
            className="absolute inset-0"
            intensity={10}
            overlay={`bg-gradient-to-b ${isCalabria ? 'from-monogram/40 via-monogram/55 to-monogram' : 'from-caffe/40 via-caffe/55 to-caffe'}`}
          />
        )}
        <div
          className="container-edge relative section flex flex-col justify-end"
          style={{ minHeight: '60svh' }}
        >
          <Reveal as="p" className={`label-it mb-3 ${isCalabria ? 'text-bergamot' : 'text-bergamot'}`}>
            <Link href="/regions" className="link-editorial text-carta/80">
              Regions
            </Link>{' '}
            · {region.italianName}
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              id="region-heading"
              className="font-display tracking-tight text-balance block"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              {region.name}
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-4 text-xl text-carta/85 max-w-2xl text-pretty">
            {region.blurb}
          </Reveal>
          {region.founderConnection && (
            <Reveal as="p" delay={0.3} className="mt-3 label-it text-bergamot">
              {region.founderConnection}
            </Reveal>
          )}
        </div>
      </section>

      {/* Long blurb + ingredient/dish columns */}
      <section className="section bg-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10">
          <Reveal as="div" className="md:col-span-5">
            <p className="label-it mb-3">La regione</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              {region.italianName}.
            </h2>
            <p className="mt-3 text-caffe-mute">Capital: {region.capital}</p>
          </Reveal>
          <Reveal as="div" delay={0.15} className="md:col-span-7">
            <p className="text-lg text-caffe-soft leading-relaxed text-pretty">{region.longBlurb}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="label-it mb-3">Signature ingredients</p>
                <ul className="space-y-1.5">
                  {region.signatureIngredients.map((ing) => (
                    <li key={ing} className="text-caffe">{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-it mb-3">Signature dishes</p>
                <ul className="space-y-1.5">
                  {region.signatureDishes.map((d) => (
                    <li key={d} className="text-caffe">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* On the menu from this region */}
      {items.length > 0 && (
        <section className="section bg-carta-deep">
          <div className="container-edge">
            <Reveal as="div" className="mb-12">
              <p className="label-it mb-3">Sul menù · On the menu</p>
              <h2 className="font-display tracking-tight text-balance" style={{ fontSize: 'var(--text-h1)' }}>
                Eat from {region.name}.
              </h2>
            </Reveal>
            <StaggerChildren className="divide-y divide-carta">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <Link
                    href={`/menu/${item.slug}`}
                    className="group grid md:grid-cols-12 gap-6 py-6 items-start"
                  >
                    <div className="md:col-span-3 aspect-square bg-carta rounded-sm overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                        style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                        aria-hidden
                      />
                    </div>
                    <div className="md:col-span-7">
                      <h3 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-caffe-soft text-pretty max-w-2xl">{item.description}</p>
                      {item.sourcing[0] && (
                        <p className="mt-3 text-xs text-caffe-mute">
                          Sourced — {item.sourcing[0].ingredient} · {item.sourcing[0].origin}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <p className="num font-display text-2xl">{formatPrice(item.priceCents)}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <div className="mt-12">
              <Link
                href="/order"
                className="inline-flex items-center justify-center h-12 px-7 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
              >
                Order from {region.name}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
