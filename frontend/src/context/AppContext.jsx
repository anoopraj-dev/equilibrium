import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const initialResume = {
  id: "active",
  title: "Executive Tech Leader Resume",
  template: "Classic Premium",
  personalInfo: {
    fullName: "Elon Musk",
    email: "elon@spacex.com",
    phone: "+1 (555) 0199",
    location: "Austin, TX",
    website: "https://spacex.com",
    linkedin: "https://linkedin.com/in/elon",
  },
  summary: "Pioneering technology architect and systems builder scaling sustainable infrastructure paradigms. Recognized for clean-sheet product engineering, venture scaling, and leading elite cross-functional engineering teams.",
  skills: [
    "Systems Architecture",
    "Distributed Microservices",
    "High-Performance Computing",
    "AI & Deep Learning Systems",
    "Aerospace System Design",
    "Venture Capitalization & Scaling"
  ],
  experience: [
    {
      id: "exp-1",
      company: "SpaceX",
      role: "Chief Engineer & CEO",
      period: "2002 - Present",
      description: "Led core systems architecture of Falcon 9, Falcon Heavy, and Starship propulsion platforms. Scaled private aerospace venture throughput by 400%, driving $80B+ valuation."
    },
    {
      id: "exp-2",
      company: "Tesla",
      role: "Technoking & Chief Architect",
      period: "2004 - Present",
      description: "Spearheaded hardware-in-the-loop validation of FSD neural networks. Pioneered gigafactory scaling models, reducing powertrain manufacturing costs by 45%."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Pennsylvania",
      degree: "B.S. in Physics & Economics",
      period: "1992 - 1995"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Starlink Mega-Constellation",
      description: "Designed ultra-low latency space-based satellite internet mesh, provisioning high-speed bandwidth to 2.5M+ active customer endpoints globally."
    }
  ],
  certifications: [
    "FAA Orbital Launch Clearance #001",
    "Advanced Aerospace Structures License"
  ],
  achievements: [
    "First private organization to successfully deploy orbital astronauts.",
    "Broke world records in engine specific impulse thrust-to-weight metrics."
  ],
  strength: 94
};

export function AppProvider({ children }) {
  // --- Auth State ---
  const [user, setUser] = useState({
    name: "Elon Musk",
    email: "elon@spacex.com",
    tier: "Premium Elite",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // --- Resume State ---
  const [resumes, setResumes] = useState([
    { id: "1", title: "Executive Tech Leader Resume", template: "Classic Premium", lastModified: "2 hours ago", strength: 94 },
    { id: "2", title: "Full-Stack Engineer Narrative", template: "Modern Sleek", lastModified: "2 days ago", strength: 88 },
    { id: "3", title: "Principal Product Director Resume", template: "Minimal Grid", lastModified: "1 week ago", strength: 92 },
  ]);
  const [activeResume, setActiveResume] = useState(initialResume);

  // --- AI State ---
  const [aiUsage, setAiUsage] = useState({
    monthlyCreditsUsed: 42,
    monthlyCreditsLimit: 100,
  });
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // --- General UI State ---
  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    notificationsEnabled: true,
    apiIntegrationKey: "eq_live_83ba9a102c98d63",
    atsTargetScore: 85,
  });

  const showToast = (message, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser({ name: "Elon Musk", email, tier: "Premium Elite" });
    showToast("Welcome back, Elon!", "success");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    showToast("Signed out successfully.");
  };

  const signup = (name, email, password) => {
    setIsAuthenticated(true);
    setUser({ name, email, tier: "Premium Elite" });
    showToast("Account created successfully! Welcome to Equilibrium.", "success");
  };

  const updateActiveResume = (updated) => {
    setActiveResume(updated);
    // Recalculate Mock ATS/Strength metric
    let baseStrength = 70;
    if (updated.summary?.length > 50) baseStrength += 5;
    if (updated.experience?.length > 1) baseStrength += 10;
    if (updated.skills?.length > 4) baseStrength += 5;
    if (updated.projects?.length > 0) baseStrength += 4;
    updated.strength = Math.min(100, baseStrength);
  };

  const saveResumeDraft = () => {
    showToast("Resume auto-saved successfully.", "success");
  };

  const createNewResume = (title = "New Professional Document", template = "Modern Sleek") => {
    const newId = (resumes.length + 1).toString();
    const newDoc = {
      ...initialResume,
      id: newId,
      title,
      template,
      strength: 70
    };
    setResumes((prev) => [{ id: newId, title, template, lastModified: "Just now", strength: 70 }, ...prev]);
    setActiveResume(newDoc);
    showToast("New resume draft initialized.");
    return newId;
  };

  const deleteResume = (id) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    showToast("Resume document deleted.");
  };

  const deductAiCredit = () => {
    setAiUsage((prev) => {
      if (prev.monthlyCreditsUsed >= prev.monthlyCreditsLimit) {
        showToast("AI monthly quota reached. Upgrade for unlimited generations.", "error");
        return prev;
      }
      return { ...prev, monthlyCreditsUsed: prev.monthlyCreditsUsed + 1 };
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        resumes,
        activeResume,
        updateActiveResume,
        saveResumeDraft,
        createNewResume,
        deleteResume,
        aiUsage,
        isAiGenerating,
        setIsAiGenerating,
        deductAiCredit,
        toasts,
        showToast,
        settings,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
