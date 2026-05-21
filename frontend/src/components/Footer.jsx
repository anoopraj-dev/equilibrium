import { Icon } from "@iconify/react";

const FOOTER_LINKS = ["Product", "Company", "Stay Fresh"];

export default function Footer() {
  return (
    <footer
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: "0 0 10px rgba(249,115,22,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "#fff",
            }}
          >
            <Icon icon="lucide:sparkles" style={{ fontSize: 11, color: "white" }} />
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 700,
              fontSize: 16,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Equili<span style={{ color: "#f97316" }}>brium</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {FOOTER_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
                textDecoration: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f97316")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.4)")
              }
            >
              {l}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <span
          style={{
            color: "rgba(255,255,255,0.22)",
            fontSize: 12,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          © 2026 Equilibrium. All rights reserved.
        </span>
      </div>
    </footer>
  );
}