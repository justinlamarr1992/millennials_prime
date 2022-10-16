import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

// import { useDispatch } from "react-redux";

import axios from "axios";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/auth/signin";

  // getting info for signing up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // const dispatch = useDispatch();

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

  useEffect(() => {
    const el2 = ref.current;
    console.log(el2);

    // 👇️ use document.querySelector()
    // should only be used when you can't set a ref prop on the element
    // (you don't have access to the element)
    const el = document.querySelector("#container");
    console.log(el);
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

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

  // Dave GraYS
  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSubmit = {
      user,
      password,
      firstName,
      lastName,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        dataToSubmit,

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      // setUser("");
      // setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log("Nope");

      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Info");
      } else if (err.originalStatus === 401) {
        console.log(err);
        setErrMsg("Unauthorized but its here");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };
  return (
    <div className="page">
      {/* Think about using these settings with the div below commented out */}
      <div className="pic" ref={ref} id="container">
        <div className="pic-container">
          <div className="content">
            <h5 className="center-item">Already Have An Account?</h5>

            <Link className="auth-link center-item" to="/auth/signin">
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
      <div className="form con-shade">
        <div className="form-container">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Create an Account</h4>
              <h6 className="text-gray">Sign Up to Continue</h6>
            </div>
          </div>

          <form
            className="auth-form"
            action=""
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   let dataToSubmit = {
            //     email: email,
            //     password: password,
            //     name: name,
            //     lastname: lastname,
            //   };

            //   dispatch(registerUser(dataToSubmit)).then((response) => {
            //     console.log(email, password, name, lastname);
            //     if (response.payload.success) {
            //       // NAVAGAT CODE
            //     } else {
            //       alert("register went wrong");
            //       console.log(response.payload.err.errmsg);
            //     }
            //   });
            // }}
            onSubmit={handleSubmit}
          >
            <div className="label-input">
              <label htmlFor="">Full Name</label>
              <div className="validation-wrapper">
                <input
                  className="fname names"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
                <input
                  type="text"
                  className="lname names"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                />
                <div className="validation">*</div>
              </div>
            </div>

            <div className="label-input">
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={(e) => setUser(e.target.value)}
                value={user}
              />
            </div>

            <div className="label-input">
              <label htmlFor="">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter password"
                  // onChange={handlePassInput}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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

            {/* <Link className="" key="questionaire" to="/questionaire">
    <button className="auth-button login">Create an Account</button>
  </Link> */}
            <button
              // onClick={handleSubmit}
              className="auth-button login"
              // disabled={isLoading}
            >
              Create an Account
            </button>
            {/* {error && <div>{error}</div>} */}
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

// ORGINAL
{
  /* Current failure */
}
{
  /* <form
            className="auth-form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              let dataToSubmit = {
                email: email,
                password: password,
                name: name,
                lastname: lastname,
              };

              dispatch(registerUser(dataToSubmit)).then((response) => {
                console.log(email, password, name, lastname);
                if (response.payload.success) {
                  NAVAGAT CODE
                } else {
                  alert("register went wrong");
                  console.log(response.payload.err.errmsg);
                }
              });
            }}
            onSubmit={handleSubmit}
          >
            <div className="label-input">
              <label htmlFor="">Full Name</label>
              <div className="validation-wrapper">
                <input
                  className="fname names"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <input
                  type="text"
                  className="lname names"
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                />
                <div className="validation">*</div>
              </div>
            </div>

            <div className="label-input">
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="label-input">
              <label htmlFor="">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={handlePassInput}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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

            <Link className="" key="questionaire" to="/questionaire">
              <button className="auth-button login">Create an Account</button>
            </Link>
            <button
              onClick={handleSubmit}
              className="auth-button login"
              disabled={isLoading}
            >
              Create an Account
            </button>
            {error && <div>{error}</div>}
          </form>
          First but works */
}
