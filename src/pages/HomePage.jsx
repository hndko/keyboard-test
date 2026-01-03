import React from "react";
import { NavLink } from "react-router-dom";
import {
  Keyboard,
  Zap,
  Monitor,
  MousePointer2,
  Gamepad2,
  Target,
  Headphones,
  Layers,
  Search,
  Mic,
  Camera,
  Music,
  Activity,
  Maximize,
  Battery,
  Smartphone,
  Fingerprint,
  Vibrate,
  Radar,
  Compass,
  MapPin,
  Wifi,
  Palette,
  Database,
  Volume2,
} from "lucide-react";
import "../styles/index.css";
import "../styles/home.css";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Keyboard,
  Zap,
  Monitor,
  MousePointer2,
  Gamepad2,
  Target,
  Headphones,
  Layers,
  Search,
  Mic,
  Camera,
  Music,
  Activity,
  Maximize,
  Battery,
  Smartphone,
  Fingerprint,
  Vibrate,
  Radar,
  Compass,
  MapPin,
  Wifi,
  Palette,
  Database,
  Volume2,
  Grid,
} from "lucide-react";
import "../styles/index.css";
import "../styles/home.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    {
      id: "inputs",
      title: "Inputs",
      icon: <Keyboard size={18} />,
      tools: [
        {
          path: "/keyboard",
          label: "Keyboard Test",
          icon: <Keyboard size={32} />,
          desc: "104-Key Layout Check",
        },
        {
          path: "/mouse",
          label: "Mouse Tester",
          icon: <MousePointer2 size={32} />,
          desc: "Polling Rate & Clicks",
        },
        {
          path: "/gamepad",
          label: "Gamepad",
          icon: <Gamepad2 size={32} />,
          desc: "Drift & Input Test",
        },
        {
          path: "/ghosting",
          label: "Anti-Ghosting",
          icon: <Layers size={32} />,
          desc: "N-Key Rollover",
        },
        {
          path: "/touch",
          label: "Touch Screen",
          icon: <Fingerprint size={32} />,
          desc: "Multi-Touch Test",
        },
      ],
    },
    {
      id: "media",
      title: "Media",
      icon: <Headphones size={18} />,
      tools: [
        {
          path: "/audio",
          label: "Stereo Audio",
          icon: <Headphones size={32} />,
          desc: "L/R Channel Check",
        },
        {
          path: "/mic",
          label: "Microphone",
          icon: <Mic size={32} />,
          desc: "Waveform Input",
        },
        {
          path: "/webcam",
          label: "Webcam",
          icon: <Camera size={32} />,
          desc: "Video Feed Check",
        },
        {
          path: "/tts",
          label: "Text to Speech",
          icon: <Volume2 size={32} />,
          desc: "Voice Synthesis",
        },
        {
          path: "/sound",
          label: "Mech Sounds",
          icon: <Music size={32} />,
          desc: "Switch Simulator",
        },
      ],
    },
    {
      id: "display",
      title: "Display",
      icon: <Monitor size={18} />,
      tools: [
        {
          path: "/lcd",
          label: "LCD Pixels",
          icon: <Monitor size={32} />,
          desc: "Dead Pixel Check",
        },
        {
          path: "/deadpixel",
          label: "Dead Pixel 2",
          icon: <Maximize size={32} />,
          desc: "Fullscreen Cycler",
          new: true,
        },
        {
          path: "/color",
          label: "Color Guard",
          icon: <Palette size={32} />,
          desc: "Gradient Banding",
          new: true,
        },
        {
          path: "/hz",
          label: "Refresh Rate",
          icon: <Activity size={32} />,
          desc: "FPS/Hz Monitor",
        },
      ],
    },
    {
      id: "system",
      title: "System",
      icon: <Activity size={18} />,
      tools: [
        {
          path: "/network",
          label: "Network",
          icon: <Wifi size={32} />,
          desc: "Speed & Latency",
          new: true,
        },
        {
          path: "/storage",
          label: "Storage",
          icon: <Database size={32} />,
          desc: "Quota Usage",
          new: true,
        },
        {
          path: "/battery",
          label: "Battery",
          icon: <Battery size={32} />,
          desc: "Power Status",
        },
        {
          path: "/vibration",
          label: "Vibration",
          icon: <Vibrate size={32} />,
          desc: "Haptics Test",
        },
      ],
    },
    {
      id: "sensors",
      title: "Sensors",
      icon: <Radar size={18} />,
      tools: [
        {
          path: "/motion",
          label: "Motion",
          icon: <Radar size={32} />,
          desc: "Gyro & Accel",
          new: true,
        },
        {
          path: "/location",
          label: "GPS",
          icon: <MapPin size={32} />,
          desc: "Coordinates",
          new: true,
        },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Target size={18} />,
      tools: [
        {
          path: "/speed",
          label: "Speed Test",
          icon: <Zap size={32} />,
          desc: "Typing Benchmark",
        },
        {
          path: "/typing",
          label: "Typing 2.0",
          icon: <Keyboard size={32} />,
          desc: "Advanced WPM",
          new: true,
        },
        {
          path: "/aim",
          label: "Aim Trainer",
          icon: <Target size={32} />,
          desc: "Reflex Game",
        },
        {
          path: "/shortcuts",
          label: "Shortcuts",
          icon: <Search size={32} />,
          desc: "VS Code Drill",
        },
      ],
    },
  ];

  const getFilteredTools = () => {
    if (activeTab === "All") {
      return categories.flatMap((cat) => cat.tools);
    }
    return categories.find((cat) => cat.title === activeTab)?.tools || [];
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>
          Welcome to <span className="text-gradient">IOVerse</span>
        </h1>
        <p className="subtitle">The Ultimate Utility Suite for your Gear.</p>
      </div>

      <div className="home-nav-tabs">
        <button
          className={`nav-tab ${activeTab === "All" ? "active" : ""}`}
          onClick={() => setActiveTab("All")}
        >
          <Grid size={16} /> All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`nav-tab ${activeTab === cat.title ? "active" : ""}`}
            onClick={() => setActiveTab(cat.title)}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div className="tools-grid-wrapper">
        <div className="tools-grid">
          {getFilteredTools().map((tool, index) => (
            <NavLink key={index} to={tool.path} className="card tool-card">
              <div className="card-icon">{tool.icon}</div>
              <h3>{tool.label}</h3>
              <p>{tool.desc}</p>
              {tool.new && <span className="badge-new">NEW</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
