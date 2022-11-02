// // CHANGING  THE TOP SECTION FROM SHOWING USER PICTURE AND NAME AND JUST SHOWING PREVIOUS COMMENTS!!!! MAKES THE MOST SENSE!!!

// import React, { useState, useRef } from "react";
// import User from "../../Assets/Images/user.jpeg";
// // import "../components.css";
// import cn from "classnames";
// import useDynamicHeightField from "./post/useDynamicHeightField";
// import TimeCalc from "./TimeCalc";

// import { primePostData } from "./post/data";

// const INITIAL_HEIGHT = 46;

// const CommentBox = ({}) => {
//   // const CommentBox = ({ userComments }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const [userValue, setUserValue] = useState("");
//   const [userPicValue, setUserPicValue] = useState("");
//   const [timeValue, setTimeValue] = useState("");
//   //   const [iDValue, setIDValue] = useState(userComments.length);
//   const [iDValue, setIDValue] = useState(0);
//   const [commentValue, setCommentValue] = useState("");
//   const [likeValue, setLikeValue] = useState(false);

//   const fakeArray = [];

//   const outerHeight = useRef(INITIAL_HEIGHT);
//   const textRef = useRef(null);
//   const containerRef = useRef(null);

//   useDynamicHeightField(textRef, commentValue);

//   // const onExpand = () => {
//   //   if (!isExpanded) {
//   //     outerHeight.current = containerRef.current.scrollHeight;
//   //     setIsExpanded(true);
//   //   }
//   // };

//   const onChange = (e) => {
//     setCommentValue(e.target.value);
//     setUserValue("Test User");
//     setUserPicValue("Test User");
//     setTimeValue(new Date());
//     setLikeValue(true);
//   };

//   const onClose = () => {
//     setCommentValue("");
//     setIsExpanded(false);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     console.log(commentValue);
//     const newComment = {
//       user: userValue,
//       pic: userPicValue,
//       postedDate: timeValue,
//       id: primePostData[0].uploadedVid.comments.length + 1,
//       comment: commentValue,
//       like: true,
//     };
//     console.log(new Date());

//     // console.log(newComment);
//     fakeArray.push(newComment);
//     // console.log(fakeArray);
//     primePostData[0].uploadedVid.comments.push(newComment);
//     console.log(primePostData[0].uploadedVid.comments);
//     console.log(iDValue);
//   };

//   const sortedComments = primePostData.sort((a, b) => b.date - a.date);

//   return (
//     <form
//       onSubmit={onSubmit}
//       ref={containerRef}
//       // onClick={onExpand}
//       // onFocus={onExpand}
//       onChange={onChange}
//       className={cn("comment-box", {
//         expanded: isExpanded,
//         collapsed: !isExpanded,
//         // modified: commentValue.length > 0,
//       })}
//       // style={{ minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT }}
//     >
//       <div className="comment-box-header">
//         <div className="comment-box-header-user">
//           <img className="comment-box-avatar" src={User} alt="User Avatar" />
//           <h4 className="comment-box-avatar-name">User Name Here</h4>
//         </div>
//       </div>
//       <textarea
//         ref={textRef}
//         // onClick={onExpand}
//         // onFocus={onExpand}
//         onChange={onChange}
//         className="comment-box-field"
//         placeholder="Leave a Comment"
//         value={commentValue}
//         name="comment"
//         id="comment"
//       />
//       <div className="comment-box-actions">
//         <button
//           type="button"
//           className="comment-cancel post-button"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="post-button"
//           disabled={commentValue.length < 1}
//         >
//           Respond
//         </button>
//       </div>
//       <div className="prev-comment text-gray">
//         <div className="prev-comment-comments">
//           {userComments.map((data) => (
//             <div className="comment-box-user">
//               <div className="comment-box-user-pic square-container">
//                 <img
//                   className="square-container-contents"
//                   src={data.pic}
//                   alt=""
//                 />
//               </div>

//               <h4 className="comment-box-user-name">{data.user}</h4>
//               <h6 className="comment-box-user-date">
//                 <TimeCalc postDate={new Date(data.postedDate)} />
//               </h6>
//               <h5 className="comment-box-user-comment">{data.comment}</h5>
//             </div>
//           ))}
//         </div>
//       </div>
//     </form>
//   );
// };
// export default CommentBox;
