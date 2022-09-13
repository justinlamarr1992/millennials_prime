import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../Actions/userActions";
// import { useLogin } from "../../Hooks/useLogin";

import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const { user } = useSelector((state) => ({ ...state }));

  // const { login, error, isLoading } = useLogin();
  const ref = useRef(null);

  // const loginUser(dataToSubmit) => {

  // }
  //   .then((response) => {
  //     console.log(email);
  //     if (response.payload.loginSuccess) {
  //       window.localStorage.setItem("userId", response.payload.userId);
  //       if (rememberMe === true) {
  //         window.localStorage.setItem("rememberMe", e.id);
  //       } else {
  //         localStorage.removeItem("rememberMe");
  //       }
  //       // <Navigate to="/" />;
  //     } else {
  //       console.log(response);
  //       alert("Something went wrong here");
  //     }
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setTimeout(() => {
  //     let dataToSubmit = {
  //       email: e.email,
  //       password: e.password,
  //     };
  //     dispatch(loginUser(dataToSubmit))
  //       .then((response) => {
  //         if (response.payload.loginSuccess) {
  //           window.localStorage.setItem("userId", response.payload.userId);
  //           if (rememberMe === true) {
  //             window.localStorage.setItem("rememberMe", e.id);
  //           } else {
  //             localStorage.removeItem("rememberMe");
  //           }
  //           <Navigate to="/" />;
  //         } else {
  //           alert("Wrong email of Password");
  //         }
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }, 500);
  //   // await login(email, password);
  // };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
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
              <h6 className="text-gray">Sign in to Continue</h6>
            </div>
          </div>

          <form
            className="auth-form"
            // action=""
            // onSubmit={handleSubmit}
            onSubmit={(e) => {
              e.preventDefault();
              // setTimeout(() => {
              let dataToSubmit = {
                email: email,
                password: password,
              };
              dispatch(loginUser(dataToSubmit));
              // .then((response) => {
              //   console.log(email);
              //   if (response.payload.loginSuccess) {
              //     window.localStorage.setItem(
              //       "userId",
              //       response.payload.userId
              //     );
              //     if (rememberMe === true) {
              //       window.localStorage.setItem("rememberMe", e.id);
              //     } else {
              //       localStorage.removeItem("rememberMe");
              //     }
              //     // <Navigate to="/" />;
              //   } else {
              //     console.log(response);
              //     alert("Something went wrong here");
              //   }
              // })
              // .catch((err) => {
              //   alert(err);
              // });
              // }, 500);
            }}
          >
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
              <input
                type="password"
                placeholder="Enter password"
                // onChange={handlePassInput}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
};
export default SignIn;
