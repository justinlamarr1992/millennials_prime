import React, { useEffect, useState } from "react";
import User from "../../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";
import HomeFollowComp from "./HomeFollowComp";
import HomeConnectionsComp from "./HomeConnectionsComp";
import ModalTop from "./ModalTop";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const MainModal = ({ _id }) => {
  const axiosPrivate = useAxiosPrivate();

  const [firstUser, setFirstUser] = useState({});
  const [secondUser, setSecondUser] = useState({});
  const [thirdUser, setThirdUser] = useState({});

  // Strt logic here for all Modal logic

  // find 3 users for follows and connections
  console.log("This is the ID for the main modal", _id);

  useEffect(() => {
    const getModalInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/modal", { _id });
        setFirstUser(response.data[0]);
        setSecondUser(response.data[1]);
        setThirdUser(response.data[2]);
      } catch (err) {
        console.log(err);
      }
    };
    getModalInfo();
  }, []);
  console.log(firstUser);
  console.log(secondUser);
  console.log(thirdUser);

  return (
    <div className="modal con-shade home-modal">
      <div className="modal-container">
        <ModalTop />
        <div className="modal-section modal-home-ad">
          <h4 className="modal-home-ad-title">Go Prime</h4>
          <h6 className="modal-home-ad-text">
            Try the Prime membership to influence our community the right way!
          </h6>
          {/* <button className="modal-home-ad-button page-button">Try Here</button> */}
        </div>
        <div className="modal-section ">
          <h4 className="modal-section-title">Who to Follow</h4>
          <div className="modal-home-follows">
            {/* use logic to find top 3 users gaining views, likes and follows */}
            <HomeFollowComp user={firstUser} />
            <HomeFollowComp user={secondUser} />
            <HomeFollowComp user={thirdUser} />
          </div>
        </div>
        <div className="modal-section ">
          <h4 className="modal-section-title">Connections</h4>
          <div className="modal-home-connections">
            {/* use Logic to find users that have similar connections that could help user */}
            <HomeConnectionsComp />
            <HomeConnectionsComp />
            <HomeConnectionsComp />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainModal;
