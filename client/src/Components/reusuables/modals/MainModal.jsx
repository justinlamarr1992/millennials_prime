import React from "react";
import User from "../../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";
import HomeFollowComp from "./HomeFollowComp";
import HomeConnectionsComp from "./HomeConnectionsComp";
import ModalTop from "./ModalTop";

const MainModal = () => {
  return (
    <div className="modal con-shade home-modal">
      <div className="modal-container">
        <ModalTop />
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
