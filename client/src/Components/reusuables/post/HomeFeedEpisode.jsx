// import React, { useEffect, useState } from "react";
// import ItemUserInfoUnder from "../ItemUserInfoUnder";
// import EpisodeVideo from "./EpisodeVideo";

// import { episodeData } from "./data";

// const HomeFeedEpisode = ({ modal, setModal }) => {
//   return (
//     <div>
//       {episodeData((data) => (
//         <section
//           className={
//             "post-episode-container nonprime-container p-con-shade wrapping " +
//             (modal ? "no-wrapping" : "wrapping")
//           }
//         >
//           <EpisodeVideo episode={data.episodes[0].uploadedVid.video} />
//           <ItemUserInfoUnder
//             user={data.user}
//             pic={data.pic}
//             postedDate={data.postedDate}
//           />
//           <button className="feed-post-episode-button p-con-shade">
//             <div className="button-border-test">
//               <h4>Next</h4>
//             </div>
//           </button>
//           {/* //TODO: Change Marquee */}
//           {/* <h3 className="item-user-content">{title}</h3> */}
//           <marquee className="feed-post-episode-title">
//             <h4>{data.episodes[0].uploadedVid.title}</h4>
//           </marquee>
//         </section>
//       ))}
//     </div>
//   );
// };
// export default HomeFeedEpisode;
