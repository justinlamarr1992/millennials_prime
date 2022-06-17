import React from "react";
import Video from "../../video/Video";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";
const FeedEpisode = () => {
  return (
    <section className="post-episode-container prime-container p-con-shade ">
      <ItemUserInfo className="pr-user-info item-user-info" />
      {/* <h3 className="item-user-content">{title}</h3> */}
      <h3 className="feed-post-episode-title">
        This is the Title of the Video Post
      </h3>

      {/* <h5 className="item-user-status text-gray">{status}</h5> */}
      {/* <h5 className="feed-post-text text-gray">
        This is the Status of the Video post
      </h5> */}
      <Video />
      {/* <PostLikeDisLike /> */}
    </section>
  );
};
export default FeedEpisode;
