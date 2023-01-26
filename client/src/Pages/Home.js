import React, { useState, useRef, useEffect } from "react";
import useLogout from "../Hooks/useLogout";

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

const Home = () => {
  const [modal, setModal] = useState(true);
  // testing useSelectpr
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const [testVideo, setTestVideo] = useState({});
  const [testDelVideo, setTestDelVideo] = useState("");

  const signOut = async () => {
    // if used in more components, this should be in context
    await logout();
    // axios to /logout endpoint
    navigate("/auth/signin");
  };

  const recentTest = async () => {
    try {
      const response = await axiosPrivate.get(
        "/testUploads/recent"
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      );
      if (response.data.success) {
        console.log(response.data);
        setTestVideo(response.data.files[0]);
        alert("Recent Video Downloaded Successfully");
      } else {
        alert("Failed to Download Recent Video");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const test = async () => {
    try {
      const response = await axiosPrivate.get(
        "/testUploads/files"
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      );
      if (response.data.success) {
        console.log(response.data);
        setTestVideo(response.data.files[0]);
        alert("Video Downloaded Successfully");
      } else {
        alert("Failed to Download Video");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const videoFileName = testVideo.filename;
  console.log("THE FILE NAME IS", videoFileName);

  // const firstVideo =
  const testOne = async () => {
    try {
      const response = await axiosPrivate.get(
        `/testUploads/file/${videoFileName}`,
        {}
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      );
      if (response.data.success) {
        console.log(response.data);
        setTestDelVideo(response.data.file._id);
        alert("Video Downloaded Successfully");
      } else {
        alert("Failed to Download Video");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const testDelete = async () => {
    try {
      const response = await axiosPrivate.get(
        `/testUploads/file/del/${testDelVideo}`,
        {}
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      );
      if (response.data.success) {
        console.log(response.data);
        alert("Video Delete Successfully");
      } else {
        alert("Failed to Delete Video");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = () => {
    setModal(!modal);
    pageWidthChange();
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
        {/* <HotItems />
        <FeatPrimes /> */}
        {/* <HomeFeedPost /> */}
        {/* <PostList modal={modal} setModal={setModal} widthRef={widthRef} /> */}
        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <MainModal />}x
        <Link to={`/prime-news/catalog`}>
          <button className="home-butt con-shade ">Catalog</button>
        </Link>
        {/* <Link to={`/prime-news/subscriptions`}>
          <button className="home-butt con-shade ">Subscriptions</button>
        </Link> */}
        {/* <Link to={`/admin`}>
          <button>Admin</button>
        </Link> */}
        {/* <Link to={`/editor`}>
          <button>Editor</button>
        </Link>
        <Link to={`/user`}>
          <button>User</button>
        </Link>
        <Link to={`/settings`}>
          <button>Settings</button>
        </Link> */}
        <button className="home-logout-butt con-shade" onClick={recentTest}>
          Recent Test
        </button>
        <button className="home-logout-butt con-shade" onClick={test}>
          All Files Test
        </button>
        <button className="home-logout-butt con-shade" onClick={testOne}>
          One Files Test
        </button>
        <button className="home-logout-butt con-shade" onClick={testDelete}>
          Delete File Test
        </button>
        <button className="home-logout-butt con-shade" onClick={signOut}>
          Sign Out
        </button>
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
