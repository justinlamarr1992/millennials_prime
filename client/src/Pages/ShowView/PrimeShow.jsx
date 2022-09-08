import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PostLikeDisLikeLight from "../../Components/reusuables/post/PostLikeDislike";
import UserPostInfo from "../../Components/reusuables/UserPostInfo";
import TimeCalc from "../../Components/reusuables/TimeCalc";

import { primePostData } from "../../Components/reusuables/post/data";

import "./primeshow.css";
import Video from "../../Components/video/Video";

const PrimeShow = () => {
  const params = useParams();
  const videoId = params.videoId;

  const [video, setVideo] = useState("");

  const videoVariable = {
    videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getSingleVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed to get Video Info");
      }
    });
  }, []);
  // console.log(<TimeCalc postDate={new Date(video.createdAt)} />);

  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="view-container">
        <div className="view-content">
          {/* componenets.css line 30 is where i commented out controls for first video */}
          {/* <Video video={state.uploadedVid.video} /> */}
          <Video video={`http://localhost:5000/${video.filePath}`} />

          {/* <UserPostInfo
            user={video.userPosting}
            // pic={video.userPosting && video.userPosting.avatar} Need ti implement this into model
            // postedDate={<TimeCalc postDate={new Date(video.createdAt)} />}
            className="pr-user-info"
          /> */}

          <div className="pr-video-info view-container-heading">
            <h3>{video.title}</h3>
            <h5 className="text-gray">{video.description}</h5>
          </div>
          {/* <PostLikeDisLikeLight userComments={state.uploadedVid.comments} /> */}
        </div>
      </div>
    </div>
  );
};
export default PrimeShow;
