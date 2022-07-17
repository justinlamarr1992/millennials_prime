import React, { useState, useRef } from "react";
import SearchBar from "../../Components/reusuables/SearchBar";
import InboxMessage from "../../Components/messaging/InboxMessage";
import MessageModal from "../../Components/messaging/MessageModal";
import "../../Components/messaging/messages.css";

const Messages = () => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setModal(!modal);
  };
  return (
    <div className="page">
      <div className="message-container">
        <div
          className={
            "message-selections "
            // + (modal ? "user-true" : "user-false")
          }
        >
          <SearchBar />
          {/* Add button to send new message */}
          <h2>Inbox</h2>
          <div className="message-select">
            <h4>Direct Messages</h4>
            <h4>Group Chat</h4>
            <h4>Archived</h4>
          </div>
          <InboxMessage />
          <InboxMessage />
          <button className="test-modal-button" onClick={onClick}>
            Modal Test Button
          </button>
        </div>

        {modal && <MessageModal />}
      </div>
    </div>
  );
};
export default Messages;
