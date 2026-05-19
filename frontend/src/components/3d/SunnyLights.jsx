import { useRef } from "react";

export default function SunnyLights() {
  return (
    <>
      {/* Warm peach-orange ambient base */}
      <ambientLight intensity={1.5} color="#ffedd5" />
      
      {/* Golden primary directional light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={8} 
        color="#fb923c" 
        castShadow 
      />
      
      {/* Intense yellow-orange secondary light for golden reflections */}
      <directionalLight position={[-10, 10, -10]} intensity={4} color="#f59e0b" />
      
      {/* Center-aligned point light to give the core a strong sunny glow */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#ea580c" distance={40} />
    </>
  );
}
