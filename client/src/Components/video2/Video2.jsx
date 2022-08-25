import React from "react";
import video from "../../Assets/Videos/video3.mp4";

import "./video.css";
const Video2 = () => {
  return (
    <div className="video-container ">
      <div className="video-controls-container">
        <div className="timeline-container"></div>
        <div className="controls">
          <button className="play-pause-btn">Play</button>
          <button className="play-pause-btn">Play</button>
        </div>
      </div>
      <video src={video}></video>
    </div>
  );
};
export default Video2;
