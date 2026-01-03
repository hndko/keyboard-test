import React from "react";
import VibrationTest from "../components/VibrationTest";

const VibrationPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-purple)" }}>
          Vibration Test
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Test Haptic Feedback motors.
        </p>
      </div>
      <VibrationTest />
    </div>
  );
};

export default VibrationPage;
