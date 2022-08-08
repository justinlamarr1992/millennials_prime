import React from "react";
import { Link } from "react-router-dom";

import { useLogout } from "../../Hooks/useLogout";
import { useAuthContext } from "../../Hooks/useAuthContext";

import Logo from "../../Assets/Images/MillennialsPrimeLogoNB.png";
import {
  FaHome,
  FaEnvelope,
  FaUsers,
  FaToolbox,
  FaSignOutAlt,
} from "react-icons/fa";

import "./navBar.css";

const NavBar = (props) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <nav className="nav-container p-con-shade">
      {user ? (
        <ul className="nav-buttons">
          <li className="nav-list top">
            <Link key="home" to="/" className="logo-link">
              <img className="logo" src={Logo} alt="MPrime Logo" />
            </Link>
            <a href=""></a>
            {/* {user && <span>{user.email}</span>} */}

            {/* this is the reason for the off measured buttons still figuring out the
          spacing and design here is the Props passed from the app.js file...
          ...(props, state)...NavBar name="Justin" maybe a good route to take to
          put the users information on the navbar */}
          </li>
          <li className="nav-list middle">
            {/* Home
            <FontAwesomeIcon icon="fa-solid fa-house" /> */}
            {/* This is the test for getting to the profile page not a button that will remain here */}
            <div className="test">
              <Link key="profile" to="/user">
                User
              </Link>
            </div>
            {/* This is the test for getting to the profile page not a button that will remain here */}
            {/* <div className="test">
            <a href="">
              <span className="nav-text">Button2</span>
            </a>
          </div> */}
            <div className="test">
              <Link key="messages" to="/messages">
                <FaEnvelope />
                {/* Messages */}
                {/* <FontAwesomeIcon icon="fa-solid fa-messages" /> */}
              </Link>
            </div>
            <div className="test">
              <Link key="connected" to="connectedusers">
                <FaUsers />
                {/* Connected Users */}
                {/* <FontAwesomeIcon icon="fa-solid fa-users" /> */}
              </Link>
            </div>
            <div className="test">
              <Link key="settings" to="/settings">
                <FaToolbox />
                {/* Settings */}
                {/* <FontAwesomeIcon icon="fa-solid fa-gear" /> */}
              </Link>
            </div>
          </li>
          <li className="nav-list bottom">
            <div className="test test1">
              <Link key="signout" to="/signin" onClick={handleClick}>
                <FaSignOutAlt />
              </Link>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="nav-buttons">
          <li className="nav-list top-half">
            <Link key="home" to="/" className="logo-link">
              <img className="logo" src={Logo} alt="MPrime Logo" />
            </Link>
            <a href=""></a>
            {/* {user && <span>{user.email}</span>} */}

            {/* this is the reason for the off measured buttons still figuring out the
          spacing and design here is the Props passed from the app.js file...
          ...(props, state)...NavBar name="Justin" maybe a good route to take to
          put the users information on the navbar */}
          </li>
          <li className="nav-list bottom-half">
            <h4 className="welcome">Welcome To Millennials Prime</h4>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default NavBar;
