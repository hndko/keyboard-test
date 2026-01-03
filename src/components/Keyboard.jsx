import React, { useEffect, useState, useRef } from "react";
import { keys, arrowKeys } from "../utils/keyboardData";
import "../styles/keyboard.css";

const Keyboard = () => {
  const [activeKeys, setActiveKeys] = useState(new Set()); // Changed to Set for multi-press
  const [history, setHistory] = useState([]);
  const [layoutType, setLayoutType] = useState("windows"); // 'windows' or 'mac'
  const [testedKeys, setTestedKeys] = useState(new Set());
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const { code, key } = e;

      setActiveKeys((prev) => new Set(prev).add(code)); // Add to active set

      setTestedKeys((prev) => new Set(prev).add(code));
      setHistory((prev) =>
        [...prev, { code, key, timestamp: Date.now() }].slice(-10)
      );
    };

    const handleKeyUp = (e) => {
      const { code } = e;
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
  }, []);

  const resetTest = () => {
    setTestedKeys(new Set());
    setHistory([]);
    // Remove focus from button so spacebar doesn't trigger it again
    document.activeElement.blur();
  };

  return (
    <div className="keyboard-container" ref={containerRef}>
      <div className="controls">
        <div className="layout-toggle">
          <button
            className={`btn ${layoutType === "windows" ? "btn-primary" : ""}`}
            onClick={() => setLayoutType("windows")}
            onMouseDown={(e) => e.preventDefault()}
          >
            Windows
          </button>
          <button
            className={`btn ${layoutType === "mac" ? "btn-primary" : ""}`}
            onClick={() => setLayoutType("mac")}
            onMouseDown={(e) => e.preventDefault()}
          >
            Mac
          </button>
        </div>

        <button
          className="btn reset-btn"
          onClick={resetTest}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
            <path d="M3 3v9h9" />
          </svg>
          Reset Test
        </button>
      </div>

      <div
        className="keyboard-frame"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `-${(1 - scale) * 400}px`, // Compensate for scale white space roughly
        }}
      >
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((k) => {
              const isActive = activeKeys.has(k.code);
              const isTested = testedKeys.has(k.code);
              let label = k.label;
              if (layoutType === "mac" && k.labelMac) {
                label = k.labelMac;
              }

              return (
                <div
                  key={k.code || `key-${rowIndex}-${k.label}-${Math.random()}`}
                  className={`key ${isActive ? "active" : ""} ${
                    isTested ? "tested" : ""
                  }`}
                  style={{
                    width: `calc(var(--base-size) * ${k.width})`,
                    flexGrow: 0,
                    flexShrink: 0,
                  }}
                  data-code={k.code}
                >
                  <span className="key-main">{label}</span>
                  {k.labelShift && (
                    <span className="key-shift">{k.labelShift}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {/* Layout adjustment for arrow keys usually requires specific grid but doing a simple append for now */}
      </div>

      <div className="test-status">
        <h3>
          Last Key:{" "}
          <span className="glow-text">
            {history.length > 0 ? history[history.length - 1].code : "None"}
          </span>
        </h3>
        <p>Keys Tested: {testedKeys.size}</p>
      </div>
    </div>
  );
};

export default Keyboard;
