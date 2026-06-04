'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-load any 3D scene with SSR disabled (Three.js cannot SSR).
 * Each scene is its own dynamic import so the 3D bundle (~600KB)
 * only ships when a 3D moment is actually visible.
 *
 * Usage:
 *   const PeperoncinoHero = lazyScene(() => import('./PeperoncinoHero'));
 *   <PeperoncinoHero />
 */
export function lazyScene<P>(
  loader: () => Promise<{ default: React.ComponentType<P> }>,
) {
  return dynamic(loader, {
    ssr: false,
    loading: () => null,
  });
}
