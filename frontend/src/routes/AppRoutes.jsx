import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout      from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public pages (eager-loaded — fast first paint)
import Home       from "../pages/Home";
import Login      from "../pages/Login";
import Signup     from "../pages/Signup";
import NotFound   from "../pages/NotFound";

// Lazy-loaded pages
const Dashboard     = lazy(() => import("../pages/Dashboard"));
const Analytics     = lazy(() => import("../pages/Analytics"));
const Templates     = lazy(() => import("../pages/Templates"));
const ResumeEditor  = lazy(() => import("../pages/ResumeEditor"));
const ResumePreview = lazy(() => import("../pages/ResumePreview"));
const ATSAnalysis   = lazy(() => import("../pages/ATSAnalysis"));
const JobTailoring  = lazy(() => import("../pages/JobTailoring"));
const InterviewPrep = lazy(() => import("../pages/InterviewPrep"));
const LinkedInImport= lazy(() => import("../pages/LinkedInImport"));
const Settings      = lazy(() => import("../pages/Settings"));
const PricingPage   = lazy(() => import("../pages/PricingPage"));
const Onboarding    = lazy(() => import("../pages/Onboarding"));

// Simple full-page suspense fallback
function PageLoader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "36px", height: "36px", border: "3px solid rgba(249,115,22,0.2)", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loading workspace…</span>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ── Public / Landing routes ── */}
        <Route element={<MainLayout />}>
          <Route path="/"        element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* ── Auth routes (standalone full-screen) ── */}
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<Signup />} />
        <Route path="/onboarding" element={
          <div style={{ minHeight: "100vh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
            <div style={{ width: "100%", maxWidth: "520px" }}>
              <Onboarding />
            </div>
          </div>
        } />

        {/* ── Authenticated dashboard routes ── */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard"       element={<Dashboard />} />
          <Route path="/analytics"       element={<Analytics />} />
          <Route path="/templates"       element={<Templates />} />
          <Route path="/ats-analysis"    element={<ATSAnalysis />} />
          <Route path="/job-tailoring"   element={<JobTailoring />} />
          <Route path="/interview-prep"  element={<InterviewPrep />} />
          <Route path="/linkedin-import" element={<LinkedInImport />} />
          <Route path="/settings"        element={<Settings />} />

          {/* Resume sub-routes — editor and preview opt-out of normal padding via full-height layout */}
          <Route path="/resume/new"          element={<Navigate to="/templates" replace />} />
          <Route path="/resume/:id/edit"     element={<ResumeEditor />} />
          <Route path="/resume/:id/preview"  element={<ResumePreview />} />
          <Route path="/resume/:id"          element={<Navigate to="/templates" replace />} />
        </Route>

        {/* ── 404 catch-all ── */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}