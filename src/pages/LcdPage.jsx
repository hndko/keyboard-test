import React from "react";
import LcdTest from "../components/LcdTest";

const LcdPage = () => {
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
          color: "var(--accent-green)",
        }}
      >
        LCD Pixel Test
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Enter full-screen mode and cycle through solid colors to identify pixel
        defects.
      </p>
      <LcdTest />
    </div>
  );
};

export default LcdPage;
