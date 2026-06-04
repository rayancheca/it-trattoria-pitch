'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { type Group, MathUtils } from 'three';
import { Scene } from './Scene';

/**
 * THE signature 3D moment (D research #2): a cream Vespa scooter built from
 * primitives, cursor-steering the handlebars + lean, gentle float bob.
 *
 * Cream body (#F4EDE0) with monogram-green accents echoes IT's brand colors —
 * NOT a stock pizza. Carries the brand's "from Calabria, with a pasta machine"
 * story: the Iera brothers grew up with a Vespa parked outside.
 *
 * Wheels rotate. Handlebars track cursor X. Body leans slightly into turns.
 */
function VespaModel() {
  const root = useRef<Group>(null);
  const handlebars = useRef<Group>(null);
  const wheelFront = useRef<Group>(null);
  const wheelRear = useRef<Group>(null);

  useFrame((state, delta) => {
    // Wheel rotation always rolling (Italian summer ride)
    if (wheelFront.current) wheelFront.current.rotation.x += delta * 2;
    if (wheelRear.current) wheelRear.current.rotation.x += delta * 2;

    if (root.current) {
      // Slight lean into the cursor direction
      const targetLean = MathUtils.degToRad(state.pointer.x * 8);
      root.current.rotation.z = MathUtils.lerp(root.current.rotation.z, -targetLean, 0.06);
      // Y-axis nudge so it tracks your gaze
      const targetYaw = MathUtils.degToRad(state.pointer.x * 12);
      root.current.rotation.y = MathUtils.lerp(root.current.rotation.y, targetYaw, 0.06);
    }

    if (handlebars.current) {
      // Handlebars steer extra
      const targetSteer = MathUtils.degToRad(state.pointer.x * 18);
      handlebars.current.rotation.y = MathUtils.lerp(handlebars.current.rotation.y, targetSteer, 0.08);
    }
  });

  return (
    <group ref={root} position={[0, -0.2, 0]} rotation={[0, -0.2, 0]}>
      {/* === Main body === */}
      {/* Rear bulb (the iconic Vespa rounded rear) */}
      <mesh castShadow position={[-0.55, 0.2, 0]} rotation={[0, 0, Math.PI * 0.05]}>
        <sphereGeometry args={[0.55, 28, 28]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.35} metalness={0.45} envMapIntensity={1.3} />
      </mesh>
      {/* Body floor / step-through */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.4, 0.18, 0.35]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Front leg shield (the curve over the front wheel) */}
      <mesh castShadow position={[0.7, 0.25, 0]} rotation={[0, 0, -Math.PI * 0.12]}>
        <boxGeometry args={[0.35, 0.7, 0.36]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Front shield curve top */}
      <mesh castShadow position={[0.78, 0.55, 0]} rotation={[0, 0, -Math.PI * 0.32]}>
        <cylinderGeometry args={[0.18, 0.18, 0.36, 18]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Seat */}
      <mesh castShadow position={[-0.25, 0.42, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.32]} />
        <meshStandardMaterial color="#1A1614" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Seat front (saddle nose) */}
      <mesh castShadow position={[0.1, 0.42, 0]} rotation={[0, 0, Math.PI * 0.04]}>
        <boxGeometry args={[0.18, 0.08, 0.3]} />
        <meshStandardMaterial color="#1A1614" roughness={0.6} />
      </mesh>

      {/* === Handlebars === */}
      <group ref={handlebars} position={[0.92, 0.85, 0]}>
        {/* Vertical column */}
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
          <meshStandardMaterial color="#1A1614" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Cross bar */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.5, 12]} />
          <meshStandardMaterial color="#1A1614" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Grips */}
        {[-0.27, 0.27].map((z) => (
          <mesh key={z} castShadow position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.13, 14]} />
            <meshStandardMaterial color="#4a2a18" roughness={0.7} />
          </mesh>
        ))}
        {/* Headlight */}
        <mesh castShadow position={[0.08, 0.05, 0]}>
          <sphereGeometry args={[0.13, 18, 18]} />
          <meshStandardMaterial
            color="#F4EDE0"
            roughness={0.15}
            metalness={0.7}
            emissive="#E8B23A"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* === Wheels === */}
      <group ref={wheelFront} position={[0.78, -0.32, 0]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.08, 12, 28]} />
          <meshStandardMaterial color="#1A1614" roughness={0.85} />
        </mesh>
        {/* Hub */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 18]} />
          <meshStandardMaterial color="#F4EDE0" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
      <group ref={wheelRear} position={[-0.78, -0.32, 0]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.08, 12, 28]} />
          <meshStandardMaterial color="#1A1614" roughness={0.85} />
        </mesh>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 18]} />
          <meshStandardMaterial color="#F4EDE0" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>

      {/* === Calabrian green accent stripe down the center === */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[1.42, 0.02, 0.06]} />
        <meshStandardMaterial color="#1F4D2E" roughness={0.4} metalness={0.4} emissive="#1F4D2E" emissiveIntensity={0.2} />
      </mesh>

      {/* Delivery box on rear with "IT" monogram */}
      <mesh castShadow position={[-0.55, 0.78, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color="#1F4D2E" roughness={0.55} metalness={0.1} />
      </mesh>
      {/* The "IT" letter face (a slim slab in carta cream) */}
      <mesh position={[-0.55, 0.78, 0.215]}>
        <boxGeometry args={[0.24, 0.24, 0.005]} />
        <meshStandardMaterial color="#F4EDE0" roughness={0.55} />
      </mesh>

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.45}
        scale={6}
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

export default function Vespa({ className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Scene envPreset="apartment" camera={{ position: [0.8, 1.2, 4.2], fov: 32 }}>
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.5} color="#E8B23A" />
        <pointLight position={[3, 1.5, 2]} intensity={0.5} color="#C8362B" />
        <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.18}>
          <VespaModel />
        </Float>
      </Scene>
    </div>
  );
}
