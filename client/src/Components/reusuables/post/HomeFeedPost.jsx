import React from "react";
import { usePostsContext } from "../../../Hooks/usePostsContext";

import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";
import { useState } from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";

const HomeFeedPost = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

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

    if (!user) {
      setError("You Need to be Logged In");
      return;
    }

    const post = { title, status };

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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

      <form className="feed-reply-text" onSubmit={handleSubmit}>
        <label>Title of Post:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Status of Post:</label>
        <input
          type="text"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className={emptyFields.includes("status") ? "error" : ""}
        />

        <button className="feed-reply-post page-button connect-btn clickable con-shade">
          Post Button
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </section>
  );
};
export default HomeFeedPost;
