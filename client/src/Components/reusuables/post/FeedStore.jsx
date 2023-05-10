// import React, { useEffect, useState } from "react";
// import ItemUserInfoUnder from "../ItemUserInfoUnder";
// import Item from "../../../Assets/Images/Microphone.jpg";

// import { storeData } from "./data";

// const FeedStore = ({ modal, setModal }) => {
//   //   const [wrap, setWrap] = useState(true);

//   return (
//     <section
//       className={
//         "post-store-container nonprime-container p-con-shade " +
//         (modal ? "no-wrapping" : "wrapping")
//       }
//     >
//       <div className="feed-post-e-comm p-item-shade hovering">
//         <img
//           src={storeData[0].store[1].item.itemPic}
//           className="ecomm-pic p-item-shade hovering"
//           alt="Users Image"
//         />
//         {/* TODO: make a link to the item indivually */}
//       </div>
//       <div className="feed-post-e-comm-info">
//         <h2 className="feed-post-e-comm-info-item">
//           {storeData[0].store[1].item.itemName}
//         </h2>
//         <h5 className="feed-post-e-comm-info-description text-gray">
//           {storeData[0].store[1].item.itemDescription}
//         </h5>
//       </div>
//       <ItemUserInfoUnder
//         user={storeData[0].user}
//         pic={storeData[0].pic}
//         postedDate={storeData[0].postedDate}
//       />
//       <button className="feed-post-episode-button p-con-shade">
//         <div className="feed-post-button-border">
//           <h4>${storeData[0].store[1].item.price}</h4>
//         </div>
//       </button>
//     </section>
//   );
// };
// export default FeedStore;
