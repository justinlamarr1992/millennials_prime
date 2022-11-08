import React from "react";
import SingleComment from "./SingleComment";

const ReplyComment = () => {
  let renderReplyComment = ({ commentList, auth, postId, refreshFunction }) => {
    commentList &&
      commentList.map((comment, index) => (
        <React.Fragment>
          <SingleComment
            comment={comment}
            postId={postId}
            refreshFunction={refreshFunction}
            auth={auth}
          />
          <ReplyComment />
        </React.Fragment>
      ));
  };

  return (
    <div>
      <h6
      //    onClick={}
      >
        View more Comment(s)
      </h6>
      {renderReplyComment}
    </div>
  );
};

export default ReplyComment;
