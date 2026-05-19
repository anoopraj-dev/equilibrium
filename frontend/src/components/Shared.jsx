import { useInView } from "../hooks/useInView";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Bounds, useAnimations } from "@react-three/drei";
import * as THREE from "three";
// ── FadeIn wrapper ──────────────────────────────────────────────
export function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section title block ─────────────────────────────────────────
export function SectionTitle({ label, title, subtitle }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
      <div
        style={{
          display: "inline-block",
          color: "#f97316",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "system-ui",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-1.5px",
          fontFamily: "'Georgia', serif",
          marginTop: 10,
          marginBottom: 14,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            maxWidth: 560,
            margin: "0 auto",
            fontFamily: "system-ui",
            lineHeight: 1.6,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── 3D Scene scroll-driven illustration ──────────────
function Model({ progress }) {
  const { scene, animations } = useGLTF("/models/space.glb");
  const groupRef = useRef();
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

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the model automatically
      groupRef.current.rotation.y += delta * 0.1;
      
      // Since Bounds handles the initial fit, base scale is 1.
      // Zoom in as we scroll down
      const baseScale = 0.6;
      const targetScale = baseScale + progress * 0.8; 
      
      // Move model downwards very slightly to create subtle parallax,
      // avoiding it going behind the section below too quickly
      const targetY = -progress * 2; 
      
      groupRef.current.position.lerp(new THREE.Vector3(0, targetY, 0), 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1);
      
      if (actions && Object.keys(actions).length > 0) {
        const action = actions[Object.keys(actions)[0]];
        if (action) {
          const duration = action.getClip().duration;
          action.time = THREE.MathUtils.lerp(action.time, Math.min(progress, 1) * duration, 0.1);
        }
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef}>
        <Bounds fit clip observe margin={1.2}>
          <primitive object={scene} />
        </Bounds>
      </group>
    </Float>
  );
}

export function SproutTree() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const scrollContainer = window;
    
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // rect.top is 0 when hero is at the top. As you scroll down, rect.top becomes negative.
      // Math.max(0, ...) ensures it doesn't do anything weird if hero is pushed down.
      const raw = Math.max(0, -rect.top / vh);
      
      setProgress(raw);
    };
    
    scrollContainer.addEventListener("scroll", onScroll, { passive: true, capture: true });
    onScroll();
    
    return () => scrollContainer.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 0, 
        pointerEvents: "none", 
        opacity: 1,
      }}
    >
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} />
        
        <Model progress={progress} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/space.glb");