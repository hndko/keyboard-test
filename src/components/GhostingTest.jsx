import React, { useState, useEffect, useRef } from "react";
import { keys } from "../utils/keyboardData";
import "../styles/keyboard.css"; // Reuse keyboard styles
import { Layers, RefreshCcw } from "lucide-react";

const GhostingTest = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [maxKeys, setMaxKeys] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  // Scaling Logic (Same as Keyboard.jsx)
  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1250;
      const padding = 40;
      const availableWidth = window.innerWidth - padding;
      let newScale = 1;
      if (availableWidth < baseWidth) {
        newScale = availableWidth / baseWidth;
      }
      setScale(newScale);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Key Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const code = e.code;

      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.add(code);
        if (next.size > maxKeys) setMaxKeys(next.size);
        return next;
      });
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      const code = e.code;
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [maxKeys]);

  const resetMax = () => {
    setMaxKeys(0);
    setActiveKeys(new Set());
    document.activeElement.blur();
  };

  return (
    <div
      className="keyboard-container"
      ref={containerRef}
      style={{ marginTop: "0" }}
    >
      <div
        className="nkro-stats"
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "2rem",
          justifyContent: "center",
        }}
      >
        <div
          className="stat-card"
          style={{ minWidth: "200px", textAlign: "center" }}
        >
          <h3
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
            }}
          >
            Current Keys
          </h3>
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: activeKeys.size > 0 ? "var(--accent-cyan)" : "#fff",
            }}
          >
            {activeKeys.size}
          </span>
        </div>
        <div
          className="stat-card"
          style={{ minWidth: "200px", textAlign: "center" }}
        >
          <h3
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
            }}
          >
            Max Simultaneous
          </h3>
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "var(--accent-purple)",
            }}
          >
            {maxKeys}
          </span>
        </div>
      </div>

      <button
        className="btn reset-btn"
        onClick={resetMax}
        style={{ margin: "0 auto 2rem auto" }}
      >
        <RefreshCcw size={16} /> Reset Max Count
      </button>

      <div
        className="keyboard-frame"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `-${(1 - scale) * 400}px`,
        }}
      >
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((k) => {
              const isActive = activeKeys.has(k.code);
              return (
                <div
                  key={k.code}
                  className={`key ${isActive ? "active" : ""}`}
                  style={{
                    width: `calc(var(--base-size) * ${k.width})`,
                    flexGrow: 0,
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.3, // Dim inactive keys for Ghosting test
                  }}
                >
                  <span className="key-main">{k.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          maxWidth: "600px",
          margin: "3rem auto",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          <strong>How to test:</strong> Press and hold as many keys as possible
          with both hands. Most gaming keyboards (NKRO) should detect all of
          them. Standard office keyboards might jam after 3-6 keys (Ghosting).
        </p>
      </div>
    </div>
  );
};

export default GhostingTest;
