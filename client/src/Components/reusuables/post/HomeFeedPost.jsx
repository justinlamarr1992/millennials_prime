import React from "react";
import { usePostsContext } from "../../../Hooks/usePostsContext";
import FileBase64 from "react-file-base64";

import { FaPlus } from "react-icons/fa";
import MessageBox from "../../messaging/MessageBox";
import { useState } from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import ItemUserInfo from "../ItemUserInfo";
import FileUpload from "./FileUpload";

const HomeFeedPost = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [episode, setEpisode] = useState("");
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState("");
  // const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);

  const [item, setItem] = useState({ title: "", image: "" });
  const [items, setItems] = useState([]);

  const testSubmit = async (e) => {
    e.preventDefault();
    setItems([...items]);
    console.log("clicked");
  };
  // const testHover = async (e) => {
  //   e.preventDefault();
  //   console.log("hovered");
  //   const post = { title, status, name };
  //   console.log(post);
  // };
  const noChange = async (e) => {
    e.preventDefault();
    console.log("Clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setName(user.name);

    if (!user) {
      setError("You Need to be Logged In");
      return;
    }

    const post = { title, status, name };
    // ADD To DATABASE NOTES
    // in order to save to database you need to add object here {...name} this is the value saved in whatever method uptop

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
        <h3>Test here</h3>
        <pre>{JSON.stringify(item, null, "\t")}</pre>
        {/* <form onSubmit={testSubmit} onMouseEnter={testHover}> */}
        <FileUpload user={user} />
        {items?.map((item) => (
          <div key={item._id}>
            <div>
              <img style={{ width: "100%" }} src={item.image} />
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
      <button className="reply-button feed-reply-attachment">
        <FaPlus className="reply-button-icon" />
      </button>
    </section>
  );
};
export default HomeFeedPost;
