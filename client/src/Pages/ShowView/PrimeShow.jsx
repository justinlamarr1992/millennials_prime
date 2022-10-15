import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import PostLikeDisLikeLight from "../../Components/reusuables/post/PostLikeDislike";
import UserPostInfo from "../../Components/reusuables/UserPostInfo";
import TimeCalc from "../../Components/reusuables/TimeCalc";

import { primePostData } from "../../Components/reusuables/post/data";

import "./primeshow.css";
import Video from "../../Components/video/Video";
import SideVideos from "./SideVideos";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";
import Subscriber from "./Subscriber";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const PrimeShow = () => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const videoId = params.videoId;

  console.log(params);
  console.log(videoId);

  const [video, setVideo] = useState("");
  const [videoFile, setVideoFile] = useState("");
  let videoFileString;

  const videoVariable = {
    videoId,
  };

  useEffect(() => {
    axiosPrivate
      .post(`/videos/${videoId}`, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.video);
          setVideo(response.data.video);
          videoFileString = response.data.video.filePath;
          console.log(videoFileString);
          console.log(response.data.video.filePath);
        } else {
          alert("Failed to get Video Info");
        }
      });
  }, [params]);
  // console.log(<TimeCalc postDate={new Date(video.createdAt)} />);

  // const renderVideoBlock = videos.map((video, index) => {
  //   const videoData = { ...video };
  //   // console.log(videoData);
  //   return (
  //     <div className="side-video-container">
  //       <Link
  //         to={`/prime-news/viewer/${video._id}`}
  //         // state={videoData}
  //       >
  //         <VideoBlock key={index} {...video} />
  //       </Link>
  //     </div>
  //   );
  //   // return <h1>{videoData.title}</h1>;
  // });

  return (
    <div
      className="page"
      style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
    >
      <div className="view-container">
        <div className="view-content">
          <Video video={`http://localhost:4000/${video.filePath}`} />
          {/* <Video video={videoFileString} /> */}
          <div className="view-content-info">
            {/* <UserPostInfo
            user={video.userPosting}
            // pic={video.userPosting && video.userPosting.avatar} Need ti implement this into model
            // postedDate={<TimeCalc postDate={new Date(video.createdAt)} />}
            className="pr-user-info"
          /> */}
            <div className="view-content-info-user">User Info here</div>
            <div className="view-content-info-user-interactions">
              {/* <Subscriber
                userTo={video.userPosting._id}
                // userFrom={}
              /> */}
            </div>
          </div>

          <div className="pr-video-info view-container-heading">
            <h3>{video.title}</h3>
            <h5 className="text-gray">{video.description}</h5>
          </div>
          {/* <PostLikeDisLikeLight userComments={state.uploadedVid.comments} /> */}
        </div>
      </div>
      <SideVideos />
    </div>
  );
};
export default PrimeShow;
