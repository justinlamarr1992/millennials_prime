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
  //   const [videoId, setVideoId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userDisplayName, setUserDisplayName] = useState("");
  const [activeVideo, setActiveVideo] = useState({ active: "" });

  // Here we will retrieve the latest video from the MILL Prime profile
  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axiosPrivate.get(`/testUploads/`, {});
        if (response.data.success) {
          console.log(response.data);
        } else {
          console.log("Failed to get Prime Video");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getNews();
  }, []);

  const displayName = userInfo.firstName + " " + userInfo.lastName;

  console.log(userInfo);

  return (
    <section
      id="prime"
      className="nonprime-container news-container p-con-shade "
    >
      <h2 className="pr-title title-space">Prime News</h2>
      {/* TODO: Keep the structre but now input the values that useEffect response leave... 
      Chabge the user info to resemblbe the primeshows viewing */}

      <iframe
        className="pr-video p-con-shade"
        // id="d71bda38-3ae5-40aa-8c24-93179412e432"
        src="https://iframe.dacast.com/vod/4cb5f7e0-f945-e8aa-b1a8-62e9bf774b85/d71bda38-3ae5-40aa-8c24-93179412e432"
        width="100%"
        height="100%"
        // frameborder="0"
        // scrolling="no"
        // allow="autoplay;encrypted-media"
        allowFullScreen
        // webkitallowfullscreen
        // mozallowfullscreen
        // oallowfullscreen
        // msallowfullscreen
        // style="position:absolute;top:0;left:0;"
      ></iframe>

      {/* <Video video={activeVideo.active} /> */}
      {/* <Video video={activeVideo.active || Loading} /> */}
      {/* <Video video={video.filePath} /> */}

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
        <h3>Millennials Prime Episode 1</h3>
        <h5 className="text-gray">
          Debut Video WorldWide News: Russia vs Ukraine, ChatGPT, supreme Court
          and More
        </h5>
      </div>
      {/* <div className="pr-video-info">
        <h3>{video.title}</h3>
        <h5 className="text-gray">{video.description}</h5>
      </div> */}
    </section>
  );
};
export default PrimeNews;
