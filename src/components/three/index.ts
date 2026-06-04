'use client';

import { lazyScene } from './lazy';

/**
 * Public, SSR-safe entry points for each 3D scene.
 * Each is dynamic-imported with ssr: false so the Three.js bundle
 * is only loaded on the client and only when a scene is mounted.
 */
export const Peperoncino = lazyScene(() => import('./Peperoncino'));
export const PastaPlate = lazyScene(() => import('./PastaPlate'));
export const EspressoCup = lazyScene(() => import('./EspressoCup'));
