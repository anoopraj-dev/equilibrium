import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";

export default function Onboarding() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { isMobile } = useBreakpoint();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Mid-Level");
  const [goal, setGoal] = useState("ATS Matching");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Completed Onboarding
      showToast("Profile customized! Welcome to your career workspace.");
      navigate("/dashboard");
    }
  };

  const seniorityCols = isMobile ? "1fr" : "1fr 1fr";
  const cardPadding = isMobile ? "32px 20px" : "48px 40px";

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>
                What is your target professional role?
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                We'll configure the AI writing assistant for this target space.
              </p>
            </div>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead Robotics Engineer, VP of Sales"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "14px 18px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxSizing: "border-box"
              }}
            />
          </div>
        );

      case 2:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>
                What is your current seniority level?
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                We'll adjust the template tone and complexity parameters.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: seniorityCols, gap: "10px" }}>
              {["Entry-Level", "Mid-Level", "Senior / Lead", "Executive / VP"].map((lvl) => {
                const isActive = experience === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setExperience(lvl)}
                    style={{
                      background: isActive ? "rgba(249, 115, 22, 0.15)" : "rgba(255,255,255,0.02)",
                      border: isActive ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      padding: "16px",
                      color: isActive ? "#f97316" : "rgba(255,255,255,0.6)",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s",
                      boxSizing: "border-box"
                    }}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>
                What is your primary workspace objective?
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                We will pin relevant widgets directly to your dashboard grid.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { title: "ATS Optimization & Matching", desc: "Grade and optimize templates for hiring pipelines.", val: "ATS Matching" },
                { title: "AI Core Summary Writing", desc: "Formulate narrative statements automatically.", val: "AI Writing" },
                { title: "Interview Practice Coaching", desc: "Practice mock behavioral responses with LLM evaluations.", val: "Mock Coaching" },
              ].map((g) => {
                const isActive = goal === g.val;
                return (
                  <button
                    key={g.val}
                    onClick={() => setGoal(g.val)}
                    style={{
                      background: isActive ? "rgba(249, 115, 22, 0.12)" : "rgba(255,255,255,0.02)",
                      border: isActive ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "18px 24px",
                      color: "white",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s",
                      boxSizing: "border-box",
                      width: "100%"
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: 700, color: isActive ? "#f97316" : "#fff", marginBottom: "4px" }}>
                      {g.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{g.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        background: "rgba(10, 10, 10, 0.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
        padding: cardPadding,
        width: "100%",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "white",
        boxSizing: "border-box"
      }}
    >
      {/* Progress Indicators */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "36px" }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: "4px",
              background: s <= step ? "#f97316" : "rgba(255,255,255,0.08)",
              borderRadius: "2px",
              boxShadow: s <= step ? "0 0 8px #f97316" : "none",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* Title block */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", color: "#f97316", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
          STEP {step} OF 3
        </span>
      </div>

      {/* Main Step Render */}
      <div style={{ marginBottom: "40px" }}>{renderStepContent()}</div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          style={{
            background: "transparent",
            border: "none",
            color: step === 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: step === 1 ? "not-allowed" : "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={step === 1 && !role}
          style={{
            background: step === 1 && !role ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: step === 1 && !role ? "rgba(255,255,255,0.3)" : "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: step === 1 && !role ? "not-allowed" : "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: step === 1 && !role ? "none" : "0 4px 14px rgba(249, 115, 22, 0.3)",
            transition: "all 0.2s",
          }}
        >
          {step === 3 ? "Complete Customization ✓" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}
