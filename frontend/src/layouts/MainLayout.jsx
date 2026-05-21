import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div style={{ background: "#060a0a", minHeight: "100vh", color: "white", display: "flex", flexDirection: "column" }}>
      {/* Public Sticky Navigation Bar */}
      <Navbar />

      {/* Main Public Viewport */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
