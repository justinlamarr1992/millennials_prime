import React from "react";
import User from "../../Assets/Images/user.jpeg";
import TimeCalc from "./TimeCalc";
const UserPostInfo = ({ user, pic, postedDate }) => {
  return (
    <div className="pr-user-info">
      <img className="info-pic" src={pic} alt="User Image here" />
      <div className="info-name">
        <h4>{user}</h4>
      </div>
      <div className="info-time">
        <h6>
          <TimeCalc postDate={new Date(postedDate)} />
        </h6>
      </div>
    </div>
  );
};
export default UserPostInfo;
