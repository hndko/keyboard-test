import React from "react";
import GhostingTest from "../components/GhostingTest";

const GhostingPage = () => {
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
        Anti-Ghosting (NKRO) Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Check how many keys your keyboard can register simultaneously.
      </p>
      <GhostingTest />
    </div>
  );
};

export default GhostingPage;
