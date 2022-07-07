import React from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const Questionaire2 = () => {
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
              <h4>Congrats Millennial, Let's talk Business!</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>
          {/* Separate pages */}
          {/* First page: peerson date of birth ect... */}
          {/* Second page: COngrats... About you and Business how to help build */}
          {/* Third Page: Needs like resources, equiptments */}
          {/*  */}
          {/* no typing answers only drop downs */}

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">When did your business begin?</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Why did you decide to start your own business?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What was your first objective when you founded your business?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">How many people work for your company?</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">What products or services do you offer?</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What methods do you use to promote your business?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Are you a company owner who makes use of professional services?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What factors influenced your decision to locate your business?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What are the objectives of your business?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Why did you decide to start a business in this industry?
              </label>
              <input type="email" />
            </div>

            <Link className="" key="questionaire" to="/questionaire3">
              <button className="auth-button login">Next</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire2;
