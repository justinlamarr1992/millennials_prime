import React from "react";
import { usePostsContext } from "../../../Hooks/usePostsContext";

import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";
import { useState } from "react";

const HomeFeedPost = () => {
  const { dispatch } = usePostsContext();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [episode, setEpisode] = useState("");
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState("");
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { title, status };

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setStatus("");
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };
  return (
    <section className="post-reply-container norm-container con-shade">
      <h3 className="feed-reply-heading">Connect with Millennials Prime</h3>
      <div className="feed-reply-text">
        <MessageBox placeHolder={"What have you accomplished today?"} />
      </div>
      <button className="reply-button feed-reply-attachment">
        <FaPlus className="reply-button-icon" />
      </button>
      <button className="feed-reply-post page-button connect-btn clickable con-shade">
        Post Button
      </button>
    </section>
  );
};
export default HomeFeedPost;
