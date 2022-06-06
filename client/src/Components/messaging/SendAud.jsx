import React, { useRef } from "react";
import SenderInfo from "./SenderInfo";

const SendAud = () => {
  return (
    <div className="sender-message message-box">
      <SenderInfo />
      <div className="sender-content message-aud-box">
        <audio src="Bell.mp3" type="audio/mpeg" controls></audio>
        <h5 className="message-content-text">
          This is their Text for the Audio File
        </h5>
      </div>
    </div>
  );
};
export default SendAud;
