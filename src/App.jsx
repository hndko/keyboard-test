import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Inputs
import KeyboardPage from "./pages/inputs/KeyboardPage";
import MousePage from "./pages/inputs/MousePage";
import GamepadPage from "./pages/inputs/GamepadPage";
import GhostingPage from "./pages/inputs/GhostingPage";
import SpeedPage from "./pages/inputs/SpeedPage";
import AimPage from "./pages/inputs/AimPage";
import ShortcutPage from "./pages/inputs/ShortcutPage";
import TypingPage from "./pages/inputs/TypingPage";

// Display
import LcdPage from "./pages/display/LcdPage";
import HzPage from "./pages/display/HzPage";
import DeadPixelPage from "./pages/display/DeadPixelPage";
import ColorPage from "./pages/display/ColorPage";

// Media
import AudioPage from "./pages/media/AudioPage";
import MicrophonePage from "./pages/media/MicrophonePage";
import WebcamPage from "./pages/media/WebcamPage";
import SoundPage from "./pages/media/SoundPage";
import TtsPage from "./pages/media/TtsPage";

// System
import BatteryPage from "./pages/system/BatteryPage";
import NetworkPage from "./pages/system/NetworkPage";
import StoragePage from "./pages/system/StoragePage";
import MotionPage from "./pages/system/MotionPage";
import LocationPage from "./pages/system/LocationPage";

// Mobile
import TouchPage from "./pages/mobile/TouchPage";
import VibrationPage from "./pages/mobile/VibrationPage";

import { SoundProvider } from "./context/SoundContext";

function App() {
  return (
    <SoundProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/keyboard" element={<KeyboardPage />} />
        <Route path="/speed" element={<SpeedPage />} />
        <Route path="/lcd" element={<LcdPage />} />
        <Route path="/mouse" element={<MousePage />} />
        <Route path="/gamepad" element={<GamepadPage />} />
        <Route path="/ghosting" element={<GhostingPage />} />
        <Route path="/hz" element={<HzPage />} />
        <Route path="/audio" element={<AudioPage />} />
        <Route path="/aim" element={<AimPage />} />
        <Route path="/shortcuts" element={<ShortcutPage />} />
        <Route path="/sound" element={<SoundPage />} />
        <Route path="/mic" element={<MicrophonePage />} />
        <Route path="/webcam" element={<WebcamPage />} />
        <Route path="/deadpixel" element={<DeadPixelPage />} />
        <Route path="/typing" element={<TypingPage />} />
        <Route path="/battery" element={<BatteryPage />} />
        <Route path="/touch" element={<TouchPage />} />
        <Route path="/vibration" element={<VibrationPage />} />
        <Route path="/motion" element={<MotionPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/color" element={<ColorPage />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="/tts" element={<TtsPage />} />
      </Routes>
    </SoundProvider>
  );
}

export default App;
