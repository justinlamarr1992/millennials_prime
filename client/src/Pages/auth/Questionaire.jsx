import React from "react";
import "./auth.css";
const Questionaire = () => {
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
          <h4>Profile Questionaire</h4>
          <h5>Answer the Following Questions</h5>
          <form action="">
            <div className="label-input">
              <label htmlFor="">Question 1</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 2</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 3</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 4</label>
              <input type="email" />
            </div>
            <div className="label-input">
              <label htmlFor="">Question 5</label>
              <input type="email" />
            </div>

            <button>Send Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire;
