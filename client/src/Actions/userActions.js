import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../Components/config";

// LIGHTBULB: This is the req.body that is being sent to the backend server through axios

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/signup`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

// WORKING LOGIN NO STATE
export const loginUser = async (dataToSubmit) => {
  console.log("Second Section is userAction.js");
  return await axios
    .post(`${USER_SERVER}/login`, { dataToSubmit })
    .then((response) => response.data);
};

// export async function loginUser(dataToSubmit) {
//   console.log("Trying the modified method to send stuff to state");
//   const request = await axios
//     .post(`${USER_SERVER}/login`, { dataToSubmit })
//     .then((response) => response.data);
//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// }

// export async function loginUser(dataToSubmit) {
//   return (dispatch) => {
//     return axios.post(`${USER_SERVER}/login`, { dataToSubmit }).then((res) => {
//       const { name, email, token, role, _id } = res.data;
//     });
//   };
// }

// export const loginUser = async (dataToSubmit) => {
//   console.log("Second Section is userAction.js");
//   const request = await axios
//     .post(`${USER_SERVER}/login`, { dataToSubmit })
//     .then((response) => response.data);
//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// };

// Stackover flow test
// export function loginUser(dataToSubmit) {
//   return (dispatch) => {
//     return axios.post(`${USER_SERVER}/login`, dataToSubmit).then((res) => {
//       const { name, email, token, role, _id } = res.data;
//       if (status === "success") {
//         dispatch(setCurrentUser(sessionId));
//       } else {
//         dispatch(invalidUser(error));
//       }
//     });
//   };
// }

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
