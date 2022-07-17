import React from "react";
import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";

const FeedPost = () => {
  return (
    <section className="post-reply-container norm-container con-shade">
      <h3 className="feed-reply-text">Connect with (USER NAME HERE)</h3>
      <button className="reply-button feed-reply-attachment">
        <FaPlus className="reply-button-icon" />
      </button>
      {/* <MessageBox /> */}
      <button className="feed-reply-post page-button connect-btn clickable">
        Post Button
      </button>
    </section>
  );
};
export default FeedPost;
