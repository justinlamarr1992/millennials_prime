import React from "react";
import User from "../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";
import { textData } from "../reusuables/post/data.js";

const ProfileModal = () => {
  return (
    <div className="modal con-shade verified-modal">
      <div className="modal-container modal-user-container">
        {/* Make this its own componenet */}
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
        {/* Make this its own componenet */}

        <div className="modal-prof-info">
          <img
            className="modal-prof-pic p-con-shade"
            src={User}
            alt="User Image here"
          />
          {/* <h3 className="prof-info-text">Justin Williams</h3> */}
          <h4 className="prof-info-text">Justin Williams</h4>
          <h5 className="text-gray prof-info-text">@justinWilliams</h5>
          <div className="prof-info-numbers">
            <h5>50 Post</h5>
            <h5>345 Connections</h5>
          </div>
        </div>
        <div className="modal-user-buttons">
          <button className="modal-connect-button item-shade ">
            Connected
          </button>
          <button className="modal-mail-button item-shade">
            <FaEnvelope />
          </button>
        </div>
        <div className="prof-work-with">
          <div className="work-with-industry">
            <h5 className="work-with-title">Industry</h5>
            <h6 className="work-with-text">
              Music, Video Editing, Ministry, Foreign Relations
            </h6>
            {/* Create link for all the different indusrty */}
          </div>
          <div className="work-with-b2b">
            <h5 className="work-with-title">B2B Opportunity</h5>
            <h6 className="work-with-text">
              Producers, CameraMan, Translater, Clothing Stylist
            </h6>
            {/* Create link for all the different indusrty */}
          </div>
        </div>
        <div className="prof-connected">
          <h5 className="work-with-title">Connections</h5>
          <div className="prof-connected-users">
            {textData.slice(0, 16).map((data) => (
              <img
                className="prof-connected-users-img item-shade clickable"
                src={data.pic}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
