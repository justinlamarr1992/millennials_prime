import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { loginUser } from "../../Actions/userActions";
import { setCredentials } from "../../Features/auth/authSlice";
import { useLoginMutation } from "../../Features/auth/authApiSlice";

// import { useLogin } from "../../Hooks/useLogin";

import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const SignIn = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const ref = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const { user } = useSelector((state) => ({ ...state }));

  // Dave GraYS
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized but its here");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  // const handleLoginUser = (e) => {
  //   e.preventDefault();

  //   let dataToSubmit = {
  //     email: email,
  //     password: password,
  //   };
  //   console.log("First Section is SignIn.jsx");

  //   loginUser(dataToSubmit)
  //     .then((response) => {
  //       dispatch({
  //         type: "LOGIN_USER",
  //         payload: {
  //           name: response.name,
  //           email: response.email,
  //           token: response.token,
  //           role: response.role,
  //           _id: response._id,
  //         },
  //       });

  //       console.log(response);

  //       if (response.loginSuccess) {
  //         window.localStorage.setItem("userId", response.userId);
  //         if (rememberMe === true) {
  //           window.localStorage.setItem("rememberMe", e.id);
  //         } else {
  //           localStorage.removeItem("rememberMe");
  //         }
  //         // <Navigate to="/" />;
  //       } else {
  //         console.log(response);
  //         alert("Something went wrong here");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
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
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="">Password</label>
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
            <Link
              className="password-recover-link"
              key="home"
              to="/auth/passwordrecovery"
            >
              <h6 className="text-gray">Forgot Password</h6>
            </Link>
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
  );

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return content;

  // return (
  // <div className="page">
  //   <div className="pic" ref={ref} id="container">
  //     <div className="pic-container">
  //       <div className="content">
  //         <h5 className="center-item">Don't have an Account Yet?</h5>

  //         <Link className="auth-link center-link" to="/auth/register">
  //           <button className="auth-button other-button center-item">
  //             Create an Account
  //           </button>
  //         </Link>
  //       </div>
  //       <div className="background">
  //         <img src={Company1} alt="" className="company" />
  //         <img src={Company2} alt="" className="company" />
  //         <img src={Company3} alt="" className="company" />
  //         <img src={Company1} alt="" className="company" />
  //       </div>
  //     </div>
  //   </div>
  //   <div className="form con-shade">
  //     <div className="form-container">
  //       <div className="form-title">
  //         <img className="auth-logo" src={Logo} alt="MPrime Logo" />

  //         <div className="form-text">
  //           <h4>Welcome Back</h4>
  //           <h6 className="text-gray">Sign in to Continue</h6>
  //         </div>
  //       </div>

  //       <form
  //         className="auth-form"
  //         // action=""
  //         // onSubmit={(e) => {
  //         //   e.preventDefault();

  //         //   let dataToSubmit = {
  //         //     email: email,
  //         //     password: password,
  //         //   };
  //         //   console.log("First Section is SignIn.jsx");

  //         //   loginUser(dataToSubmit)
  //         //     .then((response) => {
  //         //       console.log(response);
  //         //       dispatch({
  //         //         type: "LOGIN_USER",
  //         //         payload: {
  //         //           name: response.name,
  //         //           email: response.email,
  //         //           token: response.token,
  //         //           role: response.role,
  //         //           _id: response._id,
  //         //         },
  //         //       });

  //         //       console.log(email);
  //         //       console.log(response.loginSuccess);

  //         //       if (response.loginSuccess) {
  //         //         window.localStorage.setItem("userId", response.userId);
  //         //         if (rememberMe === true) {
  //         //           window.localStorage.setItem("rememberMe", e.id);
  //         //         } else {
  //         //           localStorage.removeItem("rememberMe");
  //         //         }
  //         //         // <Navigate to="/" />;
  //         //       } else {
  //         //         console.log(response);
  //         //         alert("Something went wrong here");
  //         //       }
  //         //     })
  //         //     .catch((err) => {
  //         //       console.log(err);
  //         //     });
  //         // }}
  //         onSubmit={handleLoginUser}
  //       >
  //         <div className="label-input">
  //           <label htmlFor="">Email</label>
  //           <input
  //             type="email"
  //             onChange={(e) => setEmail(e.target.value)}
  //             value={email}
  //           />
  //         </div>
  //         <div className="label-input">
  //           <label htmlFor="">Password</label>
  //           <input
  //             type="password"
  //             placeholder="Enter password"
  //             // onChange={handlePassInput}
  //             onChange={(e) => setPassword(e.target.value)}
  //             value={password}
  //           />
  //         </div>
  //         <Link
  //           className="password-recover-link"
  //           key="home"
  //           to="/auth/passwordrecovery"
  //         >
  //           <h6 className="text-gray">Forgot Password</h6>
  //         </Link>
  //         <button
  //           className="auth-button login"
  //           // onSubmit={handleSubmit}
  //           // disabled={isLoading}
  //         >
  //           Login
  //         </button>
  //         {/* {error && <div>{error}</div>} */}
  //       </form>
  //       <h6 className="social-text center-item text-gray">
  //         Connect With Socials
  //       </h6>
  //       <div className="social-buttons">
  //         <button className="auth-button google">Connect With Google</button>
  //         <button className="auth-button apple">Connect With Apple</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );
};
export default SignIn;
