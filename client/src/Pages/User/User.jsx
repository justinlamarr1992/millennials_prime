import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../Components/nav/NavBar";
import FeedEpisode from "../../Components/reusuables/post/FeedEpisode";
import FeedMusic from "../../Components/reusuables/post/FeedMusic";
import FeedPhoto from "../../Components/reusuables/post/FeedPhoto";
import FeedStore from "../../Components/reusuables/post/FeedStore";
import FeedText from "../../Components/reusuables/post/FeedText";
import FeedVideo from "../../Components/reusuables/post/FeedVideo";
import PostLikeDisLike from "../../Components/reusuables/post/PostLikeDislike";
import PrimeUpdateVideo from "../../Components/reusuables/post/PrimeUpdateVideo";
import SearchBar from "../../Components/reusuables/SearchBar";
import ProfileModal from "../../Components/user/ProfileModal";

import "../../Components/user/user.css";
import FeedPost from "../../Components/reusuables/post/FeedPost";

const User = () => {
  const [modal, setModal] = useState(true);
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);

  useEffect(() => {
    console.log(
      "the width of the user container is ",
      widthRef.current.offsetWidth
    );
  }, []);

  const onClick = () => {
    setModal(!modal);
    pageWidthChange();
  };

  const pageWidthChange = () => {
    if (modal == true) {
      // console.log("true");
      setPageWidth(widthRef.current.offsetWidth);
      // widthRef.current.width = "100px";
      // console.log(pageWidth);
    } else {
      // console.log("false");
      setPageWidth(widthRef.current.offsetWidth);
      // widthRef.current.width = "100px";
      // console.log(pageWidth);
    }
  };
  return (
    <div className="page">
      {/* <NavBar name="Justin" /> */}

      <div
        className={"user-container " + (modal ? "user-true" : "user-false")}
        ref={widthRef}
      >
        {/* Find a way to make this into component but have infor pasted in */}
        <div className="prime-video">
          {/* change name from just prime video to folder container stuff */}
          <SearchBar />
          <PrimeUpdateVideo />
          <FeedPost />

          <h1>Toggle Feed Selections</h1>
          <div
            className={modal ? "feed-section-no-wrap" : "feed-section-wrapped"}
          >
            <FeedText modal={modal} setModal={setModal} />
            <FeedPhoto modal={modal} setModal={setModal} />
            <FeedVideo modal={modal} setModal={setModal} />
            <FeedEpisode modal={modal} setModal={setModal} />
            <FeedMusic modal={modal} setModal={setModal} />
            <FeedStore modal={modal} setModal={setModal} />
          </div>
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
