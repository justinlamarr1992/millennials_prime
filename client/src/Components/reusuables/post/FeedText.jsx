import React, { useEffect, useState } from "react";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";
const FeedText = ({ modal, setModal }) => {
  return (
    <section
      className={
        "post-item-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo className="pr-user-info item-user-info" />
      <h3 className="item-user-content">This is the Title of the TExt Post</h3>

      <h5 className="item-user-status text-gray">
        This is the Status of the text post
      </h5>
      <PostLikeDisLike />
    </section>
  );
};
export default FeedText;
