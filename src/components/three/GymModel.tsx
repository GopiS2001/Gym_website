"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural Olympic barbell — built from primitives, so there are no asset-licensing concerns
 * and nothing to download. Swap for a licensed GLB (useGLTF) later if the client wants a hero model.
 */

const chrome = new THREE.MeshStandardMaterial({ color: "#d9d9dc", metalness: 1, roughness: 0.18 });
const knurl = new THREE.MeshStandardMaterial({ color: "#8d8d93", metalness: 1, roughness: 0.45 });
const rubber = new THREE.MeshStandardMaterial({ color: "#232326", metalness: 0.3, roughness: 0.45 });
const ember = new THREE.MeshStandardMaterial({
  color: "#ff4d1a",
  metalness: 0.2,
  roughness: 0.35,
  emissive: "#ff3d0a",
  emissiveIntensity: 0.35,
  side: THREE.DoubleSide,
});

// Barbell lies along the X axis; cylinders default to Y, so rotate them.
const AXIS: [number, number, number] = [0, 0, Math.PI / 2];

function Plate({ x, radius, thickness }: { x: number; radius: number; thickness: number }) {
  return (
    <group position={[x, 0, 0]} rotation={AXIS}>
      <mesh material={rubber} castShadow>
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
      </mesh>
      {/* Raised colour band on both faces */}
      {[1, -1].map((side) => (
        <mesh key={side} material={ember} position={[0, side * (thickness / 2 + 0.002), 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 0.78, radius * 0.86, 64]} />
        </mesh>
      ))}
      <mesh material={chrome}>
        <cylinderGeometry args={[0.075, 0.075, thickness + 0.012, 32]} />
      </mesh>
    </group>
  );
}

function Side({ dir }: { dir: 1 | -1 }) {
  const sleeveStart = 0.82;
  return (
    <group scale={[dir, 1, 1]}>
      {/* Inner collar */}
      <mesh material={chrome} position={[sleeveStart, 0, 0]} rotation={AXIS}>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 32]} />
      </mesh>
      {/* Sleeve */}
      <mesh material={chrome} position={[sleeveStart + 0.27, 0, 0]} rotation={AXIS}>
        <cylinderGeometry args={[0.042, 0.042, 0.5, 32]} />
      </mesh>
      <Plate x={sleeveStart + 0.08} radius={0.5} thickness={0.075} />
      <Plate x={sleeveStart + 0.165} radius={0.5} thickness={0.075} />
      <Plate x={sleeveStart + 0.24} radius={0.36} thickness={0.06} />
      {/* Spring clip */}
      <mesh material={ember} position={[sleeveStart + 0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.05, 0.012, 12, 32]} />
      </mesh>
    </group>
  );
}

// Fits the ~2.7-unit bar inside a narrow hero column at any idle rotation.
const BASE_SCALE = 0.62;

type GymModelProps = { animate: boolean };

export function GymModel({ animate }: GymModelProps) {
  const group = useRef<THREE.Group>(null);
  const intro = useRef(animate ? 0 : 1);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !animate) return;

    // Entrance: scale + spin in over ~1.5s.
    intro.current = Math.min(1, intro.current + delta / 1.5);
    const t = 1 - Math.pow(1 - intro.current, 3);
    g.scale.setScalar(BASE_SCALE * (0.6 + 0.4 * t));

    // Idle sway around a three-quarter view plus a gentle pointer-driven tilt.
    const time = state.clock.elapsedTime;
    const targetY = 0.55 + Math.sin(time * 0.35) * 0.45 + state.pointer.x * 0.5 + (1 - t) * -2.5;
    const targetX = -0.35 + state.pointer.y * -0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    g.position.y = Math.sin(time * 0.9) * 0.06;
  });

  return (
    <group ref={group} rotation={[-0.35, 0.6, 0.18]} scale={BASE_SCALE}>
      <group rotation={[0, 0, 0.12]}>
        {/* Shaft */}
        <mesh material={knurl} rotation={AXIS} castShadow>
          <cylinderGeometry args={[0.026, 0.026, 1.6, 24]} />
        </mesh>
        <Side dir={1} />
        <Side dir={-1} />
      </group>
    </group>
  );
}
