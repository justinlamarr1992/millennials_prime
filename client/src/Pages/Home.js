import React from "react";
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

const Home = () => {
  return (
    <div className="page">
      {/* <NavBar name="Justin" /> */}
      <div className="home-container">
        <SearchBar />
        <PrimeNews />
        <HotItems />
        <FeatPrimes />
        <h1>User to Post here</h1>
        <PostList />
        {/* <Newsfeed /> */}
      </div>
    </div>
  );
};

export default Home;
