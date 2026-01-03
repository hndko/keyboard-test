import React from "react";
import TypingTest from "../components/TypingTest";

const TypingPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-purple)" }}>
          Typing Benchmark
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Test your WPM (Words Per Minute) and accuracy.
        </p>
      </div>
      <TypingTest />
    </div>
  );
};

export default TypingPage;
