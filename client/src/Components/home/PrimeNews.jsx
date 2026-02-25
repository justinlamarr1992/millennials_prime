import React, { useEffect, useState } from "react";

const LIBRARY_ID = "147838";
const ACCESS_KEY = "a80779d4-9931-4345-80c1ca2315d2-fc09-4143";

const PrimeNews = () => {
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch(
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos?page=1&itemsPerPage=2&orderBy=date`,
      {
        method: "GET",
        headers: { accept: "application/json", AccessKey: ACCESS_KEY },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        setVideo(response.items[0]);
      })
      .catch((err) => console.error(err));
  }, []);

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
            ? `https://video.bunnycdn.com/embed/${LIBRARY_ID}/${video.guid}`
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
