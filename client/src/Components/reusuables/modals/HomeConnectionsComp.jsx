import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pic from "../../../Assets/Images/user.jpeg";
import { FaUserPlus } from "react-icons/fa";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const HomeConnectionsComp = ({ _id }) => {
  // TODO: Create an established connections componenet
  const [user, setUser] = useState({});
  const [prime, setPrime] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  console.log(_id);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axiosPrivate.post("/users/userinfo", { _id });
        console.log();
        setUser(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);

  return (
    <div
      className={`modal-home-follows-comp ${
        user.prime ? "s-prime-container" : "s-nonprime-container"
      }`}
    >
      <div className="square-container modal-home-follows-comp-pic">
        <img
          className="modal-home-follows-pic p-con-shade square-container-contents"
          src={Pic}
          alt=""
        />
      </div>

      <h5 className="modal-home-follows-name">
        <Link
          className={`${user.prime ? "text-pri" : "text-sec"}`}
          to={`/user/users/${user._id}`}
          // TODO: Display name but have Link to the @username
          // to={`/user/users/${data.id}`}
        >
          {user.username}
        </Link>
      </h5>
      {/* TODO: figure better way to do that */}

      <h5 className="modal-home-follows-industry">
        {user.business ? user.business.industry : "Primer"}
      </h5>
    </div>
  );
};
export default HomeConnectionsComp;
