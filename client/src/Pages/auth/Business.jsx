import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CompanyLogo from "../../Assets/Images/CompanyLogo.png";
import "./auth.css";
import SettingsModal from "../../Components/settings/SettingsModal";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";
const Business = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  const navigate = useNavigate();

  // Business Logo
  const [profileImage, setProfileImage] = useState({ image: null });

  // Form useStates
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [whyIndustry, setWhyIndustry] = useState(null);
  const [openOnMillPrime, setOpenOnMillPrime] = useState(null);
  const [lengthOpen, setLengthOpen] = useState(null);
  const [whyBusiness, setWhyBusiness] = useState(null);
  const [firstObjective, setFirstObjective] = useState(null);
  const [objectiveNow, setObjectiveNow] = useState(null);
  const [howMany, setHowMany] = useState(null);
  const [productsAndServices, setProductsAndServices] = useState(null);
  const [primaryPromotion, setPrimaryPromotion] = useState(null);
  const [factorsOfLocation, setFactorsOfLocation] = useState(null);

  // info to be sent in backend
  const [values, setValues] = useState({
    entrepreneur: null,
    companyName: null,
    industry: null,
    whyIndustry: null,
    openOnMillPrime: null,
    lengthOpen: null,
    whyBusiness: null,
    firstObjective: null,
    objectiveNow: null,
    howMany: null,
    productsAndServices: null,
    primaryPromotion: null,
    factorsOfLocation: null,
  });

  const [business, setBusiness] = useState(null);
  const [industryIn, setIndustryIn] = useState(null);
  const [open, setOpen] = useState(null);

  const [errMsg, setErrMsg] = useState(null);

  const _id = auth._id;

  useEffect(() => {
    const getUserBusinessInfo = async () => {
      try {
        const response = await axiosPrivate.post(
          "https://us-central1-millennialsprime.cloudfunctions.net/api/users/userinfo",
          { _id }
        );
        if (response.data[0].business) {
          setEntrepreneur(response.data[0].business.entrepreneur);
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
          bossCheck();
        } else {
          console.log("We broke broke");
        }
        console.log("User Data ", response.data[0].business);
      } catch (err) {
        console.log(err);
        // setErrMsg(err);
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

  // True/false Drop Down Checks
  const bossCheck = (e) => {
    console.log(business);

    setBusiness(true);

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

  // Handles
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const handleUpdate = async (e) => {
    // This is where We update the user art info
    e.preventDefault();
    console.log(values);
    try {
      const response = await axiosPrivate.patch(
        `https://us-central1-millennialsprime.cloudfunctions.net/api/users/business/${_id}`,
        {
          values,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    navigate("/settings/art", {
      state: { data: "This is the data passed" },
    });
  };

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <div className="page">
      <div className="settings-container">
        <h2 className="settings-page-title">Business Information</h2>
        <form className="settings-profile-form" onSubmit={handleUpdate}>
          <div className="label-input">
            <label>Do you have a business?</label>
            <select
              name="entrepreneur"
              id="business"
              onChange={bossCheck}
              value={entrepreneur}
              placeholder="Select Answer"
            >
              <option value="" disabled selected>
                Select your option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {business && (
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
                    onChange={handleChange}
                    placeholder="Company Name"
                    id="company-name"
                    name="companyName"
                    value={companyName}
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
                    onChange={handleChange}
                    placeholder="State"
                    id="industry"
                    name="industry"
                    value={industry}
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
                    value={whyIndustry}
                    onChange={handleChange}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="" id="business-start">
                    How long have you ran your business?
                  </label>
                  <select
                    name="lengthOpen"
                    value={lengthOpen}
                    id="business-start-value"
                    placeholder="Select Answer"
                    onChange={handleChange}
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
                    value={whyBusiness}
                    id="business"
                    onChange={handleChange}
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
                    value={firstObjective}
                    onChange={handleChange}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">What are the objectives now?</label>
                  <input
                    type="text"
                    id="now-objective"
                    name="objectiveNow"
                    value={objectiveNow}
                    onChange={handleChange}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">
                    How many people work for your company?
                  </label>
                  <select
                    name="howMany"
                    value={howMany}
                    id="employees"
                    onChange={handleChange}
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
                    value={productsAndServices}
                    onChange={handleChange}
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">
                    What Primary Method Promotes the business?
                  </label>
                  <select
                    name="primaryPromotion"
                    value={primaryPromotion}
                    id="promotion"
                    placeholder="Select Answer"
                    // value={}
                    onChange={handleChange}
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
                    value={factorsOfLocation}
                    placeholder="Select Answer"
                    onChange={handleChange}
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
