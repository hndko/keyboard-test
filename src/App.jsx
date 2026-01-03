import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import KeyboardPage from "./pages/KeyboardPage";
import SpeedPage from "./pages/SpeedPage";
import LcdPage from "./pages/LcdPage";
import MousePage from "./pages/MousePage";
import GamepadPage from "./pages/GamepadPage";
import GhostingPage from "./pages/GhostingPage";
import HzPage from "./pages/HzPage";
import AudioPage from "./pages/AudioPage";
import AimPage from "./pages/AimPage";
import ShortcutPage from "./pages/ShortcutPage";
import SoundPage from "./pages/SoundPage";
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
      </Routes>
    </SoundProvider>
  );
}

export default App;
