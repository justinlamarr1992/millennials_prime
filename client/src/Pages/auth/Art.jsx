import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";

import SettingsModal from "../../Components/settings/SettingsModal";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth";

const Art = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [modal, setModal] = useState(true);

  const navigate = useNavigate();

  const [art, setArt] = useState(false);

  // Form useStates
  const [artist, setArtist] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [affectIssues, setAffectIssues] = useState(null);
  const [navigateIndustry, setNavigateIndustry] = useState(null);
  const [inspirationOfWork, setInspirationOfWork] = useState(null);
  const [styleChanged, setStyleChanged] = useState(null);
  const [favsOrNoneFavs, setFavsOrNoneFavs] = useState(null);
  const [network, setNetwork] = useState(null);
  const [support, setSupport] = useState(null);
  const [critics, setCritics] = useState(null);
  const [specificIntegral, setSpecificIntegral] = useState(null);
  const [whatSpecfic, setWhatSpecfic] = useState(null);

  // info to be sent in backend
  const [values, setValues] = useState({
    artist: null,
    professional: null,
    purpose: null,
    affectIssues: null,
    navigateIndustry: null,
    inspirationOfWork: null,
    styleChanged: null,
    favsOrNoneFavs: null,
    network: null,
    support: null,
    critics: null,
    specificIntegral: null,
    whatSpecfic: null,
  });

  const artRef = useRef(false);
  const networkRef = useRef(false);
  const integralRef = useRef(false);
  const inputArtist = document.querySelector("#artist");

  const [errMsg, setErrMsg] = useState(null);

  const _id = auth._id;

  useEffect(() => {
    console.log(_id);

    const getUserArtInfo = async () => {
      try {
        const response = await axiosPrivate.post(
          "https://us-central1-millennialsprime.cloudfunctions.net/api/users/userinfo",
          { _id }
        );
        if (response.data[0].art) {
          console.log(response);
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
          artCheck();
        } else {
          console.log("No creativity");
          // setArt(false);
        }
        console.log("User Data ", response.data[0].art);
        setArtist(response.data[0].art.artist);
        if (artist == true) {
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserArtInfo();
  }, [_id]);

  const artCheck = (e) => {
    console.log(art);
    // setArtist(true);
    setArt(true);

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
    e.preventDefault();
    console.log(values);
    try {
      const response = await axiosPrivate.patch(
        `https://us-central1-millennialsprime.cloudfunctions.net/api/users/art/${_id}`,
        {
          values,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    navigate("/", {
      state: { data: "This is the data passed" },
    });
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <select
              name="artist"
              value={artist}
              id="artist"
              ref={artRef}
              onChange={artCheck}
            >
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
                    value={professional}
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
                    value={purpose}
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
                    value={favsOrNoneFavs}
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
                    value={affectIssues}
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
                    value={inspirationOfWork}
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
                    value={styleChanged}
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
                    value={critics}
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
                    value={navigateIndustry}
                  />
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
                    value={network}
                    onChange={networkCheck}
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
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Select Answer"
                    id="support"
                    name="support"
                    value={support}
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
                    value={specificIntegral}
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
                    value={whatSpecfic}
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
