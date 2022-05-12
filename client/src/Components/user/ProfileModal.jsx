import React from "react";
import User from "../../Assets/Images/user.jpeg";

const ProfileModal = () => {
  return (
    <div className="right-modal verified-modal p-con-shade">
      <div className="modal-t-boxes">
        <img className="info-pic" src={User} alt="User Image here" />
      </div>
      <div>User Picture</div>
      <div>User Name</div>
      <div>Connected Button</div>
      <div>Info on the profile</div>
      <div>Connected Userd title</div>
      <div>Conneected Users</div>
    </div>
  );
};
export default ProfileModal;
