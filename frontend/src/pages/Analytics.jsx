import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Icon } from "@iconify/react";

export default function Analytics() {
  const { resumes, aiUsage } = useApp();
  const { isMobile, isTablet } = useBreakpoint();

  const avgStrength = resumes.length
    ? Math.round(resumes.reduce((s, r) => s + r.strength, 0) / resumes.length)
    : 0;

  const weeklyActivity = [
    { day: "Mon", actions: 4 }, { day: "Tue", actions: 7 }, { day: "Wed", actions: 3 },
    { day: "Thu", actions: 9 }, { day: "Fri", actions: 6 }, { day: "Sat", actions: 2 }, { day: "Sun", actions: 5 },
  ];
  const maxActivity = Math.max(...weeklyActivity.map(d => d.actions));

  const topStats = [
    { label: "Total Resumes", value: resumes.length, sub: "active drafts", icon: "lucide:file-text" },
    { label: "Avg. ATS Strength", value: `${avgStrength}%`, sub: "across all documents", icon: "lucide:zap" },
    { label: "AI Credits Used", value: `${aiUsage.monthlyCreditsUsed}/${aiUsage.monthlyCreditsLimit}`, sub: "this month", icon: "lucide:sparkles" },
    { label: "Profile Views", value: "1,240", sub: "+14% this month", icon: "lucide:eye" },
  ];

  const card = { background: "rgba(18,18,18,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: isMobile ? "16px" : "24px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" };

  const statsCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";
  const layoutsCols = isMobile || isTablet ? "1fr" : "1.4fr 1fr";
  const bottomCols = isMobile || isTablet ? "1fr" : "1fr 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "32px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px 0" }}>Career Analytics</h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Track your resume performance, AI usage, and career progression metrics.</p>
      </div>

      {/* Top Stats */}
      <div style={{ display: "grid", gridTemplateColumns: statsCols, gap: isMobile ? "12px" : "20px" }}>
        {topStats.map((s, i) => (
          <div key={i} style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
              <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "8px 0 4px", color: "white" }}>{s.value}</h3>
              <span style={{ fontSize: "11px", color: "#f97316" }}>{s.sub}</span>
            </div>
            <Icon icon={s.icon} style={{ fontSize: "28px", color: "#f97316", opacity: 0.8 }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: layoutsCols, gap: "24px" }}>
        {/* Weekly Activity Chart */}
        <div style={{ ...card }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 24px 0" }}>Weekly Activity</h3>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: isMobile ? "6px" : "12px", height: "160px" }}>
            {weeklyActivity.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(d.actions / maxActivity) * 100}%`, background: "linear-gradient(180deg, #f97316 0%, #ea580c 100%)", borderRadius: "6px 6px 0 0", transition: "height 0.3s", boxShadow: "0 0 12px rgba(249,115,22,0.3)", minHeight: "8px" }} />
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Strength Breakdown */}
        <div style={{ ...card }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 20px 0" }}>Resume Strength</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {resumes.map((r, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>{r.title}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: r.strength >= 90 ? "#22c55e" : r.strength >= 75 ? "#f97316" : "#ef4444" }}>{r.strength}%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ height: "100%", width: `${r.strength}%`, background: r.strength >= 90 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#f97316,#ea580c)", borderRadius: "3px", transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
            {resumes.length === 0 && <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>No resumes yet.</p>}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: bottomCols, gap: "24px" }}>
        {/* AI Credit Usage */}
        <div style={{ ...card }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 20px 0" }}>AI Credit Usage</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
            {/* Donut visual */}
            <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: "80px", height: "80px", transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f97316" strokeWidth="3"
                  strokeDasharray={`${(aiUsage.monthlyCreditsUsed / aiUsage.monthlyCreditsLimit) * 100} 100`} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "white" }}>
                {Math.round((aiUsage.monthlyCreditsUsed / aiUsage.monthlyCreditsLimit) * 100)}%
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "white" }}>{aiUsage.monthlyCreditsUsed}<span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/{aiUsage.monthlyCreditsLimit}</span></span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>credits consumed this month</span>
              <span style={{ fontSize: "11px", color: "#f97316", fontWeight: 600 }}>{aiUsage.monthlyCreditsLimit - aiUsage.monthlyCreditsUsed} remaining</span>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div style={{ ...card }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 20px 0" }}>Career Insights</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "lucide:target", text: "ATS score exceeds 90% threshold on 2 of your resumes." },
              { icon: "lucide:trending-up", text: "Profile views increased 14% compared to last month." },
              { icon: "lucide:sparkles", text: "AI writing credits are 42% consumed — consider upgrading before reset." },
              { icon: "lucide:lightbulb", text: "Add certifications to boost your weakest resume by ~8%." },
            ].map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ display: "inline-flex", marginTop: "2px", color: "#f97316" }}>
                  <Icon icon={ins.icon} style={{ fontSize: "16px" }} />
                </span>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: "1.5", margin: 0 }}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
