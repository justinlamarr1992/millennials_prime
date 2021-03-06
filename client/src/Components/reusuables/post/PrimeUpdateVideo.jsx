import React from "react";
import Video from "../../video/Video";
import PostLikeDisLike from "./PostLikeDislike";

const PrimeUpdateVideo = () => {
  return (
    <section id="prime" className="prime-container news-container p-con-shade ">
      <h2 className="pr-title title-space">Weekly Progress Video</h2>
      <Video />
      {/* <UserPostInfo className="pr-user-info" /> */}
      <div className="pr-video-info">
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          incidunt.
        </h3>
        <h5 className="text-gray">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          expedita odio provident harum accusamus unde quis facere blanditiis,
          delectus aliquam commodi at quia eius, a iure. Accusamus laborum
          temporibus et dolor voluptatum tempore suscipit sed quibusdam ipsa,
          ducimus hic quis.
        </h5>
      </div>
      <div className="pr-like-dislike">
        <PostLikeDisLike />
      </div>
    </section>
  );
};
export default PrimeUpdateVideo;
