import React, { useState } from "react";
import { useEffect } from "react";
import User from "../../Assets/Images/ProfileAvatar.png";
import "../../Components/settings/settings.css";
import SettingsModal from "../../Components/settings/SettingsModal";

import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
const Settings = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);
  const [profileImage, setProfileImage] = useState({ image: "" });

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserProfilePic = async () => {
      try {
        const response = await axiosPrivate.post("/users/getpic", { _id });

        console.log(response.data.getImageToClient);
        // setProfileImage(response.data.getImageToClient);
        // console.log(profileImage);
        setProfileImage({
          ...profileImage,
          image: response.data.getImageToClient,
        });
      } catch (err) {
        console.log(err);
      }
      // console.log(profilePic);
    };

    getUserProfilePic();
  }, [_id]);

  const createProfileImage = async (newImage) => {
    try {
      axiosPrivate.post("/users/pic", { _id, newImage });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfileImage(profileImage);
    console.log(profileImage);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    console.log(base64);
    setProfileImage({ ...profileImage, image: base64 });
  };

  const onClick = () => {
    setModal(!modal);
  };

  const decode = async () => {
    console.log("starting decode");
    // Define the string
    var decodedStringBtoA = "Testing";

    // Encode the String
    var encodedStringBtoA = btoa(decodedStringBtoA);

    console.log(encodedStringBtoA);

    // Define the string
    var encodedStringAtoB = encodedStringBtoA;

    // Decode the String
    var decodedStringAtoB = atob(encodedStringAtoB);

    console.log(decodedStringAtoB);
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
            {/* <div className="square-container settings-user-pic-pic con-shade">
              <input
                className="square-container-contents"
                src={User}
                alt="User Image here"
                type="image"
                lable="Profile Image"
                name="profileImage"
                id="image-upload"
                accept=".jpeg, .png, .jpg"
              />
            </div> */}
            {/* <img
              className="settings-user-pic-pic con-shade"
              src={User}
              alt="User Image here"
            /> */}

            <h4 className="settings-user-pic-label">Profile Picture</h4>
            <button className="settings-user-pic-button page-button con-shade clickable">
              Change
            </button>
          </div>
          <div className="settings-user-info">
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Name</label>
                <input type="text" />
              </div>
              <div className="label-input">
                <label htmlFor="">Username</label>
                <input type="text" />
              </div>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <div className="label-input">
                <label htmlFor="">Birthday</label>
                <input type="date" />
              </div>
            </div>
            <div className="settings-user-info-group">
              <div className="label-input">
                <label htmlFor="">Country</label>
                <input type="text" />
              </div>
              <div className="label-input">
                <label htmlFor="">State</label>
                <input type="text" />
              </div>
              <div className="label-input">
                <label htmlFor="">City</label>
                <input type="text" />
              </div>
              <div className="label-input">
                <label htmlFor="">Zip</label>
                <input type="text" />
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

            <button className="settings-user-info-button page-button con-shade clickable">
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
export default Settings;

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
