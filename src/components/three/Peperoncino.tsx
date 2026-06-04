'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import { type Mesh, MathUtils } from 'three';
import { Scene } from './Scene';

/**
 * A glossy 3D peperoncino — the Calabrian chili — that rotates slowly
 * and reacts to mouse movement. Used on the Calabria region hero and
 * the homepage CalabriaTeaser.
 */
function PeperoncinoMesh() {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow rotation
    ref.current.rotation.y += delta * 0.35;
    // Slight breathing on Y to feel alive
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    // Gentle tilt toward cursor
    const targetX = MathUtils.degToRad((state.pointer.y * 12));
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, targetX, 0.04);
  });

  return (
    <group>
      {/* Body — elongated capsule scaled to chili pepper proportions */}
      <mesh ref={ref} castShadow scale={[0.35, 1, 0.35]} position={[0, 0, 0]} rotation={[0, 0, Math.PI * 0.05]}>
        <capsuleGeometry args={[1, 1.6, 24, 32]} />
        <meshStandardMaterial
          color="#C8362B"
          roughness={0.18}
          metalness={0.06}
          envMapIntensity={1.2}
          emissive="#3a0a06"
          emissiveIntensity={0.18}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0.16, 1.05, 0]} rotation={[0, 0, Math.PI * 0.1]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.4, 12]} />
        <meshStandardMaterial color="#3d5a2b" roughness={0.6} />
      </mesh>
      {/* Calyx (the top crown) */}
      <mesh position={[0.2, 1.22, 0]} castShadow>
        <coneGeometry args={[0.14, 0.16, 8]} />
        <meshStandardMaterial color="#4a6840" roughness={0.5} />
      </mesh>
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.35}
        scale={4}
        blur={3}
        far={4}
        color="#1A1614"
      />
    </group>
  );
}

interface Props {
  className?: string;
}

export default function Peperoncino({ className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Scene envPreset="apartment" camera={{ position: [0.4, 0.6, 4], fov: 30 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.6} color="#E8B23A" />
        <PeperoncinoMesh />
      </Scene>
    </div>
  );
}
