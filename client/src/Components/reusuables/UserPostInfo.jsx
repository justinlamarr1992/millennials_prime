import React from "react";
import User from "../../Assets/Images/user.jpeg";
const UserPostInfo = () => {
  return (
    <div className="pr-user-info">
      <img className="info-pic" src={User} alt="User Image here" />
      <div className="info-name">
        <h4>Justin Williams</h4>
      </div>
      <div className="info-time">
        <h6>Time Posted</h6>
      </div>
    </div>
  );
};
export default UserPostInfo;
