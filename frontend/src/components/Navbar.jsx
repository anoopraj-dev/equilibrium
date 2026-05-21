import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NAV_LINKS = ["Features", "Pricing", "About"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(6,10,10,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.12)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* ── Top bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 0 14px rgba(249,115,22,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              <Icon icon="lucide:sparkles" style={{ fontSize: 14, color: "white" }} />
            </div>
            <span
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.5px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Equili<span style={{ color: "#f97316" }}>brium</span>
            </span>
          </div>

          {/* Desktop links */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f97316")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.6)")
                }
              >
                {l}
              </a>
            ))}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.3px",
                  boxShadow: "0 0 16px rgba(249,115,22,0.3)",
                  transition: "all 0.2s",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#ea580c";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f97316";
                  e.target.style.transform = "none";
                }}
              >
                Get Started
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} style={{ fontSize: 24 }} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(6,10,10,0.98)",
              borderTop: "1px solid rgba(249,115,22,0.15)",
              padding: "16px 0 24px",
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.8)",
                  padding: "12px 0",
                  fontSize: 16,
                  textDecoration: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {l}
              </a>
            ))}
            <Link to="/signup" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
              <button
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}