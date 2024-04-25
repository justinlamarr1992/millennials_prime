import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import User from "../../Assets/Images/ProfileAvatar.png";
import "../../Components/settings/settings.css";
import SettingsModal from "../../Components/settings/SettingsModal";

import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useUserPicture from "../../Hooks/useUserPicture";

// NOT FINISHED NEED TO FIND OUT WHY BIRTHDAY DOES AUTOPOULATE
const MyInfo = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  const navigate = useNavigate();

  // Business Logo
  const [profileImage, setProfileImage] = useState({ image: null });

  // Form UseStates
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);
  const [canLike, setCanLike] = useState(null);
  const [canDislike, setCanDislike] = useState(null);
  const [canComment, setCanComment] = useState(null);
  const [canShare, setCanShare] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [B2B, setB2B] = useState(null);
  const [eComm, setEComm] = useState(null);
  const [upload, setUpload] = useState(null);
  // const [profileSettings, setProfileSettings] = useState({
  //   canLike: null,
  //   canDislike: null,
  //   canComment: null,
  //   canShare: null,
  //   industry: null,
  //   B2B: null,
  //   eComm: null,
  //   upload: null,
  // });

  // info to be sent in the backend
  const [values, setValues] = useState({
    name: null,
    username: null,
    email: null,
    DOB: null,
    country: null,
    state: null,
    city: null,
    zip: null,
    canLike: null,
    canDislike: null,
    canComment: null,
    canShare: null,
    industry: null,
    B2B: null,
    eComm: null,
    upload: null,
    // TEst later
    // profileSettings: {
    //   canLike: null,
    //   canDislike: null,
    //   canComment: null,
    //   canShare: null,
    //   industry: null,
    //   B2B: null,
    //   eComm: null,
    //   upload: null,
    // },
  });

  const [errMsg, setErrMsg] = useState(null);

  const _id = auth._id;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.post(
          "https://us-central1-millennialsprime.cloudfunctions.net/api/users/userinfo",
          { _id }
        );
        setName(response.data[0].name);
        setUsername(response.data[0].email);
        setEmail(response.data[0].username);
        setDOB(response.data[0].DOB);
        setCountry(response.data[0].location.country);
        setState(response.data[0].location.state);
        setCity(response.data[0].location.city);
        setZip(response.data[0].location.zip);
        setCanLike(response.data[0].profileSettings.canLike);
        setCanDislike(response.data[0].profileSettings.canDislike);
        setCanComment(response.data[0].profileSettings.canComment);
        setCanShare(response.data[0].profileSettings.canShare);
        setIndustry(response.data[0].profileSettings.industry);
        setB2B(response.data[0].profileSettings.B2B);
        setEComm(response.data[0].profileSettings.eComm);
        setUpload(response.data[0].profileSettings.upload);
        // Test LAter
        // setProfileSettings(response.data[0].profile);
        console.log(response);
      } catch (err) {
        console.log(err);
        // setErrMsg(err);
      }
    };
    // const getUserProfilePic = async () => {
    //   try {
    //     const response = await axiosPrivate.post("/users/getpic", { _id });
    //     // console.log(response.data.getImageToClient);
    //     // setProfileImage(response.data.getImageToClient);
    //     // console.log(profileImage);
    //     setProfileImage({
    //       ...profileImage,
    //       image: response.data.getImageToClient,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    getUserInfo();
    // getUserProfilePic();
  }, [_id]);

  // TODO: Implement this at later date
  // useUserPicture();

  const createProfileImage = async (newImage) => {
    try {
      axiosPrivate.post("/users/pic", { _id, newImage });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    console.log(base64);
    setProfileImage({ ...profileImage, image: base64 });
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is where We update the user main info
    console.log(values);
    try {
      const response = await axiosPrivate.patch(
        `https://us-central1-millennialsprime.cloudfunctions.net/api/users/${_id}`,
        { values }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await axiosPrivate.patch(
        `https://us-central1-millennialsprime.cloudfunctions.net/api/users/profilesettings/${_id}`,
        { values }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    navigate("/settings/business", {
      state: { data: "This is the data passed" },
    });
  };

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <div className="page">
      <div className="settings-container">
        <h2 className="settings-page-title">Account Information</h2>
        <form onSubmit={handleSubmit} className="settings-profile-form">
          <div className="settings-user-info-group">
            <label
              htmlFor="image-upload"
              className="square-container settings-user-pic-pic con-shade"
            >
              <img
                className="square-container-contents"
                src={profileImage.image || User}
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

            <h4 className="settings-user-pic-label">Profile Picture</h4>
            <button className="settings-user-pic-button page-button con-shade clickable">
              Change
            </button>
          </div>
          <div className="settings-user-info">
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  name="name"
                  placeholder={name}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  name="username"
                  placeholder={username}
                  disabled
                />
              </div>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  name="email"
                  placeholder={email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="label-input">
                <label htmlFor="">Birthday</label>
                <input
                  type="date"
                  id="DOB"
                  value={DOB}
                  name="DOB"
                  placeholder={DOB}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  name="country"
                  placeholder={country}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  name="state"
                  placeholder={state}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  name="city"
                  placeholder={city}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input">
                <label htmlFor="">Zip</label>
                <input
                  type="text"
                  id="zip"
                  value={zip}
                  name="zip"
                  placeholder={zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Viewers Can Like</label>
                <select
                  name="canLike"
                  value={canLike}
                  id="canLike"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Dislike</label>
                <select
                  name="canDislike"
                  value={canDislike}
                  id="canDislike"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Comment</label>
                <select
                  name="canComment"
                  value={canComment}
                  id="canComment"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Share</label>
                <select
                  name="canShare"
                  value={canShare}
                  id="canShare"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Industry</label>
                <select
                  name="industry"
                  value={industry}
                  id="industry"
                  onChange={handleChange}
                >
                  <option value="architecture">Architecture</option>
                  <option value="education">Education</option>
                  <option value="engineer">Engineering</option>
                  <option value="financial">
                    Financial Services & Insurance
                  </option>
                  <option value="government">Government</option>
                  <option value="healthcare">
                    Healthcare & Pharmaceutical
                  </option>
                  <option value="hospitality">Hospitality</option>
                  <option value="manufacturing">
                    Manufacturing/ Industrial
                  </option>
                  <option value="marketing">Marketing</option>
                  <option value="media">Media & Entertainment</option>
                  <option value="nonprofit">Non-Profit</option>
                  <option value="professional">Professional Services</option>
                  <option value="retail">Retail & Consumer Products</option>
                  <option value="sports">Sports</option>
                  <option value="tech">Tech</option>
                  <option value="telecommunications">Telecommunications</option>
                  <option value="transportation">Transportation</option>

                  <option value="other">Other</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Looking For B2B Relationships</label>
                <select name="B2B" value={B2B} id="B2B" onChange={handleChange}>
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">E-Commerence</label>
                <select
                  name="eComm"
                  value={eComm}
                  id="eComm"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Upload Content</label>
                <select
                  name="upload"
                  value={upload}
                  id="upload"
                  onChange={handleChange}
                >
                  <option value="">Select Answer</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <button
              className="settings-user-info-button home-butt page-button con-shade clickable"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
        <button className="test-modal-button" onClick={onClick}>
          Modal Test Button
        </button>
        {modal && <SettingsModal />}
      </div>
    </div>
  );
};
export default MyInfo;

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
