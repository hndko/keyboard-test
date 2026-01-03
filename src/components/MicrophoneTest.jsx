import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import "../styles/media-tools.css";

const MicrophoneTest = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Enumerate devices
    navigator.mediaDevices
      .enumerateDevices()
      .then((devs) => {
        const mics = devs.filter((d) => d.kind === "audioinput");
        setDevices(mics);
        if (mics.length > 0) setSelectedDeviceId(mics[0].deviceId);
      })
      .catch((err) => console.error(err));

    return () => stopListening();
  }, []);

  const startListening = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
        },
      });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      setIsListening(true);
      drawWaveform();
    } catch (err) {
      console.error(err);
      setError("Could not access microphone. Please allow permissions.");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    cancelAnimationFrame(requestRef.current);
    setIsListening(false);
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    requestRef.current = requestAnimationFrame(drawWaveform);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

    ctx.fillStyle = "#0f0f12"; // clear with bg color to blend
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00f3ff"; // Cyan
    ctx.beginPath();

    const sliceWidth = (width * 1.0) / dataArrayRef.current.length;
    let x = 0;

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const v = dataArrayRef.current[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  };

  const handleToggle = () => {
    if (isListening) stopListening();
    else startListening();
  };

  return (
    <div className="mic-container">
      <div className="mic-controls">
        <div className="device-select">
          <label>Input Device:</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={isListening}
          >
            {devices.map((device, i) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`btn mic-btn ${isListening ? "active" : ""}`}
          onClick={handleToggle}
        >
          {isListening ? (
            <>
              <MicOff size={20} /> Stop Test
            </>
          ) : (
            <>
              <Mic size={20} /> Start Test
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="visualizer-wrapper">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="waveform-canvas"
        />
        {!isListening && !error && (
          <div className="mic-placeholder">
            <Mic size={48} className="mic-icon-lg" />
            <p>Press Start to visualize your voice</p>
          </div>
        )}
      </div>

      <div className="tips">
        <p>Speak into your microphone to see the waveform response.</p>
      </div>
    </div>
  );
};

export default MicrophoneTest;
