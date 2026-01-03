import React from "react";
import { NavLink } from "react-router-dom";
import { Keyboard, Home } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <Keyboard />
        <span>
          IO<span style={{ color: "var(--accent-cyan)" }}>Verse</span>
        </span>
      </NavLink>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
