import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";

const TEMPLATES = [
  { id: "classic-premium", name: "Classic Premium", category: "Executive", desc: "Two-column executive layout with serif headings. Ideal for VP and C-suite roles.", accent: "#f97316", popular: true },
  { id: "modern-sleek", name: "Modern Sleek", category: "Tech", desc: "Minimalist single-column layout preferred by top-tier engineering hiring managers.", accent: "#3b82f6", popular: false },
  { id: "minimal-grid", name: "Minimal Grid", category: "Creative", desc: "Clean grid structure for designers, PMs, and multi-discipline professionals.", accent: "#8b5cf6", popular: false },
  { id: "executive-bold", name: "Executive Bold", category: "Executive", desc: "High-contrast bold headings and rule dividers for maximum ATS readability.", accent: "#f97316", popular: false },
  { id: "tech-mono", name: "Tech Mono", category: "Tech", desc: "Monospaced type and structured blocks for engineering and DevOps roles.", accent: "#22c55e", popular: false },
  { id: "corporate-nexus", name: "Corporate Nexus", category: "Business", desc: "Traditional corporate format optimized for financial and consulting sectors.", accent: "#64748b", popular: false },
];

const CATEGORIES = ["All", "Executive", "Tech", "Creative", "Business"];

export default function Templates() {
  const navigate = useNavigate();
  const { createNewResume, showToast } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === activeCategory);

  const handleUseTemplate = (tpl) => {
    const id = createNewResume(`New ${tpl.name} Resume`, tpl.name);
    showToast(`Template "${tpl.name}" loaded. Opening editor...`);
    navigate(`/resume/${id}/edit`);
  };

  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-end", flexDirection: isMobile ? "column" : "row", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>Resume Templates</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>ATS-optimized professional templates crafted for elite career positioning.</p>
        </div>
        <button onClick={() => handleUseTemplate(TEMPLATES[0])}
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "10px", padding: "11px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.25)", width: isMobile ? "100%" : "auto" }}>
          + Start from Blank
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ background: activeCategory === cat ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)", border: activeCategory === cat ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 16px", color: activeCategory === cat ? "#f97316" : "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "24px" }}>
        {filtered.map(tpl => (
          <div key={tpl.id} onMouseEnter={() => setHoveredId(tpl.id)} onMouseLeave={() => setHoveredId(null)}
            style={{ background: "rgba(18,18,18,0.6)", border: hoveredId === tpl.id ? `1px solid ${tpl.accent}60` : "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", transition: "all 0.3s", transform: hoveredId === tpl.id ? "translateY(-4px)" : "none", boxShadow: hoveredId === tpl.id ? `0 16px 40px rgba(0,0,0,0.5), 0 0 20px ${tpl.accent}15` : "0 8px 24px rgba(0,0,0,0.3)", position: "relative" }}>
            {tpl.popular && (
              <div style={{ position: "absolute", top: "14px", right: "14px", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>POPULAR</div>
            )}

            {/* Mock Preview */}
            <div style={{ height: "180px", background: `linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.04) 100%)`, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", padding: "20px", gap: "8px", opacity: 0.6 }}>
                <div style={{ width: "60%", height: "12px", background: tpl.accent, borderRadius: "3px", opacity: 0.8 }} />
                <div style={{ width: "40%", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
                <div style={{ width: "100%", height: "1px", background: `${tpl.accent}40`, margin: "4px 0" }} />
                {[90, 75, 85].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: "6px", background: "rgba(255,255,255,0.12)", borderRadius: "2px" }} />
                ))}
                <div style={{ width: "50%", height: "8px", background: tpl.accent, borderRadius: "2px", opacity: 0.5, marginTop: "6px" }} />
                {[80, 65].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{tpl.name}</h3>
                <span style={{ fontSize: "10px", color: tpl.accent, background: `${tpl.accent}15`, padding: "3px 8px", borderRadius: "20px", fontWeight: 700, border: `1px solid ${tpl.accent}30` }}>{tpl.category}</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5", margin: 0 }}>{tpl.desc}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button onClick={() => handleUseTemplate(tpl)}
                  style={{ flex: 1, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "9px 0", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                  Use Template
                </button>
                <button
                  style={{ width: "36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "rgba(255,255,255,0.5)", fontSize: "14px", cursor: "pointer" }}>
                  👁
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
