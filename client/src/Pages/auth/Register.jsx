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
import {
  FaEyeSlash,
  FaEye,
  FaInfoCircle,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const USER_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const ref = useRef(null);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/auth/signin";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);

  // Dave GraYS
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

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
      setSuccess(true);
      setAuth({ user, password, accessToken });
      setUser("");
      setPassword("");
      setMatchPassword("");
      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Info");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized but its here");
      } else if (err.originalStatus === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
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
              {/* Change these out with error */}
              <h4
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </h4>
              <h6 className="text-gray">Sign Up to Continue</h6>
            </div>
          </div>

          <form className="auth-form" action="" onSubmit={handleSubmit}>
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
              <label htmlFor="email">
                Email
                <FaCheck className={validName ? "valid" : "hide"} />
                <FaTimes className={validName || !user ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FaInfoCircle className="eye-slash" />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="label-input">
              <label htmlFor="password">
                Password{" "}
                <FaCheck className={validPassword ? "valid" : "hide"} />
                <FaTimes
                  className={validPassword || !password ? "hide" : "invalid"}
                />
              </label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
              </div>
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FaInfoCircle className="eye-slash" />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div className="label-input">
              <label htmlFor="confirm_password">
                Confirm Password
                <FaCheck
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FaTimes
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                />
              </label>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </div>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FaInfoCircle className="eye-slash" />
                Must match the first password input field.
              </p>
            </div>
            <button
              className="auth-button login"
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
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
