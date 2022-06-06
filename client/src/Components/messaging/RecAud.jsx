import React from "react";
import ReceiverInfo from "./ReceiverInfo";

const RecAud = () => {
  return (
    <div className="receiver-message message-box">
      <ReceiverInfo />
      <div className="receiver-content message-aud-box">
        <audio src="Bell.mp3" type="audio/mpeg" controls></audio>
        <h5 className="message-content-text">
          This is your Text for the Audio File
        </h5>
      </div>
    </div>
  );
};
export default RecAud;
