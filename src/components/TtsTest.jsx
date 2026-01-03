import React, { useState, useEffect } from "react";
import { Mic, Volume2, Play, Pause, RotateCcw } from "lucide-react";
import "../styles/visuals.css";

const TtsTest = () => {
  const [text, setText] = useState(
    "Hello! Welcome to IOVerse. This is a shorter sentence to test speech synthesis."
  );
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      if (vs.length > 0 && !selectedVoice) {
        // Try to find default or English
        const def = vs.find((v) => v.default) || vs[0];
        setSelectedVoice(def.name);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const speak = () => {
    if (window.speechSynthesis.speaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="tts-container">
      <div className={`tts-card ${isSpeaking ? "active-speech" : ""}`}>
        <div className="tts-header">
          <Volume2 size={32} className={isSpeaking ? "pulse-icon" : ""} />
          <h2>Speech Synthesis</h2>
        </div>

        <textarea
          className="tts-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <div className="tts-controls-row">
          <div className="control-group">
            <label>Voice</label>
            <select
              value={selectedVoice || ""}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="tts-select"
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Speed: {rate}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="tts-actions">
          <button
            className="btn btn-primary"
            onClick={speak}
            disabled={isSpeaking}
          >
            <Play size={18} /> Speak
          </button>
          <button
            className="btn btn-danger"
            onClick={stop}
            disabled={!isSpeaking}
          >
            <Pause size={18} /> Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default TtsTest;
