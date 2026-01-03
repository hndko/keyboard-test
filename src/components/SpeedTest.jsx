import React, { useState, useEffect, useRef } from "react";
import "../styles/speed.css";
import { RefreshCcw, Play, Settings, Type, Globe, Edit3 } from "lucide-react";

const TEXT_DATA = {
  en: [
    "The quick brown fox jumps over the lazy dog.",
    "Technology is best when it brings people together.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "In the middle of difficulty lies opportunity.",
    "Life is what happens when you're busy making other plans.",
    "Knowledge is power. Information is liberating. Education is the premise of progress.",
    "The only way to do great work is to love what you do.",
  ],
  id: [
    "Pancasila adalah dasar negara Republik Indonesia.",
    "Bhinneka Tunggal Ika berbeda-beda tetapi tetap satu jua.",
    "Kemerdekaan ialah hak segala bangsa dan oleh sebab itu penjajahan harus dihapuskan.",
    "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.",
    "Bersatu kita teguh bercerai kita runtuh.",
    "Teknologi informasi berkembang sangat pesat di era globalisasi saat ini.",
    "Kesehatan adalah harta yang paling berharga dalam hidup manusia.",
    "Jangan menunda pekerjaan sampai besok apa yang bisa kamu kerjakan hari ini.",
  ],
};

const SpeedTest = () => {
  const [mode, setMode] = useState("random"); // 'random' or 'custom'
  const [lang, setLang] = useState("en"); // 'en' or 'id'
  const [customText, setCustomText] = useState("");

  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [status, setStatus] = useState("idle"); // idle, running, finished, editing

  const inputRef = useRef(null);

  useEffect(() => {
    if (mode === "random") {
      resetTest();
    } else {
      setStatus("editing");
      setText("");
      setInput("");
    }
  }, [mode, lang]);

  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        calculateStats();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status, input]);

  const resetTest = () => {
    let newText = "";
    if (mode === "custom") {
      if (!customText.trim()) {
        setStatus("editing");
        return;
      }
      newText = customText.trim();
    } else {
      const texts = TEXT_DATA[lang];
      // Try to pick a new text different from current
      let nextText = texts[Math.floor(Math.random() * texts.length)];
      if (texts.length > 1 && nextText === text) {
        nextText = texts[(texts.indexOf(nextText) + 1) % texts.length];
      }
      newText = nextText;
    }

    setText(newText);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setStatus("idle");
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
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

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correctChars++;
    }
    const currentAccuracy =
      input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  };

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      resetTest();
    }
  };

  return (
    <div className="speed-test-container">
      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="setting-group">
          <span className="setting-label">
            <Type size={16} /> Mode
          </span>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${mode === "random" ? "active" : ""}`}
              onClick={() => setMode("random")}
            >
              Random Quotes
            </button>
            <button
              className={`toggle-btn ${mode === "custom" ? "active" : ""}`}
              onClick={() => setMode("custom")}
            >
              Custom Text
            </button>
          </div>
        </div>

        {mode === "random" && (
          <div className="setting-group">
            <span className="setting-label">
              <Globe size={16} /> Language
            </span>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                English
              </button>
              <button
                className={`toggle-btn ${lang === "id" ? "active" : ""}`}
                onClick={() => setLang("id")}
              >
                Indonesia
              </button>
            </div>
          </div>
        )}
      </div>

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

      {status === "editing" ? (
        <div className="custom-input-area">
          <textarea
            className="custom-textarea"
            placeholder="Paste your text here to practice..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <button
            className="btn btn-primary start-btn"
            onClick={handleCustomSubmit}
          >
            <Play size={18} /> Start Custom Test
          </button>
        </div>
      ) : (
        <>
          <div
            className="text-display"
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
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
              if (status === "running") e.target.focus();
            }}
          />
        </>
      )}

      <div className="speed-controls">
        {status !== "editing" && (
          <button
            className="btn btn-primary refresh-btn"
            onClick={resetTest}
            onMouseDown={(e) => e.preventDefault()}
          >
            <RefreshCcw size={18} />{" "}
            {status === "finished" ? "Try Again" : "Restart"}
          </button>
        )}
        {mode === "custom" && status !== "editing" && (
          <button
            className="btn"
            onClick={() => setStatus("editing")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Edit3 size={18} style={{ marginRight: "0.5rem" }} /> Edit Text
          </button>
        )}
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
