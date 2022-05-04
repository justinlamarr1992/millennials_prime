import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="signin">
      <div className="pic">
        <h6>Already Have An Account?</h6>
        {/* Needs to be Link for SignIn */}
        <button>Login</button>
      </div>
      <div className="form">
        <div className="signin-form">
          <h2>Logo</h2>
          <h4>Create an Account</h4>
          <h5>Sign Up to Continue</h5>
          <form action="">
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
            <button>Create an Account</button>
          </form>
          <h6>Connect With Socials</h6>
          <button>Connect With Google</button>
          <button>Connect With Apple</button>
        </div>
      </div>
    </div>
  );
};
export default Register;
