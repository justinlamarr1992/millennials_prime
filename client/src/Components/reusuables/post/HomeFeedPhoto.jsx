// import React from "react";
// import ItemUserInfo from "../ItemUserInfo";
// import PostLikeDisLike from "./PostLikeDislike";
// import img1 from "../../../Assets/Images/user.jpeg";
// import img2 from "../../../Assets/Images/Logo.png";
// import img3 from "../../../Assets/Images/image1.png";

// import { photoData } from "./data";
// const HomeFeedPhoto = ({
//   user,
//   pic,
//   postedDate,
//   status,
//   modal,
//   setModal,
//   images,
// }) => {
//   // Make a fuction that changes the layout of container depending on how many pictures are uploaded
//   return (
//     <div>
//       {photoData.map((data) => (
//         <section
//           className={
//             "post-photo-container norm-container con-shade " +
//             (modal ? "no-wrapping" : "wrapping")
//           }
//         >
//           <ItemUserInfo
//             user={data.user}
//             pic={data.pic}
//             postedDate={data.postedDate}
//             className="pr-user-info item-user-info"
//           />

//           <h5 className="feed-post-text text-gray">{data.status}</h5>
//           <div className="feed-photos-gallery">
//             <img
//               className="feed-photos-images photo1 con-shade"
//               src={data.images[0].uploadedPic.image}
//               alt="first image"
//             />
//             <img
//               className="feed-photos-images photo2 con-shade"
//               src={data.images[1].uploadedPic.image}
//               alt=""
//             />
//             <img
//               className="feed-photos-images photo3 con-shade"
//               src={data.images[2].uploadedPic.image}
//               alt=""
//             />
//             <img
//               className="feed-photos-images photo4 con-shade"
//               src={data.images[3].uploadedPic.image}
//               alt=""
//             />
//             <img
//               className="feed-photos-images photo5 con-shade"
//               src={data.images[4].uploadedPic.image}
//               alt=""
//             />
//             {/* <h1>{stuff.id}</h1> */}
//             {/* <h1>{stuff.pictures}</h1> */}
//             {/* <h1>{stuff.number}</h1> */}
//           </div>
//           <PostLikeDisLike />
//         </section>
//       ))}
//     </div>
//   );
// };
// export default HomeFeedPhoto;
