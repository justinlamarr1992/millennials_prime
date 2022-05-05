import React from "react";
import "./auth.css";

import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="page">
      <div className="pic">
        <div className="pic-container">
          <h5 className="center-item">Dont have an Account Yet</h5>
          {/* Needs to be Link for SignUp */}
          <button className="auth-button other-button center-item">
            Create an Account
          </button>
        </div>
      </div>
      <div className="form">
        <div className="form-container">
          <div className="form-title">
            <h2>Logo Go Here</h2>
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
            <Link className="text-gray" key="home" to="/passwordrecover">
              Forgot Password
            </Link>
            <button className="auth-button login">Login</button>
          </form>
          <h6 className="center-item">Connect With Socials</h6>
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
