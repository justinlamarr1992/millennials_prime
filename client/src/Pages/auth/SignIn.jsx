import React, { useRef } from "react";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

import { Link } from "react-router-dom";

const SignIn = () => {
  const ref = useRef(null);

  return (
    <div className="page">
      {/* <div className="pic">
        <div className="pic-container">
          
        </div>
      </div> */}
      <div className="pic" ref={ref} id="container">
        <div className="pic-container">
          <div className="background">
            <img src={Company1} alt="" className="company" />
            <img src={Company2} alt="" className="company" />
            <img src={Company3} alt="" className="company" />
            <img src={Company1} alt="" className="company" />
          </div>
          <div className="content">
            <h5 className="center-item">Dont have an Account Yet</h5>
            {/* Needs to be Link for SignUp */}

            {/* <Link className="" key="register" to="/register">
              <button className="auth-button other-button center-item">
                Create an Account
              </button>
            </Link> */}

            <button className="auth-button other-button center-item">
              <Link className="auth-link" key="register" to="/register">
                Create an Account
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="form">
        <div className="form-container">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Welcome Back</h4>
              <h6 className="text-gray">Sign in to Continue</h6>
            </div>
          </div>

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div>
            <Link className="text-gray" key="home" to="/passwordrecovery">
              Forgot Password
            </Link>
            <button className="auth-button login">Login</button>
          </form>
          <h6 className="center-item text-gray">Connect With Socials</h6>
          <div className="social-buttons">
            <button className="auth-button google">Connect With Google</button>
            <button className="auth-button apple">Connect With Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
