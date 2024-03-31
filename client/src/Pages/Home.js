import React, { useState, useRef, useEffect } from "react";
import useLogout from "../Hooks/useLogout";

import useAuth from "../Hooks/useAuth";

import { Link, useNavigate } from "react-router-dom";

// import { usePostsContext } from "../Hooks/usePostsContext";

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

import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import axios from "axios";

const Home = () => {
  const { auth } = useAuth();

  const [modal, setModal] = useState(false);
  // testing useSelectpr
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const [testVideo, setTestVideo] = useState({});
  const [testDelVideo, setTestDelVideo] = useState("");

  const [bunnyInfo, setBunnyInfo] = useState({});

  const _id = auth._id;

  const signOut = async () => {
    // if used in more components, this should be in context
    await logout();
    // axios to /logout endpoint
    navigate("/auth/signin");
  };

  const videoFileName = testVideo.filename;
  console.log("THE FILE NAME IS", videoFileName);

  const onClick = () => {
    setModal(!modal);
    pageWidthChange();
  };

  const backEndTest = async () => {
    try {
      const response = await axios.get(
        // `http://localhost:4000/test/web`,
        `https://us-central1-millennialsprime.cloudfunctions.net/api/test/web`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        console.log(response.data);
        console.log("The Back End has Sent back a good connection");
      }
    } catch (err) {
      console.log("There was no connection to the back end");
      setErrMsg(err);
    }

    // const response = axios.get(
    //   `https://us-central1-millennialsprime.cloudfunctions.net/api/test/web`,
    //   {
    //     withCredentials: true,
    //   }
    // );

    // if (response.status == 200) {
    //   console.log(response.data);
    //   console.log("The Back End has Sent back a good connection");
    // } else {
    //   console.log("There was no connection to the back end");
    //   setErrMsg
    // }
  };

  const pageWidthChange = () => {
    if (modal == true) {
      console.log("true");
      setPageWidth(widthRef.current.offsetWidth);
      widthRef.current.width = "100px";
      console.log(pageWidth);
    } else {
      console.log("false");
      setPageWidth(widthRef.current.offsetWidth);
      widthRef.current.width = "100px";
      console.log(pageWidth);
    }
  };

  const content = (
    <div className="page">
      <div
        className={"home-container " + (modal ? "user-true" : "user-false")}
        ref={widthRef}
      >
        <PrimeNews />
        <Link to={`/prime-news/upload-content`}>
          <div className="user-prime-container ">
            <h1 className="user-prime-container more-to-come p2-con-shade">
              More to Come
            </h1>
          </div>
        </Link>
        <button
          onClick={backEndTest}
          class="feed-reply-post page-button connect-btn clickable con-shade"
        >
          Test Back End connection
        </button>
        {errMsg ? <h1>error</h1> : <h2>All Good</h2>}

        {/* PHASE 2 */}
        {/* <HotItems />
        <FeatPrimes />
        <HomeFeedPost />
        <PostList modal={modal} setModal={setModal} widthRef={widthRef} />

        <Link to={`/prime-news/catalog`}>
          <button className="home-butt con-shade ">Catalog</button>
        </Link>
        <Link to={`/prime-news/subscriptions`}>
          <button className="home-butt con-shade ">Subscriptions</button>
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
        <Link to="/auth/signin">
          <button className="home-logout-butt con-shade">Sign In</button>
        </Link>
        <Link to="/auth/register">
          <button className="home-butt con-shade ">Register</button>
        </Link>
        <button className="home-logout-butt con-shade" onClick={signOut}>
          Sign Out
        </button> */}
        <h4
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </h4>
        {/* <SearchBar /> */}
      </div>
    </div>
  );
  return content;
};

export default Home;

// const {
//   data: user,
//   isLoading,
//   error,
// } = useFetch("api/user/62f8fa602e766718268c6d32");

// const { data: users, isLoading, error } = useFetch("api/user");

// const { posts, dispatch } = usePostsContext();
// const getUser = () => {};

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
