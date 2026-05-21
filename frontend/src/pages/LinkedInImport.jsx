import { useState } from "react";
import { linkedinService } from "../services/linkedinService";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";

export default function LinkedInImport() {
  const { showToast, updateActiveResume, activeResume } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [file, setFile] = useState(null);

  const handleOAuth = async () => {
    setLoading(true);
    await linkedinService.initiateOAuth();
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep(2); // Skip upload, go to preview
    setLoading(true);
    const data = await linkedinService.importProfileData("mock_code");
    setExtracted(data);
    setLoading(false);
    setStep(2);
  };

  const handleFileUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const data = await linkedinService.importProfileData("file_upload");
    setExtracted(data);
    setLoading(false);
    setStep(2);
  };

  const handleConfirm = () => {
    if (!extracted) return;
    updateActiveResume({ ...activeResume, ...extracted });
    showToast("LinkedIn profile imported successfully into your active resume.");
    setStep(3);
  };

  const gridCols = isMobile || isTablet ? "1fr" : "1fr 1fr";
  const stepsLayout = isMobile ? "column" : "row";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "800px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>LinkedIn Profile Import</h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Automatically populate your resume from LinkedIn or upload a PDF for instant extraction.</p>
      </div>

      {/* Progress Steps */}
      <div style={{ display: "flex", gap: "16px", alignItems: isMobile ? "flex-start" : "center", flexDirection: stepsLayout }}>
        {["Connect", "Upload / Auth", "Preview Data", "Confirmed"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, width: "100%" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: i <= step ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(255,255,255,0.06)", border: i <= step ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: i <= step ? "white" : "rgba(255,255,255,0.3)", boxShadow: i <= step ? "0 0 12px rgba(249,115,22,0.3)" : "none", flexShrink: 0 }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "11px", color: i <= step ? "#f97316" : "rgba(255,255,255,0.3)", fontWeight: 600, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {!isMobile && i < 3 && <div style={{ flex: 1, height: "2px", background: i < step ? "#f97316" : "rgba(255,255,255,0.06)", margin: "0 8px", marginBottom: "0" }} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 0 && (
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "24px" }}>
          {/* OAuth Card */}
          <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "24px" : "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", background: "#0077B5", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>in</div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0" }}>Connect LinkedIn</h3>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5", margin: 0 }}>Authorize Equilibrium to securely read your profile, experience, and skills.</p>
            </div>
            <button onClick={handleOAuth} style={{ width: "100%", background: "#0077B5", color: "white", border: "none", borderRadius: "10px", padding: "13px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
              Connect with LinkedIn
            </button>
          </div>

          {/* PDF Upload Card */}
          <div style={{ background: "rgba(18,18,18,0.6)", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: "20px", padding: isMobile ? "24px" : "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>📄</div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0" }}>Upload Resume PDF</h3>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5", margin: 0 }}>Upload any existing resume and our AI will extract and structure your data.</p>
            </div>
            <label style={{ width: "100%", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316", borderRadius: "10px", padding: "13px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "block", textAlign: "center" }}>
              {file ? file.name : "Choose PDF File"}
              <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: "none" }} />
            </label>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "48px", height: "48px", border: "3px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>Extracting profile data...</p>
        </div>
      )}

      {/* Preview */}
      {step === 2 && extracted && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "20px" : "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>Extracted Profile Data</h3>
            {[
              { label: "Full Name", val: extracted.personalInfo.fullName },
              { label: "Email", val: extracted.personalInfo.email },
              { label: "Location", val: extracted.personalInfo.location },
              { label: "Summary", val: extracted.summary },
              { label: "Skills", val: extracted.skills?.join(", ") },
              { label: "Experience", val: `${extracted.experience?.length} role(s) detected` },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", gap: "16px", flexDirection: isMobile ? "column" : "row" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 700, minWidth: "100px", paddingTop: "2px" }}>{f.label}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{f.val}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Restart</button>
            <button onClick={handleConfirm} style={{ flex: 2, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white", border: "none", borderRadius: "10px", padding: "13px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.3)" }}>✓ Confirm & Import to Resume</button>
          </div>
        </div>
      )}

      {/* Success */}
      {step === 3 && (
        <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>✅</span>
          <h3 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#22c55e", margin: "0 0 8px 0" }}>Import Successful</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "0 0 24px 0" }}>Your LinkedIn profile data has been imported into your active resume draft.</p>
          <button onClick={() => setStep(0)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 20px", color: "white", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Import Another</button>
        </div>
      )}
    </div>
  );
}
