import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import KeyboardPage from "./pages/KeyboardPage";
import SpeedPage from "./pages/SpeedPage";
import LcdPage from "./pages/LcdPage";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/keyboard" element={<KeyboardPage />} />
          <Route path="/speed" element={<SpeedPage />} />
          <Route path="/lcd" element={<LcdPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
