import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [soundType, setSoundType] = useState("mech"); // 'mech', 'typewriter'

  const AudioContextRef = useRef(null);

  // Initializer for AudioContext (must be user triggered ideally, but we'll try lazy load)
  const getContext = () => {
    if (!AudioContextRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) AudioContextRef.current = new Ctx();
    }
    return AudioContextRef.current;
  };

  const playClick = () => {
    if (!isEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    // Resume if suspended
    if (ctx.state === "suspended") ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Synthesize a "Thock" or "Click"
    // Burst of noise + brief sine blip

    // 1. Filtered Noise (The housing sound)
    const bufferSize = ctx.sampleRate * 0.1; // 0.1 sec
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter the noise to make it "Thocky" (Low pass)
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, t);

    // Envelope
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    // 2. High frequency click (switch leaf)
    if (soundType === "mech") {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(2000, t);
      clickOsc.frequency.exponentialRampToValueAtTime(100, t + 0.03);

      clickGain.gain.setValueAtTime(volume * 0.3, t);
      clickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.03);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(t + 0.05);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.repeat) playClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnabled, volume, soundType]);

  return (
    <SoundContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
        volume,
        setVolume,
        soundType,
        setSoundType,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
