// TODO: Work on implementing this at later date

import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useUserPicture = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [profileImage, setProfileImage] = useState({ image: "" });

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserProfilePic = async () => {
      try {
        const response = await axiosPrivate.post("/users/getpic", { _id });
        // console.log(response.data.getImageToClient);
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

  return;
};

export default useUserPicture;
