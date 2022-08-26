import React, { useRef } from "react";
import video from "../../Assets/Videos/video3.mp4";

import "./video.css";
const Video2 = () => {
  const vidRef = useRef(null);
  const vidContainerRef = useRef(null);

  // Play / Pause
  const togglePlay = () => {
    vidRef.current.paused ? vidRef.current.play() : vidRef.current.pause();
  };
  const videoPause = () => {
    console.log("Paused");
    vidContainerRef.current.classList.add("paused");
  };
  const videoPlay = () => {
    console.log("Playing");
    vidContainerRef.current.classList.remove("paused");
  };

  const keyDown = (e) => {
    switch (e.key.toLowerCase()) {
      case "k":
        togglePlay();
        break;
    }
  };
  return (
    <div
      className="video-container paused"
      ref={vidContainerRef}
      onKeyDown={keyDown}
    >
      <div className="video-controls-container">
        <div className="timeline-container"></div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            <svg class="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg class="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
        </div>
      </div>
      <video
        src={video}
        ref={vidRef}
        onPlay={videoPlay}
        onPause={videoPause}
        onClick={togglePlay}
      ></video>
    </div>
  );
};
export default Video2;
