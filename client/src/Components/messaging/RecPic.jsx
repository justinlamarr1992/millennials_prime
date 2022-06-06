import React from "react";
import ReceiverInfo from "./ReceiverInfo";
import Pic from "../../Assets/Images/image1.png";

const RecPic = () => {
  return (
    <div className="receiver-message message-box">
      <ReceiverInfo />
      <div className="receiver-content message-pic-box ">
        <img className="message-pic-pic" src={Pic} alt="Users Picture Sent" />
        <h5 className="message-content-text">
          This is your Text for the pictures
        </h5>
      </div>
    </div>
  );
};
export default RecPic;
