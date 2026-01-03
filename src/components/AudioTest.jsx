import React, { useState } from "react";
import { Headphones, Volume2, HelpCircle } from "lucide-react";
import "../styles/hz-audio.css";

const AudioTest = () => {
  const [playing, setPlaying] = useState(null); // 'left', 'right', 'center'

  const playTone = (panValue, type) => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      alert("Your browser does not support Web Audio API");
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);

    // Pan: -1 (Left), 0 (Center), 1 (Right)
    panner.pan.value = panValue;

    // Volume ramp to avoid popping
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    osc.connect(panner);
    panner.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1);

    setPlaying(type);
    setTimeout(() => setPlaying(null), 1000);
  };

  return (
    <div className="audio-container">
      <div className="headphone-visual">
        <Headphones size={200} strokeWidth={1} color="var(--border-color)" />

        <div
          className={`ear-indicator left ${playing === "left" ? "active" : ""}`}
        >
          L
        </div>
        <div
          className={`ear-indicator right ${
            playing === "right" ? "active" : ""
          }`}
        >
          R
        </div>
      </div>

      <div className="audio-controls">
        <button
          className={`btn audio-btn left ${playing === "left" ? "active" : ""}`}
          onClick={() => playTone(-1, "left")}
        >
          <Volume2 size={24} /> Test Left
        </button>

        <button
          className={`btn audio-btn center ${
            playing === "center" ? "active" : ""
          }`}
          onClick={() => playTone(0, "center")}
        >
          <Volume2 size={24} /> Test Center
        </button>

        <button
          className={`btn audio-btn right ${
            playing === "right" ? "active" : ""
          }`}
          onClick={() => playTone(1, "right")}
        >
          Test Right <Volume2 size={24} />
        </button>
      </div>

      <div className="audio-tips">
        <p>
          <HelpCircle size={16} /> <strong>Tip:</strong> If you hear sound
          coming from the wrong side, your headphones might be worn backwards!
        </p>
      </div>
    </div>
  );
};

export default AudioTest;
