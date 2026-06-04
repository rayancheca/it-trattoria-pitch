'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { type Group, type Mesh, MathUtils } from 'three';
import { Scene } from './Scene';

/**
 * A stack of pasta noodles (paccheri tubes) on a warm plate.
 * Floats gently, rotates with cursor. Used on the menu /a-tavola hero
 * and on FeaturedDishes for the paccheri item.
 */
function PastaStack() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.4;
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
  });

  // Build a stack of paccheri tubes — torus geometries arranged in rings
  const tubes: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
  for (let row = 0; row < 3; row++) {
    const yRow = -0.15 + row * 0.18;
    const cols = row === 1 ? 4 : 3;
    for (let i = 0; i < cols; i++) {
      const offsetX = (i - (cols - 1) / 2) * 0.42;
      const offsetZ = row === 1 ? 0 : (row === 0 ? -0.18 : 0.18);
      tubes.push({
        pos: [offsetX, yRow, offsetZ],
        rot: [Math.PI / 2, 0, (i + row) * 0.4],
      });
    }
  }

  return (
    <group ref={group}>
      {/* Plate */}
      <mesh receiveShadow position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.2, 0.08, 64]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.55} metalness={0.04} />
      </mesh>
      <mesh receiveShadow position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 2.0, 64]} />
        <meshStandardMaterial color="#E8DFCC" roughness={0.7} />
      </mesh>

      {/* Paccheri tubes */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.25}>
        {tubes.map((t, i) => (
          <mesh key={i} castShadow position={t.pos} rotation={t.rot}>
            <torusGeometry args={[0.18, 0.085, 12, 32]} />
            <meshStandardMaterial
              color="#F4C77A"
              roughness={0.55}
              metalness={0.02}
              emissive="#3a2a10"
              emissiveIntensity={0.12}
            />
          </mesh>
        ))}
      </Float>

      {/* Sauce + tomato dots */}
      {[[-0.6, -0.2, 0.4], [0.7, -0.18, -0.3], [0.1, -0.2, 0.8], [-0.3, -0.22, -0.6]].map(([x, y, z], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#C8362B" roughness={0.3} emissive="#3a0a06" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Basil leaves */}
      {[[0, 0.05, 0], [-0.5, 0.05, 0.2]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, i * 0.7, 0]}>
          <coneGeometry args={[0.12, 0.22, 4]} />
          <meshStandardMaterial color="#4A6840" roughness={0.55} />
        </mesh>
      ))}

      <ContactShadows
        position={[0, -0.45, 0]}
        opacity={0.4}
        scale={5}
        blur={3.5}
        far={4}
        color="#1A1614"
      />
    </group>
  );
}

interface Props {
  className?: string;
}

export default function PastaPlate({ className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Scene envPreset="apartment" camera={{ position: [1.4, 1.6, 3.4], fov: 36 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[2, 5, 3]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.5} color="#E8B23A" />
        <pointLight position={[3, 1, 2]} intensity={0.4} color="#C8362B" />
        <PastaStack />
      </Scene>
    </div>
  );
}
