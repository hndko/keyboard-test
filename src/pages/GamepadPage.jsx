import React from "react";
import GamepadTest from "../components/GamepadTest";

const GamepadPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-cyan)" }}>
          Gamepad Tester
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Check buttons, triggers, and analog stick drift.
        </p>
      </div>
      <GamepadTest />
    </div>
  );
};

export default GamepadPage;
