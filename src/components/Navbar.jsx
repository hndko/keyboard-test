import React from "react";
import { NavLink } from "react-router-dom";
import { Keyboard, Zap, Monitor, Home } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/keyboard", label: "Keyboard Test", icon: <Keyboard size={20} /> },
    { path: "/speed", label: "Speed Test", icon: <Zap size={20} /> },
    { path: "/lcd", label: "LCD Test", icon: <Monitor size={20} /> },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Keyboard />
        <span>
          KeyTest<span style={{ color: "#fff" }}>.io</span>
        </span>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
