import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";

const Questionaire2 = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // info to be sent in backend
  const [entrepreneur, setEntrepreneur] = useState("");
  const [industry, setIndustry] = useState("");
  const [whyIndustry, setWhyIndustry] = useState("");
  const [openOnMillPrime, setOpenOnMillPrime] = useState("");
  const [lengthOpen, setLengthOpen] = useState("");
  const [whyBusiness, setWhyBusiness] = useState("");
  const [firstObjective, setFirstObjective] = useState("");
  const [objectiveNow, setObjectiveNow] = useState("");
  const [howMany, setHowMany] = useState("");
  const [productsAndServices, setProductsAndServices] = useState("");
  const [primaryPromotion, setPrimaryPromotion] = useState("");
  const [factorsOfLocation, setFactorsOfLocation] = useState("");

  // info to be sent in backend
  const [values, setValues] = useState({
    entrepreneur: "",
    industry: "",
    whyIndustry: "",
    openOnMillPrime: "",
    lengthOpen: "",
    whyBusiness: "",
    firstObjective: "",
    objectiveNow: "",
    howMany: "",
    productsAndServices: "",
    primaryPromotion: "",
    factorsOfLocation: "",
  });

  const [business, setBusiness] = useState(false);
  const [industryIn, setIndustryIn] = useState("");
  const [open, setOpen] = useState(false);

  const [businessOwner, setBusinessOwner] = useState({
    entrepreneur: Boolean,
    industry: String,
    open: Boolean,
  });

  const [errMsg, setErrMsg] = useState("");

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserBusinessInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/userinfo", { _id });
        console.log(response.data[0]);
        setEntrepreneur(response.data[0].entrepreneur);
        setIndustry(response.data[0].industry);
        setWhyIndustry(response.data[0].whyIndustry);
        setOpenOnMillPrime(response.data[0].openOnMillPrime);
        setLengthOpen(response.data[0].lengthOpen);
        setWhyBusiness(response.data[0].whyBusiness);
        setFirstObjective(response.data[0].firstObjective);
        setObjectiveNow(response.data[0].objectiveNow);
        setHowMany(response.data[0].howMany);
        setProductsAndServices(response.data[0].productsAndServices);
        setPrimaryPromotion(response.data[0].primaryPromotion);
        setFactorsOfLocation(response.data[0].factorsOfLocation);
      } catch (err) {
        console.log(err);
      }
    };
    getUserBusinessInfo();
  }, [_id]);

  const bossCheck = (e) => {
    console.log(business);
    const inputBusiness = document.getElementById("business").value;

    if (inputBusiness === "yes") {
      setBusiness(true);
      setEntrepreneur(true);
    } else {
      setBusiness(false);
      setEntrepreneur(false);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const industryCheck = (e) => {
    setIndustryIn(document.getElementById("industry").value);
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const openCheck = (e) => {
    const inputOpen = document.getElementById("open").value;

    if (inputOpen === "yes") {
      setOpen(true);
    } else {
      setOpen(false);
      console.log(open);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleWhyIndusty = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleHowLong = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleWhyBus = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handlefirstObj = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleObjNow = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleHowMany = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleProducts = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handlePriPro = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleFactors = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(values);
  };

  const handleUpdate = async (e) => {
    // This is where We update the user business info
    e.preventDefault();
    console.log(values);
    try {
      const response = await axiosPrivate.patch(`/users/business/${_id}`, {
        values,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
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
        <div className="form-container">
          <div className="form-title">
            <img className="auth-logo" src={Logo} alt="MPrime Logo" />

            <div className="form-text">
              <h4>Congrats Millennial, Let's talk Business!</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>
          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">Do you have a business?</label>
              <select
                name="entrepreneur"
                id="business"
                onChange={bossCheck}
                // value={entrepreneur}
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
                  name="industry"
                  // ref={emailRef}
                  // required
                />
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  Why did you decide to start a business in this industry?
                </label>
                <input
                  type="text"
                  id="why-industry"
                  name="whyIndustry"
                  onChange={handleWhyIndusty}
                />
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  Are you Open to Business with Users here.
                </label>
                <select
                  name="openOnMillPrime"
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

            {business == true && (
              <div className="label-input">
                <label htmlFor="" id="business-start">
                  How long have you ran your business?
                </label>
                <select
                  name="lengthOpen"
                  id="business-start-value"
                  placeholder="Select Answer"
                  onChange={handleHowLong}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="expert">5+ Years (Expert)</option>
                  <option value="professional">
                    2 - 5 Years (Professional)
                  </option>
                  <option value="experienced">1 - 2 Years (Experienced)</option>
                  <option value="new">0 - 11 Months (New)</option>
                </select>
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  Why did you decide to start your own business?
                </label>
                <select
                  name="whyBusiness"
                  id="business"
                  onChange={handleWhyBus}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="passion">Follow My Passion</option>
                  <option value="financial">Financial Independence</option>
                  <option value="boss">Be The Boss</option>
                  <option value="start">Start from Scratch</option>
                  <option value="help">Help Others</option>
                  <option value="taxes">Tax Benefits</option>
                  <option value="connect">Connect with Others</option>
                  <option value="skills">Learn new Skills</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  What was your first objective when you founded your business?
                </label>
                <input
                  type="text"
                  id="first-objection"
                  name="firstObjective"
                  onChange={handlefirstObj}
                />
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">What are the objectives now?</label>
                <input
                  type="text"
                  id="now-objective"
                  name="objectiveNow"
                  onChange={handleObjNow}
                />
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">How many people work for your company?</label>
                <select name="howMany" id="employees" onChange={handleHowMany}>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="solo">1</option>
                  <option value="group">2 - 10</option>
                  <option value="team">11 - 49</option>
                  <option value="enterprise">50+</option>
                </select>
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  What products or services do you offer?
                </label>
                <input
                  id="services"
                  type="text"
                  name="productsAndServices"
                  onChange={handleProducts}
                />
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  What is your Primary method to promote your business?
                </label>
                <select
                  name="primaryPromotion"
                  id="promotion"
                  placeholder="Select Answer"
                  // value={}
                  onChange={handlePriPro}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="mouth">Word of Mouth</option>
                  <option value="social-media">Social Media</option>
                  <option value="referral">Referral Programs</option>
                  <option value="ads">Local Ads</option>
                  <option value="directory">Directory</option>
                  <option value="loyalty">Loyalty Program</option>
                  <option value="partnership">Partnerships</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {business == true && (
              <div className="label-input">
                <label htmlFor="">
                  What factors influenced your decision to locate your business?
                </label>
                <select
                  name="factorsOfLocation"
                  id="location"
                  placeholder="Select Answer"
                  onChange={handleFactors}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="geographical">Geographical Location</option>
                  <option value="operation">Operational Needs</option>
                  <option value="rent">Rent Cost</option>
                  <option value="security">Security</option>
                  <option value="competition">Competition</option>
                  <option value="potential">Growth Potential</option>
                  <option value="accessibility">Accessibility</option>
                  <option value="utilities">
                    Utilities and Infrastructure
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            <button className="auth-button login" onClick={handleUpdate}>
              Next
            </button>
            <Link className="" key="questionaire" to="/auth/questionaire3">
              <button className="auth-button login">Next</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire2;

/* <div className="label-input">
              <label htmlFor="">
                Are you a company owner who makes use of professional services?
              </label>
              <input type="email" />
            </div> */
