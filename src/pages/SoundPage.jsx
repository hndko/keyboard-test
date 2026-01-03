import React from "react";
import { useSound } from "../context/SoundContext";
import { Volume2, VolumeX, Keyboard } from "lucide-react";
import "../styles/skills.css";

const SoundPage = () => {
  const {
    isEnabled,
    setIsEnabled,
    volume,
    setVolume,
    soundType,
    setSoundType,
  } = useSound();

  return (
    <div className="sound-page-container">
      <div className="sound-card">
        <div className="icon-header">
          {isEnabled ? (
            <Volume2 size={64} className="text-cyan" />
          ) : (
            <VolumeX size={64} className="text-muted" />
          )}
        </div>

        <h2>Mechanical Sound Sim</h2>
        <p>
          Turn your membrane keyboard into a thocky mechanical beast
          (virtually).
        </p>

        <div className="control-group">
          <label className="switch-row">
            <span className="switch-text">Enable Simulator</span>
            <div className="switch-input-wrapper">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </div>
          </label>
        </div>

        {isEnabled && (
          <div className="advanced-controls fade-in">
            <div className="control-item">
              <label>Volume: {Math.round(volume * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>

            <div className="control-item">
              <label>Profile</label>
              <div className="btn-group">
                <button
                  className={`btn ${soundType === "mech" ? "active" : ""}`}
                  onClick={() => setSoundType("mech")}
                >
                  Thocky
                </button>
                <button
                  className={`btn ${
                    soundType === "typewriter" ? "active" : ""
                  }`}
                  onClick={() => setSoundType("typewriter")}
                >
                  Linear
                </button>
              </div>
            </div>

            <div className="typing-area-preview">
              <textarea
                placeholder="Type here to test the sound..."
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundPage;
