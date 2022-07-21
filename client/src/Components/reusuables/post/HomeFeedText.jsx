import React from "react";
import ItemUserInfo from "../ItemUserInfo";

import "./post.css";
import PostLikeDisLike from "./PostLikeDislike";

const HomeFeedText = ({
  user,
  pic,
  title,
  status,
  modal,
  postedDate,
  id,
  setModal,
}) => {
  return (
    <section
      className={
        "post-item-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo
        user={user}
        pic={pic}
        postedDate={postedDate}
        className="pr-user-info item-user-info"
      />
      <h3 className="item-user-content">{title}</h3>

      <h5 className="item-user-status text-gray">{status}</h5>
      <PostLikeDisLike />
    </section>
  );
};
export default HomeFeedText;
