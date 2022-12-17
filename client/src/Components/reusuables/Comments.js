import React, { useState, useRef } from "react";

import cn from "classnames";
import User from "../../Assets/Images/user.jpeg";
import axios, { axiosPrivate } from "../../API/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment.js";

import "../reusuables/post/post.css";

const INITIAL_HEIGHT = 46;

const Comments = ({ commentList, auth, postId, refreshFunction }) => {
  const [comment, setComment] = useState("");

  const textRef = useRef(null);
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/comments", {
        content: comment,
        writer: auth,
        postId,
      });
      console.log(response);
      setComment("");
      refreshFunction(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment-container">
      <h4>Comments</h4>
      <hr />
      {/* Main Comment Form */}
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        // onClick={onExpand}
        // onFocus={onExpand}
        // onChange={onChange}
        // className={cn("comment-box", {
        //   expanded: isExpanded,
        //   collapsed: !isExpanded,
        //   modified: commentValue.length > 0,
        // })}
        className="comment-box"
        // style={{ minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT }}
      >
        <textarea
          ref={textRef}
          // onClick={onExpand}
          // onFocus={onExpand}
          onChange={handleChange}
          className="comment-box-field"
          placeholder="Leave a Comment"
          value={comment}
        />
        <div className="comment-box-actions">
          <button
            type="submit"
            className="post-button"
            // disabled={commentValue.length < 1}
          >
            Respond
          </button>
        </div>
        {/* <div className="prev-comment text-gray">
          <div className="prev-comment-comments"></div>
        </div> */}
      </form>
      {/* Comment list */}
      <div className="prev-comment text-gray">
        <div className="prev-comment-comments">
          {commentList &&
            commentList.map(
              (comment, index) =>
                !comment.responseTo && (
                  <React.Fragment>
                    <SingleComment
                      comment={comment}
                      postId={postId}
                      refreshFunction={refreshFunction}
                      auth={auth}
                    />
                    <ReplyComment
                      commentList={commentList}
                      postId={postId}
                      refreshFunction={refreshFunction}
                      parentCommentID={comment._id}
                      auth={auth}
                    />
                  </React.Fragment>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
