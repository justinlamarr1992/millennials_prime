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

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axiosPrivate.post("/videos/primenews");
        // console.log(response.data.video[0]);
        console.log(response.data.video[0]);
        setActiveVideo({
          ...activeVideo,
          active: response.data.video[0].filePath,
        });
        // setVideoId(response.data.video[0]._id);
        const newUserId = response.data.video[0].userPosting;

        const getUserInfo = async () => {
          try {
            const response1 = await axiosPrivate.get(`/users/${newUserId}`);

            setUserInfo(response1.data);
          } catch (err) {
            console.log(err);
          }
        };

        getUserInfo();
        // setUserDisplayName(userInfo.);
      } catch (err) {
        console.log(err);
      }
    };
    getNews();

    // return () => {
    //   // this now gets called when the component unmounts
    // };
  }, [auth]);
  // console.log(video._id);
  const displayName = userInfo.firstName + " " + userInfo.lastName;

  console.log(activeVideo.active);

  return (
    <section id="prime" className="prime-container news-container p-con-shade ">
      <h2 className="pr-title title-space">Prime News</h2>
      {/* TODO: Keep the structre but now input the values that useEffect response leave... 
      Chabge the user info to resemblbe the primeshows viewing */}
      <div className="pr-video p-con-shade">
        <Video video={activeVideo.active} />
        {/* <Video video={activeVideo.active || Loading} /> */}
        {/* <Video video={video.filePath} /> */}
      </div>

      <div className="pr-user">
        <PrimeUserPostInfo
          user={userInfo.username}
          displayName={displayName}
          _id={userInfo._id}
          postedDate={video.createdAt}
        />
      </div>
      {/* {USER LOGGED IN TERIARY HERE} */}
      <div className="pr-like-dislike">
        <PrimeLikeDislike video={video} videoId={video._id} userId={auth._id} />
      </div>

      <div className="pr-video-info">
        <h3>{video.title}</h3>
        <h5 className="text-gray">{video.description}</h5>
      </div>
      {/* <div className="pr-like-dislike">
        <PostLikeDisLike />
      </div> */}
      {/* <h3>{JSON.stringify(userInfo)}</h3> */}
    </section>
  );
};
export default PrimeNews;
