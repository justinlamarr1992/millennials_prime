import React, { useState } from "react";
import { axiosPrivate } from "../../API/axios";
import TimeCalc from "./TimeCalc";

const SingleComment = ({ comment, postId, refreshFunction, auth }) => {
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/comments", {
        content: commentValue,
        writer: auth,
        postId,
        responseTo: comment._id,
      });
      console.log(response);
      setCommentValue("");
      setOpenReply(!openReply);
      refreshFunction(response.data.result);
    } catch (err) {
      console.log("Failed to Save Reply Comment");
      alert(err);
    }
  };

  // const actions = [
  //   <h1
  //     onClick={handleOpenReply}
  //     className="test_black"
  //     key="comment-basic-reply-to"
  //   >
  //     Reply
  //   </h1>,
  // ];

  return (
    // TODO: FIX THE CONTAINERS  so the extra top is not needed
    <div
      className="comment-box-reply-container clickable"
      onClick={handleOpenReply}
    >
      <div className="comment-box-user">
        {/* <div className="comment-box-user-pic square-container">
        <h4 className="square-container-contents">User Picture here</h4>
        <img className="square-container-contents" src={User} alt="" />
      </div> */}

        <h4 className="comment-box-user-name">{comment.writer.username}</h4>
        <h6 className="comment-box-user-date text-gray">
          <TimeCalc postDate={new Date(comment.createdAt)} />
        </h6>
        <h5 className="comment-box-user-comment">{comment.content}</h5>
        {/* <h6
          className="comment-box-user-reply-toggle"
          onClick={handleOpenReply}
          //  actions={actions}
        >
          Click
        </h6> */}
      </div>

      {openReply && (
        <form onSubmit={onSubmit} className="comment-box-reply">
          <textarea
            // ref={textRef}
            // onClick={onExpand}
            // onFocus={onExpand}
            onChange={handleChange}
            className="comment-box-reply-field"
            placeholder="Reply to the Comment"
            value={commentValue}
            // name="comment"
            // id="comment"
          />
          <div className="comment-reply-box-actions">
            <button
              type="submit"
              className="post-button"
              // disabled={commentValue.length < 1}
            >
              Respond
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SingleComment;

//
