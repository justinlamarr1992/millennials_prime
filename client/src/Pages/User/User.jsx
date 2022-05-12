import React from "react";
import ProfileModal from "../../Components/user/ProfileModal";

import "../../Components/user/user.css";

const User = () => {
  return (
    <div className="page">
      <div className="user-container">
        {/* <section>Users Post</section> */}
        <ProfileModal />
      </div>
    </div>
  );
};
export default User;
