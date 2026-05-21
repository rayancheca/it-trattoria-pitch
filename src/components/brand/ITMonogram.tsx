import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  size?: number;
  variant?: 'mark' | 'wordmark';
  /** Render the green square background. Defaults to true for the mark. */
  withBackground?: boolean;
}

/**
 * The IT Trattoria monogram.
 *
 * Per R2 (brand extraction): this is the brand's strongest single piece of
 * equity — embroidered on chef caps, painted on Vespa delivery boxes.
 * The green square + serif "IT" is non-negotiable; everything else flexes.
 *
 * Variants:
 *   - "mark"     — the green square with IT inside (default)
 *   - "wordmark" — IT followed by the trattoria wordmark
 */
export function ITMonogram({
  className,
  size = 48,
  variant = 'mark',
  withBackground = true,
}: Props) {
  if (variant === 'wordmark') {
    return (
      <span
        className={cn('inline-flex items-center gap-2 font-display leading-none', className)}
        style={{ fontSize: size * 0.55 }}
      >
        <span
          aria-hidden
          className="inline-flex items-center justify-center"
          style={{
            width: size,
            height: size,
            background: withBackground ? 'var(--color-monogram)' : 'transparent',
            color: 'var(--color-carta)',
            borderRadius: 2,
            fontFamily: 'var(--font-display)',
            fontSize: size * 0.62,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          IT
        </span>
        <span className="leading-none">trattoria</span>
      </span>
    );
  }

  return (
    <span
      aria-label="IT — Italian Trattoria"
      className={cn('inline-flex items-center justify-center font-display', className)}
      style={{
        width: size,
        height: size,
        background: withBackground ? 'var(--color-monogram)' : 'transparent',
        color: withBackground ? 'var(--color-carta)' : 'var(--color-monogram)',
        borderRadius: 2,
        fontFamily: 'var(--font-display)',
        fontSize: size * 0.62,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}
    >
      IT
    </span>
  );
}
