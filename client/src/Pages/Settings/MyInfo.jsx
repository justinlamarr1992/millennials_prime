import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import User from "../../Assets/Images/ProfileAvatar.png";
import "../../Components/settings/settings.css";
import SettingsModal from "../../Components/settings/SettingsModal";

import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useUserPicture from "../../Hooks/useUserPicture";
const MyInfo = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState({ image: "" });
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    DOB: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/userinfo", { _id });
        setName(response.data[0].name);
        setUsername(response.data[0].email);
        setEmail(response.data[0].username);
        setDOB(response.data[0].DOB);
        setCountry(response.data[0].location.country);
        setState(response.data[0].location.state);
        setCity(response.data[0].location.city);
        setZip(response.data[0].location.zip);
      } catch (err) {
        console.log(err);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // createProfileImage(profileImage);
    // console.log(profileImage);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    console.log(base64);
    setProfileImage({ ...profileImage, image: base64 });
  };

  const handleNameChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleEmailChanges = async (e) => {
    // May disable
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleDOBChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCountryChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleStateChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCityChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleZipChanges = async (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChange = async (e) => {
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
                  onChange={handleNameChanges}
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
                  onChange={handleEmailChanges}
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
                  onChange={handleDOBChanges}
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
                  onChange={handleCountryChanges}
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
                  onChange={handleStateChanges}
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
                  onChange={handleCityChanges}
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
                  onChange={handleZipChanges}
                />
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Viewers Can Like</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Dislike</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Comment</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Viewers Can Share</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Industry</label>
                <select>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                  <option value="">Industry Example</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Looking For B2B Relationships</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">E-Commerence</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="label-input">
                <label htmlFor="">Upload Content</label>
                <select>
                  <option value="">Select Answer</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
            </div>

            <button
              className="settings-user-info-button home-butt page-button con-shade clickable"
              onClick={handleChange}
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
