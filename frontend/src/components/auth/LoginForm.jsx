import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate successful login and redirect to dashboard
    setTimeout(() => {
      setIsSubmitting(true); // Keep spinner on momentarily
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div
      className="auth-card"
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "460px",
        width: "100%",
        background: "rgba(10, 10, 10, 0.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.12)",
        animation: "floatCard 6s ease-in-out infinite",
      }}
    >
      <style>{`
        .auth-card {
          padding: 48px 40px;
        }
        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>

      {/* Logo and Brand */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 0 14px rgba(249,115,22,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            <Icon icon="lucide:sparkles" style={{ fontSize: "14px", color: "white" }} />
          </div>
          <span
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "20px",
              letterSpacing: "-0.5px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Equili<span style={{ color: "#f97316" }}>brium</span>
          </span>
        </div>

        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: "#fff",
            marginBottom: "8px",
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.5)",
            lineHeight: 1.5,
          }}
        >
          Access your high-converting career hub and resume builder.
        </p>
      </div>

      {/* Google Authentication Button */}
      <button
        onClick={() => {
          // Simulated google login
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            navigate("/dashboard");
          }, 1200);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "12px 16px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.transform = "none";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "24px 0",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1px" }}>
          or with email
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Email Address */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="elon@spacex.com"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              border: focusedField === "email" ? "1px solid #f97316" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              padding: "12px 16px",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.2s",
              boxShadow: focusedField === "email" ? "0 0 12px rgba(249, 115, 22, 0.2)" : "none",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Password
            </label>
            <a href="#" style={{ fontSize: "12px", color: "#fb923c", textDecoration: "none" }} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")}>
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            required
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.03)",
              border: focusedField === "password" ? "1px solid #f97316" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              padding: "12px 16px",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.2s",
              boxShadow: focusedField === "password" ? "0 0 12px rgba(249, 115, 22, 0.2)" : "none",
            }}
          />
        </div>

        {/* Remember Me */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={{
              accentColor: "#f97316",
              cursor: "pointer",
              width: "15px",
              height: "15px",
            }}
          />
          <label htmlFor="rememberMe" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", cursor: "pointer", userSelect: "none" }}>
            Keep me logged in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            background: isSubmitting ? "rgba(249, 115, 22, 0.6)" : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "14px 20px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: "0 4px 20px rgba(249, 115, 22, 0.35)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(249, 115, 22, 0.45)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(249, 115, 22, 0.35)";
            }
          }}
        >
          {isSubmitting ? (
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
              Entering Account...
            </>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Icon icon="lucide:log-in" style={{ fontSize: "14px" }} /> Access Account</span>
          )}
        </button>
      </form>

      {/* Form Footer */}
      <div style={{ textAlignment: "center", marginTop: "28px" }}>
        <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#fb923c",
              textDecoration: "none",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Create one free
          </Link>
        </span>
      </div>
    </div>
  );
}
