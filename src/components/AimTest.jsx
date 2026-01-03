import React, { useState, useEffect, useRef } from "react";
import { Target, Play, RotateCcw, Crosshair } from "lucide-react";
import "../styles/skills.css";

const AimTest = () => {
  const [gameState, setGameState] = useState("idle"); // idle, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);

  // Canvas or DOM? DOM is easier for simple clicks/accessibility
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    spawnTarget();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    setGameState("finished");
    setTargets([]);
  };

  const spawnTarget = () => {
    if (!containerRef.current) return;

    const size = Math.random() * 40 + 40; // 40px to 80px
    const boardRect = containerRef.current.getBoundingClientRect();

    const x = Math.random() * (boardRect.width - size);
    const y = Math.random() * (boardRect.height - size);

    const id = Date.now() + Math.random();

    setTargets((prev) => [...prev, { id, x, y, size, createdAt: Date.now() }]);
  };

  const handleTargetClick = (id, e) => {
    e.stopPropagation();
    setScore((s) => s + 1);
    setTargets((prev) => prev.filter((t) => t.id !== id));
    spawnTarget();
  };

  const handleMiss = () => {
    if (gameState === "playing") {
      setScore((s) => Math.max(0, s - 1)); // Penalty for miss
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="aim-container">
      <div className="aim-stats">
        <div className="stat-box">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="stat-box">
          <span>Time</span>
          <strong>{timeLeft}s</strong>
        </div>
      </div>

      <div
        className={`game-board ${gameState === "playing" ? "active" : ""}`}
        ref={containerRef}
        onMouseDown={handleMiss}
      >
        {gameState === "idle" && (
          <div className="overlay">
            <Crosshair size={64} className="mb-4 text-cyan" />
            <h2>Precision Test</h2>
            <p>Click the targets as fast as you can.</p>
            <button className="btn btn-primary mt-4" onClick={startGame}>
              <Play size={20} /> Start Game
            </button>
          </div>
        )}

        {gameState === "finished" && (
          <div className="overlay">
            <h2>Time's Up!</h2>
            <p className="final-score">
              Final Score: <span>{score}</span>
            </p>
            <p>Average: {(score / 30).toFixed(2)} hits/sec</p>
            <button className="btn btn-primary mt-4" onClick={startGame}>
              <RotateCcw size={20} /> Play Again
            </button>
          </div>
        )}

        {targets.map((t) => (
          <div
            key={t.id}
            className="target"
            style={{
              left: t.x,
              top: t.y,
              width: t.size,
              height: t.size,
            }}
            onMouseDown={(e) => handleTargetClick(t.id, e)}
          >
            <div className="bullseye"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AimTest;
