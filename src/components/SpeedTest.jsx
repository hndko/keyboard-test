import React, { useState, useEffect, useRef } from "react";
import "../styles/speed.css";
import { RefreshCcw, Play } from "lucide-react";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Technology is best when it brings people together.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "In the middle of difficulty lies opportunity.",
  "Life is what happens when you're busy making other plans.",
];

const SpeedTest = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [status, setStatus] = useState("idle"); // idle, running, finished
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        calculateStats();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status, input]);

  const resetTest = () => {
    const randomText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(randomText);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setStatus("idle");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInput = (e) => {
    const val = e.target.value;

    if (status === "idle" && val.length > 0) {
      setStatus("running");
      setStartTime(Date.now());
    }

    setInput(val);

    if (val === text) {
      setStatus("finished");
      calculateStats(true);
    }
  };

  const calculateStats = (final = false) => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    const wordsTyped = input.length / 5;
    const currentWpm = Math.round(wordsTyped / timeElapsed) || 0;

    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correctChars++;
    }
    const currentAccuracy =
      input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  };

  return (
    <div className="speed-test-container">
      <div className="stats-board">
        <div className="stat-item">
          <span className="stat-label">WPM</span>
          <span className="stat-value">{wpm}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
      </div>

      <div className="text-display" onClick={() => inputRef.current.focus()}>
        {text.split("").map((char, index) => {
          let className = "char";
          if (index < input.length) {
            className += input[index] === char ? " correct" : " incorrect";
          } else if (index === input.length) {
            className += " current";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="hidden-input"
        value={input}
        onChange={handleInput}
        disabled={status === "finished"}
        onBlur={(e) => {
          if (status !== "finished") e.target.focus();
        }} // Keep focus
      />

      <div className="controls">
        <button className="btn btn-primary" onClick={resetTest}>
          <RefreshCcw size={18} style={{ marginRight: "0.5rem" }} />{" "}
          {status === "finished" ? "Try Again" : "Restart"}
        </button>
      </div>

      {status === "finished" && (
        <div className="result-popup">
          <h3>Test Complete!</h3>
          <p>
            You typed at <strong>{wpm} WPM</strong> with{" "}
            <strong>{accuracy}%</strong> accuracy.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpeedTest;
