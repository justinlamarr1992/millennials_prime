import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../../Assets/Images/ProfileAvatar.png";
import TimeCalc from "./TimeCalc";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import { primePostData } from "./post/data";
import PostLikeDisLike from "./post/PostLikeDislike";
const PrimeUserPostInfo = ({
  _id,
  user,
  // pic,
  postedDate,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);
  const [profileImage, setProfileImage] = useState({ image: "" });

  useEffect(() => {
    console.log(_id);

    const getUserProfilePic = async () => {
      try {
        const response = await axiosPrivate.post("/users/getpic", { _id });
        console.log(response.data.getImageToClient);
        // setProfileImage(response.data.getImageToClient);
        // console.log(profileImage);
        setProfileImage({
          ...profileImage,
          image: response.data.getImageToClient,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserProfilePic();
  }, [_id]);

  // console.log(postedDate);
  // console.log(user);
  return (
    <div className="pr-user-post-info">
      <div className="pr-info-pic square-container">
        <img
          className="square-container-contents p-con-shade"
          src={profileImage.image || User}
          alt="User Image here"
        />
      </div>

      <div className="pr-info-name">
        <h4 className="prime-m-text">
          <Link className="" to={`/user/users/${user}`}>
            {user}
          </Link>
        </h4>
        {/* <h4>
          <Link
            className="prof-connected-users-img-container square-container "
            to={`/user/users/${data.id}`}
          ></Link>
        </h4> */}
      </div>
      <div className="pr-info-time">
        <h5>
          <TimeCalc postDate={new Date(postedDate)} />
        </h5>
      </div>
      {/* <PostLikeDisLike /> */}
    </div>
  );
};
export default PrimeUserPostInfo;
