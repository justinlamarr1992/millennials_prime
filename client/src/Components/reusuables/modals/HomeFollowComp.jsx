import React from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import ModalConnectButton from "../ModalConnectButton";

const HomeFollowComp = ({ _id, user }) => {
  const userid = user._id;
  // console.log(user);
  // console.log(userid);

  return (
    <div
      className={`modal-home-follows-comp ${
        user.prime ? "s-prime-container" : "s-nonprime-container"
      }`}
    >
      <div className="square-container modal-home-follows-comp-pic">
        <img
          className="modal-home-follows-pic p-con-shade square-container-contents"
          src={Pic}
          alt=""
        />
      </div>

      <h5 className="modal-home-follows-name">
        <Link
          className={`${user.prime ? "text-pri" : "text-sec"}`}
          to={`/user/users/${userid}`}
        >
          {user.username}
        </Link>
      </h5>
      {/* TODO: figure better way to do that */}
      <h5 className="modal-home-follows-industry">
        {user.business ? user.business.industry : "Primer"}
      </h5>
      {/* <h5 className="modal-home-follows-industry">{user.business.industry}</h5> */}

      <ModalConnectButton
        userTo={user._id}
        userFrom={_id}
        // userid={`${userid}`}
        userid={user}
      />
    </div>
  );
};
export default HomeFollowComp;
