import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import axios from "axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";

const Questionaire = () => {
  const { auth } = useAuth();
  console.log("THISIS THE AUTH PROVIDER", auth);

  const [allowed, setAllowed] = useState(false);
  const [DOB, setDOB] = useState("");
  const [location, setLocation] = useState({
    country: String,
    city: String,
    state: String,
    zip: Number,
  });
  const [business, setBusiness] = useState(false);
  const [industry, setIndustry] = useState("");
  const [open, setOpen] = useState(false);

  const [businessOwner, setBusinessOwner] = useState({
    entrepreneur: Boolean,
    industry: String,
    open: Boolean,
  });

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const questionaire1Info = () => {
    location.country = document.getElementById("country").value;
    location.city = document.getElementById("city").value;
    location.state = document.getElementById("state").value;
    location.zip = document.getElementById("zip").value;

    console.log(location.country, location.city, location.state, location.zip);
  };

  const bossCheck = (e) => {
    console.log(business);
    const inputBusiness = document.getElementById("business").value;

    if (inputBusiness === "yes") {
      setBusiness(true);
    } else {
      setBusiness(false);
    }
    console.log(inputBusiness);
  };
  const industryCheck = (e) => {
    setIndustry(document.getElementById("country").value);
  };
  const openCheck = (e) => {
    const inputOpen = document.getElementById("open").value;

    if (inputOpen === "yes") {
      setOpen(true);
    } else {
      setOpen(false);
      console.log(open);
    }
  };
  const ageCheck = (e) => {
    e.preventDefault();
    const inputDate = document.getElementById("dateofbirth").value;
    var birthDate = new Date(inputDate);
    var birthYear = birthDate.getFullYear();
    console.log(birthYear);
    console.log(birthDate);
    if (birthYear < 1996 && birthYear > 1981) {
      setAllowed(true);
      questionaire1Info();
      setDOB(birthDate);
    } else {
      // alert("You are not a Millennial");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let dataToSubmit = {
      DOB,
      businessOwner: {
        entrepreneur: business,
        industry: industry,
        open: open,
      },
      location: {
        country: location.country,
        city: location.city,
        state: location.state,
        zip: location.zip,
      },
    };
    // TODO: Figure way to get the active user to update
    try {
      const response = await axiosPrivate.patch(
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
    navigate("/auth/questionaire2");
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

          <form className="auth-form" onSubmit={onSubmit}>
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
                name="business"
                id="business"
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
            {business == true && (
              <div className="label-input">
                <label htmlFor="">What is the Industry Your Operate in?</label>
                <input
                  type="text"
                  onChange={industryCheck}
                  placeholder="State"
                  id="industry"
                  // ref={emailRef}
                  // required
                />
              </div>
            )}
            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  Are you Open to Business with Users here.
                </label>
                <select
                  name="open"
                  id="open"
                  onChange={openCheck}
                  placeholder="Select Answer"
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
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
              <button className="auth-button login">Next</button>
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
