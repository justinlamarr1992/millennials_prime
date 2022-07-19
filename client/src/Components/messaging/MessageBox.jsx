import React, { useState, useRef } from "react";
import User from "../../Assets/Images/user.jpeg";
import useDynamicHeightField from "../reusuables/post/useDynamicHeightField";

const MessageBox = ({ placeHolder }) => {
  const [commentValue, setCommentValue] = useState("");
  const textRef = useRef(null);
  const containerRef = useRef(null);
  // const placeHolder = "This is the Text";

  useDynamicHeightField(textRef, commentValue);

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      "This is where we Send this form data to save to users post of comments"
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      ref={containerRef}
      onChange={onChange}
      className="reply-box"
    >
      <textarea
        ref={textRef}
        onChange={onChange}
        className="reply-box-field"
        // placeholder={placeholder}
        placeholder={placeHolder}
        value={commentValue}
        name="comment"
        id="comment"
      />
    </form>
  );
};
export default MessageBox;
