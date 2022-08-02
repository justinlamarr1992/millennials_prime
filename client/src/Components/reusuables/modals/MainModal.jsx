import React from "react";
import User from "../../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";
import HomeFollowComp from "./HomeFollowComp";
import HomeConnectionsComp from "./HomeConnectionsComp";

const MainModal = () => {
  return (
    <div className="modal con-shade home-modal">
      <div className="modal-container">
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

        <div className="modal-section modal-home-ad">
          <h4 className="modal-home-ad-title">Go Prime</h4>
          <h6 className="modal-home-ad-text">
            Try the Prime membership to influence our community the right way!
          </h6>
          {/* <button className="modal-home-ad-button page-button">Try Here</button> */}
        </div>
        <div className="modal-section ">
          <h4 className="modal-section-title">Who to Follow</h4>
          <div className="modal-home-follows">
            <HomeFollowComp />
            <HomeFollowComp />
            <HomeFollowComp />
          </div>
        </div>
        <div className="modal-section ">
          <h4 className="modal-section-title">Connections</h4>
          <div className="modal-home-connections">
            <HomeConnectionsComp />
            <div>Thing 2</div>
            <div>Thing 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainModal;
