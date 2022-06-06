import React from "react";
import SenderInfo from "./SenderInfo";

const SendText = () => {
  return (
    <div className="sender-message message-box">
      <SenderInfo />
      <div className="sender-content message-text">
        This is where their Text message will go
      </div>
    </div>
  );
};
export default SendText;
