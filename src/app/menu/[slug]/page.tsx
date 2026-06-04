import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata, SITE } from '@/lib/seo';
import { MENU_ITEMS, formatPrice, itemBySlug, CATEGORIES, type MenuCategory } from '@/data/menu';
import { regionBySlug } from '@/data/regions';
import { EspressoCup } from '@/components/three';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_SLUGS: MenuCategory[] = ['aperitivo', 'al-banco', 'a-tavola', 'dolce', 'bevande'];

export async function generateStaticParams() {
  const itemSlugs = MENU_ITEMS.map((i) => ({ slug: i.slug }));
  const catSlugs = CATEGORY_SLUGS.map((c) => ({ slug: c }));
  return [...itemSlugs, ...catSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (CATEGORY_SLUGS.includes(slug as MenuCategory)) {
    const meta = CATEGORIES[slug as MenuCategory];
    return pageMetadata({
      title: `${meta.name} — Menu`,
      description: meta.blurb,
      path: `/menu/${slug}`,
    });
  }
  const item = itemBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: item.longDescription ?? item.description,
    path: `/menu/${slug}`,
  });
}

export default async function MenuSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Category route
  if (CATEGORY_SLUGS.includes(slug as MenuCategory)) {
    return <CategoryPage cat={slug as MenuCategory} />;
  }

  const item = itemBySlug(slug);
  if (!item) notFound();
  return <ItemPage slug={slug} />;
}

function CategoryPage({ cat }: { cat: MenuCategory }) {
  const meta = CATEGORIES[cat];
  const items = MENU_ITEMS.filter((i) => i.category === cat);
  const isBevande = cat === 'bevande';
  return (
    <>
      <section className={`section relative overflow-hidden ${isBevande ? 'bg-caffe text-carta' : 'bg-carta'}`}>
        <div className="container-edge relative">
          <p className={`label-it mb-3 ${isBevande ? 'text-bergamot' : ''}`}>
            <Link href="/menu" className={isBevande ? 'link-editorial text-carta/80' : 'link-editorial'}>Menu</Link> · {meta.italianName}
          </p>
          <h1 className="font-display tracking-tight text-balance" style={{ fontSize: 'var(--text-display)' }}>
            {meta.name}
          </h1>
          <p className={`mt-4 text-xl max-w-2xl text-pretty ${isBevande ? 'text-carta/85' : 'text-caffe-soft'}`}>{meta.blurb}</p>
        </div>
        {isBevande && (
          <div className="absolute right-[4%] top-1/2 -translate-y-1/2 w-[36vw] max-w-[420px] aspect-square pointer-events-none lg:pointer-events-auto hidden md:block" aria-hidden>
            <EspressoCup className="w-full h-full" />
          </div>
        )}
      </section>
      <section className="section-tight bg-carta-deep border-t border-carta">
        <div className="container-edge">
          <ul className="divide-y divide-carta">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/menu/${item.slug}`}
                  className="group grid md:grid-cols-12 gap-6 py-8 items-start"
                >
                  <div className="md:col-span-3 aspect-square bg-carta rounded-sm overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                      style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                      aria-hidden
                    />
                  </div>
                  <div className="md:col-span-7">
                    <p className="label-it mb-1">{regionBySlug(item.region)?.name ?? item.region}</p>
                    <h2 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-caffe-soft text-pretty max-w-prose">
                      {item.longDescription ?? item.description}
                    </p>
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
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ItemPage({ slug }: { slug: string }) {
  const item = itemBySlug(slug);
  if (!item) notFound();
  const region = regionBySlug(item.region);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.longDescription ?? item.description,
    image: item.photo?.src ? `${SITE.url}${item.photo.src}` : undefined,
    offers: {
      '@type': 'Offer',
      price: (item.priceCents / 100).toFixed(2),
      priceCurrency: 'USD',
    },
    suitableForDiet: item.dietary
      .filter((d) => ['vegetarian', 'vegan', 'gluten-free'].includes(d))
      .map((d) => `https://schema.org/${d.replace('-', '')}Diet`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <section className="section bg-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-6">
            <div className="aspect-[4/5] bg-carta-deep rounded-sm overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                aria-hidden
              />
              <div className="absolute top-4 left-4 chip chip-accent bg-carta/90">
                {region?.name ?? item.region}
              </div>
            </div>
          </div>
          <div className="md:col-span-6 md:pt-8">
            <p className="label-it mb-3">
              <Link href="/menu" className="link-editorial">Menu</Link> ·{' '}
              {CATEGORIES[item.category].italianName}
            </p>
            <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              {item.name}
            </h1>
            {item.italianName && item.italianName !== item.name && (
              <p className="mt-2 font-display italic text-2xl text-caffe-soft">{item.italianName}</p>
            )}
            <p className="mt-6 text-lg text-caffe-soft text-pretty max-w-prose">
              {item.longDescription ?? item.description}
            </p>
            <p className="mt-8 num font-display text-4xl">{formatPrice(item.priceCents)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.dietary.includes('spicy') && <span className="chip chip-accent">Spicy</span>}
              {item.dietary.includes('vegetarian') && <span className="chip">Vegetarian</span>}
              {item.dietary.includes('vegan') && <span className="chip">Vegan</span>}
              {item.allergens.length > 0 && (
                <span className="chip">Allergens: {item.allergens.join(', ')}</span>
              )}
            </div>
            <Link
              href="/order"
              className="mt-8 inline-flex items-center justify-center h-12 px-7 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Add to order
            </Link>
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="section bg-carta-deep border-t border-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="label-it mb-3">Ingredienti · Sourcing</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
              Named ingredients.
            </h2>
            <p className="mt-3 text-caffe-soft text-pretty max-w-prose">
              We tell you where every ingredient comes from. If we can&rsquo;t name a
              producer, it doesn&rsquo;t go in.
            </p>
          </div>
          <div className="md:col-span-8">
            <ul className="divide-y divide-carta">
              {item.sourcing.map((s, idx) => (
                <li key={idx} className="py-4">
                  <p className="font-display text-xl tracking-tight">{s.ingredient}</p>
                  <p className="mt-1 text-sm text-caffe-mute">
                    {s.producer && <>{s.producer} · </>}{s.origin}
                  </p>
                  {s.note && <p className="mt-1 text-caffe-soft text-sm">{s.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* From the region */}
      {region && (
        <section className="section bg-carta">
          <div className="container-edge">
            <p className="label-it mb-3">Più di · More from</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
              {region.name}
            </h2>
            <p className="mt-3 text-caffe-soft max-w-prose">{region.blurb}</p>
            <Link href={`/regions/${region.slug}`} className="mt-6 inline-block link-editorial text-lg">
              Read about {region.name} →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
