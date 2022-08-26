import React, { useRef, useState } from "react";
import video from "../../Assets/Videos/video3.mp4";

import "./video.css";
const Video2 = () => {
  const [fullScreen, setFullScreen] = useState(false);
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

  // Theater
  const toggleTheater = () => {
    vidContainerRef.current.classList.toggle("theater");
  };
  const toggleFullScreen = () => {
    const elem = vidContainerRef.current;
    // setFullScreen(!fullScreen);
    if (!document.mozFullScreen && !document.webkitIsFullScreen) {
      console.log("Full Screen");
      vidContainerRef.current.classList.add("full-screen");
      if (elem) {
        //checking if ref was initiated
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
      }
    } else {
      console.log("small Screen");
      vidContainerRef.current.classList.remove("full-screen");
      if (elem) {
        if (elem.exitFullscreen) {
          elem.exitFullscreen();
        } else if (elem.msExitFullscreen) {
          elem.msExitFullscreen();
        } else if (elem.mozCancelFullScreen) {
          elem.mozCancelFullScreen();
        } else if (elem.webkitExitFullscreen) {
          elem.webkitExitFullscreen();
        }
      }
    }

    // if (elem) {
    //   //checking if ref was initiated
    //   if (elem.requestFullscreen) {
    //     elem.requestFullscreen();
    //   } else if (elem.webkitRequestFullscreen) {
    //     /* Safari */
    //     elem.webkitRequestFullscreen();
    //   } else if (elem.msRequestFullscreen) {
    //     /* IE11 */
    //     elem.msRequestFullscreen();
    //   }
    // }
  };
  const toggleMiniPlayer = () => {};
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
          <button className="mini-player-btn" onClick={toggleMiniPlayer}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          <button className="theater-btn" onClick={toggleTheater}>
            <svg class="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg class="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button>
          <button className="full-screen-btn" onClick={toggleFullScreen}>
            <svg class="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg class="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
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
