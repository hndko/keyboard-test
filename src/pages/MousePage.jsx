import React from "react";
import MouseTest from "../components/MouseTest";

const MousePage = () => {
  return (
    <div
      style={{
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "var(--accent-cyan)",
        }}
      >
        Mouse Tester
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Test buttons, visual feedback, polling rate, and double-click issues.
      </p>
      <MouseTest />
    </div>
  );
};

export default MousePage;
