import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import RequireAuth from "./Features/auth/RequireAuth";
// import Auth from "./HigherOrderComponents/auth";
// import { useAuthContext } from "./Hooks/useAuthContext";
import "./App.css";

// import Text from "./Pages/TestPage/Text";

import Layout from "./Components/Layout";

import NavBar from "./Components/nav/NavBar";

import Home from "./Pages/Home";

// import Messages from "./Pages/Messaging/Messages";
// import ConnectedUsers from "./Pages/ConnectedUsers/ConnectedUsers";
// import Settings from "./Pages/Settings/Settings";
// import Notifications from "./Pages/Settings/Notifications";
// import PrivacyPolicy from "./Pages/Settings/PrivacyPolicy";
// import ContactUs from "./Pages/Settings/ContactUs";

import SignOut from "./Pages/auth/SignOut.jsx";
import SignIn from "./Pages/auth/SignIn";
// import Register from "./Pages/auth/Register";
// import Questionaire from "./Pages/auth/Questionaire";
// import Questionaire2 from "./Pages/auth/Questionaire2";
// import Questionaire3 from "./Pages/auth/Questionaire3";
// import PasswordRecovery from "./Pages/auth/PasswordRecovery";
import Unauthorized from "./Pages/auth/Unauthorized";

// import User from "./Pages/User/User";
// import TestUser from "./Pages/User/TestUser";
// import Verified from "./Pages/User/Verified";

// import PrimeShow from "./Pages/ShowView/PrimeShow";
import UploadContent from "./Pages/Uploads/UploadContent";
import Catalog from "./Pages/ShowView/Catalog";

// import { NotFound } from "./Pages/NotFound/NotFound";
// import { loginUser } from "./Actions/userActions";
import SuccessSignIn from "./Pages/auth/SuccessSignIn";
import Admin from "./Components/DaveGrayTest/Admin";
// import { unsubscribe } from "../../server/routes/video";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
  // TODO:Change these
};

const App = (props, state) => {
  // const dispatch = useDispatch();

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div className="App">
      {/* <NavBar /> */}
      <Routes className="container-comp">
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          {/* Test Pages */}
          <Route path="yourin" element={<SuccessSignIn />} />
          <Route path="admin" element={<Admin />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* <Route  element={<ContactUs />} /> */}
          {/* <Route index element={<PrimeShow />} /> */}
          {/* Change this to the advertisement home page  */}
          <Route path="/prime-news">
            {/* <Route path="viewer/:videoId" element={<PrimeShow />} /> */}
            {/* <Route path="upload-content" element={<UploadContent />} /> */}
            <Route path="catalog" element={<Catalog />} />
          </Route>

          {/* Auth */}
          <Route path="/auth">
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="signin" element={<SignIn />} />
            {/* <Route path="signout" element={<SignOut />} />
            <Route path="passwordrecovery" element={<PasswordRecovery />} />
            <Route path="questionaire" element={<Questionaire />} />
            <Route path="questionaire2" element={<Questionaire2 />} />
            <Route path="questionaire3" element={<Questionaire3 />} /> */}
          </Route>
          {/* Protected Routes */}
          {/* <Route element={<RequireAuth />}> */}
          {/* FORNOW COMMENGT OUT BUT WHEN I FIGURE OUT CODE KEEP IT IN AUTH */}
          {/* <Route path="yourin" element={<SuccessSignIn />} /> */}
          <Route path="prime-news/upload-content" element={<UploadContent />} />
          {/* Prime Shows */}
          {/* <Route path="/prime-news"> */}
          {/* <Route path="viewer/:videoId" element={<PrimeShow />} /> */}
          {/* <Route path="upload-content" element={<UploadContent />} /> */}
          {/* <Route path="catalog" element={<Catalog />} /> */}
          {/* </Route> */}
          {/* </Route> */}
        </Route>
      </Routes>
    </div>
    // </Suspense>
  );
};

export default App;
