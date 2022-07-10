import React, { useState, useRef } from "react";
import cn from "classnames";

const INITIAL_HEIGHT = 46;

const ShareBox = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  //   useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={onExpand}
      onFocus={onExpand}
      //   onChange={onChange}
      className={cn("comment-box", {
        expanded: isExpanded,
        collapsed: !isExpanded,
        modified: commentValue.length > 0,
      })}
      style={{ minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT }}
    >
      <h1>TESTING</h1>
    </div>
  );
};
export default ShareBox;
