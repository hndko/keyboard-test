import React from "react";
import AimTest from "../components/AimTest";

const AimPage = () => {
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
          color: "var(--accent-cyan)",
        }}
      >
        Aim & Reaction Trainer
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Click the targets as quickly as possible.
      </p>
      <AimTest />
    </div>
  );
};

export default AimPage;
