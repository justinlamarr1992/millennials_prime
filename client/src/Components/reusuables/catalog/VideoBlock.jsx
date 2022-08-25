import React from "react";

import TimeCalc from "../TimeCalc";

// for now
import Thumbnail from "../../../Assets/Images/VideoThumbNail.png";

const VideoBlock = ({ user, uploadedVid }) => {
  return (
    <section className="video-block-container norm-container con-shade clickable hovering">
      <img className="video-block-thumbnail con-shade" src={Thumbnail} alt="" />
      <h4>{uploadedVid.title}</h4>
      <h5>{uploadedVid.description}</h5>
      <h6 className="text-gray">
        <TimeCalc postDate={new Date(uploadedVid.postedDate)} />
      </h6>
    </section>
  );
};
export default VideoBlock;
