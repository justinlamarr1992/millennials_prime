import React, { useState, useRef } from "react";
import { useEffect } from "react";
import NavBar from "../../Components/nav/NavBar";
import FeedEpisode from "../../Components/reusuables/post/FeedEpisode";
import FeedMusic from "../../Components/reusuables/post/FeedMusic";
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
      console.log("true");
      setPageWidth(widthRef.current.offsetWidth);
      // widthRef.current.width = "100px";
      console.log(pageWidth);
    } else {
      console.log("false");
      setPageWidth(widthRef.current.offsetWidth);
      // widthRef.current.width = "100px";
      console.log(pageWidth);
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
          <SearchBar />
          <PrimeUpdateVideo />
          <h1>User to post here</h1>

          <h1>Toggle Feed Selections</h1>
          <FeedText />
          <FeedPhoto />
          <FeedVideo />
          <FeedEpisode />
          <FeedMusic />
          <h1>Store</h1>
        </div>

        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {/* Figure out w away to chage div width based on when this button is pushed */}
        {/* <section>Users Post</section> */}
        {modal && <ProfileModal />}
      </div>
    </div>
  );
};
export default User;
