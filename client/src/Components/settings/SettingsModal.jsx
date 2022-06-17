import React from "react";
import { Link } from "react-router-dom";

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
        <div className="modal-setting-container">
          <h3 className="modal-setting-title">Settings</h3>
          <Link key="account" to="/settings" className="modal-setting-button">
            <div className="setting-button-icon-box setting-button-icon-box-selected">
              <FaUserAlt className="setting-button-icon setting-button-icon-selected" />
            </div>
            <h4 className="setting-button-text">My Account</h4>
          </Link>
          <Link
            key="account"
            to="/notifications"
            className="modal-setting-button"
          >
            <div className="setting-button-icon-box">
              <FaBell className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Notifications</h4>
          </Link>
          <Link
            key="account"
            to="/privacy-policy"
            className="modal-setting-button"
          >
            <div className="setting-button-icon-box">
              <FaShieldAlt className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Privacy Policy</h4>
          </Link>
          <Link key="account" to="/contact-us" className="modal-setting-button">
            <div className="setting-button-icon-box">
              <FaPhoneAlt className="setting-button-icon" />
            </div>
            <h4 className="setting-button-text">Contact Us</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
