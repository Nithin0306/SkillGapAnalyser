import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import "../App.css";

const Navbar = () => {
  return (
    <nav>
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
