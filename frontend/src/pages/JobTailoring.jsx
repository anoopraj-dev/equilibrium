import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { SkeletonLoader, EmptyState } from "../components/dashboard/CommonUI";
import { Icon } from "@iconify/react";

export default function JobTailoring() {
  const { showToast, deductAiCredit, activeResume } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTailor = async () => {
    if (!jobTitle || !jobDesc) { showToast("Please fill in the job title and description.", "error"); return; }
    setLoading(true);
    deductAiCredit();
    await new Promise(r => setTimeout(r, 2000));
    setResult({
      tailoredSummary: `Results-driven ${jobTitle} at ${company || "target organization"} with deep expertise in scalable infrastructure engineering and high-velocity product delivery. Recognized for translating complex technical ambiguity into clear execution roadmaps. ${activeResume?.experience?.[0]?.description || ""}`,
      keyChanges: [
        `Role-specific headline aligned to "${jobTitle}" added to top of document.`,
        `Company culture keywords for "${company || "the target company"}" integrated into summary section.`,
        "3 experience bullets rewritten to mirror job description action verbs.",
        "Skills section reordered to prioritize top-matching qualifications.",
      ],
      matchScore: 89
    });
    setLoading(false);
    showToast("Resume tailored to target role.");
  };

  const gridCols = isMobile || isTablet ? "1fr" : "1fr 1.2fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>Job-Specific Tailoring</h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>AI rewrites your resume bullets, summary, and skills ranking specifically for a target role.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "32px" }}>
        {/* Input */}
        <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Target Role Configuration</h3>
          {[
            { label: "JOB TITLE", val: jobTitle, set: setJobTitle, placeholder: "e.g. Senior Engineering Manager" },
            { label: "COMPANY NAME", val: company, set: setCompany, placeholder: "e.g. Stripe, Notion, OpenAI" }
          ].map(f => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>{f.label}</label>
              <input type="text" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "11px 14px", color: "white", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>JOB DESCRIPTION</label>
            <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Paste the full job posting here..." rows={8}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "11px 14px", color: "white", fontSize: "13px", lineHeight: "1.6", outline: "none", resize: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <button onClick={handleTailor} disabled={loading}
            style={{ background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "12px", padding: "14px", fontWeight: 700, fontSize: "13px", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.25)", transition: "all 0.2s" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Icon icon={loading ? "lucide:loader" : "lucide:sparkles"} style={{ fontSize: "15px", animation: loading ? "spin 1s linear infinite" : "none" }} />
              {loading ? "Tailoring Document..." : "Tailor My Resume"}
            </span>
          </button>
        </div>

        {/* Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading && <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px" }}><SkeletonLoader /></div>}
          {!loading && !result && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "200px" }}><EmptyState icon="lucide:target" title="Configure Your Target Role" description="Set the job title and description on the left, then hit Tailor to receive an AI-rewritten version." /></div>}
          {result && !loading && (
            <>
              <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Tailored Executive Summary</h3>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "4px 10px", borderRadius: "20px" }}>{result.matchScore}% Match</span>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", fontFamily: "'Playfair Display', serif", fontStyle: "italic", margin: 0 }}>"{result.tailoredSummary}"</p>
                <button onClick={() => { navigator.clipboard.writeText(result.tailoredSummary); showToast("Tailored summary copied."); }}
                  style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 16px", color: "white", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Icon icon="lucide:clipboard" style={{ fontSize: "13px" }} /> Copy Summary
                </button>
              </div>
              <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Key Changes Made</h3>
                {result.keyChanges.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "#f97316", display: "inline-flex", marginTop: "2px" }}><Icon icon="lucide:sparkles" style={{ fontSize: "13px" }} /></span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.5" }}>{c}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
