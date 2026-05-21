import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { aiService } from "../services/aiService";

export default function ResumeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeResume, updateActiveResume, saveResumeDraft, showToast, deductAiCredit } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [resume, setResume] = useState(activeResume);
  const [activeSection, setActiveSection] = useState("personal");
  const [aiLoading, setAiLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Autosave every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      updateActiveResume(resume);
      setLastSaved(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(timer);
  }, [resume]);

  const update = (path, value) => {
    setResume(prev => {
      const parts = path.split(".");
      const updated = { ...prev };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...cur[parts[i]] };
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return updated;
    });
  };

  const updateExp = (idx, field, val) => {
    const exp = [...resume.experience];
    exp[idx] = { ...exp[idx], [field]: val };
    setResume(prev => ({ ...prev, experience: exp }));
  };

  const addExp = () => setResume(prev => ({ ...prev, experience: [...resume.experience, { id: `exp-${Date.now()}`, company: "", role: "", period: "", description: "" }] }));
  const removeExp = (idx) => setResume(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));

  const updateEdu = (idx, field, val) => {
    const edu = [...resume.education];
    edu[idx] = { ...edu[idx], [field]: val };
    setResume(prev => ({ ...prev, education: edu }));
  };
  const addEdu = () => setResume(prev => ({ ...prev, education: [...resume.education, { id: `edu-${Date.now()}`, school: "", degree: "", period: "" }] }));
  const removeEdu = (idx) => setResume(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));

  const handleAISummary = async () => {
    setAiLoading(true);
    deductAiCredit();
    const generated = await aiService.generateSummary({ role: resume.personalInfo?.fullName || "Professional", highlights: resume.skills?.join(", ") });
    setResume(prev => ({ ...prev, summary: generated }));
    setAiLoading(false);
    showToast("AI summary generated.");
  };

  const handleSave = () => {
    updateActiveResume(resume);
    saveResumeDraft();
    setLastSaved(new Date().toLocaleTimeString());
  };

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  const inputStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", width: "100%", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box" };
  const labelStyle = { fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700, display: "block", marginBottom: "6px" };

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
      {/* Section Nav */}
      <div style={{ 
        width: collapsedNav ? "100%" : "200px", 
        background: "rgba(8,8,8,0.6)", 
        borderRight: collapsedNav ? "none" : "1px solid rgba(255,255,255,0.06)", 
        borderBottom: collapsedNav ? "1px solid rgba(255,255,255,0.06)" : "none",
        padding: "16px 20px", 
        display: "flex", 
        flexDirection: collapsedNav ? "row" : "column", 
        gap: "4px", 
        flexShrink: 0,
        overflowX: collapsedNav ? "auto" : "visible",
        whiteSpace: collapsedNav ? "nowrap" : "normal",
        alignItems: "center"
      }}>
        {!collapsedNav && <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: "12px", paddingLeft: "8px" }}>SECTIONS</div>}
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            style={{ 
              background: activeSection === s.id ? "rgba(249,115,22,0.12)" : "transparent", 
              border: "none", 
              borderLeft: collapsedNav ? "none" : (activeSection === s.id ? "2px solid #f97316" : "2px solid transparent"), 
              borderBottom: collapsedNav ? (activeSection === s.id ? "2px solid #f97316" : "2px solid transparent") : "none",
              borderRadius: collapsedNav ? "0" : "0 8px 8px 0", 
              padding: collapsedNav ? "8px 16px" : "10px 12px", 
              color: activeSection === s.id ? "#f97316" : "rgba(255,255,255,0.55)", 
              fontSize: "13px", 
              fontWeight: 600, 
              cursor: "pointer", 
              textAlign: collapsedNav ? "center" : "left", 
              transition: "all 0.2s" 
            }}>
            {s.label}
          </button>
        ))}
        {!collapsedNav && (
          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            {lastSaved && <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Saved {lastSaved}</span>}
            <button onClick={handleSave} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "10px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>Save Draft</button>
            <button onClick={() => navigate(`/resume/${id}/preview`)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>Preview →</button>
          </div>
        )}
      </div>

      {/* Editor Panel */}
      <div style={{ flex: 1, overflowY: collapsedNav ? "visible" : "auto", padding: isMobile ? "24px 16px" : "32px 40px", display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", flexDirection: isMobile ? "column" : "row", gap: "16px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 4px 0" }}>{resume.title}</h2>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Template: {resume.template}</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleAISummary} disabled={aiLoading}
              style={{ flex: 1, background: aiLoading ? "rgba(249,115,22,0.4)" : "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "8px", padding: "9px 16px", color: "#f97316", fontWeight: 700, fontSize: "12px", cursor: aiLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
              {aiLoading ? "Generating..." : "✦ AI Enhance"}
            </button>
            <button onClick={() => navigate(`/resume/${id}/preview`)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "9px 16px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>Preview</button>
          </div>
        </div>

        {/* Section: Personal */}
        {activeSection === "personal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
              {[["Full Name", "personalInfo.fullName", resume.personalInfo?.fullName],
                ["Email Address", "personalInfo.email", resume.personalInfo?.email],
                ["Phone Number", "personalInfo.phone", resume.personalInfo?.phone],
                ["Location", "personalInfo.location", resume.personalInfo?.location],
                ["Website / Portfolio", "personalInfo.website", resume.personalInfo?.website],
                ["LinkedIn URL", "personalInfo.linkedin", resume.personalInfo?.linkedin],
              ].map(([label, path, val]) => (
                <div key={path}>
                  <label style={labelStyle}>{label.toUpperCase()}</label>
                  <input value={val || ""} onChange={e => update(path, e.target.value)} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Summary */}
        {activeSection === "summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Professional Summary</h3>
              <button onClick={handleAISummary} disabled={aiLoading}
                style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "8px", padding: "7px 14px", color: "#f97316", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
                {aiLoading ? "..." : "✦ Regenerate with AI"}
              </button>
            </div>
            <textarea value={resume.summary || ""} onChange={e => update("summary", e.target.value)} rows={8}
              style={{ ...inputStyle, lineHeight: "1.7", resize: "vertical", padding: "14px 16px" }} />
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0 }}>{resume.summary?.length || 0} characters · Recommended: 300–500</p>
          </div>
        )}

        {/* Section: Experience */}
        {activeSection === "experience" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Work Experience</h3>
              <button onClick={addExp} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "7px 14px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>+ Add Role</button>
            </div>
            {resume.experience?.map((exp, idx) => (
              <div key={exp.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: isMobile ? "14px" : "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#f97316", fontWeight: 700 }}>ROLE {idx + 1}</span>
                  <button onClick={() => removeExp(idx)} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "4px 10px", color: "#ef4444", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Remove</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                  {[["Company", "company"], ["Job Title", "role"], ["Period", "period"]].map(([lbl, fld]) => (
                    <div key={fld}>
                      <label style={labelStyle}>{lbl.toUpperCase()}</label>
                      <input value={exp[fld] || ""} onChange={e => updateExp(idx, fld, e.target.value)} style={inputStyle} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={labelStyle}>KEY ACHIEVEMENTS & RESPONSIBILITIES</label>
                  <textarea value={exp.description || ""} onChange={e => updateExp(idx, "description", e.target.value)} rows={4}
                    style={{ ...inputStyle, lineHeight: "1.6", resize: "vertical" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section: Education */}
        {activeSection === "education" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Education</h3>
              <button onClick={addEdu} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "7px 14px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>+ Add Education</button>
            </div>
            {resume.education?.map((edu, idx) => (
              <div key={edu.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: isMobile ? "14px" : "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#f97316", fontWeight: 700 }}>ENTRY {idx + 1}</span>
                  <button onClick={() => removeEdu(idx)} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "4px 10px", color: "#ef4444", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Remove</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "12px" }}>
                  {[["School / University", "school"], ["Degree / Field", "degree"], ["Period", "period"]].map(([lbl, fld]) => (
                    <div key={fld}>
                      <label style={labelStyle}>{lbl.toUpperCase()}</label>
                      <input value={edu[fld] || ""} onChange={e => updateEdu(idx, fld, e.target.value)} style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section: Skills */}
        {activeSection === "skills" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Skills & Competencies</h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>One skill per line. Press Enter to separate skills.</p>
            <textarea value={resume.skills?.join("\n") || ""} onChange={e => update("skills", e.target.value.split("\n").filter(s => s.trim()))} rows={12}
              style={{ ...inputStyle, lineHeight: "1.8", resize: "vertical" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {resume.skills?.map((s, i) => s.trim() && (
                <span key={i} style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", color: "#f97316", fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Section: Projects */}
        {activeSection === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Key Projects</h3>
              <button onClick={() => setResume(prev => ({ ...prev, projects: [...(prev.projects || []), { id: `proj-${Date.now()}`, title: "", description: "" }] }))}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "7px 14px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>+ Add Project</button>
            </div>
            {resume.projects?.map((proj, idx) => (
              <div key={proj.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: isMobile ? "14px" : "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>PROJECT TITLE</label>
                  <input value={proj.title || ""} onChange={e => { const ps = [...resume.projects]; ps[idx] = { ...ps[idx], title: e.target.value }; setResume(prev => ({ ...prev, projects: ps })); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>DESCRIPTION & IMPACT</label>
                  <textarea value={proj.description || ""} onChange={e => { const ps = [...resume.projects]; ps[idx] = { ...ps[idx], description: e.target.value }; setResume(prev => ({ ...prev, projects: ps })); }} rows={3} style={{ ...inputStyle, lineHeight: "1.6", resize: "vertical" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Action buttons */}
        {collapsedNav && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", display: "flex", gap: "12px", marginTop: "auto" }}>
            <button onClick={handleSave} style={{ flex: 1, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "8px", padding: "12px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>Save Draft</button>
            <button onClick={() => navigate(`/resume/${id}/preview`)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "12px", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>Preview →</button>
          </div>
        )}
      </div>
    </div>
  );
}
