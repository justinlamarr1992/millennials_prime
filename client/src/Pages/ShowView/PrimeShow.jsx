import React from "react";
import { useLocation } from "react-router-dom";
import PostLikeDisLikeLight from "../../Components/reusuables/post/PostLikeDislike";
import UserPostInfo from "../../Components/reusuables/UserPostInfo";
// import Video from "../../Components/video/Video";

import { primePostData } from "../../Components/reusuables/post/data";

import "./primeshow.css";
import Video from "../../Components/video/Video";

const PrimeShow = ({ videofile }) => {
  const { state } = useLocation();

  console.log("Pasted user Info is ", state.user);
  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="view-container">
        <div className="view-content">
          {/* componenets.css line 30 is where i commented out controls for first video */}
          {/* <Video video={primePostData[0].uploadedVid.video} /> */}

          {/* <Video2 video={videofile} /> */}
          <Video video={state.uploadedVid.video} />

          <UserPostInfo
            user={state.user}
            pic={state.pic}
            postedDate={state.postedDate}
            className="pr-user-info"
          />

          <div className="pr-video-info view-container-heading">
            <h3>{state.uploadedVid.title}</h3>
            <h5 className="text-gray">{state.uploadedVid.description}</h5>
          </div>
          <PostLikeDisLikeLight userComments={state.uploadedVid.comments} />
        </div>
      </div>
    </div>
  );
};
export default PrimeShow;
