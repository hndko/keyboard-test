import React from "react";
import BatteryTest from "../components/BatteryTest";

const BatteryPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-green)" }}>
          Battery Monitor
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Real-time power status and charging metrics.
        </p>
      </div>
      <BatteryTest />
    </div>
  );
};

export default BatteryPage;
