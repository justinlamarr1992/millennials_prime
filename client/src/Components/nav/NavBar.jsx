import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { logoutUser } from "../../Actions/userActions";

// import { useLogout } from "../../Hooks/useLogout";
// import { useAuthContext } from "../../Hooks/useAuthContext";

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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const { logout } = useLogout();
  // const { user } = useAuthContext();

  const handleClick = () => {
    // logout();
    // axios.get(`${USER_SERVER}/logout`).then((response) => {
    //   if (response.status === 200) {
    //     <NavLink to="/auth/signin" />;
    //   } else {
    //     alert("Log Out Failed");
    //   }
    // });

    dispatch(logoutUser).then((response) => {
      if (response.status === 200) {
        // <NavLink to="/auth/signin" />;
      } else {
        alert("Log Out Failed");
      }
    });
  };
  return (
    <nav className="nav-container p-con-shade">
      {user ? (
        <ul className="nav-buttons">
          <li className="nav-list top">
            <NavLink key="home" to="/" className="logo-link">
              <img className="logo" src={Logo} alt="MPrime Logo" />
            </NavLink>
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
              <NavLink
                key="profile"
                to="/user/profile"
                style={({ isActive }) => {
                  return isActive ? { color: "var(--qua-c)" } : {};
                }}
              >
                User
              </NavLink>
            </div>
            {/* This is the test for getting to the profile page not a button that will remain here */}
            {/* <div className="test">
            <a href="">
              <span className="nav-text">Button2</span>
            </a>
          </div> */}
            <div className="test">
              <NavLink
                key="messages"
                to="/messages"
                style={({ isActive }) => {
                  return isActive ? { color: "var(--qua-c)" } : {};
                }}
              >
                <FaEnvelope />
                {/* Messages */}
                {/* <FontAwesomeIcon icon="fa-solid fa-messages" /> */}
              </NavLink>
            </div>
            <div className="test">
              <NavLink
                key="connected"
                to="connectedusers"
                style={({ isActive }) => {
                  return isActive ? { color: "var(--qua-c)" } : {};
                }}
              >
                <FaUsers />
                {/* Connected Users */}
                {/* <FontAwesomeIcon icon="fa-solid fa-users" /> */}
              </NavLink>
            </div>
            <div className="test">
              <NavLink
                key="settings"
                to="/settings/config"
                style={({ isActive }) => {
                  return isActive ? { color: "var(--qua-c)" } : {};
                }}
              >
                <FaToolbox />
                {/* Settings */}
                {/* <FontAwesomeIcon icon="fa-solid fa-gear" /> */}
              </NavLink>
            </div>
          </li>
          <li className="nav-list bottom">
            <div className="test test1">
              <NavLink
                key="signout"
                to="/auth/signin"
                onClick={handleClick}
                // onClick={(e) => {
                //   e.preventDefault();
                //   dispatch(logoutUser).then((response) => {
                //     if (response.payload.success) {
                //       // NAVAGAT CODE
                //     } else {
                //       alert("register went wrong");
                //       console.log(response.payload.err.errmsg);
                //     }
                //   });
                // }}
              >
                <FaSignOutAlt />
              </NavLink>
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
