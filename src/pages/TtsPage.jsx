import React from "react";
import TtsTest from "../components/TtsTest";

const TtsPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)" }}>
          Text to Speech
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Test Browser Speech Synthesis
        </p>
      </div>
      <TtsTest />
    </div>
  );
};

export default TtsPage;
