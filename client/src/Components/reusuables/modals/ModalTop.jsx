import React from "react";
// import { useAuthContext } from "../../../Hooks/useAuthContext";

// import User from "../../../Assets/Images/user.jpeg";
const ModalTop = () => {
  // const { user } = useAuthContext();
  return (
    <div className="modal-t-boxes">
      <div className="noti-box top-boxes p-con-shade clickable square-container">
        <h4 className="noti-num square-container-contents">2</h4>
      </div>
      <div className="prof-pic top-boxes square-container">
        {/* <img
          className="prof-pic-pic p-con-shade clickable square-container-contents"
          src={User}
          alt="User Image here"
        /> */}
      </div>
    </div>
  );
};
export default ModalTop;
