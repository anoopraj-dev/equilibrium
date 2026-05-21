import { useState } from "react";

// ── TOAST COMPONENT ──
export function Toast({ toast, onClose }) {
  return (
    <div
      style={{
        background: toast.type === "error" ? "rgba(239, 68, 68, 0.94)" : "rgba(10, 10, 10, 0.94)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "10px",
        border: toast.type === "error" ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(249, 115, 22, 0.2)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backdropFilter: "blur(12px)",
        animation: "slideIn 0.3s ease",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "13px",
        pointerEvents: "auto",
      }}
    >
      <span style={{ fontWeight: 500 }}>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          fontSize: "14px",
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

// ── MODAL COMPONENT ──
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
          padding: "32px",
          color: "white",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animation: "modalZoom 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ── TABS COMPONENT ──
export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "4px",
        borderRadius: "10px",
        width: "fit-content",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              background: isActive ? "rgba(249, 115, 22, 0.15)" : "transparent",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: isActive ? "#f97316" : "rgba(255, 255, 255, 0.6)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ── ACCORDION COMPONENT ──
export function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.02)",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "16px 20px",
          background: "none",
          border: "none",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "left",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: "12px", opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div style={{ padding: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", background: "rgba(0,0,0,0.25)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── SKELETON LOADER ──
export function SkeletonLoader({ type = "line" }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        animation: "pulseSkeleton 1.5s infinite ease-in-out",
      }}
    >
      <style>{`
        @keyframes pulseSkeleton {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
      {type === "card" ? (
        <div
          style={{
            height: "180px",
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        />
      ) : (
        <>
          <div style={{ width: "40%", height: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "4px" }} />
          <div style={{ width: "90%", height: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
          <div style={{ width: "75%", height: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
        </>
      )}
    </div>
  );
}

// ── EMPTY STATE COMPONENT ──
export function EmptyState({ icon, title, description, actionText, onAction }) {
  return (
    <div
      style={{
        padding: "60px 20px",
        textAlign: "center",
        border: "1px dashed rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        background: "rgba(18, 18, 18, 0.3)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        maxWidth: "420px",
        margin: "0 auto",
      }}
    >
      <span style={{ fontSize: "40px", display: "block", marginBottom: "16px" }}>{icon}</span>
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", margin: "0 0 8px 0" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)", lineHeight: "1.6", margin: "0 0 20px 0" }}>
        {description}
      </p>
      {actionText && (
        <button
          onClick={onAction}
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            fontWeight: 700,
            fontSize: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

// ── ERROR STATE COMPONENT ──
export function ErrorState({ message, onRetry }) {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        borderRadius: "16px",
        background: "rgba(239, 68, 68, 0.03)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>⚠️</span>
      <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#f87171", margin: "0 0 6px 0" }}>An Error Occurred</h4>
      <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", lineHeight: "1.5", margin: "0 0 16px 0" }}>
        {message || "We encountered an issue processing this request."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "6px",
            padding: "6px 14px",
            color: "white",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
        >
          Retry Request
        </button>
      )}
    </div>
  );
}
