import { useState, useEffect } from "react";

export default function NarrativeAssistant() {
  const [role, setRole] = useState("Lead Product Engineer");
  const [tone, setTone] = useState("Visionary");
  const [highlight, setHighlight] = useState("Led high-performing teams to architect scalable microservices, scaling platform throughput by 250% and driving $8M in annual recurring revenue.");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");

  const tones = ["Visionary", "Confident", "Metric-Driven", "Humble Builder"];

  const handleGenerate = (e) => {
    e?.preventDefault();
    if (!role || !highlight) return;
    setGenerating(true);
    setDisplayedResult("");
    
    // Simulate AI generation outputs depending on selected tone
    setTimeout(() => {
      let text;
      if (tone === "Visionary") {
        text = `Executive ${role} and pioneering architect of next-generation product ecosystems. Distinguished by a stellar track record of translating complex engineering vectors into high-converting commercial success. Prominently recognized for: ${highlight}. Driven to champion zero-to-one hypergrowth initiatives and lead teams that construct beautiful, reliable software paradigms that stand the test of time.`;
      } else if (tone === "Metric-Driven") {
        text = `Performance-focused ${role} with over a decade of metric-proven success leading digital transformation. Focused on data-driven engineering models and scalable microservices. Key highlight: ${highlight}. Specializes in optimization of product velocities, infrastructure efficiency, and cost reductions across enterprise systems.`;
      } else if (tone === "Confident") {
        text = `Elite ${role} equipped with an aggressive, goal-oriented mindset for designing market-defining systems. A natural catalyst for accelerating team development and optimizing release velocity. Renowned for a major victory: ${highlight}. Poised to spearhead crucial engineering decisions and build robust architectures that outpace all competition.`;
      } else {
        text = `Collaborative ${role} who thrives at the intersection of developer experience, beautiful user interfaces, and robust software engineering practices. Always grounded in active listening and mentorship: ${highlight}. Eager to empower colleagues and solve foundational problems using clean, modular code bases.`;
      }
      
      setResult(text);
      setGenerating(false);
    }, 1800);
  };

  // Live typing effect
  useEffect(() => {
    if (!result) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedResult((prev) => prev + result.charAt(index));
      index++;
      if (index >= result.length) {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [result]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "32px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "white",
      }}
    >
      {/* Form Card */}
      <div
        style={{
          background: "rgba(18, 18, 18, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>✦</span>
          <h2 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>
            Configure Narrative
          </h2>
        </div>

        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Target Role */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Target Professional Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Director of Engineering"
              required
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s",
              }}
            />
          </div>

          {/* Tone Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Narrative Persona Tone
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {tones.map((t) => {
                const isSelected = tone === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    style={{
                      background: isSelected ? "rgba(249, 115, 22, 0.15)" : "rgba(255, 255, 255, 0.03)",
                      border: isSelected ? "1px solid #f97316" : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      padding: "10px",
                      color: isSelected ? "#f97316" : "rgba(255, 255, 255, 0.7)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Major Accomplishment */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Core Metric / Key Victory
            </label>
            <textarea
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="e.g. Spearheaded launch of flagship payments API, processing 40M+ txs and cutting latency by 35%."
              required
              rows={4}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "13px",
                lineHeight: "1.5",
                outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                resize: "none",
                transition: "all 0.2s",
              }}
            />
          </div>

          {/* Submit/Generate Button */}
          <button
            type="submit"
            disabled={generating}
            style={{
              width: "100%",
              background: generating ? "rgba(249, 115, 22, 0.6)" : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 20px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: generating ? "not-allowed" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {generating ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "pulse 1s linear infinite",
                  }}
                />
                Synthesizing Story...
              </>
            ) : (
              "✦ Build Executive Summary"
            )}
          </button>
        </form>
      </div>

      {/* Result Card */}
      <div
        style={{
          background: "rgba(10, 10, 10, 0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 48px rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0) 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Top block */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.35)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Narrative Preview
            </span>
            {result && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#f97316",
                  background: "rgba(249, 115, 22, 0.1)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: 600,
                }}
              >
                Generated
              </span>
            )}
          </div>

          {generating ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "40px" }}>
              <div style={{ width: "80%", height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
              <div style={{ width: "95%", height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
              <div style={{ width: "65%", height: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
            </div>
          ) : displayedResult ? (
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "rgba(255, 255, 255, 0.9)",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              "{displayedResult}"
            </p>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <span style={{ fontSize: "40px", display: "block", marginBottom: "16px" }}>✍️</span>
              <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.4)", lineHeight: "1.6", maxWidth: "280px", margin: "0 auto" }}>
                Fill out the narrative specifications and click build to generate your executive story.
              </p>
            </div>
          )}
        </div>

        {/* Copy / Save bar */}
        {displayedResult && !generating && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "24px",
              marginTop: "24px",
            }}
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert("Executive narrative copied to clipboard!");
              }}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "10px 0",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              📋 Copy to Clipboard
            </button>
            <button
              style={{
                flex: 1,
                background: "rgba(249, 115, 22, 0.1)",
                border: "1px solid rgba(249, 115, 22, 0.25)",
                borderRadius: "10px",
                padding: "10px 0",
                color: "#f97316",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(249, 115, 22, 0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(249, 115, 22, 0.1)")}
            >
              💾 Save to Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
