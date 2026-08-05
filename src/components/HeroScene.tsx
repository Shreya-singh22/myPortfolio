"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

function DistortedCore() {
  return (
    <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.4}>
      <mesh scale={2.1}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!pointer-events-none"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#f472b6" />
      <Suspense fallback={null}>
        <DistortedCore />
      </Suspense>
    </Canvas>
  );
}
