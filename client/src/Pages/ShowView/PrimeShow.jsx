import React from "react";
import PostLikeDisLikeLight from "../../Components/reusuables/post/PostLikeDislike";
import UserPostInfo from "../../Components/reusuables/UserPostInfo";
// import Video from "../../Components/video/Video";

import { primePostData } from "../../Components/reusuables/post/data";

import "./primeshow.css";
import Video2 from "../../Components/video2/Video2";
const PrimeShow = ({ videofile }) => {
  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="view-container">
        <div className="view-content">
          {/* componenets.css line 30 is where i commented out controls for first video */}
          {/* <Video video={primePostData[0].uploadedVid.video} /> */}

          <Video2 video={videofile} />

          <UserPostInfo
            user={primePostData[0].user}
            pic={primePostData[0].pic}
            postedDate={primePostData[0].postedDate}
            className="pr-user-info"
          />

          <div className="pr-video-info view-container-heading">
            <h3>{primePostData[0].uploadedVid.title}</h3>
            <h5 className="text-gray">
              {primePostData[0].uploadedVid.description}
            </h5>
          </div>
          <PostLikeDisLikeLight />
        </div>
      </div>
    </div>
  );
};
export default PrimeShow;
