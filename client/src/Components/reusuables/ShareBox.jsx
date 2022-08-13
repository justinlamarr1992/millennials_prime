import React, { useState, useRef } from "react";
import cn from "classnames";
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaRegEnvelope,
  FaRegComment,
} from "react-icons/fa";
import instagramSvg from "../../Assets/Images/instagram.svg";
import insta from "../../Assets/Images/InstagramLogo.svg";

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
      <h4 className="share-text">Share With...</h4>
      <div className="share-socials ">
        <div className="share-socials-item ">
          <FaFacebookSquare className="share-socials-facebook" />
          <h4>Facebook</h4>
        </div>
        <div className="share-socials-item ">
          <FaTwitter className="share-socials-twitter" />
          <h4>Twitter</h4>
        </div>
        <div className="share-socials-item ">
          {/* Fix this */}
          <img src={insta} alt="" className="share-socials-instagram" />

          <h4>Instagram</h4>
        </div>
        <div className="share-socials-item ">
          <FaLinkedin className="share-socials-linkedIn" />
          <h4>LinkedIn</h4>
        </div>
        <div className="share-socials-item ">
          <FaRegEnvelope className="share-socials-email" />
          <h4>Email</h4>
        </div>
        <div className="share-socials-item ">
          <FaRegComment className="share-socials-text" />
          <h4>Text Message</h4>
        </div>
      </div>
    </div>
  );
};
export default ShareBox;
