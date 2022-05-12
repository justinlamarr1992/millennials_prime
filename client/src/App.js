import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/nav/NavBar";

import Home from "./Pages/Home";
import Messages from "./Pages/Messaging/Messages";
import ConnectedUsers from "./Pages/ConnectedUsers/ConnectedUsers";
import Settings from "./Pages/Settings/Settings";

import SignOut from "./Pages/auth/SignOut.jsx";
import SignIn from "./Pages/auth/SignIn";
import Register from "./Pages/auth/Register";
import Questionaire from "./Pages/auth/Questionaire";
import PasswordRecovery from "./Pages/auth/PasswordRecovery";

import User from "./Pages/User/User";
import Verified from "./Pages/User/Verified";

function App(props, state) {
  return (
    <>
      <NavBar name="Justin" />
      <Routes>
        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/connectedusers" element={<ConnectedUsers />} />
        <Route path="/settings" element={<Settings />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
        <Route path="/questionaire" element={<Questionaire />} />

        {/* Users */}
        <Route path="/user" element={<User />} />
        <Route path="/verified" element={<Verified />} />
      </Routes>
    </>
  );
}

export default App;
