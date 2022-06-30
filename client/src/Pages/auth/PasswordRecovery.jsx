import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const PasswordRecovery = () => {
  return (
    <div className="page">
      <div className="pic">
        <div className="pic-container">
          <h5 className="center-item">Remember Your Password?</h5>
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
              <h4>Password Recovery</h4>
              <h6 className="text-gray">
                Enter your Email to Recover Your Password
              </h6>
            </div>
          </div>

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <button className="auth-button login">Send Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PasswordRecovery;
