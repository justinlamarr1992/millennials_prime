import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CompanyLogo from "../../Assets/Images/CompanyLogo.png";
import "./auth.css";
import SettingsModal from "../../Components/settings/SettingsModal";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";

const Business = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  // Business Logo
  const [profileImage, setProfileImage] = useState({ image: "" });

  // info to be sent in backend
  const [entrepreneur, setEntrepreneur] = useState("");
  const [companyName, setCompanyName] = useState("");
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
    companyName: "",
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

  const [errMsg, setErrMsg] = useState("");

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserBusinessInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/userinfo", { _id });
        console.log(response.data[0]);
        setEntrepreneur(response.data[0].business.entrepreneur);
        if (entrepreneur == true) {
          console.log("I have a company and the follow is the data");

          setCompanyName(response.data[0].business.companyName);
          setIndustry(response.data[0].business.industry);
          setWhyIndustry(response.data[0].business.whyIndustry);
          setOpenOnMillPrime(response.data[0].business.openOnMillPrime);
          setLengthOpen(response.data[0].business.lengthOpen);
          setWhyBusiness(response.data[0].business.whyBusiness);
          setFirstObjective(response.data[0].business.firstObjective);
          setObjectiveNow(response.data[0].business.objectiveNow);
          setHowMany(response.data[0].business.howMany);
          setProductsAndServices(response.data[0].business.productsAndServices);
          setPrimaryPromotion(response.data[0].business.primaryPromotion);
          setFactorsOfLocation(response.data[0].business.factorsOfLocation);
        }
        // setCompanyName(response.data[0].companyName);
        // setIndustry(response.data[0].industry);
        // setWhyIndustry(response.data[0].whyIndustry);
        // setOpenOnMillPrime(response.data[0].openOnMillPrime);
        // setLengthOpen(response.data[0].lengthOpen);
        // setWhyBusiness(response.data[0].whyBusiness);
        // setFirstObjective(response.data[0].firstObjective);
        // setObjectiveNow(response.data[0].objectiveNow);
        // setHowMany(response.data[0].howMany);
        // setProductsAndServices(response.data[0].productsAndServices);
        // setPrimaryPromotion(response.data[0].primaryPromotion);
        // setFactorsOfLocation(response.data[0].factorsOfLocation);
      } catch (err) {
        console.log(err);
      }
    };
    getUserBusinessInfo();
  }, [_id]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    console.log(base64);
    setProfileImage({ ...profileImage, image: base64 });
  };

  const bossCheck = (e) => {
    console.log(business);
    const inputBusiness = document.getElementById("business").value;

    if (inputBusiness === "yes") {
      setBusiness(true);
      setEntrepreneur(true);
    } else {
      setIndustry("");
      setWhyIndustry("");
      setOpenOnMillPrime("");
      setLengthOpen("");
      setWhyBusiness("");
      setFirstObjective("");
      setObjectiveNow("");
      setHowMany("");
      setProductsAndServices("");
      setPrimaryPromotion("");
      setFactorsOfLocation("");
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
  const handleCompanyName = async (e) => {
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

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <div className="page">
      <div className="settings-container">
        <h2 className="settings-page-title">Business Information</h2>
        <form
          className="settings-profile-form"
          onSubmit={handleUpdate}
          action=""
        >
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
            <div className="settings-user-info">
              <div className="settings-user-info-group">
                <label
                  htmlFor="image-upload"
                  className="square-container settings-user-pic-pic con-shade"
                >
                  <img
                    className="square-container-contents"
                    src={profileImage.image || CompanyLogo}
                    alt="User Image here"
                  />
                </label>

                <input
                  className="hide"
                  type="file"
                  lable="Image"
                  name="profileImage"
                  id="image-upload"
                  accept=".jpe, .png, .jpg"
                  onChange={(e) => handleImageUpload(e)}
                />

                <h4 className="settings-user-pic-label">Company Logo</h4>
                <button className="settings-user-pic-button page-button con-shade clickable">
                  Change
                </button>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">What is the Name of the Company?</label>
                  <input
                    type="text"
                    onChange={handleCompanyName}
                    placeholder="Company Name"
                    id="company-name"
                    name="companyName"
                    // ref={emailRef}
                    // required
                  />
                </div>

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
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    What is the Industry Your Operate in?
                  </label>
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

                <div className="label-input">
                  <label htmlFor="">
                    Why start a business in this industry?
                  </label>
                  <input
                    type="text"
                    id="why-industry"
                    name="whyIndustry"
                    onChange={handleWhyIndusty}
                  />
                </div>

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
                    <option value="experienced">
                      1 - 2 Years (Experienced)
                    </option>
                    <option value="new">0 - 11 Months (New)</option>
                  </select>
                </div>

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
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    What were the first objectives for the business?
                  </label>
                  <input
                    type="text"
                    id="first-objection"
                    name="firstObjective"
                    onChange={handlefirstObj}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">What are the objectives now?</label>
                  <input
                    type="text"
                    id="now-objective"
                    name="objectiveNow"
                    onChange={handleObjNow}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">
                    How many people work for your company?
                  </label>
                  <select
                    name="howMany"
                    id="employees"
                    onChange={handleHowMany}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="solo">1</option>
                    <option value="group">2 - 10</option>
                    <option value="team">11 - 49</option>
                    <option value="enterprise">50+</option>
                  </select>
                </div>
              </div>

              <div className="settings-user-info-group">
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

                <div className="label-input">
                  <label htmlFor="">
                    What Primary Method Promotes the business?
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

                <div className="label-input">
                  <label htmlFor="">
                    What factors influenced the location?
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
              </div>
            </div>
          )}
          {/* This entire{()} will be around everything in  the business */}

          <button className="auth-button login" onClick={handleUpdate}>
            Update Business Information
          </button>
        </form>
        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <SettingsModal />}
      </div>
    </div>
  );
};
export default Business;

/* <div className="label-input">
              <label htmlFor="">
                Are you a company owner who makes use of professional services?
              </label>
              <input type="email" />
            </div> */

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
