import React from "react";
import HzTest from "../components/HzTest";

const HzPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "var(--accent-green)",
        }}
      >
        Monitor Refresh Rate
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Real-time FPS calculator and motion smoothness test.
      </p>
      <HzTest />
    </div>
  );
};

export default HzPage;
