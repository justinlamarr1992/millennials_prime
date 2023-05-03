import React from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import { FaUserPlus } from "react-icons/fa";

const HomeFollowComp = ({ user }) => {
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
        >
          {user.username}
        </Link>
      </h5>
      <h5 className="modal-home-follows-industry">
        {user.business ? user.business.industry : "No Email"}
      </h5>
      {/* <h5 className="modal-home-follows-industry">{user.business.industry}</h5> */}
      <div className="modal-home-follows-add p-con-shade clickable">
        <FaUserPlus />
      </div>
    </div>
  );
};
export default HomeFollowComp;
