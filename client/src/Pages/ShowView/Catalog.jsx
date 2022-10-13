import React, { useEffect, useState } from "react";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";

import axios from "axios";
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
    axiosPrivate.get("/videos/").then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const stateInfo = () => {
    /* <Link to={`/user/users/${data.user}`}> */
  };

  const renderVideoBlock = videos.map((video, index) => {
    const videoData = { ...video };
    // console.log(videoData);
    return (
      <Link to={`/prime-news/viewer/${video._id}`} state={videoData}>
        <VideoBlock key={index} {...video} />
      </Link>
    );
    // return <h1>{videoData.title}</h1>;
  });
  return (
    <div className="page">
      <div className="catalog-container">
        <h1>Prime News Videos</h1>
        <div className="catalog-shows">
          {renderVideoBlock}
          {/* {videos.map((data) => {
            const videoData = { ...data };
            console.log(videoData);
            return (
              <Link to={`/prime-news/viewer`} state={videoData}>
                <VideoBlock key={data.uploadedVid.number} {...data} />
              </Link>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};
export default Catalog;
