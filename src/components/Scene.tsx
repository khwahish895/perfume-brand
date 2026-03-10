import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Stars, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface BottleProps {
  color?: string;
  liquidColor?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const PerfumeBottle: React.FC<BottleProps> = ({ 
  color = '#ffffff', 
  liquidColor = '#6d28d9',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (liquidRef.current) {
      const t = state.clock.getElapsedTime();
      liquidRef.current.position.y = Math.sin(t * 2) * 0.05 - 0.2;
    }
  });

  return (
    <group ref={meshRef} scale={scale} position={position} rotation={rotation}>
      {/* Bottle Cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.6} 
          transmission={1} 
          thickness={0.5} 
          roughness={0} 
        />
      </mesh>

      {/* Bottle Body */}
      <mesh>
        <boxGeometry args={[1, 1.5, 0.6]} />
        <meshPhysicalMaterial 
          color={color}
          transparent 
          opacity={0.3} 
          transmission={1} 
          thickness={2} 
          roughness={0}
          clearcoat={1}
        />
      </mesh>

      {/* Liquid Inside */}
      <mesh ref={liquidRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.4]} />
        <MeshDistortMaterial 
          color={liquidColor} 
          speed={2} 
          distort={0.3} 
          radius={1} 
          emissive={liquidColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshStandardMaterial color="#000" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};

export const Scene: React.FC<{ activePerfume?: string }> = ({ activePerfume }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6d28d9" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.5} color="#fbbf24" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <PerfumeBottle 
          liquidColor={activePerfume === 'velour-mist' ? '#a78bfa' : '#6d28d9'} 
          scale={1.2}
        />
      </Float>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
      </mesh>
    </>
  );
};
