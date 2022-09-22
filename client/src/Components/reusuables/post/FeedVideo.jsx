// import React, { useEffect, useState } from "react";
// import Video from "../../video/Video";
// import ItemUserInfo from "../ItemUserInfo";
// import PostLikeDisLike from "./PostLikeDislike";

// import { videoData } from "./data";
// const FeedVideo = ({ modal, setModal }) => {
//   return (
//     <section
//       className={
//         "post-video-container norm-container con-shade " +
//         (modal ? "no-wrapping" : "wrapping")
//       }
//     >
//       <ItemUserInfo
//         user={videoData[0].user}
//         pic={videoData[0].pic}
//         postedDate={videoData[0].postedDate}
//         className="pr-user-info item-user-info"
//       />
//       <h3 className="feed-post-video-title">
//         {videoData[0].videos[0].uploadedVid.title}
//       </h3>

//       {/* <h5 className="item-user-status text-gray">{status}</h5> */}
//       {/* <h5 className="feed-post-text text-gray">
//         This is the Status of the Video post
//       </h5> */}
//       <Video video={videoData[0].videos[0].uploadedVid.video} />
//       <PostLikeDisLike />
//     </section>
//   );
// };
// export default FeedVideo;
