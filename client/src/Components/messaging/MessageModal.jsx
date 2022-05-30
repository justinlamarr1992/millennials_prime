import React from "react";
const MessageModal = () => {
  return (
    <div className="message-modal con-shade">
      <div className="message-modal-container">
        <div className="message-modal-sender">
          <div className="message-sender-pic">Sender Pic</div>
          <div className="message-sender-name">Sender Name</div>
          <div className="message-sender-options">Options</div>
        </div>
        <div className="message-modal-chat"></div>
      </div>
    </div>
  );
};
export default MessageModal;
