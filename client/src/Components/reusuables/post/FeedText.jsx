import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import { usePostsContext } from "../../../Hooks/usePostsContext";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";

import { textData } from "./data";
const FeedText = ({ modal, pic, postedDate, post }) => {
  const { dispatch } = usePostsContext;
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/post/" + post._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };
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
