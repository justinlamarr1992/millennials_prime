import React, { useEffect, useState } from "react";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import "./primeshow.css";

// for now
import Thumbnail from "../../Assets/Images/VideoThumbNail.png";

import {
  videoData2,
  primePostData,
} from "../../Components/reusuables/post/data";
import { Link } from "react-router-dom";

const Catalog = () => {
  const [videos, setVideos] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log("TESTING FOR GRIDFS VIDEOS NOW");
    axiosPrivate.get("/testUploads/videos").then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log(response.data);
        setVideos(response.data.files);
      } else {
        alert("Failed to get GRIDFS Videos");
      }
    });
  }, []);

  const stateInfo = () => {
    /* <Link to={`/user/users/${data.user}`}> */
  };

  const renderVideoBlock = videos.map((video, index) => {
    const videoData = { video };
    console.log(video);
    return (
      <Link to={`/prime-news/viewer/${video._id}`} state={videoData}>
        <VideoBlock
          key={index}
          {...video}
          _id={video._id}
          createdAt={video.uploadDate}
          metadata={video.metadata}
        />
      </Link>
    );
  });
  return (
    <div className="page">
      <div className="catalog-container">
        <h1>Prime News Videos</h1>
        <div className="catalog-shows">{renderVideoBlock}</div>
      </div>
    </div>
  );
};
export default Catalog;
