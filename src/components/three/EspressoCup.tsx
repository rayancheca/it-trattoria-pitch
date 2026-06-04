'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { type Group, type Points, MathUtils, BufferGeometry, Float32BufferAttribute } from 'three';
import { Scene } from './Scene';

/**
 * A 3D espresso cup with rising steam particles. Used on the homepage's
 * "Italian breakfast" moment and on the /menu/bevande surface.
 */
function CupAndSteam() {
  const group = useRef<Group>(null);
  const steam = useRef<Points>(null);

  // Steam particle positions
  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 1] = Math.random() * 1.2 + 0.3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return arr;
  }, []);

  const steamGeom = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    if (group.current) {
      const targetY = state.pointer.x * 0.3;
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    }
    if (steam.current) {
      const arr = steam.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += 0.008; // rise
        arr[i + 0] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        if (arr[i + 1] > 1.8) {
          arr[i + 1] = 0.3;
          arr[i + 0] = (Math.random() - 0.5) * 0.4;
          arr[i + 2] = (Math.random() - 0.5) * 0.4;
        }
      }
      steam.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Saucer */}
      <mesh receiveShadow position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.1, 0.06, 48]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.5} />
      </mesh>

      {/* Cup body */}
      <mesh castShadow receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.55, 48]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Cup interior (espresso) */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.52, 0.4, 0.02, 48]} />
        <meshStandardMaterial color="#1A0F08" roughness={0.2} emissive="#3a1f08" emissiveIntensity={0.2} />
      </mesh>

      {/* Crema rim */}
      <mesh position={[0, 0.14, 0]}>
        <ringGeometry args={[0.42, 0.52, 48]} />
        <meshStandardMaterial color="#9C6B3E" roughness={0.45} emissive="#3a2410" emissiveIntensity={0.3} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.6, -0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.18, 0.05, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.4} />
      </mesh>

      {/* Steam particles */}
      <points ref={steam}>
        <primitive attach="geometry" object={steamGeom} />
        <pointsMaterial
          color="#F4EDE0"
          size={0.05}
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.4}
        scale={4}
        blur={3}
        far={3}
        color="#1A1614"
      />
    </group>
  );
}

interface Props {
  className?: string;
}

export default function EspressoCup({ className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Scene envPreset="apartment" camera={{ position: [1.4, 1.4, 3.4], fov: 32 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 3]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 2, 0]} intensity={0.4} color="#E8B23A" />
        <Float speed={0.5} rotationIntensity={0.15} floatIntensity={0.15}>
          <CupAndSteam />
        </Float>
      </Scene>
    </div>
  );
}
