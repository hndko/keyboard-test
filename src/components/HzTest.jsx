import React, { useState, useEffect, useRef } from "react";
import { Activity, Zap } from "lucide-react";
import "../styles/hz-audio.css";

const HzTest = () => {
  const [fps, setFps] = useState(0);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(true);

  const requestRef = useRef();
  const startTimeRef = useRef();
  const framesRef = useRef(0);
  const prevTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      if (!prevTimeRef.current) prevTimeRef.current = time;

      framesRef.current++;

      if (time - prevTimeRef.current >= 1000) {
        const currentFps = Math.round(
          (framesRef.current * 1000) / (time - prevTimeRef.current)
        );
        setFps(currentFps);
        setHistory((prev) => [...prev, currentFps].slice(-20)); // Keep last 20
        framesRef.current = 0;
        prevTimeRef.current = time;
      }

      if (isRunning) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  // UFO Animation Styles (calculated via CSS)

  return (
    <div className="hz-container">
      <div className="hz-readout">
        <div className="fps-circle">
          <span className="fps-value">{fps}</span>
          <span className="fps-label">Hz / FPS</span>
        </div>
        <div className="fps-graph">
          {history.map((val, i) => (
            <div
              key={i}
              className="bar"
              style={{ height: `${Math.min(val, 240) / 2.4}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="motion-test">
        <h3>Motion Clarity Test</h3>
        <p>
          Track the UFOs. On higher refresh rate monitors (120Hz+), the movement
          should look smoother and less blurry.
        </p>

        <div className="ufo-track">
          <div className="ufo fast">
            🛸 <span>Fast</span>
          </div>
        </div>
        <div className="ufo-track">
          <div className="ufo medium">
            🛸 <span>Medium</span>
          </div>
        </div>
        <div className="ufo-track">
          <div className="ufo slow">
            🛸 <span>Slow</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Pause Test" : "Resume Test"}
      </button>
    </div>
  );
};

export default HzTest;
