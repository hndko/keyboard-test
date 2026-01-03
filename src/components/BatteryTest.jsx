import React, { useState, useEffect } from "react";
import {
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
} from "lucide-react";
import "../styles/utilities.css";

const BatteryTest = () => {
  const [battery, setBattery] = useState(null);
  const [level, setLevel] = useState(0);
  const [charging, setCharging] = useState(false);
  const [chargingTime, setChargingTime] = useState(0);
  const [dischargingTime, setDischargingTime] = useState(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((batt) => {
        setBattery(batt);
        updateBatteryInfo(batt);

        batt.addEventListener("levelchange", () => updateBatteryInfo(batt));
        batt.addEventListener("chargingchange", () => updateBatteryInfo(batt));
        batt.addEventListener("chargingtimechange", () =>
          updateBatteryInfo(batt)
        );
        batt.addEventListener("dischargingtimechange", () =>
          updateBatteryInfo(batt)
        );
      });
    } else {
      setSupported(false);
    }

    return () => {
      // Cleanup listeners if possible (batt object persists but good practice)
    };
  }, []);

  const updateBatteryInfo = (batt) => {
    setLevel(batt.level * 100);
    setCharging(batt.charging);
    setChargingTime(batt.chargingTime);
    setDischargingTime(batt.dischargingTime);
  };

  const getIcon = () => {
    if (charging)
      return (
        <BatteryCharging size={64} className="text-cyan animation-pulse" />
      );
    if (level > 90) return <BatteryFull size={64} className="text-green" />;
    if (level > 40) return <BatteryMedium size={64} className="text-yellow" />;
    return <BatteryLow size={64} className="text-red" />;
  };

  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return "Calculating...";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  if (!supported) {
    return (
      <div className="battery-container">
        <div className="battery-card">
          <BatteryWarning size={64} className="text-red" />
          <h2>Not Supported</h2>
          <p>Your browser does not support the Battery Status API.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="battery-container">
      <div className={`battery-card ${charging ? "charging" : ""}`}>
        <div className="battery-header">
          {getIcon()}
          <div className="level-display">
            <span className="percent">{Math.round(level)}%</span>
            <span className="status">
              {charging ? "Charging" : "On Battery"}
            </span>
          </div>
        </div>

        <div className="battery-fill-bar">
          <div
            className="fill"
            style={{
              width: `${level}%`,
              backgroundColor:
                level < 20
                  ? "var(--accent-red)"
                  : charging
                  ? "var(--accent-cyan)"
                  : "var(--accent-green)",
            }}
          ></div>
        </div>

        <div className="battery-details">
          <div className="detail-item">
            <span className="label">Status</span>
            <span className="value">
              {charging ? "Plugged In" : "Discharging"}
            </span>
          </div>

          {charging ? (
            <div className="detail-item">
              <span className="label">Time to Full</span>
              <span className="value">{formatTime(chargingTime)}</span>
            </div>
          ) : (
            <div className="detail-item">
              <span className="label">Time Remaining</span>
              <span className="value">{formatTime(dischargingTime)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatteryTest;
