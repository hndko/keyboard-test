import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Play, Trophy, Keyboard } from "lucide-react";
import "../styles/utilities.css";

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. It is commonly used for touch-typing practice.",
  "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.",
  "In software engineering, a design pattern is a general repeatable solution to a commonly occurring problem in software design. A design pattern isn't a finished design that can be transformed directly into code.",
  "The internet is a vast network that connects computers all over the world. Through the internet, people can share information and communicate from anywhere with an internet connection.",
  "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI applications include advanced web search engines, recommendation systems, and autonomous vehicles.",
];

const TypingTest = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [status, setStatus] = useState("idle"); // idle, playing, finished

  const inputRef = useRef(null);
  const targetText = TEXTS[textIndex];

  useEffect(() => {
    if (status === "playing") {
      const interval = setInterval(() => {
        calculateStats();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status, userInput]);

  const handleChange = (e) => {
    const val = e.target.value;

    if (status === "idle") {
      setStatus("playing");
      setStartTime(Date.now());
    }

    if (status === "finished") return;

    setUserInput(val);

    if (val === targetText) {
      setStatus("finished");
      setEndTime(Date.now());
      calculateStats(true); // Final calculation
    }
  };

  const calculateStats = (isFinal = false) => {
    const now = isFinal ? Date.now() : Date.now();
    const start = startTime || now;
    const timeInMinutes = (now - start) / 60000;

    if (timeInMinutes <= 0) return;

    // WPM = (All typed characters / 5) / Time (min)
    // Standard definition of a 'word' is 5 characters
    const words = userInput.length / 5;
    const currentWpm = Math.round(words / timeInMinutes);

    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) correctChars++;
    }
    const currentAcc =
      userInput.length > 0
        ? Math.round((correctChars / userInput.length) * 100)
        : 100;

    setWpm(currentWpm);
    setAccuracy(currentAcc);
  };

  const resetTest = () => {
    setTextIndex(Math.floor(Math.random() * TEXTS.length));
    setUserInput("");
    setStatus("idle");
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    if (inputRef.current) inputRef.current.focus();
  };

  // Render text with highlighting
  const renderText = () => {
    const result = [];
    for (let i = 0; i < targetText.length; i++) {
      let colorClass = "";
      if (i < userInput.length) {
        colorClass = userInput[i] === targetText[i] ? "correct" : "incorrect";
      } else if (i === userInput.length) {
        colorClass = "cursor-char";
      }

      result.push(
        <span key={i} className={colorClass}>
          {targetText[i]}
        </span>
      );
    }
    return result;
  };

  return (
    <div className="typing-container">
      <div className="typing-header">
        <h2>
          <Keyboard className="icon-inline" /> Speed Test
        </h2>
        <div className="stats-row">
          <div className="stat-pill">
            <span className="label">WPM</span>
            <span className="value">{wpm}</span>
          </div>
          <div className="stat-pill">
            <span className="label">ACC</span>
            <span className="value">{accuracy}%</span>
          </div>
        </div>
      </div>

      <div className="typing-card">
        <div className="text-display" onClick={() => inputRef.current?.focus()}>
          {renderText()}
        </div>

        <input
          ref={inputRef}
          type="text"
          className="hidden-input"
          value={userInput}
          onChange={handleChange}
          autoFocus
          onPaste={(e) => e.preventDefault()}
        />

        {status === "finished" && (
          <div className="result-overlay">
            <Trophy size={64} className="text-yellow" />
            <h3>Test Complete!</h3>
            <p>
              You typed at <strong>{wpm} WPM</strong> with{" "}
              <strong>{accuracy}%</strong> accuracy.
            </p>
            <button className="btn btn-primary" onClick={resetTest}>
              <RefreshCw size={20} /> Try Again
            </button>
          </div>
        )}
      </div>

      {status !== "finished" && (
        <div className="controls">
          <button className="btn btn-secondary" onClick={resetTest}>
            <RefreshCw size={16} /> Reset
          </button>
          <p className="hint">Start typing to begin...</p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
