import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
const PasswordRecovery = () => {
  return (
    <div className="signin">
      <div className="pic">
        <h6>Remember Your Password?</h6>
        {/* Needs to be Link for SignIn */}
        <button>Login</button>
      </div>
      <div className="form">
        <div className="signin-form">
          <h2>Logo</h2>
          <h4>Password Recovery</h4>
          <h5>Enter your Email to Recover Your Password</h5>
          <form action="">
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <button>Send Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PasswordRecovery;
