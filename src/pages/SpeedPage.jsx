import React from "react";
import SpeedTest from "../components/SpeedTest";

const SpeedPage = () => {
  return (
    <div
      style={{
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "var(--accent-purple)",
        }}
      >
        Typing Speed Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Type the text below as fast as you can. Timer starts when you begin
        typing.
      </p>
      <SpeedTest />
    </div>
  );
};

export default SpeedPage;
