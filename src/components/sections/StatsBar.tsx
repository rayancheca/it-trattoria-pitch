'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  italianLabel: string;
}

const STATS: Stat[] = [
  { value: 20, suffix: '+', label: 'trattorias worldwide', italianLabel: 'trattorie' },
  { value: 11, label: 'years cooking', italianLabel: 'anni' },
  { value: 2, label: 'brothers from Calabria', italianLabel: 'fratelli' },
  { value: 4, label: 'US locations and counting', italianLabel: 'sedi USA' },
];

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, motionValue]);

  return (
    <span ref={ref} className="num font-display tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-caffe text-carta border-y border-caffe-soft" aria-labelledby="stats-heading">
      <div className="container-edge py-16 lg:py-24">
        <p id="stats-heading" className="sr-only">By the numbers</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-7xl md:text-8xl tracking-tight leading-none text-bergamot">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-carta/85 max-w-[16ch] text-pretty">
                {s.label}
              </p>
              <p className="label-it text-carta/40 mt-1">{s.italianLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
