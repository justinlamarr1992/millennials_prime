import React, { useEffect, useState } from "react";
import ItemUserInfoUnder from "../ItemUserInfoUnder";
import Item from "../../../Assets/Images/Microphone.jpg";

const FeedStore = ({ modal, setModal }) => {
  //   const [wrap, setWrap] = useState(true);

  useEffect(() => {
    console.log("It is ", setModal);
  }, modal);

  return (
    <section
      className={
        "post-store-container prime-container p-con-shade " +
        (modal ? "no-wrapping" : "wrapping")
      }
    >
      <div className="feed-post-e-comm p-item-shade hovering">
        <img
          src={Item}
          className="ecomm-pic p-item-shade hovering"
          alt="Users Image"
        />
        {/* TODO: make a link to the item indivually */}
      </div>
      <ItemUserInfoUnder />
      <button className="feed-post-episode-button p-con-shade">
        <div className="feed-post-button-border">
          <h4>$50</h4>
        </div>
      </button>
    </section>
  );
};
export default FeedStore;
