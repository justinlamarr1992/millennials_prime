import React, { useEffect, useState } from "react";
import ItemUserInfo from "../ItemUserInfo";
import PostLikeDisLike from "./PostLikeDislike";
import img1 from "../../../Assets/Images/user.jpeg";
import img2 from "../../../Assets/Images/Logo.png";
import img3 from "../../../Assets/Images/image1.png";
const FeedPhoto = ({ modal, setModal }) => {
  return (
    <section
      className={
        "post-photo-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo className="pr-user-info item-user-info" />
      <h5 className="feed-post-text text-gray">
        This is the Status of the text post
      </h5>
      <div className="feed-photos-gallery">
        <img
          className="feed-photos-images photo1 con-shade"
          src={img1}
          alt=""
        />
        <img
          className="feed-photos-images photo2 con-shade"
          src={img2}
          alt=""
        />
        <img
          className="feed-photos-images photo3 con-shade"
          src={img3}
          alt=""
        />
        <img
          className="feed-photos-images photo4 con-shade"
          src={img2}
          alt=""
        />
        <img
          className="feed-photos-images photo5 con-shade"
          src={img3}
          alt=""
        />
      </div>
      {/* <h3 className="item-user-content">{title}</h3> */}
      {/* <h3 className="item-user-content">This is the Title of the TExt Post</h3> */}
      {/* <h5 className="item-user-status text-gray">{status}</h5> */}

      <PostLikeDisLike />
    </section>
  );
};
export default FeedPhoto;
