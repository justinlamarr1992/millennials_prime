import React, { useState } from "react";
import FeedPhoto from "../../Components/reusuables/post/FeedPhoto";
import FeedText from "../../Components/reusuables/post/FeedText";
import PostLikeDisLike from "../../Components/reusuables/post/PostLikeDislike";
import SearchBar from "../../Components/reusuables/SearchBar";
import ProfileModal from "../../Components/user/ProfileModal";

import "../../Components/user/user.css";
import Video from "../../Components/video/Video";

const User = () => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setModal(!modal);
  };
  return (
    <div className="page">
      <div className="user-container">
        {/* Find a way to make this into component but have infor pasted in */}
        <div className="prime-video">
          <SearchBar />
          <section
            id="prime"
            className="prime-container news-container p-con-shade "
          >
            <h2 className="pr-title title-space">Weekly Progress Video</h2>
            <Video />
            {/* <UserPostInfo className="pr-user-info" /> */}
            <div className="pr-video-info">
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, incidunt.
              </h3>
              <h5 className="text-gray">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sapiente expedita odio provident harum accusamus unde quis
                facere blanditiis, delectus aliquam commodi at quia eius, a
                iure. Accusamus laborum temporibus et dolor voluptatum tempore
                suscipit sed quibusdam ipsa, ducimus hic quis.
              </h5>
            </div>
            <div className="pr-like-dislike">
              <PostLikeDisLike />
            </div>
          </section>
          <h1>Toggle Feed Selections</h1>
          <FeedText />
          <FeedPhoto />
          <h1>Post Video</h1>
          <h1>Post Photos</h1>
          <h1>Post Shows</h1>
          <h1>Music</h1>
          <h1>Store</h1>
        </div>

        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {/* <section>Users Post</section> */}
        {modal && <ProfileModal />}
      </div>
    </div>
  );
};
export default User;
