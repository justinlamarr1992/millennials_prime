import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import axios from "axios";

const Questionaire = () => {
  const [allowed, setAllowed] = useState(false);
  const [DOB, setDOB] = useState("");
  const [location, setLocation] = useState({});
  const [businessOwner, setBusinessOwner] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const ageCheck = (e) => {
    e.preventDefault();
    const inputDate = document.getElementById("dateofbirth").value;
    var birthDate = new Date(inputDate);
    var birthYear = birthDate.getFullYear();
    console.log(birthYear);
    if (birthYear < 1996 && birthYear > 1981) {
      setAllowed(true);
      questionaire1Info();
    } else {
      // alert("You are not a Millennial");
    }
  };
  const bossCheck = (e) => {
    console.log(businessOwner);
    const inputBusiness = document.getElementById("business").value;
    if (inputBusiness === "yes") {
      setBusinessOwner(true);
    } else {
      setBusinessOwner(false);
    }
    console.log(inputBusiness);
  };
  const questionaire1Info = () => {
    const inputCountry = document.getElementById("country").value;
    const inputCity = document.getElementById("city").value;
    const inputState = document.getElementById("state").value;
    const inputZip = document.getElementById("zip").value;

    console.log(inputCountry, inputCity, inputState, inputZip);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dataToSubmit = {
      DOB,
      businessOwner,
      location,
    };
    try {
      const response = await axios.patch(
        "http://localhost:4000/users/63443462575cbf86c3b630f4",
        dataToSubmit,

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      //   setAuth({ user, password, roles, accessToken });
      // setUser("");
      // setPassword("");
      //   navigate(from, { replace: true });
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
      <div className="pic pic2">
        <div className="pic-container">
          <div className="background">
            <img src={Company1} alt="" className="company" />
            <img src={Company2} alt="" className="company" />
            <img src={Company3} alt="" className="company" />
            <img src={Company1} alt="" className="company" />
          </div>
        </div>
      </div>
      <div className="form form2 con-shade">
        <div className="form-container ">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Do You Make the Cut?</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>

          <form className="auth-form" action="" onSubmit={handleSubmit}>
            <div className="label-input location">
              <label className="location-label" htmlFor="">
                Where are you From?
              </label>
              <input
                className="location-input input1"
                type="text"
                placeholder="Country"
                id="country"
              />
              <input
                className="location-input"
                type="text"
                placeholder="City"
                id="city"
              />
              <input
                className="location-input"
                type="text"
                placeholder="State"
                id="state"
              />
              <input
                className="location-input"
                type="text"
                placeholder="Zip"
                id="zip"
              />
            </div>

            <div className="label-input">
              <label htmlFor="">Do you have a business?</label>
              <select
                name="businessOwner"
                id="businessOwner"
                onChange={bossCheck}
                placeholder="Select Answer"
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {businessOwner == true && (
              <div className="label-input">
                <label htmlFor="">What is the Industry Your Operate in?</label>
                <input type="email" />
              </div>
            )}
            {businessOwner == true && (
              <div className="label-input">
                <label htmlFor="">
                  Are you Open to Business with Users here.
                </label>
                <input type="email" />
              </div>
            )}

            <div className="label-input">
              <label htmlFor="">When were you Born</label>
              <input
                type="date"
                name="dateofbirth"
                id="dateofbirth"
                onChange={ageCheck}
              />
            </div>
            {allowed == true ? (
              <Link className="" key="questionaire" to="/auth/questionaire2">
                <button className="auth-button login">Next</button>
              </Link>
            ) : (
              <button className="auth-button login" disabled>
                Next
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire;
