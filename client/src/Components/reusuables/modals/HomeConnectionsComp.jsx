import React from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import { FaUserPlus } from "react-icons/fa";

const HomeConnectionsComp = ({ user }) => {
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
          to={`/user/users/${user._id}`}
          // TODO: Display name but have Link to the @username
          // to={`/user/users/${data.id}`}
        >
          {user.username}
        </Link>
      </h5>
      {/* TODO: figure better way to do that */}

      <h5 className="modal-home-follows-industry">
        {user.business ? user.business.industry : "Primer (SUBJECT TO CHANGE)"}
      </h5>
    </div>
  );
};
export default HomeConnectionsComp;
