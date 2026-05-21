import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Icon } from "@iconify/react";

const TEMPLATES = [
  { id: "classic-premium", name: "Classic Premium", category: "Executive", desc: "Two-column executive layout with serif headings. Ideal for VP and C-suite roles.", accent: "#f97316", popular: true },
  { id: "modern-sleek", name: "Modern Sleek", category: "Tech", desc: "Minimalist single-column layout preferred by top-tier engineering hiring managers.", accent: "#3b82f6", popular: false },
  { id: "minimal-grid", name: "Minimal Grid", category: "Creative", desc: "Clean grid structure for designers, PMs, and multi-discipline professionals.", accent: "#8b5cf6", popular: false },
  { id: "executive-bold", name: "Executive Bold", category: "Executive", desc: "High-contrast bold headings and rule dividers for maximum ATS readability.", accent: "#f97316", popular: false },
  { id: "tech-mono", name: "Tech Mono", category: "Tech", desc: "Monospaced type and structured blocks for engineering and DevOps roles.", accent: "#22c55e", popular: false },
  { id: "corporate-nexus", name: "Corporate Nexus", category: "Business", desc: "Traditional corporate format optimized for financial and consulting sectors.", accent: "#64748b", popular: false },
  { id: "fashion-editorial", name: "Fashion Editorial", category: "Creative", desc: "Luxury Vogue-style editorial layout with large high-contrast serif typography. Perfect for fashion, styling, and design.", accent: "#be123c", popular: true },
  { id: "photography-aperture", name: "Aperture Minimal", category: "Creative", desc: "Elegant portfolio-driven design with high-contrast borders and custom layout framing for photographers and artists.", accent: "#111111", popular: false },
  { id: "executive-csuite", name: "WallStreet Elite", category: "Executive", desc: "Vanderbilt-styled monogram header with deep gold dividers for C-suite and banking executives.", accent: "#b45309", popular: false },
  { id: "biotech-lab", name: "Biotech Lab", category: "Tech", desc: "Highly structured research grid with scientific categorization and clean teal accents.", accent: "#0d9488", popular: false }
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
            style={{ background: activeCategory === cat ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "6px 14px", color: "white", fontSize: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
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
              <div style={{ position: "absolute", top: "14px", right: "14px", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", zIndex: 10 }}>POPULAR</div>
            )}

            {/* Mock Preview */}
            <div style={{ height: "180px", background: `linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.04) 100%)`, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", opacity: 0.6 }}>
                {tpl.id === "classic-premium" && (
                  <div style={{ display: "flex", gap: "10px", width: "100%", height: "100%", padding: "18px" }}>
                    <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: "6px", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "8px" }}>
                      <div style={{ width: "80%", height: "8px", background: tpl.accent, borderRadius: "2px" }} />
                      <div style={{ width: "60%", height: "6px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                      <div style={{ width: "70%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", marginTop: "8px" }} />
                      <div style={{ width: "90%", height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "1px" }} />
                      <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "1px" }} />
                    </div>
                    <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ width: "40%", height: "10px", background: tpl.accent, borderRadius: "2px", opacity: 0.8 }} />
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                      <div style={{ width: "95%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                      <div style={{ width: "30%", height: "6px", background: tpl.accent, borderRadius: "2px", opacity: 0.4, marginTop: "6px" }} />
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      <div style={{ width: "85%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                    </div>
                  </div>
                )}
                {tpl.id === "modern-sleek" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1.5px solid ${tpl.accent}80`, paddingBottom: "6px" }}>
                      <div style={{ width: "50%", height: "10px", background: tpl.accent, borderRadius: "2px" }} />
                      <div style={{ width: "25%", height: "6px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", paddingLeft: "4px", marginTop: "4px" }}>
                      <div style={{ width: "2px", background: `${tpl.accent}40`, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: tpl.accent }} />
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: tpl.accent, marginTop: "24px" }} />
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ width: "40%", height: "6px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "95%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "1px" }} />
                        <div style={{ width: "30%", height: "6px", background: "rgba(255,255,255,0.2)", borderRadius: "1px", marginTop: "4px" }} />
                        <div style={{ width: "90%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
                {tpl.id === "minimal-grid" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ width: "45%", height: "11px", background: tpl.accent, borderRadius: "2px" }} />
                      <div style={{ width: "20%", height: "5px", background: `${tpl.accent}40`, borderRadius: "10px" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "50%", height: "5px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "90%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "60%", height: "5px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "80%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
                {tpl.id === "executive-bold" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "8px", alignItems: "center" }}>
                    <div style={{ width: "55%", height: "12px", background: tpl.accent, borderRadius: "1px", marginBottom: "2px" }} />
                    <div style={{ width: "70%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                    <div style={{ width: "100%", height: "2px", background: tpl.accent, margin: "4px 0" }} />
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start", marginTop: "4px" }}>
                      <div style={{ width: "35%", height: "7px", background: tpl.accent, borderRadius: "1px", opacity: 0.7 }} />
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      <div style={{ width: "90%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                    </div>
                  </div>
                )}
                {tpl.id === "tech-mono" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "14px", gap: "6px" }}>
                    <div style={{ border: `1px solid ${tpl.accent}`, padding: "6px", borderRadius: "3px", background: `${tpl.accent}05` }}>
                      <div style={{ width: "70%", height: "8px", background: tpl.accent, borderRadius: "1px" }} />
                      <div style={{ width: "40%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "1px", marginTop: "4px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "4px", marginTop: "2px" }}>
                      <div style={{ width: "50%", height: "5px", background: `${tpl.accent}60`, borderRadius: "1px" }} />
                      <div style={{ width: "95%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "1px" }} />
                      <div style={{ width: "80%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "1px" }} />
                    </div>
                  </div>
                )}
                {tpl.id === "corporate-nexus" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "10px", alignItems: "center" }}>
                    <div style={{ width: "50%", height: "10px", background: tpl.accent, borderRadius: "1px" }} />
                    <div style={{ width: "60%", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                    <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.2)", margin: "2px 0" }} />
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                      <div style={{ width: "30%", height: "7px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      <div style={{ width: "95%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                    </div>
                  </div>
                )}
                {tpl.id === "fashion-editorial" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", borderBottom: `1px solid ${tpl.accent}30`, paddingBottom: "8px", width: "100%" }}>
                      <div style={{ width: "80%", height: "14px", background: tpl.accent, borderRadius: "1px" }} />
                      <div style={{ width: "35%", height: "5px", background: "rgba(255,255,255,0.15)", borderRadius: "1px", marginTop: "4px" }} />
                    </div>
                    <div style={{ display: "flex", gap: "12px", marginTop: "4px", width: "100%" }}>
                      <div style={{ width: "65%", display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ width: "40%", height: "6px", background: tpl.accent, borderRadius: "1px" }} />
                        <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "1px" }} />
                        <div style={{ width: "90%", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "1px" }} />
                      </div>
                      <div style={{ width: "35%", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "6px" }}>
                        <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "80%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
                {tpl.id === "photography-aperture" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "16px", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.15)", padding: "8px", borderRadius: "4px", width: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }} />
                        <div style={{ width: "45px", height: "6px", background: "#fff", borderRadius: "1px" }} />
                      </div>
                      <div style={{ width: "20px", height: "4px", background: "rgba(255,255,255,0.3)", borderRadius: "1px" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "8px", flex: 1, width: "100%" }}>
                      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "70%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "90%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "4px" }}>
                        <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.25)", borderRadius: "1px" }} />
                        <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                        <div style={{ width: "90%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
                {tpl.id === "executive-csuite" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "18px", gap: "8px", alignItems: "center", width: "100%" }}>
                    <div style={{ border: `1.5px solid ${tpl.accent}`, width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", color: tpl.accent, fontWeight: 800 }}>
                      JD
                    </div>
                    <div style={{ width: "60%", height: "10px", background: "#fff", borderRadius: "1px", marginTop: "2px" }} />
                    <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, transparent, ${tpl.accent}, transparent)`, margin: "4px 0" }} />
                    <div style={{ width: "100%", display: "flex", gap: "12px", marginTop: "2px" }}>
                      <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "40%", height: "5px", background: tpl.accent, borderRadius: "1px" }} />
                        <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.12)", borderRadius: "1px" }} />
                      </div>
                      <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
                {tpl.id === "biotech-lab" && (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "16px", gap: "8px", width: "100%" }}>
                    <div style={{ borderLeft: `3px solid ${tpl.accent}`, paddingLeft: "8px", display: "flex", flexDirection: "column", gap: "3px" }}>
                      <div style={{ width: "55%", height: "10px", background: tpl.accent, borderRadius: "1px" }} />
                      <div style={{ width: "35%", height: "5px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "8px", marginTop: "4px", width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.2)", borderRadius: "1px" }} />
                        <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                        <div style={{ width: "90%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                      <div style={{ background: "rgba(13, 148, 136, 0.05)", border: `1px solid ${tpl.accent}30`, borderRadius: "4px", padding: "6px", display: "flex", flexDirection: "column", gap: "3px" }}>
                        <div style={{ width: "70%", height: "4px", background: tpl.accent, borderRadius: "1px", opacity: 0.6 }} />
                        <div style={{ width: "90%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
                      </div>
                    </div>
                  </div>
                )}
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
                  <Icon icon="lucide:eye" style={{ fontSize: "16px" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
