import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeCalc from "./TimeCalc";
const ItemUserInfo = ({ user, pic, postedDate }) => {
  return (
    <div className="item-user-info post-item-user-info">
      <div className="square-container info-pic">
        <img
          className="square-container-contents"
          src={pic}
          alt="User Image here"
        />
      </div>

      <div className="info-name">
        {/* for now */}
        <Link className="classLink-User" to="/user/${user}">
          <h4>{user}</h4>
        </Link>
      </div>
      <div className="info-time">
        <h6 className="text-gray">
          <TimeCalc postDate={new Date(postedDate)} />
        </h6>
      </div>
      <div className="info-options">
        <FaEllipsisV
          onClick={() => {
            console.log("Clicked this Bitch");
          }}
        />
        <div className="options-dropdown">
          <h4>Hello im the drop down</h4>
        </div>
      </div>
    </div>
  );
};
export default ItemUserInfo;
