import React, { useEffect, useState } from "react";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";

import { textData } from "./data";
const FeedText = ({ modal }) => {
  return (
    <section
      className={
        "post-item-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo
        user={textData[0].user}
        pic={textData[0].pic}
        postedDate={textData[0].postedDate}
        className="pr-user-info item-user-info"
      />
      <h3 className="item-user-content">{textData[0].title}</h3>

      <h5 className="item-user-status text-gray">{textData[0].status}</h5>
      <PostLikeDisLike />
    </section>
  );
};
export default FeedText;
