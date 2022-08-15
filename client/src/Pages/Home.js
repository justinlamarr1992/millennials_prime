import React, { useState, useRef, useEffect } from "react";
// import { usePostsContext } from "../Hooks/usePostsContext";
import useFetch from "../Hooks/useFetch";

import HotItems from "../Components/home/HotItems";
import Newsfeed from "../Components/home/Newsfeed";

import "../Components/home/home.css";
import PrimeNews from "../Components/home/PrimeNews";
import SearchBar from "../Components/reusuables/SearchBar";
import FeatPrimes from "../Components/newsfeed/FeatPrimes";
import PostList from "../Components/reusuables/post/PostList";
import HomeFeedPost from "../Components/reusuables/post/HomeFeedPost";

import MainModal from "../Components/reusuables/modals/MainModal";

const Home = () => {
  const [modal, setModal] = useState(true);

  const [userInfo, setUserInfo] = useState({});

  const {
    data: user,
    isLoading,
    error,
  } = useFetch("api/user/62f8fa602e766718268c6d32");

  // const { data: users, isLoading, error } = useFetch("api/user");

  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);
  // const { posts, dispatch } = usePostsContext();
  const getUser = () => {};

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch("/api/post");
  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_POSTS", payload: json });
  //     }
  //   };

  //   fetchPosts();
  // }, [dispatch]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setUserInfo(user);
  //     console.log(userInfo);
  //   }, 1000);
  // }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("api/user/62f8fa602e766718268c6d32", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUserInfo(user);
        console.log(userInfo);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

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
        <HotItems />
        <FeatPrimes />
        <HomeFeedPost />
        <PostList modal={modal} setModal={setModal} widthRef={widthRef} />
        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <MainModal />}
      </div>
    </div>
  );
};

export default Home;
