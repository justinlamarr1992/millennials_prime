import React from "react";
import SearchBar from "../../Components/home/SearchBar";
import ConnectUserBox from "../../Components/reusuables/connectedUsers/ConnectedUserBox";
import "../../Components/reusuables/connectedUsers/connectedUsers.css";

const ConnectedUsers = () => {
  return (
    <div className="page">
      <div className="home-container">
        <SearchBar />
        <h1>Connected Users</h1>
        <ConnectUserBox />
        <ConnectUserBox />
        <ConnectUserBox />
      </div>
    </div>
  );
};
export default ConnectedUsers;
