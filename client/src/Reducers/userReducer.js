import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../Actions/types";

// const INITIAL_STATE = {
//   name: null,
//   email: null,
//   token: null,
//   role: null,
//   _id: null,
// };

// export const userReducer = (state = INITIAL_STATE, action) => {
//   // export const userReducer = (state = null, action) => {
//   switch (action.type) {
//     case REGISTER_USER:
//       return { ...state, register: action.payload };
//     case LOGIN_USER:
//       console.log("Testing here");
//       return {
//         ...state,
//         loginSuccess: action.payload,
//         user: action.payload,
//       };
//     case AUTH_USER:
//       return { ...state, userData: action.payload };
//     case LOGOUT_USER:
//       return { state };
//     default:
//       return state;
//   }
// };

export function userReducer(state = null, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case AUTH_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
}
