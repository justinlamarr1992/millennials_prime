// import React, { useEffect } from "react";
// import { auth } from "../Actions/userActions";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function (ComposedClass, reload, adminRoute = null) {
//   function AuthenticationCheck(props) {
//     let user = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//       dispatch(auth()).then(async (response) => {
//         if (await !response.payload.isAuth) {
//           if (reload) {
//             <Navigate to="/auth/signin" />;
//           }
//         } else {
//           if (adminRoute && !response.payload.isAdmin) {
//             <Navigate to="/" />;
//           } else {
//             if (reload === false) {
//               <Navigate to="/" />;
//             }
//           }
//         }
//       });
//     }, [dispatch, user.googleAuth]);

//     return <ComposedClass {...props} user={user} />;
//   }
//   return AuthenticationCheck;
// }
