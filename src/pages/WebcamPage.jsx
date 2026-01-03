import React from "react";
import WebcamTest from "../components/WebcamTest";

const WebcamPage = () => {
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
          color: "var(--accent-purple)",
        }}
      >
        Webcam Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Verify camera feed, resolution, and mirroring.
      </p>
      <WebcamTest />
    </div>
  );
};

export default WebcamPage;
