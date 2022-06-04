import React, { useState, useRef } from "react";
import User from "../../Assets/Images/user.jpeg";
// import "../components.css";
import cn from "classnames";
import useDynamicHeightField from "./post/useDynamicHeightField";

const INITIAL_HEIGHT = 46;

const CommentBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
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
      onClick={onExpand}
      onFocus={onExpand}
      onChange={onChange}
      className={cn("comment-box", {
        expanded: isExpanded,
        collapsed: !isExpanded,
        modified: commentValue.length > 0,
      })}
      style={{ minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT }}
    >
      <div className="comment-box-header">
        <div className="comment-box-header-user">
          <img className="comment-box-avatar" src={User} alt="User Avatar" />
          <h4 className="comment-box-avatar-name">User Name Here</h4>
        </div>
      </div>

      <label className="comment-box-label" htmlFor="comment">
        Leave a Comment
      </label>
      <textarea
        ref={textRef}
        onClick={onExpand}
        onFocus={onExpand}
        onChange={onChange}
        className="comment-box-field"
        placeholder="Leave a Comment"
        value={commentValue}
        name="comment"
        id="comment"
      />
      <div className="comment-box-actions">
        <button
          type="button"
          className="comment-cancel post-button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="post-button"
          disabled={commentValue.length < 1}
        >
          Respond
        </button>
      </div>
    </form>
  );
};
export default CommentBox;
