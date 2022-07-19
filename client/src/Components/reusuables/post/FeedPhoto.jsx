import React from "react";
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
      <PostLikeDisLike />
    </section>
  );
};
export default FeedPhoto;
