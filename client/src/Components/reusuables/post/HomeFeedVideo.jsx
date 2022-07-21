import React from "react";
import Video from "../../video/Video";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";

import { videoData } from "./data";

const HomeFeedVideo = ({ modal, setModal }) => {
  return (
    <div>
      {videoData.map((data) => (
        <section
          className={
            "post-video-container norm-container con-shade " +
            (modal ? "no-wrapping" : "wrapping")
          }
        >
          <ItemUserInfo
            user={data.user}
            pic={data.pic}
            postedDate={data.postedDate}
            className="pr-user-info item-user-info"
          />
          <h3 className="feed-post-video-title">
            {data.videos[0].uploadedVid.title}
          </h3>

          {/* <h5 className="item-user-status text-gray">{status}</h5> */}
          {/* <h5 className="feed-post-text text-gray">
        This is the Status of the Video post
      </h5> */}
          <Video />
          <PostLikeDisLike />
        </section>
      ))}
    </div>
  );
};
export default HomeFeedVideo;
