import React, { useState } from "react";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";
import TimeCalc from "../../Components/reusuables/TimeCalc";

import "./primeshow.css";

// for now
import Thumbnail from "../../Assets/Images/VideoThumbNail.png";

import {
  videoData2,
  primePostData,
} from "../../Components/reusuables/post/data";
import { Link } from "react-router-dom";
const Catalog = () => {
  const stateInfo = () => {
    /* <Link to={`/user/users/${data.user}`}> */
  };
  return (
    <div className="page">
      <div className="catalog-container">
        <h1>Prime News Videos</h1>
        <div className="catalog-shows">
          {primePostData.map((data) => {
            const videoData = { ...data };
            console.log(videoData);
            return (
              <Link to={`/prime-news/viewer`} state={videoData}>
                <VideoBlock key={data.uploadedVid.number} {...data} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
