import React from "react";
import MicrophoneTest from "../components/MicrophoneTest";

const MicrophonePage = () => {
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
        Microphone Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Check your input levels and waveform response.
      </p>
      <MicrophoneTest />
    </div>
  );
};

export default MicrophonePage;
