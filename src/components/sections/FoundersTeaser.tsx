'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal } from '@/components/ui/MotionSection';
import { founderBySlug } from '@/data/founders';

export function FoundersTeaser() {
  const renato = founderBySlug('renato');
  const gio = founderBySlug('gio');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} className="bg-carta-deep section" aria-labelledby="founders-heading">
      <div className="container-edge grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="md:col-span-6 grid grid-cols-2 gap-4 lg:gap-6">
          <motion.div style={{ y: y1 }} className="aspect-[3/4] bg-carta relative overflow-hidden rounded-sm">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${renato?.portrait?.src ?? '/images/menu/cacio-pepe.jpg'}')` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-caffe/60 to-transparent" aria-hidden />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="label-it text-carta drop-shadow">Renato</p>
            </div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="aspect-[3/4] bg-carta relative overflow-hidden rounded-sm mt-12 lg:mt-20">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${gio?.portrait?.src ?? '/images/menu/cappuccino.jpg'}')` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-caffe/60 to-transparent" aria-hidden />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="label-it text-carta drop-shadow">Gio</p>
            </div>
          </motion.div>
        </div>

        <Reveal as="div" className="md:col-span-6">
          <p className="label-it mb-4">Storia · Our story</p>
          <h2
            id="founders-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-display)', lineHeight: 0.92 }}
          >
            Two brothers.
            <br />
            Paris in 2014.
            <br />
            <span className="italic">Miami Beach in 2024.</span>
          </h2>
          <p className="mt-7 text-lg text-caffe-soft leading-relaxed text-pretty max-w-prose">
            Renato and Gio left Calabria in their twenties and landed in Paris. Eleven years
            ago they opened a single counter with one rule: cook the food they grew up eating.
            Twenty trattorias and one Atlantic crossing later, they&rsquo;re cooking the same
            food on Collins Avenue.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            <ArrowLink href="/story" className="text-lg">Read the full story</ArrowLink>
            <ArrowLink href="/regions/calabria" className="text-lg">See where it started</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
