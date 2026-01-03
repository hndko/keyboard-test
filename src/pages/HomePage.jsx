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

const HomePage = () => {
  const categories = [
    {
      title: "Core Input Tools",
      description: "Test your primary peripherals.",
      tools: [
        {
          path: "/keyboard",
          label: "Keyboard Test",
          icon: <Keyboard size={32} />,
          desc: "104-Key, NKRO & Layout Check",
        },
        {
          path: "/mouse",
          label: "Mouse Tester",
          icon: <MousePointer2 size={32} />,
          desc: "Polling Rate & Double Click",
        },
        {
          path: "/gamepad",
          label: "Gamepad Tester",
          icon: <Gamepad2 size={32} />,
          desc: "Drift Check & Input Test",
        },
        {
          path: "/ghosting",
          label: "Anti-Ghosting",
          icon: <Layers size={32} />,
          desc: "N-Key Rollover Test",
        },
      ],
    },
    {
      title: "Skill & Performance",
      description: "Measure your reaction and speed.",
      tools: [
        {
          path: "/speed",
          label: "Speed Test",
          icon: <Zap size={32} />,
          desc: "WPM & Accuracy Typing",
        },
        {
          path: "/aim",
          label: "Aim Trainer",
          icon: <Target size={32} />,
          desc: "Reflex & Precision Game",
        },
        {
          path: "/shortcuts",
          label: "Shortcut Master",
          icon: <Keyboard size={32} />,
          desc: "Learn VS Code Shortcuts",
        },
      ],
    },
    {
      title: "Display & Audio",
      description: "Diagnostics for screen and sound.",
      tools: [
        {
          path: "/lcd",
          label: "LCD Pixel Test",
          icon: <Monitor size={32} />,
          desc: "Dead Pixel Check",
        },
        {
          path: "/hz",
          label: "Refresh Rate",
          icon: <Activity size={32} />,
          desc: "Real Hz/FPS Monitor",
        },
        {
          path: "/audio",
          label: "Stereo Test",
          icon: <Headphones size={32} />,
          desc: "L/R Channel Check",
        },
        {
          path: "/mic",
          label: "Microphone",
          icon: <Mic size={32} />,
          desc: "Waveform Input Test",
        },
        {
          path: "/webcam",
          label: "Webcam",
          icon: <Camera size={32} />,
          desc: "Video Feed & Resolution",
        },
      ],
    },
    {
      title: "Experimental",
      description: "Fun additions.",
      tools: [
        {
          path: "/sound",
          label: "Switch Sounds",
          icon: <Music size={32} />,
          desc: "Mech Keyboard Simulator",
        },
      ],
    },
    {
      title: "Utilities",
      description: "Useful tools for diagnosis.",
      tools: [
        {
          path: "/deadpixel",
          label: "Dead Pixel",
          icon: <Maximize size={32} />,
          desc: "Screen Color Cycler",
        },
        {
          path: "/color",
          label: "Color Guard",
          icon: <Palette size={32} />,
          desc: "Gradient Banding Test",
        },
        {
          path: "/typing",
          label: "Typing Speed",
          icon: <Keyboard size={32} />,
          desc: "WPM and Accuracy",
        },
        {
          path: "/battery",
          label: "Battery Info",
          icon: <Battery size={32} />,
          desc: "Power & Charging Status",
        },
        {
          path: "/storage",
          label: "Storage",
          icon: <Database size={32} />,
          desc: "Quota Usage",
        },
        {
          path: "/tts",
          label: "Text to Speech",
          icon: <Volume2 size={32} />,
          desc: "Voice Synthesis",
        },
      ],
    },
    {
      title: "Mobile Tools",
      description: "Touch and Haptics testing.",
      tools: [
        {
          path: "/touch",
          label: "Touch Screen",
          icon: <Fingerprint size={32} />,
          desc: "Multi-Touch Visualizer",
        },
        {
          path: "/vibration",
          label: "Vibration",
          icon: <Vibrate size={32} />,
          desc: "Haptic Feedback Test",
        },
      ],
    },
    {
      title: "Sensors & Network",
      description: "Environment and connectivity.",
      tools: [
        {
          path: "/motion",
          label: "Motion",
          icon: <Radar size={32} />,
          desc: "Gyro & Accel Visualizer",
        },
        {
          path: "/location",
          label: "GPS Location",
          icon: <MapPin size={32} />,
          desc: "Coordinates & Altitude",
        },
        {
          path: "/network",
          label: "Network",
          icon: <Wifi size={32} />,
          desc: "Speed & Latency",
        },
      ],
    },
  ];

  return (
    <div className="container">
      <div className="hero">
        <h1>
          Welcome to <span className="text-gradient">IOVerse</span>
        </h1>
        <p className="subtitle">The Ultimate Utility Suite for your Gear.</p>
      </div>

      <div className="tools-grid-wrapper">
        {categories.map((cat, index) => (
          <div key={index} className="category-section">
            <h2 className="category-title">{cat.title}</h2>
            <p className="category-desc">{cat.description}</p>
            <div className="tools-grid">
              {cat.tools.map((tool, tIndex) => (
                <NavLink
                  key={tIndex}
                  to={tool.upcoming ? "#" : tool.path}
                  className={`card tool-card ${
                    tool.upcoming ? "upcoming" : ""
                  }`}
                  onClick={(e) => tool.upcoming && e.preventDefault()}
                >
                  <div className="card-icon">{tool.icon}</div>
                  <h3>{tool.label}</h3>
                  <p>{tool.desc}</p>
                  {tool.upcoming && (
                    <span className="badge-upcoming">Soon</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
