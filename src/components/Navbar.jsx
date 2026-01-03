import React from "react";
import { NavLink } from "react-router-dom";
import { Keyboard, Zap, Monitor, Home } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <Keyboard />
        <span>
          KeyTest<span style={{ color: "#fff" }}>.io</span>
        </span>
      </NavLink>

      {/* Menu items removed as per user request. Features are now on Home Page. */}
    </nav>
  );
};

export default Navbar;
