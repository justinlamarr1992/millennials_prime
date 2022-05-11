import React from "react";
import Image from "../../Assets/Images/user.jpeg";

const FeatPrimes = () => {
  return (
    <section className="feat-primes norm-container con-shade">
      <h3 className="ht-item-title">Featured Primes</h3>
      <div className="nr-items">
        {/* Every button need to be link to that contents param */}
        <div className="item1 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item2 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item3 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item4 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item5 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item6 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item7 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
        <div className="item8 fp-box hovering glow-ring">
          <img className="fp-item-pic" src={Image} alt="" />
        </div>
      </div>
    </section>
  );
};
export default FeatPrimes;
