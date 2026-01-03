import React from "react";
import NetworkTest from "../components/NetworkTest";

const NetworkPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-green)" }}>
          Network Status
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Connection type, speed, and latency.
        </p>
      </div>
      <NetworkTest />
    </div>
  );
};

export default NetworkPage;
