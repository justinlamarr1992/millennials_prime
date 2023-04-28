import React from "react";
import { Link, NavLink } from "react-router-dom";

import User from "../../Assets/Images/user.jpeg";
import { FaUserAlt, FaBell, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";

const SettingsModal = () => {
  return (
    <div className="modal setting-modal con-shade">
      <div className="modal-container settings-box-container">
        <div className="modal-t-boxes">
          <div className="noti-box top-boxes p-con-shade clickable">
            {/* <h3 className="noti-num">2</h3> */}
            {/* Sixes for big screen vs laptop */}
            <h4 className="noti-num">2</h4>
          </div>
          <img
            className="prof-pic top-boxes p-con-shade clickable"
            src={User}
            alt="User Image here"
          />
        </div>
        <h3 className="modal-setting-title">Settings</h3>

        <div className="modal-setting-container">
          {/* <h3 className="modal-setting-title">Settings</h3> */}
          <NavLink
            key="account"
            to="/settings/myinfo"
            className="modal-setting-button"
            style={({ isActive }) => {
              return isActive ? { color: "var(--qua-c)" } : {};
            }}
          >
            <div className="setting-button-icon-box">
              <FaUserAlt className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">My Infomation</h4>
          </NavLink>

          {/* Change information and CSS stuff and Icon to business Info */}
          <NavLink
            key="account"
            to="/settings/business"
            className="modal-setting-button"
            style={({ isActive }) => {
              return isActive ? { color: "var(--qua-c)" } : {};
            }}
          >
            <div className="setting-button-icon-box">
              <FaBell className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Business</h4>
          </NavLink>

          {/* Change information and CSS stuff and Icon to Art Info */}
          <NavLink
            key="account"
            to="/settings/art"
            className="modal-setting-button"
            style={({ isActive }) => {
              return isActive ? { color: "var(--qua-c)" } : {};
            }}
          >
            <div className="setting-button-icon-box">
              <FaShieldAlt className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Art</h4>
          </NavLink>
          <NavLink
            key="account"
            to="/settings/contact-us"
            className="modal-setting-button"
            style={({ isActive }) => {
              return isActive ? { color: "var(--qua-c)" } : {};
            }}
          >
            <div className="setting-button-icon-box">
              <FaPhoneAlt className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Contact Us</h4>
          </NavLink>
          <h4>Notifications and Privacy policy stuff added here later</h4>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
