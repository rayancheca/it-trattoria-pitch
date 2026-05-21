import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { featuredItems, formatPrice } from '@/data/menu';
import { regionBySlug } from '@/data/regions';

/**
 * Editorial featured dishes section. NOT a card grid. NOT three feature cards.
 * Magazine-style layout with one signature dish full-width + a row of others.
 */
export function FeaturedDishes() {
  const items = featuredItems().slice(0, 5);
  const lead = items[0];
  const rest = items.slice(1);

  return (
    <section className="section bg-carta" aria-labelledby="featured-heading">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="label-it mb-3">Sul menù · On the menu</p>
            <h2
              id="featured-heading"
              className="font-display tracking-tight text-balance"
              style={{ fontSize: 'var(--text-display)' }}
            >
              The dishes we&rsquo;d <span className="italic">order ourselves</span>.
            </h2>
          </div>
          <ArrowLink href="/menu" className="text-lg">
            See the full menu
          </ArrowLink>
        </div>

        {lead && (
          <article className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="aspect-[4/5] bg-carta-deep relative overflow-hidden rounded-sm">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${lead.photo?.src ?? ''}')` }}
                aria-hidden
              />
              {/* Fallback designed panel if no photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-carta-deep to-carta -z-10" aria-hidden />
              <div className="absolute top-4 left-4 chip chip-accent">
                {regionBySlug(lead.region)?.name ?? lead.region}
              </div>
            </div>
            <div className="space-y-6">
              <p className="label-it">{lead.italianName}</p>
              <h3
                className="font-display tracking-tight text-balance"
                style={{ fontSize: 'var(--text-h1)' }}
              >
                {lead.name}
              </h3>
              <p className="text-lg text-caffe-soft leading-relaxed text-pretty max-w-prose">
                {lead.longDescription ?? lead.description}
              </p>
              <div className="flex items-center gap-6 pt-2">
                <p className="num font-display text-3xl text-caffe">{formatPrice(lead.priceCents)}</p>
                <Link
                  href={`/menu/${lead.slug}`}
                  className="link-editorial text-base"
                >
                  See sourcing &amp; ingredients
                </Link>
              </div>
              {lead.sourcing[0] && (
                <p className="pt-4 mt-4 border-t border-carta-deep text-sm text-caffe-mute">
                  <span className="label-it text-caffe-mute">Sourced</span>{' '}
                  <span className="ml-2 text-caffe-soft">
                    {lead.sourcing[0].ingredient} — {lead.sourcing[0].origin}
                  </span>
                </p>
              )}
            </div>
          </article>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {rest.map((item) => (
            <Link key={item.id} href={`/menu/${item.slug}`} className="group block">
              <div className="aspect-square bg-carta-deep rounded-sm overflow-hidden mb-4 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                  style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                  aria-hidden
                />
              </div>
              <p className="label-it mb-1">{regionBySlug(item.region)?.name ?? item.region}</p>
              <h3 className="font-display text-2xl tracking-tight leading-tight text-balance">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-caffe-soft text-pretty line-clamp-2">{item.description}</p>
              <p className="mt-3 num text-caffe">{formatPrice(item.priceCents)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
