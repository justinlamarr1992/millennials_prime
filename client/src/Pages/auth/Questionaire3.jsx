import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import Logo from "../../Assets/Images/MillennialsPrimeLogo.png";
import Company1 from "../../Assets/Images/Companies/Company1.jpeg";
import Company2 from "../../Assets/Images/Companies/Company2.jpeg";
import Company3 from "../../Assets/Images/Companies/Company3.jpg";

const Questionaire3 = () => {
  const [art, setArt] = useState(false);
  const [network, setNetwork] = useState(false);
  const [integral, setIntegral] = useState(false);
  const artRef = useRef(false);
  const networkRef = useRef(false);
  const integralRef = useRef(false);
  const [continues, setContinues] = useState(false);
  const inputArtist = document.querySelector("#artist");

  useEffect(() => {
    continueCheck();
  }, [artRef.current.selectedIndex]);

  const artCheck = (e) => {
    console.log(artRef.current.selectedIndex);
    continueCheck();
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
      setIntegral(true);
      console.log(integral);
    } else if (integralRef.current.selectedIndex == 2) {
      setIntegral(false);
      console.log(integral);
    }
    console.log(integralRef.current.selectedIndex);
  };
  // TODO: Figure out how to disable the button until all the answers completed

  const continueCheck = () => {
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
              <h4>Let's talks Art!</h4>
              <h6 className="text-gray">Answer the Following Questions</h6>
            </div>
          </div>

          <form className="auth-form" action="">
            <div className="label-input">
              <label htmlFor="">Are you an Artist?</label>
              <select
                name="artist"
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
            {art == true && (
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
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  What's the purpose or goal of your work?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  How can your work affect societal issues?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  How do you navigate the professional art industry?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  Which art/music trends inspire your current work?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">How has your style changed over time? </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  What are your favorite and least favorite parts of
                  professional art?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
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
            )}
            {network == true && (
              <div className="label-input">
                <label htmlFor="">How do they support you?</label>
                <input type="text" />
              </div>
            )}

            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  What have critics said about your work?
                </label>
                <input type="text" />
              </div>
            )}
            {art == true && (
              <div className="label-input">
                <label htmlFor="">
                  Is there a specific environment or material that's integral to
                  your work?
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
            )}
            {integral == true && (
              <div className="label-input">
                <label htmlFor="">What is it?</label>
                <input type="text" />
              </div>
            )}
            {continues ? (
              <Link className="" key="home" to="/">
                <button className="auth-button login">Finished</button>
              </Link>
            ) : (
              <Link className="" key="home" to="/">
                <button disabled className="auth-button login">
                  Answer Questions
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Questionaire3;
