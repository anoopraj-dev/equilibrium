import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Accordion } from "../components/dashboard/CommonUI";

export default function PricingPage() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();

  const plans = [
    {
      name: "Starter Pilot",
      price: "$0",
      period: "forever",
      desc: "Perfect for drafting your initial resume and testing AI features.",
      features: [
        "1 Active Resume Draft",
        "10 AI Assist Credits/mo",
        "Standard Templates",
        "Basic PDF Download"
      ],
      action: "Get Started Free",
      popular: false,
      tier: "Free"
    },
    {
      name: "Premium Elite",
      price: "$19",
      period: "monthly",
      desc: "For serious job seekers demanding top-tier ATS scores and infinite summaries.",
      features: [
        "Unlimited Active Resumes",
        "Unlimited AI Writing Credits",
        "All Premium executive templates",
        "High-performance ATS Scans",
        "AI Interview Mock Coaching",
        "1-Click LinkedIn Import"
      ],
      action: "Upgrade to Elite",
      popular: true,
      tier: "Premium"
    },
    {
      name: "Corporate Nexus",
      price: "$49",
      period: "monthly",
      desc: "Full bespoke integration for professional headhunters and multi-brand scaling.",
      features: [
        "Everything in Premium Elite",
        "Team Dashboard (up to 5 members)",
        "Bespoke branding styling overrides",
        "Custom API integration hooks",
        "Dedicated account strategist"
      ],
      action: "Contact Sales",
      popular: false,
      tier: "Enterprise"
    }
  ];

  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

  return (
    <div
      style={{
        background: "#050505",
        color: "white",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: isMobile ? "60px 16px 60px" : "100px 24px 80px",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <span style={{ color: "#f97316", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            PRICING SCHEMAS
          </span>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              margin: "12px 0 20px 0",
              background: "linear-gradient(to right, #fff, rgba(255,255,255,0.4))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Invest in Your Story
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "580px", margin: "0 auto", lineHeight: "1.6" }}>
            Unleash applicant tracking superiority, bespoke artificial intelligence summaries, and modular resume styles. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "24px", marginBottom: "60px" }}>
          {plans.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(12, 12, 12, 0.6)",
                border: p.popular ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: isMobile ? "24px" : "40px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: p.popular
                  ? "0 20px 48px rgba(249, 115, 22, 0.08), 0 0 24px rgba(249, 115, 22, 0.05)"
                  : "0 12px 32px rgba(0, 0, 0, 0.4)",
              }}
            >
              {p.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    color: "white",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 10px rgba(249, 115, 22, 0.3)",
                  }}
                >
                  Most Popular
                </span>
              )}

              {/* Title */}
              <h3 style={{ fontSize: "19px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 8px 0" }}>
                {p.name}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", minHeight: "38px", margin: "0 0 24px 0", lineHeight: "1.5" }}>
                {p.desc}
              </p>

              {/* Rate */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "24px" }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "white" }}>{p.price}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>/ {p.period}</span>
              </div>

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, marginBottom: "32px" }}>
                {p.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: "#f97316", fontWeight: 700, fontSize: "14px" }}>✓</span>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  alert(`Navigating to payment portal for plan: ${p.name}`);
                  navigate("/dashboard");
                }}
                style={{
                  width: "100%",
                  background: p.popular ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" : "rgba(255, 255, 255, 0.04)",
                  color: "white",
                  border: p.popular ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "14px 0",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: p.popular ? "0 4px 14px rgba(249, 115, 22, 0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (p.popular) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  } else {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (p.popular) {
                    e.currentTarget.style.transform = "none";
                  } else {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }
                }}
              >
                {p.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", textAlign: "center", marginBottom: "32px" }}>
            Frequently Answered Concerns
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Accordion title="How exactly does the ATS Scanning utility grade my document?">
              Our system parses your uploaded structural layout or written builder blocks against standard employer parsing rules. We scan for keyword match frequency, document readability, structural column errors, and missing specialized skills to return an actionable score card.
            </Accordion>
            <Accordion title="Can I import multiple historical roles directly from LinkedIn?">
              Absolutely! Our OAuth link reads and structures your history, education, skills, and accomplishments within seconds to create a fully customizable Equilibrium draft automatically.
            </Accordion>
            <Accordion title="Are there any hidden recurring fees or cancel charges?">
              None. You can cancel your Premium tier at any time from your settings panel. Your data remains safe, and you will retain access until the end of your billing cycle.
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
