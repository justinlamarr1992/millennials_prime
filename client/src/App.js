import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./HigherOrderComponents/auth";
import { useAuthContext } from "./Hooks/useAuthContext";
import "./App.css";

import NavBar from "./Components/nav/NavBar";

import Home from "./Pages/Home";

import PrimeShow from "./Pages/ShowView/PrimeShow";

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

import { NotFound } from "./Pages/NotFound/NotFound";
import UploadContent from "./Pages/Uploads/UploadContent";
import Catalog from "./Pages/ShowView/Catalog";

function App(props, state) {
  const { user } = useAuthContext();
  return (
    <Suspense>
      <div className="App">
        <NavBar name="Justin" />
        {/* <Routes className="container-comp">
          Main
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth/signin" />}
          />

          <Route
            path="/messages"
            element={user ? <Messages /> : <Navigate to="/auth/signin" />}
          />

          <Route
            path="/connectedusers"
            element={user ? <ConnectedUsers /> : <Navigate to="/auth/signin" />}
          />

          <Route path="/prime-news">
            TODO: add params here so all videos will have ability to vien in full screen
            <Route path="viewer" element={<PrimeShow />} />

            TODO: Make sure this as admin middleware rout
            <Route path="upload-content" element={<UploadContent />} />

            <Route path="catalog" element={<Catalog />} />
          </Route>

          Settings
          <Route path="/settings">
            <Route
              path="config"
              element={user ? <Settings /> : <Navigate to="/auth/signin" />}
            />
            <Route
              path="notifications"
              element={
                user ? <Notifications /> : <Navigate to="/auth/signin" />
              }
            />
            <Route
              path="privacy-policy"
              element={
                user ? <PrivacyPolicy /> : <Navigate to="/auth/signin" />
              }
            />
            <Route
              path="contact-us"
              element={user ? <ContactUs /> : <Navigate to="/auth/signin" />}
            />
          </Route>

          Auth
          <Route path="/auth">
            <Route
              path="register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="signout"
              element={!user ? <SignOut /> : <Navigate to="/" />}
            />
            <Route
              path="signin"
              element={!user ? <SignIn /> : <Navigate to="/" />}
            />
            <Route
              path="passwordrecovery"
              element={!user ? <PasswordRecovery /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire"
              element={!user ? <Questionaire /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire2"
              element={!user ? <Questionaire2 /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire3"
              element={!user ? <Questionaire3 /> : <Navigate to="/" />}
            />
          </Route>

          Users
          <Route path="/user">
            <Route
              path="profile"
              element={<User />}
              element={user ? <User /> : <Navigate to="/signin" />}
            />
            <Route
              path="users/:id"
              element={<User />}
              element={user ? <User /> : <Navigate to="/signin" />}
            />
            <Route path="testuser/:id" element={<TestUser />} />
            <Route path="verified/:userid" element={<Verified />} />
          </Route>

          404
          <Route path="*" element={<NotFound />} />
        </Routes> */}
        <Routes className="container-comp">
          {/* Main */}
          <Route path="/" element={Auth(<Home />, null)} />
          <Route
            path="/messages"
            element={user ? <Messages /> : <Navigate to="/auth/signin" />}
          />
          <Route
            path="/connectedusers"
            element={user ? <ConnectedUsers /> : <Navigate to="/auth/signin" />}
          />
          <Route path="/prime-news">
            {/* TODO: add params here so all videos will have ability to vien in full screen */}
            <Route path="viewer" element={<PrimeShow />} />

            {/* TODO: Make sure this as admin middleware rout */}
            <Route path="upload-content" element={<UploadContent />} />

            <Route path="catalog" element={<Catalog />} />
          </Route>
          {/* Settings */}
          <Route path="/settings">
            <Route
              path="config"
              element={user ? <Settings /> : <Navigate to="/auth/signin" />}
            />
            <Route
              path="notifications"
              element={
                user ? <Notifications /> : <Navigate to="/auth/signin" />
              }
            />
            <Route
              path="privacy-policy"
              element={
                user ? <PrivacyPolicy /> : <Navigate to="/auth/signin" />
              }
            />
            <Route
              path="contact-us"
              element={user ? <ContactUs /> : <Navigate to="/auth/signin" />}
            />
          </Route>
          {/* Auth */}
          <Route path="/auth">
            <Route
              path="register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="signout"
              element={!user ? <SignOut /> : <Navigate to="/" />}
            />
            <Route
              path="signin"
              element={!user ? <SignIn /> : <Navigate to="/" />}
            />
            <Route
              path="passwordrecovery"
              element={!user ? <PasswordRecovery /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire"
              element={!user ? <Questionaire /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire2"
              element={!user ? <Questionaire2 /> : <Navigate to="/" />}
            />
            <Route
              path="questionaire3"
              element={!user ? <Questionaire3 /> : <Navigate to="/" />}
            />
          </Route>
          {/* Users */}
          <Route path="/user">
            <Route
              path="profile"
              // element={<User />}
              element={user ? <User /> : <Navigate to="/signin" />}
            />
            <Route
              path="users/:id"
              // element={<User />}
              element={user ? <User /> : <Navigate to="/signin" />}
            />
            <Route path="testuser/:id" element={<TestUser />} />
            <Route path="verified/:userid" element={<Verified />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>

    // </BrowserRouter>
  );
}

export default App;
