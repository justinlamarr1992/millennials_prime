import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/nav/NavBar";

import Home from "./Pages/Home";
import Messages from "./Pages/Messaging/Messages";
import ConnectedUsers from "./Pages/ConnectedUsers/ConnectedUsers";
import Settings from "./Pages/Settings/Settings";
import Notifications from "./Pages/Settings/Notifications";
import PrivacyPolicy from "./Pages/Settings/PrivacyPolicy";
import ContactUs from "./Pages/Settings/ContactUs";

import SignOut from "./Pages/auth/SignOut.jsx";
import SignIn from "./Pages/auth/SignIn";
import Register from "./Pages/auth/Register";
import Questionaire from "./Pages/auth/Questionaire";
import Questionaire2 from "./Pages/auth/Questionaire2";
import Questionaire3 from "./Pages/auth/Questionaire3";
import PasswordRecovery from "./Pages/auth/PasswordRecovery";

import User from "./Pages/User/User";
import Verified from "./Pages/User/Verified";

function App(props, state) {
  return (
    <>
      {/* <NavBar name="Justin" /> */}
      <Routes className="container-comp">
        {/* MAy have found a way to change the sidenav... We will see */}
        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/connectedusers" element={<ConnectedUsers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
        <Route path="/questionaire" element={<Questionaire />} />
        <Route path="/questionaire2" element={<Questionaire2 />} />
        <Route path="/questionaire3" element={<Questionaire3 />} />

        {/* Users */}
        <Route path="/user" element={<User />} />
        <Route path="/verified" element={<Verified />} />
      </Routes>
    </>
  );
}

export default App;
