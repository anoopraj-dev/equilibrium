import { useInView } from "../hooks/useInView";


export default function CTA() {
  const [ref, inView] = useInView();

  return (
    <section
      style={{
        background: "transparent",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 80vw)",
          height: "min(700px, 80vw)",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-2px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: 16,
          }}
        >
          Ready to Dominate
          <br />
          The Market?
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            lineHeight: 1.7,
            marginBottom: 40,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Join the top 1% of candidates who secure immediate interviews using automated semantic perfection. Build your signature resume today.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
          }}
        >
          <button
            style={{
              background: "#f97316",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 0 28px rgba(249,115,22,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ea580c";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f97316";
              e.target.style.transform = "none";
            }}
          >
            Build Your Resume
          </button>
          <button
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 10,
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(249,115,22,0.5)";
              e.target.style.color = "#f97316";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "#fff";
            }}
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}