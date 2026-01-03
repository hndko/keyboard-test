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
      <div className={`sound-card ${isEnabled ? "active" : ""}`}>
        <div className="card-header">
          <div className="header-icon">
            {isEnabled ? (
              <Volume2 size={32} className="text-cyan" />
            ) : (
              <VolumeX size={32} className="text-muted" />
            )}
          </div>
          <div className="header-info">
            <h2>Mech Sim</h2>
            <p>Virtual Switches</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {isEnabled && (
          <div className="card-body fade-in">
            <div className="setting-block">
              <div className="setting-label">
                <span>Master Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  backgroundSize: `${volume * 100}% 100%`,
                }}
              />
            </div>

            <div className="setting-block">
              <div className="setting-label">Sound Profile</div>
              <div className="segment-control">
                <button
                  className={`segment-btn ${
                    soundType === "mech" ? "active" : ""
                  }`}
                  onClick={() => setSoundType("mech")}
                >
                  Thocky
                </button>
                <button
                  className={`segment-btn ${
                    soundType === "typewriter" ? "active" : ""
                  }`}
                  onClick={() => setSoundType("typewriter")}
                >
                  Linear
                </button>
              </div>
            </div>

            <div className="test-area">
              <textarea
                placeholder="Type here to listen..."
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
