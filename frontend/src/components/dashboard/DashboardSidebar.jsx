import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const NAV_SECTIONS = [
  {
    label: "WORKSPACE",
    items: [
      { id: "overview",   path: "/dashboard",       label: "Overview",         icon: "📊" },
      { id: "analytics",  path: "/analytics",        label: "Analytics",        icon: "📈" },
      { id: "templates",  path: "/templates",        label: "Templates",        icon: "🗂" },
    ],
  },
  {
    label: "AI TOOLS",
    items: [
      { id: "narrative",  path: "/ats-analysis",     label: "ATS Scanner",      icon: "⚡" },
      { id: "tailoring",  path: "/job-tailoring",    label: "Job Tailoring",    icon: "🎯" },
      { id: "interview",  path: "/interview-prep",   label: "Interview Coach",  icon: "🎤" },
      { id: "linkedin",   path: "/linkedin-import",  label: "LinkedIn Import",  icon: "🔗" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { id: "settings",   path: "/settings",         label: "Settings",         icon: "⚙️" },
      { id: "pricing",    path: "/pricing",           label: "Upgrade Plan",     icon: "✦" },
    ],
  },
];

export default function DashboardSidebar({ activeTab }) {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "EQ";

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.07)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        padding: "28px 16px",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflowY: "auto",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", paddingLeft: "8px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", boxShadow: "0 0 14px rgba(249,115,22,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "white", flexShrink: 0 }}>✦</div>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "17px", letterSpacing: "-0.5px", fontFamily: "'Playfair Display', serif" }}>
          Equili<span style={{ color: "#f97316" }}>brium</span>
        </span>
      </div>

      {/* Navigation Sections */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontWeight: 700, letterSpacing: "1px", paddingLeft: "12px", marginBottom: "6px" }}>
              {section.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: isActive ? "rgba(249, 115, 22, 0.12)" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "2px solid #f97316" : "2px solid transparent",
                      borderRadius: "0 10px 10px 0",
                      padding: "10px 12px",
                      color: isActive ? "#f97316" : "rgba(255, 255, 255, 0.6)",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "transparent"; } }}
                  >
                    <span style={{ fontSize: "15px", width: "20px", flexShrink: 0 }}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "4px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#fb923c,#f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", color: "white", flexShrink: 0, boxShadow: "0 0 10px rgba(249,115,22,0.2)" }}>
            {initials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name || "User"}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.tier || "Premium"}</div>
          </div>
        </div>
        <button
          onClick={logout}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "9px 16px", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; e.currentTarget.style.background = "rgba(239,68,68,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
