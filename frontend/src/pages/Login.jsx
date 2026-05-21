import BackgroundScene from "../components/3d/BackgroundScene";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: "hidden",
        background: "#050505",
        padding: "40px 20px",
      }}
    >
      {/* ── Global styles & keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }
        
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .login-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: subtlePulse 8s infinite ease-in-out;
        }
      `}</style>

      {/* The 3D Scene in the background */}
      <BackgroundScene isSignup={true} />

      {/* Radial Glow underneath card */}
      <div className="login-glow" />

      {/* Header Home Link */}
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "32px",
          left: "32px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "14px",
          fontWeight: 600,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}
      >
        <span style={{ fontSize: "16px" }}>←</span> Back to home
      </Link>

      {/* Login Form Card */}
      <LoginForm />
    </div>
  );
}
