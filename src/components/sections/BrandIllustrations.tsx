'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/MotionSection';

/**
 * A homepage moment that surfaces IT's real hand-drawn illustration library
 * (preserved equity per R2 brand extraction): the Vespa delivery rider, the
 * couple toasting, the family with La Gazzetta dello Sport. These ARE the
 * brand — not stock food photos.
 *
 * Source files: /public/images/brand/illustration-*.{png,jpg}
 */
export function BrandIllustrations() {
  return (
    <section className="bg-carta-deep section relative overflow-hidden" aria-labelledby="hand-drawn-heading">
      <div className="container-edge">
        <Reveal as="div" className="max-w-2xl mb-12 lg:mb-16">
          <p className="label-it mb-3">Disegnato a mano · Hand-drawn</p>
          <h2
            id="hand-drawn-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
          >
            Some things <span className="italic">aren&rsquo;t photographs</span>.
          </h2>
          <p className="mt-5 text-lg text-caffe-soft text-pretty">
            Our Vespa, our families, our Sunday lunches — drawn by a Roman illustrator
            who knew exactly what counter Sunday looks like. You&rsquo;ll see them on
            our chef caps, on our delivery boxes, in our windows.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 items-end">
          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
            className="bg-carta p-6 rounded-sm shadow-sm"
          >
            <div className="aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/brand/illustration-vespa-rider.jpg')" }}
                aria-label="A Vespa rider delivering pasta"
              />
            </div>
            <figcaption className="label-it mt-4 text-center">Il Vespa</figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="bg-carta p-6 rounded-sm shadow-sm mb-8 lg:mb-12"
          >
            <div className="aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/brand/illustration-couple-salute.jpg')" }}
                aria-label="A couple toasting with wine glasses"
              />
            </div>
            <figcaption className="label-it mt-4 text-center">Salute</figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-carta p-6 rounded-sm shadow-sm"
          >
            <div className="aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/brand/illustration-family-gazzetta.jpg')" }}
                aria-label="A family reading La Gazzetta dello Sport at table"
              />
            </div>
            <figcaption className="label-it mt-4 text-center">La domenica</figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="bg-carta p-6 rounded-sm shadow-sm mb-8 lg:mb-12"
          >
            <div className="aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/brand/illustration-pasta-mountain.png')" }}
                aria-label="A mountain of pasta being shaped"
              />
            </div>
            <figcaption className="label-it mt-4 text-center">La pasta</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
