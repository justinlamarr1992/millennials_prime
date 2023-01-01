import React from "react";
import { Link } from "react-router-dom";
import User from "../../Assets/Images/ProfileAvatar.png";
import TimeCalc from "./TimeCalc";

import { primePostData } from "./post/data";
import PostLikeDisLike from "./post/PostLikeDislike";
const UserPostInfo = ({
  user,
  // pic,
  postedDate,
}) => {
  // console.log(postedDate);
  // console.log(user);
  return (
    <div className="pr-user-info">
      <div className="info-pic square-container">
        <img
          className="square-container-contents p-con-shade"
          src={User}
          alt="User Image here"
        />
      </div>

      <div className="info-name">
        <h4 className="prime-m-text">
          <Link className="" to={`/user/users/${user}`}>
            {user}
          </Link>
        </h4>
        {/* <h4>
          <Link
            className="prof-connected-users-img-container square-container "
            to={`/user/users/${data.id}`}
          ></Link>
        </h4> */}
      </div>
      <div className="info-time">
        <h1>
          <TimeCalc postDate={new Date(postedDate)} />
        </h1>
      </div>
      {/* <PostLikeDisLike /> */}
    </div>
  );
};
export default UserPostInfo;
