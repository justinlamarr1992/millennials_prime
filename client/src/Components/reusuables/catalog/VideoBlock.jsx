import React from "react";

import TimeCalc from "../TimeCalc";

// for now
import Thumbnail from "../../../Assets/Images/VideoThumbNail.png";

const VideoBlock = ({
  title,
  description,
  views,
  createdAt,
  thumbnail,
  duration,
}) => {
  // console.log(title);
  var mins = Math.floor(duration / 60);
  var secs = Math.floor(duration - mins * 60);
  return (
    <section className="video-block-container norm-container con-shade clickable hovering">
      {/* <img className="video-block-thumbnail con-shade" src={Thumbnail} alt="" /> */}
      <img
        className="video-block-thumbnail con-shade"
        src={`http://localhost:4000/${thumbnail}`}
        alt=""
      />
      <h4 className="video-block-title">{title}</h4>
      <h5 className="video-block-description">{description}</h5>

      <div className="video-block-numbers">
        <h5 className="video-block-numbers-date text-gray">
          <TimeCalc postDate={new Date(createdAt)} />
        </h5>
        <h5 className="video-block-numbers-view text-gray">{views} Views</h5>
        <h1>{mins}</h1>
        <h1>{secs}</h1>
      </div>
    </section>
  );
};
export default VideoBlock;
