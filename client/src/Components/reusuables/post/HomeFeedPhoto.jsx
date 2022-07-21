import React from "react";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";
import img1 from "../../../Assets/Images/user.jpeg";
import img2 from "../../../Assets/Images/Logo.png";
import img3 from "../../../Assets/Images/image1.png";

import { photoData } from "./data";
const HomeFeedPhoto = ({
  user,
  pic,
  postedDate,
  status,
  modal,
  setModal,
  images,
}) => {
  // Make a fuction that changes the layout of container depending on how many pictures are uploaded
  return (
    <div>
      <section
        className={
          "post-photo-container norm-container con-shade " +
          (modal ? "no-wrapping" : "wrapping")
        }
      >
        <ItemUserInfo
          user={user}
          pic={pic}
          postedDate={postedDate}
          className="pr-user-info item-user-info"
        />

        <h5 className="feed-post-text text-gray">{status}</h5>
        <h1>{postedDate}</h1>
        <div className="feed-photos-gallery">
          <img
            className="feed-photos-images photo1 con-shade"
            src={images[0].uploadedPic.image}
            alt="first image"
          />
          <img
            className="feed-photos-images photo2 con-shade"
            src={images[1].uploadedPic.image}
            alt=""
          />
          <img
            className="feed-photos-images photo3 con-shade"
            src={images[2].uploadedPic.image}
            alt=""
          />
          <img
            className="feed-photos-images photo4 con-shade"
            src={images[3].uploadedPic.image}
            alt=""
          />
          <img
            className="feed-photos-images photo5 con-shade"
            src={images[4].uploadedPic.image}
            alt=""
          />
          {/* <h1>{stuff.id}</h1> */}
          {/* <h1>{stuff.pictures}</h1> */}
          {/* <h1>{stuff.number}</h1> */}
        </div>
        <PostLikeDisLike />
      </section>
    </div>
  );
};
export default HomeFeedPhoto;
