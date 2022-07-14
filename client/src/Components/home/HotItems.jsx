import React from "react";
import Image from "../../Assets/Images/user.jpeg";
const HotItems = () => {
  return (
    <section className="pr-hot-items norm-container con-shade">
      <h3 className="ht-item-title title-space">Hot Items</h3>
      <div className="nr-items">
        {/* Every button need to be link to that contents param */}
        <div className="item1 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>Title Of Hot Item</h4>
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item2 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>Title Of Hot Item</h4>
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item3 ht-box words-scroll  item-shade hovering pad-ring">
          <img className="ht-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>Title Of Hot Item</h4>
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item4 ht-box words-scroll item-shade hovering pad-ring">
          <img className="ht-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* Make a link to full Screen */}
            <h4>Title Of Hot Item</h4>
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HotItems;
