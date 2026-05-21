import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          boxShadow: "0 0 40px rgba(249, 115, 22, 0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          marginBottom: "32px",
          color: "white",
        }}
      >
        ✦
      </div>
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 800,
          fontFamily: "'Playfair Display', serif",
          margin: "0 0 16px 0",
          background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.4))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 12px 0" }}>Lost in Orbit</h2>
      <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.45)", maxWidth: "380px", lineHeight: "1.6", margin: "0 0 32px 0" }}>
        The career vector you are looking for has shifted or does not exist. Let's redirect you back to the command center.
      </p>
      <Link
        to="/"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          color: "white",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "14px",
          borderRadius: "12px",
          padding: "14px 28px",
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.3)",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(249, 115, 22, 0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(249, 115, 22, 0.3)";
        }}
      >
        Return to Safety
      </Link>
    </div>
  );
}
