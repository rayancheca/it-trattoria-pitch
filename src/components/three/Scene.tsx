'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerformanceMonitor, Preload } from '@react-three/drei';
import { Suspense, useState } from 'react';

interface CameraInit {
  position?: [number, number, number];
  fov?: number;
}

interface Props {
  children: React.ReactNode;
  /** Disables effects below this DPR for low-power devices. */
  minDpr?: number;
  /** Environment preset for HDRI lighting. 'apartment' is warm + cinematic. */
  envPreset?: 'apartment' | 'sunset' | 'city' | 'warehouse' | 'studio' | 'dawn' | 'forest' | 'lobby' | 'night' | 'park';
  camera?: CameraInit;
  className?: string;
}

/**
 * Base R3F canvas wrapper. Handles:
 * - Adaptive DPR via PerformanceMonitor
 * - Warm Environment lighting for food-photography feel
 * - Suspense boundary so 3D failures don't crash the page
 *
 * Note: must be wrapped via lazyScene() so SSR is disabled.
 */
export function Scene({
  children,
  minDpr = 0.6,
  envPreset = 'apartment',
  camera,
  className,
}: Props) {
  const [dpr, setDpr] = useState<[number, number]>([minDpr, 2]);

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{
        position: camera?.position ?? [0, 1.2, 4.5],
        fov: camera?.fov ?? 32,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
      className={className}
    >
      <PerformanceMonitor
        onDecline={() => setDpr([minDpr, 1])}
        onIncline={() => setDpr([minDpr, 2])}
      />
      <Suspense fallback={null}>
        <Environment preset={envPreset} background={false} environmentIntensity={0.7} />
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
