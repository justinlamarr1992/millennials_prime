import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { data } from "./data";
import HomeFeedPostItem from "./HomeFeedPostItem";

const LIMIT = 7;

const PostList = () => {
  const [postData, setPostData] = useState(data.splice(0, LIMIT));
  const [visible, setVisible] = useState(LIMIT);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = data.splice(visible, newLimit);

    if (data.length > postData.length) {
      setTimeout(() => {
        setPostData([...postData].concat(dataToAdd));
      }, 2000);
      setVisible(newLimit);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="feed-items">
      <h3 className="ht-item-title title-space">News Feed</h3>

      <InfiniteScroll
        dataLength={postData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{
          // height: 300,
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
        }}
        //test
      >
        {postData.map((item) => {
          return (
            <HomeFeedPostItem
              key={item.id}
              title={item.title}
              status={item.status}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default PostList;
