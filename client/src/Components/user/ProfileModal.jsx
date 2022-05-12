import React from "react";
import User from "../../Assets/Images/user.jpeg";

const ProfileModal = () => {
  return (
    <div className="right-modal  p-con-shade">
      <div className="modal-container">
        <div className="modal-t-boxes">
          <div className="noti-box top-boxes">
            <h3 className="noti-num">2</h3>
          </div>
          <img
            className="prof-pic top-boxes"
            src={User}
            alt="User Image here"
          />
        </div>
        <div className="modal-prof-info">
          <img className="modal-prof-pic" src={User} alt="User Image here" />
          <h3 className="prof-info-text">Justin Williams</h3>
          <h5 className="text-gray prof-info-text">@justinWilliams</h5>
        </div>
        <div>Connected Button</div>
        <div>Info on the profile</div>
        <div>Connected Userd title</div>
        <div>Conneected Users</div>
      </div>
    </div>
  );
};
export default ProfileModal;
