import React from "react";
import ItemUserInfoUnder from "../ItemUserInfoUnder";
const FeedMusic = () => {
  return (
    <section className="post-music-container prime-container p-con-shade ">
      <div className="feed-post-music-music ">
        <audio src="Bell.mp3" type="audio/mpeg" controls></audio>
      </div>
      <ItemUserInfoUnder />
      <button className="feed-post-episode-button p-con-shade">
        <div className="feed-post-button-border">
          <h4>Next Track</h4>
        </div>
      </button>
    </section>
  );
};
export default FeedMusic;
