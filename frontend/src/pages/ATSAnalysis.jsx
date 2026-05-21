import { useState } from "react";
import { atsService } from "../services/atsService";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { SkeletonLoader, ErrorState, EmptyState, Tabs } from "../components/dashboard/CommonUI";
import { Icon } from "@iconify/react";

export default function ATSAnalysis() {
  const { showToast, deductAiCredit, activeResume } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("keywords");

  const handleScan = async () => {
    if (!jobDescription.trim()) {
      showToast("Please paste a job description before scanning.", "error");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      deductAiCredit();
      const data = await atsService.scanResumeAgainstJob(activeResume?.summary || "", jobDescription);
      setResult(data);
      showToast("ATS scan complete.");
    } catch (e) {
      setError("ATS scan failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) => (s >= 80 ? "#22c55e" : s >= 60 ? "#f97316" : "#ef4444");

  const mainGridCols = isMobile || isTablet ? "1fr" : "1fr 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>ATS Optimization Scanner</h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Paste a target job description to instantly grade your resume against employer parsing algorithms.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mainGridCols, gap: "32px" }}>
        {/* Input Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here. Our parser will extract all required keywords, skills, and role qualifications..."
              rows={12}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", color: "white", fontSize: "13px", lineHeight: "1.6", outline: "none", resize: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <button
              onClick={handleScan}
              disabled={loading}
              style={{ background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "12px", padding: "14px", fontWeight: 700, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.3)", transition: "all 0.2s" }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Icon icon={loading ? "lucide:loader" : "lucide:zap"} style={{ fontSize: "16px", animation: loading ? "spin 1s linear infinite" : "none" }} />
                {loading ? "Scanning Resume..." : "Run ATS Scan"}
              </span>
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading && (
            <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px" }}>
              <SkeletonLoader type="line" />
            </div>
          )}

          {error && <ErrorState message={error} onRetry={handleScan} />}

          {!loading && !result && !error && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
              <EmptyState icon="lucide:target" title="Ready to Scan" description="Paste a job description on the left and hit Run ATS Scan to get a comprehensive keyword breakdown." />
            </div>
          )}

          {result && !loading && (
            <>
              {/* Score Card */}
              <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", alignItems: "center", gap: "20px", flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: `4px solid ${scoreColor(result.score)}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: `0 0 20px ${scoreColor(result.score)}40`, flexShrink: 0 }}>
                  <span style={{ fontSize: "24px", fontWeight: 800, color: scoreColor(result.score) }}>{result.score}</span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>/ 100</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>ATS Compatibility Score</h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "0 0 8px 0" }}>Readability: <span style={{ color: "#22c55e", fontWeight: 600 }}>{result.readability}</span></p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: 0 }}>Grammar Errors: {result.grammarErrors}</p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs tabs={[{ id: "keywords", label: "Keyword Match" }, { id: "missing", label: "Missing Skills" }, { id: "tips", label: "Optimization Tips" }]} activeTab={activeTab} onChange={setActiveTab} />

              {/* Tab Content */}
              <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {activeTab === "keywords" && result.keywordsAnalysis.map((k, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: k.found ? "#22c55e" : "#ef4444", display: "inline-flex" }}><Icon icon={k.found ? "lucide:check" : "lucide:x"} style={{ fontSize: "14px" }} /></span>
                      <span style={{ fontSize: "14px", color: k.found ? "white" : "rgba(255,255,255,0.4)" }}>{k.keyword}</span>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {k.found && <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>×{k.count}</span>}
                      <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", background: k.importance === "High" ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)", color: k.importance === "High" ? "#f97316" : "rgba(255,255,255,0.4)", fontWeight: 700 }}>{k.importance}</span>
                    </div>
                  </div>
                ))}

                {activeTab === "missing" && result.missingSkills.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "10px" }}>
                    <span style={{ color: "#ef4444", display: "inline-flex" }}><Icon icon="lucide:alert-triangle" style={{ fontSize: "15px" }} /></span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{s}</span>
                  </div>
                ))}

                {activeTab === "tips" && result.suggestions.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "12px 16px", background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.12)", borderRadius: "10px" }}>
                    <span style={{ color: "#f97316", display: "inline-flex", marginTop: "2px" }}><Icon icon="lucide:sparkles" style={{ fontSize: "14px" }} /></span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>{s}</span>
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
