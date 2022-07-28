import React, { useEffect, useState } from "react";
import ItemUserInfoUnder from "../ItemUserInfoUnder";
import ArtWork from "../../../Assets/Images/MissingArtWork.png";
import { musicData } from "./data";
import MusicPlayer from "../../musicPlayer/musicPlayer";

const FeedMusic = ({ modal, setModal }) => {
  const [trackNum, setTrackNum] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const tracks = musicData[0].albums[1].album.tracks;
  console.log(tracks.length);
  console.log(trackNum);

  const nextSong = () => {
    // if (tracks.length >= trackNum) {
    //   setTrackNum(trackNum + 1);
    //   console.log(tracks.length);
    //   console.log(trackNum);
    // } else if (tracks.length == trackNum) {
    //   setTrackNum(1);
    //   setNoMore(true);
    //   console.log(tracks.length);
    //   console.log(trackNum);
    // }

    console.log(tracks.length);
    console.log(trackNum);
  };

  return (
    <section
      className={
        "post-music-container prime-container p-con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <div className="feed-post-music-music ">
        <MusicPlayer />
        {/* <audio
          src={musicData[0].albums[1].album.tracks[trackNum].song}
          type="audio/mpeg"
          controls
        ></audio> */}
      </div>
      {/* <ItemUserInfoUnder
        user={musicData[0].user}
        pic={musicData[0].pic}
        postedDate={musicData[0].postedDate}
      />
      <button
        onClick={nextSong}
        className="feed-post-episode-button p-con-shade"
        disabled={noMore}
      >
        <div className="feed-post-button-border">
          <h4>Next</h4>
        </div>
      </button>
      <div className="feed-post-music-info">
        <h4 className="feed-post-music-info-title">
          {musicData[0].albums[1].album.tracks[trackNum].title}
        </h4>
        <img
          src={musicData[0].albums[1].album.artwork}
          alt="Album artwork"
          className="feed-post-music-info-album p-con-shade"
        />
        <h4 className="feed-post-music-info-artist">
          {musicData[0].albums[1].album.tracks[trackNum].artist}
        </h4>
      </div> */}
    </section>
  );
};
export default FeedMusic;
