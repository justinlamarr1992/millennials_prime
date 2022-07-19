import React from "react";
import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";

const HomeFeedPost = () => {
  return (
    <section className="post-reply-container norm-container con-shade">
      <h3 className="feed-reply-heading">Connect with Millennials Prime</h3>
      <div className="feed-reply-text">
        <MessageBox placeHolder={"What have you accomplished today?"} />
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
export default HomeFeedPost;
