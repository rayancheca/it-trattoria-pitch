'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  /** How much the image shifts on scroll, in percent. Default 12. */
  intensity?: number;
  /** Overlay color/gradient applied above the image (Tailwind/className). */
  overlay?: string;
}

/**
 * Scroll-linked parallax image. The image is oversized vertically and
 * translates Y as the viewport scrolls past. Respects reduced-motion.
 *
 * Callers should pass a className that establishes size + positioning of the
 * wrapper (e.g. "absolute inset-0" or "h-[90svh]"). The component does NOT
 * inject `relative` so it does not fight with an `absolute` override.
 */
export function ParallaxImage({
  src,
  alt = '',
  className = '',
  intensity = 12,
  overlay,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yShift = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`-${intensity}%`, `${intensity}%`],
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        className="will-change-transform"
        style={{
          position: 'absolute',
          top: '-20%',
          bottom: '-20%',
          left: 0,
          right: 0,
          backgroundImage: `url('${src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: yShift,
        }}
        role={alt ? 'img' : 'presentation'}
        aria-label={alt || undefined}
      />
      {overlay && <div className={`absolute inset-0 ${overlay}`} aria-hidden />}
    </div>
  );
}
