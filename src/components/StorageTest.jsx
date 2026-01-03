import React, { useState, useEffect } from "react";
import { Database, HardDrive, AlertTriangle } from "lucide-react";
import "../styles/visuals.css";

const StorageTest = () => {
  const [quota, setQuota] = useState(null);
  const [usage, setUsage] = useState(null);
  const [percent, setPercent] = useState(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage
        .estimate()
        .then((estimate) => {
          setUsage(estimate.usage);
          setQuota(estimate.quota);
          if (estimate.quota > 0) {
            setPercent((estimate.usage / estimate.quota) * 100);
          }
        })
        .catch((err) => {
          console.error(err);
          setSupported(false);
        });
    } else {
      setSupported(false);
    }
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="storage-container">
      {!supported ? (
        <div className="error-card">
          <AlertTriangle size={48} className="text-red" />
          <h3>Storage API Not Supported</h3>
          <p>Your browser doesn't expose storage quota estimates.</p>
        </div>
      ) : (
        <div className="storage-card">
          <div className="storage-header">
            <Database size={48} className="text-cyan" />
            <h2>Browser Storage</h2>
          </div>

          <div className="storage-visual">
            <div className="pie-chart-mock">
              <div
                className="pie-fill"
                style={{ transform: `rotate(${percent * 1.8}deg)` }}
              ></div>
              {/* Simple CSS pie chart approximation */}
              <div className="pie-center">
                <span className="pie-val">{percent.toFixed(2)}%</span>
                <span className="pie-label">Used</span>
              </div>
            </div>
          </div>

          <div className="storage-stats">
            <div className="stat-row">
              <span className="label">Usage:</span>
              <span className="val text-white">{formatBytes(usage)}</span>
            </div>
            <div className="stat-row">
              <span className="label">Quota (Est.):</span>
              <span className="val text-green">{formatBytes(quota)}</span>
            </div>
            <div className="stat-row">
              <span className="label">Remaining:</span>
              <span className="val text-secondary">
                {formatBytes(quota - usage)}
              </span>
            </div>
          </div>

          <p className="note">
            * This Quota represents the temporary storage allocated to this
            Origin (domain) by the browser. It is NOT your total hard drive
            space.
          </p>
        </div>
      )}
    </div>
  );
};

export default StorageTest;
