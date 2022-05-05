import React from "react";
import "./auth.css";
const Questionaire = () => {
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
            <h2>Logo</h2>
            <div className="form-text">
              <h4>Profile Questionaire</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>

          <form className="auth-form" action="">
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

            <button className="auth-button login">Send Email</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire;
