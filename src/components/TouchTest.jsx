import React, { useState, useEffect, useRef } from "react";
import { Fingerprint, RotateCcw } from "lucide-react";
import "../styles/mobile.css";

const COLORS = [
  "#00f3ff", // Cyan
  "#bc13fe", // Purple
  "#00ff00", // Green
  "#ff0000", // Red
  "#ffff00", // Yellow
  "#ff00ff", // Magenta
  "#ff8800", // Orange
  "#ffffff", // White
  "#0000ff", // Blue
  "#88ff00", // Lime
];

const TouchTest = () => {
  const [touches, setTouches] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 100; // Account for header
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleTouch = (e) => {
      e.preventDefault();
      const touchList = [];
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        const rect = canvas.getBoundingClientRect();
        touchList.push({
          id: t.identifier,
          x: t.clientX - rect.left,
          y: t.clientY - rect.top,
        });
      }
      setTouches(touchList);
    };

    canvas.addEventListener("touchstart", handleTouch, { passive: false });
    canvas.addEventListener("touchmove", handleTouch, { passive: false });
    canvas.addEventListener("touchend", handleTouch, { passive: false });
    canvas.addEventListener("touchcancel", handleTouch, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchend", handleTouch);
      canvas.removeEventListener("touchcancel", handleTouch);
    };
  }, []);

  // Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.fillStyle = "#0f0f12";
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear screen

      // Grid lines
      ctx.strokeStyle = "#1a1a20";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      touches.forEach((t, i) => {
        const color = COLORS[i % COLORS.length];

        // Draw circle
        ctx.beginPath();
        ctx.arc(t.x, t.y, 40, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw crosshair
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(t.x - 50, t.y);
        ctx.lineTo(t.x + 50, t.y);
        ctx.moveTo(t.x, t.y - 50);
        ctx.lineTo(t.x, t.y + 50);
        ctx.stroke();

        // Draw coords
        ctx.fillStyle = "#fff";
        ctx.font = "16px Inter";
        ctx.fillText(
          `ID:${t.id} (${Math.round(t.x)}, ${Math.round(t.y)})`,
          t.x + 50,
          t.y - 50
        );
      });

      requestAnimationFrame(draw);
    };

    const raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [touches]);

  return (
    <div className="touch-container">
      <div className="touch-header">
        <h2>Multi-Touch Test</h2>
        <div className="touch-count">
          <span>
            {touches.length} Finger{touches.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="touch-canvas" />
        {touches.length === 0 && (
          <div className="touch-hint">
            <Fingerprint size={64} style={{ opacity: 0.2 }} />
            <p>Touch screen with multiple fingers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouchTest;
