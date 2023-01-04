import React, { useEffect, useState } from "react";
import Video from "../video/Video";

import useAuth from "../../Hooks/useAuth";

import UserPostInfo from "../reusuables/UserPostInfo";
import PostLikeDisLike from "../reusuables/post/PostLikeDislike";

import { primePostData } from "../reusuables/post/data";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import LikeDislike from "../reusuables/post/LikeDislike";
import PrimeUserPostInfo from "../reusuables/PrimeUserPostInfo";
import PrimeLikeDislike from "../reusuables/post/PrimeLikeDislike";

const PrimeNews = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  //   const params = useParams();
  //   const videoId = params.videoId;
  //   const [video, setVideo] = useState("");
  const [video, setVideo] = useState({});
  const [videoFile, setVideoFile] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axiosPrivate.post("/videos/primenews", {});
        // console.log(response.data.video[0]);
        console.log(response.data.video[0]);
        setVideo(response.data.video[0]);
        const newUserId = response.data.video[0].userPosting;

        const getUserInfo = async () => {
          try {
            const response1 = await axiosPrivate.get(`/users/${newUserId}`);
            console.log(response1);

            setUserInfo(response1.data);
          } catch (err) {
            console.log(err);
          }
        };

        getUserInfo();
      } catch (err) {
        console.log(err);
      }
    };
    getNews();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  console.log(video);

  return (
    <section id="prime" className="prime-container news-container p-con-shade ">
      <h2 className="pr-title title-space">Prime News</h2>
      {/* TODO: Keep the structre but now input the values that useEffect response leave... 
      Chabge the user info to resemblbe the primeshows viewing */}
      <div className="pr-video">
        <Video video={video.filePath} />
      </div>

      <div className="pr-user">
        <PrimeUserPostInfo
          user={userInfo.username}
          _id={userInfo._id}
          postedDate={video.createdAt}
        />
      </div>
      {/* {USER LOGGED IN TERIARY HERE} */}
      <PrimeLikeDislike video videoId userId={auth._id} />

      <div className="pr-video-info">
        <h3>{video.title}</h3>
        <h5 className="text-gray">{video.description}</h5>
      </div>
      {/* <div className="pr-like-dislike">
        <PostLikeDisLike />
      </div> */}
    </section>
  );
};
export default PrimeNews;
