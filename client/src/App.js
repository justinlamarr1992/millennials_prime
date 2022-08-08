import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";
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
import TestUser from "./Pages/User/TestUser";
import Verified from "./Pages/User/Verified";

function App(props, state) {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar name="Justin" />
        <Routes className="container-comp">
          {/* MAy have found a way to change the sidenav... We will see */}
          {/* Main */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signin" />}
          />
          <Route
            path="/messages"
            element={user ? <Messages /> : <Navigate to="/signin" />}
          />
          <Route
            path="/connectedusers"
            element={user ? <ConnectedUsers /> : <Navigate to="/signin" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/signin" />}
          />
          <Route
            path="/notifications"
            element={user ? <Notifications /> : <Navigate to="/signin" />}
          />
          <Route
            path="/privacy-policy"
            element={user ? <PrivacyPolicy /> : <Navigate to="/signin" />}
          />
          <Route
            path="/contact-us"
            element={user ? <ContactUs /> : <Navigate to="/signin" />}
          />

          {/* Auth */}
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/signout"
            element={!user ? <SignOut /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/passwordrecovery"
            element={!user ? <PasswordRecovery /> : <Navigate to="/" />}
          />
          <Route
            path="/questionaire"
            element={!user ? <Questionaire /> : <Navigate to="/" />}
          />
          <Route
            path="/questionaire2"
            element={!user ? <Questionaire2 /> : <Navigate to="/" />}
          />
          <Route
            path="/questionaire3"
            element={!user ? <Questionaire3 /> : <Navigate to="/" />}
          />

          {/* Users */}
          <Route
            path="/user"
            element={user ? <User /> : <Navigate to="/signin" />}
          />
          <Route path="/testuser/:id" element={<TestUser />} />
          <Route
            path="/verified"
            element={user ? <Verified /> : <Navigate to="/signin" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
