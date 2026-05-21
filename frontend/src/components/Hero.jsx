import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >

      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          paddingTop: 80,
        }}
      >
        <div style={{ maxWidth: 640 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#f97316",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                color: "#fb923c",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "1px",
              }}
            >
              THE ULTIMATE RESUME COMPILER
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontFamily: "'Playfair Display', serif",
              marginBottom: 20,
            }}
          >
            Command Your Career with{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #fb923c, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Equilibrium
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.7,
              marginBottom: 36,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              maxWidth: 520,
            }}
          >
            Stop writing resumes. Start crafting career narratives. Equilibrium is the elite AI compiler that transforms your professional milestones into an undeniable, high-converting legacy that lands interviews at Apple, Google, and McKinsey.
          </p>

          {/* CTA Buttons */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}
          >
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 0 24px rgba(249,115,22,0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#ea580c";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f97316";
                  e.target.style.transform = "none";
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Icon icon="lucide:sparkles" style={{ fontSize: 15 }} />
                  Craft Your Resume
                </span>
              </button>
            </Link>
            <button
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "14px 28px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(249,115,22,0.5)";
                e.target.style.color = "#f97316";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.color = "#fff";
              }}
            >
              See Resume Gallery →
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex" }}>
              {["#a78bfa", "#fb923c", "#60a5fa", "#f472b6"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid #0a0a0a",
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Joined by{" "}
              <strong style={{ color: "#f97316" }}>1,200+</strong> elite candidates securing $150k+ offers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}