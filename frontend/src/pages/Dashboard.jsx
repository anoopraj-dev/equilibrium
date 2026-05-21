import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import ResumeCard from "../components/dashboard/ResumeCard";
import { Icon } from "@iconify/react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, deleteResume, createNewResume, aiUsage } = useApp();
  const { isMobile, isTablet } = useBreakpoint();

  const avgStrength = resumes.length
    ? Math.round(resumes.reduce((s, r) => s + r.strength, 0) / resumes.length)
    : 0;

  const handleCreate = () => {
    const id = createNewResume();
    navigate(`/resume/${id}/edit`);
  };

  const topStats = [
    { label: "Total Resumes", value: resumes.length, sub: "active drafts", icon: "lucide:file-text" },
    { label: "Avg. Strength", value: `${avgStrength}%`, sub: "narrative rating", icon: "lucide:zap" },
    { label: "AI Credits", value: `${aiUsage.monthlyCreditsUsed}/${aiUsage.monthlyCreditsLimit}`, sub: "used this month", icon: "lucide:sparkles" },
    { label: "Status", value: "Elite", sub: "Premium tier active", icon: "lucide:trophy" },
  ];

  const quickActions = [
    { label: "New Resume", desc: "Start from a template", icon: "lucide:file-text", action: handleCreate },
    { label: "ATS Scan", desc: "Grade against job post", icon: "lucide:zap", action: () => navigate("/ats-analysis") },
    { label: "Job Tailor", desc: "AI rewrite for role", icon: "lucide:target", action: () => navigate("/job-tailoring") },
    { label: "Interview Prep", desc: "Mock Q&A with coach", icon: "lucide:mic", action: () => navigate("/interview-prep") },
    { label: "LinkedIn Import", desc: "Pull in profile data", icon: "lucide:linkedin", action: () => navigate("/linkedin-import") },
    { label: "Analytics", desc: "Track career metrics", icon: "lucide:trending-up", action: () => navigate("/analytics") },
  ];

  const card = {
    background: "rgba(18,18,18,0.6)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: isMobile ? "16px" : "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  };

  // Determine grid columns based on screen size
  const statsCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";
  const actionsCols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(6,1fr)";
  const layoutCols = isMobile || isTablet ? "1fr" : "1.5fr 1fr";
  const resumeCols = isMobile ? "1fr" : "1fr 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "32px" }}>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: statsCols, gap: isMobile ? "12px" : "20px" }}>
        {topStats.map((s, i) => (
          <div key={i} style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
              <h3 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: 800, margin: "6px 0 4px", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</h3>
              <span style={{ fontSize: "11px", color: "#f97316" }}>{s.sub}</span>
            </div>
            <Icon icon={s.icon} style={{ fontSize: isMobile ? "24px" : "28px", color: "#f97316", opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 12px 0" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: actionsCols, gap: isMobile ? "10px" : "14px" }}>
          {quickActions.map((a, i) => (
            <button key={i} onClick={a.action}
              style={{ ...card, cursor: "pointer", textAlign: "center", padding: isMobile ? "14px 8px" : "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s", background: "rgba(18,18,18,0.5)", width: "100%", boxSizing: "border-box" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}>
              <Icon icon={a.icon} style={{ fontSize: isMobile ? "20px" : "24px", color: "#f97316" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{a.label}</span>
              {!isMobile && <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", lineHeight: "1.3" }}>{a.desc}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Resumes + AI Widget Row */}
      <div style={{ display: "grid", gridTemplateColumns: layoutCols, gap: isMobile ? "24px" : "28px" }}>

        {/* Recent Resumes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Recent Resumes</h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => navigate("/templates")}
                style={{ background: "transparent", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "8px", padding: "6px 12px", color: "#f97316", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                Browse Templates
              </button>
              <button onClick={handleCreate}
                style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "8px", padding: "6px 12px", color: "#f97316", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                + New
              </button>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div style={{ ...card, textAlign: "center", padding: "40px 20px", border: "1px dashed rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <Icon icon="lucide:file-text" style={{ fontSize: "32px", color: "rgba(255,255,255,0.2)" }} />
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>No resumes yet. Start with a template.</p>
              <button onClick={handleCreate} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "9px 18px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                Create First Resume
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: resumeCols, gap: "16px" }}>
              {resumes.slice(0, 4).map(r => (
                <ResumeCard key={r.id} resume={r}
                  onEdit={() => navigate(`/resume/${r.id}/edit`)}
                  onDelete={deleteResume} />
              ))}
            </div>
          )}
        </div>

        {/* AI Usage + Milestones */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* AI Credit Widget */}
          <div style={{ ...card }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 16px 0" }}>AI Credit Usage</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: "64px", height: "64px", transform: "rotate(-90deg)" }}>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.2" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f97316" strokeWidth="3.2"
                    strokeDasharray={`${(aiUsage.monthlyCreditsUsed / aiUsage.monthlyCreditsLimit) * 100} 100`} strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "white" }}>
                  {Math.round((aiUsage.monthlyCreditsUsed / aiUsage.monthlyCreditsLimit) * 100)}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "white" }}>{aiUsage.monthlyCreditsUsed}<span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/{aiUsage.monthlyCreditsLimit}</span></div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "4px 0" }}>credits this month</div>
                <button onClick={() => navigate("/pricing")} style={{ background: "none", border: "none", color: "#f97316", fontSize: "11px", fontWeight: 700, cursor: "pointer", padding: 0 }}>Upgrade for unlimited →</button>
              </div>
            </div>
          </div>

          {/* Narrative Milestones */}
          <div style={{ ...card }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 16px 0" }}>Career Milestones</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { text: "Resume draft created", done: resumes.length > 0 },
                { text: "ATS scan completed", done: false },
                { text: "Interview prep session", done: false },
                { text: "LinkedIn profile imported", done: false },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "5px", border: m.done ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.15)", background: m.done ? "rgba(249,115,22,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {m.done && <Icon icon="lucide:check" style={{ fontSize: "10px", color: "#f97316" }} />}
                  </div>
                  <span style={{ fontSize: "12px", color: m.done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}>{m.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
