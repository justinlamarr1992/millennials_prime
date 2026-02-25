import React, { useEffect, useState } from "react";

const PrimeNews = () => {
  const libraryId = process.env.REACT_APP_BUNNY_LIBRARY_ID;
  const accessKey = process.env.REACT_APP_BUNNY_ACCESS_KEY;
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos?page=1&itemsPerPage=2&orderBy=date`,
      {
        method: "GET",
        headers: { accept: "application/json", AccessKey: accessKey },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.items && response.items.length > 0) {
          setVideo(response.items[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [libraryId, accessKey]);

  return (
    <section
      id="prime"
      className="nonprime-container news-container p-con-shade "
    >
      <h2 className="pr-title title-space">Prime News</h2>

      <iframe
        title="Prime News latest video"
        src={
          video.guid
            ? `https://video.bunnycdn.com/embed/${libraryId}/${video.guid}`
            : "Loading"
        }
        className="pr-video p-con-shade"
        loading="lazy"
        width="1280"
        height="720"
        style={{ border: "none" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>

      <div className="pr-video-info-news">
        <h3>{video.title ?? "Loading"}</h3>
        <h5 className="text-gray">
          {video.metaTags?.[0]?.value ?? "Grabbing the Information Now"}
        </h5>
      </div>
    </section>
  );
};

export default PrimeNews;
