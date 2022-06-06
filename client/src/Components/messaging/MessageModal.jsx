import React from "react";
import User from "../../Assets/Images/user.jpeg";
import { FaPlus } from "react-icons/fa";

import SendText from "./SendText";
import RecText from "./RecText";
import SendPic from "./SendPic";
import RecPic from "./RecPic";
import SendAud from "./SendAud";
import RecAud from "./RecAud";
import SendVid from "./SendVid";
import RecVid from "./RecVid";
import MessageBox from "./MessageBox";
const MessageModal = () => {
  return (
    <div className="message-modal con-shade">
      <div className="message-modal-container">
        <div className="message-modal-sender">
          <div className="message-sender">
            <img className="message-sender-pic" src={User} alt="" />
            <div className="message-sender-info">
              <h3 className="message-sender-name">Sender Name</h3>
              <h5 className="message-sender-status">Online</h5>
            </div>
          </div>

          <div className="message-sender-options">Options</div>
        </div>
        <div className="message-modal-chat">
          <SendText />
          <RecText />
          <SendPic />
          <RecPic />
          <SendAud />
          <RecAud />
          <SendVid />
          <RecVid />
        </div>
        <div className="reply-container">
          <button className="reply-button">
            <FaPlus className="reply-button-icon" />
          </button>
          <MessageBox />
        </div>
      </div>
    </div>
  );
};
export default MessageModal;
