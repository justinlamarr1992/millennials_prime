import React from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

const Questionaire2 = () => {
  return (
    <div className="page">
      <div className="pic pic2">
        <div className="pic-container">
          <div className="background">
            <img src={Company1} alt="" className="company" />
            <img src={Company2} alt="" className="company" />
            <img src={Company3} alt="" className="company" />
            <img src={Company1} alt="" className="company" />
          </div>
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
              <label htmlFor="" id="business-start">
                How long have you ran your business?
              </label>
              <select
                name="business"
                id="business-start-value"
                placeholder="Select Answer"
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="expert">5+ Years (Expert)</option>
                <option value="professional">2 - 5 Years (Professional)</option>
                <option value="experienced">1 - 2 Years (Experienced)</option>
                <option value="new">0 - 11 Months (New)</option>
              </select>
            </div>
            <div className="label-input">
              <label htmlFor="">
                Why did you decide to start your own business?
              </label>
              <select name="business" id="business" placeholder="Select Answer">
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="passion">Follow My Passion</option>
                <option value="financial">Financial Independence</option>
                <option value="boss">Be The Boss</option>
                <option value="start">Start from Scratch</option>
                <option value="help">Help Others</option>
                <option value="taxes">Tax Benefits</option>
                <option value="connect">Connect with Others</option>
                <option value="skills">Learn new Skills</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="label-input">
              <label htmlFor="">
                What was your first objective when you founded your business?
              </label>
              <input type="text" id="first-objection" />
            </div>
            <div className="label-input">
              <label htmlFor="">What are the objectives now?</label>
              <input type="text" id="now-objective" />
            </div>
            <div className="label-input">
              <label htmlFor="">How many people work for your company?</label>
              <select name="employees" id="employees">
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="solo">1</option>
                <option value="group">2 - 10</option>
                <option value="team">11 - 49</option>
                <option value="enterprise">50+</option>
              </select>
            </div>
            <div className="label-input">
              <label htmlFor="">What products or services do you offer?</label>
              <input id="services" type="text" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                Why did you decide to start a business in this industry?
              </label>
              <input type="text" id="why-industry" />
            </div>
            <div className="label-input">
              <label htmlFor="">
                What is your Primary method to promote your business?
              </label>
              <select
                name="promotion"
                id="promotion"
                placeholder="Select Answer"
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="mouth">Word of Mouth</option>
                <option value="social-media">Social Media</option>
                <option value="referral">Referral Programs</option>
                <option value="ads">Local Ads</option>
                <option value="directory">Directory</option>
                <option value="loyalty">Loyalty Program</option>
                <option value="partnership">Partnerships</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* <div className="label-input">
              <label htmlFor="">
                Are you a company owner who makes use of professional services?
              </label>
              <input type="email" />
            </div> */}
            <div className="label-input">
              <label htmlFor="">
                What factors influenced your decision to locate your business?
              </label>
              <select name="location" id="location" placeholder="Select Answer">
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="geographical">Geographical Location</option>
                <option value="operation">Operational Needs</option>
                <option value="rent">Rent Cost</option>
                <option value="security">Security</option>
                <option value="competition">Competition</option>
                <option value="potential">Growth Potential</option>
                <option value="accessibility">Accessibility</option>
                <option value="utilities">Utilities and Infrastructure</option>
                <option value="other">Other</option>
              </select>
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
