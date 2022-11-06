import React from "react";

const SingleComment = () => {
  return (
    <div className="comment-box-user">
      {/* <div className="comment-box-user-pic square-container">
        <h4 className="square-container-contents">User Picture here</h4>
        <img className="square-container-contents" src={User} alt="" />
      </div> */}

      <h4 className="comment-box-user-name">Test HArd Code</h4>
      <h6 className="comment-box-user-date">
        {/* <TimeCalc postDate={new Date(data.postedDate)} /> */}
        Date should be here
      </h6>
      <h5 className="comment-box-user-comment">Test Comment</h5>
    </div>
  );
};

export default SingleComment;

//
