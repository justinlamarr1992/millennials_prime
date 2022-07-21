import React from "react";
import Video from "../video/Video";
import UserPostInfo from "../reusuables/UserPostInfo";
import PostLikeDisLike from "../reusuables/post/PostLikeDislike";

import { primePostData } from "../reusuables/post/data";

const PrimeNews = () => {
  return (
    <section id="prime" className="prime-container news-container p-con-shade ">
      <h2 className="pr-title title-space">Prime News</h2>
      {/* no map needed each time a video is uploaded it will be put in front of the array */}
      <Video video={primePostData[0].uploadedVid.video} />
      <UserPostInfo
        user={primePostData[0].user}
        pic={primePostData[0].pic}
        postedDate={primePostData[0].postedDate}
        className="pr-user-info"
      />
      <div className="pr-video-info">
        <h3>{primePostData[0].uploadedVid.title}</h3>
        <h5 className="text-gray">
          {primePostData[0].uploadedVid.description}
        </h5>
      </div>
      <div className="pr-like-dislike">
        <PostLikeDisLike />
      </div>
    </section>
  );
};
export default PrimeNews;
