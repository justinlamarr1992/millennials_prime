import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentList,
  postId,
  refreshFunction,
  parentCommentID,
  auth,
}) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentList.map((comment) => {
      if (comment.responseTo === parentCommentID) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentList, parentCommentID]);

  let renderReplyComment = (parentCommentID) => {
    commentList.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentID && (
          <div>
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
          </div>
        )}
      </React.Fragment>
    ));
  };

  const handleChange = () => {
    setOpenReplyComment(!openReplyComments);
    console.log(openReplyComments);
  };

  return (
    <div className="reply-comment clickable">
      {childCommentNumber > 0 && (
        <h6 onClick={handleChange}>View {childCommentNumber} more Comments</h6>
      )}

      {openReplyComments && renderReplyComment(parentCommentID)}
    </div>
  );
};

export default ReplyComment;
