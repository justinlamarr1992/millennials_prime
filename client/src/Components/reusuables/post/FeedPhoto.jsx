import React from "react";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";
import img1 from "../../../Assets/Images/user.jpeg";
import img2 from "../../../Assets/Images/Logo.png";
import img3 from "../../../Assets/Images/image1.png";

import { photoData } from "./data";
const FeedPhoto = ({ modal, setModal }) => {
  return (
    <section
      className={
        "post-photo-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo
        user={photoData[0].user}
        pic={photoData[0].pic}
        postedDate={photoData[0].postedDate}
        className="pr-user-info item-user-info"
      />
      <h5 className="feed-post-text text-gray">{photoData[0].status}</h5>
      <div className="feed-photos-gallery">
        {/* FIgure way to dynamically change layout depending on number of photos uploaded */}
        <img
          className="feed-photos-images photo1 con-shade"
          src={photoData[0].images[0].uploadedPic.image}
          alt=""
        />
        <img
          className="feed-photos-images photo2 con-shade"
          src={photoData[0].images[1].uploadedPic.image}
          alt=""
        />
        <img
          className="feed-photos-images photo3 con-shade"
          src={photoData[0].images[2].uploadedPic.image}
          alt=""
        />
        <img
          className="feed-photos-images photo4 con-shade"
          src={photoData[0].images[3].uploadedPic.image}
          alt=""
        />
        <img
          className="feed-photos-images photo5 con-shade"
          src={photoData[0].images[4].uploadedPic.image}
          alt=""
        />
      </div>
      <PostLikeDisLike />
    </section>
  );
};
export default FeedPhoto;
