import React from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import ModalConnectButton from "../ModalConnectButton";

const HomeFollowComp = ({ _id, user }) => {
  let userid = user._id;
  console.log(user);
  console.log(userid);

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
          to={`/user/users/${userid}`}
          // TODO: Display name but have Link to the @username
        >
          {user.username}
        </Link>
      </h5>
      {/* TODO: figure better way to do that */}
      <h5 className="modal-home-follows-industry">
        {user.business ? user.business.industry : "Primer (SUBJECT TO CHANGE)"}
      </h5>
      {/* <h5 className="modal-home-follows-industry">{user.business.industry}</h5> */}

      <ModalConnectButton userTo={user._id} userFrom={_id} userid={userid} />
    </div>
  );
};
export default HomeFollowComp;
