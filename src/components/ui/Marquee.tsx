'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  items: string[];
  /** Duration of one full loop in seconds. Default 32. */
  speed?: number;
  /** Direction: 'left' goes right→left (default), 'right' goes left→right. */
  direction?: 'left' | 'right';
  /** Tailwind classes for the bar. */
  className?: string;
  /** Separator character between items. Default '·' */
  separator?: string;
}

/**
 * Horizontal infinite marquee. Items repeat seamlessly. Pauses on hover.
 * Respects prefers-reduced-motion (renders static).
 */
export function Marquee({
  items,
  speed = 32,
  direction = 'left',
  className = '',
  separator = '·',
}: Props) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex gap-8 px-6 py-4 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="font-display text-3xl tracking-tight">
              {item}
              <span className="ml-8 text-caffe-mute" aria-hidden>{separator}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden group ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl tracking-tight inline-flex items-center gap-8 shrink-0">
            {item}
            <span className="text-caffe-mute" aria-hidden>{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
