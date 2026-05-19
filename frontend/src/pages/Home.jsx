// ── Equilibrium — Main App ──────────────────────────────────────
// Component tree:
//   App
//   ├── Navbar
//   ├── Hero
//   ├── Features
//   ├── Pricing
//   ├── CTA
//   └── Footer
//
// Shared utilities:
//   hooks.js          → useInView
//   components/shared.jsx → FadeIn, SectionTitle, OrbGlow
import Navbar from "../components/Navbar";
import Hero     from "../components/Hero";
import Features from "../components/Features";
import Pricing  from "../components/Pricing";
import CTA from "../components/CTA";
import Footer   from "../components/Footer";
import BackgroundScene from "../components/3d/BackgroundScene";

export default function App() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>
      {/* ── Global styles & keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.03); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          overflow-x: hidden; 
          background: #0a0a0a; 
          color: white; 
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* Responsive helpers */
        @media (max-width: 640px) {
          .desktop-nav  { display: none !important; }
          .hamburger    { display: flex !important; }
          .hide-mobile  { display: none !important; }
        }
        @media (min-width: 641px) {
          .hamburger { display: none !important; }
        }
      `}</style>

      {/* The 3D Scene covers the entire background and reacts to scroll */}
      <BackgroundScene />

      {/* Foreground UI container */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}