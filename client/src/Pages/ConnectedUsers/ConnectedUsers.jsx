import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../Components/reusuables/SearchBar";
import ConnectUserBox from "../../Components/reusuables/connectedUsers/ConnectedUserBox";
import "../../Components/reusuables/connectedUsers/connectedUsers.css";

import { textData } from "../../Components/reusuables/post/data";

const ConnectedUsers = () => {
  // const [verified, setVerified] = useState(false);
  // const handleVerified = (verified) => {};
  const handleConnect = (id) => {
    // determine if users are connected
    // display connected of not
    // toggle onstate of Connected of not
  };
  return (
    <div className="page">
      <div className="home-container">
        <SearchBar />
        <h1>Connected Users</h1>
        {textData.map((data) => (
          <Link
            // this is the hardcoded data file
            // TODO: Change to dynamic mongo info
            to={`/user/users/${data.user}`}
          >
            <ConnectUserBox
              data={data}
              handleConnect={handleConnect}
              // verified={verified}
              // pic={null}
              // name={null}
              // description={null}
              // industry={null}
              // primeUser={null}
              // company={null}
              // location={null}
            />
            {/* <img
                // className="square-container-contents prof-connected-users-img item-shade clickable"
                src={data.pic}
                alt=""
              /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ConnectedUsers;
