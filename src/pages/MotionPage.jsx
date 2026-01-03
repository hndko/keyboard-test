import React from "react";
import MotionTest from "../components/MotionTest";

const MotionPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-cyan)" }}>
          Device Motion
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Gyroscope & Accelerometer Readings
        </p>
      </div>
      <MotionTest />
    </div>
  );
};

export default MotionPage;
