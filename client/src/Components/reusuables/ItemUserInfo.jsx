import React from "react";
import TimeCalc from "./TimeCalc";
const ItemUserInfo = ({ user, pic, postedDate }) => {
  return (
    <div className="item-user-info post-item-user-info">
      <img className="info-pic" src={pic} alt="User Image here" />
      <div className="info-name">
        <h4>{user}</h4>
      </div>
      <div className="info-time">
        <h6 className="text-gray">
          <TimeCalc postDate={new Date(postedDate)} />
        </h6>
      </div>
    </div>
  );
};
export default ItemUserInfo;
