import React from "react";
import Keyboard from "../components/Keyboard";

const KeyboardPage = () => {
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
        Keyboard Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Press keys on your physical keyboard to verify they are working.
      </p>
      <Keyboard />
    </div>
  );
};

export default KeyboardPage;
