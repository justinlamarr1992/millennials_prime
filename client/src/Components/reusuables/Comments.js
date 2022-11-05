import React, { useState, useRef } from "react";

import cn from "classnames";
import User from "../../Assets/Images/user.jpeg";
import axios, { axiosPrivate } from "../../API/axios";

const INITIAL_HEIGHT = 46;

const Comments = ({ commentList, auth, postId, refreshFunction }) => {
  const [comment, setComment] = useState("");

  const [isExpanded, setIsExpanded] = useState(true);

  const [userValue, setUserValue] = useState("");
  const [userPicValue, setUserPicValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  //   const [iDValue, setIDValue] = useState(userComments.length);
  const [iDValue, setIDValue] = useState(0);
  const [commentValue, setCommentValue] = useState("");
  const [likeValue, setLikeValue] = useState(false);

  const outerHeight = useRef(INITIAL_HEIGHT);
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

  //   const onChange = (e) => {
  //     setCommentValue(e.target.value);
  //     setUserValue("Test User");
  //     setUserPicValue("Test User");
  //     setTimeValue(new Date());
  //     setLikeValue(true);
  //   };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  return (
    <div>
      <h4>Comments</h4>
      <hr />
      {/* Comment list */}

      {console.log(commentList)}

      {/* Main Comment Form */}
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        // onClick={onExpand}
        // onFocus={onExpand}
        // onChange={onChange}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0,
        })}
        style={{ minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT }}
      >
        <div className="comment-box-header">
          <div className="comment-box-header-user">
            {/* <img className="comment-box-avatar" src={User} alt="User Avatar" /> */}
            <h4 className="comment-box-avatar">User Picture here</h4>
            <h4 className="comment-box-avatar-name">User Name Here</h4>
          </div>
        </div>
        <textarea
          ref={textRef}
          // onClick={onExpand}
          // onFocus={onExpand}
          onChange={handleChange}
          className="comment-box-field"
          placeholder="Leave a Comment"
          //   value={commentValue}
          name="comment"
          id="comment"
        />
        <div className="comment-box-actions">
          <button
            type="button"
            className="comment-cancel post-button"
            // onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="post-button"
            // disabled={commentValue.length < 1}
          >
            Respond
          </button>
        </div>
        <div className="prev-comment text-gray">
          <div className="prev-comment-comments">
            {/* {userComments.map((data) => ( */}
            <div className="comment-box-user">
              <div className="comment-box-user-pic square-container">
                <h4 className="square-container-contents">User Picture here</h4>
                {/* <img className="square-container-contents" src={User} alt="" /> */}
              </div>

              {/* <h4 className="comment-box-user-name">{data.user}</h4> */}
              <h4 className="comment-box-user-name">Test HArd Code</h4>
              <h6 className="comment-box-user-date">
                {/* <TimeCalc postDate={new Date(data.postedDate)} /> */}
                Date should be here
              </h6>
              <h5 className="comment-box-user-comment">Test Comment</h5>
              {/* <h5 className="comment-box-user-comment">{data.comment}</h5> */}
            </div>
            {/* ))} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;
