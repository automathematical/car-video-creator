
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface CarModelProps {
  color: string;
}

export const CarModel = ({ color }: CarModelProps) => {
  const carRef = useRef<Mesh>(null);
  const wheelsRef = useRef<Mesh[]>([]);

  // Subtle rotation animation
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    // Rotate wheels
    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x += 0.02;
      }
    });
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Car Body */}
      <mesh ref={carRef} castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1, 6]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Car Roof */}
      <mesh castShadow receiveShadow position={[0, 1.2, -0.5]}>
        <boxGeometry args={[2.5, 0.8, 3]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.3, 1]}>
        <boxGeometry args={[2.3, 0.6, 0.1]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          transparent
          opacity={0.7}
          transmission={0.9}
          thickness={0.1}
        />
      </mesh>

      {/* Wheels */}
      {(
        [
          [-1.3, 0, 2.2],
          [1.3, 0, 2.2],
          [-1.3, 0, -2.2],
          [1.3, 0, -2.2],
        ] as const
      ).map((position, index) => (
        <group key={index} position={position}>
          <mesh
            ref={(el) => {
              if (el) wheelsRef.current[index] = el;
            }}
            castShadow
          >
            <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 16]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      {(
        [[-0.8, 0.7, 3], [0.8, 0.7, 3]] as const
      ).map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Taillights */}
      {(
        [[-0.8, 0.7, -3], [0.8, 0.7, -3]] as const
      ).map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};
