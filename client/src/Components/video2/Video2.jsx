import React, { useRef } from "react";
import video from "../../Assets/Videos/video2.mp4";

import "./video.css";
const Video2 = () => {
  const currentTimeRef = useRef(null);
  const currentTime = currentTimeRef.current;
  const previewImgRef = useRef(null);
  const previewImg = previewImgRef.current;
  const speedBtnRef = useRef(null);
  const speedBtn = speedBtnRef.current;
  const thumbnailImgRef = useRef(null);
  const thumbnailImg = thumbnailImgRef.current;
  const timeLineContainRef = useRef(null);
  const timeLineContain = timeLineContainRef.current;
  const totalTimeRef = useRef(null);
  const totalTime = totalTimeRef.current;
  const vidRef = useRef(null);
  const vid = vidRef.current;
  const vidContainerRef = useRef(null);
  const vidContain = vidContainerRef.current;
  const volumeSliderRef = useRef(null);
  const volSlider = volumeSliderRef.current;

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
  // KeyDown
  const keyDown = (e) => {
    const tagName = document.activeElement.tagName.toLowerCase();
    if (tagName === "input") return;
    switch (e.key.toLowerCase()) {
      case " ":
        if (tagName === "button") return;
        break;
      case "k":
        togglePlay();
        break;
      case "f":
        toggleFullScreen();
        break;
      case "t":
        toggleTheater();
        break;
      case "i":
        toggleMiniPlayer();
        break;
      case "m":
        toggleMute();
        break;
      case "arrowleft":
      case "j":
        skip(-5);
        break;
      case "arrowright":
      case "l":
        skip(5);
        break;
      // case "c":
      //   toggleCaptions();
      //   break;
      // default:
    }

    // TODO: Work out kinks with even listener in react
    // Key Down play pause
    // document.addEventListener("keydown", (e) => {
    //   switch (e.key.toLowerCase()) {
    //     case " ":
    //     case "k":
    //       togglePlay();
    //       break;
    //     case "f":
    //       toggleFullScreen();
    //       break;
    //     case "t":
    //       toggleTheater();
    //       break;
    //     case "i":
    //       toggleMiniPlayer();
    //       break;
    //   }
    // });
  };

  // Playback Speed
  const changePlaybackSpeed = () => {
    let newPlaybackRate = vid.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    vid.playbackRate = newPlaybackRate;
    speedBtn.textContent = `${newPlaybackRate}x`;
  };

  // Volume
  const toggleMute = () => {
    vid.muted = !vid.muted;
    console.log("video muted");
  };
  const sliderChange = (e) => {
    vid.volume = e.target.value;
    vid.muted = e.target.value === 0;
  };
  const volumeChange = () => {
    volSlider.value = vid.volume;
    let volumeLevel;
    if (vid.muted || vid.volume === 0) {
      volSlider.value = 0;
      volumeLevel = "muted";
    } else if (vid.volume >= 0.5) {
      volumeLevel = "high";
    } else {
      volumeLevel = "low";
    }
    vidContain.dataset.volumeLevel = volumeLevel;
  };

  // Captions
  // const captions = vid.textTracks[0];
  // captions.mode = "hidden";
  // const toggleCaptions = () => {
  //   const isHidden = captions.mode === "hidden";
  //   captions.mode = isHidden ? "showing" : "hidden";
  //   vidContain.classList.toggle("captions", isHidden);
  // };

  // Duration
  const loadedData = () => {
    totalTime.textContent = formatDuration(vid.duration);
  };
  const timeUpdate = () => {
    currentTime.textContent = formatDuration(vid.currentTime);
    const percent = vid.currentTime / vid.duration;
    timeLineContain.style.setProperty("--progress-position", percent);
  };
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }
  function skip(duration) {
    vid.currentTime += duration;
  }

  // Theater Mode
  const toggleTheater = () => {
    vidContainerRef.current.classList.toggle("theater");
  };
  const toggleFullScreen = () => {
    const elem = vidContainerRef.current;
    if (!document.mozFullScreen && !document.webkitIsFullScreen) {
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
      vidContainerRef.current.classList.remove("full-screen");
      document.exitFullscreen();
      console.log("exiting full screen");
    }
  };
  const toggleMiniPlayer = () => {
    // const elem = vidContainerRef.current;
    // if (!document.mozFullScreen && !document.webkitIsFullScreen) {
    if (vidContainerRef.current.classList.contains("mini-player")) {
      document.exitPictureInPicture();
      console.log("exited");
      vidContainerRef.current.classList.remove("mini-player");
    } else {
      vid.requestPictureInPicture();
      console.log("requested");
      vidContainerRef.current.classList.add("mini-player");
    }
    //   vidContainerRef.current.classList.add("full-screen");
    //   if (elem) {
    //     //checking if ref was initiated
    //     if (elem.requestFullscreen) {
    //       elem.requestFullscreen();
    //     } else if (elem.webkitRequestFullscreen) {
    //       /* Safari */
    //       elem.webkitRequestFullscreen();
    //     } else if (elem.msRequestFullscreen) {
    //       /* IE11 */
    //       elem.msRequestFullscreen();
    //     }
    //   }
    // } else {
    //   vidContainerRef.current.classList.remove("full-screen");
    //   document.exitFullscreen();
    //   console.log("exiting full screen");}
  };

  // Timeline

  let isScrubbing = false;
  let wasPaused;
  function toggleScrubbing(e) {
    const rect = timeLineContain.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    isScrubbing = (e.buttons & 1) === 1;
    vidContain.classList.toggle("scrubbing", isScrubbing);
    if (isScrubbing) {
      wasPaused = vid.paused;
      vid.pause();
    } else {
      vid.currentTime = percent * vid.duration;
      if (!wasPaused) vid.play();
    }
    handleTimelineUpdate();
  }
  function handleTimelineUpdate(e) {
    const rect = timeLineContain.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    const previewImgNumber = Math.max(
      1,
      Math.floor((percent * vid.duration) / 3)
    );
    // Original because should be divided by 10 secs with 10 second images instead of 3
    // I am HERE Trying to figure out why the client cant GET the images via this route
    const previewImgSrc = `../../Assets/Images/previewImages/preview${previewImgNumber}.jpg`;
    previewImg.src = previewImgSrc;
    timeLineContain.style.setProperty("--preview-position", percent);

    // WebDevs Version becayse of e.x This maybe wrong
    // const percent =
    //   Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    // console.log(e);
    // console.log(e.clientX);
    // console.log(rect.x);
    // console.log(rect.width);
    // const percent =
    //   Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    // console.log(percent);
    // const previewImgNumber = Math.max(
    //   1,
    //   Math.floor((percent * vid.duration) / 10)
    // );
    // // I am HERE Trying to figure out why the client cant GET the images via this route
    // const previewImgSrc = `../../Assets/Images/previewImages/preview${previewImgNumber}.jpg`;
    // previewImg.src = previewImgSrc;
    // timeLineContain.style.setProperty("--preview-position", percent);

    if (isScrubbing) {
      e.preventDefault();
      thumbnailImg.src = previewImgSrc;
      timeLineContain.style.setProperty("--progress-position", percent);
    }
  }

  return (
    <div
      className="video-container paused "
      data-volume-level="high"
      ref={vidContainerRef}
      onKeyDown={keyDown}
      onMouseUp={(e) => {
        if (isScrubbing) toggleScrubbing(e);
      }}
      onMouseMove={(e) => {
        if (isScrubbing) handleTimelineUpdate(e);
      }}
    >
      <img className="thumbnail-img" ref={thumbnailImgRef} />
      <div className="video-controls-container">
        <div
          className="timeline-container"
          onMouseMove={handleTimelineUpdate}
          onMouseDown={toggleScrubbing}
          ref={timeLineContainRef}
        >
          <div className="timeline">
            <img className="preview-img" ref={previewImgRef} />
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            <svg class="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg class="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              <svg class="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg class="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg class="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="any"
              value="1"
              onChange={sliderChange}
              ref={volumeSliderRef}
            />
          </div>
          <div className="duration-container">
            <div className="current-time" ref={currentTimeRef}>
              0:00
            </div>
            /<div className="total-time" ref={totalTimeRef}></div>
          </div>
          <button
            className="captions-btn"
            // onClick={toggleCaptions}
          >
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>
          <button className="speed-btn wide-btn" onClick={changePlaybackSpeed}>
            1x
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
        onVolumeChange={volumeChange}
        onLoadedData={loadedData}
        onTimeUpdate={timeUpdate}
      >
        {/* For now */}
        {/* TODO: make place in the assets folder for captions files and for place in backend */}
        <track kind="captions" srclang="en" src="assets/subtitles.vtt"></track>
      </video>
    </div>
  );
};
export default Video2;
