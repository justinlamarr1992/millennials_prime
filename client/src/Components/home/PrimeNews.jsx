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
        src="https://video.bunnycdn.com/play/147838/38cfaf07-c691-466b-9f6f-5c342f4a19af"
        className="pr-video p-con-shade"
        loading="lazy"
        width="1280"
        height="720"
        style={{ border: "none" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
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
