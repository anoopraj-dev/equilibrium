import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Icon } from "@iconify/react";

function getTemplateStyle(templateName) {
  const name = (templateName || "").toLowerCase();
  
  if (name.includes("fashion") || name.includes("editorial") || name.includes("vogue")) {
    return {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      color: "#1c1917",
      accent: "#be123c",
      accentLight: "rgba(190, 18, 60, 0.05)",
      titleFont: "'Playfair Display', serif",
      padding: "60px 60px"
    };
  } else if (name.includes("aperture") || name.includes("photo") || name.includes("gallery")) {
    return {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#18181b",
      accent: "#111111",
      accentLight: "rgba(0, 0, 0, 0.03)",
      titleFont: "'Plus Jakarta Sans', sans-serif",
      padding: "48px 48px"
    };
  } else if (name.includes("wallstreet") || name.includes("csuite") || name.includes("elite") || name.includes("gold")) {
    return {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#0f172a",
      accent: "#b45309",
      accentLight: "rgba(180, 83, 9, 0.05)",
      titleFont: "'Georgia', serif",
      padding: "56px 56px"
    };
  } else if (name.includes("biotech") || name.includes("lab") || name.includes("science")) {
    return {
      fontFamily: "'Inter', sans-serif",
      color: "#0f172a",
      accent: "#0d9488",
      accentLight: "rgba(13, 148, 136, 0.05)",
      titleFont: "'Inter', sans-serif",
      padding: "48px 48px"
    };
  } else if (name.includes("modern") || name.includes("sleek")) {
    return {
      fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
      color: "#1e293b",
      accent: "#3b82f6",
      accentLight: "rgba(59, 130, 246, 0.08)",
      titleFont: "'Inter', sans-serif",
      padding: "48px 48px"
    };
  } else if (name.includes("grid") || name.includes("creative") || name.includes("minimal")) {
    return {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#27272a",
      accent: "#8b5cf6",
      accentLight: "rgba(139, 92, 246, 0.06)",
      titleFont: "'Plus Jakarta Sans', sans-serif",
      padding: "48px 48px"
    };
  } else if (name.includes("bold") || name.includes("executive")) {
    return {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      color: "#0f172a",
      accent: "#ea580c",
      accentLight: "rgba(234, 88, 12, 0.05)",
      titleFont: "'Playfair Display', serif",
      padding: "56px 56px"
    };
  } else if (name.includes("mono") || name.includes("tech")) {
    return {
      fontFamily: "'Courier New', Courier, monospace",
      color: "#171717",
      accent: "#16a34a",
      accentLight: "rgba(22, 163, 74, 0.08)",
      titleFont: "'Courier New', Courier, monospace",
      padding: "40px 40px"
    };
  } else if (name.includes("nexus") || name.includes("corporate") || name.includes("business")) {
    return {
      fontFamily: "'Times New Roman', Times, serif",
      color: "#1e293b",
      accent: "#475569",
      accentLight: "rgba(71, 85, 105, 0.06)",
      titleFont: "'Times New Roman', Times, serif",
      padding: "56px 56px"
    };
  } else {
    // Default: Classic Premium
    return {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      color: "#111111",
      accent: "#f97316",
      accentLight: "rgba(249, 115, 22, 0.06)",
      titleFont: "'Playfair Display', serif",
      padding: "56px 56px"
    };
  }
}

function renderTemplateContent(r, templateName, isMobile) {
  const name = (templateName || "").toLowerCase();
  
  // 1. FASHION EDITORIAL (Luxury Vogue Style)
  if (name.includes("fashion") || name.includes("editorial")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "'Playfair Display', serif" }}>
        {/* Luxury Vogue-style Editorial Header */}
        <div style={{ textAlign: "center", borderBottom: "1px solid #be123c", paddingBottom: "24px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "38px", fontWeight: 700, margin: "0 0 6px 0", color: "#1c1917", textTransform: "uppercase", letterSpacing: "2px" }}>
            {r?.personalInfo?.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "11px", color: "#be123c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "4px", marginBottom: "16px" }}>
            {r?.title || "Luxury & Design Specialist"}
          </div>
          <div style={{ fontSize: "12px", color: "#78716c", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
            {r?.personalInfo?.email && <span>{r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span>· {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span>· {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span>· {r.personalInfo.website}</span>}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "40px" }}>
          {/* Left Column (Wide) - 65% */}
          <div style={{ width: isMobile ? "100%" : "65%", display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Summary */}
            {r?.summary && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#be123c", margin: "0 0 10px 0" }}>
                  Profile
                </h2>
                <p style={{ fontSize: "13px", lineHeight: "1.75", color: "#44403c", margin: 0, fontStyle: "italic", textAlign: "justify" }}>
                  {r.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {r?.experience?.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#be123c", margin: "0 0 16px 0" }}>
                  Editorial & Career Journey
                </h2>
                {r.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: "20px", borderBottom: i < r.experience.length - 1 ? "1px dashed rgba(190, 18, 60, 0.1)" : "none", paddingBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                      <strong style={{ fontSize: "14px", color: "#1c1917", textTransform: "uppercase", letterSpacing: "0.5px" }}>{exp.role}</strong>
                      <span style={{ fontSize: "11px", color: "#78716c", fontFamily: "'Inter', sans-serif" }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#be123c", fontStyle: "italic", marginBottom: "6px" }}>{exp.company}</div>
                    <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#44403c", margin: 0 }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Narrow) - 35% */}
          <div style={{ width: isMobile ? "100%" : "35%", display: "flex", flexDirection: "column", gap: "28px", borderLeft: isMobile ? "none" : "1px solid rgba(190, 18, 60, 0.1)", paddingLeft: isMobile ? "0" : "24px" }}>
            {/* Skills */}
            {r?.skills?.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#be123c", margin: "0 0 12px 0" }}>
                  Core Competence
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {r.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: "12px", color: "#1c1917", borderBottom: "1px solid #f5f5f4", paddingBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {r?.education?.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#be123c", margin: "0 0 12px 0" }}>
                  Education
                </h2>
                {r.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <strong style={{ fontSize: "12px", color: "#1c1917", textTransform: "uppercase" }}>{edu.school}</strong>
                    <div style={{ fontSize: "11px", color: "#be123c", fontStyle: "italic", marginTop: "2px" }}>{edu.degree}</div>
                    <div style={{ fontSize: "10px", color: "#78716c", fontFamily: "'Inter', sans-serif", marginTop: "2px" }}>{edu.period}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {r?.projects?.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#be123c", margin: "0 0 12px 0" }}>
                  Key Portfolios
                </h2>
                {r.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    <strong style={{ fontSize: "12px", color: "#1c1917", textTransform: "uppercase" }}>{proj.title}</strong>
                    <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#44403c", margin: "4px 0 0 0" }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. APERTURE MINIMAL (Photography & Gallery Style)
  if (name.includes("aperture") || name.includes("photo")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Photography Frame Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "2px solid #111", padding: "20px", borderRadius: "2px", marginBottom: "8px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-flex", padding: "6px", background: "#111", color: "#fff", borderRadius: "50%" }}>
                <Icon icon="lucide:camera" style={{ fontSize: "14px" }} />
              </span>
              <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0, color: "#111", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
                {r?.personalInfo?.fullName || "Your Name"}
              </h1>
            </div>
            <span style={{ fontSize: "11px", color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", display: "block", marginTop: "4px" }}>
              {r?.title || "Visual Artist & Photographer"}
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "#111", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", fontFamily: "monospace" }}>
            {r?.personalInfo?.email && <span>[EMAIL] {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span>[PHONE] {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span>[LOC] {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span>[WEB] {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", margin: "0 0 8px 0" }}>
              Vision Statement
            </h2>
            <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#27272a", margin: 0 }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", margin: "0 0 12px 0" }}>
              Exhibitions & Career History
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ border: "1px solid #111", padding: "16px", borderRadius: "2px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "13px", color: "#111", textTransform: "uppercase" }}>{exp.role}</strong>
                    <span style={{ fontSize: "11px", color: "#666", fontWeight: 700, fontFamily: "monospace" }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#111", fontWeight: 600, margin: "2px 0 6px 0", textTransform: "uppercase" }}>{exp.company}</div>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#27272a", margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects / Gallery Grid style */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", margin: "0 0 12px 0" }}>
              Selected Projects & Portfolios
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ border: "1px solid #e4e4e7", background: "#fafafa", padding: "14px", borderRadius: "2px" }}>
                  <strong style={{ fontSize: "13px", color: "#111" }}>{proj.title}</strong>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#52525b", margin: "4px 0 0 0" }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Grid: Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", margin: "0 0 8px 0" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <strong style={{ fontSize: "12px", color: "#111" }}>{edu.school}</strong>
                  <div style={{ fontSize: "11px", color: "#52525b", fontStyle: "italic" }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: "#71717a", marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", margin: "0 0 8px 0" }}>
                Creative Arsenal
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: "#111", color: "#fff", padding: "4px 10px", fontSize: "11px", borderRadius: "2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. WALLSTREET ELITE (Banking / C-Suite Monogram)
  if (name.includes("wallstreet") || name.includes("elite")) {
    const initials = (r?.personalInfo?.fullName || "YN")
      .split(" ")
      .map(p => p[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
      
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "'Georgia', serif" }}>
        {/* WallStreet Centered Monogram Header */}
        <div style={{ textAlign: "center", borderBottom: "1px solid #b45309", paddingBottom: "24px", marginBottom: "8px", position: "relative" }}>
          {/* Monogram Ring */}
          <div style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            border: "1.5px solid #b45309", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: "14px", 
            fontWeight: 700, 
            color: "#b45309", 
            margin: "0 auto 12px auto",
            background: "#fff"
          }}>
            {initials}
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 4px 0", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px" }}>
            {r?.personalInfo?.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "11px", color: "#64748b", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:mail" style={{ color: "#b45309", fontSize: "11px" }} /> {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:phone" style={{ color: "#b45309", fontSize: "11px" }} /> {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:map-pin" style={{ color: "#b45309", fontSize: "11px" }} /> {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:globe" style={{ color: "#b45309", fontSize: "11px" }} /> {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#b45309", margin: "0 0 8px 0", borderBottom: "1px solid #cbd5e1", paddingBottom: "2px" }}>
              Executive Objective
            </h2>
            <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#334155", margin: 0, textAlign: "justify" }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#b45309", margin: "0 0 12px 0", borderBottom: "1px solid #cbd5e1", paddingBottom: "2px" }}>
              Professional History
            </h2>
            {r.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: "13px", color: "#0f172a" }}>{exp.role}</strong>
                  <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#b45309", fontStyle: "italic", marginBottom: "4px" }}>{exp.company}</div>
                <p style={{ fontSize: "12px", lineHeight: "1.65", color: "#334155", margin: 0, textAlign: "justify" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Grid: Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "28px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#b45309", margin: "0 0 10px 0", borderBottom: "1px solid #cbd5e1", paddingBottom: "2px" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div>
                    <strong style={{ fontSize: "12px", color: "#0f172a" }}>{edu.school}</strong>
                    <div style={{ fontSize: "11px", color: "#64748b", fontStyle: "italic" }}>{edu.degree}</div>
                  </div>
                  <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>{edu.period}</span>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#b45309", margin: "0 0 10px 0", borderBottom: "1px solid #cbd5e1", paddingBottom: "2px" }}>
                Key Competencies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ border: "1px solid #d97706", borderRadius: "3px", padding: "3px 8px", fontSize: "11px", color: "#b45309", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#b45309", margin: "0 0 10px 0", borderBottom: "1px solid #cbd5e1", paddingBottom: "2px" }}>
              Key Accomplishments
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>{proj.title}</strong>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#334155", margin: "2px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 4. BIOTECH LAB (Science & Clinical)
  if (name.includes("biotech") || name.includes("lab")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "'Inter', sans-serif" }}>
        {/* Biotech Teal Accented Sidebar Header */}
        <div style={{ borderLeft: "4px solid #0d9488", paddingLeft: "16px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 4px 0", color: "#0f172a", letterSpacing: "-0.5px" }}>
            {r?.personalInfo?.fullName || "Your Name"}
          </h1>
          <span style={{ fontSize: "11px", color: "#0d9488", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", display: "block", marginBottom: "8px" }}>
            {r?.title || "Clinical Research Specialist"}
          </span>
          <div style={{ fontSize: "12px", color: "#475569", display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:mail" style={{ color: "#0d9488", fontSize: "12px" }} /> {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:phone" style={{ color: "#0d9488", fontSize: "12px" }} /> {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:map-pin" style={{ color: "#0d9488", fontSize: "12px" }} /> {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:globe" style={{ color: "#0d9488", fontSize: "12px" }} /> {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#0d9488", margin: "0 0 10px 0" }}>
              Abstract & Vision
            </h2>
            <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#334155", margin: 0 }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#0d9488", margin: "0 0 14px 0" }}>
              Research & Professional Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ fontSize: "13px", color: "#0f172a" }}>{exp.role}</strong>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#0d9488", fontWeight: 600, margin: "2px 0 6px 0" }}>{exp.company}</div>
                  <p style={{ fontSize: "12px", lineHeight: "1.65", color: "#475569", margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Grid: Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "28px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#0d9488", margin: "0 0 12px 0" }}>
                Education & Credentials
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{edu.school}</strong>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#0d9488", margin: "0 0 12px 0" }}>
                Technical Specialties
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: "rgba(13, 148, 136, 0.08)", border: "1px solid rgba(13, 148, 136, 0.15)", borderRadius: "6px", padding: "4px 10px", fontSize: "11px", color: "#0d9488", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#0d9488", margin: "0 0 12px 0" }}>
              Significant Scientific Accomplishments
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>{proj.title}</strong>
                <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569", margin: "4px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 5. MODERN SLEEK
  if (name.includes("modern") || name.includes("sleek")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Left aligned Modern Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #3b82f6", paddingBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 6px 0", color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
              {r?.personalInfo?.fullName || "Your Name"}
            </h1>
            <span style={{ fontSize: "12px", color: "#3b82f6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
              {r?.title || "Professional Profile"}
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#64748b", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:mail" style={{ fontSize: "12px", color: "#3b82f6" }} /> {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:phone" style={{ fontSize: "12px", color: "#3b82f6" }} /> {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:map-pin" style={{ fontSize: "12px", color: "#3b82f6" }} /> {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:globe" style={{ fontSize: "12px", color: "#3b82f6" }} /> {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 10px 0" }}>
              Summary
            </h2>
            <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#475569", margin: 0 }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 16px 0" }}>
              Professional Timeline
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", borderLeft: "2px solid rgba(59, 130, 246, 0.15)", paddingLeft: "16px", marginLeft: "4px" }}>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: "-23px", top: "5px", width: "10px", height: "10px", borderRadius: "50%", background: "#3b82f6", border: "2px solid white" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ fontSize: "14px", color: "#1e293b" }}>{exp.role}</strong>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#3b82f6", fontWeight: 600, marginBottom: "6px" }}>{exp.company}</div>
                  <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#475569", margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Grid: Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 12px 0" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>{edu.school}</strong>
                  <div style={{ fontSize: "12px", color: "#475569" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 12px 0" }}>
                Technical Stack
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: "rgba(59, 130, 246, 0.08)", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", color: "#2563eb", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 12px 0" }}>
              Key Projects
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "12px", background: "rgba(59, 130, 246, 0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(59, 130, 246, 0.1)" }}>
                <strong style={{ fontSize: "13px", color: "#1e293b" }}>{proj.title}</strong>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#475569", margin: "4px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 6. MINIMAL GRID (Creative Layout)
  if (name.includes("grid") || name.includes("creative") || name.includes("minimal")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Creative two-column header */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: "16px", borderBottom: "2px solid #8b5cf6", paddingBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "34px", fontWeight: 800, margin: "0 0 4px 0", color: "#27272a", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.5px" }}>
              {r?.personalInfo?.fullName || "Your Name"}
            </h1>
            <div style={{ display: "inline-block", background: "rgba(139, 92, 246, 0.1)", color: "#7c3aed", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {r?.title || "Creative Talent"}
            </div>
          </div>
          <div style={{ fontSize: "12px", color: "#52525b", display: "flex", flexDirection: "column", gap: "6px", justifyContent: "flex-end" }}>
            {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:mail" style={{ color: "#8b5cf6" }} /> {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:phone" style={{ color: "#8b5cf6" }} /> {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:map-pin" style={{ color: "#8b5cf6" }} /> {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:globe" style={{ color: "#8b5cf6" }} /> {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div style={{ background: "rgba(139, 92, 246, 0.03)", padding: "16px", borderRadius: "12px", borderLeft: "4px solid #8b5cf6" }}>
            <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#3f3f46", margin: 0 }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#8b5cf6", margin: "0 0 16px 0" }}>
              Selected Experience
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ background: "#fafafa", border: "1px solid #f4f4f5", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#a1a1aa" }}>{exp.period}</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: "13px", color: "#18181b", display: "block" }}>{exp.role}</strong>
                    <span style={{ fontSize: "12px", color: "#7c3aed", fontWeight: 600 }}>{exp.company}</span>
                  </div>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#52525b", margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: "28px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#8b5cf6", margin: "0 0 12px 0" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "14px", borderBottom: "1px solid #f4f4f5", paddingBottom: "10px" }}>
                  <strong style={{ fontSize: "13px", color: "#18181b" }}>{edu.school}</strong>
                  <div style={{ fontSize: "12px", color: "#52525b" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 600, marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#8b5cf6", margin: "0 0 12px 0" }}>
                Core Arsenal
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: "#f4f4f5", border: "1px solid #e4e4e7", borderRadius: "8px", padding: "6px 12px", fontSize: "11px", color: "#18181b", fontWeight: 700 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#8b5cf6", margin: "0 0 12px 0" }}>
              Key Projects
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ border: "1.5px dashed rgba(139, 92, 246, 0.25)", borderRadius: "12px", padding: "14px" }}>
                  <strong style={{ fontSize: "13px", color: "#18181b" }}>{proj.title}</strong>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#52525b", margin: "4px 0 0 0" }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 7. EXECUTIVE BOLD
  if (name.includes("bold") || name.includes("executive")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Bold centered header */}
        <div style={{ borderBottom: "4px double #ea580c", paddingBottom: "24px", marginBottom: "8px", textAlign: "center" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 8px 0", color: "#0f172a", fontFamily: "'Playfair Display', serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {r?.personalInfo?.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "12px", color: "#334155", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
            {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:mail" style={{ color: "#ea580c" }} /> {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:phone" style={{ color: "#ea580c" }} /> {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:map-pin" style={{ color: "#ea580c" }} /> {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:globe" style={{ color: "#ea580c" }} /> {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 10px 0", borderBottom: "2px solid #ea580c", paddingBottom: "4px" }}>
              Executive Directive
            </h2>
            <p style={{ fontSize: "13px", lineHeight: "1.75", color: "#1e293b", margin: 0, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 16px 0", borderBottom: "2px solid #ea580c", paddingBottom: "4px" }}>
              Proven Leadership & Career History
            </h2>
            {r.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#0f172a", textTransform: "uppercase" }}>{exp.role}</strong>
                  <span style={{ fontSize: "12px", color: "#475569", fontWeight: 700 }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "13px", color: "#ea580c", fontWeight: 700, marginBottom: "6px" }}>{exp.company}</div>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#334155", margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Grid: Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "28px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 12px 0", borderBottom: "2px solid #ea580c", paddingBottom: "4px" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "14px", color: "#0f172a" }}>{edu.school}</strong>
                  <div style={{ fontSize: "12px", color: "#334155", fontWeight: 600 }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#ea580c", marginTop: "2px", fontWeight: 700 }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 12px 0", borderBottom: "2px solid #ea580c", paddingBottom: "4px" }}>
                Executive Competencies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: "#ea580c", color: "white", padding: "4px 10px", fontSize: "11px", fontWeight: 800, borderRadius: "2px", textTransform: "uppercase" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#ea580c", margin: "0 0 12px 0", borderBottom: "2px solid #ea580c", paddingBottom: "4px" }}>
              High-Impact Initiatives
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "14px", color: "#0f172a", textTransform: "uppercase" }}>{proj.title}</strong>
                <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#334155", margin: "4px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 8. TECH MONO (Monospaced style)
  if (name.includes("mono") || name.includes("tech")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "'Courier New', Courier, monospace" }}>
        {/* Terminal Header */}
        <div style={{ border: "1px solid #16a34a", padding: "16px", borderRadius: "4px", background: "#f4fcf6", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px 0", color: "#171717" }}>
            {`> ${r?.personalInfo?.fullName || "Your Name"}`}
          </h1>
          <div style={{ fontSize: "12px", color: "#333", display: "flex", flexDirection: "column", gap: "4px" }}>
            {r?.personalInfo?.email && <span>[EMAIL] {r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span>[PHONE] {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span>[LOC] {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span>[WEB] {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", margin: "0 0 8px 0" }}>
              # EXECUTIVE_SUMMARY
            </h2>
            <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#333", margin: 0 }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", margin: "0 0 12px 0" }}>
              # WORK_EXPERIENCE
            </h2>
            {r.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "16px", border: "1px solid #e5e5e5", padding: "12px", borderRadius: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "13px", color: "#171717" }}>{`// ${exp.role}`}</strong>
                  <span style={{ fontSize: "11px", color: "#666" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, margin: "2px 0 6px 0" }}>{`@ ${exp.company}`}</div>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444", margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education & Skills */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", margin: "0 0 12px 0" }}>
                # EDUCATION
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "13px", color: "#171717" }}>{edu.school}</strong>
                  <div style={{ fontSize: "12px", color: "#555" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#16a34a", marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", margin: "0 0 12px 0" }}>
                # TECH_STACK
              </h2>
              <p style={{ fontSize: "12px", color: "#333", lineHeight: "1.8", wordBreak: "break-all" }}>
                {r.skills.join(" // ")}
              </p>
            </div>
          )}
        </div>

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a", margin: "0 0 12px 0" }}>
              # KEY_PROJECTS
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "13px", color: "#171717" }}>{`* ${proj.title}`}</strong>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444", margin: "4px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 9. CORPORATE NEXUS (Classic Business)
  if (name.includes("nexus") || name.includes("corporate") || name.includes("business")) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "'Times New Roman', Times, serif" }}>
        {/* Classical Centered Elegant Header */}
        <div style={{ borderBottom: "1px solid #475569", paddingBottom: "16px", marginBottom: "12px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 4px 0", color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px" }}>
            {r?.personalInfo?.fullName || "Your Name"}
          </h1>
          <div style={{ fontSize: "12px", color: "#475569", display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {r?.personalInfo?.email && <span>{r.personalInfo.email}</span>}
            {r?.personalInfo?.phone && <span> · {r.personalInfo.phone}</span>}
            {r?.personalInfo?.location && <span> · {r.personalInfo.location}</span>}
            {r?.personalInfo?.website && <span> · {r.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {r?.summary && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#475569", margin: "0 0 8px 0", borderBottom: "1px solid #cbd5e1" }}>
              Executive Statement
            </h2>
            <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#334155", margin: 0, textAlign: "justify" }}>
              {r.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {r?.experience?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#475569", margin: "0 0 12px 0", borderBottom: "1px solid #cbd5e1" }}>
              Professional Experience
            </h2>
            {r.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>{exp.role}</strong>
                  <span style={{ fontSize: "12px", color: "#475569" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#475569", fontStyle: "italic", marginBottom: "4px" }}>{exp.company}</div>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#334155", margin: 0, textAlign: "justify" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {r?.education?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#475569", margin: "0 0 10px 0", borderBottom: "1px solid #cbd5e1" }}>
              Education
            </h2>
            {r.education.map((edu, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <div>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>{edu.school}</strong>
                  <span style={{ fontSize: "12px", color: "#334155" }}> - {edu.degree}</span>
                </div>
                <span style={{ fontSize: "12px", color: "#475569" }}>{edu.period}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {r?.skills?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#475569", margin: "0 0 8px 0", borderBottom: "1px solid #cbd5e1" }}>
              Core Credentials
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", columnGap: "16px", rowGap: "4px" }}>
              {r.skills.map((s, i) => (
                <span key={i} style={{ fontSize: "12px", color: "#334155" }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {r?.projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#475569", margin: "0 0 10px 0", borderBottom: "1px solid #cbd5e1" }}>
              Selected Projects
            </h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "13px", color: "#1e293b" }}>{proj.title}</strong>
                <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#334155", margin: "2px 0 0 0" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 10. DEFAULT / CLASSIC PREMIUM (Two Column Setup)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Centered Classic Header */}
      <div style={{ borderBottom: "2px solid #f97316", paddingBottom: "16px", marginBottom: "8px", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 700, margin: "0 0 8px 0", color: "#111", fontFamily: "'Playfair Display', serif" }}>
          {r?.personalInfo?.fullName || "Your Name"}
        </h1>
        <div style={{ fontSize: "12px", color: "#555", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", fontFamily: "'Arial', sans-serif" }}>
          {r?.personalInfo?.email && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:mail" style={{ fontSize: "12px" }} /> {r.personalInfo.email}</span>}
          {r?.personalInfo?.phone && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:phone" style={{ fontSize: "12px" }} /> {r.personalInfo.phone}</span>}
          {r?.personalInfo?.location && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:map-pin" style={{ fontSize: "12px" }} /> {r.personalInfo.location}</span>}
          {r?.personalInfo?.website && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Icon icon="lucide:globe" style={{ fontSize: "12px" }} /> {r.personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "32px" }}>
        {/* Left Side Column */}
        <div style={{ width: isMobile ? "100%" : "30%", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Education */}
          {r?.education?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f97316", margin: "0 0 12px 0", fontFamily: "'Arial', sans-serif", borderBottom: "1px solid #ddd", paddingBottom: "4px" }}>
                Education
              </h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "12px", color: "#111" }}>{edu.school}</strong>
                  <div style={{ fontSize: "11px", color: "#555", fontStyle: "italic" }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: "#777", marginTop: "2px" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {r?.skills?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f97316", margin: "0 0 12px 0", fontFamily: "'Arial', sans-serif", borderBottom: "1px solid #ddd", paddingBottom: "4px" }}>
                Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ fontSize: "11px", color: "#333", background: "#fdf8f5", padding: "4px 8px", borderRadius: "4px", borderLeft: "2px solid #f97316" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Column */}
        <div style={{ width: isMobile ? "100%" : "70%", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Summary */}
          {r?.summary && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f97316", margin: "0 0 8px 0", fontFamily: "'Arial', sans-serif", borderBottom: "1px solid #ddd", paddingBottom: "4px" }}>
                Summary
              </h2>
              <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#333", margin: 0 }}>
                {r.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {r?.experience?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f97316", margin: "0 0 12px 0", fontFamily: "'Arial', sans-serif", borderBottom: "1px solid #ddd", paddingBottom: "4px" }}>
                Experience
              </h2>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: "13px", color: "#111" }}>{exp.role}</strong>
                    <span style={{ fontSize: "11px", color: "#666", fontFamily: "'Arial', sans-serif" }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#ea580c", fontWeight: 600, marginBottom: "4px" }}>{exp.company}</div>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444", margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {r?.projects?.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f97316", margin: "0 0 12px 0", fontFamily: "'Arial', sans-serif", borderBottom: "1px solid #ddd", paddingBottom: "4px" }}>
                Projects
              </h2>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <strong style={{ fontSize: "13px", color: "#111" }}>{proj.title}</strong>
                  <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444", margin: "4px 0 0 0" }}>{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeResume } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const r = activeResume;

  const handlePrint = () => window.print();
  const collapsedNav = isMobile || isTablet;
  const tStyle = getTemplateStyle(r?.template);

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
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:printer" style={{ fontSize: "14px" }} /> Export PDF</span>
        </button>
        <button onClick={() => navigate("/ats-analysis")}
          style={{ flex: collapsedNav ? "1 1 auto" : "none", width: collapsedNav ? "auto" : "100%", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "8px", padding: "11px 14px", color: "#f97316", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:zap" style={{ fontSize: "14px" }} /> Run ATS Scan</span>
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
            color: tStyle.color, 
            fontFamily: tStyle.fontFamily, 
            padding: isMobile ? "32px 20px" : tStyle.padding, 
            boxSizing: "border-box" 
          }}>
            {renderTemplateContent(r, r?.template, isMobile)}
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
