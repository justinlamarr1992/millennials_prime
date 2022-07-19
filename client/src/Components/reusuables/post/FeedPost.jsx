import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";

const FeedPost = () => {
  return (
    <section className="post-reply-container norm-container con-shade">
      <h3 className="feed-reply-heading">
        Connect with (Insert User Name Here)
      </h3>
      <div className="feed-reply-text">
        <MessageBox
          placeHolder={"Tell (Insert User Name Here) something nice"}
        />
      </div>

      <button className="reply-button feed-reply-attachment">
        <FaPlus className="reply-button-icon" />
      </button>
      <button className="feed-reply-post page-button connect-btn clickable con-shade">
        Post Button
      </button>
    </section>
  );
};
export default FeedPost;
