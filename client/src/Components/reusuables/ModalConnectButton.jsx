import React, { useEffect, useState } from "react";
import { FaUserPlus, FaCheck } from "react-icons/fa";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const ModalConnectButton = ({ userTo, userFrom, userid }) => {
  const axiosPrivate = useAxiosPrivate();

  // const userTo = userTo;
  // const userid = userid;

  //   const connectedValues = { userFrom, userTo, userid };
  const connectedValues = JSON.stringify({ userid, userTo, userFrom });

  const [connected, setConnected] = useState(false);
  console.log(
    "Original connect Status for ",
    userTo,
    " and ",
    userFrom,
    " is ",
    connected,
    " while the testing userid is ",
    userid
  );

  const handleFollow = async () => {
    console.log("it was clicked", connected);
    if (connected) {
      // when already connected
      try {
        const response = await axiosPrivate.post("/subscribe/unsubscribe", {
          userFrom,
          userTo,
        });
        setConnected(!connected);
        console.log("NEW connect REQUEST: ", response);
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          alert("No Server Response");
        } else if (err.originalStatus === 401) {
          console.log(err);
        } else {
          alert("UnConnecting Failed");
        }
      }
    } else {
      try {
        console.log(userTo, userFrom);
        const response = await axiosPrivate.post(
          "/subscribe/subscribe",
          { userTo, userFrom },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setConnected(!connected);
        console.log("New connect Request: ", response);
      } catch (err) {
        if (!err?.originalStatus) {
          // isLoading: true until timeout occurs
          alert("No Server Response");
        } else if (err.originalStatus === 401) {
          console.log(err);
        } else {
          alert("Connecting failed Failed");
        }
      }
    }
  };

  console.log(
    "Afetr Coding connect Status for ",
    userTo,
    " and ",
    userFrom,
    " is ",
    connected,
    " while the testing userid is ",
    userid
  );
  //   useEffect(() => {

  const getConnected = async () => {
    try {
      const response = await axiosPrivate.post(
        "/subscribe/subscribed",
        {
          userFrom,
          userTo,
          // userid
        }
        // { connectedValues }
      );
      // setConnected();
      // console.log(response);
      setConnected(response.data.connected);
    } catch (err) {
      console.log(err);
    }
  };
  getConnected();

  //   }, [userFrom]);

  return (
    <button
      className={`p-con-shade clickable modal-home-follows-button ${
        connected
          ? "modal-home-follows-button-added"
          : "modal-home-follows-button-add"
      } `}
      onClick={handleFollow}
    >
      {connected ? <FaCheck /> : <FaUserPlus />}
    </button>
  );
};

export default ModalConnectButton;
