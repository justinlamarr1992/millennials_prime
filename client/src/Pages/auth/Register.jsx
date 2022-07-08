import React, { useRef, useEffect, useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const ref = useRef(null);
  // const [locked, setLocked] = useState(true);

  const input = document.querySelector(".pwd input");
  const eye = document.querySelector(".pwd .eye-slash");
  // const lock = document.querySelector(".pwd fa-lock");
  const overlay = document.querySelector(".pwd .overlay");

  const passInput = document.querySelector(".input-group input");
  const toggleIcon = document.querySelector(".input-group .toggle");
  const ripple = document.querySelector(".input-group .ripple");
  const percentBar = document.querySelector(".strength-percent span");
  const passLabel = document.querySelector(".strength-label");

  // passInput.addEventListener("input", handlePassInput);
  // toggleIcon.addEventListener("click", togglePassInput);

  useEffect(() => {
    const el2 = ref.current;
    console.log(el2);

    // 👇️ use document.querySelector()
    // should only be used when you can't set a ref prop on the element
    // (you don't have access to the element)
    const el = document.querySelector("#container");
    console.log(el);
  }, []);

  function handlePassInput(e) {
    if (passInput.value.length === 0) {
      passLabel.innerHTML = "Strength";
      addClass();
    } else if (passInput.value.length < 4) {
      passLabel.innerHTML = "weak";
      addClass("weak");
    } else if (passInput.value.length < 7) {
      passLabel.innerHTML = "Not Bad";
      addClass("average");
    } else {
      passLabel.innerHTML = "Strong";
      addClass("strong");
    }
  }
  function togglePassInput(e) {
    const type = passInput.getAttribute("type");
    if (type === "password") {
      passInput.setAttribute("type", "text");
      toggleIcon.innerHTML = <FaEye className="eye" />;
      ripple.getElementsByClassName.cssText = `
      border-radius: 4px;
      width: 100%;
      height: 100%;
      right: 0;
      z-index: -1;
      `;
      passInput.style.color = "#000";
      passInput.style.background = "transparent";
      toggleIcon.style.fontSize = "27px";
    } else {
      passInput.setAttribute("type", "password");
      toggleIcon.innerHTML = <FaEyeSlash className="eye-slash" />;
      toggleIcon.style.fontSize = "25px";
      ripple.getElementsByClassName.cssText = `
      border-radius: 50%;
      width: 35px;
      height: 35px;
      right: 10px;
      z-index: 1;
      `;
      passInput.style.color = "#fff";
      passInput.style.background = "#112d37";
    }
  }

  function addClass(className) {
    percentBar.classList.remove("weak");
    percentBar.classList.remove("average");
    percentBar.classList.remove("strong");
    if (className) {
      percentBar.classList.add(className);
    }
  }

  // const handlePassInput = (e) => {
  //   if (passInput.value.length == 0) {
  //     passLabel.innerHTML = "Strength";
  //     addClass();
  //   } else if (passInput.value.length < 4) {
  //     passLabel.innerHTML = "weak";
  //     addClass("weak");
  //   } else if (passInput.value.length < 7) {
  //     passLabel.innerHTML = "Not Bad";
  //     addClass("average");
  //   } else {
  //     passLabel.innerHTML = "Strong";
  //     addClass("strong");
  //   }
  // };
  // const togglePassInput = (e) => {
  //   const type = passInput.getAttribute("type");
  //   if (type === "password") {
  //     passInput.setAttribute("type", "text");
  //     toggleIcon.innerHTML = <FaEye className="eye" />;
  //     ripple.getElementsByClassName.cssText = `
  //     border-radius: 4px;
  //     width: 100%;
  //     height: 100%;
  //     right: 0;
  //     z-index: -1;
  //     `;
  //     passInput.style.color = "#000";
  //     passInput.style.background = "transparent";
  //     toggleIcon.style.fontSize = "27px";
  //   } else {
  //     passInput.setAttribute("type", "password");
  //     toggleIcon.innerHTML = <FaEyeSlash className="eye-slash" />;
  //     toggleIcon.style.fontSize = "25px";
  //     ripple.getElementsByClassName.cssText = `
  //     border-radius: 50%;
  //     width: 35px;
  //     height: 35px;
  //     right: 10px;
  //     z-index: 1;
  //     `;
  //     passInput.style.color = "#fff";
  //     passInput.style.background = "#112d37";
  //   }
  // };
  // const addClass = (className) => {
  //   percentBar.classList.remove("weak");
  //   percentBar.classList.remove("average");
  //   percentBar.classList.remove("strong");
  //   if (className) {
  //     percentBar.classList.add(className);
  //   }
  // };

  // const onClick = () => {
  //   setLocked((current) => !current);

  //   // if  the password is hidden...
  //   if (locked == true) {
  //     console.log(locked);

  //     // show it
  //     input.type = "text";
  //     // Toggle between icons
  //     eye.classList.remove("eye-slash");
  //     eye.classList.add("eye");
  //   } else {
  //     console.log(locked);

  //     // Hide it
  //     input.type = "password";
  //     // Toggle between eye icons
  //     eye.classList.remove("eye");
  //     eye.classList.add("eye-slash");
  //   }
  //   // if (input.type === "password") {
  //   //   // show it
  //   //   input.type = "text";
  //   //   // Toggle between icons
  //   //   eye.classList.remove("fa-eye-slash");
  //   //   eye.classList.add("fa-eye");
  //   //   // change the color of the Lock eye in 500ms
  //   //   setTimeout(() => {
  //   //     lock.getElementsByClassName.color = "#111625";
  //   //   }, 500);
  //   // } else {
  //   //   // Hide it
  //   //   input.type = "password";
  //   //   // Toggle between eye icons
  //   //   eye.classList.remove("fa-eye");
  //   //   eye.classList.add("fa-eye-slash");
  //   //   // change the color of the lock icon
  //   //   lock.getElementsByClassName.color = "#dbdbdb";
  //   // }
  //   // toggle the overlay
  //   overlay.classList.toggle("overlaycover");
  // };

  return (
    <div className="page">
      {/* Think about using these settings with the div below commented out */}
      <div className="pic" ref={ref} id="container">
        <div className="pic-container">
          <div className="content">
            <h5 className="center-item">Already Have An Account?</h5>

            <Link className="auth-link center-item" to="/signin">
              <button className="auth-button other-button center-item">
                Login
              </button>
            </Link>
          </div>
          <div className="background">
            <img src={Company1} alt="" className="company" />
            <img src={Company2} alt="" className="company" />
            <img src={Company3} alt="" className="company" />
            <img src={Company1} alt="" className="company" />
          </div>
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
              <label htmlFor="">Full Name</label>
              <div className="validation-wrapper">
                {/* <label htmlFor="">Name</label> */}

                <input
                  className="fname names"
                  type="text"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  className="lname names"
                  placeholder="Last Name"
                  required
                />
                <div className="validation">*</div>
                {/* <label htmlFor="">Name</label>
              <input type="text" /> */}
              </div>
            </div>

            <div className="label-input">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            {/* <div className="label-input">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div> */}

            {/* first password */}
            {/* <div className="pwd">
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
            </div> */}
            {/* second password */}
            <div className="label-input">
              <label htmlFor="">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={handlePassInput}
                />

                <span className="toggle" onClick={togglePassInput}>
                  <FaEyeSlash className="eye-slash" />
                </span>
                <span className="ripple"></span>
              </div>
              <div className="pass-strength">
                <div className="strength-percentage">
                  <span></span>
                </div>
                <span className="password-label">Strength</span>
              </div>
            </div>

            {/* <button className="auth-button login">Create an Account</button> */}
            <Link className="" key="questionaire" to="/questionaire">
              <button className="auth-button login">Create an Account</button>
            </Link>
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
