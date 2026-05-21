export default function DashboardHeader({ activeTab, onQuickAction }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const getTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview";
      case "resumes":
        return "My Resumes";
      case "narrative":
        return "AI Narrative Assistant";
      case "profile":
        return "My Profile";
      case "settings":
        return "Account Settings";
      default:
        return "Equilibrium Hub";
    }
  };

  return (
    <header
      style={{
        height: "80px",
        background: "rgba(10, 10, 10, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        position: "sticky",
        top: 0,
        zIndex: 40,
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Title / Greeting Block */}
      <div>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: "white",
            margin: 0,
          }}
        >
          {getTitle()}
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", margin: "4px 0 0 0" }}>
          {greeting}, Elon. Let's shape your executive story today.
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Notification Bell */}
        <button
          style={{
            width: "40px",
            height: "40px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)")}
        >
          <span style={{ fontSize: "16px" }}>🔔</span>
          {/* Notification Dot */}
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "6px",
              height: "6px",
              background: "#f97316",
              borderRadius: "50%",
              boxShadow: "0 0 8px #f97316",
            }}
          />
        </button>

        {/* Quick Action Callout */}
        <button
          onClick={onQuickAction}
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "0.2px",
            boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(249, 115, 22, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(249, 115, 22, 0.3)";
          }}
        >
          <span>✦</span> Generate Narrative
        </button>
      </div>
    </header>
  );
}
