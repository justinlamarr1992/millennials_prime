import React, { useState } from "react";
import FeedEpisode from "../../Components/reusuables/post/FeedEpisode";
import FeedPhoto from "../../Components/reusuables/post/FeedPhoto";
import FeedText from "../../Components/reusuables/post/FeedText";
import FeedVideo from "../../Components/reusuables/post/FeedVideo";
import PostLikeDisLike from "../../Components/reusuables/post/PostLikeDislike";
import PrimeUpdateVideo from "../../Components/reusuables/post/PrimeUpdateVideo";
import SearchBar from "../../Components/reusuables/SearchBar";
import ProfileModal from "../../Components/user/ProfileModal";

import "../../Components/user/user.css";

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
          <PrimeUpdateVideo />

          <h1>Toggle Feed Selections</h1>
          <FeedText />
          <FeedPhoto />
          <FeedVideo />
          <FeedEpisode />
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
