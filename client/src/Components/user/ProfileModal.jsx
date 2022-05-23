import React from "react";
import User from "../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";

const ProfileModal = () => {
  return (
    <div className="right-modal con-shade">
      <div className="modal-container">
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
        <div className="modal-prof-info">
          <img
            className="modal-prof-pic p-con-shade"
            src={User}
            alt="User Image here"
          />
          {/* <h3 className="prof-info-text">Justin Williams</h3> */}
          <h4 className="prof-info-text">Justin Williams</h4>
          <h5 className="text-gray prof-info-text">@justinWilliams</h5>
        </div>
        <div className="modal-user-buttons">
          <button className="modal-connect-button item-shade ">
            Connected
          </button>
          <button className="modal-mail-button item-shade">
            <FaEnvelope />
          </button>
        </div>
        <div>Info on the profile</div>
        <div>Connected Userd title</div>
        <div>Conneected Users</div>
      </div>
    </div>
  );
};
export default ProfileModal;
