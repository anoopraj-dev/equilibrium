import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function InterviewPrep() {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setSubscribed(true);
    showToast("You've been added to the early access list! 🚀");
  };

  const features = [
    { icon: "🎤", title: "Real-Time STAR Evaluation", desc: "Speak or type your answers and get graded instantly based on Situation, Task, Action, and Result framework." },
    { icon: "🎭", title: "Persona-Based Mock Interviewers", desc: "Select custom personas—from friendly startup peers to high-intensity FAANG technical hiring leads." },
    { icon: "📈", title: "Behavioral Analytics & Scoring", desc: "Track progress across multiple sessions with detailed heatmaps identifying your delivery weaknesses." },
  ];

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "40px 20px", 
      textAlign: "center",
      minHeight: "70vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>
      {/* Visual Indicator */}
      <div style={{
        position: "relative",
        marginBottom: "24px"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.1)",
          border: "1px solid rgba(249, 115, 22, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          animation: "pulse 2s infinite"
        }}>
          🎤
        </div>
        <div style={{
          position: "absolute",
          top: 0,
          right: -8,
          background: "linear-gradient(135deg,#f97316,#ea580c)",
          color: "white",
          fontSize: "10px",
          fontWeight: 800,
          padding: "3px 8px",
          borderRadius: "20px",
          letterSpacing: "0.5px"
        }}>
          BETA
        </div>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(249, 115, 22, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
          }
        `}</style>
      </div>

      {/* Hero text */}
      <h2 style={{ 
        fontSize: "32px", 
        fontWeight: 800, 
        fontFamily: "'Playfair Display', serif", 
        margin: "0 0 12px 0", 
        color: "white",
        background: "linear-gradient(to right, #fff, rgba(255,255,255,0.7))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        AI Interview Coach
      </h2>
      
      <div style={{
        background: "rgba(249,115,22,0.1)",
        color: "#f97316",
        border: "1px solid rgba(249,115,22,0.2)",
        borderRadius: "20px",
        padding: "4px 12px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginBottom: "20px"
      }}>
        Coming Soon
      </div>

      <p style={{ 
        fontSize: "15px", 
        color: "rgba(255,255,255,0.45)", 
        maxWidth: "540px", 
        lineHeight: "1.6", 
        margin: "0 0 36px 0" 
      }}>
        Practice mock behavioral and technical sessions with custom AI interviewers and receive real-time metrics on your STAR structure, pacing, and vocabulary.
      </p>

      {/* Subscription Card */}
      <div style={{
        background: "rgba(18,18,18,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "32px",
        maxWidth: "480px",
        width: "100%",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        boxSizing: "border-box",
        marginBottom: "48px"
      }}>
        {subscribed ? (
          <div style={{ color: "#22c55e", fontWeight: 600, fontSize: "14px" }}>
            🎉 You are on the list! We will notify you as soon as early access begins.
          </div>
        ) : (
          <form onSubmit={handleNotify} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "left" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 6px 0", color: "white" }}>Get Early Access</h4>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Be the first to know when the Interactive Coach launches.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{ 
                  flex: 1,
                  minWidth: "200px",
                  background: "rgba(255,255,255,0.03)", 
                  border: "1px solid rgba(255,255,255,0.08)", 
                  borderRadius: "10px", 
                  padding: "12px 16px", 
                  color: "white", 
                  fontSize: "13px", 
                  outline: "none" 
                }} 
              />
              <button 
                type="submit"
                style={{ 
                  background: "linear-gradient(135deg,#f97316,#ea580c)", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "10px", 
                  padding: "12px 24px", 
                  fontWeight: 700, 
                  fontSize: "13px", 
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(249,115,22,0.25)",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Notify Me
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Preview Features List */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        maxWidth: "960px",
        width: "100%",
        textAlign: "left"
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <span style={{ fontSize: "28px" }}>{f.icon}</span>
            <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "white" }}>{f.title}</h4>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
