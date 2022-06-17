import React, { useState } from "react";
import User from "../../Assets/Images/user.jpeg";
import "../../Components/settings/settings.css";
import SettingsModal from "../../Components/settings/SettingsModal";

const Settings = () => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setModal(!modal);
  };
  return (
    <div className="page">
      <div className="settings-container">
        <h2 className="settings-page-title">Account Information</h2>
        <form action="" className="settings-profile-form">
          <div className="settings-user-info-group">
            <img
              className="settings-user-pic-pic con-shade"
              src={User}
              alt="User Image here"
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
