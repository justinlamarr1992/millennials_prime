import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import RequireAuth from "./Components/DaveGrayTest/RequireAuth";
import PersistLogin from "./Components/PersistLogin";

import "./App.css";

import Layout from "./Components/Layout";

import NavBar from "./Components/nav/NavBar";

import Home from "./Pages/Home";

// import Messages from "./Pages/Messaging/Messages";
// import ConnectedUsers from "./Pages/ConnectedUsers/ConnectedUsers";
import MyInfo from "./Pages/Settings/MyInfo";
// import Notifications from "./Pages/Settings/Notifications";
import PrivacyPolicy from "./Pages/Settings/PrivacyPolicy";
import ContactUs from "./Pages/Settings/ContactUs";

import SignOut from "./Pages/auth/SignOut.jsx";
import SignIn from "./Pages/auth/SignIn";
import Register from "./Pages/auth/Register";
import Business from "./Pages/auth/Business";
import Art from "./Pages/auth/Art";
// import PasswordRecovery from "./Pages/auth/PasswordRecovery";
import Unauthorized from "./Pages/auth/Unauthorized";

import User from "./Pages/User/User";
// import TestUser from "./Pages/User/TestUser";
// import Verified from "./Pages/User/Verified";

import PrimeShow from "./Pages/ShowView/PrimeShow";
import UploadContent from "./Pages/Uploads/UploadContent";
import Catalog from "./Pages/ShowView/Catalog";
import Subscriptions from "./Pages/ShowView/Subscriptions";

import { NotFound } from "./Pages/NotFound/NotFound";
// import { loginUser } from "./Actions/userActions";
import SuccessSignIn from "./Pages/auth/SuccessSignIn";
import AdminPage from "./Components/DaveGrayTest/AdminPage";
import EditorPage from "./Components/DaveGrayTest/EditorPage";
import UserPage from "./Components/DaveGrayTest/UserPage";
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
      {/* <div> */}
      <NavBar />
      <Routes className="container-comp">
        <Route path="/" element={<Layout />}>
          {/* Public */}
          {/* FOR PHASE 1 */}
          <Route path="/" element={<Home />} />
          {/* FOR PHASE 1 */}
          {/* Auth */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/auth">
            <Route path="register" element={<Register />} />
            <Route path="business" element={<Business />} />
            <Route path="art" element={<Art />} />
            <Route path="signin" element={<SignIn />} />

            {/* <Route path="signout" element={<SignOut />} /> */}
            {/* <Route path="passwordrecovery" element={<PasswordRecovery />} />  */}
          </Route>
          <Route path="/prime-news">
            <Route path="viewer/:videoId" element={<PrimeShow />} />
            {/* need to protect this one */}
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            {/* ROUTES ONLY USERS CAN GO */}
            {/* More than one role can be in allowed roles  */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              {/* PHASE2 */}
              {/* <Route path="/" element={<Home />} /> */}
              {/* PHASE2 */}
              <Route path="prime-news/catalog" element={<Catalog />} />

              <Route path="user">
                <Route path="users/:id" element={<User />} />
                {/* <Route path="testuser/:id" element={<TestUser />} />
              <Route path="verified/:userid" element={<Verified />} />
              <Route path="/connectedusers" element={<ConnectedUsers />} /> */}
              </Route>
              <Route
                path="prime-news/subscriptions"
                element={<Subscriptions />}
              />
              <Route path="/settings">
                <Route path="myinfo" element={<MyInfo />} />
                <Route path="business" element={<Business />} />
                <Route path="art" element={<Art />} />
              </Route>
            </Route>
            {/* ROUTES ONLY EDITOR USERS AND GO */}

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<EditorPage />} />
              <Route
                path="prime-news/upload-content"
                element={<UploadContent />}
              />
            </Route>
            {/* ROUTES ONLY ADMIN USERS AND GO */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="yourin" element={<SuccessSignIn />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    // </Suspense>
  );
};

export default App;
