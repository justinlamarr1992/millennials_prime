import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

function SideVideos() {
  const [sideVideos, setSideVideos] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/videos/").then((response) => {
      // console.log(response);
      if (response.data.success) {
        // console.log(response.data.videos);
        setSideVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const sideVideoItem = sideVideos.map((video, index) => {
    var mins = Math.floor(video.duration / 60);
    var secs = Math.floor(video.duration - mins * 60);
    return (
      <div className="side-video-content">
        <div className="side-video-content-thumbnail">
          <Link to={`/prime-news/viewer/${video._id}`}>
            <img
              className="side-video-content-thumbnail-img"
              src={`http://localhost:4000/${video.thumbnail}`}
              alt="Thumbnail"
            />
            {/* <VideoBlock key={index} {...video} /> */}
          </Link>
        </div>
        <div className="side-video-content-info">
          <Link to={`/prime-news/viewer/${video._id}`}>
            <span>{video.title}</span>
            <br />
            {/* <span>{!video.userPosting.name}</span>
            <br /> */}
            <span>{video.views}</span>
            <br />
            <span>
              {mins}:{secs}
            </span>
            <br />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="side-view-container">
      <h3>Prime Videos</h3>
      <div className="side-view-container-content">{sideVideoItem}</div>
    </div>
  );
}
export default SideVideos;
