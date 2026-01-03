import React from "react";
import LocationTest from "../components/LocationTest";

const LocationPage = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "2rem", color: "#ff8800" }}>GPS Test</h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Satellite coordinates and accuracy.
        </p>
      </div>
      <LocationTest />
    </div>
  );
};

export default LocationPage;
