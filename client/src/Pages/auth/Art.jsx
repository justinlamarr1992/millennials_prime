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
  const [whatSpecfic, setWhatSpecfic] = useState(null);

  const artRef = useRef(false);
  const networkRef = useRef(false);
  const integralRef = useRef(false);
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
  const [errMsg, setErrMsg] = useState("");

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserArtInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/userinfo", { _id });
        console.log(response.data[0]);
        setArtist(response.data[0].art.artist);
        if (artist == true) {
          setProfessional(response.data[0].art.professional);
          setPurpose(response.data[0].art.purpose);
          setAffectIssues(response.data[0].art.affectIssues);
          setNavigateIndustry(response.data[0].art.navigateIndustry);
          setInspirationOfWork(response.data[0].art.inspirationOfWork);
          setStyleChanged(response.data[0].art.styleChanged);
          setFavsOrNoneFavs(response.data[0].art.favsOrNoneFavs);
          setNetwork(response.data[0].art.network);
          setSupport(response.data[0].art.support);
          setCritics(response.data[0].art.critics);
          setSpecificIntegral(response.data[0].art.specificIntegral);
          setWhatSpecfic(response.data[0].art.whatSpecfic);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserArtInfo();
  }, [_id]);

  const artCheck = (e) => {
    console.log(art);
    const inputArt = document.getElementById("artist").value;

    if (inputArt === "yes") {
      setArt(true);
      setArtist(true);
    } else {
      setArt(false);
      setArtist(false);
      setProfessional("");
      setPurpose("");
      setAffectIssues("");
      setNavigateIndustry("");
      setInspirationOfWork("");
      setStyleChanged("");
      setFavsOrNoneFavs("");
      setNetwork("");
      setSupport("");
      setCritics("");
      setSpecificIntegral("");
      setWhatSpecfic("");
    }
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const networkCheck = (e) => {
    if (document.getElementById("network").value == "yes") {
      setNetwork(true);
    } else {
      setNetwork(false);
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const integralCheck = (e) => {
    if (document.getElementById("specificIntegral").value == "yes") {
      setSpecificIntegral(true);
    } else {
      setSpecificIntegral(false);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
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
                  <select
                    name="professional"
                    id="professional"
                    onChange={handleChange}
                  >
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
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="purpose"
                    name="purpose"
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    Favorite and least favorite parts of professional art?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="favsOrNoneFavs"
                    name="favsOrNoneFavs"
                  />
                </div>

                <div className="label-input">
                  <label htmlFor="">
                    How can your work affect societal issues?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="affectIssues"
                    name="affectIssues"
                  />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Which art/music trends inspire your current work?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="inspirationOfWork"
                    name="inspirationOfWork"
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    How has your style changed over time?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="styleChanged"
                    name="styleChanged"
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    What have critics said about your work?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="critics"
                    name="critics"
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="">
                    How do you navigate the professional art industry?
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="navigateIndustry"
                    name="navigateIndustry"
                  />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Do you have a network of other artists?
                  </label>
                  {/* If yes give a brief one to sentence description */}
                  <select name="network" id="network" onChange={networkCheck}>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="label-input">
                  <label htmlFor="">How do they support you?</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="support"
                    name="support"
                    disabled={network ? false : true}
                  />
                </div>
              </div>

              <div className="settings-user-info-group">
                <div className="label-input">
                  <label htmlFor="">
                    Anything specific integral to your work?
                  </label>
                  <select
                    name="specificIntegral"
                    id="specificIntegral"
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
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="whatSpecfic"
                    name="whatSpecfic"
                    disabled={specificIntegral ? false : true}
                  />
                </div>
              </div>
            </div>
          )}

          <button className="auth-button login" onClick={handleUpdate}>
            Update Art Information
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
