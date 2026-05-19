import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function MainModel({ scrollProgress }) {
  const { scene, animations } = useGLTF("/models/space.glb");
  const groupRef = useRef();
  const prevScrollRef = useRef(scrollProgress);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      if (action) {
        action.play();
        action.paused = true;
      }
    }
  }, [actions]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const name = child.name.toLowerCase();
          if (
            name.includes("bg") ||
            name.includes("background") ||
            name.includes("backdrop") ||
            name.includes("sky")
          ) {
            child.visible = false;
          } else {
            // Transform the model into a gorgeous glowing golden-orange artifact
            child.material.color = new THREE.Color("#fb923c"); // Sunny orange base
            child.material.roughness = 0.12; // Sleek semi-glossy polish
            child.material.metalness = 0.9;  // Heavy gold metal reflections
            if (child.material.emissive) {
              child.material.emissive = new THREE.Color("#f97316"); // Golden glow
              child.material.emissiveIntensity = 0.35;
            }
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      // Responsive viewport check for mobile
      const isMobile = state.viewport.width < 10;
      
      // Keep large screens exactly at 0.016; tune mobile scale to a neat 0.008
      const baseScale = isMobile ? 0.01 : 0.016;
      
      // Dynamic factor that peaks at 0.5 scroll (0 -> 1 -> 0)
      const factor = Math.max(0, 1 - Math.abs(scrollProgress - 0.5) * 2);
      
      // Y Position: keeps large screen exactly starting at 3 and dipping to -6.
      // Mobile position is optimized to start at 1.2 and dip to -3.5 to stay clean behind mobile layouts.
      const targetY = isMobile ? (1.2 - factor * 4.7) : (3 - factor * 9);
      
      // Z Position: keeps large screen at -10 dipping to -13.
      // Mobile position is set slightly deeper (-11 to -13) for maximum text breathing room.
      const targetZ = isMobile ? (-11 - factor * 2) : (-10 - factor * 3);
      
      groupRef.current.position.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1);

      // Interpolate scale (shrinks slightly at the peak)
      const targetScale = baseScale - factor * (baseScale * 0.03);
      groupRef.current.scale.set(targetScale, targetScale, targetScale);

      if (actions && Object.keys(actions).length > 0) {
        const action = actions[Object.keys(actions)[0]];
        if (action) {
          const duration = action.getClip().duration;
          
          // Detect scroll activity
          const scrollDelta = Math.abs(scrollProgress - prevScrollRef.current);
          prevScrollRef.current = scrollProgress;
          
          // Clamp delta to avoid temporal jumps when the window loses focus
          const delta = Math.min(0.1, state.clock.getDelta());
          
          if (scrollDelta > 0.0002) {
            // User is actively scrolling: sync animation timeline smoothly with scroll progress
            action.time = THREE.MathUtils.lerp(
              action.time,
              scrollProgress * duration,
              0.1
            );
          } else {
            // Idle state: play animation continuously with a slow, elegant speed (0.45x speed)
            action.time = (action.time + delta * 0.45) % duration;
          }
        }
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.25}>
      <group
        ref={groupRef}
        rotation={[Math.PI / 4, Math.PI / 3, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/space.glb");
