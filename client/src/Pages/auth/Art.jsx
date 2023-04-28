import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

import SettingsModal from "../../Components/settings/SettingsModal";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";

const Art = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  const [art, setArt] = useState(false);

  const [artist, setArtist] = useState("");
  const [professional, setProfessional] = useState("");
  const [purpose, setPurpose] = useState("");
  const [affectIssues, setAffectIssues] = useState("");
  const [navigateIndustry, setNavigateIndustry] = useState("");
  const [inspirationOfWork, setInspirationOfWork] = useState("");
  const [styleChanged, setStyleChanged] = useState("");
  const [favsOrNoneFavs, setFavsOrNoneFavs] = useState("");
  const [network, setNetwork] = useState("");
  const [support, setSupport] = useState("");
  const [critics, setCritics] = useState("");
  const [specificIntegral, setSpecificIntegral] = useState("");
  const [whatSpecfic, setWhatSpecfic] = useState("");

  const artRef = useRef(false);
  const networkRef = useRef(false);
  const integralRef = useRef(false);
  const [continues, setContinues] = useState(false);
  const inputArtist = document.querySelector("#artist");

  // info to be sent in backend
  const [values, setValues] = useState({
    artist: "",
    professional: "",
    purpose: "",
    affectIssues: "",
    navigateIndustry: "",
    inspirationOfWork: "",
    styleChanged: "",
    favsOrNoneFavs: "",
    network: "",
    support: "",
    critics: "",
    specificIntegral: "",
    whatSpecfic: "",
  });

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserArtInfo = async () => {
      try {
        const response = await axiosPrivate.post("/user/userinfo", { _id });
        console.log(response.data[0]);
        if (response.data[0].art) setArtist(response.data[0].art.artist);
        setArtist(false);
      } catch (err) {
        console.log(err);
      }
    };

    getUserArtInfo();
  }, []);

  useEffect(() => {
    artCheck();
  }, [artRef.current.selectedIndex]);

  const artCheck = (e) => {
    console.log(artRef.current.selectedIndex);
    if (artRef.current.selectedIndex == 0) {
      console.log(" dont continue");
      setContinues(false);
    } else if (artRef.current.selectedIndex == 1) {
      console.log("Yes");
      setArt(true);
      setContinues(true);
    } else if (artRef.current.selectedIndex == 2) {
      console.log("No");
      setArt(false);
      setContinues(true);
    }
  };
  const networkCheck = (e) => {
    if (networkRef.current.selectedIndex == 0) {
      console.log("select an answer");
    } else if (networkRef.current.selectedIndex == 1) {
      setNetwork(true);
      console.log(network);
    } else if (networkRef.current.selectedIndex == 2) {
      setNetwork(false);
      console.log(network);
    }
    console.log(networkRef.current.selectedIndex);
  };
  const integralCheck = (e) => {
    if (integralRef.current.selectedIndex == 0) {
      console.log("select an answer");
    } else if (integralRef.current.selectedIndex == 1) {
      setSpecificIntegral(true);
      console.log(specificIntegral);
    } else if (integralRef.current.selectedIndex == 2) {
      setSpecificIntegral(false);
      console.log(specificIntegral);
    }
    console.log(integralRef.current.selectedIndex);
  };
  // TODO: Figure out how to disable the button until all the answers completed

  const handleUpdate = async (e) => {
    // This is where We update the user business info
    e.preventDefault();
    console.log(values);
    try {
      const response = await axiosPrivate.patch(`/users/art/${_id}`, {
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
        <h2 className="settings-page-title">Artistry Information</h2>
        <form
          className="settings-profile-form"
          onSubmit={handleUpdate}
          action=""
        >
          <div className="label-input">
            <label htmlFor="">Are you an Artist?</label>
            <select name="artist" id="artist" ref={artRef} onChange={artCheck}>
              <option value="" disabled selected>
                Select your option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {/* Everything Will Go in here */}
          {art == true && (
            <div className="settings-user-info">
              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Have you worked as a professional artist before?
                  </label>
                  <select name="pro" id="pro">
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    What's the purpose or goal of your work?
                  </label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    Favorite and least favorite parts of professional art?
                  </label>
                  <input type="text" />
                </div>

                <div className="label-input">
                  <label htmlFor="">
                    How can your work affect societal issues?
                  </label>
                  <input type="text" />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Which art/music trends inspire your current work?
                  </label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    How has your style changed over time?{" "}
                  </label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    What have critics said about your work?
                  </label>
                  <input type="text" />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    How do you navigate the professional art industry?
                  </label>
                  <input type="text" />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Do you have a network of other artists?
                  </label>
                  {/* If yes give a brief one to sentence description */}
                  <select
                    name="network"
                    id="network"
                    onChange={networkCheck}
                    ref={networkRef}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="label-input">
                  <label htmlFor="">How do they support you?</label>
                  <input type="text" disabled={network ? false : true} />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Anything specific integral to your work?
                  </label>
                  <select
                    name="integral"
                    id="integral"
                    ref={integralRef}
                    onChange={integralCheck}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="label-input">
                  <label htmlFor="">What is it?</label>
                  <input
                    type="text"
                    disabled={specificIntegral ? false : true}
                  />
                </div>
              </div>
            </div>
          )}

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
export default Art;
