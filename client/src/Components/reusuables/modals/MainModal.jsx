import React, { useEffect, useState } from "react";
import User from "../../../Assets/Images/user.jpeg";
import { FaEnvelope } from "react-icons/fa";
import HomeFollowComp from "./HomeFollowComp";
import HomeConnectionsComp from "./HomeConnectionsComp";
import ModalTop from "./ModalTop";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { ModalAd } from "./ModalAd";

const MainModal = ({ _id }) => {
  const axiosPrivate = useAxiosPrivate();

  const [firstFollow, setFirstFollow] = useState({});
  const [secondFollow, setSecondFollow] = useState({});
  const [thirdFollow, setThirdFollow] = useState({});
  const [firstConnects, setFirstConnects] = useState({});
  const [secondConnects, setSecondConnects] = useState({});
  const [thirdConnects, setThirdConnects] = useState({});

  // Strt logic here for all Modal logic

  // find 3 users for follows and connections
  console.log("This is the ID for the main modal", _id);

  useEffect(() => {
    const getModalInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/modal", { _id });
        console.log(response.data.follows);
        setFirstFollow(response.data.follows[0]);
        setSecondFollow(response.data.follows[1]);
        setThirdFollow(response.data.follows[2]);
        setFirstConnects(response.data.connects[0]);
        setSecondConnects(response.data.connects[1]);
        setThirdConnects(response.data.connects[2]);
      } catch (err) {
        console.log(err);
      }
    };
    getModalInfo();
  }, []);

  return (
    <div className="modal con-shade home-modal">
      <div className="modal-container">
        <ModalTop />
        <ModalAd />
        {/* TODO: Use logic to resemble the Subscribe Component for following the button  */}
        {/* Make Component */}
        <div className="modal-section ">
          <h4 className="modal-section-title">Who to Follow</h4>
          <div className="modal-home-follows">
            {/* use logic to find top 3 users gaining views, likes and follows */}
            <HomeFollowComp
              _id={_id}
              user={firstFollow}
              userid={firstFollow._id}
            />
            <HomeFollowComp
              _id={_id}
              user={secondFollow}
              userid={secondFollow._id}
            />
            <HomeFollowComp
              _id={_id}
              user={thirdFollow}
              userid={thirdFollow._id}
            />
          </div>
        </div>

        {/* Make Component */}
        <div className="modal-section ">
          <h4 className="modal-section-title">Connections</h4>
          <div className="modal-home-connections">
            {/* use Logic to find users that have similar connections that could help user */}
            <HomeConnectionsComp user={firstConnects} />
            <HomeConnectionsComp user={secondConnects} />
            <HomeConnectionsComp user={thirdConnects} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainModal;
