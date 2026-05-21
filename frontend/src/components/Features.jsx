import { SectionTitle, FadeIn } from "./Shared";
import { Icon } from "@iconify/react";

const FEATURES = [
  {
    icon: "lucide:brain-circuit",
    title: "Algorithmic Profiling",
    desc: "Ingest your digital footprint. Our engine decodes LinkedIn profiles, GitHub commits, and career transcripts to build a structurally flawless profile mapping your true engineering worth.",
  },
  {
    icon: "lucide:flask-conical",
    title: "Empirical Synthesis",
    desc: "Write resumes that win. Equilibrium transforms raw experience into persuasive, result-driven metrics that appeal directly to executive-level decision makers.",
  },
];

export default function Features() {
  return (
    <section
      style={{
        background: "transparent",
        padding: "100px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle
          label="ENGINEERED CONVERSION"
          title="Craft an Undeniable Narrative"
          subtitle="Your accomplishments deserve more than a simple list of bullet points. Our compiler extracts, refines, and balances your career milestones to command immediate authority."
        />

        {/* Two-column feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.15}>
              <div
                style={{
                  background:
                    "linear-gradient(145deg, rgba(30,30,30,0.6), rgba(20,20,20,0.4))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(249,115,22,0.15)",
                  borderRadius: 16,
                  padding: 32,
                  transition: "all 0.3s",
                  cursor: "default",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(249,115,22,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    color: "#f97316",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  <Icon icon={f.icon} style={{ fontSize: 24 }} />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 10,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    marginBottom: 20,
                  }}
                >
                  {f.desc}
                </p>
                 <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      background: "#f97316",
                      color: "#fff",
                      border: "none",
                      borderRadius: 7,
                      padding: "8px 16px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#ea580c")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#f97316")
                    }
                  >
                    Explore
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 7,
                      padding: "8px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Market Deployment wide card */}
        <FadeIn delay={0.2}>
          <div
            style={{
              marginTop: 24,
              background:
                "linear-gradient(145deg, rgba(30,30,30,0.6), rgba(20,20,20,0.4))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(249,115,22,0.15)",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 32,
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(249,115,22,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f97316",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  <Icon icon="lucide:scan-search" style={{ fontSize: 20 }} />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  ATS Semantic Alignment
                </h3>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  maxWidth: 500,
                }}
              >
                Bridge the keyword gap. Our neural matching engine scans your target job description and balances your resume's keyword distribution to achieve up to a 98% compatibility score without compromising authenticity.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {[
                  "Real-time ATS Scanning",
                  "PDF/JSON Resume Exports",
                  "Keyword Density Control",
                  "Modern Markdown Output",
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 13,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Icon icon="lucide:check" style={{ color: "#f97316", fontSize: 13 }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Donut chart */}
            <div
              className="hide-mobile"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                minWidth: 140,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(#f97316 0% 72%, rgba(249,115,22,0.12) 72% 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 30px rgba(249,115,22,0.15)",
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "#111",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#f97316",
                      fontWeight: 800,
                      fontSize: 22,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    98%
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 10,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    ATS Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}