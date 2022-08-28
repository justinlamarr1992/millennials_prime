import React from "react";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";
import TimeCalc from "../../Components/reusuables/TimeCalc";

import "./primeshow.css";

// for now
import Thumbnail from "../../Assets/Images/VideoThumbNail.png";

import { videoData2 } from "../../Components/reusuables/post/data";
import { Link } from "react-router-dom";
const Catalog = () => {
  // const uploadedVids = videos;
  // console.log(uploadedVids);
  return (
    <div className="page">
      <div className="catalog-container">
        {/* <pre>{JSON.stringify(videoData2)}</pre> */}
        <h1>Prime News Videos</h1>
        <div className="catalog-shows">
          {/* TODO: Fimd out why VideoBlock doesnt work */}
          {/* <Link to={`/user/users/${data.user}`}> */}
          {videoData2.map((data) => (
            <Link to={`/prime-news/viewer`}>
              <VideoBlock key={data.uploadedVid.number} {...data} />
            </Link>
          ))}

          {/* <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
          <VideoBlock /> */}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
