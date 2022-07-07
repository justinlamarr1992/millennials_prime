import React from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const Questionaire3 = () => {
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
              <h4>Let's talks Art and Connections!</h4>
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
              <label htmlFor="">
                Have you worked as a professional artist before?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">What's the purpose or goal of your work?</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                How can your work affect societal issues?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                How do you navigate the professional art industry?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Which art/music trends inspire your current work?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">How has your style changed over time? </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What are your favorite and least favorite parts of professional
                art?
              </label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Do you have a network of other artists, and how do they support
                you?
              </label>
              {/* If yes give a brief one to sentence description */}
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">What have critics said about your work?</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Is there a specific environment or material that's integral to
                your work?
              </label>
              <input type="email" />
            </div>

            <Link className="" key="home" to="/">
              <button className="auth-button login">Finished</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire3;
