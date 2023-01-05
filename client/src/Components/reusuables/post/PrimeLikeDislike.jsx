import React, { useEffect, useState } from "react";
import { FaHeart, FaSkull, FaRegCommentAlt, FaShare } from "react-icons/fa";
import ShareBox from "../ShareBox";
// import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { axiosPrivate } from "../../../API/axios";
// import axios, { axiosPrivate } from "../../API/axios";
// import { axiosPrivate } from "../../../API/axios";

const PrimeLikeDislike = ({ video, videoId, userId, comment, commentId }) => {
  // const axiosPrivate = useAxiosPrivate();

  console.log(video);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(true);
  const [skull, setSkull] = useState(true);

  let variable = {};
  console.log(videoId);
  if (video) {
    console.log(videoId);
    variable = { videoId, userId };
  } else {
    variable = { commentId, userId };
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getLikesDislikes = async () => {
      try {
        console.log("Before the axios request");
        const response = await axiosPrivate.post(`/likes/getlikes`, variable);
        console.log("After the axios Request");
        if (response.data.success) {
          // How many likes does thi video have
          setLikes(response.data.likes.length);

          // If I already cliked this button
          response.data.likes.map((like) => {
            if (like.userId === userId) {
              setLikeAction("liked");
            }
          });
        }
        console.log(likes);
      } catch (err) {
        // console.log(err);
        console.log("Failed to get Likes", err);

        // console.log("Failed To get Likes and Dislikes", err);
        // alert("Failed To get Likes and Dislikes", err);
      }

      try {
        const response = await axiosPrivate.post(
          `/likes/getdislikes`,
          variable
        );
        if (response.data.success) {
          // How many dislikes does thi video have
          setDislikes(response.data.dislikes.length);

          // If I already cliked this button
          response.data.dislikes.map((dislike) => {
            if (dislike.userId === userId) {
              setDislikeAction("disliked");
            }
          });
        }
        console.log(dislikes);
      } catch (err) {
        // console.log(err);
        console.log("Failed to get Dislikes", err);

        // console.log("Failed To get Likes and Dislikes", err);
        // alert("Failed To get Likes and Dislikes", err);
      }
    };

    getLikesDislikes();
    return () => {
      isMounted = false;
      controller.abort();
      // this now gets called when the component unmounts
    };
  }, []);

  const heartClick = async () => {
    console.log("Beginning of the Heart click");
    if (likeAction === null) {
      try {
        const response = await axiosPrivate.post(`/likes/postlike`, variable);
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");

          // If dislike is already clicked

          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        }
      } catch (err) {
        console.log("Failed to increase Likes", err);
      }
    } else {
      try {
        const response = await axiosPrivate.post(`/likes/unlike`, variable);
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        }
      } catch (err) {
        console.log("Failed to Unlike", err);
      }
    }

    console.log("End of Heart Click");
  };

  const skullClick = async () => {
    if (dislikeAction === null) {
      try {
        const response = await axiosPrivate.post(
          `/likes/postdislike`,
          variable
        );
        if (response.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction("disliked");

          //   If like is already clicked

          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        }
      } catch (err) {
        console.log("Failed ti increase Dislikes", err);
      }
    } else {
      try {
        const response = await axiosPrivate.post(`/likes/undislike`, variable);
        if (response.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        }
      } catch (err) {
        console.log("Failed to Undislike");
      }
    }
  };

  return (
    <div className=" pr-like-dislike-comp post-like-dislike post-video ">
      <button className="post-like-btn" id="heart" onClick={heartClick}>
        <span className="like-dislike-number">
          <FaHeart className="heart" />
          <h5 className="heart-number">{likes}</h5>
        </span>
      </button>
      <button className="post-like-btn " id="skull" onClick={skullClick}>
        <span className="like-dislike-number">
          <FaSkull className="skull" />
          <h5 className="skull-number">{dislikes}</h5>
        </span>
      </button>
    </div>
  );
};
export default PrimeLikeDislike;
