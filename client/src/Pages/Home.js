import React from "react";
import Video from "../Components/video/Video";
import HotItems from "../Components/home/HotItems";
import Newsfeed from "../Components/home/Newsfeed";
import UserPostInfo from "../Components/reusuables/UserPostInfo";

import "../Components/home/home.css";
import PrimeNews from "../Components/home/PrimeNews";
import SearchBar from "../Components/home/SearchBar";
import FeatPrimes from "../Components/newsfeed/FeatPrimes";

const Home = () => {
  return (
    <div className="page">
      <div className="home-container">
        <SearchBar />
        <PrimeNews />
        <HotItems />
        <FeatPrimes />
        <Newsfeed />
      </div>
    </div>
  );
};

export default Home;
