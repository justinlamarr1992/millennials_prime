import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RequireAuth from "./Features/auth/RequireAuth";
import Auth from "./HigherOrderComponents/auth";
// import { useAuthContext } from "./Hooks/useAuthContext";
import "./App.css";

import Text from "./Pages/TestPage/Text";

import Layout from "./Components/Layout";

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

import PrimeShow from "./Pages/ShowView/PrimeShow";
import UploadContent from "./Pages/Uploads/UploadContent";
import Catalog from "./Pages/ShowView/Catalog";

import { NotFound } from "./Pages/NotFound/NotFound";
import { loginUser } from "./Actions/userActions";
import SuccessSignIn from "./Pages/auth/SuccessSignIn";
// import { unsubscribe } from "../../server/routes/video";

const App = (props, state) => {
  const dispatch = useDispatch();

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div className="App">
      <NavBar />
      <Routes className="container-comp">
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactUs />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="yourin" element={<SuccessSignIn />} />
        </Route>

        {/* Auth */}
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="passwordrecovery" element={<PasswordRecovery />} />
          <Route path="questionaire" element={<Questionaire />} />
          <Route path="questionaire2" element={<Questionaire2 />} />
          <Route path="questionaire3" element={<Questionaire3 />} />
        </Route>
        {/* Prime Shows */}
        <Route path="/prime-news">
          <Route path="viewer/:videoId" element={<PrimeShow />} />
          <Route path="upload-content" element={<UploadContent />} />
          <Route path="catalog" element={<Catalog />} />
        </Route>
      </Routes>
    </div>
    // </Suspense>
  );
};

export default App;
