import React, { useState } from "react";
import { FaHeart, FaSkull, FaRegCommentAlt, FaShare } from "react-icons/fa";
import CommentBox from "../CommentBox";

const PostLikeDisLike = () => {
  const [comments, setComments] = useState(false);

  const onClick = () => {
    setComments(!comments);
  };
  return (
    <div className="post-interaction feed-post-interactions">
      <div className="post-like-dislike">
        <div className="post-like-dislike-left">
          <button className="post-like-btn">
            <FaHeart className="text-gray" />
          </button>

          <button className="post-like-btn">
            <FaSkull className="text-gray" />
          </button>
          <button onClick={onClick} className="post-like-btn">
            <div className="post-comment">
              {/* Figure a way to expand the comments by pressing this */}
              <FaRegCommentAlt className="text-gray post-btn-space" />
              <h5>100</h5>
            </div>
          </button>
        </div>
        <div className="post-like-dislike-right">
          <button className="post-like-btn">
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
    </div>
  );
};
export default PostLikeDisLike;
