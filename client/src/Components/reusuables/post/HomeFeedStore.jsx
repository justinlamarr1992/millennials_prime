// import React, { useEffect, useState } from "react";
// import ItemUserInfoUnder from "../ItemUserInfoUnder";
// import Item from "../../../Assets/Images/Microphone.jpg";

// import { storeData } from "./data";

// const HomeFeedStore = ({ modal, setModal }) => {
//   const [itemNum, setItemNum] = useState(2);

//   return (
//     <div>
//       {storeData.map((data) => (
//         <section
//           className={
//             "post-store-container prime-container p-con-shade " +
//             (modal ? "no-wrapping" : "wrapping")
//           }
//         >
//           <div className="feed-post-e-comm p-item-shade hovering">
//             <img
//               src={data.store[itemNum].item.itemPic}
//               className="ecomm-pic p-item-shade hovering"
//               alt="Users Image"
//             />
//             {/* TODO: make a link to the item indivually */}
//           </div>
//           <div className="feed-post-e-comm-info">
//             <h2 className="feed-post-e-comm-info-item">
//               {data.store[itemNum].item.itemName}
//             </h2>
//             <h5 className="feed-post-e-comm-info-description text-gray">
//               {data.store[itemNum].item.itemDescription}
//             </h5>
//           </div>
//           <ItemUserInfoUnder
//             user={data.user}
//             pic={data.pic}
//             postedDate={data.postedDate}
//           />
//           <button className="feed-post-episode-button p-con-shade">
//             <div className="feed-post-button-border">
//               <h4>${data.store[itemNum].item.price}</h4>
//             </div>
//           </button>
//         </section>
//       ))}
//     </div>
//   );
// };
// export default HomeFeedStore;
