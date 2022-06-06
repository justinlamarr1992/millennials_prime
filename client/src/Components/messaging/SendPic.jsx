import React from "react";
import SenderInfo from "./SenderInfo";
import Pic from "../../Assets/Images/image1.png";

const SendPic = () => {
  return (
    <div className="sender-message message-box">
      <SenderInfo />
      <div className="sender-content message-pic-box ">
        <img className="message-pic-pic" src={Pic} alt="Users Picture Sent" />
        <h5 className="message-content-text">
          This is their Text for the pictures
        </h5>
      </div>
    </div>
  );
};
export default SendPic;
