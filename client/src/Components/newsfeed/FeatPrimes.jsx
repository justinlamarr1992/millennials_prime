import React from "react";
import Image from "../../Assets/Images/user.jpeg";

import { textData } from "../reusuables/post/data";

const FeatPrimes = () => {
  return (
    <section className="feat-primes norm-container con-shade">
      <h3 className="ht-item-title title-space">Featured Primes</h3>
      <div className="fp-items">
        {/* Every button need to be link to that contents param */}
        <div className="item1 fp-box words-scroll hovering glow-ring square-container">
          {/* make the overlay cover entire picture with name in middle */}
          <img
            className="fp-item-pic square-container-contents"
            src={textData[0].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[0].user}</p>
          </div>
        </div>
        <div className="item2 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[1].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[1].user}</p>
          </div>
        </div>
        <div className="item3 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[2].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[2].user}</p>
          </div>
        </div>
        <div className="item4 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[3].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[3].user}</p>
          </div>
        </div>
        <div className="item5 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[4].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[4].user}</p>
          </div>
        </div>
        <div className="item6 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[5].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[5].user}</p>
          </div>
        </div>
        <div className="item7 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[6].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[6].user}</p>
          </div>
        </div>
        <div className="item8 fp-box words-scroll hovering glow-ring square-container">
          <img
            className="fp-item-pic square-container-contents"
            src={textData[7].pic}
            alt=""
          />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>{textData[7].user}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeatPrimes;
