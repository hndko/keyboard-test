import React from "react";
import ShortcutTest from "../components/ShortcutTest";

const ShortcutPage = () => {
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
        Shortcut Master
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
        Test your muscle memory for common keyboard shortcuts.
      </p>
      <ShortcutTest />
    </div>
  );
};

export default ShortcutPage;
