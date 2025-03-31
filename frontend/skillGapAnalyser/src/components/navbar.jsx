import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <div className="logo-img">
          <img src={logo} alt="logo" />
        </div>
        <div className="logo">Skill Up</div>
      </div>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/features" activeClassName="active">
            Features
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
