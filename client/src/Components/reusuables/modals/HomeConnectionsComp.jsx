import React from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import { FaUserPlus } from "react-icons/fa";

const HomeConnectionsComp = () => {
  // TODO: Create an established connections componenet
  return (
    <div className="modal-home-follows-comp s-prime-container">
      <div className="square-container modal-home-follows-comp-pic">
        <img
          className="modal-home-follows-pic p-con-shade square-container-contents"
          src={Pic}
          alt=""
        />
      </div>

      <h5 className="modal-home-follows-name">
        <Link
          to={`/user/users/name`}
          // TODO: Display name but have Link to the @username
          // to={`/user/users/${data.id}`}
        >
          Name
        </Link>
      </h5>
      <h5 className="modal-home-follows-industry">Industry</h5>
      <div className="modal-home-follows-add p-con-shade clickable">
        <FaUserPlus />
      </div>
    </div>
  );
};
export default HomeConnectionsComp;
