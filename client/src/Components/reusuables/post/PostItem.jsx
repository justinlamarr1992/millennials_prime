import React from "react";
import ItemUserInfo from "../ItemUserInfo";

import "./post.css";

const PostItem = ({ title, status }) => {
  return (
    <section className="post-item-container norm-container con-shade ">
      <ItemUserInfo className="pr-user-info item-user-info" />
      <h5 className="item-user-status text-gray">{status}</h5>

      <h3 className="item-user-content">{title}</h3>
    </section>
  );
};
export default PostItem;
