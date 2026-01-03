import React, { useState, useEffect, useRef } from "react";
import "../styles/gamepad.css";
import { Gamepad2, AlertTriangle, Info } from "lucide-react";

const GamepadTest = () => {
  const [gamepad, setGamepad] = useState(null);
  const [connected, setConnected] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    const handleConnect = (e) => {
      console.log("Gamepad connected:", e.gamepad);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Gamepad disconnected");
      setConnected(false);
      setGamepad(null);
    };

    window.addEventListener("gamepadconnected", handleConnect);
    window.addEventListener("gamepaddisconnected", handleDisconnect);

    const updateLoop = () => {
      const gamepads = navigator.getGamepads();
      if (gamepads && gamepads[0]) {
        setGamepad(gamepads[0]);
        setConnected(true);
      }
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    return () => {
      window.removeEventListener("gamepadconnected", handleConnect);
      window.removeEventListener("gamepaddisconnected", handleDisconnect);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Standard Mapping (Xbox Style)
  // B0: A, B1: B, B2: X, B3: Y
  // B4: LB, B5: RB, B6: LT, B7: RT
  // B8: View, B9: Menu, B10: LStick, B11: RStick
  // B12: Up, B13: Down, B14: Left, B15: Right

  const isPressed = (idx) => gamepad?.buttons[idx]?.pressed;
  const getValue = (idx) => gamepad?.buttons[idx]?.value || 0;

  // Axes: 0=LX, 1=LY, 2=RX, 3=RY
  const getAxis = (idx) => {
    const val = gamepad?.axes[idx] || 0;
    return Math.abs(val) > 0.05 ? val : 0; // Deadzone
  };

  if (!connected) {
    return (
      <div className="gamepad-container empty">
        <Gamepad2 size={64} className="pulse-icon" />
        <h2>No Controller Detected</h2>
        <p>
          Connect your Xbox, PlayStation, or generic controller and press any
          button.
        </p>
      </div>
    );
  }

  return (
    <div className="gamepad-container">
      <div className="controller-header">
        <span className="device-name">
          <Gamepad2 size={20} /> {gamepad.id.split("(")[0]}
        </span>
      </div>

      <div className="controller-visualizer">
        <div className="controller-body">
          {/* Triggers & Bumpers */}
          <div
            className={`btn-trigger left ${isPressed(6) ? "active" : ""}`}
            style={{ "--val": getValue(6) }}
          >
            LT
          </div>
          <div
            className={`btn-trigger right ${isPressed(7) ? "active" : ""}`}
            style={{ "--val": getValue(7) }}
          >
            RT
          </div>
          <div className={`btn-bumper left ${isPressed(4) ? "active" : ""}`}>
            LB
          </div>
          <div className={`btn-bumper right ${isPressed(5) ? "active" : ""}`}>
            RB
          </div>

          {/* D-Pad */}
          <div className="dpad-group">
            <div
              className={`dpad-btn up ${isPressed(12) ? "active" : ""}`}
            ></div>
            <div
              className={`dpad-btn down ${isPressed(13) ? "active" : ""}`}
            ></div>
            <div
              className={`dpad-btn left ${isPressed(14) ? "active" : ""}`}
            ></div>
            <div
              className={`dpad-btn right ${isPressed(15) ? "active" : ""}`}
            ></div>
          </div>

          {/* Sticks */}
          <div className="stick-group left">
            <div className={`stick-base ${isPressed(10) ? "active" : ""}`}>
              <div
                className="stick-head"
                style={{
                  transform: `translate(${getAxis(0) * 20}px, ${
                    getAxis(1) * 20
                  }px)`,
                }}
              ></div>
            </div>
          </div>

          <div className="stick-group right">
            <div className={`stick-base ${isPressed(11) ? "active" : ""}`}>
              <div
                className="stick-head"
                style={{
                  transform: `translate(${getAxis(2) * 20}px, ${
                    getAxis(3) * 20
                  }px)`,
                }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-group">
            <div className={`face-btn y ${isPressed(3) ? "active" : ""}`}>
              Y
            </div>
            <div className={`face-btn x ${isPressed(2) ? "active" : ""}`}>
              X
            </div>
            <div className={`face-btn a ${isPressed(0) ? "active" : ""}`}>
              A
            </div>
            <div className={`face-btn b ${isPressed(1) ? "active" : ""}`}>
              B
            </div>
          </div>

          {/* Center Buttons */}
          <div className="center-group">
            <div
              className={`center-btn back ${isPressed(8) ? "active" : ""}`}
            ></div>
            <div
              className={`center-btn start ${isPressed(9) ? "active" : ""}`}
            ></div>
          </div>
        </div>
      </div>

      <div className="drift-monitor">
        <div className="axis-readout">
          <h4>Left Stick Drift</h4>
          <div className="axis-bars">
            <div className="axis-row">
              <span>X: {gamepad.axes[0].toFixed(5)}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(gamepad.axes[0] + 1) * 50}%` }}
                ></div>
              </div>
            </div>
            <div className="axis-row">
              <span>Y: {gamepad.axes[1].toFixed(5)}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(gamepad.axes[1] + 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="axis-readout">
          <h4>Right Stick Drift</h4>
          <div className="axis-bars">
            <div className="axis-row">
              <span>X: {gamepad.axes[2].toFixed(5)}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(gamepad.axes[2] + 1) * 50}%` }}
                ></div>
              </div>
            </div>
            <div className="axis-row">
              <span>Y: {gamepad.axes[3].toFixed(5)}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(gamepad.axes[3] + 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamepadTest;
