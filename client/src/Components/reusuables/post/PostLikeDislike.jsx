import React, { useState } from "react";
import { FaHeart, FaSkull, FaRegCommentAlt, FaShare } from "react-icons/fa";
import CommentBox from "../CommentBox";
import ShareBox from "../ShareBox";

const PostLikeDisLike = () => {
  const [comments, setComments] = useState(false);
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(true);
  const [skull, setSkull] = useState(true);

  const onClick = () => {
    setComments(!comments);
    setShare(false);
  };
  const shareClick = () => {
    setShare(!share);
    setComments(false);
  };
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
    <div className="post-interaction feed-post-interactions">
      <div className="post-like-dislike">
        <div className="post-like-dislike-left">
          {heart == true && (
            <button className="post-like-btn" id="heart" onClick={heartClick}>
              <FaHeart className="heart" />
            </button>
          )}
          {skull == true && (
            <button className="post-like-btn " id="skull" onClick={skullClick}>
              <FaSkull className="skull" />
            </button>
          )}

          <button onClick={onClick} className="post-like-btn">
            <div className="post-comment">
              {/* Figure a way to expand the comments by pressing this */}
              <FaRegCommentAlt className="comment-icon" />
              <h5>100</h5>
            </div>
          </button>
        </div>
        <div className="post-like-dislike-right">
          <button className="post-like-btn" onClick={shareClick}>
            <div className="post-share">
              <h5 className="post-btn-space">Share</h5>
              <FaShare />
            </div>
          </button>
        </div>
      </div>
      {comments && (
        <div className="post-comment">
          <CommentBox />
        </div>
      )}
      {share && (
        <div className="post-comment">
          <ShareBox />
        </div>
      )}
    </div>
  );
};
export default PostLikeDisLike;
