import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// May need to delete lets see
// import Reducer from "./Reducers";
import { Provider } from "react-redux";

import { store } from "./App/store";

// import { createStore, applyMiddleware } from "redux";
// import promiseMiddleware from "redux-promise";
// import ReduxThunk from "redux-thunk";

import reportWebVitals from "./reportWebVitals";
// import { AuthContextProvider } from "./Context/AuthContext";
// import { PostsContextProvider } from "./Context/PostsContext";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./Reducers";

// This too
// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(createStore);

// const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
