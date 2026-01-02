import React, { useState, useEffect } from "react";
import { Maximize, X } from "lucide-react";
import "../styles/lcd.css";

const COLORS = [
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Cyan", value: "#00ffff" },
  { name: "Magenta", value: "#ff00ff" },
];

const LcdTest = () => {
  const [activeColorIndex, setActiveColorIndex] = useState(null);

  const startTest = () => {
    setActiveColorIndex(0);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((e) => console.error(e));
    }
  };

  const nextColor = () => {
    if (activeColorIndex === null) return;
    const next = activeColorIndex + 1;
    if (next >= COLORS.length) {
      exitTest();
    } else {
      setActiveColorIndex(next);
    }
  };

  const exitTest = () => {
    setActiveColorIndex(null);
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeColorIndex !== null) {
        if (e.key === "Escape") {
          exitTest();
        } else if (e.key === "ArrowRight" || e.key === " ") {
          nextColor();
        } else if (e.key === "ArrowLeft") {
          setActiveColorIndex((prev) => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeColorIndex]);

  if (activeColorIndex !== null) {
    return (
      <div
        className="lcd-fullscreen"
        style={{ backgroundColor: COLORS[activeColorIndex].value }}
        onClick={nextColor}
      >
        <div className="lcd-info">
          {COLORS[activeColorIndex].name} - Click or Arrow Keys to cycle. Esc to
          exit.
        </div>
      </div>
    );
  }

  return (
    <div className="lcd-intro">
      <div className="lcd-card">
        <MonitorIcon />
        <h3>LCD Pixel Test</h3>
        <p>
          Check for dead pixels, stuck pixels, and color uniformity. This test
          will display a series of full-screen solid colors.
        </p>
        <p className="instruction">
          Look closely at your screen for any dots that don't match the
          background color.
        </p>
        <button className="btn btn-primary" onClick={startTest}>
          <Maximize size={18} style={{ marginRight: "0.5rem" }} /> Start Test
        </button>
      </div>
    </div>
  );
};

const MonitorIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--accent-green)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

export default LcdTest;
