
import React from "react";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          🤖 Robot Navigator
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end>
            Головна
          </NavLink>

          <NavLink to="/simulator">
            Симулятор
          </NavLink>

          <NavLink to="/settings">
            Налаштування
          </NavLink>

          <NavLink to="/data">
            Дані API
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
