'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * Full-viewport editorial hero with scroll-linked parallax + reveal animation.
 *
 * - Background photo translates upward on scroll (parallax)
 * - Headline fades + slides in word-by-word
 * - "Today's plate" teaser pinned to the bottom
 * - Scroll cue at the bottom-right
 *
 * Respects prefers-reduced-motion (animations collapse to static).
 */
export function HeroEditorial() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yPhoto = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '25%']);
  const yType = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-15%']);
  const opacityType = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = ['Fresh pasta.', 'Real Italian.', 'No table.'];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-caffe text-carta"
      aria-labelledby="hero-heading"
      style={{ minHeight: '100svh' }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -inset-y-[15%] -z-10 will-change-transform"
        style={{ y: yPhoto }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,16,14,0.45) 0%, rgba(20,16,14,0.65) 50%, rgba(20,16,14,0.92) 100%), url('/images/hero/pasta-overhead.jpg')",
          }}
        />
      </motion.div>

      {/* Subtle grain */}
      <div aria-hidden className="absolute inset-0 grain pointer-events-none opacity-25" />

      <div className="container-edge relative flex flex-col justify-between" style={{ minHeight: '100svh', paddingTop: '6rem', paddingBottom: '3rem' }}>
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="dot-open" aria-hidden />
          <span className="label-it text-carta/80">Aperto · Open now in Miami Beach &amp; NYC</span>
        </motion.div>

        {/* Hero type */}
        <motion.div style={{ y: yType, opacity: opacityType }} className="max-w-[22ch] my-12 lg:my-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="label-it text-bergamot mb-5 lg:mb-7"
          >
            From Calabria, with a pasta machine
          </motion.p>
          <h1
            id="hero-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-hero)', lineHeight: 0.92 }}
          >
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 60, rotate: i === 2 ? -2 : 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 1.0,
                  delay: 0.5 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${i === 2 ? 'italic text-bergamot' : ''}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 lg:mt-10 text-lg lg:text-xl text-carta/85 max-w-prose text-pretty"
          >
            Counter-service trattorias by two Calabrian brothers. Open kitchens, daily
            pasta, real espresso. Four spots between Collins Avenue and Bryant Park.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 lg:mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/order"
              className="inline-flex items-center justify-center h-14 px-7 bg-peperoncino text-carta rounded-sm font-medium text-lg hover:bg-peperoncino-soft transition-colors"
            >
              Order online
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center h-14 px-7 border border-carta rounded-sm text-lg hover:bg-carta hover:text-caffe transition-colors"
            >
              Find your trattoria
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom strip: today's plate + scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6 pb-2"
        >
          <div className="max-w-md">
            <p className="label-it text-carta/60 mb-2">Today on the menu</p>
            <p className="font-display italic text-2xl lg:text-3xl tracking-tight text-balance">
              Spaghetti Carbonara — guanciale, pecorino, the four Romans done right.
            </p>
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex flex-col items-center gap-2 text-carta/60 shrink-0"
          >
            <span className="label-it">Scroll</span>
            <ArrowDown size={20} aria-hidden />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
