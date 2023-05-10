// import React, { useEffect, useState } from "react";
// import ItemUserInfoUnder from "../ItemUserInfoUnder";
// import EpisodeVideo from "./EpisodeVideo";
// import PostLikeDisLike from "./PostLikeDislike";

// import { episodeData, videoData } from "./data";

// const FeedEpisode = ({ modal, setModal }) => {
//   return (
//     <section
//       className={
//         "post-episode-container nonprime-container p-con-shade wrapping " +
//         (modal ? "no-wrapping" : "wrapping")
//       }
//     >
//       <EpisodeVideo episode={episodeData[0].episodes[0].uploadedVid.video} />
//       <ItemUserInfoUnder
//         user={episodeData[0].user}
//         pic={episodeData[0].pic}
//         postedDate={episodeData[0].postedDate}
//       />
//       <button className="feed-post-episode-button p-con-shade">
//         <div className="button-border-test">
//           <h4>Next</h4>
//         </div>
//       </button>
//       {/* //TODO: Change Marquee */}
//       <marquee className="feed-post-episode-title">
//         <h4>{episodeData[0].episodes[0].uploadedVid.title}</h4>
//       </marquee>
//       {/* <h4 className="feed-post-episode-title">
//         Episode 2: Example Episode Titl...
//       </h4> */}
//       {/* <h5 className="item-user-status text-gray">{status}</h5> */}
//       {/* <h5 className="feed-post-text text-gray">
//         This is the Status of the Video post
//       </h5> */}
//       {/* <Video /> */}
//       {/* <PostLikeDisLike /> */}
//     </section>
//   );
// };
// export default FeedEpisode;
