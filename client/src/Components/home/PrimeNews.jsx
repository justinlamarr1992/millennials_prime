import React, { useEffect, useState } from "react";
import Video from "../video/Video";

import Loading from "../../Assets/Images/LoadingScreen.png";

import useAuth from "../../Hooks/useAuth";

import { primePostData } from "../reusuables/post/data";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import PrimeUserPostInfo from "../reusuables/PrimeUserPostInfo";
import PrimeLikeDislike from "../reusuables/post/PrimeLikeDislike";

const PrimeNews = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  //   const params = useParams();
  //   const videoId = params.videoId;
  //   const [video, setVideo] = useState("");
  const [video, setVideo] = useState({});
  const [videoGuid, setVideoGuid] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");

  //   const [videoId, setVideoId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userDisplayName, setUserDisplayName] = useState("");
  const [activeVideo, setActiveVideo] = useState({ active: "" });

  // Get Latest Video
  // Here we will retrieve the latest video from the MILL Prime profile
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // Live Actual Folder
      AccessKey: "a80779d4-9931-4345-80c1ca2315d2-fc09-4143",
      // Test Folder
      // AccessKey: "4c5ea068-0b40-40ae-8d9b2865c27c-f2d3-4fd9",
    },
  };

  // Live Library
  fetch(
    "https://video.bunnycdn.com/library/147838/videos?page=1&itemsPerPage=2&orderBy=date",
    options
  )
    // Test Library
    // fetch(
    //   "https://video.bunnycdn.com/library/181057/videos?page=1&itemsPerPage=2&orderBy=date",
    //   options
    // )

    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      // console.log("Latest Video", response.items[0]);
      setVideo(response.items[0]);
      setVideoGuid(response.items[0].guid);
      setVideoDesc(response.items[0].metaTags[0].value);
      setVideoTitle(response.items[0].title);
    })
    .catch((err) => console.error(err));

  // console.log("Video Array", video);
  // console.log("Video Guid", videoGuid);
  // console.log("Video Title", videoTitle);
  // console.log("Video Description", videoDesc);
  // const displayName = userInfo.firstName + " " + userInfo.lastName;

  // console.log(userInfo);

  return (
    <section
      id="prime"
      className="nonprime-container news-container p-con-shade "
    >
      <h2 className="pr-title title-space">Prime News</h2>
      {/* TODO: Keep the structre but now input the values that useEffect response leave... 
      Chabge the user info to resemblbe the primeshows viewing */}

      <iframe
        // Live Video File
        src={
          video
            ? `https://video.bunnycdn.com/embed/147838/${videoGuid}`
            : "Loading"
        }
        // Test Video File
        // src={
        //   video
        //     ? `https://video.bunnycdn.com/embed/181057/${videoGuid}`
        //     : "Loading"
        // }
        className="pr-video p-con-shade"
        loading="lazy"
        width="1280"
        height="720"
        style={{ border: "none" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>

      {/* <div className="pr-user">
        <PrimeUserPostInfo
          user={userInfo.username}
          displayName={displayName}
          _id={userInfo._id}
          postedDate={video.createdAt}
        />
      </div> */}
      {/* {USER LOGGED IN TERIARY HERE} */}
      {/* <div className="pr-like-dislike">
        <PrimeLikeDislike video={video} videoId={video._id} userId={auth._id} />
      </div> */}

      <div className="pr-video-info-news">
        <h3>{video.title ? video.title : "Loading"}</h3>
        <h5 className="text-gray">
          {video.metaTags
            ? video.metaTags[0].value
            : "Grabbing the Information Now"}
        </h5>
      </div>
      {/* <div className="pr-video-info">
        <h3>{video.title}</h3>
        <h5 className="text-gray">
          {video.metaTags ? video.metaTags[0].value : "Loading"}
        </h5>
      </div> */}
    </section>
  );
};
export default PrimeNews;
