import React, { useRef, useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../Hooks/useInput";
import useToggle from "../../Hooks/useToggle";
// import useAuth from "../../Hooks/useAuth";

import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import axios from "../../API/axios";
const SIGNIN_URL = "/auth";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  const ref = useRef(null);

  const [user, resetUser, userAttribs] = useInput("user", ""); //useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  let from = location.state?.from?.pathname || "/";

  console.log("Use Location Hook ", location);

  // TODO: FIGURE OUT THE BUG
  // This is the code coming from somewhere that needs the login
  // conflicts with already login procedures
  // if (location.state != null) {
  //   from = location.state;
  // } else {
  //   from = "/";
  // }

  console.log("Use Location Hook From ", from);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  // Dave GraYS
  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSubmit = {
      user: user,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://us-central1-millennialsprime.cloudfunctions.net/api/auth",
        dataToSubmit,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const _id = response?.data._id;
      console.log(_id);
      setAuth({ user, accessToken, _id });
      // setUser("");
      resetUser();
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        console.log(err);
        setErrMsg("Unauthorized but its here");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persist]);

  // FOR NOW WITH THE isLoading commented Out
  const content = (
    <div className="page">
      <div className="pic" ref={ref} id="container">
        <div className="pic-container">
          <div className="content">
            <h5 className="center-item">Don't have an Account Yet?</h5>

            <Link className="auth-link center-link" to="/auth/register">
              <button className="auth-button other-button center-item">
                Create an Account
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
              <h4>Welcome Back</h4>
              {/* Figure way to exchange the greeting and error medssage */}
              <h4
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </h4>
              <h6 className="text-gray">Sign in to Continue</h6>
            </div>
          </div>

          <form
            className="auth-form"
            // onSubmit={handleLoginUser}
            onSubmit={handleSubmit}
          >
            <div className="label-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                {...userAttribs}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                // onChange={handlePassInput}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                required
              />
            </div>
            <div className="login-options">
              <div className="persistCheck">
                <input
                  type="checkbox"
                  className="persist-check-box"
                  id="persist"
                  onChange={toggleCheck}
                  checked={check}
                />
                <label className="persist-label text-gray" htmlFor="persist">
                  Trust this Device
                </label>
              </div>
              <Link
                className="password-recover-link"
                key="home"
                to="/auth/passwordrecovery"
              >
                <h6 className="text-gray">Forgot Password</h6>
              </Link>
            </div>

            <button
              className="auth-button login"
              // onSubmit={handleSubmit}
              // disabled={isLoading}
            >
              Login
            </button>
            {/* {error && <div>{error}</div>} */}
          </form>
          <h6 className="social-text center-item text-gray">
            Connect With Socials
          </h6>
          <div className="social-buttons">
            <button className="auth-button google">Connect With Google</button>
            <button className="auth-button apple">Connect With Apple</button>
          </div>
        </div>
      </div>
    </div>
    // )}
  );

  return content;
};
export default SignIn;
