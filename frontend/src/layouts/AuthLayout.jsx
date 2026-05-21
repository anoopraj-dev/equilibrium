import { Outlet } from "react-router-dom";
import BackgroundScene from "../components/3d/BackgroundScene";

export default function AuthLayout() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: "hidden",
        padding: "40px 20px",
      }}
    >
      <style>{`
        @keyframes floatBg {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
        .auth-radial-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: floatBg 10s infinite ease-in-out;
        }
      `}</style>

      {/* Background 3D Space Scene */}
      <BackgroundScene isSignup={true} />

      {/* Ambient Glow */}
      <div className="auth-radial-glow" />

      {/* Dynamic Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "460px" }}>
        <Outlet />
      </div>
    </div>
  );
}
