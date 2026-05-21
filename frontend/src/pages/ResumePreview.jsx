import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeResume } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const r = activeResume;

  const handlePrint = () => window.print();

  const collapsedNav = isMobile || isTablet;

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: collapsedNav ? "column" : "row", 
      gap: "0", 
      height: collapsedNav ? "auto" : "calc(100vh - 80px)", 
      overflow: collapsedNav ? "visible" : "hidden", 
      margin: collapsedNav ? "-20px -16px" : "-36px -40px", 
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>
      {/* Action Sidebar */}
      <div style={{ 
        width: collapsedNav ? "100%" : "220px", 
        background: "rgba(8,8,8,0.6)", 
        borderRight: collapsedNav ? "none" : "1px solid rgba(255,255,255,0.06)", 
        borderBottom: collapsedNav ? "1px solid rgba(255,255,255,0.06)" : "none",
        padding: "20px 24px", 
        display: "flex", 
        flexDirection: collapsedNav ? "row" : "column", 
        gap: "12px", 
        flexShrink: 0,
        flexWrap: collapsedNav ? "wrap" : "nowrap",
        alignItems: "center"
      }}>
        {!collapsedNav && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: "8px", width: "100%" }}>PREVIEW ACTIONS</div>}
        <button onClick={() => navigate(`/resume/${id}/edit`)}
          style={{ flex: collapsedNav ? "1 1 auto" : "none", width: collapsedNav ? "auto" : "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "11px 14px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer", textAlign: "left" }}>
          ← Edit
        </button>
        <button onClick={handlePrint}
          style={{ flex: collapsedNav ? "1 1 auto" : "none", width: collapsedNav ? "auto" : "100%", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "11px 14px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
          🖨 Export PDF
        </button>
        <button onClick={() => navigate("/ats-analysis")}
          style={{ flex: collapsedNav ? "1 1 auto" : "none", width: collapsedNav ? "auto" : "100%", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "8px", padding: "11px 14px", color: "#f97316", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
          ⚡ Run ATS Scan
        </button>

        {!collapsedNav && (
          <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", width: "100%" }}>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: "10px" }}>STRENGTH</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: `${r?.strength || 80}%`, background: "linear-gradient(90deg,#f97316,#ea580c)", borderRadius: "3px" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#f97316" }}>{r?.strength || 80}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Print Preview Panel */}
      <div style={{ 
        flex: 1, 
        background: "#e5e7eb", 
        overflowY: "auto", 
        display: "flex", 
        justifyContent: "center", 
        padding: isMobile ? "12px 6px" : "40px 24px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "794px",
          transform: isMobile ? "scale(0.85)" : "none",
          transformOrigin: "top center",
          boxSizing: "border-box"
        }}>
          <div id="resume-print" style={{ 
            background: "white", 
            width: "100%", 
            minHeight: "1123px", 
            boxShadow: "0 4px 40px rgba(0,0,0,0.25)", 
            color: "#111", 
            fontFamily: "'Georgia', serif", 
            padding: isMobile ? "32px 24px" : "56px 64px", 
            boxSizing: "border-box" 
          }}>

            {/* Header */}
            <div style={{ borderBottom: "3px solid #ea580c", paddingBottom: "20px", marginBottom: "28px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 4px 0", color: "#111" }}>{r?.personalInfo?.fullName || "Your Name"}</h1>
              <div style={{ fontSize: "13px", color: "#555", display: "flex", gap: "12px", flexWrap: "wrap", fontFamily: "'Arial', sans-serif" }}>
                {r?.personalInfo?.email && <span>✉ {r.personalInfo.email}</span>}
                {r?.personalInfo?.phone && <span>📞 {r.personalInfo.phone}</span>}
                {r?.personalInfo?.location && <span>📍 {r.personalInfo.location}</span>}
                {r?.personalInfo?.website && <span>🌐 {r.personalInfo.website}</span>}
              </div>
            </div>

            {/* Summary */}
            {r?.summary && (
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 10px 0", fontFamily: "'Arial', sans-serif" }}>Professional Summary</h2>
                <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#333", margin: 0 }}>{r.summary}</p>
              </div>
            )}

            {/* Experience */}
            {r?.experience?.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 14px 0", fontFamily: "'Arial', sans-serif" }}>Work Experience</h2>
                {r.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                      <strong style={{ fontSize: "14px", color: "#111" }}>{exp.role}</strong>
                      <span style={{ fontSize: "12px", color: "#666", fontFamily: "'Arial', sans-serif" }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 600, marginBottom: "6px", fontFamily: "'Arial', sans-serif" }}>{exp.company}</div>
                    <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#444", margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {r?.education?.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 14px 0", fontFamily: "'Arial', sans-serif" }}>Education</h2>
                {r.education.map((edu, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                    <div>
                      <strong style={{ fontSize: "14px", color: "#111" }}>{edu.school}</strong>
                      <div style={{ fontSize: "13px", color: "#555", fontFamily: "'Arial', sans-serif" }}>{edu.degree}</div>
                    </div>
                    <span style={{ fontSize: "12px", color: "#666", fontFamily: "'Arial', sans-serif" }}>{edu.period}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {r?.skills?.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 12px 0", fontFamily: "'Arial', sans-serif" }}>Core Competencies</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {r.skills.map((s, i) => (
                    <span key={i} style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", color: "#c2410c", fontFamily: "'Arial', sans-serif" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {r?.projects?.length > 0 && (
              <div>
                <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 14px 0", fontFamily: "'Arial', sans-serif" }}>Key Projects</h2>
                {r.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <strong style={{ fontSize: "14px", color: "#111" }}>{proj.title}</strong>
                    <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#444", margin: "4px 0 0 0" }}>{proj.description}</p>
                  </div>
                ))}
              </div>
                )}
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body > * { display: none !important; }
          #resume-print { display: block !important; }
        }
      `}</style>
    </div>
  );
}
