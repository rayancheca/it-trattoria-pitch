'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: ReactNode;
  delay?: number;
  /** How far the element starts below its final position. */
  offset?: number;
  /** Section background — pass any Tailwind bg-* class. */
  background?: string;
  /** Trigger when X% of element is in viewport. Default 0.15 */
  amount?: number;
}

/**
 * Section wrapper with a one-shot fade-up animation when scrolled into view.
 * Respects prefers-reduced-motion automatically (Framer Motion does this).
 */
export function MotionSection({
  children,
  delay = 0,
  offset = 40,
  background,
  amount = 0.15,
  className = '',
  ...rest
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${background ?? ''} ${className}`}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

/**
 * Inline reveal — for headings, paragraphs, individual cards.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: As = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'li';
}) {
  const Motion = motion[As as keyof typeof motion] as typeof motion.div;
  return (
    <Motion
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Motion>
  );
}

/**
 * Staggered children — wrap a list of items to fade them in one after another.
 */
export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
