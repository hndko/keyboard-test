import React, { useState, useEffect } from "react";
import { Maximize, X } from "lucide-react";
import "../styles/utilities.css";

const COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Yellow", hex: "#FFFF00" },
];

const DeadPixelTest = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
      setShowInfo(false);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
        setShowInfo(true);
      }
    }
  };

  const nextColor = () => {
    setColorIndex((prev) => (prev + 1) % COLORS.length);
  };

  const prevColor = () => {
    setColorIndex((prev) => (prev - 1 + COLORS.length) % COLORS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextColor();
      } else if (e.key === "ArrowLeft") {
        prevColor();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
        setShowInfo(true);
      }
    };

    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setShowInfo(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  const currentColor = COLORS[colorIndex];

  return (
    <div className="dead-pixel-container">
      {!isFullscreen ? (
        <div className="start-screen">
          <div className="card-header center">
            <Maximize size={48} className="text-cyan" />
            <h2>Dead Pixel Check</h2>
          </div>

          <div className="instructions">
            <p>
              This tool fills your screen with solid colors to help you spot
              dead or stuck pixels.
            </p>
            <ul>
              <li>
                <strong>Click Start</strong> to enter Fullscreen mode.
              </li>
              <li>
                <strong>Click</strong> or press <strong>Space/Arrows</strong> to
                cycle colors.
              </li>
              <li>
                Press <strong>Esc</strong> to exit.
              </li>
            </ul>
          </div>

          <button
            className="btn btn-primary start-btn"
            onClick={toggleFullscreen}
          >
            Start Test
          </button>

          <div className="preview-colors">
            {COLORS.map((c, i) => (
              <div
                key={c.name}
                className="color-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="fullscreen-color"
          style={{ backgroundColor: currentColor.hex }}
          onClick={nextColor}
        >
          {showInfo && (
            <div className="fs-overlay">
              <h3>{currentColor.name}</h3>
              <p>Click to change color</p>
            </div>
          )}

          {/* Hidden hints needed? usually people just click */}
          <div className="fs-hint">
            {colorIndex + 1} / {COLORS.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeadPixelTest;
