import React, { useState, useEffect, useCallback } from "react";
import { Command, Check, X, Shuffle } from "lucide-react";
import "../styles/skills.css";

const SHORTCUTS = [
  { label: "Copy", keys: ["Control", "c"] },
  { label: "Paste", keys: ["Control", "v"] },
  { label: "Cut", keys: ["Control", "x"] },
  { label: "Undo", keys: ["Control", "z"] },
  { label: "Redo", keys: ["Control", "y"] },
  { label: "Select All", keys: ["Control", "a"] },
  { label: "Save", keys: ["Control", "s"] },
  { label: "Find", keys: ["Control", "f"] },
  { label: "New Tab", keys: ["Control", "t"] },
  { label: "Close Tab", keys: ["Control", "w"] },
  { label: "Reopen Tab", keys: ["Control", "Shift", "t"] },
];

const ShortcutTest = () => {
  const [current, setCurrent] = useState(null);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [status, setStatus] = useState("waiting"); // waiting, correct, incorrect
  const [streak, setStreak] = useState(0);

  const nextChallenge = useCallback(() => {
    const random = SHORTCUTS[Math.floor(Math.random() * SHORTCUTS.length)];
    setCurrent(random);
    setStatus("waiting");
    setPressedKeys(new Set());
  }, []);

  useEffect(() => {
    nextChallenge();
  }, [nextChallenge]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status === "correct") return;

      e.preventDefault();
      const key = e.key;

      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    };

    const handleKeyUp = (e) => {
      // Logic to remove key on keyup is tricky because if they release one key
      // but held the combo correctly for a moment, it should count.
      // But usually shortcuts are instantaneous.
      // We'll reset pressedKeys on KeyUp if the user failed or released all.
      if (
        e.key === "Control" ||
        e.key === "Shift" ||
        e.key === "Alt" ||
        e.key === "Meta"
      ) {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(e.key);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [status]);

  // Check Logic
  useEffect(() => {
    if (!current || status === "correct") return;

    const checkKeys = () => {
      // Check if all current.keys are in pressedKeys
      const allPressed = current.keys.every((k) => {
        // Handle Control/Command logic roughly
        if (k === "Control")
          return pressedKeys.has("Control") || pressedKeys.has("Meta");
        return (
          pressedKeys.has(k) ||
          pressedKeys.has(k.toLowerCase()) ||
          pressedKeys.has(k.toUpperCase())
        );
      });

      // Only allow if NO extra keys are pressed (approximately)
      // Actually, strict partial matching is better for UX
      if (allPressed) {
        setStatus("correct");
        setStreak((s) => s + 1);
        setTimeout(() => nextChallenge(), 1000);
      }
    };

    checkKeys();
  }, [pressedKeys, current, nextChallenge, status]);

  return (
    <div className="shortcut-container">
      <div className="streak-badge">🔥 Streak: {streak}</div>

      <div className="challenge-card">
        <h3>Perform this action:</h3>
        <h1 className="action-label">{current?.label}</h1>

        <div
          className={`combo-display ${status === "correct" ? "success" : ""}`}
        >
          {current?.keys.map((k, i) => (
            <React.Fragment key={i}>
              <kbd
                className={`key-cap ${
                  pressedKeys.has(k) ||
                  (k === "Control" && pressedKeys.has("Meta"))
                    ? "pressed"
                    : ""
                }`}
              >
                {k === "Control" ? "Ctrl" : k.toUpperCase()}
              </kbd>
              {i < current.keys.length - 1 && <span className="plus">+</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="feedback-message">
          {status === "correct" && (
            <span className="text-success">
              <Check /> Correct!
            </span>
          )}
          {status === "waiting" && (
            <span className="text-muted">Press the key combination...</span>
          )}
        </div>
      </div>

      <button className="btn mt-4" onClick={nextChallenge}>
        <Shuffle size={16} /> Skip
      </button>
    </div>
  );
};

export default ShortcutTest;
