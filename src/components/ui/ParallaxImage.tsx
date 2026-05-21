'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  /** How much the image shifts on scroll. Default 12%. */
  intensity?: number;
  /** Overlay color/gradient applied above the image (Tailwind/className). */
  overlay?: string;
}

/**
 * A scroll-linked parallax image. The image translates Y as the viewport
 * scrolls past it. Respects prefers-reduced-motion (no parallax).
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
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : [`-${intensity}%`, `${intensity}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -inset-y-[20%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url('${src}')`, y }}
        role={alt ? 'img' : 'presentation'}
        aria-label={alt || undefined}
      />
      {overlay && <div className={`absolute inset-0 ${overlay}`} aria-hidden />}
    </div>
  );
}
