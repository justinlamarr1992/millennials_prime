import React from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const Questionaire = () => {
  return (
    <div className="page">
      <div className="pic pic2">
        <div className="pic-container">
          <h2 className="center-item">Picture Goes Here Alone</h2>
        </div>
      </div>
      <div className="form form2">
        <div className="form-container">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Do You Make the Cut?</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">When were you Born</label>
              <input type="date" name="dateofbirth" id="dateofbirth" />
            </div>
            <div className="label-input location">
              <label className="location-label" htmlFor="">
                Where are you From?
              </label>
              <input
                className="location-input"
                type="text"
                placeholder="Country"
              />
              <input
                className="location-input"
                type="text"
                placeholder="City"
              />
              <input
                className="location-input"
                type="text"
                placeholder="State"
              />
              <input className="location-input" type="text" placeholder="Zip" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 3</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 4</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 5</label>
              <input type="email" />
            </div>

            <Link className="" key="questionaire" to="/questionaire2">
              <button className="auth-button login">Next</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire;
