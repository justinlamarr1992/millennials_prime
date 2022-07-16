import React, { useEffect, useState } from "react";
import ItemUserInfoUnder from "../ItemUserInfoUnder";
const FeedMusic = ({ modal, setModal }) => {
  useEffect(() => {
    console.log("It is ", setModal);
  }, modal);

  return (
    <section
      className={
        "post-music-container prime-container p-con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
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
