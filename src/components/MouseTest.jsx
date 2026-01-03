import React, { useState, useEffect, useRef } from "react";
import "../styles/mouse.css";
import { MousePointer2, Activity, AlertCircle } from "lucide-react";

const MouseTest = () => {
  const [buttons, setButtons] = useState({
    left: false,
    middle: false,
    right: false,
    back: false,
    forward: false,
  });

  const [clickStats, setClickStats] = useState({
    left: 0,
    middle: 0,
    right: 0,
    doubleClicks: 0,
  });

  const [hz, setHz] = useState(0);
  const [maxHz, setMaxHz] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const lastClickTime = useRef(0);
  const movementTimestamps = useRef([]);
  const requestRef = useRef();

  // Polling Rate Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setIsMoving(true);
      const now = performance.now();

      // Keep timestamps from the last second
      movementTimestamps.current.push(now);
      const oneSecondAgo = now - 1000;

      // Filter old timestamps
      while (
        movementTimestamps.current.length > 0 &&
        movementTimestamps.current[0] < oneSecondAgo
      ) {
        movementTimestamps.current.shift();
      }

      clearTimeout(requestRef.current);
      requestRef.current = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Update Hz display loop
    const interval = setInterval(() => {
      const currentHz = movementTimestamps.current.length;
      setHz(currentHz);
      if (currentHz > maxHz) setMaxHz(currentHz);
    }, 200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
      clearTimeout(requestRef.current);
    };
  }, [maxHz]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent context menu

    const map = { 0: "left", 1: "middle", 2: "right", 3: "back", 4: "forward" };
    const btn = map[e.button];

    if (btn) {
      setButtons((prev) => ({ ...prev, [btn]: true }));

      // Stats Update
      setClickStats((prev) => ({
        ...prev,
        [btn]: (prev[btn] || 0) + 1,
      }));

      // Simple Double Click Check (Visual feedback mostly)
      const now = Date.now();
      if (now - lastClickTime.current < 200) {
        // 200ms threshold
        setClickStats((prev) => ({
          ...prev,
          doubleClicks: prev.doubleClicks + 1,
        }));
      }
      lastClickTime.current = now;
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    const map = { 0: "left", 1: "middle", 2: "right", 3: "back", 4: "forward" };
    const btn = map[e.button];
    if (btn) {
      setButtons((prev) => ({ ...prev, [btn]: false }));
    }
  };

  // Prevent context menu globally on this area
  const handleContextMenu = (e) => e.preventDefault();

  return (
    <div
      className="mouse-test-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <div className="mouse-visualizer">
        {/* SVG Representation of a Mouse */}
        <svg viewBox="0 0 200 300" className="mouse-svg">
          {/* Body Base */}
          <path
            d="M50 80 L50 250 A50 50 0 0 0 150 250 L150 80 Z"
            className="mouse-body"
          />

          {/* Left Button */}
          <path
            d="M50 80 L50 50 A50 50 0 0 1 98 20 L98 120 L50 120 Z"
            className={`mouse-btn ${buttons.left ? "active" : ""}`}
          />

          {/* Right Button */}
          <path
            d="M102 20 A50 50 0 0 1 150 50 L150 120 L102 120 L102 20 Z"
            className={`mouse-btn ${buttons.right ? "active" : ""}`}
          />

          {/* Scroll Wheel / Middle */}
          <rect
            x="92"
            y="40"
            width="16"
            height="50"
            rx="8"
            className={`mouse-scroll ${buttons.middle ? "active" : ""}`}
          />

          {/* Side Buttons (Abstracted) */}
          <path
            d="M40 140 L50 140 L50 170 L40 170 A5 5 0 0 1 40 140"
            className={`mouse-side ${buttons.back ? "active" : ""}`}
          />
          <path
            d="M40 180 L50 180 L50 210 L40 210 A5 5 0 0 1 40 180"
            className={`mouse-side ${buttons.forward ? "active" : ""}`}
          />
        </svg>

        <div className="polling-rate-display">
          <span className="hz-label">
            <Activity size={16} /> Polling Rate
          </span>
          <span className={`hz-value ${isMoving ? "moving" : ""}`}>
            {hz} <span className="unit">Hz</span>
          </span>
          <span className="hz-max">Max: {maxHz} Hz</span>
        </div>
      </div>

      <div className="mouse-stats">
        <div className="stat-card">
          <h3>Left Clicks</h3>
          <span className="stat-count">{clickStats.left}</span>
        </div>
        <div className="stat-card">
          <h3>Right Clicks</h3>
          <span className="stat-count">{clickStats.right}</span>
        </div>
        <div className="stat-card">
          <h3>Middle Clicks</h3>
          <span className="stat-count">{clickStats.middle}</span>
        </div>
        <div className="stat-card warning">
          <h3>Double Clicks Detected</h3>
          <span className="stat-count">{clickStats.doubleClicks}</span>
          <small className="stat-note">
            <AlertCircle size={12} /> &lt; 200ms interval
          </small>
        </div>
      </div>

      <p className="instruction-text">
        Move your mouse fast to test Polling Rate. Click buttons to test
        functionality. Right-click context menu is disabled in this area.
      </p>
    </div>
  );
};

export default MouseTest;
