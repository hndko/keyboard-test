import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraOff, Video, RefreshCw } from "lucide-react";
import "../styles/media-tools.css";

const WebcamTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [resolution, setResolution] = useState({ w: 0, h: 0 });
  const [isMirrored, setIsMirrored] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devs) => {
        const cams = devs.filter((d) => d.kind === "videoinput");
        setDevices(cams);
        if (cams.length > 0) setSelectedDeviceId(cams[0].deviceId);
      })
      .catch((err) => console.error(err));

    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (isActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        setResolution({
          w: videoRef.current.videoWidth,
          h: videoRef.current.videoHeight,
        });
        videoRef.current.play().catch((e) => console.error("Play error:", e));
      };
    }
  }, [isActive, stream]);

  const startCamera = async () => {
    try {
      setError(null);
      const constraints = {
        video: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(s);
      setIsActive(true);
    } catch (err) {
      console.error(err);
      if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setError(
          "Camera is in use by another application. Please close other apps and try again."
        );
      } else {
        setError("Could not access webcam. Please check permissions.");
      }
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setIsActive(false);
    setResolution({ w: 0, h: 0 });
  };

  const toggleCamera = () => {
    if (isActive) stopCamera();
    else startCamera();
  };

  return (
    <div className="webcam-container">
      <div className="mic-controls">
        {" "}
        {/* Reusing style container */}
        <div className="device-select">
          <label>Camera Device:</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={isActive}
          >
            {devices.map((device, i) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`btn mic-btn ${isActive ? "active" : ""}`}
          onClick={toggleCamera}
        >
          {isActive ? (
            <>
              <CameraOff size={20} /> Stop Cam
            </>
          ) : (
            <>
              <Camera size={20} /> Start Cam
            </>
          )}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="video-wrapper">
        {isActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`webcam-feed ${isMirrored ? "" : "no-mirror"}`}
            />
            <div className="cam-info">
              Resolution: {resolution.w} x {resolution.h}
            </div>
          </>
        ) : (
          <div className="video-placeholder">
            <Video size={64} style={{ opacity: 0.3 }} />
            <p>Camera is off</p>
          </div>
        )}
      </div>

      {isActive && (
        <div className="cam-controls">
          <button className="btn" onClick={() => setIsMirrored(!isMirrored)}>
            <RefreshCw size={16} />{" "}
            {isMirrored ? "Disable Mirror" : "Enable Mirror"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamTest;
