import React from "react";
import SearchBar from "../../Components/home/SearchBar";
import InboxMessage from "../../Components/messaging/InboxMessage";
import MessageModal from "../../Components/messaging/MessageModal";
import "../../Components/messaging/messages.css";

const Messages = () => {
  return (
    <div className="page">
      <div className="message-container">
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

        <MessageModal />
      </div>
    </div>
  );
};
export default Messages;
