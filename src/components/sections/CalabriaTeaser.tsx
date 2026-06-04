'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal } from '@/components/ui/MotionSection';

/**
 * Calabria teaser — the brand's emotional core, made dramatic.
 *
 * Scroll-linked horizontal drift on the supporting region names, big italic
 * type with reveal animation, and a textured Calabrian green background.
 * This section is the brand thesis.
 */
export function CalabriaTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xRegions = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      ref={ref}
      className="bg-monogram text-carta relative isolate overflow-hidden"
      aria-labelledby="calabria-heading"
    >
      <div aria-hidden className="absolute inset-0 grain opacity-40 pointer-events-none" />

      <div className="container-edge section relative">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal as="div" className="md:col-span-7">
            <p className="label-it text-bergamot mb-5">Da Calabria · From Calabria</p>
            <h2
              id="calabria-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.92 }}
            >
              Two brothers.
              <br />
              <span className="italic">One pasta machine.</span>
              <br />
              One region on every plate.
            </h2>
          </Reveal>

          <Reveal as="div" delay={0.15} className="md:col-span-5 space-y-7">
            <p className="text-lg lg:text-xl leading-relaxed text-carta/90 text-pretty">
              Renato and Gio Iera grew up in Calabria — the toe of Italy, where
              peperoncino goes on everything and bergamot grows nowhere else in the
              world. Eleven years ago they opened a single counter in Paris. The
              <span className="italic"> Spianata Calabrese</span> on the antipasto, the
              same salami spread across the Diavola pizza — those are theirs.
              The brothers&rsquo; bigger Calabrian repertoire is what the rebuild
              argues for next.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 pt-2">
              <ArrowLink href="/regions/calabria" className="text-carta text-lg">
                <span className="text-carta">Eat Calabrian</span>
              </ArrowLink>
              <ArrowLink href="/story" className="text-carta text-lg">
                <span className="text-carta">Read the story</span>
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll-linked region marquee */}
      <div className="border-t border-carta/15 py-8 lg:py-10">
        <div className="container-edge flex items-center justify-between mb-4">
          <p className="label-it text-bergamot">Other regions on the menu</p>
          <Link href="/regions" className="label-it text-carta/70 hover:text-carta">
            See the map →
          </Link>
        </div>
        <motion.div
          style={{ x: xRegions }}
          className="flex flex-wrap gap-x-8 gap-y-2 px-[var(--spacing-gutter)] text-carta/60 font-display text-3xl lg:text-5xl tracking-tight"
        >
          {['Sicilia', 'Campania', 'Puglia', 'Lazio', 'Emilia-Romagna', 'Toscana', 'Liguria', 'Veneto', 'Lombardia'].map((r) => (
            <Link
              key={r}
              href={`/regions/${r.toLowerCase().replace(/[^a-z]/g, '-')}`}
              className="hover:text-carta transition-colors"
            >
              {r}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
