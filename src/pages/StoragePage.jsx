import React from "react";
import StorageTest from "../components/StorageTest";

const StoragePage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent-cyan)" }}>
          Storage Quota
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Browser Storage Estimation
        </p>
      </div>
      <StorageTest />
    </div>
  );
};

export default StoragePage;
