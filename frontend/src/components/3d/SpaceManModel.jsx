import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function SpaceManModel() {
  const { scene, animations } = useGLTF("/models/astronaut.glb");
  const groupRef = useRef();
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Find animation containing "run" or "running", otherwise fallback to the first animation
      const runKey = Object.keys(actions).find(
        (key) => key.toLowerCase().includes("run") || key.toLowerCase().includes("running")
      ) || Object.keys(actions)[0];
      
      const action = actions[runKey];
      if (action) {
        action.reset().fadeIn(0.3).play();
        action.speed = 1.6; // Increased speed for energetic flight movement
      }
    }
  }, [actions]);

  // Adjust material properties for premium metalness/roughness reflections
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            // Enhance materials for maximum render fidelity in sunset environment lighting
            child.material.roughness = Math.min(child.material.roughness || 1, 0.25);
            child.material.metalness = Math.max(child.material.metalness || 0, 0.65);
            
            // Give a subtle golden/orange sheen to the material to blend with the environment
            if (child.material.emissive) {
              child.material.emissive = new THREE.Color("#fb923c");
              child.material.emissiveIntensity = 0.15; // Subtle integration glow
            }
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const isMobile = state.viewport.width < 10;
      
      // On mobile, float the astronaut below the central form so it stays clean
      // On desktop, float it beautifully to the right of the signup card, slightly lower
      const targetX = isMobile ? -1.8 : -4;
      const targetY = isMobile ? -4.6 : -1.8;
      const targetZ = isMobile ? 2 : -5;
      const targetScale = isMobile ? 0.55 : 1.0;
      
      groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.07);
      
      const currentScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.02);
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group
        ref={groupRef}
        position={[3, -5, 1]}
      >
        {/* Inner group isolates base rotation and scale from Float competition */}
        <group
          rotation={[Math.PI / 2, Math.PI / .55, Math.PI / 1.5]} // Beautiful diagonal flying posture tilted to top-left!
          scale={[1.4, 1.4, 1.4]}
        >
          <primitive object={scene} />
        </group>
        
        {/* Local warm lights right next to the space man to beautifully match the sunny golden scene lighting */}
        <pointLight position={[-3, 2, 3]} intensity={12} color="#fb923c" distance={10} decay={1.5} />
        <pointLight position={[3, -2, 2]} intensity={6} color="#f59e0b" distance={10} decay={1.5} />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/astronaut.glb");

