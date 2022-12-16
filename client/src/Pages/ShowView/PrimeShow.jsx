import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import useAuth from "../../Hooks/useAuth";

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

// import MessageBox from "../../Components/messaging/MessageBox";
import Comments from "../../Components/reusuables/Comments";
import LikeDislike from "../../Components/reusuables/post/LikeDislike";

const PrimeShow = () => {
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const videoId = params.videoId;
  const [video, setVideo] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [commentList, setCommentList] = useState([]);

  let videoFileString;

  const videoVariable = {
    videoId,
  };
  console.log(videoId);

  // CHANGE FORMAT after the click use params to save the ID as a varible just like all ofther
  // post routes

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await axiosPrivate.post(`/videos/${videoId}`, {});
        // console.log("New Get video ", response);
        const newUserId = response.data.video.userPosting;
        // Get User and Information to push to client

        const getUserInfo = async () => {
          try {
            const response1 = await axiosPrivate.get(`/users/${newUserId}`, {
              // headers: { "Content-Type": "multipart/form-data" },
            });
            setUserInfo(response1.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUserInfo();

        const getComments = async () => {
          try {
            const response = await axiosPrivate.post(`/comments/getComments`, {
              videoId,
            });
            console.log(response);
            setCommentList(response.data.comments);
          } catch (err) {
            console.log(err);
          }
        };
        getComments();
        setVideo(response.data.video);
        videoFileString = response.data.video.filePath;
      } catch (err) {
        console.log(err);
        alert("Failed To get Video", err);
      }
    };
    getVideo();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [params]);

  const updateComment = (newComment) => {
    setCommentList(commentList.concat(newComment));
  };

  // console.log(video.createdAt);
  // console.log(video);
  // console.log(userInfo);

  if (userInfo._id && auth._id) {
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
              <UserPostInfo
                // user={userInfo.username}
                user={userInfo.username}
                // pic={video.userPosting && video.userPosting.avatar} Need ti implement this into model
                postedDate={<TimeCalc postDate={new Date(video.createdAt)} />}
                className="pr-user-info"
              />
              <div className="view-content-info-user-interactions">
                <LikeDislike video videoId={videoId} userId={auth._id} />
                {/* !THIS MAY BE THE BUG */}
                <Subscriber userTo={userInfo._id} userFrom={auth._id} />
              </div>
            </div>

            <div className="pr-video-info view-container-heading">
              <h3>{video.title}</h3>
              <h5 className="text-gray">{video.description}</h5>
            </div>
            {/* <PostLikeDisLikeLight userComments={state.uploadedVid.comments} /> */}
            {/* <CommentBox /> */}
            <Comments
              commentList={commentList}
              auth={auth._id}
              postId={video._id}
              refreshFunction={updateComment}
            />
          </div>
        </div>
        <SideVideos />
      </div>
    );
  } else {
    return (
      <div
        className="page"
        style={{ paddingLeft: "calc(var(--nav-w) - 2%)", height: "100vh" }}
      >
        <div className="view-container">
          <div className="view-content">
            <h1>Loading</h1>
          </div>
        </div>
      </div>
    );
  }
};
export default PrimeShow;
