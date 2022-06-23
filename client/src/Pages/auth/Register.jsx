import React, { useRef, useEffect, useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const ref = useRef(null);
  const [locked, setLocked] = useState(true);

  const input = document.querySelector(".pwd input");
  const eye = document.querySelector(".pwd .eye-slash");
  // const lock = document.querySelector(".pwd fa-lock");
  const overlay = document.querySelector(".pwd .overlay");

  useEffect(() => {
    const el2 = ref.current;
    console.log(el2);

    // 👇️ use document.querySelector()
    // should only be used when you can't set a ref prop on the element
    // (you don't have access to the element)
    const el = document.querySelector("#container");
    console.log(el);
  }, []);

  const onClick = () => {
    setLocked((current) => !current);

    // if  the password is hidden...
    if (locked == true) {
      console.log(locked);

      // show it
      input.type = "text";
      // Toggle between icons
      eye.classList.remove("eye-slash");
      eye.classList.add("eye");
    } else {
      console.log(locked);

      // Hide it
      input.type = "password";
      // Toggle between eye icons
      eye.classList.remove("eye");
      eye.classList.add("eye-slash");
    }
    // if (input.type === "password") {
    //   // show it
    //   input.type = "text";
    //   // Toggle between icons
    //   eye.classList.remove("fa-eye-slash");
    //   eye.classList.add("fa-eye");
    //   // change the color of the Lock eye in 500ms
    //   setTimeout(() => {
    //     lock.getElementsByClassName.color = "#111625";
    //   }, 500);
    // } else {
    //   // Hide it
    //   input.type = "password";
    //   // Toggle between eye icons
    //   eye.classList.remove("fa-eye");
    //   eye.classList.add("fa-eye-slash");
    //   // change the color of the lock icon
    //   lock.getElementsByClassName.color = "#dbdbdb";
    // }
    // toggle the overlay
    overlay.classList.toggle("overlaycover");
  };

  return (
    <div className="page">
      <div className="pic" ref={ref} id="container">
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
            <div className="validation-wrapper">
              {/* <label htmlFor="">Name</label> */}
              <input
                className="fname"
                type="text"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="lname"
                placeholder="Last Name"
                required
              />
              <div className="validation">*</div>
              {/* <label htmlFor="">Name</label>
              <input type="text" /> */}
            </div>
            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>

            {/* <div className="label-input">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div> */}
            <div className="pwd">
              <input type="password" placeholder="Password..." />

              <div onClick={onClick} className="overlay ">
                <div className="locked-bubble">
                  {locked === true ? (
                    <FaEyeSlash className="eye-slash" />
                  ) : (
                    <FaEye className="eye" />
                  )}
                </div>
              </div>
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
