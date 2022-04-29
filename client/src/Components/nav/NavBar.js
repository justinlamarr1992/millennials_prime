import React from "react";
import { Link } from "react-router-dom";

import "./navBar.css";

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div>
        <a href="" className="logo">
          Logo Here
        </a>
      </div>
      <ul>
        <li>
          <Link key="home" to="/">
            Home
          </Link>
          <a href="">
            <span className="nav-text">button2</span>
          </a>
          <Link key="messages" to="/messages">
            Messages
          </Link>
          <Link key="connected" to="connectedusers">
            Connected Users
          </Link>
          <Link key="settings" to="/settings">
            Settings
          </Link>
          <Link key="signout" to="/signout">
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
