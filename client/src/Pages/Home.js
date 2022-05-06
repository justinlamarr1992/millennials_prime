import React from "react";
import Video from "../Components/video/Video";

import "./home.css";

const Home = () => {
  return (
    <div className="page">
      <div className="feed-container">
        <h3>Prime News</h3>
        <Video />
        <div className="user-info"></div>
        <div className="video-info"></div>
        <div className="hot-items"></div>
      </div>
    </div>
  );
};

export default Home;
