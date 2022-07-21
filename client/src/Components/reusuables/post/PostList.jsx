import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { textData, photoData, videoData } from "./data";
import HomeFeedPhoto from "./HomeFeedPhoto";
import HomeFeedText from "./HomeFeedText";

const LIMIT = 0;

const PostList = ({ modal, setModal, widthRef }) => {
  // change to textData
  const [postData, setPostData] = useState(textData.splice(0, LIMIT));
  const [picData, setPicData] = useState(photoData.splice(0, LIMIT));
  // const [videoData, setVideoData] = useState(videoData.splice(0, LIMIT));
  const [visible, setVisible] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  // const [modal, setModal] = useState(true);

  const fetchDataPost = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = textData.splice(visible, newLimit);

    if (textData.length > postData.length) {
      setTimeout(() => {
        setPostData([...postData].concat(dataToAdd));
      }, 2000);
      setVisible(newLimit);
    } else {
      setHasMore(true);
    }
  };

  const fetchDataPhoto = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = photoData.splice(visible, newLimit);

    if (photoData.length > picData.length) {
      setTimeout(() => {
        setPicData([...picData].concat(dataToAdd));
      }, 2000);
      setVisible(newLimit);
    } else {
      setHasMore(false);
    }
  };

  // const fetchDataVideo = () => {
  //   const newLimit = visible + LIMIT;
  //   const dataToAdd = videoData.splice(visible, newLimit);

  //   if (data.length > postData.length) {
  //     setTimeout(() => {
  //       setPostData([...postData].concat(dataToAdd));
  //     }, 2000);
  //     setVisible(newLimit);
  //   } else {
  //     setHasMore(false);
  //   }
  // };

  // METHOD FOR DIFFERENT TYPE OF POST WILL BE
  // ADD ALL POST SECTIONS FROM DATA FILE INTO
  // ONE ARRAY THEN SORTING BASED ON DATE

  return (
    <div className="feed-items">
      <h3 className="ht-item-title title-space">News Feed</h3>
      {/* THIS IS THE FORMAT TO GO WITH */}
      {/* <InfiniteScroll
        dataLength={picData.length}
        next={fetchDataPhoto}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Thats all The Photos You have seen it all</b>
          </p>
        }
        style={
          modal
            ? {
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }
            : {
                overflow: "visible",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }
        }
      >
        {picData.map((item) => {
          return (
            <HomeFeedPhoto
              user={item.user}
              pic={item.pic}
              key={item.id}
              title={item.title}
              status={item.status}
              modal={modal}
              setModal={setModal}
              postedDate={item.postedDate}
            />
          );
        })}
      </InfiniteScroll> */}
      <InfiniteScroll
        dataLength={postData.length}
        next={fetchDataPost}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Thats all The PostYou have seen it all</b>
          </p>
        }
        style={
          modal
            ? {
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }
            : {
                overflow: "visible",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }
        }
      >
        {postData.map((item) => {
          return (
            <HomeFeedText
              user={item.user}
              pic={item.pic}
              key={item.id}
              title={item.title}
              status={item.status}
              modal={modal}
              setModal={setModal}
              postedDate={item.postedDate}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default PostList;
