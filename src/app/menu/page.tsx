import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { CATEGORIES, MENU_ITEMS, formatPrice, type MenuCategory } from '@/data/menu';
import { regionBySlug } from '@/data/regions';

export const metadata = pageMetadata({
  title: 'Menu — Fresh pasta, pizza alla pala, dolci',
  description:
    'Browse the full IT menu: pasta, pizza, antipasti, dolci. Sourced from named producers across Italy. Order from your nearest trattoria in Miami Beach or NYC.',
  path: '/menu',
});

const CATEGORY_ORDER: MenuCategory[] = ['aperitivo', 'al-banco', 'a-tavola', 'dolce', 'bevande'];

export default function MenuPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Menù · The menu</p>
          <h1
            className="font-display tracking-tight text-balance max-w-5xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Italy on a counter.
            <br /> <span className="italic">Eat by region. Or by hour of the day.</span>
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Aperitivo &mdash; Al Banco &mdash; A Tavola &mdash; Dolce. Four acts.
            Every dish carries its Italian region with it. Every ingredient is named.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/menu/builder"
              className="inline-flex items-center justify-center h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors"
            >
              Build your pasta
            </Link>
            <Link
              href="/regions"
              className="inline-flex items-center justify-center h-12 px-6 border border-caffe rounded-sm hover:bg-caffe hover:text-carta transition-colors"
            >
              Eat by region
            </Link>
          </div>
        </div>
      </section>

      {CATEGORY_ORDER.map((cat) => {
        const meta = CATEGORIES[cat];
        const items = MENU_ITEMS.filter((i) => i.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="section bg-carta-deep border-t border-carta" aria-labelledby={`cat-${cat}`}>
            <div className="container-edge">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div>
                  <p className="label-it mb-3">{meta.italianName}</p>
                  <h2
                    id={`cat-${cat}`}
                    className="font-display tracking-tight text-balance"
                    style={{ fontSize: 'var(--text-h1)' }}
                  >
                    {meta.name}
                  </h2>
                  <p className="mt-3 text-caffe-soft max-w-prose">{meta.blurb}</p>
                </div>
                <Link href={`/menu/${cat}`} className="link-editorial text-lg">
                  See all {meta.name.toLowerCase()} →
                </Link>
              </div>
              <ul className="divide-y divide-carta">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/menu/${item.slug}`}
                      className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-2xl tracking-tight group-hover:text-peperoncino transition-colors">
                            {item.name}
                          </h3>
                          <span className="chip">{regionBySlug(item.region)?.name ?? item.region}</span>
                          {item.dietary.includes('spicy') && <span className="chip chip-accent">Spicy</span>}
                          {item.dietary.includes('vegetarian') && <span className="chip">Veg</span>}
                          {item.newThisWeek && <span className="chip chip-accent">New</span>}
                          {item.aspirational && (
                            <span className="chip border-bergamot text-bergamot" title="Pitch proposal — not yet on the menu">
                              Pitch proposal
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-caffe-soft text-pretty max-w-2xl">{item.description}</p>
                      </div>
                      <p className="num text-xl text-caffe shrink-0 self-start sm:self-baseline">
                        {formatPrice(item.priceCents)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}
