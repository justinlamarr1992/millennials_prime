import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import LikeDislike from "./post/LikeDislike";
import TimeCalc from "./TimeCalc";
import User from "../../Assets/Images//ProfileAvatar.png";

const SingleComment = ({ comment, postId, refreshFunction, auth }) => {
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);
  // const [replyToText, setReplyToText] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const [profileImage, setProfileImage] = useState({ image: "" });

  useEffect(() => {
    console.log(comment.writer);
    const _id = comment.writer;

    const getUserProfilePic = async () => {
      try {
        const response = await axiosPrivate.post("/users/getpic", { _id });
        console.log(response.data.getImageToClient);
        // setProfileImage(response.data.getImageToClient);
        // console.log(profileImage);
        setProfileImage({
          ...profileImage,
          image: response.data.getImageToClient,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserProfilePic();
  }, []);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };
  // const handleReplyTextChange = () => {}
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
  //   <span onClick={handleOpenReply} key="comment-basic-reply-to">
  //     Reply to
  //   </span>
  // ];

  return (
    // TODO: FIX THE CONTAINERS  so the extra top is not needed
    <div className="comment-box-reply-container ">
      <div className="comment-box-user">
        <div className="comment-box-user-pic square-container">
          <img
            className="square-container-contents"
            src={profileImage.image || User}
            alt=""
          />
        </div>

        <h4 className="comment-box-user-name">{comment.writer.username}</h4>
        <h6 className="comment-box-user-date text-gray">
          <TimeCalc postDate={new Date(comment.createdAt)} />
        </h6>
        <h5 className="comment-box-user-comment">{comment.content}</h5>
        <span
          className="comment-box-user-toggle clickable"
          onClick={handleOpenReply}
          key="comment-basic-reply-to"
        >
          Reply to
        </span>
        <LikeDislike comment commentId={comment._id} userId={auth} />
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
