import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  size?: number;
  variant?: 'mark' | 'wordmark';
  /** Background color (defaults to Calabrian monogram green) */
  background?: string;
  /** Cutout color (defaults to cream / carta) */
  cutout?: string;
}

/**
 * The IT Trattoria monogram — REAL brand asset.
 *
 * Per R2 (brand extraction) + Phase-11 Agent B (real-image extraction): this
 * is the brand's strongest single piece of equity — embroidered on chef caps,
 * painted on the Vespa delivery box, on every storefront awning. The actual
 * IT brand SVG (from Agent B's Behance + IT site sweep) is a square with the
 * "IT" letterform CARVED OUT (negative space) — not filled letters on a tile.
 *
 * This component inlines the real SVG path so it can be recolored (we tint
 * to Calabrian monogram green by default; black/orange overrides available).
 */
export function ITMonogram({
  className,
  size = 48,
  variant = 'mark',
  background = 'var(--color-monogram)',
  cutout = 'var(--color-carta)',
}: Props) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 258 258"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="IT — Italian Trattoria"
      style={{ display: 'block' }}
    >
      {/* Background tile */}
      <rect x="0" y="0" width="258" height="258" rx="2" fill={background} />
      {/* IT letterform mask — direct from Agent B's it-logo-orange.svg path.
          The path is the negative space: the square minus the "IT" cutout. We
          render it in cutout color over the background to reveal the letters. */}
      <path
        d="M0,0V258.958H257.669V0ZM103.236,187.026H74.607V71.932h28.629Zm85.887-92.912H173.581v92.912H147.402V94.113H131.864V71.932h57.259Z"
        fill={cutout}
      />
    </svg>
  );

  if (variant === 'wordmark') {
    return (
      <span
        className={cn('inline-flex items-center gap-2 font-display leading-none', className)}
        style={{ fontSize: size * 0.55 }}
      >
        {mark}
        <span className="leading-none">trattoria</span>
      </span>
    );
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {mark}
    </span>
  );
}
