import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import SunnyLights from "./SunnyLights";
import MainModel from "./MainModel";
import SpaceManModel from "./SpaceManModel";

export default function BackgroundScene({ isSignup = false }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isSignup) return; // scroll is irrelevant on signup page
    
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const p = maxScroll > 0 ? currentScroll / maxScroll : 0;
      setScrollProgress(Math.min(1, Math.max(0, p)));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSignup]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, 
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0, // completely behind the whole app
        pointerEvents: "none",
        background: "#000000",
      }}
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} shadows>
        <SunnyLights />
        <MainModel scrollProgress={scrollProgress} isSignup={isSignup} />
        
        {/* Render space_man astronaut dynamically on the signup page */}
        {isSignup && <SpaceManModel />}
        
        {/* Adds realistic reflections to the model */}
        <Environment preset="sunset" />
        
        {/* Soft shadow plane at the bottom */}
        <ContactShadows position={[0, -5, 0]} opacity={0.5} scale={50} blur={2} far={10} />
      </Canvas>
    </div>
  );
}

