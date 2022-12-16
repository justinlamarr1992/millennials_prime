import React, { useEffect, useState } from "react";
import { FaHeart, FaSkull, FaRegCommentAlt, FaShare } from "react-icons/fa";
import ShareBox from "../ShareBox";

const LikeDislike = ({ video, videoId, userId, comment, commentId }) => {
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(true);
  const [skull, setSkull] = useState(true);

  const varible = {};
  if (video) {
    varible = { videoId, userId };
  } else {
    varible = { commentId, userId };
  }

  useEffect(() => {
    const getLikesDislikes = async () => {
      try {
        const response = await axiosPrivate.post(`/videos/${videoId}`, {});
        console.log("New Likes Dislikes ", response);
        // const newUserId = response.data.video.userPosting;
        // Get User and Information to push to client
        // setVideo(response.data.video);
        // videoFileString = response.data.video.filePath;
      } catch (err) {
        console.log(err);
        alert("Failed To get Likes and Dislikes", err);
      }
    };
    getLikesDislikes();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const heartClick = () => {
    console.log(heart);
    if (heart == true && skull == true) {
      setSkull(false);
      console.log("Heart is ", heart, " and Skull is ", skull);
    } else if (skull == false) {
      setHeart(false);
      setSkull(true);
      console.log("Heart is ", heart, " and Skull is ", skull);
    }
  };
  const skullClick = () => {
    console.log(skull);
    if (skull == true && heart == true) {
      setHeart(false);
      console.log("Heart is ", heart, " and Skull is ", skull);
    } else if (heart == false) {
      setHeart(true);
      setSkull(false);
      console.log("Heart is ", heart, " and Skull is ", skull);
    }
  };

  return (
    <div className="post-like-dislike post-video comment-box-user-like-dislike">
      {heart == true && (
        <button className="post-like-btn" id="heart" onClick={heartClick}>
          <span className="like-dislike-number">
            <FaHeart className="heart" />
            <h5>555</h5>
          </span>
        </button>
      )}
      {skull == true && (
        <button className="post-like-btn " id="skull" onClick={skullClick}>
          <span className="like-dislike-number">
            <FaSkull className="skull" />
            <h5>555</h5>
          </span>
        </button>
      )}
    </div>
  );
};
export default LikeDislike;
