import React from "react";
import Image from "../../Assets/Images/user.jpeg";

import { textData } from "../reusuables/post/data";

const HotItems = () => {
  return (
    <section className="pr-hot-items norm-container con-shade">
      <h3 className="ht-item-title title-space">Hot Items</h3>
      <div className="nr-items">
        {/* Every button need to be link to that contents param */}
        <div className="item1 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={textData[8].pic} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>{textData[8].title}</h4>
            {/* MAke a link to users Page */}
            <p>{textData[8].user}</p>
          </div>
        </div>
        <div className="item2 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={textData[9].pic} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>{textData[9].title}</h4>
            {/* MAke a link to users Page */}
            <p>{textData[9].user}</p>
          </div>
        </div>
        <div className="item3 ht-box words-scroll  item-shade hovering pad-ring">
          <img className="ht-item-pic" src={textData[10].pic} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>{textData[10].title}</h4>
            {/* MAke a link to users Page */}
            <p>{textData[10].user}</p>
          </div>
        </div>
        <div className="item4 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={textData[11].pic} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>{textData[11].title}</h4>
            {/* MAke a link to users Page */}
            <p>{textData[11].user}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HotItems;
