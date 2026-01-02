import React from "react";
import { Smartphone, Monitor } from "lucide-react";

const MobileWarning = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        padding: "2rem",
        color: "var(--text-secondary)",
      }}
    >
      <div
        style={{
          position: "relative",
          marginBottom: "2rem",
        }}
      >
        <Smartphone size={64} style={{ opacity: 0.5 }} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
            width: "120%",
            height: "4px",
            background: "#ff4444",
            borderRadius: "2px",
          }}
        />
      </div>

      <h2 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
        Desktop Device Required
      </h2>
      <p style={{ maxWidth: "400px", lineHeight: "1.6" }}>
        This feature requires a physical keyboard and is designed for desktop
        displays. Please access this page from a laptop or desktop computer for
        the best experience.
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--accent-cyan)",
        }}
      >
        <Monitor size={20} />
        <span>Switch to Desktop</span>
      </div>
    </div>
  );
};

export default MobileWarning;
