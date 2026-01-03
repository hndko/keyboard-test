import React, { useState, useEffect } from "react";
import { Palette, Maximize, Minimize } from "lucide-react";
import "../styles/visuals.css";

const ColorGuardTest = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mode, setMode] = useState("gradient"); // gradient, scale-grey, scale-rgb

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const renderContent = () => {
    switch (mode) {
      case "gradient":
        return (
          <div className="gradient-suite">
            <div className="gradient-bar r-g-b"></div>
            <div className="gradient-bar b-w"></div>
            <div className="gradient-bar complex"></div>
          </div>
        );
      case "scale-grey":
        return (
          <div className="scale-container">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="scale-step"
                style={{ backgroundColor: `rgb(${i * 8}, ${i * 8}, ${i * 8})` }}
              ></div>
            ))}
          </div>
        );
      case "scale-rgb":
        return (
          <div className="rgb-stack">
            <div className="scale-container red">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="scale-step"
                  style={{ backgroundColor: `rgb(${i * 8}, 0, 0)` }}
                ></div>
              ))}
            </div>
            <div className="scale-container green">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="scale-step"
                  style={{ backgroundColor: `rgb(0, ${i * 8}, 0)` }}
                ></div>
              ))}
            </div>
            <div className="scale-container blue">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="scale-step"
                  style={{ backgroundColor: `rgb(0, 0, ${i * 8})` }}
                ></div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`visual-tool-container ${isFullscreen ? "fs-mode" : ""}`}>
      {!isFullscreen && (
        <div className="visual-controls-header">
          <h2>Color Banding Check</h2>
          <div className="mode-toggle">
            <button
              className={`btn-sm ${mode === "gradient" ? "active" : ""}`}
              onClick={() => setMode("gradient")}
            >
              Gradients
            </button>
            <button
              className={`btn-sm ${mode === "scale-grey" ? "active" : ""}`}
              onClick={() => setMode("scale-grey")}
            >
              Grey Scale
            </button>
            <button
              className={`btn-sm ${mode === "scale-rgb" ? "active" : ""}`}
              onClick={() => setMode("scale-rgb")}
            >
              RGB Scale
            </button>
          </div>
          <button className="btn btn-primary" onClick={toggleFullscreen}>
            <Maximize size={18} /> Fullscreen
          </button>
        </div>
      )}

      <div className="visual-canvas">
        {renderContent()}
        {isFullscreen && (
          <div className="fs-overlay-btn" onClick={toggleFullscreen}>
            <Minimize size={24} color="white" />
          </div>
        )}
      </div>

      {!isFullscreen && (
        <p className="visual-desc">
          Check for "banding" (visible lines) in the gradients. High-quality
          8-bit/10-bit panels should show smooth transitions.
        </p>
      )}
    </div>
  );
};

export default ColorGuardTest;
