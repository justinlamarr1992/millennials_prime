import React from "react";
import User from "../../Assets/Images/user.jpeg";
const ReceiverInfo = () => {
  return (
    <div className="receiver-info">
      <h4 className="receiver-info-name">Receiver Name</h4>
      <h6 className="receiver-info-time text-gray">2min</h6>
      <img className="receiver-info-image" src={User} alt="User Image" />
    </div>
  );
};
export default ReceiverInfo;
