import React, { useEffect, useState } from "react";
import { keys, arrowKeys } from "../utils/keyboardData";
import "../styles/keyboard.css";

const Keyboard = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [history, setHistory] = useState([]);
  const [layoutType, setLayoutType] = useState("windows"); // 'windows' or 'mac'
  const [testedKeys, setTestedKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const { code, key } = e;
      setActiveKey(code);

      setTestedKeys((prev) => new Set(prev).add(code));
      setHistory((prev) =>
        [...prev, { code, key, timestamp: Date.now() }].slice(-10)
      ); // Keep last 10
    };

    const handleKeyUp = () => {
      setActiveKey(null);
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
    <div className="keyboard-container">
      <div className="controls">
        <div className="layout-toggle">
          <button
            className={`btn ${layoutType === "windows" ? "btn-primary" : ""}`}
            onClick={() => setLayoutType("windows")}
            // Prevent focus to avoid stealing keyboard events
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
          className="btn"
          onClick={resetTest}
          onMouseDown={(e) => e.preventDefault()}
        >
          Reset Test
        </button>
      </div>

      <div className="keyboard-frame">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((k) => {
              const isActive = activeKey === k.code;
              const isTested = testedKeys.has(k.code);
              let label = k.label;
              if (layoutType === "mac" && k.labelMac) {
                label = k.labelMac;
              }

              return (
                <div
                  key={k.code}
                  className={`key ${isActive ? "active" : ""} ${
                    isTested ? "tested" : ""
                  }`}
                  style={{
                    width: `calc(var(--base-size) * ${k.width})`,
                    flexGrow: 0, // Stop using flex-grow to force specific ratios
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
