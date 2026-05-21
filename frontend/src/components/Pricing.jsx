import { FadeIn,SectionTitle } from "./Shared";
import { Icon } from "@iconify/react";

const PLANS = [
  {
    name: "SYMMETRY",
    price: "0",
    period: "Free forever",
    desc: "Secure your entry-level edge. Essential parsing and semantic structure to cleanly present your baseline credentials.",
    features: [
      "AI Resume Analysis",
      "3 Resume Drafts/mo",
      "ATS Optimization Check",
      "Standard PDF Exports",
    ],
    cta: "Select Symmetry",
    highlight: false,
  },
  {
    name: "BALANCE",
    price: "19",
    period: "per month",
    desc: "The sweet spot for high-impact candidates. Complete ATS matching, real-time AI rewrites, and instant multi-format downloads.",
    features: [
      "Unlimited Resume Drafts",
      "Real-time AI Rewrite",
      "Target Role Semantic Fit",
      "Full Markdown & PDF Exports",
      "Multi-format Data Sync",
    ],
    cta: "Try Balance",
    highlight: true,
  },
  {
    name: "ZENITH",
    price: "49",
    period: "per month",
    desc: "The peak of career design. Ingest multiple roles, generate custom covers and bios, and host a stunning professional portfolio.",
    features: [
      "Everything in Balance",
      "ATS Competitive Ranker",
      "Cover Letter & Bio Generator",
      "Professional Web Portfolio",
    ],
    cta: "Select Zenith",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      style={{
        background: "transparent",
        padding: "100px 24px",
        position: "relative",
      }}
    >
      {/* Top divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 800,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle
          label="Investment Plans"
          title="Choose Your Trajectory"
          subtitle="Select the plan that matches your ambitions. Upgrade or downgrade at any time."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                style={{
                  background: plan.highlight
                    ? "linear-gradient(145deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))"
                    : "linear-gradient(145deg, rgba(30,30,30,0.6), rgba(20,20,20,0.4))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: plan.highlight
                    ? "1px solid rgba(249,115,22,0.45)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: plan.highlight
                    ? "0 0 40px rgba(249,115,22,0.07)"
                    : "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "#f97316",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: 100,
                      letterSpacing: "1px",
                      fontFamily: "system-ui",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    POPULAR
                  </div>
                )}

                {/* Plan header */}
                <div style={{ marginBottom: 20 }}>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      fontFamily: "'Inter', sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.name}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        color: "#f97316",
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      $
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 48,
                        fontWeight: 800,
                        fontFamily: "'Playfair Display', serif",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 13,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginTop: 12,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Feature list */}
                <div style={{ marginBottom: 28, flex: 1 }}>
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "rgba(249,115,22,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon icon="lucide:check" style={{ color: "#f97316", fontSize: 9 }} />
                      </div>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.65)",
                          fontSize: 13,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                 <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "all 0.2s",
                    background: plan.highlight ? "#f97316" : "transparent",
                    color: plan.highlight ? "#fff" : "rgba(255,255,255,0.7)",
                    border: plan.highlight
                      ? "none"
                      : "1px solid rgba(255,255,255,0.15)",
                    boxShadow: plan.highlight
                      ? "0 0 20px rgba(249,115,22,0.25)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "0.85";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "none";
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}