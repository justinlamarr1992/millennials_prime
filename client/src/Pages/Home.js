import React, { useState, useRef, useEffect } from "react";
import Video from "../Components/video/Video";
import HotItems from "../Components/home/HotItems";
import Newsfeed from "../Components/home/Newsfeed";
import UserPostInfo from "../Components/reusuables/UserPostInfo";

import "../Components/home/home.css";
import NavBar from "../Components/nav/NavBar";
import PrimeNews from "../Components/home/PrimeNews";
import SearchBar from "../Components/reusuables/SearchBar";
import FeatPrimes from "../Components/newsfeed/FeatPrimes";
import PostList from "../Components/reusuables/post/PostList";
import HomeFeedPost from "../Components/reusuables/post/HomeFeedPost";

import MainModal from "../Components/reusuables/modals/MainModal";
import HomeFeedPhoto from "../Components/reusuables/post/HomeFeedPhoto";
import HomeFeedVideo from "../Components/reusuables/post/HomeFeedVideo";
import HomeFeedEpisode from "../Components/reusuables/post/HomeFeedEpisode";
import HomeFeedMusic from "../Components/reusuables/post/HomeFeedMusic";
import HomeFeedStore from "../Components/reusuables/post/HomeFeedStore";

const Home = () => {
  const [modal, setModal] = useState(true);
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);

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
        className={"home-container " + (modal ? "user-true" : "user-false")}
        ref={widthRef}
      >
        <SearchBar />
        <PrimeNews />
        {/* <HotItems />
        <FeatPrimes /> */}
        <HomeFeedPost />
        <HomeFeedPhoto />
        <HomeFeedVideo />
        <HomeFeedEpisode />
        <HomeFeedMusic />
        <HomeFeedStore />
        <PostList modal={modal} setModal={setModal} widthRef={widthRef} />s{" "}
        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <MainModal />}
      </div>
    </div>
  );
};

export default Home;
