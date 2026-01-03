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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/keyboard" element={<KeyboardPage />} />
        <Route path="/speed" element={<SpeedPage />} />
        <Route path="/lcd" element={<LcdPage />} />
        <Route path="/mouse" element={<MousePage />} />
        <Route path="/gamepad" element={<GamepadPage />} />
        <Route path="/ghosting" element={<GhostingPage />} />
      </Routes>
    </>
  );
}

export default App;
