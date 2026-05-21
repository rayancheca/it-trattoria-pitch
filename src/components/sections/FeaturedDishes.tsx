'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { featuredItems, formatPrice } from '@/data/menu';
import { regionBySlug } from '@/data/regions';

/**
 * Editorial featured-dish layout. Magazine spread, not a card grid.
 *
 * Pattern: section heading → one HERO dish (full-bleed parallax + big type
 * paired with editorial copy and sourcing line) → four secondary dishes in a
 * staggered fade-in row → arrow link to full menu.
 */
export function FeaturedDishes() {
  const items = featuredItems().slice(0, 5);
  const lead = items[0];
  const rest = items.slice(1);
  if (!lead) return null;

  const leadRegion = regionBySlug(lead.region);

  return (
    <section className="bg-carta" aria-labelledby="featured-heading">
      <div className="container-edge section">
        <Reveal as="div" className="flex flex-wrap items-end justify-between gap-6 mb-14 lg:mb-20">
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
        </Reveal>
      </div>

      {/* HERO dish — full-bleed parallax image with overlay copy */}
      <Link href={`/menu/${lead.slug}`} className="block group">
        <div className="relative w-full overflow-hidden" style={{ height: '90svh', minHeight: 600 }}>
          <ParallaxImage
            src={lead.photo?.src ?? ''}
            alt={lead.photo?.alt ?? lead.name}
            intensity={15}
            className="absolute inset-0"
            overlay="bg-gradient-to-t from-caffe/85 via-caffe/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 container-edge pb-12 lg:pb-20 text-carta">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="label-it text-bergamot mb-3">{leadRegion?.name ?? lead.region}</p>
              <h3
                className="font-display tracking-tight text-balance group-hover:text-bergamot transition-colors duration-500"
                style={{ fontSize: 'var(--text-display)', lineHeight: 1 }}
              >
                {lead.name}
              </h3>
              <p className="mt-5 text-lg lg:text-xl text-carta/85 leading-relaxed text-pretty max-w-2xl">
                {lead.longDescription ?? lead.description}
              </p>
              <div className="mt-7 flex flex-wrap items-baseline gap-5">
                <p className="num font-display text-4xl text-bergamot">{formatPrice(lead.priceCents)}</p>
                {lead.sourcing[0] && (
                  <p className="text-sm text-carta/65">
                    <span className="label-it text-carta/60">Sourced</span>{' '}
                    <span className="ml-2">{lead.sourcing[0].ingredient} · {lead.sourcing[0].origin}</span>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Secondary row — staggered */}
      <div className="container-edge section">
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {rest.map((item) => (
            <StaggerItem key={item.id}>
              <Link href={`/menu/${item.slug}`} className="group block">
                <div className="aspect-[5/6] bg-carta-deep rounded-sm overflow-hidden mb-5 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-[var(--ease-default)]"
                    style={{ backgroundImage: `url('${item.photo?.src ?? ''}')` }}
                    aria-hidden
                  />
                </div>
                <p className="label-it mb-1">{regionBySlug(item.region)?.name ?? item.region}</p>
                <h3 className="font-display text-2xl lg:text-3xl tracking-tight leading-tight text-balance group-hover:text-peperoncino transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-caffe-soft text-pretty line-clamp-2">{item.description}</p>
                <p className="mt-3 num text-caffe">{formatPrice(item.priceCents)}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
