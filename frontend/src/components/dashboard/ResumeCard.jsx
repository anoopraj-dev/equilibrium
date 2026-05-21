import { useState } from "react";

export default function ResumeCard({ resume, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(18, 18, 18, 0.6)",
        borderRadius: "16px",
        border: hovered ? "1px solid rgba(249, 115, 22, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0, 0, 0, 0.6), 0 0 16px rgba(249, 115, 22, 0.15)"
          : "0 8px 24px rgba(0, 0, 0, 0.4)",
        padding: "24px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-4px)" : "none",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Visual Doc Thumbnail Mock */}
      <div
        style={{
          width: "100%",
          height: "140px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 100%)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: "42px", opacity: hovered ? 0.9 : 0.6, transition: "opacity 0.2s" }}>📄</span>
        {/* Template Style Stamp */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(249, 115, 22, 0.15)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "6px",
            padding: "2px 8px",
            fontSize: "10px",
            fontWeight: 700,
            color: "#f97316",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {resume.template}
        </div>
      </div>

      {/* Info Block */}
      <div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            margin: 0,
            color: "#fff",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {resume.title}
        </h3>
        <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", margin: "4px 0 0 0" }}>
          Edited {resume.lastModified}
        </p>
      </div>

      {/* Narrative strength indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: 1, height: "4px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "2px" }}>
          <div
            style={{
              height: "100%",
              width: `${resume.strength}%`,
              background: "linear-gradient(90deg, #f97316, #f97316)",
              borderRadius: "2px",
              boxShadow: "0 0 8px rgba(249, 115, 22, 0.5)",
            }}
          />
        </div>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#f97316" }}>{resume.strength}% strength</span>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "8px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          paddingTop: "14px",
        }}
      >
        <button
          onClick={() => onEdit(resume.id)}
          style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            padding: "8px 0",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          }}
        >
          Edit
        </button>

        <button
          style={{
            width: "36px",
            height: "32px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.2s",
          }}
          title="Download PDF"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          }}
        >
          📥
        </button>

        <button
          onClick={() => onDelete(resume.id)}
          style={{
            width: "36px",
            height: "32px",
            background: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.2s",
          }}
          title="Delete Resume"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.15)";
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
