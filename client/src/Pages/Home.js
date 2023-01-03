import React, { useState, useRef, useEffect } from "react";
import useLogout from "../Hooks/useLogout";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../Features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

// import { usePostsContext } from "../Hooks/usePostsContext";
import useFetch from "../Hooks/useFetch";
import axios from "../API/axios";

import Users from "../Components/DaveGrayTest/User";

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
  // testing useSelectpr
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    // if used in more components, this should be in context
    await logout();
    // axios to /logout endpoint
    navigate("/auth/signin");
  };

  const content = (
    <div className="page">
      <div
        className={"home-container " + (modal ? "user-true" : "user-false")}
        ref={widthRef}
      >
        <h1>This is the Home Page</h1>
        <h3>Lets see if i can pull the data at will</h3>

        <button onClick={signOut}>Sign Out</button>
        <Link to={`/prime-news/upload-content`}>
          <button>Upload Content</button>
        </Link>
        <Link to={`/prime-news/catalog`}>
          <button>Catalog</button>
        </Link>
        <Link to={`/prime-news/subscriptions`}>
          <button>Subscriptions</button>
        </Link>
        <Link to={`/admin`}>
          <button>Admin</button>
        </Link>
        <Link to={`/editor`}>
          <button>Editor</button>
        </Link>
        <Link to={`/user`}>
          <button>User</button>
        </Link>
        <Link to={`/settings`}>
          <button>Settings</button>
        </Link>
        <h4
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </h4>
        {/* <SearchBar /> */}
        {/* <PrimeNews /> */}
        {/* <HotItems />
        <FeatPrimes /> */}
        {/* <HomeFeedPost /> */}
        {/* <PostList modal={modal} setModal={setModal} widthRef={widthRef} /> */}
        {/* <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <MainModal />} */}
      </div>
    </div>
  );

  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useFetch("api/user/62f8fa602e766718268c6d32");

  // const { data: users, isLoading, error } = useFetch("api/user");

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
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch("api/user/62f8fa602e766718268c6d32", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       setUserInfo(user);
  //       console.log(userInfo);
  //     }
  //   };

  //   if (user) {
  //     fetchUser();
  //   }
  // }, [user]);

  //   const onClick = () => {
  //     setModal(!modal);
  //     pageWidthChange();
  //   };

  //   const pageWidthChange = () => {
  //     if (modal == true) {
  //       // console.log("true");
  //       setPageWidth(widthRef.current.offsetWidth);
  //       // widthRef.current.width = "100px";
  //       // console.log(pageWidth);
  //     } else {
  //       // console.log("false");
  //       setPageWidth(widthRef.current.offsetWidth);
  //       // widthRef.current.width = "100px";
  //       // console.log(pageWidth);
  //     }
  //   };
  return content;
  // return (
  //   <div className="page">
  //     {/* <NavBar name="Justin" /> */}
  //     <div
  //       className={"home-container " + (modal ? "user-true" : "user-false")}
  //       ref={widthRef}
  //     >
  //       <SearchBar />
  //       <PrimeNews />

  //       <HotItems />
  //       <FeatPrimes />
  //       {/* <HomeFeedPost /> */}
  //       {/* <PostList modal={modal} setModal={setModal} widthRef={widthRef} /> */}
  //       {/* <button className="test-modal-button" onClick={onClick}>
  //         Modal Test Button
  //       </button>
  //       {modal && <MainModal />} */}
  //     </div>
  //   </div>
  // );
};

export default Home;
