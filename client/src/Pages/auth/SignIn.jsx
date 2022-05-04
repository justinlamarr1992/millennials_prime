import React from "react";
import "./auth.css";

import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="pic">
        <h6>Dont have an Account Yet</h6>
        {/* Needs to be Link for SignUp */}
        <button>Create an Account</button>
      </div>
      <div className="form">
        <div className="signin-form">
          <h2>Logo</h2>
          <h4>Welcome Back</h4>
          <h5>Sign in to Continue</h5>
          <form action="">
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div>
            <Link key="home" to="/passwordrecover">
              Forgot Password
            </Link>
            <button>Login</button>
          </form>
          <h6>Connect With Socials</h6>
          <button>Connect With Google</button>
          <button>Connect With Apple</button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
