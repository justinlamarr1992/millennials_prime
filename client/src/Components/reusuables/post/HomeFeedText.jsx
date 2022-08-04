import React from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";

import { usePostsContext } from "../../../Hooks/usePostsContext";
import ItemUserInfo from "../ItemUserInfo";

import "./post.css";
import PostLikeDisLike from "./PostLikeDislike";

// Test
import test from "../../../Assets/Images/user.jpeg";

const HomeFeedText = ({ pic, postedDate, post, modal }) => {
  const { dispatch } = usePostsContext;
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/post/" + post._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };
  return (
    <section
      className={
        "post-item-container norm-container con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <ItemUserInfo
        user="Test User"
        pic={test}
        postedDate="2022-06-12"
        className="pr-user-info item-user-info"
      />
      <h3 className="item-user-content">{post.title}</h3>

      <h5 className="item-user-status text-gray">{post.status}</h5>
      <h1 onClick={handleClick}>delete</h1>
      {/* This is the item that will delete the post FOR NOW */}
      <PostLikeDisLike />
    </section>
  );
};
export default HomeFeedText;
// const HomeFeedText = ({
//   user,
//   pic,
//   title,
//   status,
//   modal,
//   postedDate,
//   id,
//   setModal,
// }) => {
//   return (
//     <section
//       className={
//         "post-item-container norm-container con-shade " +
//         (modal ? "no-wrapping" : "wrapping")
//       }
//     >
//       <ItemUserInfo
//         user={user}
//         pic={pic}
//         postedDate={postedDate}
//         className="pr-user-info item-user-info"
//       />
//       <h3 className="item-user-content">{title}</h3>

//       <h5 className="item-user-status text-gray">{status}</h5>
//       <PostLikeDisLike />
//     </section>
//   );
// };
// export default HomeFeedText;
