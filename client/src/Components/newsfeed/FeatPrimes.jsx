import React from "react";
import Image from "../../Assets/Images/user.jpeg";

const FeatPrimes = () => {
  return (
    // <div className="scroller">
    //   <div className="scroller-item">
    //     <img className="i1" src={Image} alt="" />
    //     <img className="i2" src={Image} alt="" />
    //     <img className="i3" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //     <img className="" src={Image} alt="" />
    //   </div>
    // </div>
    <section className="feat-primes norm-container con-shade">
      <h3 className="ht-item-title title-space">Featured Primes</h3>
      <div className="nr-items">
        {/* Every button need to be link to that contents param */}
        <div className="item1 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item2 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item3 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item4 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item5 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item6 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item7 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
        <div className="item8 fp-box words-scroll hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
          <div className="words-scroll-details">
            {/* MAke a link to users Page */}
            <p>Name of User</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeatPrimes;
