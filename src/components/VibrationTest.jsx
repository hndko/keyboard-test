import React, { useState } from "react";
import { Smartphone, Zap, Radio } from "lucide-react";
import "../styles/mobile.css";

const VibrationTest = () => {
  const [isSupported] = useState("vibrate" in navigator);
  const [isVibrating, setIsVibrating] = useState(false);

  const vibrate = (pattern) => {
    if (!isSupported) return;
    setIsVibrating(true);
    navigator.vibrate(pattern);

    // Reset state after vibration finishes (approximate)
    const duration = Array.isArray(pattern)
      ? pattern.reduce((a, b) => a + b, 0)
      : pattern;
    setTimeout(() => setIsVibrating(false), duration);
  };

  const stop = () => {
    if (!isSupported) return;
    navigator.vibrate(0);
    setIsVibrating(false);
  };

  if (!isSupported) {
    return (
      <div className="vibration-container">
        <div className="vibration-card error">
          <Smartphone size={64} className="text-muted" />
          <h2>Not Supported</h2>
          <p>Your device or browser does not support the Vibration API.</p>
          <p className="sub-hint">
            Try accessing this page on a mobile phone (Android).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="vibration-container">
      <div className={`vibration-card ${isVibrating ? "active" : ""}`}>
        <div className="vib-icon-wrapper">
          <Smartphone
            size={100}
            className={`phone-icon ${isVibrating ? "shake" : ""}`}
          />
          {isVibrating && <Zap className="zap-icon" size={32} />}
        </div>

        <h2>Haptic Feedback</h2>
        <p>Test your device's vibration motor.</p>

        <div className="vib-controls">
          <button className="btn btn-primary" onClick={() => vibrate(200)}>
            Short Pulse (200ms)
          </button>
          <button className="btn btn-primary" onClick={() => vibrate(1000)}>
            Long Pulse (1s)
          </button>
          <button
            className="btn btn-primary"
            onClick={() => vibrate([200, 100, 200, 100, 200])}
          >
            Double Tap Pattern
          </button>
          <button
            className="btn btn-primary"
            onClick={() => vibrate([500, 200, 500, 200, 1000])}
          >
            SOS Pattern
          </button>
          <button className="btn btn-danger" onClick={stop}>
            Stop
          </button>
        </div>

        <div className="vib-status">
          Status:{" "}
          <span className={isVibrating ? "text-cyan" : "text-muted"}>
            {isVibrating ? "VIBRATING" : "IDLE"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VibrationTest;
