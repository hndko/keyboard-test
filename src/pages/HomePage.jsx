import React from "react";
import { Link } from "react-router-dom";
import { Keyboard, Zap, Monitor } from "lucide-react";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1
        style={{
          fontSize: "3.5rem",
          marginBottom: "1rem",
          background:
            "linear-gradient(to right, var(--accent-cyan), var(--accent-purple))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Test Your Gear
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "var(--text-secondary)",
          marginBottom: "3rem",
          maxWidth: "600px",
          margin: "0 auto 3rem auto",
        }}
      >
        The ultimate suite of tools to verify your keyboard functionality,
        typing speed, and display quality.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <FeatureCard
          to="/keyboard"
          icon={<Keyboard size={48} color="var(--accent-cyan)" />}
          title="Keyboard Test"
          description="Check every key on your keyboard. Supports Windows and Mac layouts."
        />
        <FeatureCard
          to="/speed"
          icon={<Zap size={48} color="var(--accent-purple)" />}
          title="Speed Test"
          description="Test your typing speed (WPM) and accuracy with our sleek typing tool."
        />
        <FeatureCard
          to="/lcd"
          icon={<Monitor size={48} color="var(--accent-green)" />}
          title="LCD Pixel Test"
          description="Check for dead pixels and screen uniformity with full-screen color cycles."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ to, icon, title, description }) => (
  <Link
    to={to}
    style={{
      background: "var(--bg-panel)",
      padding: "2rem",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    {icon}
    <h3 style={{ fontSize: "1.5rem" }}>{title}</h3>
    <p style={{ color: "var(--text-secondary)" }}>{description}</p>
  </Link>
);

export default HomePage;
