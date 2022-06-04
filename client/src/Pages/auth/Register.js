import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";

const Register = () => {
  return (
    <div className="page">
      <div className="pic">
        <div className="pic-container">
          <h5 className="center-item">Already Have An Account?</h5>
          {/* Needs to be Link for SignIn */}
          <button className="auth-button other-button center-item">
            Login
          </button>
        </div>
      </div>
      <div className="form">
        <div className="form-container">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Create an Account</h4>
              <h6 className="text-gray">Sign Up to Continue</h6>
            </div>
          </div>

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div>
            <button className="auth-button login">Create an Account</button>
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
export default Register;
