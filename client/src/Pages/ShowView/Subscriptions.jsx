import React, { useEffect, useState } from "react";
import VideoBlock from "../../Components/reusuables/catalog/VideoBlock";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import useAuth from "../../Hooks/useAuth";

import { Link } from "react-router-dom";

const Subscriptions = () => {
  const { auth } = useAuth();

  const [videos, setVideos] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .post("videos/subscriptions", { userFrom: auth._id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.videos);
          setVideos(response.data.videos);
        } else {
          alert("Failed to get Subscription Videos");
        }
      });
  }, []);

  const renderVideoBlock = videos.map((video, index) => {
    const videoData = { ...video };
    // console.log(videoData);
    return (
      <Link to={`/prime-news/viewer/${video._id}`} state={videoData}>
        <VideoBlock key={index} {...video} />
      </Link>
    );
  });

  return (
    <div className="page">
      <div className="catalog-container">
        <h1>Subscribed Videos</h1>
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

export default Subscriptions;
