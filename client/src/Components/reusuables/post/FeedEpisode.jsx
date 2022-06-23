import React from "react";
import Video from "../../video/Video";
import ItemUserInfo from "../ItemUserInfo";
import ItemUserInfoUnder from "../ItemUserInfoUnder";
import EpisodeVideo from "./EpisodeVideo";
import PostLikeDisLike from "./PostLikeDislike";
const FeedEpisode = () => {
  return (
    <section className="post-episode-container prime-container p-con-shade ">
      <EpisodeVideo />
      {/* <ItemUserInfo className="pr-user-info item-user-info" /> */}
      <ItemUserInfoUnder />
      <button className="feed-post-episode-button p-con-shade">
        <div className="button-border-test">
          <h4>Next Episode</h4>
        </div>
      </button>
      {/* //TODO: Change Marquee */}
      {/* <h3 className="item-user-content">{title}</h3> */}
      <marquee className="feed-post-episode-title">
        <h4>
          Episode 2: Example Episode Title of the Episode that Will be really
          Long
        </h4>
      </marquee>
      {/* <h4 className="feed-post-episode-title">
        Episode 2: Example Episode Titl...
      </h4> */}
      {/* <h5 className="item-user-status text-gray">{status}</h5> */}
      {/* <h5 className="feed-post-text text-gray">
        This is the Status of the Video post
      </h5> */}
      {/* <Video /> */}
      {/* <PostLikeDisLike /> */}
    </section>
  );
};
export default FeedEpisode;
