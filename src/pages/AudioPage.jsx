import React from "react";
import AudioTest from "../components/AudioTest";

const AudioPage = () => {
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
          color: "var(--text-primary)",
        }}
      >
        Stereo Audio Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Verify left and right audio channels are working correctly.
      </p>
      <AudioTest />
    </div>
  );
};

export default AudioPage;
