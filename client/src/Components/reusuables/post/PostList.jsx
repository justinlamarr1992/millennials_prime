import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { data } from "./data";
import PostItem from "./PostItem";

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
      >
        {postData.map((item) => {
          return (
            <PostItem key={item.id} title={item.title} status={item.status} />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default PostList;