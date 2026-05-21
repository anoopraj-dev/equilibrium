import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Toast } from "../components/dashboard/CommonUI";
import { Icon } from "@iconify/react";

const PATH_TO_TAB = {
  "/dashboard":       "overview",
  "/analytics":       "analytics",
  "/templates":       "templates",
  "/ats-analysis":    "narrative",
  "/job-tailoring":   "tailoring",
  "/interview-prep":  "interview",
  "/linkedin-import": "linkedin",
  "/settings":        "settings",
  "/pricing":         "pricing",
};

const TAB_TITLES = {
  overview:   { title: "Dashboard Overview",      sub: "Your career command center." },
  analytics:  { title: "Career Analytics",        sub: "Track performance and growth metrics." },
  templates:  { title: "Resume Templates",        sub: "ATS-optimised professional templates." },
  narrative:  { title: "ATS Scanner",             sub: "Grade your resume against job postings." },
  tailoring:  { title: "Job-Specific Tailoring",  sub: "AI rewrites for target roles." },
  interview:  { title: "Interview Coach",          sub: "Coming soon — practice sessions." },
  linkedin:   { title: "LinkedIn Import",          sub: "Auto-populate from your LinkedIn profile." },
  settings:   { title: "Account Settings",        sub: "Manage profile, AI keys, and billing." },
  pricing:    { title: "Plans & Pricing",          sub: "Upgrade your Equilibrium subscription." },
};

export default function DashboardLayout() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { toasts, user, logout } = useApp();
  const { isMobile } = useBreakpoint();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const activeTab = PATH_TO_TAB[location.pathname]
    ?? (location.pathname.startsWith("/resume") ? "templates" : "overview");
  const { title, sub } = TAB_TITLES[activeTab] ?? { title: "Equilibrium", sub: "" };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "EQ";

  // Mobile Bottom Nav Items
  const mobileNavItems = [
    { id: "overview",   path: "/dashboard",       label: "Home",      icon: "lucide:home" },
    { id: "templates",  path: "/templates",        label: "Templates", icon: "lucide:layout-template" },
    { id: "narrative",  path: "/ats-analysis",     label: "ATS",       icon: "lucide:zap" },
    { id: "tailoring",  path: "/job-tailoring",    label: "Tailor",    icon: "lucide:target" },
    { id: "settings",   path: "/settings",         label: "Settings",  icon: "lucide:settings" },
  ];

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      minHeight: "100vh", 
      background: "#050505", 
      color: "white", 
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>

      {/* Main Container */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        
        {/* Sidebar Navigation: Only on desktop/tablet */}
        {!isMobile && (
          <div style={{ width: "260px", flexShrink: 0 }}>
            <DashboardSidebar activeTab={activeTab} />
          </div>
        )}

        {/* Content Wrapper */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          minWidth: 0,
          paddingBottom: isMobile ? "72px" : 0 // Padding so bottom nav doesn't cover content
        }}>

          {/* Header */}
          <header style={{
            height: "64px",
            background: "rgba(10,10,10,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "0 16px" : "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 40,
            gap: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h1>
                {!isMobile && <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", margin: "2px 0 0 0" }}>{greeting}, {firstName}. {sub}</p>}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              <button style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                <Icon icon="lucide:bell" style={{ fontSize: "16px", color: "white" }} />
                <span style={{ position: "absolute", top: "8px", right: "8px", width: "5px", height: "5px", background: "#f97316", borderRadius: "50%" }} />
              </button>
              
              {isMobile ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#fb923c,#f97316)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 0 10px rgba(249,115,22,0.25)"
                  }}
                >
                  {initials}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/ats-analysis")}
                  style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "8px 14px", fontWeight: 700, fontSize: "12px", cursor: "pointer", boxShadow: "0 3px 10px rgba(249,115,22,0.28)", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Icon icon="lucide:sparkles" style={{ fontSize: "13px" }} /> AI Assist
                </button>
              )}
            </div>
          </header>

          {/* Page content */}
          <main style={{ 
            padding: isMobile ? "16px 12px" : "32px 36px", 
            flex: 1, 
            background: "radial-gradient(ellipse at top right, rgba(249,115,22,0.025) 0%, transparent 55%)"
          }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <nav style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "64px",
          background: "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 999,
          padding: "0 10px"
        }}>
          {mobileNavItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  color: isActive ? "#f97316" : "rgba(255, 255, 255, 0.45)",
                  fontSize: "10px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  transition: "all 0.15s ease",
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                <Icon icon={item.icon} style={{ fontSize: "20px" }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Logout Confirmation Modal Overlay */}
      {showLogoutModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          padding: "20px"
        }}>
          <div style={{
            background: "rgba(18, 18, 18, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "28px",
            maxWidth: "320px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 24px 64px rgba(0,0,0,0.8)"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#ef4444"
            }}>
              <Icon icon="lucide:log-out" style={{ fontSize: "22px" }} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 8px 0" }}>Sign Out</h3>
            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.45)", lineHeight: "1.5", margin: "0 0 24px 0" }}>
              Are you sure you want to log out of your Equilibrium account?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast stack */}
      <div style={{ position: "fixed", bottom: isMobile ? "76px" : "24px", right: isMobile ? "12px" : "24px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "8px", pointerEvents: "none", maxWidth: "calc(100vw - 24px)" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(120%); opacity:0; } to { transform:translateX(0); opacity:1; } }`}</style>
        {toasts.map(t => <Toast key={t.id} toast={t} onClose={() => {}} />)}
      </div>
    </div>
  );
}
