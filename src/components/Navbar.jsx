import React from "react";
import { NavLink } from "react-router-dom";
import { Keyboard, Zap, Monitor, Home } from "lucide-react";
import "../styles/index.css";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/keyboard", label: "Keyboard Test", icon: <Keyboard size={20} /> },
    { path: "/speed", label: "Speed Test", icon: <Zap size={20} /> },
    { path: "/lcd", label: "LCD Test", icon: <Monitor size={20} /> },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "rgba(19, 19, 31, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "var(--accent-cyan)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Keyboard />
        <span>
          KeyTest<span style={{ color: "#fff" }}>.io</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
              fontWeight: isActive ? 600 : 500,
              transition: "color 0.2s ease",
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
