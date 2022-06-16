import React from "react";
import ReceiverInfo from "./ReceiverInfo";

const RecText = () => {
  return (
    <div className="receiver-message message-box">
      <ReceiverInfo />
      <div className="receiver-content message-text message-text-box">
        This is where Your Text message will go
      </div>
    </div>
  );
};
export default RecText;
