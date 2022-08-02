import React from "react";

import Pic from "../../../Assets/Images/user.jpeg";
import { FaUserPlus } from "react-icons/fa";

const HomeFollowComp = () => {
  return (
    <div className="modal-home-follows-comp s-prime-container">
      <img className="modal-home-follows-pic p-con-shade" src={Pic} alt="" />
      <h5 className="modal-home-follows-name">Name</h5>
      <h5 className="modal-home-follows-industry">Industry</h5>
      <div className="modal-home-follows-add p-con-shade clickable">
        <FaUserPlus />
      </div>
    </div>
  );
};
export default HomeFollowComp;
