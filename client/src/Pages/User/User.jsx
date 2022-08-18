import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePostsContext } from "../../Hooks/usePostsContext";
import { useAuthContext } from "../../Hooks/useAuthContext";

import FeedText from "../../Components/reusuables/post/FeedText";

import PrimeUpdateVideo from "../../Components/reusuables/post/PrimeUpdateVideo";
import SearchBar from "../../Components/reusuables/SearchBar";

import ProfileModal from "../../Components/user/ProfileModal";

import "../../Components/user/user.css";
import FeedPost from "../../Components/reusuables/post/FeedPost";

import useFetch from "../../Hooks/useFetch";

const User = () => {
  const [modal, setModal] = useState(true);
  const [pageWidth, setPageWidth] = useState("var(--home-per)");
  const widthRef = useRef(null);

  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const { id } = useParams();
  // TODO: change later and figure way for this to be the actual name and not id
  const name = id;

  // test
  const [pageStuff, setPageStuff] = useState({});

  useEffect(() => {
    console.log(
      "the width of the user container is ",
      widthRef.current.offsetWidth
    );
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

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
          {/* TODO: This with the other todo */}
          <FeedPost name={name} />

          <h1>Toggle Feed Selections</h1>

          <div
            className={modal ? "feed-section-no-wrap" : "feed-section-wrapped"}
          >
            {posts &&
              posts.map((post) => <FeedText post={post} key={post._id} />)}
            {/* <FeedText modal={modal} setModal={setModal} />
            <FeedPhoto modal={modal} setModal={setModal} />
            <FeedVideo modal={modal} setModal={setModal} />
            <FeedEpisode modal={modal} setModal={setModal} />
            <FeedMusic modal={modal} setModal={setModal} />
            <FeedStore modal={modal} setModal={setModal} /> */}
          </div>
        </div>

        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {/* {user && <h1>{user}</h1>} */}
        {/* <section>Users Post</section> */}
        {modal && <ProfileModal name={name} />}
      </div>
    </div>
  );
};
export default User;
