import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useBreakpoint } from "../hooks/useIsMobile";
import { Tabs } from "../components/dashboard/CommonUI";
import { Icon } from "@iconify/react";

export default function Settings() {
  const { settings, setSettings, showToast, user } = useApp();
  const { isMobile, isTablet } = useBreakpoint();
  const [activeSubTab, setActiveSubTab] = useState("general");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "Elon Musk",
    email: user?.email || "elon@spacex.com",
    apiKey: settings.apiIntegrationKey,
    targetAts: settings.atsTargetScore,
    modelTone: "Visionary"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSettings((prev) => ({
      ...prev,
      atsTargetScore: Number(formData.targetAts),
      apiIntegrationKey: formData.apiKey,
    }));
    showToast("Configuration parameters updated successfully.");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(formData.apiKey);
    setCopied(true);
    showToast("API Integration key copied.");
    setTimeout(() => setCopied(false), 2000);
  };

  const subTabs = [
    { id: "general", label: "General Workspace" },
    { id: "ai", label: "AI & Connection Parameters" },
    { id: "billing", label: "Billing & Plans" }
  ];

  const cardPadding = isMobile ? "20px" : "32px";
  const profileCols = isMobile ? "1fr" : "1fr 1fr";
  const apiKeyLayout = isMobile ? "column" : "row";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "800px" }}>
      {/* Settings Sub Tabs Bar */}
      <Tabs tabs={subTabs} activeTab={activeSubTab} onChange={setActiveSubTab} />

      {activeSubTab === "general" && (
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Profile Core */}
          <div
            style={{
              background: "rgba(18, 18, 18, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: cardPadding,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>
              Profile Constants
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: profileCols, gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>ACCOUNT NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>PRIMARY EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  style={{
                    background: "rgba(255, 255, 255, 0.01)",
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    cursor: "not-allowed",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              alignSelf: isMobile ? "stretch" : "flex-start",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)"
            }}
          >
            Save General Changes
          </button>
        </form>
      )}

      {activeSubTab === "ai" && (
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* AI Connections Parameters */}
          <div
            style={{
              background: "rgba(18, 18, 18, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: cardPadding,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>
              AI Integration Settings
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Target ATS Score */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>TARGET ATS MATCH RATE (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={formData.targetAts}
                  onChange={(e) => setFormData({ ...formData, targetAts: e.target.value })}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    width: isMobile ? "100%" : "120px"
                  }}
                />
              </div>

              {/* Developer API Key */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
                <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>WORKSPACE API INTEGRATION KEY</label>
                <div style={{ display: "flex", gap: "12px", flexDirection: apiKeyLayout }}>
                  <input
                    type="password"
                    value={formData.apiKey}
                    readOnly
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "13px",
                      flex: 1,
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      padding: "12px 18px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {copied ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        Copied <Icon icon="lucide:check" style={{ fontSize: "13px" }} />
                      </span>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                  Use this key to fetch your structured narratives programmatically into external platforms.
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              alignSelf: isMobile ? "stretch" : "flex-start",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)"
            }}
          >
            Save Connection Settings
          </button>
        </form>
      )}

      {activeSubTab === "billing" && (
        <div
          style={{
            background: "rgba(18, 18, 18, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: cardPadding,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 4px 0" }}>
                Active Plan Details
              </h3>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                Next billing date: June 21, 2026 ($19.00/mo)
              </p>
            </div>
            <span
              style={{
                background: "rgba(249, 115, 22, 0.15)",
                color: "#f97316",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                border: "1px solid rgba(249, 115, 22, 0.3)"
              }}
            >
              Premium Elite
            </span>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "12px" }}>AI Credit Consumption</h4>
            <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", marginBottom: "8px" }}>
              <div
                style={{
                  height: "100%",
                  width: "42%",
                  background: "linear-gradient(90deg, #f97316, #ea580c)",
                  borderRadius: "4px"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
              <span>42 credits consumed</span>
              <span>100 monthly limit</span>
            </div>
          </div>

          <button
            onClick={() => showToast("Subscription portal loaded in background.", "success")}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              padding: "12px 20px",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              alignSelf: isMobile ? "stretch" : "flex-start",
              textAlign: "center",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
          >
            Manage Billing & Subscriptions
          </button>
        </div>
      )}
    </div>
  );
}
