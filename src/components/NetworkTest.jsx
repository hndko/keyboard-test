import React, { useState, useEffect } from "react";
import { Wifi, Signal, Globe, Clock } from "lucide-react";
import "../styles/sensors.css";

const NetworkTest = () => {
  const [info, setInfo] = useState({});
  const [online, setOnline] = useState(navigator.onLine);
  const [rtt, setRtt] = useState(null);
  const [testingPing, setTestingPing] = useState(false);

  useEffect(() => {
    const updateInfo = () => {
      const conn =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (conn) {
        setInfo({
          ...info,
          type: conn.effectiveType, // '4g', '3g', etc.
          downlink: conn.downlink, // Mb/s
          rtt: conn.rtt, // ms
          saveData: conn.saveData,
        });
      }
    };

    updateInfo();
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));

    const conn =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (conn) {
      conn.addEventListener("change", updateInfo);
    }

    return () => {
      window.removeEventListener("online", () => setOnline(true));
      window.removeEventListener("offline", () => setOnline(false));
      if (conn) conn.removeEventListener("change", updateInfo);
    };
  }, []);

  const measurePing = async () => {
    setTestingPing(true);
    const start = Date.now();
    try {
      // Fetch a small resource from a reliable CDN
      await fetch("https://files.hndko.com/ping/pixel.txt", {
        mode: "no-cors",
        cache: "no-cache",
      });
      // Note: no-cors means we can't see the response, but the promise resolves when headers are received.
      // Better to use a timestamp endpoint if possible, but for simple latency check this works roughly.
      const end = Date.now();
      setRtt(end - start);
    } catch (e) {
      console.error("Ping failed", e);
      // Fallback for failure
      setRtt("Error");
    }
    setTestingPing(false);
  };

  return (
    <div className="sensor-container">
      <div className={`network-status ${online ? "online" : "offline"}`}>
        {online ? (
          <Globe className="status-icon" />
        ) : (
          <Wifi className="status-icon off" />
        )}
        <h1>{online ? "Connected" : "Offline"}</h1>
      </div>

      <div className="sensor-grid">
        <div className="sensor-card">
          <div className="card-title">
            <Signal size={24} /> Connection Info (Est.)
          </div>
          <div className="data-list">
            <div className="data-row">
              <span>Effective Type</span>
              <strong>{info.type ? info.type.toUpperCase() : "Unknown"}</strong>
            </div>
            <div className="data-row">
              <span>Downlink Max</span>
              <strong>{info.downlink ? `~${info.downlink} Mbps` : "--"}</strong>
            </div>
            <div className="data-row">
              <span>Est. RTT</span>
              <strong>{info.rtt ? `${info.rtt} ms` : "--"}</strong>
            </div>
          </div>
        </div>

        <div className="sensor-card">
          <div className="card-title">
            <Clock size={24} /> Live Latency Test
          </div>

          <div className="ping-display">
            <span className="ping-value">{rtt !== null ? rtt : "--"}</span>
            <span className="ping-unit">ms</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={measurePing}
            disabled={testingPing || !online}
          >
            {testingPing ? "Pinging..." : "Test Latency"}
          </button>
          <p className="description-small">Measures round-trip time to CDN.</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkTest;
