import React, { useState, useEffect } from "react";
import { Compass, Rotate3d, Info } from "lucide-react";
import "../styles/sensors.css";

const MotionTest = () => {
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [supported, setSupported] = useState(true);

  const handleOrientation = (e) => {
    setOrientation({
      alpha: e.alpha || 0, // Compass direction
      beta: e.beta || 0, // Front/Back tilt
      gamma: e.gamma || 0, // Left/Right tilt
    });
  };

  const handleMotion = (e) => {
    setMotion({
      x: e.accelerationIncludingGravity?.x || 0,
      y: e.accelerationIncludingGravity?.y || 0,
      z: e.accelerationIncludingGravity?.z || 0,
    });
  };

  const requestAccess = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        } else {
          alert("Permission denied");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setPermissionGranted(true); // Non-iOS 13+ devices usually don't need requestPermission
    }
  };

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("devicemotion", handleMotion);
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [permissionGranted]);

  // Check if likely supported (simple check)
  useEffect(() => {
    if (!window.DeviceOrientationEvent) setSupported(false);
  }, []);

  return (
    <div className="sensor-container">
      <div className="sensor-header">
        <h2>Motion Sensors</h2>
        {!permissionGranted && supported && (
          <button className="btn btn-primary" onClick={requestAccess}>
            Enable Sensors
          </button>
        )}
      </div>

      <div className="sensor-grid">
        {/* Gyroscope Card */}
        <div className="sensor-card">
          <div className="card-title">
            <Compass className="icon-cyan" /> Gyroscope (Orientation)
          </div>

          <div className="visualizer-3d">
            <div
              className="cube"
              style={{
                transform: `rotateX(${orientation.beta}deg) rotateY(${orientation.gamma}deg) rotateZ(${orientation.alpha}deg)`,
              }}
            >
              <div className="face front">IO</div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>

          <div className="data-row">
            <div className="data-item">
              <label>Alpha (Z)</label>
              <span>{Math.round(orientation.alpha)}°</span>
            </div>
            <div className="data-item">
              <label>Beta (X)</label>
              <span>{Math.round(orientation.beta)}°</span>
            </div>
            <div className="data-item">
              <label>Gamma (Y)</label>
              <span>{Math.round(orientation.gamma)}°</span>
            </div>
          </div>
        </div>

        {/* Accelerometer Card */}
        <div className="sensor-card">
          <div className="card-title">
            <Rotate3d className="icon-purple" /> Accelerometer
          </div>

          <div className="bars-container">
            <div className="bar-group">
              <div className="bar-track">
                <div
                  className="bar-fill x"
                  style={{
                    height: `${Math.min(Math.abs(motion.x) * 10, 100)}%`,
                  }}
                ></div>
              </div>
              <span>X: {motion.x.toFixed(2)}</span>
            </div>
            <div className="bar-group">
              <div className="bar-track">
                <div
                  className="bar-fill y"
                  style={{
                    height: `${Math.min(Math.abs(motion.y) * 10, 100)}%`,
                  }}
                ></div>
              </div>
              <span>Y: {motion.y.toFixed(2)}</span>
            </div>
            <div className="bar-group">
              <div className="bar-track">
                <div
                  className="bar-fill z"
                  style={{
                    height: `${Math.min(Math.abs(motion.z) * 10, 100)}%`,
                  }}
                ></div>
              </div>
              <span>Z: {motion.z.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {!supported && (
        <p className="error-text">Sensors not supported on this device.</p>
      )}
    </div>
  );
};

export default MotionTest;
